import { BrowserWindow, dialog } from 'electron';
import fs from 'fs';
import path from 'path';

// import Mime from 'mime';

export class IpcActions {
  /**
   * Set Window Title
   *
   * @param win
   * @param value
   */
  setWindowTitle(win: BrowserWindow, value: string): void {
    console.log('set-win-title', value);
    win.setTitle(value);
  }

  handleLoadFiles(): unknown[] {
    const dir = '/Users/cabp/Movies/';
    const mediaItems = [];
    const files = fs.readdirSync(dir);

    files.forEach((file) => {
      // console.log('FILE PATH: ', dir + file);
      const filePath = dir + file;
      const baseName = path.basename(filePath);
      const ext = baseName.substring(baseName.length - 3);

      if (!fs.lstatSync(filePath).isDirectory() && (ext === 'mp4' || ext === 'mkv')) {
        mediaItems.push(
          {
            title: baseName.substring(0, baseName.length - 4),
            url: filePath,
            mime: `video/${ ext }`
            // year?: number;
            // duration?: string;
            // director?: string;
          }
          // path.basename('/foo/bar/baz/asdf/quux.html')
        );
      }
    });

    return mediaItems;
    // return fs.readdir(path, (err, files) => files);
  }

  async loadFile(filePath: string, mime: string): Promise<unknown> {
    console.log('LOAD FILE URL: ', filePath, mime);
    // const data = await fs.readFile(filePath);
    const data = await fs.readFileSync(path.resolve(filePath));
    return data;
    // const blob = new Blob(data);
    // const id = URL.createObjectURL(blob);
    // console.log('DATA', data);
    // console.log('URL', id);
  }

  async handleFileOpen(): Promise<unknown> {
    const { canceled, filePaths } = await dialog.showOpenDialog();

    if (!canceled) {
      return filePaths[0];
    }
  }
}
