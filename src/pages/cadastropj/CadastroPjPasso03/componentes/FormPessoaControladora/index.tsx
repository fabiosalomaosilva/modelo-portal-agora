import { useFormik } from 'formik';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../../../../components/forms/Button';
import Select from '../../../../../components/forms/Select';
import { PessoaProprietaria } from '../../../../../models/conta';
import { RootState } from '../../../../../store';
import { v4 as uuidv4 } from 'uuid';
import Input from '../../../../../components/forms/Input/input';
import {
  addPessoaProprietaria,
  setHidePanelPessoaProprietaria,
  updatePessoaProprietaria,
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
import { initialSelectedPessoaProprietaria } from '../../../../../store/initialValues';

export interface FormPessoaProprietariaProps {
  visible: boolean;
  controladorPai?: string;
}

export default function FormPessoaProprietaria(
  props: FormPessoaProprietariaProps
) {
  const cliente = useSelector((state: RootState) => state.cliente);
  const showFormPessoaProprietaria = useSelector(
    (state: RootState) => state.selectedPessoaProprietaria
  );
  const selectedPessoaProprietaria = useSelector(
    (state: RootState) => state.selectedPessoaProprietaria
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
      .test('cnpj1', 'CNPJ já foi cadastrado', (val) => {
        if (val != undefined && val.length === 18) {
          const res = cliente.controladores.find(
            (i) => i.cnpj == cleanCnpjCpf(val)
          );
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
      })
      .test('participacao1', 'Soma das participações maior que 100%', (val) => {
        if (val != undefined) {
          const controladores = cliente.controladores.filter(
            (i) =>
              i.controladorPai == cleanCnpjCpf(formik.values.controladorPai)
          );
          //const proprietarios = cliente.pessoasProprietarias.filter((i) => i. == cleanCnpjCpf(formik.values.controladorPai));
          let soma = controladores.reduce(
            (acumulado, item) => acumulado + item.participacao,
            0
          );
          soma = soma + convertToFloat(val);
          console.log(val);
          console.log(soma);
          if (soma > 100) {
            return false;
          }
          return true;
        }
        return false;
      }),
  });

  const onSubmit = (values: PessoaProprietaria) => {
    formik.setFieldValue(
      'participacao',
      convertToFloat(formik.values.participacao)
    );
    formik.setFieldValue('cpf', cleanCnpjCpf(formik.values.cpf));
    if (
      cliente.pessoasProprietarias.filter(
        (i) => i.id === selectedPessoaProprietaria.id
      ).length === 0
    ) {
      formik.setFieldValue('id', uuidv4());
      dispatch(addPessoaProprietaria(formik.values));
    } else {
      dispatch(updatePessoaProprietaria(formik.values));
    }
    formik.resetForm();
    dispatch(setHidePanelPessoaProprietaria());
  };

  const handleCancel = () => {
    formik.resetForm();
    dispatch(setHidePanelPessoaProprietaria());
  };

  let initialValues: PessoaProprietaria = initialSelectedPessoaProprietaria;

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema,
    onSubmit,
  });

  useEffect(() => {
    if (selectedPessoaProprietaria.cpf !== '') {
      formik.setValues(selectedPessoaProprietaria);
    }
  }, [showFormPessoaProprietaria]);

  return (
    <div className={`flex flex-col ${textClass} mt-3`}>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <Select
            label='PessoaProprietariaa'
            id='controladorPai'
            name='controladorPai'
            value={formik.values.controladorPai}
            error={formik.errors.controladorPai}
            touched={formik.touched.controladorPai}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          >
            {cliente.pessoasProprietarias?.map((pessoa) => (
              <option key={pessoa.id} value={pessoa.cpf}>
                {pessoa.nome}
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
              id='nome'
              name='nome'
              value={formik.values.nome}
              error={formik.errors.nome}
              touched={formik.touched.nome}
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
              id='cpf'
              name='cpf'
              value={formik.values.cpf}
              error={formik.errors.cpf}
              touched={formik.touched.cpf}
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
            Adicionar Pessoa Proprietariaa
          </Button>
        </div>
      </form>
    </div>
  );
}
