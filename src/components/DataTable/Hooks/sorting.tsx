import { useState } from "react";

export function useSorting(initialField = "updated_at", initialOrder = "DESC") {
  const [sorting, setSorting] = useState([{ id: initialField, desc: initialOrder === "DESC" }]);

  return {
    sorting,
    onSortingChange: setSorting,
    ordering: sorting.map((sort) => `${sort.desc ? "-" : ""}${sort.id}`).join(","),
  };
}
