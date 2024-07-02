import { ReactElement } from 'react';
import { HorizontalSideEnum } from '../../../enums/horizontal.side.enum.ts';

export interface PanelAsideInterface {
  side: HorizontalSideEnum;
  children: ReactElement;
  open?: boolean;
}
