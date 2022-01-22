export type outputError = {
    name: string,
    output: string,
    __$hasErrors?: boolean,
}

export type InterpreterInput = {
    content: string;
    language: string;
    callback: (accumulatedResult: string | outputError, hasErrors: boolean) => void;
}

export type CellProps = {
    cellId: string;
    name: string;
    mode: string;
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
}

export type LangaugeOption = "typescript" | "javascript" | "bash" | "html" | "json" | "markdown"
