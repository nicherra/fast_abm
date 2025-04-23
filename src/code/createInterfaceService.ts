const fs = require("fs");

function createInterfaceServiceFile(abm) {
  const { NombreClase, interfaceServicePath } = abm;
  const interfaceServiceContent = `package ar.com.mbsoft.erp.service;
import ar.com.mbsoft.erp.dto.impl.generated.${NombreClase}Dto; 
import ar.com.mbsoft.erp.exception.impl.BusinessException;
import ar.com.mbsoft.erp.model.impl.${NombreClase}; 
import ar.com.mbsoft.erp.dto.impl.generated.${NombreClase}Dto; 
import java.util.List;

public interface I${NombreClase}Service extends IService<${NombreClase}, ${NombreClase}Dto> { 

    ${NombreClase}Dto save(${NombreClase}Dto seleccionado) throws BusinessException; 

    ${NombreClase}Dto delete(${NombreClase}Dto seleccionado) throws BusinessException;

    List<${NombreClase}Dto> findAllDto();

    ${NombreClase}Dto findOneDtoByNombre(String value);

    @Override
    ${NombreClase}Dto findOneDtoById(Long id);

    List<${NombreClase}Dto> findAllDtoByNombre(String value);
}
`;

  fs.writeFile(interfaceServicePath + `I${NombreClase}Service.java`, interfaceServiceContent, (err) => {
    if (err) {
      console.error("Error al escribir el archivo:", err);
    } else {
      console.log("Archivo escrito correctamente");
    }
  });
}
module.exports = { createInterfaceServiceFile };
