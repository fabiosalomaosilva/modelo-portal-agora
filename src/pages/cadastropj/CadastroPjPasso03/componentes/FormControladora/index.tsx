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
import * as Yup from 'yup';
import {
  cleanCnpjCpf,
  convertToFloat,
} from '../../../../../utils/converters/converters';

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
  const showFormControlador = useSelector(
    (state: RootState) => state.showPanelControladoras
  );
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

  const validationSchema = Yup.object().shape({
    razaoSocial: Yup.string().required('O campo Razão social é obrigatório'),
    cnpj: Yup.string()
      .required('O campo CNPJ é obrigatório')
      .test('cnpj', 'CNPJ inválido', (val) => {
        return cnpjValidation(val as string);
      })
      .test('participacao', 'CNPJ já foi cadastrado', (val) => {
        if (val != undefined && val.length === 18) {
          const res = cliente.controladores.find((i) => i.cnpj == cleanCnpjCpf(val));
          console.log(res)
          if (res) {
            return false;
          }
          return true;
        }
        return false;
      }),
    participacao: Yup.string()
      .required('O campo Participação é obrigatório')
      .test('participacao', 'Valor maior que 100,00', (val) => {
        if (val != undefined) {
          const value = convertToFloat(val);
          if (value > 100) {
            return false;
          }
          return true;
        }
        return false;
      }),
  });

  const onSubmit = (values: Controlador) => {
    console.log(formik.values);
    const controlador: Controlador = {
      id: selectedControlador.id,
      controladorPai: formik.values.controladorPai,
      cnpj: cleanCnpjCpf(formik.values.cnpj),
      participacao: parseFloat(
        formik.values.participacao.toString().replace(',', '.')
      ),
      razaoSocial: formik.values.razaoSocial,
    };
    if (
      cliente.controladores.filter((i) => i.id === selectedControlador.id)
        .length === 0
    ) {
      dispatch(addControladora(controlador));
    } else {
      dispatch(updateControladora(controlador));
    }
    formik.resetForm();
    dispatch(setHidePanelControladoras());
  };

  const handleCancel = () => {
    formik.resetForm();
    dispatch(setHidePanelControladoras());
  };

  let initialValues: Controlador = {
    id: '',
    controladorPai: '0',
    razaoSocial: '',
    cnpj: '',
    participacao: 0,
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema,
    onSubmit,
  });

  useEffect(() => {
    if (selectedControlador.cnpj !== '') {
      formik.setValues(selectedControlador);
    }
  }, [showFormControlador]);

  return (
    <div className={`flex flex-col ${textClass} mt-3`}>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <Select
            label='Controladora'
            id='controladorPai'
            name='controladorPai'
            value={formik.values.controladorPai}
            error={formik.errors.controladorPai}
            touched={formik.touched.controladorPai}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
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
              value={formik.values.razaoSocial}
              error={formik.errors.razaoSocial}
              touched={formik.touched.razaoSocial}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
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
              value={formik.values.cnpj}
              error={formik.errors.cnpj}
              touched={formik.touched.cnpj}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>

          <div>
            <DecimalInput
              placeholder='Participação'
              label='Participação'
              id='participacao'
              name='participacao'
              maxLenght={6}
              value={formik.values.participacao}
              error={formik.errors.participacao}
              touched={formik.touched.participacao}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>
        </div>
        <div className='text-right -mt-5'>
          <Button
            type='button'
            size='sm'
            color='secondary'
            className='mx-2'
            onClick={() => handleCancel()}
          >
            Cancelar
          </Button>
          <Button type='submit' size='sm' color='secondary'>
            Adicionar Controladora
          </Button>
        </div>
      </form>
    </div>
  );
}
