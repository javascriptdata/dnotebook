import { AppState } from '../../lib/typings/types';
import { useSelector, useDispatch } from 'react-redux';
import { updateActiveNotebookName, setActiveNotebookTabNumber } from '../../lib/state/reducer';
import Chip from '@mui/material/Chip';
import { ListItem } from '@mui/material';

/**
 * Sticky status bar for bottom of notebook
 * @returns 
 */
export default function StatusBar() {
    const dispatch = useDispatch();
    const { notebookIsSaving } = useSelector((state: { app: AppState }) => state.app)

    return (
        <div className='col-span-12 flex'>
            <ListItem key={"1"}>
                <Chip
                    label={"Feat1"}
                />
            </ListItem>
        </div>
    );
}
