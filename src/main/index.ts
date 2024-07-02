import PlayerMain from './player.main';
import { ServiceLicense } from './app/service.license';
import { nativeTheme } from 'electron';

nativeTheme.themeSource = 'light';
const appPath = '~/.vplayer';
const serviceLicense = new ServiceLicense('com.cabp.vplayer', 'Video Player', appPath);

new PlayerMain(serviceLicense).go();
