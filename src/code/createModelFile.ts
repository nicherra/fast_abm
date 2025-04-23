const fs = require("fs");

function createModelFile(abm) {
  const { getters, campoTabla, setters, modelPath, atributos, NombreClase } = abm;
  console.log("createModelFile");
  const modelContent = `package ar.com.mbsoft.erp.model.impl;

import ar.com.mbsoft.erp.annotations.MBSecurity;
import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Objects;

@Entity
@MBSecurity
@Table(name = "${NombreClase}")
public class ${NombreClase} extends AbstractPersistentObject{

${atributos
  .map((a) => {
    return campoTabla(a);
  })
  .join("\n")}

${getters()}

${setters()}


}

`;

  fs.writeFile(modelPath + `${NombreClase}.java`, modelContent, (err) => {
    if (err) {
      console.error("Error al escribir el archivo:", err);
    } else {
      console.log("Archivo escrito correctamente");
    }
  });
}

module.exports = { createModelFile };
