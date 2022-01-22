import { useDispatch } from 'react-redux';
import { setInterpreterMode } from '../../lib/state/reducer';

const INTERPRETER_MODES = ["browser", "node"]

const MenuBar = () => {
    const dispatch = useDispatch()

    const modeChangeHandler = (value: string) => {
        dispatch(setInterpreterMode(value))
    }

    return (
        <div className="grid grid-rows-12">
            <div>
                <select
                    onChange={(e: any) => modeChangeHandler(e.target.value)}>
                    {INTERPRETER_MODES.map((mode, index) => (
                        <option key={index} value={mode}>{mode}</option>
                    ))}
                </select>
            </div>
        </div>
    )
}

export default MenuBar