export type outputError = {
    name: string,
    output: string,
    __$hasErrors?: boolean,
}

export type cellObject = {
    [cellId: string]: { content: string, language: string }
}