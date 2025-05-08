import { createContext, useEffect, useState } from "react";
import CreadorABM from "./code/CreadorABM";
import { desktopDir, homeDir } from "@tauri-apps/api/path";

interface Attribute {
  type: string;
  name: string;
  nullable: boolean;
  relacion: string;
}

// Crear el contexto
export const MyContext = createContext(null);

export const MyContextProvider = ({ children }) => {
  const [attributes, setAttributes] = useState<Attribute[]>([
    { type: "", name: "", nullable: false, relacion: "" },
  ]);
  const [className, setClassName] = useState("");
  const [rootPath, setRootPath] = useState("");
  const [test, setTest] = useState(true);
  useEffect(() => {
    const changeRoot = async () => {
      if (test) setRootPath((await desktopDir()) + "\\fast_abm_test\\");
      else setRootPath((await homeDir()) + "\\IdeaProjects\\erp-web\\");
    };
    changeRoot();
    console.log("changeRoot [test]");
  }, [test]);

  useEffect(() => {
    const changeRoot = async () => {
      if (test) setRootPath((await desktopDir()) + "\\fast_abm_test\\");
      else setRootPath((await homeDir()) + "\\IdeaProjects\\erp-web\\");
    };
    changeRoot();
    console.log("changeRoot []");
  }, []);

  const crearArchivos = async () => {
    console.log("rootpaht: ", rootPath);
    if (!rootPath) {
      alert("No esta definido el path");
      return;
    }
    if (!className || className === "") {
      alert("No esta definido el nombre de la Clase");
      return;
    }
    if (!attributes || attributes.length == 0) {
      alert("No hay atributos definidos");
      return;
    }
    const creadorABM = new CreadorABM(rootPath, className, test, attributes);
    await creadorABM.init();
    creadorABM.crearArchivos();
  };

  return (
    <MyContext.Provider
      value={{
        attributes,
        setAttributes,
        rootPath,
        setRootPath,
        test,
        setTest,
        crearArchivos,
        className,
        setClassName,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};
