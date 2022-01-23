import CellEditor from "../CellEditor";
import CellOutputRenderer from "../CellOutputRenderer";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import NodejsInterpreter from '../../lib/interpreter/server'
import { LangaugeOption, outputError, NbCell, AppState } from '../../lib/typings/types'
import IconButton from '@mui/material/IconButton';
import SendIcon from '@mui/icons-material/Send';
import CancelIcon from '@mui/icons-material/Cancel';
import CellOptionsBar from "../MenuBar/cellOptions"
import { updateCells, updateCellIds } from "../../lib/state/reducer"


const NoteBookCell = ({ cell }: { cell: NbCell }) => {
    const dispatch = useDispatch();
    const { cells, cellIds, interpreterMode } = useSelector((state: { app: AppState }) => state.app)

    const [cellIsRunning, setCellIsRunning] = useState(false)
    const [output, setOutput] = useState("")
    const [outputError, setOutputError] = useState("")
    const [hasError, setHasError] = useState(false)


    const cellRunCallback = (accumulatedResult: string | outputError, hasErrors: boolean) => {
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
        const content = cell.content
        const language = cell.mode

        if (!content || content.trim() === '') {
            return
        }
        setCellIsRunning(true)
        setOutput("")
        setOutputError("")

        if (interpreterMode === 'node') {
            NodejsInterpreter.exec(content, language, cellRunCallback)
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

    return (
        <div>
            <div className="grid grid-rows-1 grid-cols-12">
                <div className="col-span-7"></div>
                <div className="col-span-5">
                    <CellOptionsBar cell={cell} />
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
                    <CellEditor cell={cell} />
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