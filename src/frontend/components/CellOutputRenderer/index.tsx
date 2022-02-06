import { NbCell } from "../../lib/typings/types";


const cellOutputRenderer = ({ cell }: { cell: NbCell }) => {
    return (
        <div>
            {cell.outputError !== "" ? (
                <div className="text-red-400 p-3" dangerouslySetInnerHTML={{ __html: cell.outputError }}></div>
            ) : (
                <div>
                    <div className="p-3" dangerouslySetInnerHTML={{ __html: cell.output }}></div>
                </div>
            )}
        </div>
    )
}

export default cellOutputRenderer;