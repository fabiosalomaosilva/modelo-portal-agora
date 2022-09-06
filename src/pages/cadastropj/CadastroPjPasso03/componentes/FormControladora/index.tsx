import { useFormik } from 'formik';
import React, { useEffect } from 'react';
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

export interface MenuControladorasProps {
  visible: boolean;
  controladorPai?: string;
}

type Controladora = {
  razaoSocial?: string;
  cnpj?: string;
  participacao?: string;
};

export default function FormControladora(props: MenuControladorasProps) {
  const cliente = useSelector((state: RootState) => state.cliente);
  const selectedControlador = useSelector(
    (state: RootState) => state.selectedControladora
  );
  const dispatch = useDispatch();
  let textClass = 'block';

  if (props.visible) {
    textClass = 'block';
  } else {
    textClass = 'hidden';
  }

  const onSubmit = () => {
    if (selectedControlador.controladorPai === '') {
      selectedControlador.controladorPai = '0';
    }
    console.log(selectedControlador.id)
    
    if (cliente.controladores.filter(i => i.id === selectedControlador.id).length === 0) {
      dispatch(addControladora(selectedControlador));
    } else {
      dispatch(updateControladora(selectedControlador));
    }
    dispatch(setHidePanelControladoras());
  };

  const validate = (values: Controlador) => {
    const errors: Controladora = {};
    if (!values.razaoSocial) {
      errors.razaoSocial = 'Campo o Aplicação financeira é obrigatória';
    }
    if (!values.cnpj) {
      errors.cnpj = 'Campo o Aplicação financeira é obrigatória';
    }
    if (!values.participacao) {
      errors.participacao = 'Campo o Aplicação financeira é obrigatória';
    }
    return errors;
  };

  const handleCancel = () => {
    dispatch(setHidePanelControladoras());
  };

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
          <Input
            type='text'
            placeholder='CNPJ'
            label='CNPJ'
            id='cnpj'
            name='cnpj'
            value={selectedControlador.cnpj}
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
          <Input
            type='text'
            placeholder='Participação'
            label='Participação'
            id='participacao'
            name='participacao'
            value={selectedControlador.participacao}
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
