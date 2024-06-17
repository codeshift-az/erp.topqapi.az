import { useEffect } from "react";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";

// Reactstrap
import { Row, Col, Card, CardBody } from "reactstrap";

// React Table
import { createColumnHelper } from "@tanstack/react-table";

// Components
import DataTable from "@/components/DataTable";
import * as Fields from "@/components/DataTable/Fields";
import * as Filters from "@/components/DataTable/Filters";
import {
  useSorting,
  usePagination,
  useColumnFiltering,
} from "@/components/DataTable/Hooks";

// Types
import { WarehouseItemStats } from "@/types/models";

// Actions
import { getWarehouseItemStats } from "@/store/actions";

const TableContainer = () => {
  // Pagination
  const { page, limit, pagination, onPaginationChange } = usePagination();

  // Sorting
  const { ordering, sorting, onSortingChange } = useSorting();

  // Column Filtering
  const { filters, columnFilters, onColumnFiltersChange } =
    useColumnFiltering();

  // Table data
  const dispatch = useDispatch<AppDispatch>();
  const { update, stats, status, statsCount } = useSelector(
    (state: RootState) => state.warehouseItem
  );

  const fetchItems = () => {
    dispatch(getWarehouseItemStats({ ...filters, page, limit, ordering }));
  };

  useEffect(() => {
    fetchItems();
  }, [columnFilters, pagination, sorting]);

  useEffect(() => {
    if (update) fetchItems();
  }, [update]);

  // Columns
  const columnHelper = createColumnHelper<WarehouseItemStats>();

  const columns = [
    columnHelper.display({
      header: "#",
      enableSorting: false,
      cell: (cell) => {
        return <Fields.IndexField cell={cell} />;
      },
    }),
    columnHelper.accessor("product", {
      header: "Məhsul",
      cell: (cell) => {
        return <Fields.TextField text={cell.row.original.name} length={255} />;
      },
      meta: {
        filterComponent: (column) => <Filters.TextFilter column={column} />,
      },
    }),
    columnHelper.accessor("category", {
      header: "Kateqoriya",
      cell: (cell) => {
        return (
          <Fields.TextField text={cell.row.original.category} length={255} />
        );
      },
      meta: {
        filterComponent: (column) => <Filters.TextFilter column={column} />,
      },
    }),
    columnHelper.accessor("quantity", {
      header: "Ümumi Giriş Miqdarı",
      cell: (cell) => {
        return <Fields.NumberField value={cell.getValue()} />;
      },
    }),
    columnHelper.accessor("sale_count", {
      header: "Ümumi Satış Miqdarı",
      cell: (cell) => {
        return <Fields.NumberField value={cell.getValue()} />;
      },
    }),
    columnHelper.display({
      header: "Qalıq Miqdar",
      enableSorting: false,
      cell: (cell) => {
        return (
          <Fields.NumberField
            value={cell.row.original.quantity - cell.row.original.sale_count}
          />
        );
      },
    }),
  ];

  return (
    <Row>
      <Col xs="12">
        <Card>
          <CardBody>
            <DataTable
              data={stats || []}
              columns={columns}
              loading={
                status.loading &&
                status.lastAction === getWarehouseItemStats.typePrefix
              }
              // Pagination
              pagination={pagination}
              onPaginationChange={onPaginationChange}
              pageCount={Math.ceil(statsCount / limit)}
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
