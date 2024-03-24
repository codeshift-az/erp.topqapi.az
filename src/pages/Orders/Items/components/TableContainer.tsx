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
import { usePagination, useSorting, useColumnFiltering } from "@/components/DataTable/Hooks";

// Types
import { OrderItem } from "@/types/models";

// Actions
import { getOrderItems } from "@/store/actions";

const TableContainer = () => {
  // Pagination
  const { page, limit, pagination, onPaginationChange } = usePagination();

  // Sorting
  const { ordering, sorting, onSortingChange } = useSorting();

  // Column Filtering
  const { filters, columnFilters, onColumnFiltersChange } = useColumnFiltering();

  // Table data
  const dispatch = useDispatch<AppDispatch>();
  const { update, items, status, count } = useSelector((state: RootState) => state.orderItem);

  const fetchItems = () => {
    dispatch(getOrderItems({ ...filters, page, limit, ordering }));
  };

  useEffect(() => {
    fetchItems();
  }, [columnFilters, pagination, sorting]);

  useEffect(() => {
    if (update) fetchItems();
  }, [update]);

  // Columns
  const columnHelper = createColumnHelper<OrderItem>();

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
        return <Fields.TextField text={cell.getValue().name} length={255} />;
      },
      meta: {
        filterComponent: (column) => <Filters.TextFilter column={column} />,
      },
    }),
    columnHelper.display({
      id: "category",
      header: "Kateqoriya",
      cell: (cell) => {
        return <Fields.TextField text={cell.row.original.product.category.name} length={255} />;
      },
      meta: {
        filterComponent: (column) => <Filters.TextFilter column={column} />,
      },
    }),
    columnHelper.accessor("price", {
      header: "Qiymət",
      cell: (cell) => {
        return <Fields.PriceField amount={cell.getValue()} />;
      },
    }),
    columnHelper.accessor("quantity", {
      header: "Satış Miqdarı",
      cell: (cell) => {
        return <Fields.NumberField value={cell.getValue()} />;
      },
    }),
    columnHelper.display({
      header: "Cəm",
      enableSorting: false,
      cell: (cell) => {
        return <Fields.PriceField amount={cell.row.original.price * cell.row.original.quantity} />;
      },
    }),
    columnHelper.accessor("date", {
      header: "Satış Tarixi",
      cell: (cell) => {
        return <Fields.DateField value={cell.getValue()} />;
      },
      meta: {
        filterComponent: (column) => <Filters.DateRangeFilter column={column} />,
      },
    }),
  ];

  return (
    <Row>
      <Col xs="12">
        <Card>
          <CardBody>
            <DataTable
              data={items || []}
              columns={columns}
              loading={status.loading && status.lastAction === getOrderItems.typePrefix}
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
