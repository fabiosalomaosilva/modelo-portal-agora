import { Controlador, PessoaProprietaria } from '../../../../../models/conta';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../../store';
import {
  deleteControladora,
  setSelectedControlador,
} from '../../../../../store/rootSlice';
import { MutableRefObject, useRef, useState } from 'react';

type RowProps = {
  item: PessoaProprietaria;
  dados: PessoaProprietaria[];
  children?: JSX.Element;
};

export default function Row(props: RowProps) {
  const cliente = useSelector((state: RootState) => state.cliente);
  const dispatch = useDispatch();
  const inputCheckRef = useRef() as MutableRefObject<HTMLInputElement>;
  const [classExpand, setClassExpand] = useState<string>('max-h-0');

  const expandPanel = () => {
    inputCheckRef.current.checked = !inputCheckRef.current.checked;
    if (inputCheckRef.current.checked) {
      setClassExpand('max-h-[65px]');
    } else {
      setClassExpand('max-h-0');
    }
    console.log(classExpand);
  };
  return (
    <div>
      <li>
        {props.item.rg === 0 && props.item.orgaoEmissor === 'false' ? (
          <div id='1' className='card-pre card-parent'>
            <div className='grid grid-cols-6 h-11'>
              <div className='col-span-2 card-title'>
                <div className='card-title-sm'>Razão social:</div>
                <div>{props.item.nome}</div>
              </div>
              <div className='col-span-2 card-title'>
                <div className='card-title-sm'>CNPJ:</div>
                <div>{props.item.cpf}</div>
              </div>
              <div className='card-title'>
                <div className='card-title-sm'>Participação:</div>
                <div>{props.item.participacao}%</div>
              </div>
              <div className='text-right'>
                <button
                  className='p-1 rounded-full w-7 h-7 font-bold text-gray-600 bg-gray-200 hover:bg-gray-300 -pl-[3px] ml-1 mt-1'
                  onClick={() => dispatch(setSelectedControlador(props.item))}
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
                      d='M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10'
                    />
                  </svg>
                </button>
                <button
                  className='p-1 rounded-full w-7 h-7 font-bold text-gray-600 bg-gray-200 hover:bg-gray-300 -pl-[3px] ml-1 mt-1'
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
          </div>
        ) : (
          <div id='1' className='card-pre card-parent'>
            <div className='grid grid-cols-6 h-[45px]'>
              <div className='col-span-2 card-title'>
                <div className='card-title-sm'>Nome:</div>
                <div>{props.item.nome}</div>
              </div>
              <div className='card-title card-title'>
                <div className='card-title-sm'>CPF:</div>
                <div>{props.item.cpf}</div>
              </div>
              <div className='card-title'>
                <div className='card-title-sm'>RG:</div>
                <div>{props.item.rg}</div>
              </div>

              <div className='card-title'>
                <div className='card-title-sm'>Participação:</div>
                <div>{props.item.participacao}%</div>
              </div>
              <div className='text-right pt-1'>
                <input
                  type='checkbox'
                  className='peer hidden'
                  ref={inputCheckRef}
                />

                <button
                  className='p-1 rounded-full w-7 h-7 font-bold text-gray-600 bg-gray-200 hover:bg-gray-300 -pl-[3px] solid transition-transform duration rotate-0 peer-checked:rotate-180'
                  onClick={() => expandPanel()}
                  type='button'
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
                      d='M19.5 8.25l-7.5 7.5-7.5-7.5'
                    />
                  </svg>
                </button>
                <button className='p-1 rounded-full w-7 h-7 font-bold text-gray-600 bg-gray-200 hover:bg-gray-300 -pl-[3px] ml-1'>
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
                <button className='p-1 rounded-full w-7 h-7 font-bold text-gray-600 bg-gray-200 hover:bg-gray-300 -pl-[3px] ml-1'>
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
            <div
              className={`grid grid-cols-6 overflow-hidden transition-all duration-500 ${classExpand}`}
            >
              <div className='card-title py-2'>
                <div className='card-title-sm'>
                  Tem vínculo com a Ágora CTVM SA:
                </div>
                <div>
                  {props.item.tipoVinculo === 'true' ? 'Sim' : 'Não'}
                </div>
              </div>
              <div className='card-title py-2'>
                <div className='card-title-sm'>Vínculo:</div>
                <div>
                  {props.item.tipoVinculo === '' ? '' : props.item.tipoVinculo}
                </div>
              </div>
              <div className='card-title py-2'>
                <div className='card-title-sm'>
                  Pessoa Exposta Politicamente:
                </div>
                <div>
                  {props.item.pessoaExpostaPoliticamente === true
                    ? 'Sim'
                    : 'Não'}
                </div>
              </div>
              <div className='card-title py-2'>
                <div className='card-title-sm'>
                  Possui outra nacionalidade:
                </div>
                <div>
                  {props.item.possuiOutraNacionalidade === true ? 'Sim' : 'Não'}
                </div>
              </div>
              <div className='card-title py-2'>
                <div className='col-12 card-title-sm'>
                  Tem residencia fiscal em outro país:
                </div>
                <div>
                  {props.item.temResidenciafiscalOutroPais === true
                    ? 'Sim'
                    : 'Não'}
                </div>
              </div>
              <div className='card-title py-2'>
                <div className='card-title-sm'>
                  Possui visto permanente em outro país:
                </div>
                <div>
                  {props.item.possuiVistoPermanenteOutroPais === true
                    ? 'Sim'
                    : 'Não'}
                </div>
              </div>
            </div>
          </div>
        )}
      </li>
      {props.dados.length > 0 && (
        <ul className='ml-10'>
          {props.dados
            .filter((i) => i.controladorPai === props.item.cpf)
            ?.map((i) => (
              <Row key={i.id} dados={props.dados} item={i} />
            ))}
        </ul>
      )}
    </div>
  );
}
