import { useState, useEffect } from "react";
import { Form, Row, Col, Button, Table } from "react-bootstrap";
import {
  AcuerdoGuias,
  ContratoGuardado,
  Precio,
  Razon,
  informacionNuevoContrato,
} from "../../../../utilities/ContratoTipos";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const FormGuia = ({
  onSubmit,
  contratoPartial,
  informacion,
  nivEst,
  handleTab,
}: {
  handleTab: () => void;
  nivEst: number;
  informacion: informacionNuevoContrato;
  contratoPartial: ContratoGuardado;
  onSubmit: SubmitHandler<{
    guia: AcuerdoGuias;
  }>;
}) => {
  const navigate = useNavigate();
  const annoActual =
    informacion?.annos_academicos?.find(
      (annos) => annos.AnoAcaNum == new Date().getFullYear().toString()
    )?.id ?? -1;

  const [guiasPasadas, setGuiasPasadas] = useState<Precio[]>([]);
  const [monAntGui, setMonAntGui] = useState<number>(0);
  const [monPacGui, setMonPacGui] = useState(0);

  const pagoRazonGuia =
    informacion?.razones.find((razon) => razon.razon.toUpperCase() == "GUÍA") ??
    ({} as Razon);

  const {
    handleSubmit,
    register,
    setValue,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm({
    defaultValues: contratoPartial,
  });

  useEffect(() => {
    setGuiasPasadas(
      informacion?.precios?.filter((precio) => {
        return (
          precio.razon_codigo == pagoRazonGuia?.id &&
          precio.nivel_codigo == nivEst
        );
      })
    );
  }, [nivEst]);

  useEffect(() => {
    const tmp =
      guiasPasadas?.find((guia) => guia.ano_codigo == annoActual)?.monto ?? -1;
    setMonAntGui(tmp);
  }, [guiasPasadas]);

  useEffect(() => {
    if (monAntGui < 0) {
      setError("guia.monto_pactado", {
        type: "custom",
        message: "*se necesita un valor para este campo",
      });
    } else {
      clearErrors()
      setMonPacGui(monAntGui - contratoPartial?.guia?.descuento);
      setValue(
        "guia.monto_pactado",
        monAntGui - contratoPartial?.guia?.descuento
      );
    }
  }, [monAntGui]);

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Row className="mb-3 mt-3">
        <Col>
          <Form.Label
            className="label-with-margin1"
            style={{ fontWeight: "bold" }}
          >
            PRECIOS DE GUIAS AÑO(S) PASADO(S):
          </Form.Label>
          <Table className="matricula-table" striped bordered responsive>
            <tbody>
              <tr>
                <th>Año</th>
                <th>Precio</th>
              </tr>
              {guiasPasadas?.length > 0 ? (
                guiasPasadas?.map((guia, index) => (
                  <tr key={index}>
                    <td>
                      {
                        informacion?.annos_academicos.find(
                          (anno) => anno.id == guia.ano_codigo
                        )?.AnoAcaNum
                      }
                    </td>
                    <td>S/. {guia.monto}</td>
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

        <Col className="mt-4">
          <Form.Group as={Row}>
            <Form.Label className="label-with-margin" htmlFor="_conGuiPreAct">
              GUÍAS - PRECIO AÑO ACTUAL
            </Form.Label>
            <Form.Label
              style={{ textAlign: "right", fontSize: "30px" }}
              id="_conGuiPreAct"
            >
              {monAntGui == -1 ? "No hay registro" : "S/. " + monAntGui}
            </Form.Label>
            <hr className="divider" />
          </Form.Group>

          <Form.Group as={Row} controlId="_conGuiDes">
            <Form.Label column lg="5" className="label-with-margin">
              DESCUENTO:
            </Form.Label>
            <Col lg="7" className="input-with-icon">
              <span className="currency-symbol">S/. </span>
              <Form.Control
                type="number"
                size="sm"
                {...register("guia.descuento", {
                  onChange: (e) => {
                    if (monAntGui >= 0) {
                      const tmp =
                        e.target.value !== "" ? parseFloat(e.target.value) : 0;
                      setValue("guia.descuento", tmp);
                      setValue("guia.monto_pactado", monAntGui - tmp);
                      setMonPacGui(monAntGui - tmp);
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
              htmlFor="_conGuiPrePac"
            >
              GUÍAS - PRECIO PACTADO:
            </Form.Label>
            <Form.Label
              column
              style={{ textAlign: "right", fontSize: "30px" }}
              id="_conGuiPrePac"
            >
              {monAntGui == 0 ? "No es posible obtener" : "S/. " + monPacGui}
            </Form.Label>
            {errors.guia?.descuento && (
              <Form.Text style={{ color: "crimson" }}>
                {errors.guia?.descuento?.message}
              </Form.Text>
            )}
            <hr className="divider" />
          </Form.Group>
        </Col>
      </Row>

      <Form.Group as={Row} className="mb-3" controlId="_conGuiRes">
        <Form.Label column lg="4" style={{ fontWeight: "bold" }}>
          RESPONSABLE DEL PACTO:
        </Form.Label>
        <Col>
          <Form.Select
            {...register("guia.responsable", { required: "*Requerido" })}
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
          {errors.guia?.responsable && (
            <Form.Text style={{ color: "crimson" }}>
              {errors.guia?.responsable?.message}
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
                SIGUIENTE
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

export default FormGuia;
