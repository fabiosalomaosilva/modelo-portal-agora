import Button from '../../../../../components/forms/Button';
import { useDispatch, useSelector } from 'react-redux';
import ListaAdministradores from '../ListaAdministradores';
import { RootState } from '../../../../../store';
import { setShowFormAdministrador } from '../../../../../store/rootSlice';

export interface MenuAdministradoresProps {
  visible: boolean;
}

export default function MenuAdministradores(props: MenuAdministradoresProps) {
  const cliente = useSelector((state: RootState) => state.cliente);
  const dispatch = useDispatch();
  let textClass = 'block';
  if (props.visible) {
    textClass = 'block';
  } else {
    textClass = 'hidden';
  }
  return (
    <div className={`flex flex-col  ${textClass}`}>
      <div className={`flex flex-row text-left my-5`}>
        <Button type='button' color='secondary' onClick={() => dispatch(setShowFormAdministrador())}>
          Adicionar administrador
        </Button>
      </div>
        <ListaAdministradores data={cliente.administradores} visible={true} />
    </div>
  );
}
