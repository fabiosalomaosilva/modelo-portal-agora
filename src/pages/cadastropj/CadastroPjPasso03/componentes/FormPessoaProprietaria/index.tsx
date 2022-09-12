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
  setHideFormFatca,
  setHidePanelPessoaProprietaria,
  setShowFormFatca,
  updatePessoaProprietaria,
} from '../../../../../store/rootSlice';
import MaskInput from '../../../../../components/forms/Input/inputTextMask';
import DecimalInput from '../../../../../components/forms/Input/inputDecimal';
import {
  cnpjValidation,
  cpfValidation,
} from '../../../../../utils/validations/validationCnpj';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import {
  cleanCnpjCpf,
  convertToFloat,
} from '../../../../../utils/converters/converters';
import { initialSelectedPessoaProprietaria } from '../../../../../store/initialValues';
import Separator from '../../../../../components/forms/Separator';
import FormFatca from '../FormFatca';

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
  const showFormFatca = useSelector((state: RootState) => state.showFormFatca);

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
        return cpfValidation(cleanCnpjCpf(val as string));
      })
      .test('cpf1', 'CPF já foi cadastrado', (val) => {
        if (val != undefined && cleanCnpjCpf(val).length === 11) {
          if (selectedPessoaProprietaria.cpf === cleanCnpjCpf(val)) {
            return true;
          }
          const res = cliente.pessoasProprietarias.find(
            (i) => i.cpf == cleanCnpjCpf(val)
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
            (acumulado, item) => acumulado + convertToFloat(item.participacao),
            0
          );

          let participacaoAtual = undefined;
          if (selectedPessoaProprietaria.id != '') {
            participacaoAtual = cliente.pessoasProprietarias?.find(
              (i) => i.id === selectedPessoaProprietaria.id
            )?.participacao;
          }

          if (
            participacaoAtual != undefined &&
            convertToFloat(participacaoAtual) > 0
          ) {
            somaProprietarios =
              somaProprietarios - convertToFloat(participacaoAtual);
          }

          const soma =
            somaControladores + somaProprietarios + convertToFloat(val);
          if (soma > 100) {
            return false;
          }
          return true;
        }
        return false;
      }),
    vinculoComAgora: Yup.boolean().required(
      'O campo Tem Vínculo com a Ágora é obrigatório'
    ),
    tipoVinculo: Yup.string().when('vinculoComAgora', {
      is: true,
      then: Yup.string().required('O campo Tipo de Vínculo é obrigatório'),
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
    const pessoa: PessoaProprietaria = {
      id: formik.values.id,
      controladorPai: formik.values.controladorPai,
      nome: formik.values.nome,
      cpf: cleanCnpjCpf(formik.values.cpf),
      orgaoEmissor: formik.values.orgaoEmissor,
      participacao: convertToFloat(formik.values.participacao),
      pessoaExpostaPoliticamente: formik.values.pessoaExpostaPoliticamente,
      possuiOutraNacionalidade: formik.values.possuiOutraNacionalidade,
      possuiVistoPermanenteOutroPais: formik.values.possuiOutraNacionalidade,
      temResidenciafiscalOutroPais: formik.values.temResidenciafiscalOutroPais,
      vinculoComAgora: formik.values.vinculoComAgora,
      rg: formik.values.rg,
      tipoVinculo:
        formik.values.tipoVinculo === '0' ? '' : formik.values.tipoVinculo,
      nifs: formik.values.nifs,
    };

    const isUpdate =
      cliente.pessoasProprietarias.filter((i) => i.id === pessoa.id).length ===
      0;
    if (isUpdate) {
      dispatch(addPessoaProprietaria(pessoa));
    } else {
      dispatch(updatePessoaProprietaria(pessoa));
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
    formik.setFieldValue('id', uuidv4());
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
              label='Controladora'
              id='controladorPai'
              name='controladorPai'
              value={formik.values.controladorPai}
              error={formik.errors.controladorPai}
              touched={formik.touched.controladorPai}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              {cliente.controladores?.map((item) => (
                <option key={item.id} value={item.cnpj}>
                  {item.razaoSocial}
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
            onChange={(e) => {
              console.log(e.target.value);
              if (e.target.value == 'true') {
                console.log('Deu certo no true');
                dispatch(setShowFormFatca());
              }
              if (e.target.value == 'false') {
                console.log('Deu certo no false');
                dispatch(setHideFormFatca());
              }
              formik.handleChange(e);
            }}
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
        <FormFatca
          visible={showFormFatca}
          pessoaProprietariaId={initialValues.id}
        />
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
