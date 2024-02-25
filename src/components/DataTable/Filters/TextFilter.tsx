// Reactstrap
import { Input } from "reactstrap";

// React Table
import { Column } from "@tanstack/react-table";

interface TextFilterProps {
  column: Column<any, string>;
}

export const TextFilter = ({ column }: TextFilterProps) => {
  return (
    <Input
      value={(column.getFilterValue() as string) || ""}
      onChange={(e) => {
        column.setFilterValue(e.target.value || undefined);
      }}
      placeholder={`Axtar...`}
    />
  );
};
