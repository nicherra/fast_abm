import CreadorABM from "./CreadorABM";

export default function createTablaSQLFile(abm: CreadorABM) {
  const { NombreClase, atributos } = abm;
  const atributos_with_FK = [];
  const totalAtributos = atributos.length;
  const tableContent = `CREATE TABLE ${NombreClase}(
    nID BIGINT IDENTITY (1, 1) NOT NULL,
	nIDUsuario VARCHAR(255) NOT NULL,
	nVersion bigint NOT NULL,

${atributos
  .map((a, i) => {
    if (abm.nombreCampoTabla(a).includes("nID")) atributos_with_FK.push(a);
    return (
      abm.nombreCampoTabla(a) +
      abm.getFieldTypeSQL(a) +
      (!a.nullable ? "NOT NULL" : "") +
      (totalAtributos - 1 == i ? "" : ",")
    );
  })
  .join("\n")}

${atributos_with_FK
  .map((a) => {
    return (
      ",FOREIGN KEY (" +
      abm.nombreCampoTabla(a) +
      ") REFERENCES " +
      a.name.charAt(0).toUpperCase() +
      a.name.slice(1) +
      "(nID),"
    );
  })
  .join("\n")}
)`;
  return tableContent;
}
