import React from 'react';
import { ReactNode } from 'react';
import { PlaylistInterface } from './playlist.interface';

export const Playlist: React.FC<PlaylistInterface> = ({ items, loadFilesHandler, openFileHandler, playItem }: PlaylistInterface) => {
  console.log('MEDIA ITEMS', items);

  const renderItems = (): ReactNode => {
    const nodes = [];

    items.forEach((item, index) =>
      nodes.push(
        <li
          key={ `mediaItem_${ index }` }
          onDoubleClick={ e => playItem(item.url, item.mime) }
          className="list-group-item bg-transparent text-light d-flex p-1"
        >
          <small className="d-flex flex-fill">{ item.title }</small>
          <button className="btn btn-sm btn-close d-inline"></button>
        </li>
      )
    );

    return nodes;
  };

  return (
    <div className="playlist border-end border-secondary-subtle rounded-end bg-secondary border-secondary-subtle h-100">
      <div className="d-flex">
        <button onClick={ loadFilesHandler } className="d-flex flex-fill btn btn-sm btn-secondary">Load Files</button>
        <button onClick={ openFileHandler } className="d-flex flex-fill btn btn-sm btn-secondary">Open File</button>
      </div>
      <ul className="list-group list-group-flush pb-2">{ renderItems() }</ul>
    </div>
  );
};
