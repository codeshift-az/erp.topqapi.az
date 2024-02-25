import { formatDate } from "@/helpers";

interface Props {
  value: string;
}

const DateField = ({ value }: Props) => {
  return value ? formatDate(value) : "";
};

export default DateField;
