import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import { Form, Row, Col } from "react-bootstrap";
import { Button } from "reactstrap";
import utils, { parseDateToString } from "../../../../utilities/utils";
import {
  ApoderadoGuardado,
  ContratoGuardado,
  informacionNuevoContrato,
} from "../../../../utilities/ContratoTipos";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { District, Province, Region } from "ubigeos";
import { useNavigate } from "react-router-dom";

const FormApoderado = ({
  onSubmit,
  contratoPartial,
  informacion,
  handleTab,
}: {
  handleTab: () => void;
  informacion: informacionNuevoContrato;
  contratoPartial: ContratoGuardado;
  onSubmit: SubmitHandler<{
    documentos: string[];
    firma_contrato: boolean;
    parentescos: {
      parentesco: string;
      apoderado: ApoderadoGuardado;
    }[];
  }>;
}) => {
  const [fecNacApo, setFecNacApo] = useState(new Date());

  const [docDep, setDocDep] = useState("00");
  const [docProv, setDocProv] = useState("0000");
  const [docDis, setDocDis] = useState("00");
  const [provincias, setProvincias] = useState<Province[]>();
  const [distritos, setDistritos] = useState<District[]>();

  useEffect(() => {
    if (contratoPartial?.parentescos?.[0]?.apoderado?.ubigeo != "") {
      setDocDep(
        contratoPartial?.parentescos?.[0]?.apoderado?.ubigeo.substring(0, 2)
      );
      setDocProv(
        contratoPartial?.parentescos?.[0]?.apoderado?.ubigeo.substring(0, 4)
      );
      setDocDis(contratoPartial?.parentescos?.[0]?.apoderado?.ubigeo);

      setProvincias(
        Region.instance(
          contratoPartial?.estudiante.ubigeo.substring(0, 2)
        ).getProvincies()
      );
      setDistritos(
        Province.instance(
          contratoPartial?.estudiante.ubigeo.substring(0, 4)
        ).getDistricts()
      );
    }
  }, []);

  useEffect(() => {
    if (docDep != "00") {
      setProvincias(Region.instance(docDep).getProvincies());
      setDocDis("");
    }
  }, [docDep]);

  useEffect(() => {
    if (docProv != "0000") {
      setDistritos(Province.instance(docProv).getDistricts());
    }
  }, [docProv]);

  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    setValue,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: contratoPartial,
  });
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Group as={Row} className="mt-3 mb-3" controlId="_conApoPar">
        <Form.Label lg="2" column style={{ fontWeight: "bold" }}>
          PARENTESCO:
        </Form.Label>
        <Col lg="10">
          <Form.Control
            placeholder="CUAL ES EL PARENTESCO"
            {...register("parentescos.0.parentesco", {
              required: "*Requerido",
            })}
          />
          {errors.parentescos?.[0]?.parentesco && (
            <Form.Text style={{ color: "crimson" }}>
              {errors.parentescos?.[0]?.parentesco?.message}
            </Form.Text>
          )}
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3">
        <Form.Label
          column
          lg="2"
          htmlFor="_conApoTipDoc"
          style={{ fontWeight: "bold" }}
        >
          DOCUMENTO:
        </Form.Label>
        <Col lg="2">
          <Form.Select
            id="_conApoTipDoc"
            {...register("parentescos.0.apoderado.tipo_documento", {
              required: "*Requerido",
            })}
          >
            {informacion?.tipo_doc?.map((opcion, index) => (
              <option key={index} value={opcion.id}>
                {opcion.TipDocDesCor}
              </option>
            ))}
          </Form.Select>
          {errors.parentescos?.[0]?.apoderado?.tipo_documento && (
            <Form.Text style={{ color: "crimson" }}>
              {errors.parentescos?.[0]?.apoderado?.tipo_documento?.message}
            </Form.Text>
          )}
        </Col>
        <Col lg="8">
          <Form.Control
            id="_conApoDoc"
            placeholder="INGRESE DOCUMENTO"
            {...register("parentescos.0.apoderado.documento", {
              required: "*Requerido",
              minLength: { value: 8, message: "*Deben ser 8 números" },
              maxLength: { value: 8, message: "*Deben ser 8 números" },
              pattern: {
                value: /[0-9]{8}/,
                message: "*Debe contener solo números",
              },
            })}
          />
          {errors.parentescos?.[0]?.apoderado?.documento && (
            <Form.Text style={{ color: "crimson" }}>
              {errors.parentescos?.[0]?.apoderado?.documento?.message}
            </Form.Text>
          )}
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3">
        <Form.Label
          lg="2"
          column
          htmlFor="_conApoPriNom"
          style={{ fontWeight: "bold" }}
        >
          NOMBRES:
        </Form.Label>
        <Col lg="5">
          <Form.Control
            id="_conApoPriNom"
            placeholder="PRIMER NOMBRE"
            {...register("parentescos.0.apoderado.primer_nombre", {
              required: "*Requerido",
              pattern: {
                value: /^[a-zA-ZñÑ]+$/,
                message: "*Solo debe contener letras",
              },
            })}
          />
          {errors.parentescos?.[0]?.apoderado?.primer_nombre && (
            <Form.Text style={{ color: "crimson" }}>
              {errors.parentescos?.[0]?.apoderado?.primer_nombre?.message}
            </Form.Text>
          )}
        </Col>
        <Col lg="5">
          <Form.Control
            id="_conApoSegNom"
            placeholder="SEGUNDO NOMBRE"
            {...register("parentescos.0.apoderado.segundo_nombre", {
              pattern: {
                value: /^[a-zA-ZñÑ]+$/,
                message: "*Solo debe contener letras",
              },
            })}
          />
          {errors.parentescos?.[0]?.apoderado?.segundo_nombre && (
            <Form.Text style={{ color: "crimson" }}>
              {errors.parentescos?.[0]?.apoderado?.segundo_nombre?.message}
            </Form.Text>
          )}
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3">
        <Form.Label
          column
          lg="2"
          htmlFor="_conApoApePat"
          style={{ fontWeight: "bold" }}
        >
          APELLIDOS:
        </Form.Label>
        <Col lg="5">
          <Form.Control
            id="_conApoApePat"
            placeholder="APELLIDO PATERNO"
            {...register("parentescos.0.apoderado.apellido_paterno", {
              required: "*Requerido",
              pattern: {
                value: /^[a-zA-ZñÑ]+$/,
                message: "*Solo debe contener letras",
              },
            })}
          />
          {errors.parentescos?.[0]?.apoderado?.apellido_paterno && (
            <Form.Text style={{ color: "crimson" }}>
              {errors.parentescos?.[0]?.apoderado?.apellido_paterno?.message}
            </Form.Text>
          )}
        </Col>
        <Col lg="5">
          <Form.Control
            id="_conApoApeMat"
            placeholder="APELLIDO MATERNO"
            {...register("parentescos.0.apoderado.apellido_materno", {
              required: "*Requerido",
              pattern: {
                value: /^[a-zA-ZñÑ]+$/,
                message: "*Solo debe contener letras",
              },
            })}
          />
          {errors.parentescos?.[0]?.apoderado?.apellido_materno && (
            <Form.Text style={{ color: "crimson" }}>
              {errors.parentescos?.[0]?.apoderado?.apellido_materno?.message}
            </Form.Text>
          )}
        </Col>
      </Form.Group>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="_docDep">
          <Form.Label style={{ fontWeight: "bold" }}>DEPARTAMENTO:</Form.Label>
          <Form.Select
            size="sm"
            value={docDep}
            onChange={({ target }) => {
              setDocDep(target.value);
              setValue("parentescos.0.apoderado.ubigeo", target.value);
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
              setValue("parentescos.0.apoderado.ubigeo", target.value);
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
              setValue("parentescos.0.apoderado.ubigeo", target.value);
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
        <Form.Group as={Col} controlId="_conApoDir">
          <Form.Label style={{ fontWeight: "bold" }}>DIRECCIÓN:</Form.Label>

          <Form.Control
            placeholder="INGRESE LA DIRECCIÓN"
            {...register("parentescos.0.apoderado.direccion", {
              required: "*Requerido",
            })}
          />
          {errors.parentescos?.[0]?.apoderado?.direccion && (
            <Form.Text style={{ color: "crimson" }}>
              {errors.parentescos?.[0]?.apoderado?.direccion?.message}
            </Form.Text>
          )}
        </Form.Group>
        <Form.Group as={Col} controlId="_conApoUbi">
          <Form.Label style={{ fontWeight: "bold" }}>UBIGEO:</Form.Label>
          <Form.Control
            readOnly
            placeholder="UBIGEO"
            {...register("parentescos.0.apoderado.ubigeo", {
              required: "*Requerido",
              minLength: { value: 6, message: "*Deben ser 6 cifras" },
              maxLength: { value: 6, message: "*Deben ser 6 cifras" },
            })}
          />
          {errors.parentescos?.[0]?.apoderado?.ubigeo && (
            <Form.Text style={{ color: "crimson" }}>
              {errors.parentescos?.[0]?.apoderado?.ubigeo?.message}
            </Form.Text>
          )}
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="_conApoTel">
          <Form.Label style={{ fontWeight: "bold" }}>TELÉFONO:</Form.Label>

          <Form.Control
            placeholder="INGRESE EL TELEFONO"
            {...register("parentescos.0.apoderado.telefono", {
              required: "*Requerido",
              pattern: {
                value: /[0-9]/,
                message: "*Debe contener solo números",
              },
            })}
          />
          {errors.parentescos?.[0]?.apoderado?.telefono && (
            <Form.Text style={{ color: "crimson" }}>
              {errors.parentescos?.[0]?.apoderado?.telefono?.message}
            </Form.Text>
          )}
        </Form.Group>

        <Form.Group as={Col} controlId="_conApoFecNac">
          <Form.Label style={{ fontWeight: "bold" }}>
            FECHA DE NACIMIENTO:
          </Form.Label>

          <Controller
            name="parentescos.0.apoderado.fecha_nacimiento"
            control={control}
            render={({ field }) => (
              <DatePicker
                className="form-control"
                wrapperClassName="pickers"
                id="_conApoFecNac"
                maxDate={new Date()}
                selected={fecNacApo}
                locale="es"
                dateFormat="dd/MM/yyyy"
                onChange={(date) => {
                  setFecNacApo(date!);
                  field.onChange(parseDateToString(date!));
                }}
              />
            )}
            rules={{
              required: "*Requerido",
            }}
          />
          {errors.parentescos?.[0]?.apoderado?.fecha_nacimiento && (
            <Form.Text style={{ color: "crimson" }}>
              {errors.parentescos?.[0]?.apoderado?.fecha_nacimiento.message}
            </Form.Text>
          )}
        </Form.Group>
      </Row>

      <Form.Group as={Row}>
        <Form.Label as={Col} style={{ fontWeight: "bold" }}>
          ¿FIRMÓ CONTRATO?
        </Form.Label>

        <Col>
          <div key="inline-radio">
            <Form.Check
              inline
              id="_conApoFirSi"
              label="SÍ"
              type="radio"
              value="true"
              {...register("firma_contrato", { required: "*Requerido" })}
            />
            <Form.Check
              inline
              id="_conApoFirNo"
              label="NO"
              type="radio"
              value="false"
              {...register("firma_contrato", { required: "*Requerido" })}
            />
          </div>
          {errors.firma_contrato && (
            <Form.Text style={{ color: "crimson" }}>
              {errors.firma_contrato?.message}
            </Form.Text>
          )}
        </Col>
      </Form.Group>

      <Form.Group as={Row}>
        <Form.Label style={{ fontWeight: "bold" }}>
          DOCUMENTOS ENTREGADOS:
        </Form.Label>

        <Row>
          <Col>
            {informacion?.documentos?.map((documento, index) => {
              if (index % 2 === 0) {
                return (
                  <div key={index}>
                    <Form.Check
                      inline
                      id={`_conApoDocCon${index}`}
                      label={documento.tipo_documento}
                      type="checkbox"
                      value={documento.id}
                      {...register("documentos")}
                    />
                  </div>
                );
              }
              return null;
            })}
          </Col>
          <Col>
            {informacion?.documentos?.map((documento, index) => {
              if (index % 2 !== 0) {
                return (
                  <div key={index}>
                    <Form.Check
                      inline
                      id={`_conApoDocCon${index}`}
                      label={documento.tipo_documento}
                      type="checkbox"
                      value={documento.id}
                      {...register("documentos")}
                    />
                  </div>
                );
              }
              return null;
            })}
          </Col>
        </Row>
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

export default FormApoderado;
