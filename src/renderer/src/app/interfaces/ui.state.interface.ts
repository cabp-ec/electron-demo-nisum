import { TabsEnum } from '../../enums/tabs.enum';

export interface UiStateInterface {
  activeTab: TabsEnum;
  videoPlayer: boolean;
  playing: boolean;
}
