import React from 'react';
import NumberFormat from 'react-number-format';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import Button from '../../../components/forms/Button';
import Input from '../../../components/forms/Input/input';
import Select from '../../../components/forms/Select';
import Separator from '../../../components/forms/Separator';
import TitleSeparator from '../../../components/forms/TitleSeparator';
import { RootState } from '../../../store';
import { Cliente } from '../../../models/cliente';
import { setCliente } from '../../../store/rootSlice';
import MaskInput from '../../../components/forms/Input/inputTextMask';
import { CepEndereco, getCep } from '../../../services/cep';
import { useNavigate } from 'react-router-dom';
import { cnpjValidation } from '../../../utils/validations/validationCnpj';

export default function CadastroPjPasso01() {
  let cliente = useSelector((state: RootState) => state.cliente);
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    nomeUsuario: Yup.string().required('O campo Nome de usuário é obrigatório'),
    principalObjetivoComercial: Yup.string().notOneOf(
      ['0'],
      'Selecione uma opção válida'
    ),
    telefone: Yup.number().required('O campo Telefone é obrigatório'),
    ramal: Yup.number().typeError('O campo ramal deve conter apenas números'),
    email: Yup.string()
      .email('E-mail inválido')
      .required('O campo E-mail é obrigatório'),
    confirmarEmail: Yup.string()
      .email('E-mail inválido')
      .oneOf([Yup.ref('email')], 'Campo e-mail e confirmação não são iguais')
      .required('O campo Confirmação é obrigatório'),
    denominacaoComercial: Yup.string().required(
      'O campo Denominação social é obrigatório'
    ),
    dataConstituicao: Yup.string().required(
      'O campo Data de constituição é obrigatório'
    ),
    cnpj: Yup.string().required('O campo CNPJ é obrigatório'),
    formaConstituicao: Yup.string().required(
      'O campo Forma de Constituição é obrigatório'
    ),
    nire: Yup.number().required('O campo NIRE é obrigatório'),
    principalObjetoSocial: Yup.string().notOneOf(
      ['0'],
      'Selecione uma opção válida'
    ),
    principalAtividade: Yup.string().notOneOf(
      ['0'],
      'Selecione uma opção válida'
    ),
    possuiVinculocomAgora: Yup.string().notOneOf(
      ['0'],
      'Selecione uma opção válida'
    ),
    cep: Yup.number().required('O campo CEP é obrigatório'),
    endereco: Yup.string().required('O campo Endenreço é obrigatório'),
    numero: Yup.string().required('O campo Número é obrigatório'),
    bairro: Yup.string().required('O campo Bairro é obrigatório'),
    estado: Yup.string().required('O campo Estado é obrigatório'),
    cidade: Yup.string().required('O campo Cidade é obrigatório'),
  });

  const onSubmit = (values: Cliente) => {
    if (typeof Date.parse(values.dataConstituicao)) {
      formik.values.cnpj = formik.values.cnpj
        .toString()
        .replace('.', '')
        .replace('/', '')
        .replace('-', '')
        .replace('.', '');
      dispatch(setCliente(values));
      navigate('/pj/passo02');
    }
  };

  const resolveCep = async (e: any) => {
    const cep = await getCep(e.target.value);
    formik.values.endereco = cep.endereco;
    formik.values.bairro = cep.bairro;
    formik.values.estado = cep.estado;
    formik.values.cidade = cep.cidade;
    formik.handleBlur(e);
  };

  const validarCpf = async (e: any) => {
    const valido = cnpjValidation(e.target.value);
    if (!valido) {
      toast('CNPJ não é válido', { type: 'error' });
      formik.values.cnpj = '';
    }
    formik.handleBlur(e);
  };

  const formik = useFormik({
    initialValues: cliente,
    validationSchema,
    onSubmit,
  });

  return (
    <div>
      <section id='header-passo01' className='my-4'>
        <h1 className='text-left mb-4'>Cadastre-se</h1>
        <p className='text-left mb-4'>
          Produtos exclusivos, segurança nas operações e atendimento
          diferenciado: sua empresa está a apenas algumas etapas de entrar para
          a Ágora e operar com segurança, agilidade e conveniência.
        </p>
        <p className='text-left mb-4'>
          Se desejar consultar os documentos necessários para a abertura da
          conta, Clique Aqui.
        </p>
        <p className='text-left mb-4'>
          As informações solicitadas são uma exigência da CVM e do Banco Central
          e, portanto, absolutamente necessárias para a abertura de sua conta.
        </p>
      </section>
      <form onSubmit={formik.handleSubmit}>
        <section id='info-inicial-passo01' className='my-6'>
          <TitleSeparator label='Informações Iniciais:' />
          <div className='text-left'>
            <Input
            type='text'
              placeholder='Nome de usuário'
              label='Nome de usuário:'
              description='Máximo de 10 caractéres:*'
              tooltip='Também denominado login, é a sua identificação
            para entrar no Portal. Deverá ser usado, juntamente
            com a sua senha, sempre que você visitar o Portal
            ou quiser iniciar uma transação através da Ágora.'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              id='nomeUsuario'
              name='nomeUsuario'
              value={formik.values.nomeUsuario}
              error={formik.errors.nomeUsuario}
              touched={formik.touched.nomeUsuario}
            />
            <Separator />
            <Select
              placeholder='Nome de usuário'
              label='Principal objetivo comercial:'
              description='Tipo de Investidor:*'
              id='principalObjetivoComercial'
              name='principalObjetivoComercial'
              value={formik.values.principalObjetivoComercial}
              error={formik.errors.principalObjetivoComercial}
              touched={formik.touched.principalObjetivoComercial}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              <option value='Banco múltiplo'>Banco múltiplo</option>
              <option value='Banco de investimentos'>
                Banco de investimentos
              </option>
              <option value='Bolsa de valores e mercadorias'>
                Bolsa de valores e mercadorias
              </option>
              <option value='Clube de investimentos'>
                Clube de investimentos
              </option>
            </Select>

            <Separator />

            <div className='grid grid-cols-4 gap-4'>
              <div className='col'>
                <Input
                  type='text'
                  placeholder='Telefone'
                  description='Comercial*'
                  label='Telefone'
                  id='telefone'
                  name='telefone'
                  value={formik.values.telefone}
                  error={formik.errors.telefone}
                  touched={formik.touched.telefone}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
              <div>
                <Input
                  type='text'
                  placeholder='Ramal'
                  label='Ramal'
                  id='ramal'
                  name='ramal'
                  value={formik.values.ramal}
                  error={formik.errors.ramal}
                  touched={formik.touched.ramal}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
              <div>
                <Input
                  type='text'
                  placeholder='E-mail'
                  label='E-mail'
                  id='email'
                  name='email'
                  value={formik.values.email}
                  error={formik.errors.email}
                  touched={formik.touched.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
              <div>
                <Input
                  type='text'
                  placeholder='E-mail'
                  label='Confirmar e-mail'
                  id='confirmarEmail'
                  name='confirmarEmail'
                  value={formik.values.confirmarEmail}
                  error={formik.errors.confirmarEmail}
                  touched={formik.touched.confirmarEmail}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
            </div>
          </div>
        </section>

        <section id='info-societaria-passo01' className='my-6'>
          <TitleSeparator label='Informações empresariais:' />
          <div className='text-left'>
            <div className='grid grid-cols-4 gap-4'>
              <div>
                <MaskInput
                  type='number'
                  mask='99.999.999/9999-99'
                  placeholder='CNPJ'
                  label='CNPJ'
                  id='cnpj'
                  name='cnpj'
                  value={formik.values.cnpj}
                  error={formik.errors.cnpj}
                  touched={formik.touched.cnpj}
                  onChange={formik.handleChange}
                  onBlur={validarCpf}
                />
              </div>
              <div className='col-span-3'>
                <Input
                  type='text'
                  placeholder='Denominação Social'
                  label='Denominação Social'
                  id='denominacaoComercial'
                  name='denominacaoComercial'
                  value={formik.values.denominacaoComercial}
                  error={formik.errors.denominacaoComercial}
                  touched={formik.touched.denominacaoComercial}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
            </div>

            <div className='grid grid-cols-4 gap-4 -mt-6'>
              <div>
                <MaskInput
                  type='text'
                  mask='99/99/9999'
                  placeholder='01/01/2022'
                  label='Data de constituição'
                  id='dataConstituicao'
                  name='dataConstituicao'
                  value={formik.values.dataConstituicao}
                  error={formik.errors.dataConstituicao}
                  touched={formik.touched.dataConstituicao}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
              <div className='col-span-3'>
                <Input
                  type='text'
                  placeholder='Forma de constituição'
                  label='Forma de constituição'
                  id='formaConstituicao'
                  name='formaConstituicao'
                  value={formik.values.formaConstituicao}
                  error={formik.errors.formaConstituicao}
                  touched={formik.touched.formaConstituicao}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
            </div>

            <div className='grid grid-cols-4 gap-4 -mt-6'>
              <div>
                <Input
                  type='text'
                  placeholder='NIRE'
                  label='NIRE'
                  id='nire'
                  name='nire'
                  value={formik.values.nire}
                  error={formik.errors.nire}
                  touched={formik.touched.nire}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
              <div>
                <Select
                  label='Principal objetivo social:'
                  id='principalObjetoSocial'
                  name='principalObjetoSocial'
                  value={formik.values.principalObjetoSocial}
                  error={formik.errors.principalObjetoSocial}
                  touched={formik.touched.principalObjetoSocial}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                >
                  <option value='Objetivo 01'>Objetivo 01</option>
                  <option value='Objetivo 02'>Objetivo 01</option>
                  <option value='Objetivo 03'>Objetivo 01</option>
                  <option value='Objetivo 04'>Objetivo 01</option>
                </Select>
              </div>
              <div>
                <Select
                  label='Principal Atividade:'
                  id='principalAtividade'
                  name='principalAtividade'
                  value={formik.values.principalAtividade}
                  error={formik.errors.principalAtividade}
                  touched={formik.touched.principalAtividade}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                >
                  <option value='1'>Banco múltiplo</option>
                  <option value='2'>Banco de investimentos</option>
                  <option value='3'>Bolsa de valores e mercadorias</option>
                  <option value='4'>Clube de investimentos</option>
                </Select>
              </div>
              <div>
                <Select
                  label='Possui algum vínculo com a Ágora:'
                  id='possuiVinculocomAgora'
                  name='possuiVinculocomAgora'
                  value={formik.values.possuiVinculocomAgora}
                  error={formik.errors.possuiVinculocomAgora}
                  touched={formik.touched.possuiVinculocomAgora}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                >
                  <option value='1'>Banco múltiplo</option>
                  <option value='2'>Banco de investimentos</option>
                  <option value='3'>Bolsa de valores e mercadorias</option>
                  <option value='4'>Clube de investimentos</option>
                </Select>
              </div>
            </div>

            <div className='grid grid-cols-4 gap-4 -mt-6'>
              <div>
                <Input
                  type='text'
                  placeholder='CEP'
                  label='CEP'
                  id='cep'
                  name='cep'
                  value={formik.values.cep}
                  error={formik.errors.cep}
                  touched={formik.touched.cep}
                  onChange={formik.handleChange}
                  onBlur={(e) => resolveCep(e)}
                />
              </div>
              <div>
                <Input
                  type='text'
                  placeholder='Número'
                  label='Número'
                  id='numero'
                  name='numero'
                  value={formik.values.numero}
                  error={formik.errors.numero}
                  touched={formik.touched.numero}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
              <div className='col-span-2'>
                <Input
                  type='text'
                  placeholder='Endereço'
                  label='Endereço'
                  disabled
                  id='endereco'
                  name='endereco'
                  value={formik.values.endereco}
                  error={formik.errors.endereco}
                  touched={formik.touched.endereco}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
            </div>

            <div className='grid grid-cols-4 gap-4 -mt-6'>
              <div>
                <Input
                  type='text'
                  placeholder='Complemento'
                  label='Complemento'
                  id='complemento'
                  name='complemento'
                  value={formik.values.complemento}
                  error={formik.errors.complemento}
                  touched={formik.touched.complemento}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
              <div>
                <Input
                  type='text'
                  placeholder='Bairro'
                  label='Bairro'
                  disabled
                  id='bairro'
                  name='bairro'
                  value={formik.values.bairro}
                  error={formik.errors.bairro}
                  touched={formik.touched.bairro}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
              <div>
                <Input
                  type='text'
                  placeholder='Estado'
                  label='Estado'
                  disabled
                  id='estado'
                  name='estado'
                  value={formik.values.estado}
                  error={formik.errors.estado}
                  touched={formik.touched.estado}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
              <div>
                <Input
                  type='text'
                  placeholder='Cidade'
                  label='Cidade'
                  disabled
                  id='cidade'
                  name='cidade'
                  value={formik.values.cidade}
                  error={formik.errors.cidade}
                  touched={formik.touched.cidade}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
            </div>

            <div className='flex flex-row justify-between'>
              <Button type='button'>VOLTAR</Button>
              <Button type='submit'>PROSSEGUIR</Button>
            </div>
          </div>
        </section>
      </form>
    </div>
  );
}
