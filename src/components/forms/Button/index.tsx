import React from 'react';

export interface ButtonProps {
  onClick?: () => void;
  tooltip?: string;
  children?: string;
  size?: 'sm' | 'lg';
  type: 'submit' | 'button' | 'reset';
  color?: 'primary' | 'secondary';
  className?: string;
}

export default function Button(props: ButtonProps) {
  let textClass = '';
  switch (props.size) {
    case 'sm':
      textClass = 'h-8 px-8 mw-36 font-sm';
      break;
    case 'lg':
      textClass = 'h-12 px-8 mw-60';
      break;
    default:
      textClass = 'h-12 px-8 mw-60';
  }

  switch (props.color) {
    case 'primary':
      textClass += ' bg-primary hover:bg-primaryLight';
      break;
    case 'secondary':
      textClass += ' bg-secondary text-white hover:bg-secondaryLight';
      break;
    default:
      textClass += ' bg-primary hover:bg-primaryLight';
      break;
  }
  return (
    <button
      type={props.type}
      className={`${textClass} outline-none rounded-full transition-all ease-in-out ${props.className}`}
      onClick={props.onClick}
      title={props.tooltip}
    >
      <span className='font-semibold text-sm '>{props.children}</span>
    </button>
  );
}
