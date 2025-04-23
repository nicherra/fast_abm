import React, { useState, useEffect } from "react";
import { RootPathInput } from "./RootPathInput";
import { ClassNameInput } from "./ClassNameInput";
import { AttributeList } from "./AttributeList";

const { electronAPI } = window as any;

interface Attribute {
  type: string;
  name: string;
  nullable: boolean;
  relacion: string;
}

export const FormularioArchivos: React.FC = () => {
  const [className, setClassName] = useState("");
  const [rootPath, setRootPath] = useState("");
  const [test, setTest] = useState(false);
  const [attributes, setAttributes] = useState<Attribute[]>([{ type: "", name: "", nullable: false, relacion: "" }]);

  useEffect(() => {
    if (electronAPI) {
      electronAPI.receiveRootPath((event: any, path: string) => {
        setRootPath(path);
      });
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ className, attributes, test });
    electronAPI?.crearArchivos({
      NombreClase: className,
      atributos: attributes,
      test,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <RootPathInput rootPath={rootPath} onChange={setRootPath} test={test} onToggleTest={() => setTest(!test)} />
      <ClassNameInput value={className} onChange={setClassName} />
      <AttributeList attributes={attributes} setAttributes={setAttributes} />
      <div>
        <button type="submit" style={{ marginTop: "1em" }}>
          Crear Archivos
        </button>
      </div>
    </form>
  );
};
