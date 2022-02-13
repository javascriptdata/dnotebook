export type outputError = {
    name: string,
    output: string,
    __$hasError?: boolean,
}

export type InterpreterInput = {
    content: string;
    language: string;
    callback: (accumulatedResult: string | outputError, hasErrors: boolean) => void;
}

export type NbCell = {
    id: string;
    mode: LangaugeOption;
    content: string;
    output: any;
    outputError?: any;
}

export type DirectoryObj = {
    key: string,
    value: Object,
}

export type Notebook = {
    notebookId: string;
    name: string;
    cellIds: string[];
    cells: {
        [key: string]: NbCell
    },
    metadata?: {
        [key: string]: any
    },
}

export type NotebookConfig = {
    cellTheme: string,
    cellFontSize: number,
    cellEnableBasicAutocompletion: boolean,
    cellEnableLiveAutocompletion: boolean,
    cellEnableSnippets: boolean,
    cellShowLineNumbers: boolean,
    cellTabSize: number,
    width: string,
    height: string,
    notebookThemeMode: string,
    autosaveNotebook: boolean,
}

export type LangaugeOption = "typescript" | "javascript" | "sh" | "html" | "markdown"

export type CellLanguages = {
    [id: string]: {
        value: string;
        name: string;
        extensions: string[];
    }
}

export type NotebookSaveStatus = "unsaved" | "saving" | "saved" | "error" | "downloading" | "downloaded"

export type AppState = {
    interpreterMode: string;
    activeNotebookName: string;
    activeNotebookTabNumber: number;
    notebooks:  {
        [key: string]: Notebook
    }
    directories: DirectoryObj[],
    config: Partial<NotebookConfig>;
    notebookSavingStatus: NotebookSaveStatus,
    activeWorkspaceDirectoryHandle: any
}