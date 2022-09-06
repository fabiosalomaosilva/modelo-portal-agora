import React from 'react';
import logo from '../../assets/agora-logo.svg';

export default function Header() {
  return (
    <div className='h-20 bg-header'>
      <div className='flex justify-center'>
        <div className='w-[1280px] pt-3 mx-14'>
          <img src={logo} height='50' width='250' alt='Agora logo' />
        </div>
      </div>
    </div>
  );
}
