import CellEditor from "../CellEditor";
import CellOutputRenderer from "../CellOutputRenderer";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import NodejsInterpreter from '../../lib/interpreter/server'
import { LangaugeOption, outputError } from '../../lib/typings/types'
import IconButton from '@mui/material/IconButton';
import SendIcon from '@mui/icons-material/Send';
import CancelIcon from '@mui/icons-material/Cancel';
import CellOptionsBar from "../MenuBar/cellOptionsBar"
import { updateNotebookCells } from "../../lib/state/reducer"


const NoteBookCell = ({ cellId }: { cellId: string }) => {
    const dispatch = useDispatch();
    const { notebookCells, interpreterMode } = useSelector((state: any) => state.app)

    const [cellIsRunning, setCellIsRunning] = useState(false)
    const [output, setOutput] = useState("")
    const [outputError, setOutputError] = useState("")
    const [hasError, setHasError] = useState(false)
    const [currCell, setCurrCell] = useState(notebookCells[cellId])
    

    const handleCellRunCallback = (accumulatedResult: string | outputError, hasErrors: boolean) => {
        if (hasErrors) {
            setHasError(true)
            //format error message for displaying
            const errorMessage = (accumulatedResult as outputError).output.split('\n')[0]
            const errorName = (accumulatedResult as outputError).name
            const fullErrorMessage = errorName + ': ' + errorMessage
            setOutputError(fullErrorMessage)
            setCellIsRunning(false)
        } else {
            setHasError(false)
            setOutput(accumulatedResult as string)
            setCellIsRunning(false)
        }
    }

    const handleCellRun = () => {
        const currentCell = notebookCells[cellId]
        const content = currentCell?.content
        const language = currentCell?.language

        if (!content || content.trim() === '') {
            return
        }
        setCellIsRunning(true)
        setOutput("")
        setOutputError("")

        if (interpreterMode === 'node') {
            NodejsInterpreter.exec(content, language, handleCellRunCallback)
                .catch((error) => {
                    setOutputError({
                        ...error,
                    })
                    console.log(error)
                    setCellIsRunning(false)
                })
        } else {
            //execute in browser context
            console.log('browser')
        }
    }

    const handleCellLanguageChange = (language: LangaugeOption) => {
        const newCurrCell = {...notebookCells[cellId], language}
        setCurrCell(newCurrCell)
        //update global notebook state
        const newNoteBookCell = { ...notebookCells };
        newNoteBookCell[cellId] = newCurrCell
        dispatch(updateNotebookCells(newNoteBookCell))
    }

    return (
        <div>
            <div className="grid grid-rows-1 grid-cols-12">
                <div className="col-span-7"></div>
                <div className="col-span-5">
                    <CellOptionsBar
                        language={currCell?.language}
                        handleCellLanguageChange={handleCellLanguageChange}
                    />
                </div>
            </div>
            <div className="grid grid-cols-12">
                <div className="col-span-1 text-right">
                    {
                        cellIsRunning ? (
                            <IconButton
                                aria-label="delete"
                                onClick={() => handleCellRun()}
                                color="warning"
                            >
                                <CancelIcon />
                            </IconButton>
                        ) : (
                            <IconButton
                                aria-label="delete"
                                onClick={() => handleCellRun()}
                                color="primary"
                            >
                                <SendIcon />
                            </IconButton>
                        )
                    }

                </div>

                <div className="col-span-11">
                    <CellEditor
                        cellId={cellId}
                        name={cellId}
                        content={currCell.content}
                        mode={currCell.language}
                    />
                    <CellOutputRenderer
                        hasError={hasError}
                        output={output}
                        outputError={outputError}
                    />
                </div>

            </div>
        </div>
    )
}

export default NoteBookCell;