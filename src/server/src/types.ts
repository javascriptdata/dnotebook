import { Response } from "express";

export type RunNodeCodeOptions = {
    code: string,
    language: string,
    res: Response,
    activeNotebookName: string
}
