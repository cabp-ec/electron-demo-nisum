import { app } from 'electron';
import { electronApp, optimizer } from '@electron-toolkit/utils';
import { ServiceLicense } from './app/service.license';
import { WindowManager } from './app/window.manager';

class PlayerMain {
  #windowManager: WindowManager;
  #license: ServiceLicense;

  /**
   * Constructor for the KelvinMain class
   */
  constructor(license: ServiceLicense) {
    this.#license = license;
    this.#windowManager = new WindowManager(this.#license);
  }

  /**
   * Setup application events
   * @private
   */
  #setupAppEvents(): void {
    // Set app user model id for windows
    electronApp.setAppUserModelId(this.#license.appId);

    /**
     * Default open or close DevTools by F12 in development
     * and ignore CommandOrControl + R in production.
     */
    app.on('browser-window-created', (_, window) => optimizer.watchWindowShortcuts(window));

    /**
     * This method will be called when Electron has finished
     * initialization and is ready to create browser windows.
     * Some APIs can only be used after this event occurs.
     */
    app.whenReady().then(() => this.#init());

    /**
     * Quit when all windows are closed, except on macOS. There, it's common
     * for applications and their menu bar to stay active until the user quits
     * explicitly with Cmd + Q.
     */
    app.on('window-all-closed', () => this.#windowManager.onWindowAllClosed());
  }

  /**
   * Initialize Application and Services
   */
  #init(): void {
    console.log('INITIALIZING MAIN PROCESS');
    this.#windowManager.init();
  }

  /**
   * Start the main process
   */
  go(): void {
    this.#setupAppEvents();
  }
}

export default PlayerMain;
