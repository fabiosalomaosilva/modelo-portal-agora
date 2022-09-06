import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { cleanCliente } from '../../store/rootSlice';

export default function Dashboard() {
    const dispatch = useDispatch();
    
    useEffect(() => {
      dispatch(cleanCliente())
    }, [])

  return (
    <div className='w-[1230px]'>
    <div className="flex flex-col justify-center align-middle text-center mt-20">
        <div className="h-15 p-10 border-[1px] border-gray-200 rounded-lg shadow-md">
            <h1 className='mb-5'>Bem vindo ao portal</h1>
            <Link to={'/pj/passo01'} className='py-3 px-4 rounded-lg bg-teal-300 text-gray-700 font-normal text-sm hover:bg-teal-200 transition-all ease-in-out'>Cadastro de Pessoa Jurídica</Link>
        </div>
    </div>
    </div>
  );
}
