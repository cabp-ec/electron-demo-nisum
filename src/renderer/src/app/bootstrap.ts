import { BootstrapSettingsInterface } from './interfaces/bootstrap.settings.interface';
import { StoreService } from './serevices/store.service';

/**
 * Application Bootstrap
 *
 * @param _settings
 * @returns {Bootstrap}
 * @constructor
 */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const Bootstrap = function (_settings: BootstrapSettingsInterface) {
  'use strict';

  let _instance: Bootstrap;

  /**
   * Bootstrap Class
   *
   * @class
   */
  class Bootstrap {
    #settings: BootstrapSettingsInterface;
    #startRenderEvent: CustomEvent;
    startRenderEventName: string = _settings.startRenderEventName;
    store: StoreService;

    /**
     * Constructor for the Bootstrap class
     *
     * @param settings
     */
    constructor(settings: BootstrapSettingsInterface) {
      this.#settings = settings;
      this.#startRenderEvent = new CustomEvent(this.#settings.startRenderEventName);
      this.store = new StoreService();
    }

    /**
     * Start the rendering react app
     */
    #startReactRender(): void {
      document.dispatchEvent(this.#startRenderEvent);
    }

    /**
     * Initialize Application and Services
     */
    init(): void {
      // Do your magic here (e.g. load data from an API)

      if (this.store.initialized()) {
        this.#startReactRender();
      }
    }

    /**
     * Get an instance of Bootstrap
     * @returns {*}
     */
    static getInstance(): Bootstrap {
      if (!_instance) {
        _instance = new this(_settings);
      }

      return _instance;
    }
  }

  return Bootstrap.getInstance();
};

export default Bootstrap;
