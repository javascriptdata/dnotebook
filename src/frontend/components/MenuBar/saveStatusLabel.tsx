import { NotebookSaveStatus } from "../../lib/typings/types";
import { Chip } from "@mui/material";
import CheckIcon from '@mui/icons-material/Check';
import { FileDownload } from "@mui/icons-material";

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
        case "error":
            return <Chip
                size='small'
                label={"Error"}
                color='error'
            />
        case "downloading":
            return <Chip
                size='small'
                label={"Downloading..."}
                color='info'
                icon={<FileDownload />}
            />
        case "downloaded":
            return <Chip
                size='small'
                label={"Downloaded"}
                color='success'
                icon={<CheckIcon />}
            />
        default:
            return <div></div>
    }
}