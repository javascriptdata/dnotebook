export async function openFile() {
  let [fileHandle] = await window.showOpenFilePicker();
  console.log(fileHandle.kind);
}

export async function openFolder() {
  const directoryHandle = await window.showDirectoryPicker();
  let dirs = [];
  for await (const [key, value] of directoryHandle.entries()) {
    dirs.push({ key, value });
  }
    return dirs;
}
