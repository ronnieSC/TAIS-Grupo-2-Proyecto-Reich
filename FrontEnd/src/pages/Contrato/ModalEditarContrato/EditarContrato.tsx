import { useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "./EditarContrato.css"; // Importa el archivo de estilos personalizados
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import {
  ContratoEntidad,
  informacionNuevoContrato,
} from "../../../utilities/ContratoTipos";
import { useLoaderData, useSubmit } from "react-router-dom";
import FormEditApoderado from "./Formularios/FormEditApoderado";
import FormEditEstudiante from "./Formularios/FormEditEstudiante";
import FormEditMatricula from "./Formularios/FormEditMatricula";
import FormEditGuia from "./Formularios/FormEditGuia";
import FormEditPension from "./Formularios/FormEditPensión";

interface datoEditContrato {
  contrato: ContratoEntidad;
  informacion: informacionNuevoContrato;
}
type Entry = [string, any];
type Entries = Entry[];

const EditarContrato = () => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const handleRegresarTab = () => setActiveTab(activeTab - 1);
  const submit = useSubmit();

  const { contrato, informacion } = useLoaderData() as datoEditContrato;
  const apoderado = contrato.parentescos.find(
    (item) => item.apoderado.apoderado
  );

  const [contratoEditado, setContratoEditado] = useState<ContratoEntidad>({
    estudiante: contrato?.estudiante,
    parentescos: [apoderado!],
    matricula: contrato.matricula,
    guia: contrato.guia,
    pension: contrato.pension,
    condicion: contrato.condicion,
    firma_contrato: contrato.firma_contrato,
    responsable_informacion: contrato.responsable_informacion,
    documentos: contrato.documentos,
    id: contrato.id,
  });

  const partialOnSubmit = (data: Partial<ContratoEntidad>) => {
    setContratoEditado({
      ...contratoEditado,
      ...data,
    });
    setActiveTab(activeTab + 1);
  };

  function fromEntriesRecursivas(array: Entries): any {
    return Object.fromEntries(
      array.map(([key, value]: Entry): Entry => {
        if (key === "documentos" || key === "parentescos") {
          return [
            key,
            Object.values(value).map((v) =>
              Array.isArray(v) ? fromEntriesRecursivas(v as Entries) : v
            ),
          ];
        } else if (Array.isArray(value)) {
          return [key, fromEntriesRecursivas(value as Entries)];
        } else {
          return [key, value];
        }
      })
    );
  }

  function remove_empties_duplicate(
    changedValues: object | any,
    defaultValues: object | any
  ): object | [] | any {
    if (
      (typeof changedValues !== "object" || defaultValues === undefined) &&
      changedValues !== defaultValues
    )
      return changedValues;
    else if (
      typeof changedValues !== "object" &&
      changedValues === defaultValues
    )
      return "";
    else if (changedValues === null) {
      return null;
    }

    const filteredEntries = Object.entries(changedValues)
      .map(([key, value]) => {
        if (key === "documentos") {
          return [key, value];
        }

        const modifiedValue = remove_empties_duplicate(
          value,
          defaultValues[key]
        );
        if (
          typeof modifiedValue !== "object" &&
          modifiedValue !== null &&
          modifiedValue !== undefined &&
          modifiedValue !== ""
        ) {
          return [key, modifiedValue];
        } else if (
          typeof modifiedValue === "object" &&
          modifiedValue !== null &&
          Object.keys(modifiedValue).length !== 0 &&
          modifiedValue !== ""
        ) {
          return [key, modifiedValue];
        }
        return undefined;
      })
      .filter(Boolean) as [string, any][];

    return fromEntriesRecursivas(filteredEntries);
  }

  const onSubmit = (data: Partial<ContratoEntidad>) => {
    delete data?.estudiante?.usuario;
    delete data?.estudiante?.telefono;
    delete data?.estudiante?.alias;
    delete data?.estudiante?.foto;
    delete data?.estudiante?.contrato_codigo;

    delete data?.parentescos![0]?.apoderado?.usuario;
    delete data?.parentescos![0]?.apoderado?.nivel_estudios;
    delete data?.parentescos![0]?.apoderado?.centro_trabajo;
    delete data?.parentescos![0]?.contrato_codigo;

    delete data?.matricula?.digitador;
    delete data?.guia?.digitador;
    delete data?.pension?.digitador;

    const values = remove_empties_duplicate(data, contrato)

    submit(
      { values: JSON.stringify(values), contratoId: contrato!.id! },
      {
        action: "/contrato",
        method: "patch",
      }
    );
  };

  return (
    <Modal isOpen={true} size="lg" centered>
      <ModalHeader className="modal-header-custom">
        <div className="d-flex justify-content-between align-items-center">
          <h6 className="mb-0" style={{ fontWeight: "bold" }}>
            EDITAR CONTRATO
          </h6>
        </div>
      </ModalHeader>

      <ModalBody>
        <Tabs selectedIndex={activeTab} onSelect={() => {}}>
          <TabList className="custom-tab-list">
            <Tab
              className={`custom-tab ${
                activeTab === 0 ? "custom-tab--selected" : ""
              }`}
            >
              Información Estudiante
            </Tab>
            <Tab
              className={`custom-tab ${
                activeTab === 1 ? "custom-tab--selected" : ""
              }`}
            >
              Información Apoderado
            </Tab>
            <Tab
              className={`custom-tab ${
                activeTab === 2 ? "custom-tab--selected" : ""
              }`}
            >
              Pago Matrícula
            </Tab>
            <Tab
              className={`custom-tab ${
                activeTab === 3 ? "custom-tab--selected" : ""
              }`}
            >
              Pago Guía
            </Tab>
            <Tab
              className={`custom-tab ${
                activeTab === 4 ? "custom-tab--selected" : ""
              }`}
            >
              Pago Pensión
            </Tab>
          </TabList>

          {/*--------------------------------PANEL ESTUDIANTES--------------------------------------------------*/}
          <TabPanel>
            <FormEditEstudiante
              onSubmit={partialOnSubmit}
              contratoPartial={contratoEditado}
              informacion={informacion!}
            />
          </TabPanel>

          {/*--------------------------------PANEL 2--------------------------------------------------*/}

          <TabPanel>
            <FormEditApoderado
              onSubmit={partialOnSubmit}
              contratoPartial={contratoEditado}
              informacion={informacion!}
              handleTab={handleRegresarTab}
            />
          </TabPanel>

          {/*--------------------------------PANEL 3--------------------------------------------------*/}

          <TabPanel>
            <FormEditMatricula
              onSubmit={partialOnSubmit}
              contratoPartial={contratoEditado}
              informacion={informacion}
              handleTab={handleRegresarTab}
              nivEst={contratoEditado?.estudiante?.nivel_codigo}
            />
          </TabPanel>

          {/*--------------------------------PANEL 4--------------------------------------------------*/}

          <TabPanel>
            <FormEditGuia
              onSubmit={partialOnSubmit}
              contratoPartial={contratoEditado!}
              informacion={informacion!}
              handleTab={handleRegresarTab}
              nivEst={contratoEditado?.estudiante?.nivel_codigo}
            />
          </TabPanel>

          {/*--------------------------------PANEL 5--------------------------------------------------*/}

          <TabPanel>
            <FormEditPension
              onSubmit={onSubmit}
              contratoPartial={contratoEditado!}
              informacion={informacion!}
              handleTab={handleRegresarTab}
              nivEst={contratoEditado?.estudiante?.nivel_codigo}
            />
          </TabPanel>
        </Tabs>
      </ModalBody>
    </Modal>
  );
};

export default EditarContrato;
