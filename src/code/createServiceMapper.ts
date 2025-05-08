export default function createServiceMapperFile(abm) {
  const { NombreClase, nombreClase, atributos } = abm;
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
            if (${nombreClase}.getId() != null)
                ${nombreClase}Dto.setId(${nombreClase}.getId());

            ${atributos
              .map((a) => {
                return abm.setDto(
                  a.name,
                  abm.esClase(a.type) ? abm.createDto(a.name) : abm.get(a.name)
                );
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
                return abm.set(
                  a.name,
                  abm.esClase(a.type) ? abm.fromDto(a.name) : abm.getDto(a.name)
                );
              })
              .join("\n            ")}
            return ${nombreClase};
        }
        return null;
    }
}

`;
  return mapperServiceContent;
}
