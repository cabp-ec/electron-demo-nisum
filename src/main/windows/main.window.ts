import { app, BrowserWindow, ipcMain } from 'electron';
import { PlayerBrowserWindow } from './player.browser.window';
import { WindowFactory } from '../app/window.factory';
import { IpcActions } from '../app/ipc.actions';

// import { IpcActions } from '../app/ipc.actions';

export class MainWindow {
  #loadPath: string;
  #loadPathIsUrl: boolean;
  #windowFactory: WindowFactory;
  #ipcActions: IpcActions;
  #win: PlayerBrowserWindow;

  constructor(
    loadPath: string,
    loadPathIsUrl: boolean,
    windowFactory: WindowFactory,
    ipcActions: IpcActions,
    options: Electron.BrowserWindowConstructorOptions | undefined
  ) {
    this.#windowFactory = windowFactory;
    this.#loadPath = loadPath;
    this.#loadPathIsUrl = loadPathIsUrl;
    this.#ipcActions = ipcActions;
    this.#win = this.#windowFactory.newBrowserWindow(options);
    this.#setIpcMessages();
    this.#launch(this.#loadPath, loadPathIsUrl);

    app.on('activate', () => {
      // On macOS, it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (PlayerBrowserWindow.getAllWindows().length === 0) {
        this.#win = this.#windowFactory.newBrowserWindow(options);
      }
    });
  }

  #getWinFromEvent(event: Electron.IpcMainEvent): Electron.BrowserWindow {
    return BrowserWindow.fromWebContents(event.sender) as Electron.BrowserWindow;
  }

  #setIpcMessages(): void {
    ipcMain.on('set-window-title', (event, title) =>
      this.#ipcActions.setWindowTitle(this.#getWinFromEvent(event), title)
    );
    ipcMain.handle('dialog:openFile', this.#ipcActions.handleFileOpen);
    ipcMain.handle('load-files', this.#ipcActions.handleLoadFiles);
    ipcMain.handle('load-file', (event, filePath, mime) =>
      this.#ipcActions.loadFile(filePath, mime)
    );
    // ipcMain.handle('load-file', (event, filePath) => {
    //   console.log('LOAD FILE: ', event, filePath);
    // });
  }

  /**
   * Launch this window
   *
   * @param loadPath
   * @param loadPathIsUrl
   * @private
   */
  #launch(loadPath: string, loadPathIsUrl: boolean): void {
    this.#win.loadRendererPath(loadPath, loadPathIsUrl);
    this.#win.maximize();
    this.#win.webContents.openDevTools();
  }

  get window(): PlayerBrowserWindow {
    return this.#win;
  }
}
