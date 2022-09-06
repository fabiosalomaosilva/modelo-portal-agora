import { Controlador } from '../../../../../models/conta';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../../store';
import { deleteControladora, setSelectedControlador } from '../../../../../store/rootSlice';

type RowProps = {
  item: Controlador;
  children?: JSX.Element;
};

export default function Row(props: RowProps) {
  const cliente = useSelector((state: RootState) => state.cliente);
  const dispatch = useDispatch();

  return (
    <div>
      <li>
        <div id='1' className='card-pre card-parent'>
          <div className='grid grid-cols-4 h-11'>
            <div className='card-title card-title-child'>
              <div className='card-title-sm'>Razão social:</div>
              <div>{props.item.razaoSocial}</div>
            </div>
            <div className='card-title card-title-child'>
              <div className='card-title-sm'>CNPJ:</div>
              <div>{props.item.cnpj}</div>
            </div>
            <div className='card-title card-title-child'>
              <div className='card-title-sm'>Participação:</div>
              <div>{props.item.participacao}%</div>
            </div>
            <div className='text-right'>
              <button className='rounded-full ml-3 bg-gray-200 p-2 hover:bg-gray-300' onClick={() => dispatch(setSelectedControlador(props.item))}>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='w-5 h-5'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10'
                  />
                </svg>
              </button>
              <button
                className='rounded-full ml-3 bg-gray-200 p-2 hover:bg-gray-300'
                onClick={() => dispatch(deleteControladora(props.item))}
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='w-5 h-5'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0'
                  />
                </svg>
              </button>
            </div>
          </div>
          {/* <div className='grid grid-cols-6'>
            <div className='col-span-2 card-title'>
              <div className='card-title-sm'>Nome:</div>
              <div>Sara Adriana Silveira</div>
            </div>
            <div className='card-title card-title'>
              <div className='card-title-sm'>CPF:</div>
              <div>573.488.748-00</div>
            </div>
            <div className='card-title'>
              <div className='card-title-sm'>RG:</div>
              <div>28.353.535-0</div>
            </div>

            <div className='card-title'>
              <div className='card-title-sm'>Participação:</div>
              <div>30%</div>
            </div>
            <div className='card-title card-title-child-icon text-right'>
              <button
                className='card-btn-action'
                onClick='extendCard(event, 1)'
                type='button'
              >
                <i className='fa-solid fa-up-right-and-down-left-from-center card-icon'></i>
              </button>
              <button className='card-btn-action'>
                <i className='fa-solid fa-edit card-icon'></i>
              </button>
              <button className='card-btn-action'>
                <i className='fa-solid fa-trash card-icon'></i>
              </button>
            </div>
          </div> */}
          {/* <div className='grid grid-cols-6 card-inner'>
            <div className='col-md-2 card-title'>
              <div className='col-12 card-title-sm'>
                Tem vínculo com a Ágora CTVM SA:
              </div>
              <div className='col-12'>${i.temVinculoAgora}</div>
            </div>
            <div className='col-md-2 card-title'>
              <div className='col-12 card-title-sm'>Vínculo:</div>
              <div className='col-12'>${i.tipoVinculo}</div>
            </div>
            <div className='col-md-2 card-title'>
              <div className='col-12 card-title-sm'>
                Pessoa Exposta Politicamente:
              </div>
              <div className='col-12'>${i.expostaPoliticamente}</div>
            </div>
            <div className='col-md-2 card-title'>
              <div className='col-12 card-title-sm'>
                Possui outra nacionalidade:
              </div>
              <div className='col-12'>Nã${i.possuiOutraNacionalidade}o</div>
            </div>
            <div className='col-md-2 card-title'>
              <div className='col-12 card-title-sm'>
                Tem residencia fiscal em outro país:
              </div>
              <div className='col-12'>${i.residenciaFiscalOutroPais}</div>
            </div>
            <div className='col-md-2 card-title'>
              <div className='col-12 card-title-sm'>
                Possui visto permanente em outro país:
              </div>
              <div className='col-12'>${i.possuiVistoPermanenteOutroPais}</div>
            </div>
          </div> */}
        </div>
      </li>
      {cliente.controladores.length > 0 && (
        <ul className='ml-10'>
          {cliente.controladores
            .filter((i) => i.controladorPai === props.item.cnpj)
            ?.map((i) => (
              <Row key={i.id} item={i} />
            ))}
        </ul>
      )}
    </div>
  );
}
