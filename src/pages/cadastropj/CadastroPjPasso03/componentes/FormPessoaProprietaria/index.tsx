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
import Separator from '../../../../../components/forms/Separator';

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
  let textClass = '';

  if (props.visible) {
    textClass = '';
  } else {
    textClass = 'hidden';
  }

  const validationSchema = Yup.object().shape({
    nome: Yup.string().required('O campo Razão social é obrigatório'),
    cpf: Yup.string()
      .required('O campo CPF é obrigatório')
      .test('cpf', 'CPF inválido', (val) => {
        return cnpjValidation(val as string);
      })
      .test('cpf1', 'CPF já foi cadastrado', (val) => {
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
    rg: Yup.number().integer().required('O campo RG é obrigatório'),
    orgaoEmissor: Yup.string().required('O campo Órgão emissor é obrigatório'),
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
      .test('participacao', 'Valor não pode ser inferior a 0,01%', (val) => {
        if (val != undefined) {
          const value = convertToFloat(val);
          if (value < 0.01) {
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
          const proprietarios = cliente.pessoasProprietarias.filter(
            (i) =>
              i.controladorPai == cleanCnpjCpf(formik.values.controladorPai)
          );
          let somaControladores = controladores.reduce(
            (acumulado, item) => acumulado + item.participacao,
            0
          );
          let somaProprietarios = proprietarios.reduce(
            (acumulado, item) => acumulado + item.participacao,
            0
          );
          somaProprietarios = somaProprietarios - convertToFloat(cliente.pessoasProprietarias?.find(i => i.id === selectedPessoaProprietaria.id)?.participacao);
          const soma =
            (somaControladores + somaProprietarios + convertToFloat(val));
          console.log(formik.values.controladorPai);
          console.log(soma);
          if (soma > 100) {
            return false;
          }
          return true;
        }
        return false;
      }),
    tipoVinculo: Yup.string().required('O campo Tipo de vínculo é obrigatório'),
    vinculoComAgora: Yup.string().when('tipoVinculo', {
      is: 'true',
      then: Yup.string().required('O campo Vínculo com a Ágora é obrigatório'),
    }),
    pessoaExpostaPoliticamente: Yup.boolean().required(
      'O campo Pessoa exposta politicamente é obrigatório'
    ),
    possuiOutraNacionalidade: Yup.boolean()
      .default(false)
      .required('O campo Possui outra nacionalidade é obrigatório'),
    temResidenciafiscalOutroPais: Yup.boolean()
      .default(false)
      .required('O campo Tem residência fiscal em outro país é obrigatório'),
    possuiVistoPermanenteOutroPais: Yup.boolean()
      .default(false)
      .required('O campo Possui visto permanente em outro país é obrigatório'),
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
    <div className={`${textClass}`}>
      <form onSubmit={formik.handleSubmit}>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-1 md:gap-4 sm:gap-2'>
          <div className='sm:col-span-2 md:col-span-3 xl:col-span-5'>
            <Select
              label='PessoaProprietaria'
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
          <div className='md:col-span-2'>
            <Input
              type='text'
              placeholder='Nome'
              label='Nome'
              id='nome'
              name='nome'
              value={formik.values.nome}
              error={formik.errors.nome}
              touched={formik.touched.nome}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>

          <MaskInput
            type='text'
            mask='999.999.999-99'
            placeholder='CPF'
            label='CPF'
            id='cpf'
            name='cpf'
            value={formik.values.cpf}
            error={formik.errors.cpf}
            touched={formik.touched.cpf}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />

          <Input
            type='number'
            className='textfield'
            placeholder='RG'
            label='RG'
            id='rg'
            name='rg'
            value={formik.values.rg}
            error={formik.errors.rg}
            touched={formik.touched.rg}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <Select
            label='Orgão Emissor'
            id='orgaoEmissor'
            name='orgaoEmissor'
            value={formik.values.orgaoEmissor}
            error={formik.errors.orgaoEmissor}
            touched={formik.touched.orgaoEmissor}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          >
            <option value='SSP'>SSP</option>
            <option value='MEX'>MEX</option>
            <option value='CREA'>CREA</option>
            <option value='OAB'>OAB</option>
            <option value='CORECON'>CORECON</option>
            <option value='CRM'>CRM</option>
          </Select>
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
          <Select
            label='Tem vínculo com a Ágora CTVM SA?'
            visible={true}
            id='vinculoComAgora'
            name='vinculoComAgora'
            value={formik.values.vinculoComAgora.toString()}
            error={formik.errors.vinculoComAgora}
            touched={formik.touched.vinculoComAgora}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          >
            <option value='false'>Não</option>
            <option value='true'>Sim</option>
          </Select>
          <Select
            label='Tipo de vínculo'
            visible={formik.values.vinculoComAgora}
            id='tipoVinculo'
            name='tipoVinculo'
            value={formik.values.tipoVinculo}
            error={formik.errors.tipoVinculo}
            touched={formik.touched.tipoVinculo}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          >
            <option value='Funcionarios'>Funcionarios</option>
            <option value='Administradores'>Administradores</option>
            <option value='Agentes autonomos'>Agentes autonomos</option>
            <option value='Prestadores de serviço'>
              Prestadores de serviço
            </option>
            <option value='Sócios'>Sócios</option>
            <option value='Clubes'>Clubes</option>
          </Select>

          <Select
            label='Pessoa Exposta Politicamente?'
            id='pessoaExpostaPoliticamente'
            name='pessoaExpostaPoliticamente'
            value={formik.values.pessoaExpostaPoliticamente.toString()}
            error={formik.errors.pessoaExpostaPoliticamente}
            touched={formik.touched.pessoaExpostaPoliticamente}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          >
            <option value='false'>Não</option>
            <option value='true'>Sim</option>
          </Select>

          <Select
            label='Possui outra nacionalidade?'
            id='possuiOutraNacionalidade'
            name='possuiOutraNacionalidade'
            value={formik.values.possuiOutraNacionalidade.toString()}
            error={formik.errors.possuiOutraNacionalidade}
            touched={formik.touched.possuiOutraNacionalidade}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          >
            <option value='false'>Não</option>
            <option value='true'>Sim</option>
          </Select>

          <Select
            label='Tem residência fiscal em outro país?'
            id='temResidenciafiscalOutroPais'
            name='temResidenciafiscalOutroPais'
            value={formik.values.temResidenciafiscalOutroPais.toString()}
            error={formik.errors.temResidenciafiscalOutroPais}
            touched={formik.touched.temResidenciafiscalOutroPais}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          >
            <option value='false'>Não</option>
            <option value='true'>Sim</option>
          </Select>

          <Select
            label='Visto permanente em outro país?'
            id='possuiVistoPermanenteOutroPais'
            name='possuiVistoPermanenteOutroPais'
            value={formik.values.possuiVistoPermanenteOutroPais.toString()}
            error={formik.errors.possuiVistoPermanenteOutroPais}
            touched={formik.touched.possuiVistoPermanenteOutroPais}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          >
            <option value='false'>Não</option>
            <option value='true'>Sim</option>
          </Select>
        </div>
        <Separator />
        <div className='text-right mt-5'>
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
            Salvar
          </Button>
        </div>
      </form>
    </div>
  );
}