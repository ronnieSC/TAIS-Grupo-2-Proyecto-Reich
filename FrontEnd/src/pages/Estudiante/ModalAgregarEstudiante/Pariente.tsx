// AgregarAlumnos.tsx
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import "./Pariente.css"; // Importa el archivo de estilos personalizados
import {
  Modal,
  Button,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
} from "reactstrap";
import { Table, Form } from "react-bootstrap";
import {
  Outlet,
  useActionData,
  useLoaderData,
  useNavigate,
  useParams,
} from "react-router-dom";
import { ParienteEntidad } from "../../../utilities/ParienteTipos";
import { Errors } from "../../../utilities/utils";
import { useEffect } from "react";
import toast from "react-hot-toast";

const Pariente = () => {
  const navigate = useNavigate();
  const parientes = useLoaderData() as ParienteEntidad[];
  let params = useParams();
  const actionData = useActionData() as Errors;

  useEffect(() => {
    if (actionData !== undefined && actionData.ok) {
      switch (actionData.status) {
        case 201: {
          toast.success("Se creo exitosamente el pariente");
          return;
        }
        case 200: {
          toast.success("Se actualizo exitosamente el pariente");
          return;
        }
        case 204: {
          toast.success("Se elimino exitosamente el pariente");
          return;
        }
        default: {
          return;
        }
      }
    } else if (actionData !== undefined && !actionData.ok) {
      switch (actionData.status) {
        case 500: {
          for (const key in actionData.errors) {
            if (actionData.errors.hasOwnProperty(key)) {
              const error = actionData.errors[key];
              toast.error(`Ocurrio algo en el servidor: ${error}`);
            }
          }
          return;
        }
        case 400: {
          for (const key in actionData.errors) {
            if (actionData.errors.hasOwnProperty(key)) {
              const error = actionData.errors[key];
              if (key === "apoderado") {
                for (const key in actionData.errors.apoderado) {
                  if (actionData.errors.apoderado.hasOwnProperty(key)) {
                    const errorApo = actionData.errors.apoderado[key];
                    toast.error(`No se pudo realizar: ${errorApo}`);
                  }
                }
              } else {
                toast.error(`No se pudo realizar: ${error}`);
              }
            }
          }
          return;
        }
      }
    }
  }, [actionData]);

  /*Para filtrar datos*/
  const filtrarDatos = parientes;

  return (
    <>
      <Modal isOpen={true} size="lg" centered>
        <ModalHeader className="modal-header-custom">
          <div className="d-flex justify-content-between align-items-center">
            <h6 className="mb-0">AGREGAR PARIENTES</h6>
          </div>
        </ModalHeader>
        <ModalBody>
          <FormGroup
            className="BotonNuevoFamiliar mt-3"
            style={{ textAlign: "right" }}
          >
            <Button
              onClick={() => navigate(`agregar/${params?.contratoId}`)}
              style={{ marginTop: "-2%", marginBottom: "2%" }}
            >
              AÑADIR NUEVO
            </Button>
          </FormGroup>

          <FormGroup
            className="Tabla"
            style={{
              height: "300px",
              overflowY: "auto",
              marginTop: "0%",
              paddingRight: "0%",
              paddingLeft: "0%",
            }}
          >
            {/* TABLA DE ESTUDIANTES  */}
            <Table striped responsive>
              <thead>
                <tr>
                  <th>NOMBRES Y APELLIDOS</th>
                  <th>PARENTESCO</th>
                  <th style={{ textAlign: "center" }}>ACCIONES</th>
                </tr>
              </thead>
              <tbody>
                {filtrarDatos.slice().map((pariente, index) => (
                  <tr key={index}>
                    <td>{`${pariente.apoderado.primer_nombre} ${
                      pariente.apoderado.segundo_nombre
                        ? pariente.apoderado.segundo_nombre
                        : ""
                    } ${pariente.apoderado.apellido_paterno} ${
                      pariente.apoderado.apellido_materno
                    }`}</td>
                    <td>{`${pariente.parentesco.toUpperCase()}`}</td>
                    <td style={{ textAlign: "center" }}>
                      <Form.Group className="Boton">
                        <Button
                          onClick={() =>
                            navigate(`ver/${pariente.apoderado.id}`)
                          }
                        >
                          <FaEye />
                        </Button>{" "}
                        <Button
                          onClick={() =>
                            navigate(`editar/${pariente.apoderado.id}`)
                          }
                        >
                          <FaEdit />
                        </Button>{" "}
                        <Button
                          onClick={() => navigate(`eliminar/${pariente.id}`)}
                          style={{ background: "#702828", color: "white" }}
                        >
                          <FaTrash />
                        </Button>
                      </Form.Group>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </FormGroup>
        </ModalBody>
        <ModalFooter className="d-flex justify-content-end">
          <FormGroup className="BotonCancelar">
            <Button onClick={() => navigate(`/estudiante`, { replace: true })}>
              CANCELAR
            </Button>
          </FormGroup>
        </ModalFooter>
      </Modal>
      <Outlet />
    </>
  );
};

export default Pariente;
