import "./Ingreso.css";
import { useForm } from "react-hook-form";
import logoReich from "../../assets/logo.png";
import { Container, Form, InputGroup, Button, Row, Col } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import { AiOutlineUser } from "react-icons/ai";
import { Si1Password } from "react-icons/si";
import CredencialesApi, { Usuario } from "../../api/credenciales.api";
import { AxiosError } from "axios";
import { Respuesta_Error_Credenciales } from "../../utilities/UsuarioTipos";

type FormValues = {
  usuario: string;
  contraseña: string;
};

const Ingreso: React.FC = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = handleSubmit(async (data: FormValues) => {
    const usuario: Usuario = {
      usuario: data.usuario,
      contraseña: data.contraseña,
    };

    await CredencialesApi.obtener_credenciales(usuario)
      .then(() => {
        navigate("/");
        window.location.reload();
      })
      .catch((error: AxiosError) => {
        if (error.response && error.response.data) {
          const data = error.response.data as Respuesta_Error_Credenciales;
          setError("contraseña", {
            type: "custom",
            message: data.detail,
          });
        }
      });
  });

  return (
    <Container fluid className="vh-100">
      <Row className="vh-100">
        <Col className="logoCol" xs={12} md={6}>
          <Image
            src={logoReich}
            className="float logo-imagen"
            alt="Reich Logo"
            fluid
          />
        </Col>
        <Col className="formCol" xs={12} md={6}>
          <Card style={{ width: "35rem" }}>
            <Form id="_accForm" onSubmit={onSubmit}>
              <Row className="m-5">
                <InputGroup className="">
                  <InputGroup.Text
                    id="icon_usuario"
                    className="justify-content-center"
                  >
                    <AiOutlineUser />
                  </InputGroup.Text>

                  <Form.Control
                    id="_accUsu"
                    placeholder="Usuario"
                    autoComplete="usuario"
                    aria-describedby="icon_usuario"
                    {...register("usuario", {
                      required: "Por favor, ingrese un usuario",
                    })}
                  />
                </InputGroup>
                {errors.usuario && (
                  <Form.Text as={Col} style={{ color: "crimson" }}>
                    {errors.usuario?.message}
                  </Form.Text>
                )}
              </Row>

              <Row className="m-5">
                <InputGroup>
                  <InputGroup.Text
                    id="icon_usuario"
                    className="justify-content-center"
                  >
                    <Si1Password />
                  </InputGroup.Text>

                  <Form.Control
                    className="form-control"
                    type="password"
                    id="_accPass"
                    placeholder="Contraseña"
                    autoComplete="current-password"
                    {...register("contraseña", {
                      required: "Por favor, ingrese una contraseña",
                    })}
                  />
                </InputGroup>
                {errors.contraseña && (
                  <Form.Text style={{ color: "crimson" }}>
                    {errors.contraseña?.message}
                  </Form.Text>
                )}
              </Row>

              <Row className="">
                <div className="d-grid gap-2">
                  <Button type="submit" variant="danger" className="">
                    Ingresar
                  </Button>
                </div>
              </Row>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Ingreso;
