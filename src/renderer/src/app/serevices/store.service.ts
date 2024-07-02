import { withProps } from '@ngneat/elf';
import { ServiceInterface } from '../interfaces/service.interface.ts';
import { PropsStoreInterface } from '../interfaces/props.store.interface';
import { PropsStore } from '../stores/props.store';
import { UiStateInterface } from '../interfaces/ui.state.interface';
import { TabsEnum } from '../../enums/tabs.enum';

/**
 * The StoreService class
 */
export class StoreService implements ServiceInterface {
  #initialized = false;
  ui: PropsStoreInterface;
  pointer: PropsStoreInterface;

  constructor() {
    this.ui = new PropsStore(
      'ui',
      withProps<UiStateInterface>({
        activeTab: TabsEnum.player,
        videoPlayer: true,
        playing: false
      })
    );

    this.#initialized = true;
  }

  initialized(): boolean {
    return this.#initialized;
  }
}
