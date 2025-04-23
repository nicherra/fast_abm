const fs = require("fs");
const { primefacesPath, test } = require("./utils");

function createPrimefacesFiles(abm) {
  const { nombreClase, NombreClase, primefacesPath } = abm;
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

  fs.mkdir(primefacesPath, { recursive: true }, (err) => {
    if (err && !test) {
      console.error("Error al crear la carpeta:", err);
    } else {
      // Una vez creada la carpeta, escribir el archivo
      fs.writeFile(primefacesPath + `abm.xhtml`, abmContent, (err) => {
        if (err) {
          console.error("Error al escribir el archivo:", err);
        } else {
          console.log("Archivo escrito correctamente");
        }
      });
    }
  });

  const listaContent = `<?xml version="1.0" encoding="UTF-8"?>
<html xmlns="http://www.w3.org/1999/xhtml"
      xmlns:ui="http://java.sun.com/jsf/facelets"
      xmlns:h="http://java.sun.com/jsf/html"
      xmlns:p="http://primefaces.org/ui">
<h:body>
    <ui:composition template="/faces/facelets/crud/singleMaster/tablas.xhtml">
        <ui:define name="columnas">
            <p:column filterBy="#{itemTablaMaster.nombre}" headerText="#{msg['faces.${nombreClase}.nombre']}"
                      filterable="#{bean.master.mostrarFiltros}" filterMatchMode="contains"
                      sortBy="#{itemTablaMaster.nombre}">
                <h:outputText value="#{itemTablaMaster.nombre}"/>
            </p:column>
        </ui:define>
    </ui:composition>
</h:body>
</html>

`;

  fs.mkdir(primefacesPath, { recursive: true }, (err) => {
    if (err && !test) {
      console.error("Error al crear la carpeta:", err);
    } else {
      // Una vez creada la carpeta, escribir el archivo
      fs.writeFile(primefacesPath + `lista.xhtml`, listaContent, (err) => {
        if (err) {
          console.error("Error al escribir el archivo:", err);
        } else {
          console.log("Archivo escrito correctamente");
        }
      });
    }
  });

  const propiedadesContent = `<?xml version="1.0" encoding="UTF-8"?>
<html xmlns="http://www.w3.org/1999/xhtml"
      xmlns:h="http://java.sun.com/jsf/html"
      xmlns:p="http://primefaces.org/ui">
<h:body>
    <h:panelGrid columns="2" cellpadding="10">
        <p:outputLabel value="#{msg['faces.${nombreClase}.nombre']}"/>
        <p:inputText id="nombre" value="#{bean.master.seleccionado.nombre}"
                     required="true" readonly="#{!bean.master.creandoEditando}"/>
    </h:panelGrid>
</h:body>
</html>

`;

  fs.mkdir(primefacesPath, { recursive: true }, (err) => {
    if (err && !test) {
      console.error("Error al crear la carpeta:", err);
    } else {
      // Una vez creada la carpeta, escribir el archivo
      fs.writeFile(primefacesPath + `propiedades.xhtml`, propiedadesContent, (err) => {
        if (err) {
          console.error("Error al escribir el archivo:", err);
        } else {
          console.log("Archivo escrito correctamente");
        }
      });
    }
  });
}
module.exports = { createPrimefacesFiles };
