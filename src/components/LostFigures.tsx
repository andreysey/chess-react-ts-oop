import React from "react";
import { Figure } from "../models/figures/Figure";

interface LostFiguresProps {
    title: string;
    figures: Figure[];
}

const LostFigures = ({title, figures}: LostFiguresProps) => {
  return (
    <div className="lost">
      <h3>{title}</h3>
    </div>
  );
};

export default LostFigures;
