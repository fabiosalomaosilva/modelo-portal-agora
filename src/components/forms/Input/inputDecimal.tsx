import { useState } from 'react';
import NumberFormat from 'react-number-format';
import Tooltip from '../Tooltip';

export interface InputDecimalProps {
  type?: 'currency' | 'decimal' | 'percent' | 'telefone';
  label?: string;
  placeholder?: string;
  value?: string | number | null | undefined;
  onChange?: (e: any) => void;
  onBlur?: (e: any) => void;
  floatValue?: number;
  tooltip?: string;
  className?: string;
  error?: string | undefined;
  touched?: boolean | undefined;
  disabled?: boolean;
  id?: string;
  name?: string;
  maxLenght?: number;
  colSpan?: number;
}

const onlyNumbers = (value: any) => {
  if (value === undefined || value === null) return;
  return value
    .toString().replace(/\./g,' ')
    .replace('-', '')
    .replace(',', '.')
    .replace('/', '')
    .replace('%', '')
    .replace('R$', '')
    .replace('$', '');
};

export default function InputDecimal(props: InputDecimalProps) {
  let border = 'border-gray-300';
  let cols = '';
  
  if(props.colSpan){
    cols = ` col-span-1 md:col-span-${props.colSpan}`;
  }

  if (props.error != undefined) {
    border = 'border-red-300 placeholder:text-red-400 bg-red-50';
  }

  return (
    <div className={`my-2 ${cols}`}>
      <div className='h-7'>
        <label
          htmlFor={props.id}
          className='text-sm font-semibold text-gray-700'
        >
          {props.label}
        </label>
        {props.tooltip != null && props.tooltip.length > 0 && (
          <Tooltip text={props.tooltip} />
        )}
      </div>

      <NumberFormat
        id={props.id}
        disabled={props.disabled}
        name={props.name}
        maxLength={props.maxLenght}
        decimalSeparator={','}
        thousandSeparator={'.'}
        decimalScale={2}
        fixedDecimalScale={true}
        className={`w-full border-[1px] ${border} px-3 py-3 text-md outline-none active:outline-none focus:border-gray-400 h-12 ${props.className}`}
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange}
        onBlur={props.onBlur}
      />
      {props.error && props.touched  ?  (
        <div className='text-xs ml-2 text-red-400'>{props.error}</div>
      ) : null}
    </div>
  );
}
