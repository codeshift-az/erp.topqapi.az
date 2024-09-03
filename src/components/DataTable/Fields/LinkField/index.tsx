import { Link } from "react-router-dom";

interface Props {
  text: string;
  url: string;
}

const LinkField = ({ text, url }: Props) => {
  return <Link to={url}>{text}</Link>;
};

export default LinkField;
