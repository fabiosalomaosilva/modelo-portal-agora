import React from 'react';

export interface TitleSeparatorProps {
  label?: string;
}

export default function TitleSeparator(props: TitleSeparatorProps) {
  return (
    <div className="mt-1">
      <h3 className='text-left mt-5'>{props.label}</h3>
        <hr className='border-[1px] border-gray-900' />
    </div>
  );
}
