import NoteBookCell from '../Cell';
import { useSelector } from "react-redux";
import { AppState, NbCell } from '../../lib/typings/types';
import Dashboard from '../Dashboard';

const NotebookTab = () => {
    const { notebooks, activeNotebookName } = useSelector((state: { app: AppState }) => state.app)
    const notebook = notebooks[activeNotebookName]
    const { cellIds, cells } = notebook
    return (
      <div className="col-span-12">
        {notebook.name === "Dashboard" ? (
          <Dashboard />
        ) : (
          <div id="cellTab">
            {cellIds.map((cellId: string, i: number) => {
              const cell: NbCell = cells[cellId];
              return (
                <div key={cellId}>
                  <NoteBookCell cell={cell} />
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
}

export default NotebookTab
