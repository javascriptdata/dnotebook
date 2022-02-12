import { NotebookSaveStatus } from "../../lib/typings/types";
import { Chip } from "@mui/material";
import CheckIcon from '@mui/icons-material/Check';

export default function SaveStatusLabel({ notebookStatus }: { notebookStatus: NotebookSaveStatus }) {
    switch (notebookStatus) {
        case "saved":
            return <Chip
                size='small'
                label={"Saved"}
                color='success'
                icon={<CheckIcon />}
            />
        case "saving":
            return <Chip
                size='small'
                label={"Saving..."}
                color='info'
            />
        case "unsaved":
            return <Chip
                size='small'
                label={"* Not Saved"}
                color='secondary'
            />
        default:
            return <div></div>
    }
}