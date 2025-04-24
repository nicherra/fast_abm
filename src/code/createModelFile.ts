export default function createModelFile(abm) {
  const { getters, setters, modelPath, atributos, NombreClase } = abm;
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
    return abm.campoTabla(a);
  })
  .join("\n")}

${abm.getters()}

${abm.setters()}


}

`;
  return modelContent;
}
