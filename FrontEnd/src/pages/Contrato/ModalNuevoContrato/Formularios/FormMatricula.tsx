import { useState, useEffect } from "react";
import { Form, Row, Col, Button, Table } from "react-bootstrap";
import {
  AcuerdoMatricula,
  ContratoGuardado,
  Precio,
  Razon,
  informacionNuevoContrato,
} from "../../../../utilities/ContratoTipos";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const FormMatricula = ({
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
    matricula: AcuerdoMatricula;
    condicion: string;
  }>;
}) => {
  const annoActual =
    informacion?.annos_academicos?.find(
      (annos) => annos.AnoAcaNum == new Date().getFullYear().toString()
    )?.id ?? -1;

  const [matriculasPasadas, setMatriculasPasadas] = useState<Precio[]>([]);
  const [monAntMat, setMonAntMat] = useState<number>(0);
  const [monPacMat, setMonPacMat] = useState(0);

  const pagoRazonMatricula =
    informacion?.razones.find(
      (razon) => razon.razon.toUpperCase() == "MATRÍCULA"
    ) ?? ({} as Razon);

  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    setError,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm({
    defaultValues: contratoPartial,
  });

  useEffect(() => {
    setMatriculasPasadas(
      informacion?.precios?.filter((precio) => {
        return (
          precio.razon_codigo == pagoRazonMatricula?.id &&
          precio.nivel_codigo == nivEst
        );
      })
    );
  }, [nivEst]);

  useEffect(() => {
    const tmp =
      matriculasPasadas?.find((matricula) => matricula.ano_codigo == annoActual)
        ?.monto ?? -1;
    setMonAntMat(tmp);
  }, [matriculasPasadas]);

  useEffect(() => {
    if (monAntMat < 0) {
      setError("matricula.monto_pactado", {
        type: "custom",
        message: "*se necesita un valor para este campo",
      });
    } else {
      clearErrors()
      setMonPacMat(monAntMat - contratoPartial?.matricula?.descuento);
      setValue(
        "matricula.monto_pactado",
        monAntMat - contratoPartial?.matricula?.descuento
      );
    }
  }, [monAntMat]);

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Group as={Row} className="mt-3 mb-3" controlId="_conMatCon">
        <Form.Label column lg="3" style={{ fontWeight: "bold" }}>
          CONDICION:
        </Form.Label>
        <Col lg="9">
          <Form.Select {...register("condicion", { required: "*Requerido" })}>
            <option value="Nuevo">NUEVO</option>
            <option value="Antiguo">ANTIGUO</option>
          </Form.Select>
          {errors.condicion && (
            <Form.Text style={{ color: "crimson" }}>
              {errors.condicion?.message}
            </Form.Text>
          )}
        </Col>
      </Form.Group>

      <Row className="mb-3">
        <Col>
          <Form.Label
            className="label-with-margin1"
            style={{ fontWeight: "bold" }}
          >
            MATRÍCULA AÑO(S) PASADO(S):
          </Form.Label>
          <Table className="matricula-table" striped bordered responsive>
            <tbody>
              <tr>
                <th>Año</th>
                <th>Precio</th>
              </tr>
              {matriculasPasadas?.length > 0 ? (
                matriculasPasadas?.map((matricula, index) => (
                  <tr key={index}>
                    <td>
                      {
                        informacion?.annos_academicos.find(
                          (anno) => anno.id == matricula.ano_codigo
                        )?.AnoAcaNum
                      }
                    </td>
                    <td>S/. {matricula.monto}</td>
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
        <Col as={Col} className="mt-4">
          <Form.Group as={Row}>
            <Form.Label className="label-with-margin" htmlFor="_conMatPreAct">
              MATRÍCULA - PRECIO AÑO ACTUAL:
            </Form.Label>
            <Form.Label
              style={{ textAlign: "right", fontSize: "30px" }}
              id="_conMatPreAct"
            >
              {monAntMat == -1 ? "No hay registro" : "S/. " + monAntMat}
            </Form.Label>
            <hr className="divider" />
          </Form.Group>

          <Form.Group as={Row} controlId="_conMatDes">
            <Form.Label column lg="5" className="label-with-margin">
              DESCUENTO:
            </Form.Label>
            <Col lg="7" className="input-with-icon">
              <span className="currency-symbol">S/. </span>
              <Form.Control
                min={0}
                size="sm"
                type="number"
                {...register("matricula.descuento", {
                  onChange: (e) => {
                    if (monAntMat >= 0) {
                      const tmp =
                        e.target.value !== "" ? parseFloat(e.target.value) : 0;
                      setValue("matricula.descuento", tmp);
                      setValue("matricula.monto_pactado", monAntMat - tmp);
                      setMonPacMat(monAntMat - tmp);
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
            {errors.matricula?.descuento && (
              <Form.Text style={{ color: "crimson" }}>
                {errors.matricula?.descuento?.message}
              </Form.Text>
            )}
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label
              column
              lg="6"
              className="label-with-margin"
              htmlFor="_conMatPrePac"
            >
              MATRÍCULA - PRECIO PACTADO:
            </Form.Label>
            <Form.Label
              column
              style={{ textAlign: "right", fontSize: "30px" }}
              id="_conMatPrePac"
            >
              {monAntMat == 0 ? "No es posible obtener" : "S/. " + monPacMat}
            </Form.Label>
            {errors.matricula?.monto_pactado && (
              <Form.Text style={{ color: "crimson" }}>
                {errors.matricula?.monto_pactado?.message}
              </Form.Text>
            )}
            <hr className="divider" />
          </Form.Group>
        </Col>
      </Row>

      <Form.Group as={Row} className="mb-3" controlId="_conMatRes">
        <Form.Label column lg="4" style={{ fontWeight: "bold" }}>
          RESPONSABLE DEL PACTO:
        </Form.Label>
        <Col>
          <Form.Select
            {...register("matricula.responsable", { required: "*Requerido" })}
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
          {errors.matricula?.responsable && (
            <Form.Text style={{ color: "crimson" }}>
              {errors.matricula?.responsable?.message}
            </Form.Text>
          )}
        </Col>
      </Form.Group>

      <hr />

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

export default FormMatricula;
