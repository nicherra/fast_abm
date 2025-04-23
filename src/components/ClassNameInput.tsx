import React from "react";

interface Props {
  value: string;
  onChange: (val: string) => void;
}

export const ClassNameInput: React.FC<Props> = ({ value, onChange }) => (
  <div>
    <label htmlFor="NombreClase">Nombre Clase</label>
    <input id="NombreClase" placeholder="NombreClase..." value={value} onChange={(e) => onChange(e.target.value)} />
  </div>
);
