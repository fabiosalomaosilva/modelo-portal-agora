import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import swal from 'sweetalert';

import Button from '../../../components/forms/Button';
import Input from '../../../components/forms/Input/input';
import Select from '../../../components/forms/Select';
import Separator from '../../../components/forms/Separator';
import TitleSeparator from '../../../components/forms/TitleSeparator';
import { Administrador, ContaBancaria } from '../../../models/conta';
import { RootState } from '../../../store';
import {
  deleteAdministrador,
} from '../../../store/rootSlice';
import { Cliente } from '../../../models/cliente';
import MaskInput from '../../../components/forms/Input/inputTextMask';
import DecimalInput from '../../../components/forms/Input/inputDecimal';
import MenuControladoras from './componentes/MenuControladoras';
import MenuAdministradores from './componentes/MenuAdministradores';
import FormControladora from './componentes/FormControladora';
import FormPessoaProprietaria from './componentes/FormPessoaProprietaria';
import FormAdministrador from './componentes/FormAdministrador';

export default function CadastroPjPasso03() {
  const cliente = useSelector((state: RootState) => state.cliente);
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const showControladora = useSelector(
    (state: RootState) => state.showPanelControladoras
  );
  const showPessoaProprietaria = useSelector(
    (state: RootState) => state.showPanelPessoaProprietaria
  );
  const showMenuControladora = useSelector(
    (state: RootState) => state.showMenuControladora
  );
  const textoMenuControladoraPessoaProprietaria = useSelector(
    (state: RootState) => state.textoMenuControladoraPessoaProprietaria
  );
  
  const removeConta = (item: Administrador) => {
    swal({
      title: 'Deseja excluir?',
      text: 'Deseja excluir o Administrador?',
      icon: 'warning',
      buttons: ['Cancelar', 'Excluir'],
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(deleteAdministrador(item));
        swal('Pronto! Conta bancária excluída!', {
          icon: 'success',
        });
      } else {
        swal('Dados não excluídos!');
      }
    });
  };

  return (
    <div>
      <section id='header-passo03' className='my-4'>
        <h1 className='text-left mb-4'>
          Representante legal e pessoa autorizada a emitir ordens
        </h1>
        <p className='text-left mb-4'>
          Informe a controladora, se houver, e os representantes autorizados a
          assinar os documentos pela empresa, conforme previsto no contrato (ou
          estatuto) social e/ou procuração.
        </p>
        <p className='text-left mb-4'>
          É importante que as pessoas com permissão para emitir ordens sejam
          identificadas, mesmo que sejam as mesmas autorizadas a assinar
          documentos em nome da empresa.
        </p>
      </section>

      <section id='info-banco-passo02' className='my-6'>
        <TitleSeparator label={textoMenuControladoraPessoaProprietaria} />
        <div className='text-left'>
          <MenuControladoras visible={showMenuControladora} />
          <FormControladora visible={showControladora} />
          <FormPessoaProprietaria visible={showPessoaProprietaria} />
        </div>

      </section>

      <section id='info-banco-passo02' className='my-6'>
        <TitleSeparator label='Administradores:' />
        <div className='text-left'>
          {/* <MenuAdministradores visible={true} /> */}
          <FormAdministrador visible={true} />
          <br />
          {cliente.administradores?.length > 0 && (
        <div className='overflow-x-auto bg-white shadow-md rounded'>
          <table className='min-w-full'>
            <thead>
              <tr className='bg-secondary text-gray-50 uppercase text-sm'>
                <th className='py-3 px-6 text-left'>Tipo</th>
                <th className='py-3 px-6 text-left'>Banco</th>
                <th className='py-3 px-6 text-left'>Agência</th>
                <th className='py-3 px-6 text-left'>Conta</th>
                <th className='py-3 px-6 text-right'>Excluir</th>
              </tr>
            </thead>
            <tbody className='text-gray-600 text-sm font-light'>
              {cliente.administradores.map((item, index) => (
                <tr
                  key={index}
                  className='border-b border-gray-200 hover:bg-gray-100 whitespace-nowrap'
                >
                  <td className='py-4 px-6 text-left font-normal whitespace-nowrap'>
                    {item.nome}
                  </td>
                  <td className='py-4 px-6 text-left font-normal whitespace-nowrap'>
                    {item.cpf}
                  </td>
                  <td className='py-4 px-6 text-left font-normal whitespace-nowrap'>
                    {item.rg}
                  </td>
                  <td className='py-4 px-6 text-left font-normal whitespace-nowrap'>
                    {item.orgaoEmissor}
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
        </div>
      </section>
      <br />
      <div className='flex flex-row justify-between'>
          <Button type='button' onClick={() => navigate('/pj/passo02')}>
            VOLTAR
          </Button>
          <Button type='button'>PROSSEGUIR</Button>
        </div>
        <br />


    </div>
  );
}
