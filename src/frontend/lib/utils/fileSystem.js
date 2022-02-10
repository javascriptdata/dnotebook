export async function openFile() {
  let [fileHandle] = await window.showOpenFilePicker();
  console.log(fileHandle.kind);
}

    async function listAllFilesAndDirs(dirHandle) {
    const files = [];
    for await (let [name, handle] of dirHandle) {
        const {kind} = handle;
        if (handle.kind === 'directory') {
          files.push({ name, handle, kind, items: await listAllFilesAndDirs(handle) });
        } else {
            files.push({name, handle, kind});
        }
    }
    return files;
}

export async function openFolder() {
 try {
   const directoryHandle = await window.showDirectoryPicker();
   const files = await listAllFilesAndDirs(directoryHandle);
   return {
     name: directoryHandle.name,
     items: files,
   };
 } catch (e) {
   console.log(e);
 }
}

