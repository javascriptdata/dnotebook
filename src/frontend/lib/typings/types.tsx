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

export type Notebook = {
    cellIds: string[];
    cells: {
        [key: string]: NbCell
    }
    config: Partial<NotebookConfig>;
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

export type AppState = {
    interpreterMode: string;
    cellIds: string[];
    cells: {
        [key: string]: NbCell
    }
    config: Partial<NotebookConfig>;
}