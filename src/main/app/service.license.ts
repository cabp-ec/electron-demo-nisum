import { readFile } from 'fs';
import { v4 as uuidv4 } from 'uuid';
import { is } from '@electron-toolkit/utils';

export class ServiceLicense {
  #appId: string = 'vplayer';
  #productName: string = 'Video Player';
  #appPath: string;
  #licenseId: string;
  #isDevEnv: boolean;
  #devUrlBase: string;
  #firstLaunch: boolean = true;

  constructor(appId: string, productName: string, appPath: string) {
    this.#appId = appId;
    this.#productName = productName;
    this.#appPath = appPath;
    this.#licenseId = uuidv4();
    this.#isDevEnv = Boolean(is.dev && process.env['ELECTRON_RENDERER_URL']);
    this.#devUrlBase = String(process.env['ELECTRON_RENDERER_URL']);
    this.load();
  }

  load(): void {
    readFile(`${ this.#appPath }/license`, 'utf8', (err, data) => {
      if (err) {
        // ENOENT (No such file or directory): Commonly raised by fs operations to indicate that a component of the specified pathname does not exist. No entity (file or directory) could be found by the given path.
        // EACCES (Permission denied): An attempt was made to access a file in a way forbidden by its file access permissions.
        // EADDRINUSE (Address already in use): An attempt to bind a server (net, http, or https) to a local address failed due to another server on the local system already occupying that address.
        // ECONNREFUSED (Connection refused): No connection could be made because the target machine actively refused it. This usually results from trying to connect to a service that is inactive on the foreign host.
        // ECONNRESET (Connection reset by peer): A connection was forcibly closed by a peer. This normally results from a loss of the connection on the remote socket due to a timeout or reboot. Commonly encountered via the http and net modules.
        // EEXIST (File exists): An existing file was the target of an operation that required that the target not exist.
        // EISDIR (Is a directory): An operation expected a file, but the given pathname was a directory.
        // EMFILE (Too many open files in system): Maximum number of file descriptors allowable on the system has been reached, and requests for another descriptor cannot be fulfilled until at least one has been closed. This is encountered when opening many files at once in parallel, especially on systems (in particular, macOS) where there is a low file descriptor limit for processes. To remedy a low limit, run ulimit -n 2048 in the same shell that will run the Node.js process.
        // ENOTDIR (Not a directory): A component of the given pathname existed, but was not a directory as expected. Commonly raised by fs.readdir.
        // ENOTEMPTY (Directory not empty): A directory with entries was the target of an operation that requires an empty directory, usually fs.unlink.
        // ENOTFOUND (DNS lookup failed): Indicates a DNS failure of either EAI_NODATA or EAI_NONAME. This is not a standard POSIX error.
        // EPERM (Operation not permitted): An attempt was made to perform an operation that requires elevated privileges.
        // EPIPE (Broken pipe): A write on a pipe, socket, or FIFO for which there is no process to read the data. Commonly encountered at the net and http layers, indicative that the remote side of the stream being written to has been closed.
        // ETIMEDOUT (Operation timed out): A connect or send request failed because the connected party did not properly respond after a period of time. Usually encountered by http or net. Often a sign that a socket.end() was not properly called.

        // TODO: create your license file here
        return;
      }

      // TODO: check here if the app license is valid, perform activation actions upon first launch
      this.#firstLaunch = false;
      this.#licenseId = data;
    });
  }

  /**
   * Get the App Machine-ID
   */
  get appId(): string {
    return this.#appId;
  }

  /**
   * Get the License ID
   */
  get licenseId(): string {
    return this.#licenseId;
  }

  /**
   * Set the License ID
   * @param value
   */
  set licenseId(value: string) {
    this.#licenseId = value;
  }

  /**
   * Check if it's a DEV environment
   */
  get isDevEnv(): boolean {
    return this.#isDevEnv;
  }

  /**
   * Get the base URL for the DEV environment
   */
  get devUrlBase(): string {
    return this.#devUrlBase;
  }

  /**
   * Get the Environment Key
   */
  get envKey(): string {
    return this.#isDevEnv ? 'dev' : 'prod';
  }

  /**
   * Get the name of the licenced product
   */
  get productName(): string {
    return this.#productName;
  }

  get firstLaunch(): boolean {
    return this.#firstLaunch;
  }
}
