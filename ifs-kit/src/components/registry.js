// Shared namespace: every family registers its components here, so components can use each other
// as IFS.Button etc. without import cycles. Prototypes get the same object as window.IFS.
export const IFS = {};
