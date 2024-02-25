import { Link } from "react-router-dom";

// Reactstrap
import { UncontrolledTooltip } from "reactstrap";

interface Props {
  icon: string;
  color: string;
  tooltip: string;
  onClick: () => void;
}

const IconButton = ({ icon, color, tooltip, onClick }: Props) => {
  return (
    <Link to="#" className={`text-${color}`} onClick={onClick}>
      <i className={`mdi ${icon} font-size-18`} id="buttontooltip" />
      <UncontrolledTooltip placement="top" target="buttontooltip">
        {tooltip}
      </UncontrolledTooltip>
    </Link>
  );
};

export default IconButton;
