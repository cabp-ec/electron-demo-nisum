import { BaseWindow } from 'electron';

export class MainBaseWindow extends BaseWindow {
  constructor(options?: Electron.BrowserWindowConstructorOptions) {
    super(options);
  }
}
