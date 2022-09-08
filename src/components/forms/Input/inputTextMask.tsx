import InputMask from 'react-input-mask';
import { FormikTouched } from 'formik';
import React from 'react';
import Tooltip from '../Tooltip';

export interface InputProps {
  mask: string | Array<(string | RegExp)>;
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
  max?: number;
  min?: number;
  type: 'text' | 'number';
  ref?: React.MutableRefObject<null>;
}

export default function MaskInput(props: InputProps) {
  let border = 'border-gray-300';

  if (props.error != undefined) {
    border = 'border-red-300 placeholder:text-red-400 bg-red-50';
  }

  return (
    <div className='my-2 md:my-8'>
      <div className='h-7'>
        <label
          htmlFor='txtNomeUsuario'
          className='text-sm font-semibold text-gray-700'
        >
          {props.label}
        </label>
        {props.tooltip != null && props.tooltip.length > 0 && (
          <Tooltip text={props.tooltip} />
        )}
      </div>
      <InputMask
        ref={props.ref}
        mask={props.mask}
        id={props.id}
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
      {props.error && props.touched  ?  (
        <div className='text-xs ml-2 text-red-400'>{props.error}</div>
      ) : null}
    </div>
  );
}

