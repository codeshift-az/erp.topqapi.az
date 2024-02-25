import { Link } from "react-router-dom";

interface Props {
  value: boolean;
  trueText?: string;
  falseText?: string;
}

const BooleanField = ({ value, trueText = "Bəli", falseText = "Xeyr" }: Props) => {
  return value ? (
    <Link to="" className={`badge badge-soft-success font-size-11 m-1`}>
      {trueText}
    </Link>
  ) : (
    <Link to="" className={`badge badge-soft-danger font-size-11 m-1`}>
      {falseText}
    </Link>
  );
};

export default BooleanField;
