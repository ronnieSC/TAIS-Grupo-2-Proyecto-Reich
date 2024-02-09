import { useState, useEffect } from "react";
import { Modal, Button, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Form, Col, Row } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import {
  useLoaderData,
  useNavigate,
  useRouteLoaderData,
  useSubmit,
} from "react-router-dom";
import {
  DocenteEntidad,
  InformacionDocente,
} from "../../../utilities/DocenteTipos";
import utils, {
  dirtyValues,
  parseDateToString,
} from "../../../utilities/utils";
import DatePicker from "react-datepicker";
import { District, Province, Region } from "ubigeos";

const EditarDocente = () => {
  const navigate = useNavigate();
  const { informacion } = useRouteLoaderData(
    "docenteRaiz"
  ) as InformacionDocente;
  const docente = useLoaderData() as DocenteEntidad;

  const {
    register,
    trigger,
    setValue,
    control,
    getValues,
    formState: { errors, dirtyFields },
  } = useForm<DocenteEntidad>({
    defaultValues: docente,
  });
  let submit = useSubmit();

  /*useEffect(() => {
    if (actionData !== undefined) {
      if (!actionData.ok) {
        for (const error in actionData.errors) {
          setError(error as keyof DocenteEntidad, {
            type: "custom",
            message: "*Identificador duplicado",
          });
        }
      } else {
        //navigate("/docente", { replace: true })
        //window.location.reload();
        submit(null, {
          action: "/docente",
          method: "patch",
        });
      }
    }
  }, [actionData]);*/

  const [docDep, setDocDep] = useState(docente?.ubigeo.substring(0, 2));
  const [docProv, setDocProv] = useState(docente?.ubigeo.substring(0, 4));
  const [docDis, setDocDis] = useState(docente?.ubigeo);
  const [provincias, setProvincias] = useState<Province[]>();
  const [distritos, setDistritos] = useState<District[]>();

  const [fecNacDoc, setFecNacDoc] = useState<Date>(
    docente?.fecha_nacimiento != ""
      ? new Date(docente?.fecha_nacimiento.replace(/-/g, '\/'))
      : new Date()
  );

  useEffect(() => {
    if (docDep !== "") setProvincias(Region.instance(docDep).getProvincies());
  }, [docDep]);

  useEffect(() => {
    if (docProv !== "") setDistritos(Province.instance(docProv).getDistricts());
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
        { values: valuesSerialized, docenteId: docente!.id! },
        {
          action: `/docente`,
          method: "patch",
        }
      );
    }
  };

  return (
    <Modal isOpen={true} size="lg" centered>
      <Form id="form_actualizar_docente" onSubmit={(e) => onSubmit(e)}>
        <ModalHeader className="modal-header-custom">
          <div className="d-flex justify-content-between align-items-center">
            <h6 className="mb-0" style={{ fontWeight: "bold" }}>
              EDITAR DOCENTE
            </h6>
          </div>
        </ModalHeader>

        <ModalBody>
          <Form.Group as={Row} className="mb-3">
            <Form.Label
              column
              lg="2"
              htmlFor="_docTipDocEdit"
              style={{ fontWeight: "bold" }}
            >
              DOCUMENTO:
            </Form.Label>

            <Col lg="2">
              <Form.Select id="_docTipDocEdit" {...register("tipo_documento")}>
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
                id="_docDocEdit"
                placeholder="INGRESE DOCUMENTO"
                {...register("documento", {
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
              htmlFor="_docPriNomEdit"
              style={{ fontWeight: "bold" }}
            >
              NOMBRES:
            </Form.Label>

            <Col lg="5">
              <Form.Control
                id="_docPriNomEdit"
                placeholder="PRIMER NOMBRE"
                {...register("primer_nombre", {
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
                id="_docSegNomEdit"
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
              htmlFor="_docApePatEdit"
              style={{ fontWeight: "bold" }}
            >
              APELLIDOS:
            </Form.Label>

            <Col lg="5">
              <Form.Control
                id="_docApePatEdit"
                placeholder="APELLIDO PATERNO"
                {...register("apellido_paterno", {
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
                id="_docApeMatEdit"
                placeholder="APELLIDO MATERNO"
                {...register("apellido_materno", {
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
            <Form.Group as={Col}>
              <Form.Label
                htmlFor="_docFecNacEdit"
                style={{ fontWeight: "bold" }}
              >
                FECHA DE NACIMIENTO:
              </Form.Label>
              <Controller
                name="fecha_nacimiento"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    className="form-control"
                    wrapperClassName="pickers"
                    id="_docFecNacEdit"
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
              />
              {errors.fecha_nacimiento && (
                <Form.Text style={{ color: "crimson" }}>
                  {errors.fecha_nacimiento?.message}
                </Form.Text>
              )}
            </Form.Group>
            <Form.Group as={Col} controlId="_docTel1Edit">
              <Form.Label style={{ fontWeight: "bold" }}>
                TELÉFONO PRINCIPAL:
              </Form.Label>
              <Form.Control
                placeholder="INGRESE N° CELULAR"
                {...register("telefono", {
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
            <Form.Group as={Col} controlId="_docDepEdit">
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
                {utils.departamentos.map((dep) => (
                  <option key={dep.codigo} value={dep.codigo}>
                    {dep.nombre}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group as={Col} controlId="_docProEdit">
              <Form.Label style={{ fontWeight: "bold" }}>PROVINCIA:</Form.Label>
              <Form.Select
                size="sm"
                value={docProv}
                onChange={({ target }) => {
                  setDocProv(target.value);
                  setValue("ubigeo", target.value, { shouldDirty: true });
                }}
              >
                <option key="0000" value="">
                  SELECCIONA
                </option>
                {provincias?.map((prov, index) => (
                  <option key={index} value={prov.getCode()}>
                    {prov.getName()}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group as={Col} controlId="_docDisEdit">
              <Form.Label style={{ fontWeight: "bold" }}>DISTRITO:</Form.Label>
              <Form.Select
                size="sm"
                value={docDis}
                onChange={({ target }) => {
                  setDocDis(target.value);
                  setValue("ubigeo", target.value, { shouldDirty: true });
                }}
              >
                <option key="0000" value="">
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
            <Form.Group as={Col} lg={8} controlId="_docDirEdit">
              <Form.Label style={{ fontWeight: "bold" }}>DIRECCIÓN:</Form.Label>
              <Form.Control
                placeholder="INGRESE LA DIRECCIÓN"
                {...register("direccion")}
              />
              {errors.direccion && (
                <Form.Text style={{ color: "crimson" }}>
                  {errors.direccion?.message}
                </Form.Text>
              )}
            </Form.Group>

            <Form.Group as={Col} lg={4} controlId="_docUbiEdit">
              <Form.Label style={{ fontWeight: "bold" }}>UBIGEO:</Form.Label>
              <Form.Control
                readOnly
                placeholder="UBIGEO"
                {...register("ubigeo", {
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

          <Row className="mb-2">
            <Form.Group as={Col} controlId="_docExpEdit">
              <Form.Label style={{ fontWeight: "bold" }}>
                EXPERIENCIA:
              </Form.Label>
              <Form.Control
                as="textarea"
                placeholder="INGRESE EXPERIENCIA PREVIA"
                {...register("experiencia")}
              />
              {errors.experiencia && (
                <Form.Text style={{ color: "crimson" }}>
                  {errors.experiencia?.message}
                </Form.Text>
              )}
            </Form.Group>

            <Form.Group as={Col} controlId="_docEspEdit">
              <Form.Label style={{ fontWeight: "bold" }}>
                ESPECIALIDAD:
              </Form.Label>
              <Form.Control
                as="textarea"
                placeholder="INGRESE ESPECIALIDADES"
                {...register("especialidad")}
              />
              {errors.especialidad && (
                <Form.Text style={{ color: "crimson" }}>
                  {errors.especialidad?.message}
                </Form.Text>
              )}
            </Form.Group>
          </Row>

          <Form.Group as={Row} controlId="_docCurEdit">
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
                          defaultChecked={docente.codigo_cursos.includes(
                            curso.id
                          )}
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
                          defaultChecked={docente.codigo_cursos.includes(
                            curso.id
                          )}
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
                          defaultChecked={docente.codigo_cursos.includes(
                            curso.id
                          )}
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

        <ModalFooter className="d-flex justify-content-end">
          <Form.Group className="BotonGuardar">
            <Button type="submit">GUARDAR</Button>
          </Form.Group>
          <Form.Group className="BotonCancelar">
            <Button onClick={() => navigate("/docente", { replace: true })}>
              CANCELAR
            </Button>
          </Form.Group>
        </ModalFooter>
      </Form>
    </Modal>
  );
};

export default EditarDocente;
