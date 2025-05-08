export default function createDaoFile(abm) {
  const { NombreClase } = abm;

  const daoContent = `package ar.com.mbsoft.erp.dao;

import ar.com.mbsoft.erp.model.impl.${NombreClase};
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface I${NombreClase}Dao extends JpaRepository<${NombreClase},Long> {

    ${NombreClase} findOneById(Long id${NombreClase});
}


`;
  return daoContent;
}
