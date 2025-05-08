import React from "react";

interface RootPathInputProps {
  rootPath: string;
  onChange: (path: string) => void;
  test: boolean;
  onToggleTest: () => void;
}

export const RootPathInput: React.FC<RootPathInputProps> = ({
  rootPath,
  onChange,
  test,
  onToggleTest,
}) => (
  <section>
    <div>
      <label htmlFor="test">Test</label>
      <input type="checkbox" id="test" checked={test} onChange={onToggleTest} />
    </div>
    <label htmlFor="rootPath">Ruta Proyecto Raíz</label>
    <input
      id="rootPath"
      style={{ width: "40%" }}
      value={rootPath}
      onChange={(e) => onChange(e.target.value)}
    />
  </section>
);
