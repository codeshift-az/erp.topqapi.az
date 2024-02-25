interface Props {
  text: string;
}

const TextField = ({ text }: Props) => {
  return text ? (text.length > 20 ? text.substring(0, 20) + "..." : text) : "";
};

export default TextField;
