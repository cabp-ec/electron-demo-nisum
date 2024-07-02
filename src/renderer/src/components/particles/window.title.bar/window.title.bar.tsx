import React, { ReactNode } from 'react';
import { fnLopKeyer } from '../../../utils/fnLopKeyer.ts';
import { WindowTitleBarInterface } from './window.title.bar.interface.ts';
import { TabButton } from '../../atoms/tab.button/tab.button';
import { UiStateInterface } from '../../../app/interfaces/ui.state.interface';
import { useObservable } from '@ngneat/react-rxjs';
import { TabsEnum } from '../../../enums/tabs.enum';

export const WindowTitleBar: React.FC<WindowTitleBarInterface> = ({ tabItems, playlistLauncher, store }: WindowTitleBarInterface) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const uiState: UiStateInterface = useObservable(store.ui.state())[0];

  const renderTabs = (): ReactNode[] => {
    const nodes: ReactNode[] = [];

    tabItems.forEach((item, index) => {
      nodes.push(<TabButton key={ fnLopKeyer(index, item.title) } { ...item } />);
    });

    return nodes;
  };

  return (
    <nav className="navbar m-0 p-0 pt-1 d-flex align-items-end win-draggable">
      <div className="d-flex w-100">
        <button
          type="button"
          title="Playlist"
          onClick={ playlistLauncher }
          className={ `btn border-0 rounded-bottom-0 me-1 p-0 px-2 pt-1 ${uiState.activeTab === TabsEnum.playlist ? 'btn-secondary' : 'btn-light'}` }
        >
          <i className="bi bi-card-list" />
        </button>
        { renderTabs() }
      </div>
    </nav>
  );
};
