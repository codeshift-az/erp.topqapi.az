import { Link } from "react-router-dom";

// Reactstrap
import { UncontrolledTooltip } from "reactstrap";

interface Props {
  onClick: () => void;
}

const EditButton = ({ onClick }: Props) => {
  return (
    <Link to="#" className="text-success" onClick={onClick}>
      <i className="mdi mdi-pencil font-size-18" id="edittooltip" />
      <UncontrolledTooltip placement="top" target="edittooltip">
        Redaktə et
      </UncontrolledTooltip>
    </Link>
  );
};

export default EditButton;
