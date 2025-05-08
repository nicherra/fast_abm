import CreadorABM from "./CreadorABM";

export default function createPrimefacesFiles(abm: CreadorABM) {
  const { nombreClase, atributos, tiposNumericos, tiposTiempo } = abm;
  const abmContent = `<?xml version="1.0" encoding="UTF-8"?>
<html xmlns="http://www.w3.org/1999/xhtml"
      xmlns:ui="http://java.sun.com/jsf/facelets"
      xmlns:h="http://java.sun.com/jsf/html">
<h:body>
    <ui:composition template="/faces/facelets/crud/layout.xhtml">
        <ui:param name="tituloVista" value="#{msg['faces.${nombreClase}.title']}" />
        <ui:param name="bean" value="#{${nombreClase}Bean}" />
        <ui:param name="nombreEntidad"
                  value="#{msg['faces.${nombreClase}.title']}"/>
        <ui:define name="listar">
            <ui:include src="listar.xhtml"></ui:include>
        </ui:define>
        <ui:define name="propiedades">
            <ui:include src="propiedades.xhtml"></ui:include>
        </ui:define>
    </ui:composition>
</h:body>
</html>


`;

  const listaContent = `<?xml version="1.0" encoding="UTF-8"?>
<html xmlns="http://www.w3.org/1999/xhtml"
      xmlns:ui="http://java.sun.com/jsf/facelets"
      xmlns:h="http://java.sun.com/jsf/html"
      xmlns:p="http://primefaces.org/ui">
<h:body>
    <ui:composition template="/faces/facelets/crud/singleMaster/tablas.xhtml">
        <ui:define name="columnas">
${atributos
  .map((a) => {
    if (abm.isStringOrNumberOrDate(a))
      return `<p:column filterBy="#{itemTablaMaster.${a.name}}" headerText="#{msg['faces.${nombreClase}.${a.name}']}"
                      filterable="#{bean.master.mostrarFiltros}" filterMatchMode="contains"
                      sortBy="#{itemTablaMaster.${a.name}}">
                <h:outputText value="#{itemTablaMaster.${a.name}}"/>
            </p:column>`;
  })
  .join("\n")}
        </ui:define>
    </ui:composition>
</h:body>
</html>

`;
  const propiedadesContent = `<?xml version="1.0" encoding="UTF-8"?>
<html xmlns="http://www.w3.org/1999/xhtml"
      xmlns:h="http://java.sun.com/jsf/html"
      xmlns:p="http://primefaces.org/ui">
<h:body>
    <h:panelGrid columns="2" cellpadding="10">
${atributos
  .map((a) => {
    if ("String" === a.type)
      return `
        <p:outputLabel value="#{msg['faces.${nombreClase}.${a.name}']}"/>
        <p:inputText id="${a.name}" value="#{bean.master.seleccionado.${a.name}}"
                     required="true" readonly="#{!bean.master.creandoEditando}"/>
`;
    if (tiposNumericos.includes(a.type))
      return `
        <p:outputLabel value="#{msg['faces.${nombreClase}.${a.name}']}"/>
        <p:inputNumber id="${a.name}" value="#{bean.master.seleccionado.${a.name}}"
                     required="true" readonly="#{!bean.master.creandoEditando}"/>
`;

    if (tiposTiempo.includes(a.type))
      return `
        <p:outputLabel value="#{msg['faces.${nombreClase}.${a.name}']}"/>
        <p:calendar id="${a.name}" size="10"
                        styleClass="calendar"
                        autocomplete="off"
                        required="true"
                        value="#{bean.master.seleccionado.${a.name}}"
                        pattern="#{MBDateUtils.DD_MM_YYYY}"
                        readonly="#{!bean.master.creandoEditando}"
                        disabled="#{!bean.master.creandoEditando}">
        </p:calendar>

`;

    if (abm.isStringOrNumberOrDate(a))
      return `
        <p:outputLabel value="#{msg['faces.${nombreClase}.${a.name}']}"/>
        <p:panel styleClass="panel-autocomplete">
            <p:autoComplete id="${a.name}"
                            dropdown="true" var="${a.name}" size="35"
                            itemValue="#{${a.name}}"
                            itemLabel="#{${a.name}.nombre}"
                            required="true"
                            value="#{bean.master.seleccionado.${a.name}}"
                            readonly="#{!bean.master.creandoEditando}"
                            completeMethod="#{bean.completar${a.name}}"
                            disabled="#{!bean.master.creandoEditando}"
                            converter="#{bean.${a.name}Converter}">
                <p:ajax event="itemSelect"
                        listener="#{bean.on${a.name}Seleccionada}"
                        update="${a.name}"/>
            </p:autoComplete>
            <p:message for="${a.name}" display="tooltip"/>
        </p:panel>

`;
  })
  .join("\n")}
    </h:panelGrid>
</h:body>
</html>

`;

  return [abmContent, listaContent, propiedadesContent];
}
