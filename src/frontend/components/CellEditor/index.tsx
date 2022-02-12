import dynamic from "next/dynamic";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateCells, setNotebookSavingStatus } from "../../lib/state/reducer"
import { AppState, NbCell } from "../../lib/typings/types";

const AceEditor = dynamic(
    async () => {
        const editor = await import('react-ace');
        const ace = await import('ace-builds/src-noconflict/ace');
        /** @ts-ignore */
        import('brace/ext/language_tools'); //Add support for auto complete and snippets
        ace.config.set("basePath", "/ace-builds-public-export");
        return editor;
    },
    {
        loading: () => (
            <div></div>
        ),
        ssr: false,
    },
);


const Editor = ({ cell }: { cell: NbCell }) => {
    const dispatch = useDispatch();

    const { notebooks, activeNotebookName, config } = useSelector((state: { app: AppState }) => state.app)
    const notebook = notebooks[activeNotebookName]
    const { cells } = notebook

    const [code, updateCode] = useState(cell?.content);

    const handleCodeChange = (newCode: any) => {
        dispatch(setNotebookSavingStatus("unsaved"))
        updateCode(newCode);
        const newCurrCell = { ...cell, content: newCode }

        const newCells = { ...cells, [cell.id]: newCurrCell }
        dispatch(updateCells({ newCells, activeNotebookName }))
    }
    
    return (
        <AceEditor
            mode={cell.mode}
            theme={config.cellTheme}
            value={code}
            onChange={handleCodeChange}
            fontSize={config.cellFontSize}
            width={config.width}
            style={{
                margin: "2px"
            }}
            maxLines={Infinity}
            cursorStart={1}
            minLines={4}
            wrapEnabled={true}
            setOptions={{
                enableBasicAutocompletion: config.cellEnableBasicAutocompletion,
                enableLiveAutocompletion: config.cellEnableLiveAutocompletion,
                enableSnippets: config.cellEnableSnippets,
                showLineNumbers: config.cellShowLineNumbers,
                tabSize: config.cellTabSize,
            }}
        />
    );
};

export default Editor;