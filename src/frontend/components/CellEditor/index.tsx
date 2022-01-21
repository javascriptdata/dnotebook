import dynamic from "next/dynamic";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateNotebookCells } from "../../lib/state/reducer"
import { CellProps, NotebookConfig } from "../../lib/typings/types";

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


const Editor = ({ cellId, name, mode }: CellProps) => {
    const { notebookCells, notebookConfig, }: { notebookCells: any, notebookConfig: NotebookConfig } = useSelector((state: any) => state.app)
    const dispatch = useDispatch();
    const [code, updateCode] = useState("");

    const handleCodeChange = (newCode: any) => {
        updateCode(newCode);
        const newNoteBookCells = { ...notebookCells, [cellId]: { content: newCode, language: mode } };
        dispatch(updateNotebookCells(newNoteBookCells));
    }

    return (
        <AceEditor
            mode={mode}
            theme={notebookConfig.cellTheme}
            value={code}
            onChange={handleCodeChange}
            fontSize={notebookConfig.cellFontSize}
            name={name}
            width={notebookConfig.width}
            height={notebookConfig.height}
            setOptions={{
                enableBasicAutocompletion: notebookConfig.cellEnableBasicAutocompletion,
                enableLiveAutocompletion: notebookConfig.cellEnableLiveAutocompletion,
                enableSnippets: notebookConfig.cellEnableSnippets,
                showLineNumbers: notebookConfig.cellShowLineNumbers,
                tabSize: notebookConfig.cellTabSize,
            }}
        />
    );
};

export default Editor;