export default function createChangelogFile(abm) {
  const { NombreClase } = abm;
  const changelogContent = `<?xml version="1.0" encoding="UTF-8"?>
<databaseChangeLog xmlns="http://www.liquibase.org/xml/ns/dbchangelog"
                   xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
                   xsi:schemaLocation="http://www.liquibase.org/xml/ns/dbchangelog http://www.liquibase.org/xml/ns/dbchangelog/dbchangelog-3.5.xsd">
    <changeSet author="generado" id="new_model_${NombreClase}">
        <sqlFile path="sql/db-changelog-XXX.sql" relativeToChangelogFile="true"/>
    </changeSet>
</databaseChangeLog>

`;

  return changelogContent;
}
