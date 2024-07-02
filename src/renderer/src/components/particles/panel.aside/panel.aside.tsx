import React from 'react';
import { PanelAsideInterface } from './panel.aside.interface.ts';

export const PanelAside: React.FC<PanelAsideInterface> = ({ side, children, open = false }: PanelAsideInterface) => {
  return (
    <div className={ `panel-aside bg-transparent h-100${ open ? ' open' : '' }` }>
      <div className={ `h-100` }>
        { children }
      </div>
    </div>
  );
};
