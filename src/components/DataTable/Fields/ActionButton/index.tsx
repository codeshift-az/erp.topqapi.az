import { Link } from "react-router-dom";

// Reactstrap
import { UncontrolledTooltip } from "reactstrap";

interface Props {
  icon: string;
  name: string;
  url?: string;
  color: "danger" | "primary" | "success" | "warning";
  tooltip: string;
  hasPermission?: boolean;
  onClick?: () => void;
}

const ActionButton = ({
  url,
  name,
  icon,
  color,
  tooltip,
  hasPermission = true,
  onClick,
}: Props) => {
  if (!hasPermission) return null;

  return (
    <Link to={url || "#"} className={`text-${color}`} onClick={onClick}>
      <i className={`mdi ${icon} font-size-18`} id={`${name}-tooltip`} />
      <UncontrolledTooltip placement="top" target={`${name}-tooltip`}>
        {tooltip}
      </UncontrolledTooltip>
    </Link>
  );
};

export default ActionButton;
