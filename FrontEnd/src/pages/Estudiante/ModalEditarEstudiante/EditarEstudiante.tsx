import { useEffect, useState } from "react";
import "./EditarEstudiante.css";
import { Modal, Button, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Form, Col, Row, Image } from "react-bootstrap";
import {
  useLoaderData,
  useNavigate,
  useRouteLoaderData,
  useSubmit,
} from "react-router-dom";
import {
  EstudianteEntidad,
  InformacionEstudiante,
} from "../../../utilities/EstudianteTipos";
import { Controller, useForm } from "react-hook-form";
import utils, {
  dirtyValues,
  parseDateToString,
} from "../../../utilities/utils";
import DatePicker from "react-datepicker";
import { District, Province, Region } from "ubigeos";

const EditarEstudiante = () => {
  const navigate = useNavigate();
  const estudiante = useLoaderData() as EstudianteEntidad;
  const { informacion } = useRouteLoaderData(
    "estudianteRaiz"
  ) as InformacionEstudiante;

  const {
    register,
    trigger,
    setValue,
    getValues,
    control,
    formState: { errors, dirtyFields },
  } = useForm<EstudianteEntidad>({
    defaultValues: estudiante,
  });
  const submit = useSubmit();

  const [imagenSeleccionada, setImagenSeleccionada] = useState<string>(
    estudiante?.foto!
  );

  const [fecNacEst, setFecNacEst] = useState<Date>(
    estudiante?.fecha_nacimiento != ""
      ? new Date(estudiante?.fecha_nacimiento.replace(/-/g, '\/'))
      : new Date()
  );

  const [estDep, setEstDep] = useState(estudiante?.ubigeo.substring(0, 2));
  const [estProv, setEstProv] = useState("0000");
  const [estDis, setEstDis] = useState("00");
  const [provincias, setProvincias] = useState<Province[]>();
  const [distritos, setDistritos] = useState<District[]>();

  useEffect(() => {
    if (estDep != undefined) {
      setProvincias(Region.instance(estDep!).getProvincies());
      setEstProv(estudiante?.ubigeo.substring(0, 4)!);
    }
  }, [estDep]);

  useEffect(() => {
    if (estProv != "0000") {
      setDistritos(Province.instance(estProv).getDistricts());
      setEstDis(estudiante?.ubigeo!);
    }
  }, [estProv]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target) {
          const image = e.target.result as string;
          setImagenSeleccionada(image);
          setValue("foto", image, { shouldDirty: true });
        }
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  const onSubmit = async (e: any) => {
    e.preventDefault();
    const isValid = await trigger();
    if (isValid) {
      const values = getValues();
      const valuesSerialized = JSON.stringify(dirtyValues(dirtyFields, values));
      submit(
        { values: valuesSerialized, estudianteId: estudiante!.id! },
        {
          action: `/estudiante`,
          method: "patch",
        }
      );
    }
  };

  return (
    <Modal isOpen={true} size="lg" centered>
      <Form id="form_actualizar_estudiante" onSubmit={(e) => onSubmit(e)}>
        <ModalHeader className="modal-header-custom">
          <div className="d-flex justify-content-between align-items-center">
            <h6 className="mb-0" style={{ fontWeight: "bold" }}>
              EDITAR ESTUDIANTE
            </h6>
          </div>
        </ModalHeader>

        <ModalBody>
          <Row style={{ textAlign: "center" }} className="mt-2">
            <span className="label-with-margin"> DATOS DEL ESTUDIANTE</span>
          </Row>

          <Row className="ms-3 me-3">
            <Col>
              <Form.Group className="mb-3 text-center">
                <Form.Group as={Row} controlId="_estFot">
                  <Form.Label as={Col} lg={4} style={{ fontWeight: "bold" }}>
                    FOTO DEL ESTUDIANTE:
                  </Form.Label>
                  <Col>
                    <Form.Control
                      type="file"
                      accept=".jpg, .png"
                      onChange={handleImageChange}
                    />
                    {errors.foto && (
                      <Form.Control.Feedback type="invalid">
                        {errors.foto?.message}
                      </Form.Control.Feedback>
                    )}
                  </Col>
                </Form.Group>
                {imagenSeleccionada && (
                  <div
                    style={{
                      maxWidth: "300px",
                      height: "auto",
                      overflow: "auto",
                      display: "inline-block",
                    }}
                  >
                    <Image
                      id="_estFotEdit"
                      className="mt-2"
                      src={imagenSeleccionada}
                      alt="Fotografía del estudiante - Vista previa"
                      fluid
                      rounded
                    />
                  </div>
                )}
              </Form.Group>

              <Form.Group as={Row} controlId="_estAliEdit" className="mb-3">
                <Form.Label column style={{ fontWeight: "bold" }}>
                  ALIAS:
                </Form.Label>
                <Col>
                  <Form.Control
                    placeholder="INGRESE ALIAS"
                    {...register("alias")}
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} controlId="_estCorEdit" className="mb-3">
                <Form.Label style={{ fontWeight: "bold" }}>
                  CORREO ELECTRONICO:
                </Form.Label>
                <Col>
                  <Form.Control
                    placeholder="ejemplo@correo.com"
                    {...register("usuario.django_user.nombre_usuario", {
                      maxLength: {
                        value: 50,
                        message: "*El correo es demasiado largo",
                      },
                      pattern: {
                        value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                        message: "*El correo debe ser válido",
                      },
                    })}
                  />
                  {errors.correo && (
                    <Form.Text style={{ color: "crimson" }}>
                      {errors.correo.message}
                    </Form.Text>
                  )}
                </Col>
              </Form.Group>

              <Form.Group as={Row} controlId="_estFecNacEdit">
                <Form.Label style={{ fontWeight: "bold" }}>
                  FECHA NACIMIENTO:
                </Form.Label>
                <Controller
                  name="fecha_nacimiento"
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
                />
              </Form.Group>
            </Col>

            <Col>
              <Form.Group as={Row} className="mb-3">
                <Col lg={4}>
                  <Form.Select
                    id="_estTipDocEdit"
                    {...register("tipo_documento")}
                  >
                    {informacion?.tipodocumentos?.map((tipo, index) => (
                      <option key={index} value={tipo.id}>
                        {tipo.TipDocDesCor}
                      </option>
                    ))}
                  </Form.Select>
                </Col>

                <Col lg={8}>
                  <Form.Control
                    id="_estDocEdit"
                    {...register("documento", {
                      required: "*Requerido",
                      minLength: { value: 8, message: "*Documento inválido" },
                      maxLength: { value: 8, message: "*Documento inválido" },
                      pattern: {
                        value: /^[0-9]+$/,
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

              <Form.Group as={Row} className="mb-3">
                <Form.Label
                  style={{ fontWeight: "bold" }}
                  htmlFor="_estPriNomEdit"
                >
                  NOMBRES:
                </Form.Label>
                <Col lg={6}>
                  <Form.Control
                    id="_estPriNomEdit"
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
                <Col lg={6}>
                  <Form.Control
                    id="_estSegNomEdit"
                    {...register("segundo_nombre", {
                      pattern: {
                        value: /^[a-zA-ñÑ]+$/,
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

              <Form.Group as={Row} className="mb-3">
                <Form.Label
                  htmlFor="_estApePatEdit"
                  style={{ fontWeight: "bold" }}
                >
                  APELLIDOS:
                </Form.Label>
                <Col>
                  <Form.Control
                    id="_estApePatEdit"
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
                <Col>
                  <Form.Control
                    type="text"
                    id="_estApeMatEdit"
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

              <Form.Group as={Row} className="mb-3" controlId="_estTelEdit">
                <Form.Label lg={4} column style={{ fontWeight: "bold" }}>
                  TELÉFONO:
                </Form.Label>
                <Col lg={8}>
                  <Form.Control
                    {...register("telefono", {
                      pattern: {
                        value: /^[0-9]+$/,
                        message: "*Debe contener solo números",
                      },
                    })}
                  />
                  {errors.telefono && (
                    <Form.Text style={{ color: "crimson" }}>
                      {errors.telefono?.message}
                    </Form.Text>
                  )}
                </Col>
              </Form.Group>

              <Row className="mb-3">
                <Form.Group as={Col} controlId="_estDepEdit">
                  <Form.Label style={{ fontWeight: "bold" }}>
                    DEPARTAMENTO:
                  </Form.Label>
                  <Form.Select
                    size="sm"
                    value={estDep}
                    onChange={({ target }) => {
                      setEstDep(target.value);
                      setValue("ubigeo", target.value, {
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
                <Form.Group as={Col} controlId="_estProEdit">
                  <Form.Label style={{ fontWeight: "bold" }}>
                    PROVINCIA:
                  </Form.Label>
                  <Form.Select
                    size="sm"
                    value={estProv}
                    onChange={({ target }) => {
                      setEstProv(target.value);
                      setValue("ubigeo", target.value);
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

                <Form.Group as={Col} controlId="_estDisEdit" className="mt-2">
                  <Form.Label style={{ fontWeight: "bold" }}>
                    DISTRITO:
                  </Form.Label>
                  <Form.Select
                    size="sm"
                    value={estDis}
                    onChange={({ target }) => {
                      setEstDis(target.value);
                      setValue("ubigeo", target.value);
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
                <Form.Group as={Col} lg={4} controlId="_estUbiEdit" className="mt-2">
                  <Form.Label style={{ fontWeight: "bold" }}>
                    UBIGEO:
                  </Form.Label>
                  <Form.Control
                    readOnly
                    size="sm"
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

              <Form.Group as={Row} className="mb-3" controlId="_estDirEdit">
                <Col>
                  <Form.Label style={{ fontWeight: "bold" }}>
                    DIRECCIÓN:
                  </Form.Label>
                  <Col>
                    <Form.Control
                      {...register("direccion", {
                        maxLength: {
                          value: 50,
                          message: "*La dirección es muy larga",
                        },
                      })}
                    />
                    {errors.direccion && (
                      <Form.Text style={{ color: "crimson" }}>
                        {errors.direccion?.message}
                      </Form.Text>
                    )}
                  </Col>
                </Col>
              </Form.Group>

              <Form.Group className="mb-3" controlId="_estColProEdit">
                <Form.Label style={{ fontWeight: "bold" }}>
                  COLEGIO PROCEDENCIA:
                </Form.Label>

                <Form.Control
                  {...register("colegio_procedencia", {
                    maxLength: {
                      value: 50,
                      message: "*El nombre del colegio es muy largo",
                    },
                  })}
                />
                {errors.colegio_procedencia && (
                  <Form.Text style={{ color: "crimson" }}>
                    {errors.colegio_procedencia?.message}
                  </Form.Text>
                )}
              </Form.Group>

              <Form.Group className="mb-3" controlId="_estDesEdit">
                <Form.Label style={{ fontWeight: "bold" }}>
                  DESTREZA:
                </Form.Label>

                <Form.Control
                  as="textarea"
                  placeholder="DESTREZA"
                  {...register("destreza", {
                    maxLength: {
                      value: 150,
                      message: "*Las destrezas son demasiado largas",
                    },
                  })}
                />
                {errors.destreza && (
                  <Form.Text style={{ color: "crimson" }}>
                    {errors.destreza?.message}
                  </Form.Text>
                )}
              </Form.Group>
            </Col>
          </Row>
        </ModalBody>

        <ModalFooter className="d-flex justify-content-end">
          <Form.Group className="BotonGuardar">
            <Button type="submit">GUARDAR</Button>
          </Form.Group>

          <Form.Group className="BotonCancelar">
            <Button
              onClick={() =>
                navigate(`/estudiante`, {
                  replace: true,
                })
              }
            >
              CERRAR
            </Button>
          </Form.Group>
        </ModalFooter>
      </Form>
    </Modal>
  );
};

export default EditarEstudiante;
