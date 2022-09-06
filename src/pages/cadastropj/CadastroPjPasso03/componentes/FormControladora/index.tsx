import { useFormik } from 'formik';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../../../../components/forms/Button';
import Select from '../../../../../components/forms/Select';
import { Cliente } from '../../../../../models/cliente';
import { Controlador } from '../../../../../models/conta';
import { RootState } from '../../../../../store';
import { v4 as uuidv4 } from 'uuid';
import Input from '../../../../../components/forms/Input/input';
import {
  addControladora,
  setHidePanelControladoras,
  updateControladora,
  updateSelectedControlador,
} from '../../../../../store/rootSlice';
import MaskInput from '../../../../../components/forms/Input/inputTextMask';
import DecimalInput from '../../../../../components/forms/Input/inputDecimal';
import { cnpjValidation } from '../../../../../utils/validations/validationCnpj';
import { toast } from 'react-toastify';

export interface FormControladoraProps {
  visible: boolean;
  controladorPai?: string;
}

type Controladora = {
  razaoSocial?: string;
  cnpj?: string;
  participacao?: string;
};

export interface FormControladoraErrors {
  razaoSocial?: string;
  cnpj?: string;
  participacao?: string;
}

export default function FormControladora(props: FormControladoraProps) {
  const cliente = useSelector((state: RootState) => state.cliente);
  const [errors, setErrors] = useState<FormControladoraErrors>({
    razaoSocial: undefined,
    cnpj: undefined,
    participacao: undefined,
  });
  const selectedControlador = useSelector(
    (state: RootState) => state.selectedControladora
  );
  const dispatch = useDispatch();
  const cnpjInput = useRef(null);
  let textClass = 'block';

  if (props.visible) {
    textClass = 'block';
  } else {
    textClass = 'hidden';
  }

  const onSubmit = () => {
    let returnErrors = false;
    setErrors({razaoSocial: undefined, cnpj: undefined, participacao: undefined})
    if (selectedControlador.controladorPai === '') {
      selectedControlador.controladorPai = '0';
    }

    if (selectedControlador.razaoSocial === '') {
      errors.razaoSocial = 'O campo Participação é obrigatório';
      setErrors(errors);
      returnErrors = true;
    }

    if (selectedControlador.participacao === 0 || selectedControlador.participacao === 0.00) {
      console.log('Entrou aqui na participação', selectedControlador.participacao)
      errors.participacao = 'O campo Participação é obrigatório';
      setErrors(errors);
      returnErrors = true;
    } 
    if (selectedControlador.cnpj === '') {
      errors.cnpj = 'O campo CNPJ é obrigatório';
      setErrors(errors);
      returnErrors = true;
    } 

    if (returnErrors) return false;

    if (
      cliente.controladores.filter((i) => i.id === selectedControlador.id)
        .length === 0
    ) {
      dispatch(addControladora(selectedControlador));
    } else {
      dispatch(updateControladora(selectedControlador));
    }
    dispatch(setHidePanelControladoras());
  };

  const handleCancel = () => {
    dispatch(setHidePanelControladoras());
  };

  const validationCnpj = (e: any) => {
    setErrors({razaoSocial: undefined, cnpj: undefined, participacao: undefined})
    if (!cnpjValidation(e.target.value)) {
      toast('CNPJ inválido', { type: 'error' });
      setErrors({ cnpj: 'CNPJ inválido' });
    }
  };

  useEffect(() => {
    console.log(errors);
  }, [errors]);

  return (
    <div className={`flex flex-col ${textClass} mt-3`}>
      <div>
        <Select
          label='Controladora'
          id='controladorPai'
          name='controladorPai'
          value={selectedControlador.controladorPai}
          onChange={(e) =>
            dispatch(
              updateSelectedControlador({
                field: 'controladorPai',
                value: e.target.value,
              })
            )
          }
        >
          {cliente.controladores?.map((controlador) => (
            <option key={controlador.id} value={controlador.cnpj}>
              {controlador.razaoSocial}
            </option>
          ))}
        </Select>
      </div>

      <div className='grid grid-cols-4 gap-4'>
        <div className='col-span-2'>
          <Input
            type='text'
            placeholder='Razão social'
            label='Razão Social'
            id='razaoSocial'
            name='razaoSocial'
            value={selectedControlador.razaoSocial}
            error={errors?.razaoSocial}
            onChange={(e) =>
              dispatch(
                updateSelectedControlador({
                  field: 'razaoSocial',
                  value: e.target.value,
                })
              )
            }
          />
        </div>

        <div>
          <MaskInput
            type='text'
            mask='99.999.999/9999-99'
            placeholder='CNPJ'
            label='CNPJ'
            id='cnpj'
            name='cnpj'
            ref={cnpjInput}
            error={errors?.cnpj}
            value={selectedControlador.cnpj}
            onBlur={validationCnpj}
            onChange={(e) =>
              dispatch(
                updateSelectedControlador({
                  field: 'cnpj',
                  value: e.target.value,
                })
              )
            }
          />
        </div>

        <div>
          <DecimalInput
            placeholder='Participação'
            label='Participação'
            id='participacao'
            name='participacao'
            value={selectedControlador.participacao}
            error={errors?.participacao}
            onChange={(e) =>
              dispatch(
                updateSelectedControlador({
                  field: 'participacao',
                  value: e.target.value,
                })
              )
            }
          />
        </div>
      </div>
      <div className='text-right -mt-5'>
        <Button
          type='submit'
          size='sm'
          color='secondary'
          className='mx-2'
          onClick={() => handleCancel()}
        >
          Cancelar
        </Button>
        <Button
          type='submit'
          size='sm'
          color='secondary'
          onClick={() => onSubmit()}
        >
          Adicionar Controladora
        </Button>
      </div>
    </div>
  );
}
