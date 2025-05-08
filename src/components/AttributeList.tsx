import React from "react";
import { AttributeRow } from "./AttributeRow";

interface Attribute {
  type: string;
  name: string;
  nullable: boolean;
  relacion: string;
}

interface Props {
  attributes: Attribute[];
  setAttributes: (list: Attribute[]) => void;
}

export const AttributeList: React.FC<Props> = ({
  attributes,
  setAttributes,
}) => {
  const updateAttribute = (index: number, updated: Attribute) => {
    const copy = [...attributes];
    copy[index] = updated;
    setAttributes(copy);
  };

  const addAttribute = () => {
    setAttributes([
      ...attributes,
      { type: "", name: "", nullable: false, relacion: "" },
    ]);
  };

  const removeAttribute = (index: number) => {
    const confirmDelete = window.confirm("¿Estás seguro de eliminarlo?");
    if (!confirmDelete) return;
    setAttributes(attributes.filter((_, i) => i !== index));
  };

  return (
    <section id="filas" style={{ marginTop: "1em" }}>
      {attributes.map((attr, i) => (
        <AttributeRow
          key={i}
          attribute={attr}
          onChange={(updated) => updateAttribute(i, updated)}
          onAdd={addAttribute}
          isLast={i === attributes.length - 1}
          showRemove={attributes.length > 1}
          onRemove={() => removeAttribute(i)}
        />
      ))}
    </section>
  );
};
