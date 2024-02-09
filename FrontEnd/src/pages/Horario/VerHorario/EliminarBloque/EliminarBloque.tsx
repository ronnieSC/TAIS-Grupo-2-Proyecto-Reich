import { Modal, Button, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import {
  useLocation,
  useNavigate,
  useRouteLoaderData,
  useSubmit,
} from "react-router-dom";
import { Form } from "react-bootstrap";
import { useEffect, useState } from "react";
import horarioApi from "../../../../api/horario.api";
import {
  BloqueHorario,
  InformacionBloques,
} from "../../../../utilities/HorarioTipo";

const EliminarBloque = () => {
  const submit = useSubmit();
  const navigate = useNavigate();
  const { state } = useLocation();

  const { BloqueApi } = useRouteLoaderData("VerHorarios") as InformacionBloques;

  const [bloquesData, setBloquesData] = useState<BloqueHorario>();
  const horaInicio = [
    "08:00",
    "08:20",
    "08:35",
    "09:30",
    "10:25",
    "10:55",
    "11:50",
    "12:40",
    "13:20",
    "14:15",
  ];

  useEffect(() => {
    const fetchData = async () => {
      const codigo_hora = horaInicio[state.hour];

      const matchingBlock = BloqueApi.find(
        (block: any) =>
          block.codigo_dia - 1 === state.day &&
          block.hora_inicio === codigo_hora &&
          block.codigo_horario === state.idHorario
      );

      if (matchingBlock) {
        setBloquesData(matchingBlock);
      } else {
        console.log("entro al else desetBloqueData");
      }
    };
    fetchData();
  }, []);

  const onSubmit = async (e: any) => {
    e.preventDefault();

    submit(
      { idBloque: bloquesData!.id! },
      {
        action: `/horarios/ver/${state.idHorario}`,
        method: "delete",
      }
    );

    try {
      await horarioApi.eliminar_bloque(bloquesData?.id ?? 0).then(() => {
        console.log("Bloque eliminado exitosamente");
      });
    } catch (exception) {
      console.log("Ocurrio un error al eliminar el bloque");
    }
  };

  return (
    <Modal isOpen={true} centered>
      <Form id="from_eliminar_contrato" onSubmit={(e) => onSubmit(e)}>
        <ModalHeader className="modal-header-custom">
          <div className="d-flex justify-content-between align-items-center">
            <h6 className="mb-0" style={{ fontWeight: "bold" }}>
              ELIMINAR CURSO
            </h6>
          </div>
        </ModalHeader>
        <ModalBody>
          <span>¿Seguro que quieres eliminar este Curso ?</span>
        </ModalBody>
        <ModalFooter className="d-flex justify-content-end">
          <Form.Group>
            <Button id="_conEliBtnCan" onClick={() => navigate(-1)}>
              CANCELAR
            </Button>
          </Form.Group>
          <Form.Group className="BotonCancelar">
            <Button id="_conEliBtnSub" type="submit">
              SÍ, ELIMINAR BLOQUE
            </Button>
          </Form.Group>
        </ModalFooter>
      </Form>
    </Modal>
  );
};

export default EliminarBloque;
