import React from "react";
import { connect } from "react-redux";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Button } from "@mui/material";
import * as htmlToImage from "html-to-image";
import jsPDF from "jspdf";

const style = {
  position: "absolute" as "absolute",
  top: "30%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "none",
  boxShadow: 24,
  p: 5,
};
const Export: React.FC<{
  open: boolean;
  handleClose: (open: boolean) => void;
  currentNote: string;
  notebooks: object;
}> = ({ open, handleClose, currentNote, notebooks }) => {
  const [format, setFormat] = React.useState("");
  const handleChange = (event: SelectChangeEvent) => {
    setFormat(event.target.value as string);
  };
  const onNoteExport = () => {
    const note = notebooks[currentNote];
    console.log(note);
    if (format === "pdf") {
      const el = document.getElementById("cellTab")!;
      htmlToImage.toPng(el, { quality: 0.95 }).then(function (dataUrl) {
        const pdf = new jsPDF();
        const imgProps = pdf.getImageProperties(dataUrl);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        pdf.addImage(dataUrl, "PNG", 0, 0, pdfWidth, pdfHeight);
        pdf.save(`${currentNote}.pdf`);
      });
    }
  };
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Export Your Notebook
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 0 }}>
          Select the format in which you want your notebook below
        </Typography>
        <div className="flex items-center">
          <FormControl fullWidth className="mt-4">
            <InputLabel id="demo-simple-select-label">Format</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={format}
              label="Format"
              onChange={handleChange}
            >
              <MenuItem value={"pdf"}>PDF</MenuItem>
              <MenuItem value={"html"}>HTML</MenuItem>
              <MenuItem value={"json"}>JSON</MenuItem>
              <MenuItem value={"md"}>Markdown</MenuItem>
            </Select>
          </FormControl>
          <Button className="mt-4 ml-2" onClick={() => onNoteExport()}>
            Export
          </Button>
        </div>
      </Box>
    </Modal>
  );
};

const mapStateToProps = (state: object) => {
  return {
    notebooks: state.app.notebooks,
    currentNote: state.app.activeNotebookName,
  };
};

export default connect(mapStateToProps, null)(Export);
