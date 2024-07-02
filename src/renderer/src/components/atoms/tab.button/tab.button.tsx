import React from 'react';
import { TabButtonInterface } from './tab.button.interface.ts';

export const TabButton: React.FC<TabButtonInterface> = ({ title, icon, onClick, active }: TabButtonInterface) => {
  return (
    <button
      type="button"
      title={ title }
      onClick={ onClick }
      className={ `btn border-0 rounded-bottom-0 me-1 p-0 px-2 pt-1 ${ active ? 'btn-secondary' : 'btn-light' }` }
    >
      <i className={ icon } /><span className="ps-2 pe-1">{ title }</span>
    </button>
  );
};
