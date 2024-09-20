import { useEffect } from "react";
import { Link } from "react-router-dom";

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
import { WarehouseItem } from "@/types/models";

// Actions
import { getWarehouseItemAllStats, getWarehouseItems } from "@/store/actions";

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
  const { update, items, status, count, allStats } = useSelector(
    (state: RootState) => state.warehouseItem
  );

  const fetchItems = () => {
    dispatch(getWarehouseItems({ ...filters, page, limit, ordering }));
    dispatch(getWarehouseItemAllStats(filters));
  };

  useEffect(() => {
    fetchItems();
  }, [columnFilters, pagination, sorting]);

  useEffect(() => {
    if (update) fetchItems();
  }, [update]);

  // Columns
  const columnHelper = createColumnHelper<WarehouseItem>();

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
    columnHelper.accessor("category", {
      header: "Kateqoriya",
      cell: (cell) => {
        return (
          <Fields.TextField text={cell.row.original.product.category.name} />
        );
      },
      meta: {
        filterComponent: (column) => <Filters.TextFilter column={column} />,
      },
    }),
    columnHelper.accessor("supplier", {
      header: "Firma",
      cell: (cell) => {
        return (
          <Link to={`/suppliers/${cell.getValue().id}/transactions`}>
            <Fields.TextField text={cell.getValue().name} length={255} />
          </Link>
        );
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
      header: "Giriş Miqdarı",
      cell: (cell) => {
        return <Fields.NumberField value={cell.getValue()} />;
      },
      footer: () => {
        return <Fields.NumberField value={allStats?.total_quantity || 0} />;
      },
    }),
    columnHelper.accessor("sale_count", {
      header: "Satış Miqdarı",
      cell: (cell) => {
        return <Fields.NumberField value={cell.getValue()} />;
      },
      footer: () => {
        return <Fields.NumberField value={allStats?.total_sale_count || 0} />;
      },
    }),
    columnHelper.display({
      header: "Qalıq",
      enableSorting: false,
      cell: (cell) => {
        return (
          <Fields.NumberField
            value={
              Number(cell.row.original.quantity) - cell.row.original.sale_count
            }
          />
        );
      },
      footer: () => {
        return (
          <Fields.NumberField
            value={
              (allStats?.total_quantity || 0) -
              (allStats?.total_sale_count || 0)
            }
          />
        );
      },
    }),
    columnHelper.display({
      header: "Cəm",
      enableSorting: false,
      cell: (cell) => {
        return (
          <Fields.PriceField
            amount={
              Number(cell.row.original.price) * cell.row.original.quantity
            }
          />
        );
      },
      footer: () => {
        return <Fields.PriceField amount={allStats?.total_investment || 0} />;
      },
    }),
    columnHelper.display({
      header: "Qalıq Pul",
      enableSorting: false,
      cell: (cell) => {
        return (
          <Fields.PriceField
            amount={
              Number(cell.row.original.price) *
              (Number(cell.row.original.quantity) -
                cell.row.original.sale_count)
            }
          />
        );
      },
      footer: () => {
        return (
          <Fields.PriceField amount={allStats?.total_investment_left || 0} />
        );
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
      cell: (cell) => {
        return (
          <Fields.Actions
            data={cell.row.original}
            onView={`/warehouse/entries/${cell.row.original.entry}`}
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
              data={items || []}
              columns={columns}
              loading={
                status.loading &&
                status.lastAction === getWarehouseItems.typePrefix
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
