import React from "react";

interface Attribute {
  type: string;
  name: string;
  nullable: boolean;
  relacion: string;
}

interface Props {
  attribute: Attribute;
  onChange: (attr: Attribute) => void;
  onRemove?: () => void;
  isLast: boolean;
  onAdd: () => void;
  showRemove: boolean;
}

const tipos = [
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

export const AttributeRow: React.FC<Props> = ({
  attribute,
  onChange,
  onRemove,
  isLast,
  onAdd,
  showRemove,
}) => {
  const handleChange = (field: keyof Attribute, value: string | boolean) => {
    onChange({ ...attribute, [field]: value });
  };

  const showRelacion = attribute.type && !tipos.includes(attribute.type);

  return (
    <article
      className="fila"
      style={{ display: "flex", gap: "3.5em", marginTop: "1em" }}
    >
      <div>
        <label>Tipo</label>
        <input
          list="typeList"
          className="tipo"
          value={attribute.type}
          placeholder="String.."
          onChange={(e) => handleChange("type", e.target.value)}
        />
      </div>
      <div>
        <label>Nombre campo</label>
        <input
          className="nombreCampo"
          type="text"
          value={attribute.name}
          placeholder="nombreApellido.."
          onChange={(e) => handleChange("name", e.target.value)}
        />
      </div>
      <div>
        <label>Nullable</label>
        <input
          type="checkbox"
          className="nullable"
          checked={attribute.nullable}
          onChange={(e) => handleChange("nullable", e.target.checked)}
        />
      </div>
      {showRelacion && (
        <span className="relacionContainer" style={{ marginLeft: "2em" }}>
          <label>Relación</label>
          <input
            list="relacionList"
            className="relacion"
            value={attribute.relacion}
            onChange={(e) => handleChange("relacion", e.target.value)}
            placeholder="@OneToMany"
          />
        </span>
      )}
      {isLast && (
        <button type="button" className="botonNuevo" onClick={onAdd}>
          + Nuevo Campo
        </button>
      )}
      {showRemove && (
        <button type="button" className="botonBorrar" onClick={onRemove}>
          - Borrar Campo
        </button>
      )}
    </article>
  );
};
