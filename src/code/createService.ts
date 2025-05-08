export default function createServiceFile(abm) {
  const { nombreClase, NombreClase } = abm;
  const serviceContent = `package ar.com.mbsoft.erp.service.impl;

import ar.com.mbsoft.erp.dao.I${NombreClase}Dao;
import ar.com.mbsoft.erp.dto.impl.generated.${NombreClase}Dto;
import ar.com.mbsoft.erp.exception.impl.BusinessException;
import ar.com.mbsoft.erp.model.impl.${NombreClase};
import ar.com.mbsoft.erp.service.I${NombreClase}Service;
import ar.com.mbsoft.erp.service.impl.mapper.${NombreClase}ServiceMapper;
import com.beust.jcommander.internal.Lists;
import org.primefaces.PrimeFaces;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import javax.transaction.Transactional;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.List;

@Transactional
@Service
public class ${NombreClase}Service extends AbstractService<${NombreClase}, ${NombreClase}Dto> implements I${NombreClase}Service {

    @Autowired
    private I${NombreClase}Dao ${nombreClase}Dao;
    @Autowired
    private ${NombreClase}ServiceMapper ${nombreClase}ServiceMapper;

    @Override
    public ${NombreClase}Dto save(${NombreClase}Dto seleccionado) throws BusinessException {
        return ${nombreClase}ServiceMapper.createDto(${nombreClase}Dao.save(${nombreClase}ServiceMapper.fromDto(seleccionado)));
    }

    @Override
    public ${NombreClase}Dto delete(${NombreClase}Dto seleccionado) throws BusinessException {
        ${nombreClase}Dao.deleteById(seleccionado.getId());
        return seleccionado;
    }

    @Override
    public ${NombreClase}Dto findOneDtoById(Long id) {
        return ${nombreClase}ServiceMapper.createDto(${nombreClase}Dao.findOneById(id));
    }

    @Override
    public List<${NombreClase}Dto> findAllDto() {
        return toDtoList(${nombreClase}Dao.findAll(), ${nombreClase}ServiceMapper::createDto);
    }
}


`;
  return serviceContent;
}
