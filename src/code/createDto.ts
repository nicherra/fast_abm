export default function createDtoFile(abm) {
  const { NombreClase, atributos } = abm;
  const dtoContent = `package ar.com.mbsoft.erp.dto.impl.generated;
import ar.com.mbsoft.erp.dto.IDto;
import java.math.BigDecimal;
import java.util.Date;

public class ${NombreClase}Dto implements IDto {
    private Long id;
${atributos
  .map((a) => {
    return "    private " + a.type + " " + a.name + ";";
  })
  .join("\n")}

${atributos
  .map((a) => {
    return (
      "    public " +
      a.type +
      " get" +
      a.name.charAt(0).toUpperCase() +
      a.name.slice(1) +
      "() { return this." +
      a.name +
      ";}"
    );
  })
  .join("\n")}

${atributos
  .map((a) => {
    return (
      "    public void" +
      " set" +
      a.name.charAt(0).toUpperCase() +
      a.name.slice(1) +
      "(" +
      a.type +
      " " +
      a.name +
      ")" +
      " { this." +
      a.name +
      " = " +
      a.name +
      ";}"
    );
  })
  .join("\n")}

    @Override
    public Long getId() {
        return id;
    }

    @Override
    public void setId(Long id) {
        this.id = id;
    }
}

`;
  return dtoContent;
}
