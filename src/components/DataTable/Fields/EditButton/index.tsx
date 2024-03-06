// Reactstrap
import { UncontrolledTooltip } from "reactstrap";

interface Props {
  onClick: () => void;
}

const EditButton = ({ onClick }: Props) => {
  return (
    <a role="button" className="text-success" onClick={onClick}>
      <i className="mdi mdi-pencil font-size-18" id="edittooltip" />
      <UncontrolledTooltip placement="top" target="edittooltip">
        Redaktə et
      </UncontrolledTooltip>
    </a>
  );
};

export default EditButton;
