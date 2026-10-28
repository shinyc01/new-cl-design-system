// Entry for the single-file prototype bundle: exposes the kit as window.IFS.
// React itself comes from the page (UMD script), so prototypes and the kit share one React.
import { IFS } from './components/index.js';

window.IFS = IFS;
