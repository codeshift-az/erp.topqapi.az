import { Link } from "react-router-dom";

// Reactstrap
import { UncontrolledTooltip } from "reactstrap";

interface Props {
  onClick: () => void;
}

const DeleteButton = ({ onClick }: Props) => {
  return (
    <Link to="#" className="text-danger" onClick={onClick}>
      <i className="mdi mdi-delete font-size-18" id="deletetooltip" />
      <UncontrolledTooltip placement="top" target="deletetooltip">
        Sil
      </UncontrolledTooltip>
    </Link>
  );
};

export default DeleteButton;
