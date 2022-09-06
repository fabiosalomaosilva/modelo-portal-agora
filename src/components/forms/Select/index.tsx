import React from 'react';
import Tooltip from '../Tooltip';

export interface SelectProps {
  label?: string;
  placeholder?: string;
  value?: string | number;
  onChange?: (e: any) => void;
  onBlur?: (e: any) => void;
  description?: string;
  children?: Array<any>;
  tooltip?: string;
  id?: string;
  name?: string;
  error?: string | undefined;
  touched?: boolean | undefined;
}

export default function Select(props: SelectProps) {
  let border = 'border-gray-300';

  if (props.error != undefined) {
    border = 'border-red-300 text-red-400 bg-red-50';
  }

  return (
    <div className='my-8'>
      <div className='h-7'>
        <label
          htmlFor='txtNomeUsuario'
          className='text-sm font-semibold block text-gray-700 mb-1'
        >
          {props.label}
        </label>
        {props.tooltip != null && props.tooltip.length > 0 && (
          <Tooltip text={props.tooltip} />
        )}
      </div>
      <select
        id={props.id}
        name={props.name}
        className={`w-full border-[1px] ${border} px-3 py-3 text-md outline-none active:outline-none focus:border-gray-400 h-12`}
        placeholder='Nome de usuário'
        value={props.value}
        onChange={props.onChange}
        onBlur={props.onBlur}
      >
        <option value='0' disabled>
          Selecione uma opção
        </option>
        {props.children}
      </select>
      {props.error && props.touched ? (
        <div className='text-xs ml-2 text-red-400'>{props.error}</div>
      ) : null}
    </div>
  );
}
