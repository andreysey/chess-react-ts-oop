import { Figure } from "../models/figures/Figure";

interface LostFiguresProps {
  title: string;
  figures: Figure[];
}

export default function LostFigures({ title, figures }: LostFiguresProps) {
  return (
    <div className="lost">
      <p>{title}</p>
      {figures.map((figure) => (
        <div key={figure.id}>
          {figure.name} {figure.logo}
        </div>
      ))}
    </div>
  );
}
