// AgregarAlumnos.tsx
import { useState, useEffect } from "react";
import { Modal, Button, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Form, Col, Row } from "react-bootstrap";
import { useNavigate, useRouteLoaderData, useSubmit } from "react-router-dom";
import {
  DocenteGuardado,
  InformacionDocente,
} from "../../../utilities/DocenteTipos";
import utils, {
  dirtyValues,
  parseDateToString,
} from "../../../utilities/utils";
import { District, Province, Region } from "ubigeos";
import { Controller, useForm } from "react-hook-form";
import DatePicker from "react-datepicker";

const NuevoDocente = () => {
  const navigate = useNavigate();
  const submit = useSubmit();

  const {
    register,
    trigger,
    getValues,
    setValue,
    control,
    formState: { errors, dirtyFields },
  } = useForm<DocenteGuardado>();

  /* useEffect(() => {
    if (actionData !== undefined) {
      if (!actionData.ok) {
        for (const error in actionData.errors) {
          setError(error as keyof DocenteGuardado, {
            type: "custom",
            message: "*Identificador duplicado",
          });
        }
      } else {
        //navigate("/docente", { replace: true })
        //window.location.reload();
        submit(null, {
          action: "/docente",
          method: "post",
        });
      }
    }
  }, [actionData]);*/

  const { informacion } = useRouteLoaderData(
    "docenteRaiz"
  ) as InformacionDocente;

  const [fecNacDoc, setFecNacDoc] = useState<Date>(new Date());

  const [docDep, setDocDep] = useState("00");
  const [docProv, setDocProv] = useState("0000");
  const [docDis, setDocDis] = useState("00");
  const [provincias, setProvincias] = useState<Province[]>();
  const [distritos, setDistritos] = useState<District[]>();

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

  const alMenosUnoSeleccionado = (selected: number[]) => {
    return selected.length > 0;
  };

  const onSubmit = async (e: any) => {
    e.preventDefault();
    const isValid = await trigger();
    if (isValid) {
      const values = getValues();
      const valuesSerialized = JSON.stringify(dirtyValues(dirtyFields, values));
      submit(
        { values: valuesSerialized },
        {
          action: "/docente",
          method: "post",
        }
      );
    }
  };

  return (
    <Modal isOpen={true} size="lg" centered>
      <Form id="from_crear_docente" onSubmit={(e) => onSubmit(e)}>
        <ModalHeader className="modal-header-custom">
          <div className="d-flex justify-content-between align-items-center">
            <h6 className="mb-0" style={{ fontWeight: "bold" }}>
              NUEVO DOCENTE
            </h6>
          </div>
        </ModalHeader>

        <ModalBody>
          <Form.Group as={Row} className="mb-3">
            <Form.Label
              column
              lg="2"
              htmlFor="_docTipDoc"
              style={{ fontWeight: "bold" }}
            >
              DOCUMENTO:
            </Form.Label>

            <Col lg="2">
              <Form.Select
                id="_docTipDoc"
                {...register("tipo_documento", { required: "*Requerido" })}
              >
                <option value="">ELIGE</option>
                {informacion?.tipodocumentos?.map((tipo, index) => (
                  <option key={index} value={tipo.id}>
                    {tipo.TipDocDesCor}
                  </option>
                ))}
              </Form.Select>
              {errors.tipo_documento && (
                <Form.Text style={{ color: "crimson" }}>
                  {errors.tipo_documento?.message}
                </Form.Text>
              )}
            </Col>
            <Col>
              <Form.Control
                type="text"
                id="_docDoc"
                placeholder="INGRESE DOCUMENTO"
                {...register("documento", {
                  required: "*Requerido",
                  minLength: { value: 8, message: "*Documento inválido" },
                  maxLength: { value: 8, message: "*Documento inválido" },
                  pattern: {
                    value: /[0-9]{8}/,
                    message: "*Debe contener solo números",
                  },
                })}
              />
              {errors.documento && (
                <Form.Text style={{ color: "crimson" }}>
                  {errors.documento?.message}
                </Form.Text>
              )}
            </Col>
          </Form.Group>

          <Form.Group className="mb-3" as={Row}>
            <Form.Label
              column
              lg="2"
              htmlFor="_docPriNom"
              style={{ fontWeight: "bold" }}
            >
              NOMBRES:
            </Form.Label>

            <Col lg="5">
              <Form.Control
                data-testid="_docPriNom"
                id="_docPriNom"
                placeholder="PRIMER NOMBRE"
                {...register("primer_nombre", {
                  required: "*Requerido",
                  pattern: {
                    value: /^[a-zA-ZñÑ]+$/,
                    message: "*Solo debe contener letras",
                  },
                })}
              />
              {errors.primer_nombre && (
                <Form.Text style={{ color: "crimson" }}>
                  {errors.primer_nombre?.message}
                </Form.Text>
              )}
            </Col>
            <Col lg="5">
              <Form.Control
                type="text"
                id="_docSegNom"
                placeholder="SEGUNDO NOMBRE"
                {...register("segundo_nombre", {
                  pattern: {
                    value: /^[a-zA-ZñÑ]+$/,
                    message: "*Solo debe contener letras",
                  },
                })}
              />
              {errors.segundo_nombre && (
                <Form.Text style={{ color: "crimson" }}>
                  {errors.segundo_nombre?.message}
                </Form.Text>
              )}
            </Col>
          </Form.Group>

          <Form.Group className="mb-3" as={Row}>
            <Form.Label
              lg="2"
              column
              htmlFor="_docApePat"
              style={{ fontWeight: "bold" }}
            >
              APELLIDOS:
            </Form.Label>

            <Col lg="5">
              <Form.Control
                id="_docApePat"
                placeholder="APELLIDO PATERNO"
                {...register("apellido_paterno", {
                  required: "*Requerido",
                  pattern: {
                    value: /^[a-zA-ZñÑ]+$/,
                    message: "*Solo debe contener letras",
                  },
                })}
              />
              {errors.apellido_paterno && (
                <Form.Text style={{ color: "crimson" }}>
                  {errors.apellido_paterno?.message}
                </Form.Text>
              )}
            </Col>
            <Col lg="5">
              <Form.Control
                id="_docApeMat"
                placeholder="APELLIDO MATERNO"
                {...register("apellido_materno", {
                  required: "*Requerido",
                  pattern: {
                    value: /^[a-zA-ZñÑ]+$/,
                    message: "*Solo debe contener letras",
                  },
                })}
              />
              {errors.apellido_materno && (
                <Form.Text style={{ color: "crimson" }}>
                  {errors.apellido_materno?.message}
                </Form.Text>
              )}
            </Col>
          </Form.Group>

          <Row className="mb-3">
            <Form.Group as={Col} lg="6">
              <Form.Label htmlFor="_docFecNac" style={{ fontWeight: "bold" }}>
                FECHA DE NACIMIENTO:
              </Form.Label>
              <Controller
                name="fecha_nacimiento"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    id="_docFecNac"
                    className="form-control"
                    wrapperClassName="pickers"
                    maxDate={new Date()}
                    selected={fecNacDoc}
                    locale="es"
                    dateFormat="dd/MM/yyyy"
                    onChange={(date) => {
                      setFecNacDoc(date!);
                      field.onChange(parseDateToString(date!));
                    }}
                  />
                )}
                rules={{
                  required: "*Requerido",
                }}
              />
              {errors.fecha_nacimiento && (
                <Form.Text style={{ color: "crimson" }}>
                  {errors.fecha_nacimiento?.message}
                </Form.Text>
              )}
            </Form.Group>

            <Form.Group as={Col} controlId="_docTel1">
              <Form.Label style={{ fontWeight: "bold" }}>TELÉFONO:</Form.Label>
              <Form.Control
                placeholder="INGRESE NÚMERO"
                {...register("telefono", {
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
              {errors.telefono && (
                <Form.Text style={{ color: "crimson" }}>
                  {errors.telefono?.message}
                </Form.Text>
              )}
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} controlId="_docDep">
              <Form.Label style={{ fontWeight: "bold" }}>
                DEPARTAMENTO:
              </Form.Label>
              <Form.Select
                size="sm"
                value={docDep}
                onChange={({ target }) => {
                  setDocDep(target.value);
                  setValue("ubigeo", target.value, { shouldDirty: true });
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
                  setValue("ubigeo", target.value, { shouldDirty: true });
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
                  setValue("ubigeo", target.value, { shouldDirty: true });
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
            <Form.Group as={Col} lg={8} controlId="_docDir">
              <Form.Label style={{ fontWeight: "bold" }}>DIRECCIÓN:</Form.Label>
              <Form.Control
                placeholder="INGRESE LA DIRECCIÓN"
                {...register("direccion", { required: "*Requerido" })}
              />
              {errors.direccion && (
                <Form.Text style={{ color: "crimson" }}>
                  {errors.direccion?.message}
                </Form.Text>
              )}
            </Form.Group>

            <Form.Group as={Col} lg={4} controlId="_docUbi">
              <Form.Label style={{ fontWeight: "bold" }}>UBIGEO:</Form.Label>
              <Form.Control
                readOnly
                placeholder="UBIGEO"
                {...register("ubigeo", {
                  required: "*Requerido",
                  minLength: { value: 6, message: "*Debe ser de 6 cifras" },
                })}
              />
              {errors.ubigeo && (
                <Form.Text style={{ color: "crimson" }}>
                  {errors.ubigeo?.message}
                </Form.Text>
              )}
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} controlId="_docExp">
              <Form.Label style={{ fontWeight: "bold" }}>
                EXPERIENCIA:
              </Form.Label>
              <Form.Control
                as="textarea"
                placeholder="INGRESE EXPERIENCIA PREVIA"
                {...register("experiencia", {
                  maxLength: { value: 100, message: "*Texto demasiado largo" },
                })}
              />
              {errors.experiencia && (
                <Form.Text style={{ color: "crimson" }}>
                  {errors.experiencia?.message}
                </Form.Text>
              )}
            </Form.Group>

            <Form.Group as={Col} controlId="_docEsp">
              <Form.Label style={{ fontWeight: "bold" }}>
                ESPECIALIDAD:
              </Form.Label>
              <Form.Control
                as="textarea"
                placeholder="INGRESE ESPECIALIDADES"
                {...register("especialidad", {
                  maxLength: { value: 100, message: "*Texto demasiado largo" },
                })}
              />
              {errors.especialidad && (
                <Form.Text style={{ color: "crimson" }}>
                  {errors.especialidad?.message}
                </Form.Text>
              )}
            </Form.Group>
          </Row>

          <Form.Group as={Row} className="mb-3" controlId="_docCur">
            <Form.Label style={{ fontWeight: "bold" }}>CURSOS:</Form.Label>
            <Row>
              <Col>
                {informacion?.cursos?.map((curso, index) => {
                  if (index % 2 !== 0 && index % 3 !== 0) {
                    return (
                      <div key={index}>
                        <Form.Check
                          inline
                          id={`_docCur${index}`}
                          label={curso.curso}
                          type="checkbox"
                          value={curso.id}
                          {...register("codigo_cursos", {
                            validate: alMenosUnoSeleccionado,
                          })}
                        />
                      </div>
                    );
                  }
                  return null;
                })}
              </Col>
              <Col>
                {informacion?.cursos?.map((curso, index) => {
                  if (index % 2 === 0 && index % 3 !== 0) {
                    return (
                      <div key={index}>
                        <Form.Check
                          inline
                          id={`_docCur${index}`}
                          label={curso.curso}
                          type="checkbox"
                          value={curso.id}
                          {...register("codigo_cursos", {
                            validate: alMenosUnoSeleccionado,
                          })}
                        />
                      </div>
                    );
                  }
                  return null;
                })}
              </Col>
              <Col>
                {informacion?.cursos?.map((curso, index) => {
                  if (index % 3 === 0) {
                    return (
                      <div key={index}>
                        <Form.Check
                          inline
                          id={`_docCur${index}`}
                          label={curso.curso}
                          type="checkbox"
                          value={curso.id}
                          {...register("codigo_cursos", {
                            validate: alMenosUnoSeleccionado,
                          })}
                        />
                      </div>
                    );
                  }
                  return null;
                })}
              </Col>
              {errors.codigo_cursos && (
                <Form.Text style={{ color: "crimson" }}>
                  *Al menos debe elegirse uno
                </Form.Text>
              )}
            </Row>
          </Form.Group>
        </ModalBody>

        <ModalFooter
          className="d-flex justify-content-end"
          style={{ fontWeight: "bold" }}
        >
          <Form.Group className="BotonGuardar" style={{ fontWeight: "bold" }}>
            <Button data-testid="_docGuaBtn" id="_docGuaBtn" type="submit">
              GUARDAR
            </Button>
          </Form.Group>
          <Form.Group className="BotonCancelar" style={{ fontWeight: "bold" }}>
            <Button
              id="_docCanBtn"
              onClick={() => navigate("/docente", { replace: true })}
            >
              SALIR
            </Button>
          </Form.Group>
        </ModalFooter>
      </Form>
    </Modal>
  );
};

export default NuevoDocente;
