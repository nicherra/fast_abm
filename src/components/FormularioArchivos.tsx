import React, { useContext } from "react";
import { RootPathInput } from "./RootPathInput";
import { ClassNameInput } from "./ClassNameInput";
import { AttributeList } from "./AttributeList";
import { MyContext } from "../Context";

export const FormularioArchivos: React.FC = () => {
  const {
    attributes,
    setAttributes,
    test,
    setTest,
    rootPath,
    setRootPath,
    className,
    setClassName,
    crearArchivos,
  } = useContext(MyContext);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    crearArchivos();
  };

  return (
    <form onSubmit={handleSubmit}>
      <RootPathInput
        rootPath={rootPath}
        onChange={setRootPath}
        test={test}
        onToggleTest={() => setTest(!test)}
      />
      <ClassNameInput value={className} onChange={setClassName} />
      <AttributeList attributes={attributes} setAttributes={setAttributes} />
      <div>
        <button type="submit" style={{ marginTop: "3em" }}>
          Crear Archivos
        </button>
      </div>
    </form>
  );
};
