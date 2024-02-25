// React Table
import { Column } from "@tanstack/react-table";

//Import Flatepicker
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_blue.css";

interface DateRangeFilterProps {
  column: Column<any, string>;
}

export const DateRangeFilter = ({ column }: DateRangeFilterProps) => {
  return (
    <Flatpickr
      className="form-control d-block"
      placeholder="dd M,yyyy"
      value={(column.getFilterValue() as Date[]) || ""}
      onChange={(date) => {
        column.setFilterValue(date || undefined);
      }}
      options={{
        mode: "range",
        dateFormat: "Y-m-d",
      }}
    />
  );
};
