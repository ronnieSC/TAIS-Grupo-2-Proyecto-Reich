import { useNavigate, useSubmit } from "react-router-dom";
import './NuevoHorario.css';
import { Modal, Button, ModalHeader, ModalBody, ModalFooter, Row} from 'reactstrap';
import { useState } from "react";
import {HorarioNuevo } from "../../../utilities/HorarioTipo";
import { useForm } from "react-hook-form";
import { Form } from "react-bootstrap";


const NuevoHorario = () => {
  const [nivelH, setNivelH] = useState<string>("0");
  const navigate = useNavigate();
  
  const {
    register,
    trigger,
    getValues,
    formState: {},
  } = useForm<HorarioNuevo>();
  const submit = useSubmit();

  const onSubmit = async (e: any) => {
    e.preventDefault();
    const isValid = await trigger();
    
    if (isValid) {
      const values = getValues();
      const valuesSerialized = JSON.stringify(values);
      submit(
        { values: valuesSerialized },
        {
          action: "/horarios",
          method: "post",
        }
      );
    }
  };
  
  return (
    <>
      <Modal isOpen={true} size="sm" centered>
        <Form id="horario_crear_form" onSubmit={(e) => onSubmit(e)}>
          <ModalHeader
            className="modal-header-custom"
            style={{ fontWeight: "bold" }}
          >
            <div className="d-flex justify-content-between align-items-center">
              <h6 className="mb-0">NUEVO HORARIO</h6>
            </div>
          </ModalHeader>
          <ModalBody>
            <Row >
              <Form.Group as={Row} controlId = "_nivelNom">
                <Form.Label lg="5" column style={{ fontWeight: "bold" }}>
                  NIVEL
                </Form.Label>
                <Form.Select
                  {...register("codigo_nivel", {
                    required: "*Requerido",
                  })}
                  onChange={(e) => setNivelH(e.target.value)}
                >
                  <option value="0">SELECCIONAR NIVEL</option>
                  <option value="1">PRIMARIA</option>
                  <option value="2">SECUNDARIA</option>
                </Form.Select>

              </Form.Group>

              <Form.Group as={Row} controlId = "_gradoNom">
                <Form.Label lg="5" column style={{ fontWeight: "bold" }}>
                  GRADO
                </Form.Label>
                <Form.Select
                  {...register("codigo_grado", {
                    required: "*Requerido",
                  })}
                  
                >
                  <option value="0">SELECCIONAR GRADO</option>
                  {nivelH === "1" ? (
                    <>
                    <option value="6">6TO</option>
                    </>
                  ):(
                    <>
                      <option value="1">1RO</option>
                      <option value="2">2RO</option>
                      <option value="3">3RO</option>
                      <option value="4">4RO</option>
                      <option value="5">5RO</option>
                    </>
                  )}  
                </Form.Select>

              </Form.Group>
            </Row>
          </ModalBody>

          <ModalFooter className="d-flex justify-content-end">
            <Form.Group className="BotonCrear">
              <Button type="submit">
                CREAR
              </Button>
            </Form.Group>
            <Form.Group className="BotonCancelar">
              <Button 
                id="_horBtnCan"
                onClick={() =>
                  navigate(`/horarios`, {
                    replace: true,
                  })
                }
              >CERRAR</Button>
            </Form.Group>
          </ModalFooter>         
        </Form>
      </Modal>
    </>
  );
};

export default NuevoHorario;