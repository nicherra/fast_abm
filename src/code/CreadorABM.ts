import createBeanFile from "./createBean";
import createChangelogFile from "./createChangelog";
import createDtoFile from "./createDto";
import createModelFile from "./createModelFile";
import createServiceMapperFile from "./createServiceMapper";
import createTablaSQLFile from "./createTablaSQL";
import createPrimefacesFiles from "./createPrimeFaces";
import createServiceFile from "./createService";
import createInterfaceServiceFile from "./createInterfaceService";
import { writeTextFile, BaseDirectory } from "@tauri-apps/plugin-fs";
import { locale } from "@tauri-apps/plugin-os";

export default class CreadorABM {
  NombreClase;
  test; // boolean
  atributos; // array
  username;
  nombreClase;
  rootPath;
  dtoPat;
  sqlPath;
  changelogPath;
  primefacesPath;
  servicePath;
  serviceMapperPath;
  modelPath;
  interfaceServicePath;
  beanPath;
  tiposUsados;
  tiposNumericos;
  enteros;
  decimales;
  tiposTiempo;
  dtoPath;

  constructor(NombreClase, test, atributos) {
    this.NombreClase = NombreClase; // string
    this.test = test; // boolean
    this.atributos = atributos; // array
    this.username = locale.toString();
    this.nombreClase =
      NombreClase.charAt(0).toLowerCase() + NombreClase.slice(1);
    this.rootPath = `C:/Users/${this.username}/IdeaProjects/erp-web/`;
    this.dtoPath = test
      ? "test/"
      : this.rootPath + "src/main/java/ar/com/mbsoft/erp/dto/impl/generated/";
    this.sqlPath = test
      ? "test/"
      : this.rootPath + "src/main/resources/liquibase/sql/";
    this.changelogPath = test
      ? "test/"
      : this.rootPath + "src/main/resources/liquibase/";
    this.primefacesPath = test
      ? ""
      : this.rootPath + "src/main/webapp/faces/" + this.nombreClase + "/";
    this.servicePath = test
      ? "test/"
      : this.rootPath + "src/main/java/ar/com/mbsoft/erp/service/impl/";
    this.serviceMapperPath = test
      ? "test/"
      : this.rootPath + "src/main/java/ar/com/mbsoft/erp/service/impl/mapper/";
    this.modelPath = test
      ? "test/"
      : this.rootPath + "src/main/java/ar/com/mbsoft/erp/model/impl/";
    this.interfaceServicePath = test
      ? "test/"
      : this.rootPath + "src/main/java/ar/com/mbsoft/erp/service/";
    this.beanPath = test
      ? "test/"
      : this.rootPath + "src/main/java/ar/com/mbsoft/erp/bean/impl/";
    this.tiposUsados = [
      "BigDecimal",
      "String",
      "Long",
      "Boolean",
      "boolean",
      "int",
      "Integer",
      "Date",
      "long",
      "float",
      "Float",
      "double",
      "Double",
      "char",
      "Character",
      "byte",
      "Byte",
      "short",
      "Short",
      "Object",
      "LocalDate",
      "LocalTime",
      "LocalDateTime",
    ];

    this.tiposNumericos = [
      "BigDecimal",
      "Long",
      "long",
      "Integer",
      "int",
      "float",
      "Float",
      "double",
      "Double",
      "byte",
      "Byte",
      "short",
      "Short",
    ];
    this.enteros = [
      "Long",
      "long",
      "Integer",
      "int",
      "byte",
      "Byte",
      "short",
      "Short",
    ];
    this.decimales = ["BigDecimal", "float", "Float", "double", "Double"];
    this.tiposTiempo = ["Date", "LocalDate", "LocalTime", "LocalDateTime"];
  }

  capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  esClase(type) {
    return !this.tiposUsados.includes(type);
  }

  set(name, value) {
    return `${this.nombreClase}.set${this.capitalize(name)}(${value});`;
  }

  get(name) {
    return `${this.nombreClase}.get${this.capitalize(name)}()`;
  }

  setDto(name, value) {
    return `${this.nombreClase}Dto.set${this.capitalize(name)}(${value});`;
  }

  getDto(name) {
    return `${this.nombreClase}Dto.get${this.capitalize(name)}()`;
  }

  fromDto() {
    return `fromDto(${this.get(this.nombreClase)})`;
  }

  createDto() {
    return `createDto(${this.getDto(this.nombreClase)})`;
  }

  getFieldTypeSQL(atributo) {
    let type = " BIGINT ";
    if (this.enteros.includes(atributo.type)) type = " BIGINT ";
    if (this.decimales.includes(atributo.type)) type = " NUMERIC(16,6) ";
    if (atributo.type === "String") type = " VARCHAR(255) ";
    if (atributo.type === "Boolean" || atributo.type === "boolean")
      type = " BIT ";
    if (this.tiposTiempo.includes(atributo.type)) type = " datetime2(7) ";
    return type;
  }

  getters() {
    return this.atributos
      .map((a) => {
        return `    public ${a.type} get${this.capitalize(
          a.name
        )}() { return this.${a.name};}`;
      })
      .join("\n");
  }

  setters() {
    return this.atributos
      .map((a) => {
        return `    public void set${this.capitalize(a.name)}(${a.type} ${
          a.name
        }) { return this.${a.name} = ${a.name};}`;
      })
      .join("\n");
  }

  campo(atributo) {
    return `private ${atributo.type} ${atributo.name};`;
  }

  campoTabla(atributo) {
    console.log("Ejecutando campoTabla\n", atributo);
    const notNull = "    @NotNull\n";
    let anotation = "";
    if (atributo.relacion) {
      console.log("anotacion");
      anotation =
        "    " +
        atributo.relacion +
        `(fetch = FetchType.Lazy)\n    @JoinColumn(name ="${this.nameFieldTabla(
          atributo
        )}"${atributo.nullable ? "" : ",nullable=false"})\n    `;
    } else {
      console.log("else");
      anotation = `    @Column(name = "${this.nameFieldTabla(atributo)}" ${
        atributo.nullable ? "" : ",nullable=false"
      })\n    `;
    }
    return (
      (atributo.nullable ? "" : notNull) +
      anotation +
      this.campo(atributo) +
      "\n"
    );
  }

  nameFieldTabla(atributo) {
    console.log("nameFieldTabla \n", atributo);
    let inicial = "nID";
    if (this.tiposNumericos.includes(atributo.type)) inicial = "n";
    if (atributo.type === "String") inicial = "c";
    if (atributo.type === "Boolean" || atributo.type === "boolean")
      inicial = "l";
    if (this.tiposTiempo.includes(atributo.type)) inicial = "t";
    return inicial + this.capitalize(atributo.name);
  }
  crearArchivos() {
    console.log("creandoArchivos.....");
    this.escribirArchivo(
      this.beanPath + `${this.NombreClase}Bean.java`,
      createBeanFile(this)
    );
    this.escribirArchivo(
      this.changelogPath + `db-changelog-XXX.xml`,
      createChangelogFile(this)
    );
    this.escribirArchivo(
      this.dtoPath + `${this.NombreClase}Dto.java`,
      createDtoFile(this)
    );
    createInterfaceServiceFile(this);
    createModelFile(this);
    createDtoFile(this);
    createChangelogFile(this);
    createPrimefacesFiles(this);
    createServiceMapperFile(this);
    createServiceFile(this);
    createTablaSQLFile(this);
    console.log("Terminado");
  }

  async escribirArchivo(path, contents) {
    try {
      await writeTextFile(path, contents);
      alert("Archivo guardado correctamente.");
    } catch (err) {
      console.error("Error al escribir archivo:", err);
      alert("Hubo un error al guardar el archivo.");
    }
  }
}
