interface Props {
  amount: number | string;
  currency?: string;
}

const PriceField = ({ amount, currency = "AZN" }: Props) => {
  return (
    <span>
      {Number(amount).toFixed(2)} {currency}
    </span>
  );
};

export default PriceField;
