import { formatPrice } from "@/helpers";

interface Props {
  amount: number | string;
  currency?: string;
}

const PriceField = ({ amount, currency = "AZN" }: Props) => {
  return <span>{formatPrice(amount, currency)}</span>;
};

export default PriceField;
