import { useDispatch, useSelector } from 'react-redux';
import Button from '../../../../../components/forms/Button';
import { PessoaProprietaria } from '../../../../../models/conta';
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

  let dados: PessoaProprietaria[] =
    cliente.pessoasProprietarias.length > 0 ? cliente.pessoasProprietarias : [];
  cliente.controladores.map((item) => {
    const pessoa: PessoaProprietaria = {
      id: item.id,
      nome: item.razaoSocial,
      cpf: item.cnpj,
      controladorPai: item.controladorPai,
      participacao: item.participacao,
      rg: 0,
      orgaoEmissor: 'false',
      pessoaExpostaPoliticamente: false,
      tipoVinculo: 'false',
      possuiOutraNacionalidade: false,
      possuiVistoPermanenteOutroPais: false,
      temResidenciafiscalOutroPais: false,
      vinculoComAgora: false,
      nifs: [],
    };
    dados = [...dados, pessoa];
  });

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
          {dados.map((item: any) => {
            if (item.controladorPai === '0') {
              return <Row key={item.id} item={item} dados={dados} />;
            }
          })}
        </ul>
      </div>
    </>
  );
}
