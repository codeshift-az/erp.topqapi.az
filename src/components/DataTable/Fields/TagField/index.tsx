import { Link } from "react-router-dom";

interface Props {
  value: string;
  color?: string;
  url?: string;
}

const TagField = ({ value, color = "primary", url = "" }: Props) => {
  return (
    <Link to={url} className={`badge badge-soft-${color} font-size-11 m-1`}>
      {value}
    </Link>
  );
};

export default TagField;
