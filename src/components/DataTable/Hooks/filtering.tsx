import { useState } from "react";

// React Table Types
import { ColumnFiltersState } from "@tanstack/react-table";

export function useColumnFiltering() {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const filters: any = {};

  columnFilters.forEach((filter) => {
    filters[filter.id] = filter.value;
  });

  return {
    columnFilters,
    onColumnFiltersChange: setColumnFilters,
    filters,
  };
}
