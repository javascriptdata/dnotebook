import { v4 as uuid_v4 } from "uuid";

/**
 * Opens an existing file
 * @returns 
 */
export const openFile = async () => {
  const pickerOpts = {
    types: [
      {
        description: 'notebooks',
        accept: {
          'application/json': ['.json', '.dnb'],
          'text/plain': ['.md', '.txt', '.js', '.json', '.dnb', '.ts', '.sh'],
        }
      },
    ],
    excludeAcceptAllOption: true,
    multiple: false
  };

  let [fileHandle] = await window.showOpenFilePicker(pickerOpts);
  if (!fileHandle) {
    // User cancelled, or otherwise failed to open a file.
    return;
  }

  const fileMetaData = await fileHandle.getFile();

  const reader = new FileReader();
  reader.readAsText(fileMetaData);

  const fileContents = await new Promise((resolve, reject) => {
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
  });

  return await getNotebookFromFile({
    fileMetaData,
    fileContents,
    fileHandle
  });

}

/**
 * Opens a new .dnb file
 */
export const openNewFile = async () => {
  const pickerOpts = {
    types: [
      {
        description: 'notebooks',
        accept: {
          'text/plain': ['.dnb'],
        }
      },
    ],
    excludeAcceptAllOption: true,
    multiple: false
  };

  let fileHandle = await window.showSaveFilePicker(pickerOpts);
  if (!fileHandle) {
    // User cancelled, or otherwise failed to open a file.
    return;
  }

  const fileMetaData = await fileHandle.getFile();

  const notebook = generateNotebook({
    fileType: "js",
    fileHandle,
    fileMetaData,
    fileContents: "",
  });

  //write notebook as JSON to file with fileHandler
  await saveNotebookToFileSystem(fileHandle, JSON.stringify(notebook));
  //get the file metadata of the file we just wrote
  fileMetaData = await fileHandle.getFile();
  notebook.metadata.fileMetaData = fileMetaData;
  notebook.metadata.fileHandle = fileHandle;
  return notebook;

}



const getNotebookFromFile = async ({ fileMetaData, fileContents, fileHandle }) => {
  let notebook;

  if (fileMetaData.name.split(".").pop() === "dnb") {
    notebook = JSON.parse(fileContents);
    notebook.metadata = {
      fileMetaData,
      fileHandle,
    }
  } else {
    const fileType = fileMetaData.name.split(".").pop();
    notebook = generateNotebook({ fileType, fileHandle, fileMetaData, fileContents });
  }

  return notebook;
}

const FILE_TYPE_TO_MODE_MAPPER = {
  "json": "javascript",
  "md": "markdown",
  "js": "javascript",
  "ts": "typescript",
  "html": "html",
  "sh": "bash",
  "txt": "markdown",
}

const generateNotebook = ({ fileType, fileHandle, fileMetaData, fileContents }) => {
  if (!FILE_TYPE_TO_MODE_MAPPER[fileType]) {
    throw new Error(`Unsupported file type: ${fileType}`);
  }

  const notebookId = uuid_v4();
  const cellId = uuid_v4();

  const notebook = {
    notebookId,
    name: fileMetaData.name,
    cellIds: [cellId],
    cells: {
      [cellId]: {
        id: cellId,
        mode: FILE_TYPE_TO_MODE_MAPPER[fileType],
        content: fileContents,
        output: "",
        outputError: "",
      }
    },
    metadata: {
      fileMetaData,
      fileHandle,
    },
  };
  return notebook;
}

async function listAllFilesAndDirs(dirHandle) {
  const files = [];
  for await (let [name, handle] of dirHandle) {
    const { kind } = handle;
    if (handle.kind === "directory") {
      files.push({
        name,
        handle,
        kind,
        items: await listAllFilesAndDirs(handle),
      });
    } else {
      files.push({ name, handle, kind });
    }
  }
  return files;
}

export async function openFolder() {
  try {
    const directoryHandle = await window.showDirectoryPicker();
    if (!directoryHandle) {
      // User cancelled, or otherwise failed to open a file.
      return;
    }

    const files = await listAllFilesAndDirs(directoryHandle);
    return {
      directoryHandle,
      name: directoryHandle.name,
      items: files,
    };
  } catch (e) {
    console.log(e);
  }
}

export const saveNotebookToFileSystem = async (fileHandle, contents) => {
  // Create a FileSystemWritableFileStream to write to.
  const writable = await fileHandle.createWritable();

  // Write the contents of the file to the stream.
  await writable.write(contents);

  // Close the file and write the contents to disk.
  await writable.close();

}

export const downloadAsNewNotebook = async (notebook) => {
  const fileHandle = await window.showSaveFilePicker({
    types: [
      {
        description: 'notebooks',
        accept: {
          'text/plain': ['.dnb'],
        }
      },
    ],
    excludeAcceptAllOption: true,
    multiple: false
  });
  const fileMetaData = await fileHandle.getFile();
  notebook.name = fileMetaData.name;
  await saveNotebookToFileSystem(fileHandle, JSON.stringify(notebook));
}

export const refreshWorkspaceDirectory = async (directoryHandle) => {
  const files = await listAllFilesAndDirs(directoryHandle);
  return {
    name: directoryHandle.name,
    items: files,
  };
}

export const openNotebookFromFileName = async (name, activeWorkspaceDirectoryHandle) => {
  const fileHandle = await activeWorkspaceDirectoryHandle.getFileHandle(name);
  const fileMetaData = await fileHandle.getFile();

  const reader = new FileReader();
  reader.readAsText(fileMetaData);

  const fileContents = await new Promise((resolve, reject) => {
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
  });

  const notebook = getNotebookFromFile({
    fileMetaData,
    fileHandle,
    fileContents,
  });
  return notebook;
}