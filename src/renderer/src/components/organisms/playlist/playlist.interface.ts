import { PlaylistItemInterface } from './playlist.item.interface';

export interface PlaylistInterface {
  items: PlaylistItemInterface[];
  loadFilesHandler: () => void;
  openFileHandler: () => void;
  playItem: (filePath: string, mime: string) => void;
}
