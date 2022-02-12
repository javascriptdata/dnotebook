import { v4 as uuid_v4 } from "uuid";

export async function openFile() {

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

  // open file picker
  let [fileHandle] = await window.showOpenFilePicker(pickerOpts);

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
  "json": "json",
  "md": "markdown",
  "js": "javascript",
  "ts": "typescript",
  "html": "html",
  "sh": "bash",
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
    const files = await listAllFilesAndDirs(directoryHandle);
    return {
      name: directoryHandle.name,
      items: files,
    };
  } catch (e) {
    console.log(e);
  }
}

export const writeToFileCurrentWorkingDirectory = async (fileName, content) => {
  const fileHandle = await window.showSaveFilePicker();
  await fileHandle.write(content);
  await fileHandle.close();
}
