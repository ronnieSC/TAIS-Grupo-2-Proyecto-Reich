import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import { Form, Row, Col } from "react-bootstrap";
import { Button } from "reactstrap";
import utils, { parseDateToString } from "../../../../utilities/utils";
import {
  ContratoEntidad,
  informacionNuevoContrato,
} from "../../../../utilities/ContratoTipos";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { District, Province, Region } from "ubigeos";
import { useNavigate } from "react-router-dom";
import { EstudianteEntidad } from "../../../../utilities/EstudianteTipos";

const FormEditEstudiante = ({
  onSubmit,
  contratoPartial,
  informacion,
}: {
  informacion: informacionNuevoContrato;
  contratoPartial: ContratoEntidad;
  onSubmit: SubmitHandler<{ estudiante: EstudianteEntidad }>;
}) => {
  const navigate = useNavigate();
  const [fecNacEst, setFecNacEst] = useState<Date>(
    contratoPartial.estudiante.fecha_nacimiento != ""
      ? new Date(contratoPartial.estudiante.fecha_nacimiento.replace(/-/g, "/"))
      : new Date()
  );

  const [docDep, setDocDep] = useState("00");
  const [docProv, setDocProv] = useState("0000");
  const [docDis, setDocDis] = useState("00");
  const [provincias, setProvincias] = useState<Province[]>();
  const [distritos, setDistritos] = useState<District[]>();

  useEffect(() => {
    let ubigeo_estudiante = contratoPartial?.estudiante?.ubigeo;
    if (ubigeo_estudiante.length !== 6) {
      ubigeo_estudiante = "010101";
    }

    setDocDep(ubigeo_estudiante.substring(0, 2));
    setDocProv(ubigeo_estudiante.substring(0, 4));
    setDocDis(ubigeo_estudiante);

    setProvincias(
      Region.instance(ubigeo_estudiante.substring(0, 2)).getProvincies()
    );
    setDistritos(
      Province.instance(ubigeo_estudiante.substring(0, 4)).getDistricts()
    );
  }, []);

  useEffect(() => {
    if (docDep != "00") {
      setProvincias(Region.instance(docDep).getProvincies());
    }
  }, [docDep]);

  useEffect(() => {
    if (docProv != "0000") {
      setDistritos(Province.instance(docProv).getDistricts());
    }
  }, [docProv]);

  const {
    handleSubmit,
    register,
    setValue,
    control,
    formState: { errors },
  } = useForm<ContratoEntidad>({
    defaultValues: contratoPartial,
  });

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Group as={Row} className="mt-3 mb-3">
        <Form.Label
          column
          lg="2"
          htmlFor="_conEstTipDoc"
          style={{ fontWeight: "bold" }}
        >
          DOCUMENTO:
        </Form.Label>
        <Col lg="2">
          <Form.Select
            id="_conEstTipDoc"
            {...register("estudiante.tipo_documento", {
              required: "*Requerido",
            })}
          >
            {informacion?.tipo_doc?.map((opcion, index) => (
              <option key={index} value={opcion.id}>
                {opcion.TipDocDesCor}
              </option>
            ))}
          </Form.Select>
          {errors.estudiante?.tipo_documento && (
            <Form.Text style={{ color: "crimson" }}>
              {errors.estudiante?.tipo_documento?.message}
            </Form.Text>
          )}
        </Col>
        <Col lg="8">
          <Form.Control
            id="_conEstDoc"
            placeholder="INGRESE DOCUMENTO"
            {...register("estudiante.documento", {
              required: "*Requerido",
              minLength: { value: 8, message: "*Deben ser 8 números" },
              maxLength: { value: 8, message: "*Deben ser 8 números" },
              pattern: {
                value: /[0-9]{8}/,
                message: "*Debe contener solo números",
              },
            })}
          />
          {errors.estudiante?.documento && (
            <Form.Text style={{ color: "crimson" }}>
              {errors.estudiante.documento?.message}
            </Form.Text>
          )}
        </Col>
      </Form.Group>

      <Form.Group className="mb-3" as={Row}>
        <Form.Label
          lg="2"
          column
          htmlFor="_conEstPriNom"
          style={{ fontWeight: "bold" }}
        >
          NOMBRES:
        </Form.Label>
        <Col lg="5">
          <Form.Control
            id="_conEstPriNom"
            placeholder="PRIMER NOMBRE"
            {...register("estudiante.primer_nombre", {
              required: "*Requerido",
              pattern: {
                value: /^[a-zA-ZñÑ]+$/,
                message: "*Solo debe contener letras",
              },
            })}
          />
          {errors.estudiante?.primer_nombre && (
            <Form.Text style={{ color: "crimson" }}>
              {errors.estudiante.primer_nombre?.message}
            </Form.Text>
          )}
        </Col>
        <Col lg="5">
          <Form.Control
            id="_conEstSegNom"
            placeholder="SEGUNDO NOMBRE"
            {...register("estudiante.segundo_nombre")}
          />
          {errors.estudiante?.segundo_nombre && (
            <Form.Text style={{ color: "crimson" }}>
              {errors.estudiante.segundo_nombre?.message}
            </Form.Text>
          )}
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3">
        <Form.Label
          column
          lg={2}
          htmlFor="_conEstApePat"
          style={{ fontWeight: "bold" }}
        >
          APELLIDOS:
        </Form.Label>
        <Col lg="5">
          <Form.Control
            id="_conEstApePat"
            placeholder="APELLIDO PATERNO"
            {...register("estudiante.apellido_paterno", {
              required: "*Requerido",
              pattern: {
                value: /^[a-zA-ZñÑ]+$/,
                message: "*Solo debe contener letras",
              },
            })}
          />
          {errors.estudiante?.apellido_paterno && (
            <Form.Text style={{ color: "crimson" }}>
              {errors.estudiante.apellido_paterno?.message}
            </Form.Text>
          )}
        </Col>
        <Col lg="5">
          <Form.Control
            id="_conEstApeMat"
            placeholder="APELLIDO MATERNO"
            {...register("estudiante.apellido_materno", {
              required: "*Requerido",
              pattern: {
                value: /^[a-zA-ZñÑ]+$/,
                message: "*Solo debe contener letras",
              },
            })}
          />
          {errors.estudiante?.apellido_materno && (
            <Form.Text style={{ color: "crimson" }}>
              {errors.estudiante.apellido_materno?.message}
            </Form.Text>
          )}
        </Col>
      </Form.Group>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="_conEstNiv">
          <Form.Label style={{ fontWeight: "bold" }}>NIVEL:</Form.Label>
          <Form.Select
            {...register("estudiante.nivel_codigo", {
              required: "*Requerido",
            })}
          >
            {informacion?.niveles?.map((opcion, index) => (
              <option key={index} value={opcion.id}>
                {opcion.nivel.toUpperCase()}
              </option>
            ))}
          </Form.Select>
          {errors.estudiante?.nivel_codigo && (
            <Form.Text style={{ color: "crimson" }}>
              {errors.estudiante?.nivel_codigo?.message}
            </Form.Text>
          )}
        </Form.Group>

        <Form.Group as={Col} controlId="_conEstGra">
          <Form.Label style={{ fontWeight: "bold" }}>GRADO:</Form.Label>
          <Form.Select
            {...register("estudiante.grado_codigo", {
              required: "*Requerido",
            })}
          >
            {informacion?.grados?.map((opcion, index) => (
              <option key={index} value={opcion.id}>
                {opcion.grado + " - GRADO"}
              </option>
            ))}
          </Form.Select>
          {errors.estudiante?.grado_codigo && (
            <Form.Text style={{ color: "crimson" }}>
              {errors.estudiante?.grado_codigo?.message}
            </Form.Text>
          )}
        </Form.Group>

        <Form.Group as={Col} controlId="_conEstFecNac">
          <Form.Label style={{ fontWeight: "bold" }}>
            FECHA DE NACIMIENTO
          </Form.Label>

          <Controller
            name="estudiante.fecha_nacimiento"
            control={control}
            render={({ field }) => (
              <DatePicker
                className="form-control"
                wrapperClassName="pickers"
                id="_conEstFecNac"
                maxDate={new Date()}
                selected={fecNacEst}
                locale="es"
                dateFormat="dd/MM/yyyy"
                onChange={(date) => {
                  setFecNacEst(date!);
                  field.onChange(parseDateToString(date!));
                }}
              />
            )}
            rules={{
              required: "*Requerido",
            }}
          />

          {errors.estudiante?.fecha_nacimiento && (
            <Form.Text style={{ color: "crimson" }}>
              {errors.estudiante.fecha_nacimiento?.message}
            </Form.Text>
          )}
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="_docDep">
          <Form.Label style={{ fontWeight: "bold" }}>DEPARTAMENTO:</Form.Label>
          <Form.Select
            size="sm"
            value={docDep}
            onChange={({ target }) => {
              setDocDep(target.value);
              setValue("estudiante.ubigeo", target.value, {
                shouldDirty: true,
              });
            }}
          >
            <option key="00" value="00">
              SELECCIONA
            </option>
            {utils.departamentos.map((dep) => (
              <option key={dep.codigo} value={dep.codigo}>
                {dep.nombre}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        <Form.Group as={Col} controlId="_docPro">
          <Form.Label style={{ fontWeight: "bold" }}>PROVINCIA:</Form.Label>
          <Form.Select
            size="sm"
            value={docProv}
            onChange={({ target }) => {
              setDocProv(target.value);
              setValue("estudiante.ubigeo", target.value, {
                shouldDirty: true,
              });
            }}
          >
            <option key="0000" value="0000">
              SELECCIONA
            </option>
            {provincias?.map((prov, index) => (
              <option key={index} value={prov.getCode()}>
                {prov.getName()}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group as={Col} controlId="_docDis">
          <Form.Label style={{ fontWeight: "bold" }}>DISTRITO:</Form.Label>
          <Form.Select
            size="sm"
            value={docDis}
            onChange={({ target }) => {
              setDocDis(target.value);
              setValue("estudiante.ubigeo", target.value, {
                shouldDirty: true,
              });
            }}
          >
            <option key="00" value="0000">
              SELECCIONA
            </option>
            {distritos?.map((dist, index) => (
              <option key={index} value={dist.getCode()}>
                {dist.getName()}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} lg="8" controlId="_conEstDir">
          <Form.Label style={{ fontWeight: "bold" }}>DIRECCIÓN:</Form.Label>

          <Form.Control
            placeholder="INGRESE LA DIRECCIÓN"
            {...register("estudiante.direccion")}
          />
          {errors.estudiante?.direccion && (
            <Form.Text style={{ color: "crimson" }}>
              {errors.estudiante.direccion?.message}
            </Form.Text>
          )}
        </Form.Group>

        <Form.Group as={Col} lg="4" controlId="_conEstUbi">
          <Form.Label style={{ fontWeight: "bold" }}>UBIGEO:</Form.Label>
          <Form.Control
            readOnly
            placeholder="UBIGEO"
            {...register("estudiante.ubigeo", {
              required: "*Requerido",
              minLength: { value: 6, message: "*Deben ser 6 cifras" },
              maxLength: { value: 6, message: "*Deben ser 6 cifras" },
            })}
          />
          {errors.estudiante?.ubigeo && (
            <Form.Text style={{ color: "crimson" }}>
              {errors.estudiante.ubigeo?.message}
            </Form.Text>
          )}
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="_conEstCol">
          <Form.Label style={{ fontWeight: "bold" }}>COLEGIO:</Form.Label>
          <Form.Control
            placeholder="COLEGIO DE PROCEDENCIA"
            {...register("estudiante.colegio_procedencia")}
          />
          {errors.estudiante?.colegio_procedencia && (
            <Form.Text style={{ color: "crimson" }}>
              {errors.estudiante.colegio_procedencia?.message}
            </Form.Text>
          )}
        </Form.Group>
        <Form.Group as={Col} controlId="_conEstDes">
          <Form.Label style={{ fontWeight: "bold" }}>DESTREZA:</Form.Label>
          <Form.Control
            as="textarea"
            placeholder="DESTREZA"
            {...register("estudiante.destreza")}
          />
          {errors.estudiante?.destreza && (
            <Form.Text style={{ color: "crimson" }}>
              {errors.estudiante.destreza?.message}
            </Form.Text>
          )}
        </Form.Group>
      </Row>

      <hr />

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
    </Form>
  );
};

export default FormEditEstudiante;
