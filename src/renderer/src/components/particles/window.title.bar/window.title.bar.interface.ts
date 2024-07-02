import { TabButtonInterface } from '../../atoms/tab.button/tab.button.interface';
import { StoreService } from '../../../app/serevices/store.service';

export interface WindowTitleBarInterface {
  tabItems: TabButtonInterface[];
  playlistLauncher: () => void;
  store: StoreService;
}
