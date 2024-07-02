export interface WindowApiInterface {
  setWindowTitle: (title: string) => void;
  loadFiles: () => void;
  loadFile: (filePath: string, mime: string) => void;
  openFile: () => void;
}
