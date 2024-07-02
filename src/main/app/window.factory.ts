import { join } from 'path';
import { BaseWindow, shell } from "electron";
import { PlayerBrowserWindow } from '../windows/player.browser.window';
import { WidthHeightInterface } from '../interfaces/width.height.interface';
import icon from '../../../resources/icon.png?asset';

export class WindowFactory {
  #browserWindowDefaultOptions: Electron.BrowserWindowConstructorOptions;

  constructor(minWinSize: WidthHeightInterface) {
    this.#browserWindowDefaultOptions = {
      backgroundColor: '#E3E5E8',
      width: minWinSize.width,
      height: minWinSize.height,
      minWidth: minWinSize.width,
      minHeight: minWinSize.height,
      show: false,
      autoHideMenuBar: true,
      // frame: false,
      // titleBarStyle: 'hidden',
      // titleBarOverlay: {  height: 40 },
      // transparent: true,
      // tabbingIdentifier: 'cabp-kelvin',
      ...(process.platform === 'linux' ? { icon } : {}),
      webPreferences: {
        preload: join(__dirname, '../preload/index.js'),
        sandbox: false
      }
    };
  }

  newBrowserWindow(
    options: Electron.BrowserWindowConstructorOptions | undefined
  ): PlayerBrowserWindow {
    const win = new PlayerBrowserWindow({ ...this.#browserWindowDefaultOptions, ...options });

    win.on('ready-to-show', () => {
      win.show();
    });

    win.webContents.setWindowOpenHandler((details) => {
      shell.openExternal(details.url).then();
      return { action: 'deny' };
    });

    return win;
  }
}
