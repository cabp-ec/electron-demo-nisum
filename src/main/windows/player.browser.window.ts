import { BrowserWindow } from 'electron';

export class PlayerBrowserWindow extends BrowserWindow {
  /**
   * @inheritDoc
   */
  constructor(options?: Electron.BrowserWindowConstructorOptions) {
    super(options);
  }

  /**
   * Load a renderer, either by file or URL
   *
   * @param path
   * @param loadPathIsUrl
   */
  loadRendererPath(path: string, loadPathIsUrl: boolean = false): void {
    if (loadPathIsUrl) {
      this.loadURL(path).then();
    } else {
      this.loadFile(path).then();
    }
  }
}
