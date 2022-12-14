import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import { v4 as uuidv4 } from 'uuid';

import Button from '../../../components/forms/Button';
import Input from '../../../components/forms/Input/input';
import Select from '../../../components/forms/Select';
import TitleSeparator from '../../../components/forms/TitleSeparator';
import { ContaBancaria } from '../../../models/conta';
import { RootState } from '../../../store';
import {
  addContaBancaria,
  deleteContaBancaria,
  setCliente,
} from '../../../store/rootSlice';
import { Cliente } from '../../../models/cliente';
import MaskInput from '../../../components/forms/Input/inputTextMask';
import DecimalInput from '../../../components/forms/Input/inputDecimal';
import swal from 'sweetalert';
import { convertToFloat } from '../../../utils/converters/converters';

type CadastroPjPasso02Errors = {
  aplicacaoFinanceira?: string;
  emprestimosFinanciamentos?: string;
  patrimonioLiquido?: string;
  faturamento?: string;
  tipoEnderecoCorrespondencia?: string;
  especificacaoEnderecoCorrespondencia?: string;
  contasBancarias?: string;
};

const onlyNumbers = (value: any) => {
  if (value === undefined || value === null) return;
  return value
    .toString()
    .replace('.', '')
    .replace('.', '')
    .replace('.', '')
    .replace('.', '')
    .replace('.', '')
    .replace('.', '')
    .replace('.', '')
    .replace('-', '')
    .replace(',', '.')
    .replace('/', '')
    .replace('%', '')
    .replace('R$', '')
    .replace('$', '');
};

export default function CadastroPjPasso02() {
  let cliente = useSelector((state: RootState) => state.cliente);
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const [conta, setConta] = useState<string>('');
  const [agencia, setAgencia] = useState<string>('');
  const [tipo, setTipo] = useState<string>('0');
  const [digito, setDigito] = useState<string>('');
  const [banco, setBanco] = useState<string>('0');
  const [showEspecificacao, setShowEspecificacao] = useState<boolean>(false);

  const handleContaBanco = () => {
    console.log('entrou');
    const id = uuidv4();
    if (tipo && agencia && conta && digito && banco) {
      toast('Conta adicionada', { type: 'success' });
      console.log(conta);
      const contaBancaria: ContaBancaria = {
        id,
        tipo,
        conta: parseInt(conta),
        agencia: parseInt(agencia),
        digito: parseInt(digito),
        banco: parseInt(banco),
      };
      dispatch(addContaBancaria(contaBancaria));
      setConta('');
      setAgencia('');
      setDigito('');
      setTipo('0');
      setBanco('0');
    }
  };

  const onSubmit = (values: Cliente) => {
    if (cliente.contasBancarias.length === 0) {
      toast('Nenhuma conta banc??ria foi cadastrada', { type: 'error' });
      return;
    }
    let clienteUpdate: Cliente = {
      ...cliente,
      aplicacaoFinanceira: convertToFloat(values.aplicacaoFinanceira),
      emprestimosFinanciamentos: convertToFloat(values.emprestimosFinanciamentos),
      patrimonioLiquido: convertToFloat(values.patrimonioLiquido),
      faturamento: convertToFloat(values.faturamento),
      tipoEnderecoCorrespondencia: formik.values.tipoEnderecoCorrespondencia,
      especificacaoEnderecoCorrespondencia:
        formik.values.especificacaoEnderecoCorrespondencia,
    };

    dispatch(setCliente(clienteUpdate));
    navigate('/pj/passo03');
  };

  const validate = (values: Cliente) => {
    const errors: CadastroPjPasso02Errors = {};
    if (!values.aplicacaoFinanceira) {
      errors.aplicacaoFinanceira = 'Campo o Aplica????o financeira ?? obrigat??ria';
    }
    if (!values.emprestimosFinanciamentos) {
      errors.emprestimosFinanciamentos =
        'Campo o Empr??stimos e financiamentos ?? obrigat??rio';
    }
    if (!values.patrimonioLiquido) {
      errors.patrimonioLiquido = 'Campo o Patrim??nio l??quido ?? obrigat??rio';
    }
    if (!values.faturamento) {
      errors.faturamento = 'Campo o Faturamento ?? obrigat??rio';
    }
    if (!values.tipoEnderecoCorrespondencia) {
      errors.tipoEnderecoCorrespondencia =
        'Campo o Tipo de Endere??o de correspond??ncia ?? obrigat??rio';
    }

    if (
      values.tipoEnderecoCorrespondencia !== '0' &&
      values.tipoEnderecoCorrespondencia !== '1'
    ) {
      errors.especificacaoEnderecoCorrespondencia =
        'Campo o Especifica????o de endere??o de correspond??ncia ?? obrigat??ria';
    }

    // if (values.contasBancarias.length === 0) {
    //   errors.contasBancarias =
    //     'Nenhuma conta banc??ria foi cadastrada';

    // }

    return errors;
  };

  const formik = useFormik({
    initialValues: cliente,
    validate,
    onSubmit,
  });

  useEffect(() => {
    if (
      formik.values.tipoEnderecoCorrespondencia === '0' ||
      formik.values.tipoEnderecoCorrespondencia === '1'
    ) {
      setShowEspecificacao(false);
    } else {
      setShowEspecificacao(true);
    }
  }, [formik.values.tipoEnderecoCorrespondencia]);

  const removeConta = (item: ContaBancaria) => {
    swal({
      title: 'Deseja excluir?',
      text: 'Deseja excluir a conta banc??ria?',
      icon: 'warning',
      buttons: ['Cancelar', 'Excluir'],
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(deleteContaBancaria(item));
        swal('Pronto! Conta banc??ria exclu??da!', {
          icon: 'success',
        });
      } else {
        swal('Dados n??o exclu??dos!');
      }
    });
  };

  return (
    <div>
      <section id='header-passo02' className='my-4'>
        <h1 className='text-left mb-4'>Informa????es banc??rias e patrimoniais</h1>
        <p className='text-left mb-4'>
          Preencha abaixo as informa????es relativas a uma ou mais contas
          banc??rias que ser??o utilizadas em suas negocia????es na ??gora.
        </p>
        <p className='text-left mb-4'>
          Informe se voc?? ir?? operar uma carteira pr??pria, isto ??, com ativos
          como a????es e fundos de sua propriedade, ou uma carteira de terceiros,
          formada por ativos pertencentes a outra pessoa. Neste caso, ??
          necess??rio que voc?? tamb??m seja cadastrado junto ?? CVM como
          administrador de carteira de terceiros.
        </p>
      </section>

      <section id='info-banco-passo02' className='my-6'>
        <TitleSeparator label='Informa????es banc??rias:' />
        <div className='grid grid-cols-1 md:grid-cols-9 gap-1 md:gap-4 m-0 md:mt-6'>
          <Select
            colSpan={2}
            label='Banco'
            value={banco}
            onChange={(e) => setBanco(e.target.value)}
          >
            <option value='001'>001 - Banco do Brasil</option>
            <option value='002'>002 - Banco Central do Brasil</option>
            <option value='003'>003 - Banco da Amaz??nia</option>
            <option value='004'>004 - Banco do Nordeste</option>
          </Select>
          <MaskInput
            colSpan={2}
            type='text'
            mask='9999'
            placeholder='Ag??ncia'
            label='Ag??ncia'
            value={agencia}
            onChange={(e) => setAgencia(e.target.value)}
          />
          <Input
            colSpan={2}
            type='number'
            className='textfield'
            placeholder='Conta'
            label='Conta'
            value={conta}
            onChange={(e) => setConta(e.target.value)}
          />
          <MaskInput
            type='text'
            mask='9'
            label='D??gito'
            value={digito}
            className='textfield'
            onChange={(e) => setDigito(e.target.value)}
          />
          <Select
            colSpan={2}
            label='Tipo de conta'
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
          >
            <option value='Corrente'>Corrente</option>
            <option value='Investimento'>Investimento</option>
          </Select>
        </div>
        <div className='text-right md:mt-4'>
          <Button type='button' size='sm' onClick={() => handleContaBanco()}>
            Adicionar conta
          </Button>
        </div>
      </section>

      {cliente.contasBancarias?.length > 0 && (
        <div className='overflow-x-auto bg-white shadow-md rounded'>
          <table className='min-w-full'>
            <thead>
              <tr className='bg-secondary text-gray-50 uppercase text-sm'>
                <th className='py-3 px-6 text-left'>Tipo</th>
                <th className='py-3 px-6 text-left'>Banco</th>
                <th className='py-3 px-6 text-left'>Ag??ncia</th>
                <th className='py-3 px-6 text-left'>Conta</th>
                <th className='py-3 px-6 text-right'>Excluir</th>
              </tr>
            </thead>
            <tbody className='text-gray-600 text-sm font-light'>
              {cliente.contasBancarias.map((item, index) => (
                <tr
                  key={index}
                  className='border-b border-gray-200 hover:bg-gray-100 whitespace-nowrap'
                >
                  <td className='py-4 px-6 text-left font-normal whitespace-nowrap'>
                    {item.tipo}
                  </td>
                  <td className='py-4 px-6 text-left font-normal whitespace-nowrap'>
                    {item.banco}
                  </td>
                  <td className='py-4 px-6 text-left font-normal whitespace-nowrap'>
                    {item.agencia}
                  </td>
                  <td className='py-4 px-6 text-left font-normal whitespace-nowrap'>
                    {item.conta + '-' + item.digito}
                  </td>
                  <td className='py-4 px-6 text-right whitespace-nowrap'>
                    <button
                      type='button'
                      className='p-1 rounded-full w-7 h-7 font-bold text-gray-600 bg-gray-200 hover:bg-gray-300 -pl-[3px] solid'
                      onClick={() => removeConta(item)}
                    >
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth={1.5}
                        stroke='currentColor'
                        className='w-5 h-4'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          d='M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0'
                        />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <form onSubmit={formik.handleSubmit}>
        <section id='info-patrimonio-passo02' className='my-6'>
          <TitleSeparator label='Situa????o patrimonial:' />
          <div className='text-left'>
            <div className='grid grid-cols-1 md:grid-cols-4 gap-1 md:gap-4 m-0 md:mt-6'>
              <DecimalInput
                label='Aplica????o financeira'
                tooltip='Ativos'
                id='aplicacaoFinanceira'
                name='aplicacaoFinanceira'
                value={formik.values.aplicacaoFinanceira}
                error={formik.errors.aplicacaoFinanceira}
                touched={formik.touched.aplicacaoFinanceira}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />

              <DecimalInput
                label='Empr??stimos e Financiamentos'
                tooltip='Ativos'
                id='emprestimosFinanciamentos'
                name='emprestimosFinanciamentos'
                value={formik.values.emprestimosFinanciamentos}
                error={formik.errors.emprestimosFinanciamentos}
                touched={formik.touched.emprestimosFinanciamentos}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />

              <DecimalInput
                label='Patrim??nio L??quido'
                tooltip='Ativos'
                id='patrimonioLiquido'
                name='patrimonioLiquido'
                value={formik.values.patrimonioLiquido}
                error={formik.errors.patrimonioLiquido}
                touched={formik.touched.patrimonioLiquido}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />

              <DecimalInput
                label='Faturamento'
                tooltip='Ativos'
                id='faturamento'
                name='faturamento'
                value={formik.values.faturamento}
                error={formik.errors.faturamento}
                touched={formik.touched.faturamento}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
          </div>
        </section>

        <div className='my-6'>
          <section id='info-correspondencia-passo02' className='my-6'>
            <TitleSeparator label='Dados para Correspond??ncia:' />
            <div className='grid grid-cols-1 md:grid-cols-4 gap-1 md:gap-4 m-0 md:mt-6'>
              <Select
                label='Tipo de endere??o'
                colSpan={2}
                id='tipoEnderecoCorrespondencia'
                name='tipoEnderecoCorrespondencia'
                value={formik.values.tipoEnderecoCorrespondencia}
                error={formik.errors.tipoEnderecoCorrespondencia}
                touched={formik.touched.tipoEnderecoCorrespondencia}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                <option value='1'>Comercial</option>
                <option value='2'>Outro</option>
              </Select>

              {showEspecificacao && (
                <Input
                  type='text'
                  colSpan={2}
                  label='Especifica????o do endere??o'
                  id='especificacaoEnderecoCorrespondencia'
                  name='especificacaoEnderecoCorrespondencia'
                  value={formik.values.especificacaoEnderecoCorrespondencia}
                  error={formik.errors.especificacaoEnderecoCorrespondencia}
                  touched={formik.touched.especificacaoEnderecoCorrespondencia}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              )}
            </div>
          </section>
          <div className='flex flex-row justify-between'>
            <Button type='button' onClick={() => navigate('/pj/passo01')}>
              VOLTAR
            </Button>
            <Button type='submit'>PROSSEGUIR</Button>
          </div>
        </div>
      </form>
    </div>
  );
}
