import { MouseEventHandler } from 'react';

export interface TabButtonInterface {
  title: string;
  icon: string;
  onClick: MouseEventHandler<HTMLLabelElement>;
  active?: boolean;
}
