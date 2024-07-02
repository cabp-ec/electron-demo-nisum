import { ReactNode, useState } from 'react';
import Booster from './app/index';
import { TabButtonInterface } from './components/atoms/tab.button/tab.button.interface';
import { UiStateInterface } from './app/interfaces/ui.state.interface';
import { PlaylistItemInterface } from './components/organisms/playlist/playlist.item.interface';
import { TabsEnum } from './enums/tabs.enum';
import { useObservable } from '@ngneat/react-rxjs';
import { PanelAside } from './components/particles/panel.aside/panel.aside';
import { WindowTitleBar } from './components/particles/window.title.bar/window.title.bar';
import { Playlist } from './components/organisms/playlist/playlist';
import { Player } from './components/organisms/player/player';
import { ResourceList } from './components/organisms/resource.list/resource.list';

function App(): ReactNode {
  // const ipcHandle = (): void => window.electron.ipcRenderer.send('ping');
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const uiState: UiStateInterface = useObservable(Booster.store.ui.state())[0];
  const [playlistOn, setPlaylistOn] = useState(false);
  const [mediaItems, setMediaItems] = useState([]);
  const [fileToPlay, setFileToPlay] = useState(undefined);

  const setWindowTitle = (value: string): void => {
    window.api.setWindowTitle(value);
  };

  const openFile = async (): Promise<void> => {
    const filePath = await window.api.openFile();

    if (filePath) {
      console.log('FILE', filePath);
      mediaItems.push({
        title: filePath,
        url: filePath
        // year?: number;
        // duration?: string;
        // director?: string;
      });
      setMediaItems(mediaItems);
    }
  };

  const loadFiles = async (): Promise<void> => {
    const files = await window.api.loadFiles();
    console.log('TOTAL MOVIES', files.length);
    setMediaItems(files);
  };

  const playFile = (filePath: string, mime: string): void => {
    console.log('PLAY FILE', filePath);
    const data = window.api.loadFile(filePath, mime);
    const url = URL.createObjectURL(data);
    console.log('URL: ', url);
    // setFileToPlay(filePath);

    /*fetch(filePath)
      .then((res) => {
        console.log('RES', res);
        return res.url;
      })
      .then((data) => {
        console.log('DATA', data);
      })
      .catch((e) => console.error(e));*/
  };

  const tabItems: TabButtonInterface[] = [
    {
      title: 'Player',
      active: uiState.activeTab === TabsEnum.player,
      icon: 'bi bi-play',
      onClick: (): void => {
        setPlaylistOn(false);
        Booster.store.ui.setProp('activeTab', TabsEnum.player);
        setWindowTitle('Media Player');
      }
    },
    {
      title: 'My Videos',
      active: uiState.activeTab === TabsEnum.myVideos,
      icon: 'bi bi-film',
      onClick: (): void => {
        setPlaylistOn(false);
        Booster.store.ui.setProp('activeTab', TabsEnum.myVideos);
        setWindowTitle('My Videos');
      }
    },
    {
      title: 'My Music',
      active: uiState.activeTab === TabsEnum.myMusic,
      icon: 'bi bi-music-note-beamed',
      onClick: (): void => {
        setPlaylistOn(false);
        Booster.store.ui.setProp('activeTab', TabsEnum.myMusic);
        setWindowTitle('My Music');
      }
    }
  ];

  /*const mediaItems: PlaylistItemInterface[] = [
    { title: 'Blade', year: 1998 },
    { title: 'The Hunt for Red October', year: 1990 }
  ];*/

  const onPlaylistClick = (): void => {
    console.log('onPlaylistClick');
    setPlaylistOn(!playlistOn);
    Booster.store.ui.setProp('activeTab', TabsEnum.playlist);
  };

  const renderContent = (): ReactNode => {
    console.log('CONTENT', uiState.activeTab);

    switch (uiState.activeTab) {
      case TabsEnum.myVideos:
        return <ResourceList />;
      case TabsEnum.myMusic:
        return <ResourceList listAudio={ true } />;
      case TabsEnum.player:
      default:
        return <Player resourceUrl={ fileToPlay } />;
    }
  };

  return (
    <div className="d-flex flex-row h-100">
      <div className="flex-fill">
        <WindowTitleBar playlistLauncher={ onPlaylistClick } tabItems={ tabItems } store={ Booster.store } />

        <main className="d-flex h-100">
          <PanelAside open={ playlistOn }>
            <Playlist
              items={ mediaItems }
              loadFilesHandler={ loadFiles }
              openFileHandler={ openFile }
              playItem={ playFile }
            />
          </PanelAside>

          { renderContent() }

          <PanelAside>
            right panel
          </PanelAside>
        </main>
      </div>
    </div>
  );
}

export default App;
