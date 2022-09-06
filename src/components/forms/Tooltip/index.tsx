import React from 'react';

export interface TooltipProps {
  text: string;
}

export default function Tooltip(props: TooltipProps) {
  return (
    <i className='tooltip'>
      <span>{props.text}</span>
    </i>
  );
}
