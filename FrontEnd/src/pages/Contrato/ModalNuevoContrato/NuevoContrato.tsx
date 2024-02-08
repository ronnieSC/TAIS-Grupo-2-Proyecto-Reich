import { useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "./NuevoContrato.css"; // Importa el archivo de estilos personalizados
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import {
  ContratoGuardado,
  informacionNuevoContrato,
  contrato_default,
} from "../../../utilities/ContratoTipos";
import { useLoaderData, useSubmit } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import "react-datepicker/dist/react-datepicker-cssmodules.css";
import FormEstudiante from "./Formularios/FormEstudiante";
import FormApoderado from "./Formularios/FormApoderado";
import FormMatricula from "./Formularios/FormMatricula";
import FormGuia from "./Formularios/FormGuia";
import FormPension from "./Formularios/FormPensión";

type Entry = [string, any];
type Entries = Entry[];

const NuevoContrato = () => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const informacion = useLoaderData() as informacionNuevoContrato;
  const handleRegresarTab = () => setActiveTab(activeTab - 1);
  let submit = useSubmit();

  const [contratoNuevo, setContratoNuevo] =
    useState<ContratoGuardado>(contrato_default);

  const partialOnSubmit = (data: Partial<ContratoGuardado>) => {
    setContratoNuevo({
      ...contratoNuevo,
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

  function removeEmpties(values: object | any): object | any {
    if (typeof values !== "object") return values;

    const filteredEntries = Object.entries(values)
      .map(([key, value]) => {
        const validatedValue = removeEmpties(value);
        if (
          typeof validatedValue !== "object" &&
          validatedValue !== undefined &&
          validatedValue !== ""
        ) {
          return [key, validatedValue];
        } else if (
          typeof validatedValue === "object" &&
          validatedValue !== undefined &&
          validatedValue !== "" &&
          validatedValue !== null &&
          Object.keys(validatedValue).length !== 0
        ) {
          return [key, validatedValue];
        }
        return undefined;
      })
      .filter(Boolean) as [string, any][];

    return fromEntriesRecursivas(filteredEntries);
  }

  const onSubmit = (data: Partial<ContratoGuardado>) => {
    const value = {
      ...data,
      documentos: informacion?.documentos?.map(({ id }) => ({
        id: id,
        entregado: data!.documentos!!.includes(String(id)),
      })),
    };
    const validatedValue = removeEmpties(value);
    submit(
      { values: JSON.stringify(validatedValue) },
      {
        action: "/contrato",
        method: "post",
      }
    );
  };

  return (
    <Modal isOpen={true} size="lg" centered>
      <ModalHeader className="modal-header-custom">
        <div className="d-flex justify-content-between align-items-center">
          <h6 className="mb-0" style={{ fontWeight: "bold" }}>
            NUEVO CONTRATO
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

          {/*--------------------------------PANEL ESTUDIANTE--------------------------------------------------*/}

          <TabPanel>
            <FormEstudiante
              onSubmit={partialOnSubmit}
              contratoPartial={contratoNuevo}
              informacion={informacion}
            />
          </TabPanel>

          {/*--------------------------------PANEL APODERADO--------------------------------------------------*/}

          <TabPanel>
            <FormApoderado
              onSubmit={partialOnSubmit}
              contratoPartial={contratoNuevo}
              informacion={informacion}
              handleTab={handleRegresarTab}
            />
          </TabPanel>

          {/*--------------------------------PANEL MATRÍCULA--------------------------------------------------*/}

          <TabPanel>
            <FormMatricula
              onSubmit={partialOnSubmit}
              contratoPartial={contratoNuevo}
              informacion={informacion}
              handleTab={handleRegresarTab}
              nivEst={contratoNuevo?.estudiante?.nivel_codigo}
            />
          </TabPanel>

          {/*--------------------------------PANEL GUÍAS--------------------------------------------------*/}

          <TabPanel>
            <FormGuia
              onSubmit={partialOnSubmit}
              contratoPartial={contratoNuevo}
              informacion={informacion}
              handleTab={handleRegresarTab}
              nivEst={contratoNuevo?.estudiante?.nivel_codigo}
            />
          </TabPanel>

          {/*--------------------------------PANEL PENSIÓN-------------------------------------------------*/}

          <TabPanel>
            <FormPension
              onSubmit={onSubmit}
              contratoPartial={contratoNuevo}
              informacion={informacion}
              handleTab={handleRegresarTab}
              nivEst={contratoNuevo?.estudiante?.nivel_codigo}
            />
          </TabPanel>
        </Tabs>
      </ModalBody>
    </Modal>
  );
};

export default NuevoContrato;
