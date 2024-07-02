import { app } from 'electron';
import { join } from 'path';
import { WindowFactory } from './window.factory';
// import { KelvinBrowserWindow } from '../windows/kelvin.browser.window';
import { WidthHeightInterface } from '../interfaces/width.height.interface';
import { WindowUrlReferencesInterface } from './interfaces/window.url.references.interface';
import { ViewsUrlReferenceInterface } from './interfaces/views.url.reference.interface';
import { MainWindow } from '../windows/main.window';
import { MainBaseWindow } from '../windows/main.base.window';
import { IpcActions } from './ipc.actions';
import { ServiceLicense } from './service.license';
// import { UrlReferenceInterface } from "./interfaces/url.reference.interface";

// import { DbService } from '../services/db.service';

export class WindowManager {
  #license: ServiceLicense;
  #envKey: string;
  #windowFactory: WindowFactory;
  #baseWindow: MainBaseWindow;
  #mainWindow: MainWindow;
  // #ipcActions: IpcActions;
  #minWinSize: WidthHeightInterface;
  #windowUrlRefs: WindowUrlReferencesInterface;
  #viewsUrlRefs: ViewsUrlReferenceInterface;

  constructor(license: ServiceLicense) {
    this.#license = license;
    this.#envKey = this.#license.envKey;
    this.#minWinSize = {
      width: 1024,
      height: 768
    };
    // this.#ipcActions = new IpcActions();
    this.#windowFactory = new WindowFactory(this.#minWinSize);

    // Browser Window URL References
    this.#windowUrlRefs = {
      main: {
        dev: license.devUrlBase,
        prod: join(__dirname, '../renderer/index.html')
      }
    };

    // Browser Window URL References
    this.#viewsUrlRefs = {
      playlist: {
        dev: license.devUrlBase + '',
        prod: ''
      },
      player: {
        dev: license.devUrlBase + '',
        prod: ''
      },
      myVideos: {
        dev: license.devUrlBase + '',
        prod: ''
      },
      myMusic: {
        dev: license.devUrlBase + '',
        prod: ''
      },
      movieDetails: {
        dev: license.devUrlBase + '',
        prod: ''
      }
    };
  }

  /**
   * Initialize the main window
   *
   * @private
   */
  #initMainWindow(): void {
    const options = {
      title: this.#license.productName,
      // titleBarOverlay: { height: 40 },
      minWidth: this.#minWinSize.width,
      minHeight: this.#minWinSize.height
    };

    this.#mainWindow = new MainWindow(
      this.#windowUrlRefs.main[this.#envKey],
      this.#license.isDevEnv,
      this.#windowFactory,
      new IpcActions(),
      options
    );
  }

  #initBaseWindow(): void {
    const options = {
      title: this.#license.productName,
      // titleBarOverlay: { height: 40 },
      minWidth: this.#minWinSize.width,
      minHeight: this.#minWinSize.height
    };

    this.#baseWindow = new MainBaseWindow(options);
  }

  /**
   * Quit when all windows are closed, except on macOS.
   * There, it's common for applications and their menu bar to stay active
   * until the user quits explicitly with Cmd + Q.
   */
  onWindowAllClosed(): void {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  }

  init(): void {
    this.#initMainWindow();
    // this.#initBaseWindow();
    // Init your modal window(s) here, like so:
    // this.#initLicenseModalWindow();
  }
}
