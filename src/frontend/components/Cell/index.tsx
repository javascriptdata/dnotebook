import CellEditor from "../../components/CellEditor";
import CellOutputRenderer from "../../components/CellOutputRenderer";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import NodejsInterpreter from '../../lib/interpreter/server'
import { outputError } from '../../lib/typings/types'


const NoteBookCell = ({ cellId }: { cellId: string }) => {
    const [currCellLanguage, setCurrCellLanguage] = useState('javascript')
    const [output, setOutput] = useState("")
    const [outputError, setOutputError] = useState("")
    const [hasError, setHasError] = useState(false)

    const { notebookCells, interpreterMode } = useSelector((state: any) => state.app)

    const handleCellRunCallback = (accumulatedResult: string | outputError, hasErrors: boolean) => {
        if (hasErrors) {
            setHasError(true)
            //format error message for displaying
            const errorMessage = (accumulatedResult as outputError).output.split('\n')[0]
            const errorName = (accumulatedResult as outputError).name
            const fullErrorMessage = errorName + ': ' + errorMessage
            setOutputError(fullErrorMessage)
        } else {
            setHasError(false)
            setOutput(accumulatedResult as string)

        }
    }

    const handleCellRun = () => {
        const currentCell = notebookCells[cellId]
        const content = currentCell.content
        if (interpreterMode === 'node') {
            NodejsInterpreter.exec(content, currCellLanguage, handleCellRunCallback)
                .catch((error) => {
                    setOutputError({
                        ...error,
                    })
                    console.log(error)
                })
        } else {
            //execute in browser context
            console.log('browser')
        }
    }

    return (
        <div>
            <div className="grid grid-cols-5">
                <div className="grid grid-cols-5">
                    <div>
                        <button
                            className="rounded-md m-3 bg-green-600 p-2 text-white"
                            onClick={handleCellRun}
                        >
                            Run
                        </button>
                    </div>
                </div>
            </div>
            <CellEditor
                cellId={cellId}
                name={cellId}
                mode={"javascript"}
            />
            <CellOutputRenderer
                hasError={hasError}
                output={output}
                outputError={outputError}
            />
        </div>
    )
}

export default NoteBookCell;