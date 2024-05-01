// Redux
import { useSelector } from "react-redux";
import { RootState } from "@/store";

// Reactstrap
import { UncontrolledTooltip } from "reactstrap";

// Helpers
import { hasPermission } from "@/helpers";

interface Props {
  onClick: () => void;
}

const DeleteButton = ({ onClick }: Props) => {
  const { user } = useSelector((state: RootState) => state.account);

  if (!hasPermission(user, [], true)) return null;

  return (
    <a role="button" className="text-danger" onClick={onClick}>
      <i className="mdi mdi-delete font-size-18" id="deletetooltip" />
      <UncontrolledTooltip placement="top" target="deletetooltip">
        Sil
      </UncontrolledTooltip>
    </a>
  );
};

export default DeleteButton;
