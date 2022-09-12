import Button from '../../../../../components/forms/Button';
import { useDispatch } from 'react-redux';

export interface MenuAdministradoresProps {
  visible: boolean;
}

export default function MenuAdministradores(props: MenuAdministradoresProps) {
  const dispatch = useDispatch();
  let textClass = 'block';
  if (props.visible) {
    textClass = 'block';
  } else {
    textClass = 'hidden';
  }
  return (
    <>
      <div className={`flex flex-row text-left ${textClass} mt-5`}>
        <Button type='button' color='secondary'>
          Adicionar administrador
        </Button>
      </div>
    </>
  );
}
