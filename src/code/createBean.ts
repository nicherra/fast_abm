export default function createBeanFile(abm) {
  const { NombreClase, nombreClase } = abm;

  const beanContent = `package ar.com.mbsoft.erp.bean.impl;

import ar.com.mbsoft.erp.dto.IDto;
import ar.com.mbsoft.erp.dto.impl.generated.${NombreClase}Dto;
import ar.com.mbsoft.erp.model.IPersistible;
import ar.com.mbsoft.erp.service.IService;
import ar.com.mbsoft.erp.service.I${NombreClase}Service;
import javax.faces.bean.ManagedBean;
import javax.faces.bean.ViewScoped;
import java.util.List;

@ManagedBean(name = ${NombreClase}Bean.BEAN_NAME, eager = true)
@ViewScoped
public class ${NombreClase}Bean extends AbstractSingleMasterBean<${NombreClase}Dto> {
    public static final String BEAN_NAME = "${nombreClase}Bean";

    private I${NombreClase}Service ${nombreClase}Service;

    @Override
    public AbstractDataTableViewHandler<${NombreClase}Dto> createMaster() {
        return new ${NombreClase}Master();
    }

    @Override
    protected void iniciarDependencias() {
        ${nombreClase}Service = getSpringBean(I${NombreClase}Service.class);
        iniciarMaster(getIdentificadorPantalla());
    }

    @Override
    public IService<? extends IPersistible, ? extends IDto> getService() {
        return ${nombreClase}Service;
    }

    @Override
    public int getIdentificadorPantalla() {
        return super.getIdentificadorPantalla(BEAN_NAME);
    }

    public class ${NombreClase}Master extends AbstractDataTableViewHandler<${NombreClase}Dto> {

        public ${NombreClase}Master() {
            super(TABLA_MASTER_MESSAGES);
        }

        @Override
        public List<${NombreClase}Dto> findAllDto() {
            return ${nombreClase}Service.findAllDto();
        }

        @Override
        public ${NombreClase}Dto crearSeleccionado() {
            return new ${NombreClase}Dto();
        }

        @Override
        public ${NombreClase}Dto guardarSeleccionado() {
            return ${nombreClase}Service.save(getSeleccionado());
        }

        @Override
        public ${NombreClase}Dto borrarSeleccionado() {
            return ${nombreClase}Service.delete(getSeleccionado());
        }
    }

}

`;
  return beanContent;
}
