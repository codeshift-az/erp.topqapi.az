import { formatDate } from "@/helpers";

interface Props {
  value: string;
}

const DateTimeField = ({ value }: Props) => {
  return value ? formatDate(value, true) : "";
};

export default DateTimeField;
