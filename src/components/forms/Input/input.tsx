import { FormikTouched } from 'formik';
import React from 'react';
import Tooltip from '../Tooltip';

export interface InputProps {
  label?: string;
  placeholder?: string;
  value?: string | number | readonly string[] | undefined;
  onChange?: (e: any) => void;
  onBlur?: (e: any) => void;
  description?: string;
  tooltip?: string;
  className?: string;
  id?: string;
  name?: string;
  error?: string | undefined;
  touched?: boolean | undefined;
  disabled?: boolean;
  max?: number | undefined;
  min?: number | undefined;
  type: 'text' | 'number';
}

export default function Input(props: InputProps) {
  let border = 'border-gray-300';

  if (props.error != undefined) {
    border = 'border-red-300 placeholder:text-red-400 bg-red-50';
  }

  return (
    <div className='my-8'>
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
      <input
        id={props.id}
        disabled={props.disabled}
        name={props.name}
        type={props.type}
        className={`w-full border-[1px] ${border} px-3 py-3 text-md outline-none active:outline-none focus:border-gray-400 h-12 ${props.className}`}
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange}
        onBlur={props.onBlur}
        maxLength={props.max}
        minLength={props.min}
      />
      {props.error && props.touched ? (
        <div className='text-xs ml-2 text-red-400'>{props.error}</div>
      ) : null}
    </div>
  );
}
