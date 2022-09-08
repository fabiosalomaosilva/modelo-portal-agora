import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Button from '../../../components/forms/Button';
import Input from '../../../components/forms/Input/input';
import Select from '../../../components/forms/Select';
import Separator from '../../../components/forms/Separator';
import TitleSeparator from '../../../components/forms/TitleSeparator';
import { ContaBancaria } from '../../../models/conta';
import { RootState } from '../../../store';
import {
  addContaBancaria,
  deleteContaBancaria,
  deleteControladora,
  setCliente,
} from '../../../store/rootSlice';
import { Cliente } from '../../../models/cliente';
import MaskInput from '../../../components/forms/Input/inputTextMask';
import DecimalInput from '../../../components/forms/Input/inputDecimal';
import MenuControladoras from './componentes/MenuControladoras';
import MenuAdministradores from './componentes/MenuAdministradores';
import FormControladora from './componentes/FormControladora';
import FormPessoaProprietaria from './componentes/FormPessoaProprietaria';

export default function CadastroPjPasso03() {
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
  function dispatch(arg0: {
    payload: import('../../../models/conta').Controlador;
    type: string;
  }): void {
    throw new Error('Function not implemented.');
  }

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
        <TitleSeparator label='Controladora ou pessoa proprietária:' />
        <div className='text-left'>
          <MenuControladoras visible={showMenuControladora} />
          <FormControladora visible={showControladora} />
          <FormPessoaProprietaria visible={showPessoaProprietaria} />
        </div>

      </section>

      <section id='info-banco-passo02' className='my-6'>
        <TitleSeparator label='Administradores:' />
        <div className='text-left'>
          <MenuAdministradores visible={true} />
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
