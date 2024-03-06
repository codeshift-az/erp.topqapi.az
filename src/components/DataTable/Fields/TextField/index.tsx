interface Props {
  text: string;
  length?: number;
}

const TextField = ({ text, length = 20 }: Props) => {
  return text ? (text.length > length ? text.substring(0, length) + "..." : text) : "";
};

export default TextField;
