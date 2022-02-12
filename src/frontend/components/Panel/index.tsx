import React from 'react';
import Explorer from "./explorer";
import Search from "./search";

interface PanelProps {
  showPanel: String | null;
}
export const Panel: React.FC<PanelProps> = ({showPanel}) => {
  return (
    <div className="p-1.5">
      <div className="px-4 text-sm">{showPanel}</div>
      {showPanel && showPanel === "Explorer" && <Explorer state={""} name={""} items={""} />}
      {showPanel && showPanel === "Search" && <Search />}
    </div>
  );
}


export default Panel;