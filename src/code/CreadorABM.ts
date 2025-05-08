import createBeanFile from "./createBean";
import createChangelogFile from "./createChangelog";
import createDtoFile from "./createDto";
import createModelFile from "./createModelFile";
import createServiceMapperFile from "./createServiceMapper";
import createTablaSQLFile from "./createTablaSQL";
import createPrimefacesFiles from "./createPrimeFaces";
import createServiceFile from "./createService";
import createInterfaceServiceFile from "./createInterfaceService";
import { create, mkdir, open } from "@tauri-apps/plugin-fs";
import createDaoFile from "./createDao";

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
  creadoABM: CreadorABM;
  pathTest;
  daoPath;
  desktopPath;
  messagePropertiesPath;

  constructor(rootPath, NombreClase, test, atributos) {
    this.pathTest = "";
    this.rootPath = rootPath;
    this.NombreClase = NombreClase; // string
    this.test = test; // boGolean
    this.atributos = atributos; // array
    this.nombreClase =
      NombreClase.charAt(0).toLowerCase() + NombreClase.slice(1);
    this.dtoPath =
      this.rootPath + "src/main/java/ar/com/mbsoft/erp/dto/impl/generated/";
    this.sqlPath = this.rootPath + "src/main/resources/liquibase/sql/";
    this.changelogPath = this.rootPath + "src/main/resources/liquibase/";
    this.primefacesPath =
      this.rootPath + "src/main/webapp/faces/" + this.nombreClase + "/";
    this.servicePath =
      this.rootPath + "src/main/java/ar/com/mbsoft/erp/service/impl/";
    this.serviceMapperPath =
      this.rootPath + "src/main/java/ar/com/mbsoft/erp/service/impl/mapper/";
    this.modelPath =
      this.rootPath + "src/main/java/ar/com/mbsoft/erp/model/impl/";
    this.interfaceServicePath =
      this.rootPath + "src/main/java/ar/com/mbsoft/erp/service/";
    this.beanPath =
      this.rootPath + "src/main/java/ar/com/mbsoft/erp/bean/impl/";
    this.daoPath = this.rootPath + "src/main/java/ar/com/mbsoft/erp/dao/";
    this.messagePropertiesPath =
      this.rootPath + "resources/messages.properties";
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
    this.creadoABM = this;
  }
  async init() {
    const { desktopDir } = await import("@tauri-apps/api/path");
    this.desktopPath = (await desktopDir()) + "\\fast_abm_test\\";
    return this;
  }

  capitalize(str) {
    console.log("capitalize ", str);
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
        }) { this.${a.name} = ${a.name};}`;
      })
      .join("\n");
  }

  campo(atributo) {
    return `private ${atributo.type} ${atributo.name};`;
  }

  nombreCampoTabla(atributo): string {
    console.log("nameFieldTabla ", atributo);
    let inicial = "nID";
    if (this.tiposNumericos.includes(atributo.type)) inicial = "n";
    if (atributo.type === "String") inicial = "c";
    if (atributo.type === "Boolean" || atributo.type === "boolean")
      inicial = "l";
    if (this.tiposTiempo.includes(atributo.type)) inicial = "t";
    return inicial + this.capitalize(atributo.name);
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
        `(fetch = FetchType.Lazy)\n    @JoinColumn(name ="${this.nombreCampoTabla(
          atributo
        )}"${atributo.nullable ? "" : ",nullable=false"})\n    `;
    } else {
      console.log("else");
      anotation = `    @Column(name = "${this.nombreCampoTabla(atributo)}" ${
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

  isStringOrNumberOrDate(atributo) {
    console.log("isStringOrNumberOrDate");
    return this.tiposUsados.includes(atributo.type);
  }

  async crearArchivos() {
    console.log("creandoArchivos.....");
    await this.escribirArchivo(
      this.beanPath + `${this.NombreClase}Bean.java`,
      createBeanFile(this)
    );
    await this.escribirArchivo(
      this.changelogPath + `db-changelog-XXX.xml`,
      createChangelogFile(this)
    );
    await this.escribirArchivo(
      this.dtoPath + `${this.NombreClase}Dto.java`,
      createDtoFile(this)
    );
    await this.escribirArchivo(
      this.interfaceServicePath + `I${this.NombreClase}Service.java`,
      createInterfaceServiceFile(this)
    );
    await this.escribirArchivo(
      this.interfaceServicePath + `I${this.NombreClase}Service.java`,
      createInterfaceServiceFile(this)
    );
    await this.escribirArchivo(
      this.modelPath + `${this.NombreClase}.java`,
      createModelFile(this)
    );
    createPrimefacesFiles(this).forEach(async (p, i) => {
      let nombreArchivo = "";
      await mkdir(this.primefacesPath, {
        recursive: true,
      });
      if (i === 0) nombreArchivo = "abm.xhtml";
      if (i === 1) nombreArchivo = "listar.xhtml";
      if (i === 2) nombreArchivo = "propiedades.xhtml";
      await this.escribirArchivo(this.primefacesPath + nombreArchivo, p);
    });
    await this.escribirArchivo(
      this.servicePath + `${this.NombreClase}Service.java`,
      createServiceFile(this)
    );
    await this.escribirArchivo(
      this.serviceMapperPath + this.NombreClase + "ServiceMapper.java",
      createServiceMapperFile(this)
    );
    await this.escribirArchivo(
      this.sqlPath + `db-changelog-XXX.sql`,
      createTablaSQLFile(this)
    );
    await this.escribirArchivo(
      this.daoPath + "I" + this.NombreClase + "Dao.java",
      createDaoFile(this)
    );
    await this.escribirArchivo(
      this.messagePropertiesPath,
      `
#${this.NombreClase}
faces.${this.nombreClase}.title=${this.NombreClase}
${this.atributos
  .map((a) => {
    return `faces.${this.nombreClase}.${a.name}=${this.convertirCampo(a.name)}`;
  })
  .join("\n")}
      `
    );
    console.log("Terminado");
  }

  convertirCampo(campo: string): string {
    // Reemplaza camelCase o snake_case por espacios y capitaliza cada palabra
    return campo
      .replace(/([a-z])([A-Z])/g, "$1 $2") // camelCase → espacio antes de mayúsculas
      .replace(/_/g, " ") // snake_case → espacios
      .replace(/\b\w/g, (letra) => letra.toUpperCase()); // Capitaliza cada palabra
  }

  async escribirArchivo(path, contents) {
    try {
      if (path === this.messagePropertiesPath) {
        const file = await open(path, { append: true });
        await file.write(new TextEncoder().encode(contents));
        await file.close();
        return;
      }
      if (this.test) {
        await mkdir(this.desktopPath, {
          recursive: true,
        });
        const nombreArchivo = path.split(/[/\\]/).pop();
        const file = await create(this.desktopPath + nombreArchivo);
        await file.write(new TextEncoder().encode(contents));
        await file.close();
      } else {
        const file = await create(path);
        await file.write(new TextEncoder().encode(contents));
        await file.close();
      }
    } catch (err) {
      console.error("Error al escribir archivo:", err);
    }
  }
}
