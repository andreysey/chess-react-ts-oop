import React, { FC } from "react";
import { Cell } from "../models/Cell";

interface CellProps {
  cell: Cell;
  selected: boolean;
  click: (cell: Cell) => void;
}

const CellComponent = ({ cell, selected, click }: CellProps) => {
  return (
    <div
      className={["cell", cell.color, selected ? "selected" : ""].join(" ")}
      onClick={() => click(cell)}
      style={{ background: cell.availible && cell.figure ? "green" : "" }}
    >
      {cell.availible && !cell.figure && <div className="available"></div>}
      {cell.figure?.logo}
    </div>
  );
};

export default CellComponent;
