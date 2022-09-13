import React from 'react';
import { useDispatch } from 'react-redux';
import { Administrador } from '../../../../../models/conta';
import { deleteAdministrador } from '../../../../../store/rootSlice';

export interface ListaAdministradoresProps {
  data: Administrador[];
  visible: boolean;
}

export default function ListaAdministradores(props: ListaAdministradoresProps) {
  const dispatch = useDispatch();
  let textClass = 'block';
  if (props.visible) {
    textClass = 'block';
  } else {
    textClass = 'hidden';
  }
  return (
    <div className={textClass}>
      {props.data?.length > 0 && (
        <div className='overflow-x-auto bg-white shadow-md rounded'>
          <table className='min-w-full'>
            <thead>
              <tr className='bg-secondary text-gray-50 uppercase text-sm'>
                <th className='py-3 px-6 text-left'>Nome</th>
                <th className='py-3 px-6 text-left'>CPF</th>
                <th className='py-3 px-6 text-left'>RG</th>
                <th className='py-3 px-6 text-left'>Órgão emissor</th>
                <th className='py-3 px-6 text-right'>Ações</th>
              </tr>
            </thead>
            <tbody className='text-gray-600 text-sm font-light'>
              {props.data.map((item, index) => (
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
                      onClick={() => dispatch(deleteAdministrador(item))}
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
  );
}
