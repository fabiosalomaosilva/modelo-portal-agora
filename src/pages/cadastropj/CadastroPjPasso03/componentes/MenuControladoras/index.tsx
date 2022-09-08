import React, { createRef, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../../../../components/forms/Button';
import { RootState } from '../../../../../store';
import {
  deleteControladora,
  setShowPanelControladoras,
  setShowPanelPessoaProprietaria,
} from '../../../../../store/rootSlice';
import Row from './Row';

export interface MenuControladorasProps {
  visible: boolean;
}

export default function MenuControladoras(props: MenuControladorasProps) {
  const cliente = useSelector((state: RootState) => state.cliente);
  const dispatch = useDispatch();

  const arrLength = cliente.controladores.length;
  const elRefs = React.useRef([]);

  if (elRefs.current.length !== arrLength) {
    elRefs.current = Array()
      .fill(arrLength)
      .map((_, i) => elRefs.current[i] || createRef());
  }

  let textClass = 'flex';
  if (props.visible) {
    textClass = 'flex';
  } else {
    textClass = 'hidden';
  }

  return (
    <>
      <div className={`flex flex-col ${textClass}`}>
        <div className={`flex flex-row justify-between mt-5`}>
          <Button
            type='button'
            color='secondary'
            onClick={() => dispatch(setShowPanelControladoras())}
          >
            Adicionar nova Controladora, Controlada ou Coligada
          </Button>
          <Button
            type='button'
            color='secondary'
            onClick={() => dispatch(setShowPanelPessoaProprietaria())}
          >
            Adicionar Pessoa Proprietária
          </Button>
        </div>

        <ul id='card-list'>
          {cliente.controladores.map((item) => {
            if (item.controladorPai === '0') {
              return <Row key={item.id} item={item} />;
            }
          })}
        </ul>
      </div>
    </>
  );
}
