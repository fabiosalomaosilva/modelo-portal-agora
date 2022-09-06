import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import App from './App';
import Header from './components/Header';
import CadastroPjPasso01 from './pages/cadastropj/CadastroPjPasso01';
import CadastroPjPasso02 from './pages/cadastropj/CadastroPjPasso02';
import CadastroPjPasso03 from './pages/cadastropj/CadastroPjPasso03';
import Dashboard from './pages/Dashboard';

const AppRoutes = () => {
  return (
    <div>
      <Header />
      <ToastContainer />
      <div className='flex justify-center'>
        <div className='w-[1280px] mx-14'>
          <Routes>
            <Route path='/' element={<Dashboard />} />
            <Route path='/pj/passo01' element={<CadastroPjPasso01 />} />
            <Route path='/pj/passo02' element={<CadastroPjPasso02 />} />
            <Route path='/pj/passo03' element={<CadastroPjPasso03 />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default AppRoutes;
