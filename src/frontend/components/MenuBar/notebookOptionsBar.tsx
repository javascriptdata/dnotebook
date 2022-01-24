import { useDispatch } from 'react-redux';
import { setInterpreterMode } from '../../lib/state/reducer';
import NodejsInterpreter from '../../lib/interpreter/server'

const INTERPRETER_MODES = ["browser", "node"]

const MenuBar = () => {
    const dispatch = useDispatch()

    const modeChangeHandler = (value: string) => {
        dispatch(setInterpreterMode(value))
    }

    const handleServerStop = () => {
        const killCellProcessCmd = `stop`;
        const language = "process"
        NodejsInterpreter.exec(killCellProcessCmd, language, (resp) => {
            console.log(resp)
        })
    }

    const handleNotebookRestart = () => {
        //TODO: Save current notebook to local storage
        //TODO: Reload notebook the page from local storage
        console.log("Restarting notebook")
    }

    return (
        <div className="grid grid-cols-12">
            <div>
                <select
                    onChange={(e: any) => modeChangeHandler(e.target.value)}>
                    {INTERPRETER_MODES.map((mode, index) => (
                        <option key={index} value={mode}>{mode}</option>
                    ))}
                </select>
            </div>
            <button
                onClick={handleServerStop}
            >
                Stop Server
            </button>
            <button
                onClick={handleNotebookRestart}
            >
                Restart
            </button>
        </div>
    )
}

export default MenuBar