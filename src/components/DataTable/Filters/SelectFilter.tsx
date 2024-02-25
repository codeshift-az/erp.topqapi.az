// React Table
import { Column } from "@tanstack/react-table";

interface SelectFilterProps {
  column: Column<any, any>;
  options: {
    value: string | number;
    label: string;
  }[];
}

export const SelectFilter = ({ column, options }: SelectFilterProps) => {
  return (
    <select
      id="custom-select"
      className="form-select"
      value={column.getFilterValue() as number}
      onChange={(e) => {
        column.setFilterValue(e.target.value || undefined);
      }}>
      <option value="">Seç...</option>

      {options.map((option, index) => (
        <option key={index} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};
