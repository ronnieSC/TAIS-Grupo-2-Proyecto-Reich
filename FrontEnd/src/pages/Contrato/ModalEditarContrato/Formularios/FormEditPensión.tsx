import { useState, useEffect } from "react";
import { Form, Row, Col, Button, Table } from "react-bootstrap";
import DatePicker from "react-datepicker";
import {
  AcuerdoPensionEdit,
  ContratoEntidad,
  Precio,
  Razon,
  informacionNuevoContrato,
} from "../../../../utilities/ContratoTipos";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { parseDateToString } from "../../../../utilities/utils";

const FormEditPension = ({
  onSubmit,
  contratoPartial,
  informacion,
  nivEst,
  handleTab,
}: {
  handleTab: () => void;
  nivEst: number;
  informacion: informacionNuevoContrato;
  contratoPartial: ContratoEntidad;
  onSubmit: SubmitHandler<{
    pension: AcuerdoPensionEdit;
    responsable_informacion: number;
  }>;
}) => {
  const annoActual =
    informacion?.annos_academicos?.find(
      (annos) => annos.AnoAcaNum == new Date().getFullYear().toString()
    )?.id ?? -1;

  const [pensionesPasadas, setPensionesPasadas] = useState<Precio[]>([]);
  const [monAntPen, setMonAntPen] = useState<number>(0);
  const [monPacPen, setMonPacPen] = useState(0);

  const [fecPagPen, setFecPagPen] = useState<Date>(
    contratoPartial.pension.fecha_pagos != ""
      ? new Date(contratoPartial.pension.fecha_pagos)
      : new Date()
  );

  const pagoRazonPension =
    informacion?.razones.find(
      (razon) => razon.razon.toUpperCase() == "PENSIÓN"
    ) ?? ({} as Razon);

  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    setValue,
    setError,
    clearErrors,
    control,
    formState: { errors },
  } = useForm<ContratoEntidad>({
    defaultValues: contratoPartial,
  });

  useEffect(() => {
    setPensionesPasadas(
      informacion?.precios?.filter((precio) => {
        return (
          precio.razon_codigo == pagoRazonPension?.id &&
          precio.nivel_codigo == nivEst
        );
      })
    );
  }, [nivEst]);

  useEffect(() => {
    const tmp =
      pensionesPasadas?.find((pension) => pension.ano_codigo == annoActual)
        ?.monto ?? -1;
    setMonAntPen(tmp);
  }, [pensionesPasadas]);

  useEffect(() => {
    if (monAntPen < 0) {
      setError("pension.monto_pactado", {
        type: "custom",
        message: "*se necesita un valor para este campo",
      });
    } else {
      clearErrors(),
        setMonPacPen(monAntPen - contratoPartial?.pension?.descuento);
      setValue(
        "pension.monto_pactado",
        monAntPen - contratoPartial?.pension?.descuento
      );
    }
  }, [monAntPen]);

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Row className="mb-3 mt-3">
        <Col>
          <Form.Label
            className="label-with-margin1"
            style={{ fontWeight: "bold" }}
          >
            PRECIOS DE LA PENSIÓN AÑO(S) PASADO(S):
          </Form.Label>
          <Table className="matricula-table" bordered responsive striped>
            <tbody>
              <tr>
                <th>Año</th>
                <th>Precio</th>
              </tr>
              {pensionesPasadas?.length > 0 ? (
                pensionesPasadas?.map((pension, index) => (
                  <tr key={index}>
                    <td>
                      {
                        informacion?.annos_academicos.find(
                          (anno) => anno.id == pension.ano_codigo
                        )?.AnoAcaNum
                      }
                    </td>
                    <td>S/. {pension.monto}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={2}>No hay registros</td>
                </tr>
              )}
            </tbody>
          </Table>
        </Col>
        <Col>
          <Form.Group as={Row}>
            <Form.Label className="label-with-margin" htmlFor="_conPenPreAct">
              PENSIÓN - PRECIO AÑO ACTUAL:
            </Form.Label>
            <Form.Label
              style={{ textAlign: "right", fontSize: "30px" }}
              id="_conPenPreAct"
            >
              {monAntPen == -1 ? "No hay registro" : "S/. " + monAntPen}
            </Form.Label>
            <hr className="divider" />
          </Form.Group>

          <Form.Group as={Row} controlId="_conPenDes">
            <Form.Label column lg="5" className="label-with-margin">
              DESCUENTO:
            </Form.Label>
            <Col lg="7" className="input-with-icon">
              <span className="currency-symbol">S/. </span>
              <Form.Control
                type="number"
                size="sm"
                {...register("pension.descuento", {
                  onChange: (e) => {
                    if (monAntPen >= 0) {
                      const tmp =
                        e.target.value !== "" ? parseFloat(e.target.value) : 0;
                      setValue("pension.descuento", tmp, { shouldDirty: true });
                      setValue("pension.monto_pactado", monAntPen - tmp, {
                        shouldDirty: true,
                      });
                      setMonPacPen(monAntPen - tmp);
                    }
                  },
                  required: "*Requerido",
                  pattern: {
                    value: /[0-9]/,
                    message: "*Debe contener solo números",
                  },
                })}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row}>
            <Form.Label
              column
              lg="6"
              className="label-with-margin"
              htmlFor="_conPenPrePac"
            >
              PENSIÓN - PRECIO PACTADO:
            </Form.Label>
            <Form.Label
              column
              style={{ textAlign: "right", fontSize: "30px" }}
              id="_conPenPrePac"
            >
              {monAntPen == 0 ? "No es posible obtener" : "S/. " + monPacPen}
            </Form.Label>
            {errors.pension?.monto_pactado && (
              <Form.Text style={{ color: "crimson" }}>
                {errors.pension?.monto_pactado?.message}
              </Form.Text>
            )}

            <hr className="divider" />
          </Form.Group>
        </Col>
      </Row>

      <Form.Group as={Row} className="mb-3" controlId="_conPenFecPag">
        <Form.Label column lg="4" style={{ fontWeight: "bold" }}>
          FECHA DE PAGOS:
        </Form.Label>
        <Col>
          <Controller
            name="pension.fecha_pagos"
            control={control}
            render={({ field }) => (
              <DatePicker
                className="form-control"
                wrapperClassName="pickers"
                id="_conPenFecPag"
                maxDate={new Date()}
                selected={fecPagPen}
                locale="es"
                dateFormat="dd/MM"
                onChange={(date) => {
                  setFecPagPen(date!);
                  field.onChange(parseDateToString(date!));
                }}
              />
            )}
            rules={{
              required: "*Requerido",
            }}
          />
          {errors.pension?.fecha_pagos && (
            <Form.Text style={{ color: "crimson" }}>
              {errors.pension?.fecha_pagos?.message}
            </Form.Text>
          )}
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3" controlId="_conPenRes">
        <Form.Label column lg="4" style={{ fontWeight: "bold" }}>
          RESPONSABLE DEL PACTO:
        </Form.Label>
        <Col>
          <Form.Select
            {...register("pension.responsable", { required: "*Requerido" })}
          >
            {informacion?.responsables?.map((opcion, index) => (
              <option key={index} value={opcion.id}>
                {opcion.primer_nombre}
                {opcion.segundo_nombre ? " " + opcion.segundo_nombre + " " : ""}
                {" " + opcion.apellido_paterno}
                {" " + opcion.apellido_materno}
              </option>
            ))}
          </Form.Select>
          {errors.pension?.responsable && (
            <Form.Text style={{ color: "crimson" }}>
              {errors.pension?.responsable?.message}
            </Form.Text>
          )}
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3" controlId="_conPenResInf">
        <Form.Label column lg="4" style={{ fontWeight: "bold" }}>
          RESPONSABLE DE LA INFORMACIÓN:
        </Form.Label>
        <Col>
          <Form.Select
            {...register("responsable_informacion", { required: "*Requerido" })}
          >
            {informacion?.responsables?.map((opcion, index) => (
              <option key={index} value={opcion.id}>
                {opcion.primer_nombre}
                {opcion.segundo_nombre ? " " + opcion.segundo_nombre + " " : ""}
                {" " + opcion.apellido_paterno}
                {" " + opcion.apellido_materno}
              </option>
            ))}
          </Form.Select>
          {errors.responsable_informacion && (
            <Form.Text style={{ color: "crimson" }}>
              {errors.responsable_informacion?.message}
            </Form.Text>
          )}
        </Col>
      </Form.Group>

      <Row>
        <Col>
          <Form.Group className="d-flex justify-content-start">
            <Form.Group className="BotonRegresar">
              <Button id="_conRegBtnSubT1" onClick={handleTab}>
                ANTERIOR
              </Button>
            </Form.Group>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="d-flex justify-content-end">
            <Form.Group className="BotonGuardar me-2">
              <Button id="_conEditBtnSubT1" type="submit">
                GUARDAR
              </Button>
            </Form.Group>

            <Form.Group className="BotonCancelar">
              <Button
                id="_conEditBtnCanT1"
                onClick={() =>
                  navigate(`/contrato`, {
                    replace: true,
                  })
                }
              >
                CANCELAR
              </Button>
            </Form.Group>
          </Form.Group>
        </Col>
      </Row>
    </Form>
  );
};

export default FormEditPension;
