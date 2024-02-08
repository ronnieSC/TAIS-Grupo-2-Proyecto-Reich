import { useNavigate, useRouteLoaderData, useSubmit } from "react-router-dom";
import {
  AgregarEstudiante,
  InformacionClase,
} from "../../../utilities/ClaseTipos";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { Form, Row, Table } from "react-bootstrap";
import { useForm } from "react-hook-form";

const QuitarEstudiante = () => {
  const navigate = useNavigate();
  const submit = useSubmit();

  const { clase, estudiantes, clase_estudiantes } = useRouteLoaderData(
    "clase_estudiantes"
  ) as AgregarEstudiante;
  const { informacion } = useRouteLoaderData("claseRaiz") as InformacionClase;

  const { register, getValues, trigger } = useForm<{ estudiantes: number[] }>({
    defaultValues: {
      estudiantes: [],
    },
  });

  const estudiantes_grado = estudiantes.filter(
    (estudiante) => estudiante.grado_codigo === clase.grado_codigo
  );

  const estudiantes_selectos = estudiantes_grado.filter((estudiantes) =>
    clase.estudiantes.some((tmp) => tmp.id === estudiantes.id)
  );

  const onSubmit = async (e: any) => {
    e.preventDefault();
    const isValid = await trigger();
    if (isValid) {
      const values = getValues();
      const valuesSerialized = JSON.stringify(values.estudiantes);
      submit(
        { values: valuesSerialized },
        {
          action: `/clase/estudiantes/${clase.id}`,
          method: `delete`,
        }
      );
    }
  };

  return (
    <Modal isOpen={true} size="lg" centered>
      <Form id="from_añadir_estudiante" onSubmit={(e) => onSubmit(e)}>
        <ModalHeader className="modal-header-custom">
          <div className="d-flex justify-content-between align-items-center">
            <h6 className="mb-0">
              QUITAR ESTUDIANTES DE LA CLASE DE{" "}
              {informacion.grados.find((item) => item.id == clase?.grado_codigo)
                ?.grado + " - GRADO"}
            </h6>
          </div>
        </ModalHeader>
        <ModalBody>
          <Form.Group as={Row}>
            <Form.Label column lg={6}>
              <h6 style={{ fontWeight: "bold" }}>ESTUDIANTES:</h6>
            </Form.Label>

            <Table striped responsive>
              <thead>
                <tr>
                  <th>NOMBRE</th>
                  <th>¿QUITAR?</th>
                </tr>
              </thead>
              <tbody>
                {estudiantes_selectos.length > 0 ? (
                  estudiantes_selectos.map((estudiante, index) => (
                    <tr key={index}>
                      <td>
                        {`${estudiante.primer_nombre} ${estudiante.segundo_nombre} ${estudiante.apellido_paterno} ${estudiante.apellido_materno}`}
                      </td>
                      <td>
                        <Form.Check
                          inline
                          id="_conApoFirNo"
                          type="checkbox"
                          value={
                            clase_estudiantes.find(
                              (item) =>
                                item.clase_codigo === clase.id &&
                                item.estudiante_codigo == estudiante.id
                            )?.id
                          }
                          {...register("estudiantes")}
                        />
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={2} className="sin-resultados-mensaje">
                      NO HAY ESTUDIANTES INSCRITOS EN LA CLASE
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </Form.Group>
        </ModalBody>
        <ModalFooter className="d-flex justify-content-end">
          <Form.Group className="BotonGuardar">
            <Button id="_claAgrEstBtnSub" type="submit">
              QUITAR
            </Button>
          </Form.Group>
          <Form.Group className="BotonCancelar">
            <Button
              id="_claAgrEstBtnCan"
              onClick={() =>
                navigate(`/clase/estudiantes/${clase.id}`, {
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

export default QuitarEstudiante;
