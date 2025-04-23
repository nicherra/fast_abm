const fs = require("fs");

function createServiceMapperFile(abm) {
  const { NombreClase, setDto, esClase, get, set, fromDto, getDto, nombreClase, serviceMapperPath, atributos } = abm;
  console.log("createServiceMapperFile ", nombreClase);
  const mapperServiceContent = `package ar.com.mbsoft.erp.service.impl.mapper;

import ar.com.mbsoft.erp.dto.impl.generated.${NombreClase}Dto;
import ar.com.mbsoft.erp.model.impl.${NombreClase};
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class ${NombreClase}ServiceMapper extends AbstractServiceMapper{

    public ${NombreClase}Dto createDto(${NombreClase} ${nombreClase}){
        if(${nombreClase}!=null){
            ${NombreClase}Dto ${nombreClase}Dto = new ${NombreClase}Dto();
            ${atributos
              .map((a) => {
                return setDto(a.name, esClase(a.type) ? createDto(a.name) : get(nombreClase, a.name));
              })
              .join("\n            ")}
            return ${nombreClase}Dto;
        }
        return null;
    }

    public ${NombreClase} fromDto(${NombreClase}Dto ${nombreClase}Dto){
        ${NombreClase} ${nombreClase};
        if(${nombreClase}Dto!=null){
            if(${nombreClase}Dto.getId()!=null){
                ${nombreClase} = findEntity(${nombreClase}Dto);
            }else{
                 ${nombreClase} = new ${NombreClase}();
            }
            ${atributos
              .map((a) => {
                return set(a.name, esClase(a.type) ? fromDto(a.name) : getDto(nombreClase, a.name));
              })
              .join("\n            ")}
            return ${nombreClase};
        }
        return null;
    }
}

`;

  fs.writeFile(serviceMapperPath + `${NombreClase}ServiceMapper.java`, mapperServiceContent, (err) => {
    if (err) {
      console.error("Error al escribir el archivo:", err);
    } else {
      console.log("Archivo escrito correctamente");
    }
  });
}
module.exports = { createServiceMapperFile };
