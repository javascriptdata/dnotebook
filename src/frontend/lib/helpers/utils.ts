import { outputError } from "../typings/types";

export const formatErrorMessage = (err: Error): outputError => {
    return { output: err.message, name: err.name, __$hasError: true }
}

export const cleanErrorMessage = (err: outputError) => {
    const errorMessage = err.output.split('\n')[0]
    const errorName = err.name
    const fullErrorMessage = errorName + ': ' + errorMessage
    return fullErrorMessage
}