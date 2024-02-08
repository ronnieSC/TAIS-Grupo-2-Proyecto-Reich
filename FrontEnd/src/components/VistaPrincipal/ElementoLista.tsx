import { ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import { VscDebugBreakpointLogUnverified } from "react-icons/vsc";

function ElementoLista(props: any) {
  return (
    <Link className="text-decoration-none text-reset" to={props.link}>
      <ListGroup.Item className="list-group-item-action border-0 ">
        <VscDebugBreakpointLogUnverified className="me-3" />
        <span className="">{props.nombre}</span>
      </ListGroup.Item>
    </Link>
  );
}

export default ElementoLista;
