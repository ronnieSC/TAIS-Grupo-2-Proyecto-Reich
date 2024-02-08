// AgregarAlumnos.tsx
import { useEffect, useState } from "react";
import "./AgregarPariente.css"; // Importa el archivo de estilos personalizados
import { Modal, Button, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Form, Col, Row } from "react-bootstrap";
import {
  useLoaderData,
  useNavigate,
  useParams,
  useSubmit,
} from "react-router-dom";
import { TipoDocumento } from "../../../../utilities/ClaseTipos";
import { ParienteGuardado } from "../../../../utilities/ParienteTipos";
import { Controller, useForm } from "react-hook-form";
import { District, Province, Region } from "ubigeos";
import utils, {
  dirtyValues,
  parseDateToString,
} from "../../../../utilities/utils";
import DatePicker from "react-datepicker";

const AgregarPariente = () => {
  const navigate = useNavigate();
  const submit = useSubmit();
  const {
    register,
    trigger,
    setValue,
    getValues,
    control,
    formState: { errors, dirtyFields },
  } = useForm<ParienteGuardado>();
  const tipo_documento = useLoaderData() as TipoDocumento[];
  let params = useParams();

  const [estParDep, setEstParDep] = useState("00");
  const [estParProv, setEstParProv] = useState("0000");
  const [estParDis, setEstParDis] = useState("00");
  const [provincias, setProvincias] = useState<Province[]>();
  const [distritos, setDistritos] = useState<District[]>();

  const [fecNacApo, setFecNacApo] = useState(new Date());

  useEffect(() => {
    if (estParDep != "00") {
      setProvincias(Region.instance(estParDep).getProvincies());
      setEstParDis("");
    }
  }, [estParDep]);

  useEffect(() => {
    if (estParProv != "0000") {
      setDistritos(Province.instance(estParProv).getDistricts());
    }
  }, [estParProv]);

  const onSubmit = async (e: any) => {
    e.preventDefault();
    const isValid = await trigger();
    if (isValid) {
      setValue("contrato_codigo", parseInt(params.contratoId!), {
        shouldDirty: true,
      });
      const values = getValues();
      const valuesSerialized = JSON.stringify(dirtyValues(dirtyFields, values));
      console.log(values)
      submit(
        { values: valuesSerialized },
        {
          action: `/estudiante/parientes/${params.contratoId!}`,
          method: "post",
        }
      );
    }
  };

  return (
    <Modal isOpen={true} size="lg" centered>
      <Form id="form_crear_pariente" onSubmit={(e) => onSubmit(e)}>
        <ModalHeader className="modal-header-custom">
          <div className="d-flex justify-content-between align-items-center">
            <h6 className="mb-0" style={{ fontWeight: "bold" }}>
              AGREGAR PARIENTES
            </h6>
          </div>
        </ModalHeader>
        <ModalBody>
          <Form.Group as={Row} controlId="_estParPar" className="mb-3">
            <Form.Label lg="2" column style={{ fontWeight: "bold" }}>
              PARENTESCO:
            </Form.Label>
            <Col lg="10">
              <Form.Control
                placeholder="CUAL ES EL PARENTESCO CON EL ESTUDIANTE"
                {...register("parentesco", {
                  required: "*Requerido",
                  maxLength: {
                    value: 20,
                    message: "*Parentesco demasiado largo",
                  },
                  pattern: {
                    value: /^[a-zA-ZñÑ]+$/,
                    message: "*Solo debe contener letras",
                  },
                })}
              />
              {errors.parentesco && (
                <Form.Text style={{ color: "crimson" }}>
                  {errors.parentesco?.message}
                </Form.Text>
              )}
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label
              column
              lg="2"
              htmlFor="_estParTipDoc"
              style={{ fontWeight: "bold" }}
            >
              DOCUMENTO:
            </Form.Label>
            <Col lg="2">
              <Form.Select
                id="_estParTipDoc"
                {...register("apoderado.tipo_documento", {
                  required: "*Requerido",
                })}
              >
                <option value="">ELIGE</option>
                {tipo_documento?.map((tipo, index) => (
                  <option key={index} value={tipo.id}>
                    {tipo.TipDocDesCor}
                  </option>
                ))}
              </Form.Select>
              {errors.apoderado?.tipo_documento && (
                <Form.Text style={{ color: "crimson" }}>
                  {errors.apoderado?.tipo_documento?.message}
                </Form.Text>
              )}
            </Col>
            <Col lg="8">
              <Form.Control
                type="text"
                id="_estParDoc"
                placeholder="INGRESE DOCUMENTO"
                {...register("apoderado.documento", {
                  required: "*Requerido",
                  minLength: { value: 8, message: "*Documento inválido" },
                  maxLength: { value: 8, message: "*Documento inválido" },
                  pattern: {
                    value: /[0-9]{8}/,
                    message: "*Debe contener solo números",
                  },
                })}
              />
              {errors.apoderado?.documento && (
                <Form.Text style={{ color: "crimson" }}>
                  {errors.apoderado?.documento?.message}
                </Form.Text>
              )}
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label
              lg="2"
              column
              htmlFor="_estParPriNom"
              style={{ fontWeight: "bold" }}
            >
              NOMBRES:
            </Form.Label>
            <Col lg="5">
              <Form.Control
                id="_estParPriNom"
                placeholder="PRIMER NOMBRE"
                {...register("apoderado.primer_nombre", {
                  required: "*Requerido",
                  pattern: {
                    value: /^[a-zA-ZñÑ]+$/,
                    message: "*Solo debe contener letras",
                  },
                })}
              />
              {errors.apoderado?.primer_nombre && (
                <Form.Text style={{ color: "crimson" }}>
                  {errors.apoderado?.primer_nombre?.message}
                </Form.Text>
              )}
            </Col>
            <Col lg="5">
              <Form.Control
                id="_estParSegNom"
                placeholder="SEGUNDO NOMBRE"
                {...register("apoderado.segundo_nombre", {
                  pattern: {
                    value: /^[a-zA-ZñÑ]+$/,
                    message: "*Solo debe contener letras",
                  },
                })}
              />
              {errors.apoderado?.segundo_nombre && (
                <Form.Text style={{ color: "crimson" }}>
                  {errors.apoderado?.segundo_nombre?.message}
                </Form.Text>
              )}
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label
              column
              lg="2"
              htmlFor="_estParApePat"
              style={{ fontWeight: "bold" }}
            >
              APELLIDOS:
            </Form.Label>
            <Col lg="5">
              <Form.Control
                id="_estParApePat"
                placeholder="APELLIDO PATERNO"
                {...register("apoderado.apellido_paterno", {
                  required: "*Requerido",
                  pattern: {
                    value: /^[a-zA-ZñÑ]+$/,
                    message: "*Solo debe contener letras",
                  },
                })}
              />
              {errors.apoderado?.apellido_paterno && (
                <Form.Text style={{ color: "crimson" }}>
                  {errors.apoderado?.apellido_paterno?.message}
                </Form.Text>
              )}
            </Col>
            <Col lg="5">
              <Form.Control
                id="_estParApeMat"
                placeholder="APELLIDO MATERNO"
                {...register("apoderado.apellido_materno", {
                  required: "*Requerido",
                  pattern: {
                    value: /^[a-zA-ZñÑ]+$/,
                    message: "*Solo debe contener letras",
                  },
                })}
              />
              {errors.apoderado?.apellido_materno && (
                <Form.Text style={{ color: "crimson" }}>
                  {errors.apoderado?.apellido_materno?.message}
                </Form.Text>
              )}
            </Col>
          </Form.Group>

          <Row className="mb-3">
            <Form.Group as={Col} controlId="_estParFecNac">
              <Form.Label style={{ fontWeight: "bold" }}>
                FECHA DE NACIMIENTO
              </Form.Label>
              <Controller
                name="apoderado.fecha_nacimiento"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    id="_estParFecNacEdit"
                    className="form-control"
                    wrapperClassName="pickers"
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
              {errors.apoderado?.fecha_nacimiento && (
                <Form.Text style={{ color: "crimson" }}>
                  {errors.apoderado?.fecha_nacimiento?.message}
                </Form.Text>
              )}
            </Form.Group>

            <Form.Group as={Col} controlId="_estParTel">
              <Form.Label style={{ fontWeight: "bold" }}>TELÉFONO:</Form.Label>
              <Form.Control
                placeholder="INGRESE N° TELÉFONO"
                {...register("apoderado.telefono", {
                  required: "*Requerido",
                  pattern: {
                    value: /[0-9]{9}/,
                    message: "*No es un telefono válido",
                  },
                  maxLength: {
                    value: 9,
                    message: "*No es un telefono válido",
                  },
                })}
              />
              {errors.apoderado?.telefono && (
                <Form.Text style={{ color: "crimson" }}>
                  {errors.apoderado?.telefono?.message}
                </Form.Text>
              )}
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} controlId="_EstParDep">
              <Form.Label style={{ fontWeight: "bold" }}>
                DEPARTAMENTO:
              </Form.Label>
              <Form.Select
                size="sm"
                value={estParDep}
                onChange={({ target }) => {
                  setEstParDep(target.value);
                  setValue("apoderado.ubigeo", target.value, {
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
            <Form.Group as={Col} controlId="_EstParPro">
              <Form.Label style={{ fontWeight: "bold" }}>PROVINCIA:</Form.Label>
              <Form.Select
                size="sm"
                value={estParProv}
                onChange={({ target }) => {
                  setEstParProv(target.value);
                  setValue("apoderado.ubigeo", target.value);
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

            <Form.Group as={Col} controlId="_estParDis">
              <Form.Label style={{ fontWeight: "bold" }}>DISTRITO:</Form.Label>
              <Form.Select
                size="sm"
                value={estParDis}
                onChange={({ target }) => {
                  setEstParDis(target.value);
                  setValue("apoderado.ubigeo", target.value);
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
            <Form.Group as={Col} lg={8} controlId="_estParDir">
              <Form.Label style={{ fontWeight: "bold" }}>DIRECCIÓN:</Form.Label>
              <Form.Control
                placeholder="INGRESE LA DIRECCIÓN"
                {...register("apoderado.direccion", { required: "*Requerido" })}
              />
              {errors.apoderado?.direccion && (
                <Form.Text style={{ color: "crimson" }}>
                  {errors.apoderado?.direccion?.message}
                </Form.Text>
              )}
            </Form.Group>
            <Form.Group as={Col} lg={4} controlId="_estParUbi">
              <Form.Label style={{ fontWeight: "bold" }}>UBIGEO:</Form.Label>
              <Form.Control
                readOnly
                placeholder="UBIGEO"
                {...register("apoderado.ubigeo", {
                  required: "*Requerido",
                  minLength: { value: 6, message: "*Debe ser de 6 cifras" },
                })}
              />
              {errors.apoderado?.ubigeo && (
                <Form.Text style={{ color: "crimson" }}>
                  {errors.apoderado?.ubigeo?.message}
                </Form.Text>
              )}
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} controlId="_estParNivEst">
              <Form.Label style={{ fontWeight: "bold" }}>
                NIVEL DE ESTUDIOS:
              </Form.Label>
              <Form.Control
                placeholder="INGRESE NIVEL DE ESTUDIOS"
                {...register("apoderado.nivel_estudios")}
              />
              {errors.apoderado?.nivel_estudios && (
                <Form.Text style={{ color: "crimson" }}>
                  {errors.apoderado?.nivel_estudios?.message}
                </Form.Text>
              )}
            </Form.Group>

            <Form.Group as={Col} controlId="_estParCen">
              <Form.Label style={{ fontWeight: "bold" }}>
                CENTRO DE TRABAJO:
              </Form.Label>
              <Form.Control
                placeholder="INGRESE CENTRO DE TRABAJO"
                {...register("apoderado.centro_trabajo")}
              />
              {errors.apoderado?.centro_trabajo && (
                <Form.Text style={{ color: "crimson" }}>
                  {errors.apoderado?.centro_trabajo?.message}
                </Form.Text>
              )}
            </Form.Group>
          </Row>         

          <Form.Check
            type="switch"
            id="_estParApo"
            label="¿ES APODERADO?"
            style={{ fontWeight: "bold" }}
            {...register("apoderado.apoderado")}
          />
        </ModalBody>

        <ModalFooter
          className="d-flex justify-content-end"
          style={{ fontWeight: "bold" }}
        >
          <Form.Group className="BotonGuardar" style={{ fontWeight: "bold" }}>
            <Button id="_estAgrParBtnSub" type="submit">
              GUARDAR
            </Button>
          </Form.Group>
          <Form.Group className="BotonCancelar" style={{ fontWeight: "bold" }}>
            <Button id="_estAgrParBtnCan" onClick={() => navigate(-1)}>
              CANCELAR
            </Button>
          </Form.Group>
        </ModalFooter>
      </Form>
    </Modal>
  );
};

export default AgregarPariente;
