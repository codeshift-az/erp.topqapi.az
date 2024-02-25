import { CellContext } from "@tanstack/react-table";

interface Props {
  cell: CellContext<any, any>;
}

const IndexField = ({ cell }: Props) => {
  const pagination = cell.table.getState().pagination;
  return <b>{cell.row.index + pagination.pageIndex * pagination.pageSize + 1}</b>;
};

export default IndexField;
