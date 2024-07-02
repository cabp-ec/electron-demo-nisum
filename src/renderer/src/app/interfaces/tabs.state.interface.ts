import { TabsEnum } from '../../enums/tabs.enum';

export interface TabsStateInterface {
  activeTab: TabsEnum;
  videoPlayer: boolean;
  playing: boolean;
}
