import { useEffect } from "react";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";

// Reactstrap
import { Row, Col, Card, CardBody, Button } from "reactstrap";

// React Table
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";

// Components
import DataTable from "@/components/DataTable";
import * as Fields from "@/components/DataTable/Fields";
import * as Filters from "@/components/DataTable/Filters";
import {
  usePagination,
  useSorting,
  useColumnFiltering,
} from "@/components/DataTable/Hooks";

// Constants
import { USER_ROLES } from "@/constants";

// Types
import { Expense } from "@/types/models";

// Actions
import { getExpenses } from "@/store/actions";

interface Props {
  onCreate: () => void;
  onUpdate: (data: Expense) => void;
  onDelete: (data: Expense) => void;
}

const TableContainer = ({ onCreate, onUpdate, onDelete }: Props) => {
  // Pagination
  const { page, limit, pagination, onPaginationChange } = usePagination();

  // Sorting
  const { ordering, sorting, onSortingChange } = useSorting();

  // Column Filtering
  const { filters, columnFilters, onColumnFiltersChange } =
    useColumnFiltering();

  // User
  const { user } = useSelector((state: RootState) => state.account);

  // Table data
  const dispatch = useDispatch<AppDispatch>();
  const { items, count, update, status } = useSelector(
    (state: RootState) => state.expense
  );

  const fetchItems = () => {
    if (user?.type === USER_ROLES.STORE) {
      dispatch(
        getExpenses({
          ...filters,
          page,
          limit,
          ordering,
          branch_id: user.branch.id,
        })
      );
      return;
    }
    dispatch(getExpenses({ ...filters, page, limit, ordering }));
  };

  useEffect(() => {
    fetchItems();
  }, [columnFilters, pagination, sorting]);

  useEffect(() => {
    if (update) fetchItems();
  }, [update]);

  // Columns
  const columnHelper = createColumnHelper<Expense>();

  const columns: ColumnDef<Expense, any>[] = [
    columnHelper.display({
      header: "#",
      enableSorting: false,
      cell: (cell) => {
        return <Fields.IndexField cell={cell} />;
      },
    }),
    columnHelper.accessor("name", {
      header: "Ad",
      cell: (cell) => {
        return <Fields.TextField text={cell.getValue()} length={255} />;
      },
      meta: {
        filterComponent: (column) => <Filters.TextFilter column={column} />,
      },
    }),
    columnHelper.accessor("amount", {
      header: "Məbləğ",
      cell: (cell) => {
        return <Fields.PriceField amount={cell.getValue()} />;
      },
    }),
    columnHelper.accessor("date", {
      header: "Tarix",
      cell: (cell) => {
        return <Fields.DateField value={cell.getValue()} />;
      },
      meta: {
        filterComponent: (column) => (
          <Filters.DateRangeFilter column={column} />
        ),
      },
    }),
    columnHelper.display({
      header: "Əməliyyatlar",
      enableSorting: false,
      cell: (cell) => {
        return (
          <Fields.Actions
            data={cell.row.original}
            onUpdate={onUpdate}
            onDelete={onDelete}
          />
        );
      },
    }),
  ];

  if (user?.type != USER_ROLES.STORE) {
    const branchColumn = columnHelper.accessor("branch", {
      header: "Filial",
      id: "branch",
      cell: (cell) => {
        return <Fields.TextField text={cell.getValue().name} />;
      },
      meta: {
        filterComponent: (column) => <Filters.TextFilter column={column} />,
      },
    });

    columns.splice(2, 0, branchColumn);
  }

  return (
    <Row>
      <Col xs="12">
        <Card>
          <CardBody>
            <DataTable
              data={items || []}
              columns={columns}
              controls={
                <Button
                  color="primary"
                  className="mb-2 me-2"
                  onClick={onCreate}>
                  <i className={`mdi mdi-plus-circle-outline me-1`} />
                  Əlavə et
                </Button>
              }
              loading={
                status.loading && status.lastAction === getExpenses.typePrefix
              }
              // Pagination
              pagination={pagination}
              onPaginationChange={onPaginationChange}
              pageCount={Math.ceil(count / limit)}
              // Sorting
              sorting={sorting}
              onSortingChange={onSortingChange}
              // Filtering
              columnFilters={columnFilters}
              onColumnFiltersChange={onColumnFiltersChange}
            />
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};

export default TableContainer;
