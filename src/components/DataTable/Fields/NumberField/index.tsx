interface Props {
  value: number;
}

const NumberField = ({ value }: Props) => {
  return <span>{value}</span>;
};

export default NumberField;
