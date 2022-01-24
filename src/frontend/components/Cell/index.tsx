import CellEditor from "../CellEditor";
import CellOutputRenderer from "../CellOutputRenderer";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import NodejsInterpreter from '../../lib/interpreter/server'
import { outputError, NbCell, AppState } from '../../lib/typings/types'
import IconButton from '@mui/material/IconButton';
import SendIcon from '@mui/icons-material/Send';
import LoadingButton from '@mui/lab/LoadingButton';
import CellOptionsBar from "../MenuBar/cellOptions"
import { updateCells } from "../../lib/state/reducer"
import { cleanErrorMessage } from "../../lib/helpers/utils"

const NoteBookCell = ({ cell }: { cell: NbCell }) => {
    const dispatch = useDispatch();
    const { cells, interpreterMode } = useSelector((state: { app: AppState }) => state.app)

    const [cellIsRunning, setCellIsRunning] = useState(false)
    const [output, setOutput] = useState("")
    const [outputError, setOutputError] = useState("")
    const [hasError, setHasError] = useState(false)


    const cellRunCallback = (accumulatedResult: string | outputError, hasErrors: boolean) => {

        if (hasErrors) {
            setHasError(true)
            const fullErrorMessage = cleanErrorMessage(accumulatedResult as outputError)
            setOutputError(fullErrorMessage)

            const newCurrCell = { ...cell, output: "", outputError: fullErrorMessage }
            const newCells = { ...cells, [cell.id]: newCurrCell }
            dispatch(updateCells(newCells))

        } else {
            setHasError(false)
            setOutput(accumulatedResult as string)

            const newCurrCell = { ...cell, output: accumulatedResult as string, outputError: "" }
            const newCells = { ...cells, [cell.id]: newCurrCell }
            dispatch(updateCells(newCells))

        }

        setCellIsRunning(false)

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

    const handleKeyPress = (e: any) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            handleCellRun()
        }
    }

    return (
        <section>
            <section className="grid grid-rows-1 text-right">
                <CellOptionsBar cell={cell} />
            </section>
            <section className="grid grid-cols-12">
                <div className="col-span-1 text-right">
                    {
                        cellIsRunning ? (
                            <LoadingButton loading ></LoadingButton>

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

                <div className="col-span-11"
                 onKeyPress={handleKeyPress}
                >
                    <CellEditor cell={cell} />
                    <CellOutputRenderer
                        hasError={hasError}
                        output={output}
                        outputError={outputError}
                    />
                </div>

            </section>
        </section>
    )
}

export default NoteBookCell;