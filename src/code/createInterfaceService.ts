export default function createInterfaceServiceFile(abm) {
  const { NombreClase } = abm;
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

    @Override
    ${NombreClase}Dto findOneDtoById(Long id);
}
`;
  return interfaceServiceContent;
}
