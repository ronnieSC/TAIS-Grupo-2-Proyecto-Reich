// EditarPariente.tsx
import { useEffect, useState } from "react";
import "./EditarPariente.css"; // Importa el archivo de estilos personalizados
import { Modal, Button, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import {
  useNavigate,
  useParams,
  useRouteLoaderData,
  useSubmit,
} from "react-router-dom";
import { InformacionEstudiante } from "../../../../utilities/EstudianteTipos";
import {
  ParienteEntidad,
  ParienteGuardado,
} from "../../../../utilities/ParienteTipos";
import { Form, Col, Row } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import { District, Province, Region } from "ubigeos";
import utils, {
  dirtyValues,
  parseDateToString,
} from "../../../../utilities/utils";
import DatePicker from "react-datepicker";

const EditarPariente = () => {
  let params = useParams();
  const parientes = useRouteLoaderData("parienteRaiz") as ParienteEntidad[];
  const pariente = parientes?.find(
    ({ apoderado }) => apoderado.id === parseInt(params.parienteId!)
  );

  const navigate = useNavigate();
  const submit = useSubmit();
  const {
    register,
    trigger,
    setValue,
    getValues,
    control,
    formState: { errors, dirtyFields },
  } = useForm<ParienteGuardado>({
    defaultValues: pariente,
  });

  const { informacion } = useRouteLoaderData(
    "estudianteRaiz"
  ) as InformacionEstudiante;

  const [estParDep, setEstParDep] = useState(
    pariente?.apoderado?.ubigeo.substring(0, 2)
  );
  const [estParProv, setEstParProv] = useState("0000");
  const [estParDis, setEstParDis] = useState("00");
  const [provincias, setProvincias] = useState<Province[]>();
  const [distritos, setDistritos] = useState<District[]>();

  const [fecNacApo, setFecNacApo] = useState(
    new Date(
      pariente?.apoderado.fecha_nacimiento != ""
        ? new Date(pariente!.apoderado.fecha_nacimiento!.replace(/-/g, "/"))
        : new Date()
    )
  );

  useEffect(() => {
    if (estParDep != undefined) {
      setProvincias(Region.instance(estParDep!).getProvincies());
      setEstParProv(pariente?.apoderado?.ubigeo.substring(0, 4)!);
    }
  }, [estParDep]);

  useEffect(() => {
    if (estParProv != "0000") {
      setDistritos(Province.instance(estParProv).getDistricts());
      setEstParDis(pariente?.apoderado?.ubigeo!);
    }
  }, [estParProv]);

  const onSubmit = async (e: any) => {
    e.preventDefault();
    const isValid = await trigger();
    if (isValid) {
      setValue("contrato_codigo", parseInt(params.contratoId!));
      const values = getValues();
      const valuesSerialized = JSON.stringify(dirtyValues(dirtyFields, values));
      submit(
        { values: valuesSerialized, parienteId: pariente!.id! },
        {
          action: `/estudiante/parientes/${params.contratoId!}`,
          method: "patch",
        }
      );
    }
  };

  return (
    <Modal isOpen={true} size="lg" centered>
      <Form id="form_editar_pariente" onSubmit={(e) => onSubmit(e)}>
        <ModalHeader className="modal-header-custom">
          <div className="d-flex justify-content-between align-items-center">
            <h6 className="mb-0" style={{ fontWeight: "bold" }}>
              EDITAR PARIENTE
            </h6>
          </div>
        </ModalHeader>
        <ModalBody>
          <Form.Group as={Row} controlId="_estParParEdit" className="mb-3">
            <Form.Label lg="2" column style={{ fontWeight: "bold" }}>
              PARENTESCO:
            </Form.Label>
            <Col lg="10">
              <Form.Control
                placeholder="CUAL ES EL PARENTESCO CON EL ESTUDIANTE"
                {...register("parentesco", {
                  required: "*Requerido",
                  maxLength: { value: 20, message: "*Documento inválido" },
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
              htmlFor="_estParTipDocEdit"
              style={{ fontWeight: "bold" }}
            >
              DOCUMENTO:
            </Form.Label>
            <Col lg="2">
              <Form.Select
                id="_estParTipDocEdit"
                {...register("apoderado.tipo_documento", {
                  required: "*Requerido",
                })}
              >
                {informacion.tipodocumentos?.map((tipo, index) => (
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
                id="_estParDocEdit"
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
              htmlFor="_estParPriNomEdit"
              style={{ fontWeight: "bold" }}
            >
              NOMBRES:
            </Form.Label>
            <Col lg="5">
              <Form.Control
                id="_estParPriNomEdit"
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
                id="_estParSegNomEdit"
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
              htmlFor="_estParApePatEdit"
              style={{ fontWeight: "bold" }}
            >
              APELLIDOS:
            </Form.Label>
            <Col lg="5">
              <Form.Control
                id="_estParApePatEdit"
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
                id="_estParApeMatEdit"
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
            <Form.Group as={Col}>
              <Form.Label
                htmlFor="_estParFecNacEdit"
                style={{ fontWeight: "bold" }}
              >
                FECHA DE NACIMIENTO:
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

            <Form.Group as={Col} controlId="_estParTelEdit">
              <Form.Label style={{ fontWeight: "bold" }}>TELÉFONO:</Form.Label>
              <Form.Control
                placeholder="INGRESE N° CELULAR"
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
            <Form.Group as={Col} controlId="_EstParDepEdit">
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
            <Form.Group as={Col} controlId="_EstParProEdit">
              <Form.Label style={{ fontWeight: "bold" }}>PROVINCIA:</Form.Label>
              <Form.Select
                size="sm"
                value={estParProv}
                onChange={({ target }) => {
                  setEstParProv(target.value);
                  setValue("apoderado.ubigeo", target.value, {
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

            <Form.Group as={Col} controlId="_estParDisEdit">
              <Form.Label style={{ fontWeight: "bold" }}>DISTRITO:</Form.Label>
              <Form.Select
                size="sm"
                value={estParDis}
                onChange={({ target }) => {
                  setEstParDis(target.value);
                  setValue("apoderado.ubigeo", target.value, {
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
            <Form.Group as={Col} lg={8} controlId="_estParDirEdit">
              <Form.Label style={{ fontWeight: "bold" }}>DIRECCIÓN:</Form.Label>
              <Form.Control
                placeholder="INGRESE LA DIRECCIÓN"
                {...register("apoderado.direccion")}
              />
              {errors.apoderado?.direccion && (
                <Form.Text style={{ color: "crimson" }}>
                  {errors.apoderado?.direccion?.message}
                </Form.Text>
              )}
            </Form.Group>
            <Form.Group as={Col} lg={4} controlId="_estParUbiEdit">
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
                NIVEL DE ESTUDIOS
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
                CENTRO DE TRABAJO
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
            <Button id="_estEditParBtnSub" type="submit">
              GUARDAR
            </Button>
          </Form.Group>
          <Form.Group className="BotonCancelar" style={{ fontWeight: "bold" }}>
            <Button
              id="_estEditParBtnCan"
              onClick={() =>
                navigate(`/estudiante/parientes/${pariente?.contrato_codigo}`, {
                  replace: true,
                })
              }
            >
              CANCELAR
            </Button>
          </Form.Group>
        </ModalFooter>
      </Form>
    </Modal>
  );
};

export default EditarPariente;
