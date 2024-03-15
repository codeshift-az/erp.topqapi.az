import { useEffect } from "react";
import { Link } from "react-router-dom";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";

// Reactstrap
import { Row, Col, Card, CardBody, UncontrolledTooltip } from "reactstrap";

// React Table
import { createColumnHelper } from "@tanstack/react-table";

// Components
import DataTable from "@/components/DataTable";
import * as Fields from "@/components/DataTable/Fields";
import * as Filters from "@/components/DataTable/Filters";
import { usePagination, useSorting, useColumnFiltering } from "@/components/DataTable/Hooks";

// Constants
import { ORDER_STATUS_LABELS } from "@/constants";

// Types
import { Order } from "@/types/models";

// Actions
import { getOrders } from "@/store/actions";

const TableContainer = () => {
  // Pagination
  const { page, limit, pagination, onPaginationChange } = usePagination();

  // Sorting
  const { ordering, sorting, onSortingChange } = useSorting();

  // Column Filtering
  const { filters, columnFilters, onColumnFiltersChange } = useColumnFiltering();

  // Table data
  const dispatch = useDispatch<AppDispatch>();
  const { update, items, status, count } = useSelector((state: RootState) => state.order);

  const fetchItems = () => {
    dispatch(getOrders({ ...filters, page, limit, ordering }));
  };

  useEffect(() => {
    fetchItems();
  }, [columnFilters, pagination, sorting]);

  useEffect(() => {
    if (update) fetchItems();
  }, [update]);

  // Columns
  const columnHelper = createColumnHelper<Order>();

  const columns = [
    columnHelper.display({
      header: "#",
      enableSorting: false,
      cell: (cell) => {
        return <Fields.IndexField cell={cell} />;
      },
    }),
    columnHelper.accessor("id", {
      header: "Qaimə Kodu",
      cell: (cell) => {
        return <Fields.TextField text={`#${cell.getValue()}`} />;
      },
    }),
    columnHelper.accessor("customer", {
      header: "Müştəri",
      cell: (cell) => {
        return <Fields.TextField text={cell.getValue()} />;
      },
      meta: {
        filterComponent: (column) => <Filters.TextFilter column={column} />,
      },
    }),
    columnHelper.accessor("phone", {
      header: "Telefon",
      cell: (cell) => {
        return <Fields.TextField text={cell.getValue()} />;
      },
      meta: {
        filterComponent: (column) => <Filters.TextFilter column={column} />,
      },
    }),
    columnHelper.accessor("branch", {
      header: "Filial",
      cell: (cell) => {
        return <Fields.TextField text={cell.getValue().name} />;
      },
      meta: {
        filterComponent: (column) => <Filters.TextFilter column={column} />,
      },
    }),
    columnHelper.accessor("seller", {
      header: "Satıcı",
      cell: (cell) => {
        return <Fields.TextField text={cell.getValue().name} />;
      },
      meta: {
        filterComponent: (column) => <Filters.TextFilter column={column} />,
      },
    }),
    columnHelper.accessor("status", {
      header: "status",
      cell: (cell) => {
        const status = ORDER_STATUS_LABELS[cell.getValue()];
        return <Fields.TagField value={status.label} color={status.color} />;
      },
      meta: {
        filterComponent: (column) => <Filters.TextFilter column={column} />,
      },
    }),
    columnHelper.accessor("date", {
      header: "Tarix",
      cell: (cell) => {
        return <Fields.DateField value={cell.getValue()} />;
      },
      meta: {
        filterComponent: (column) => <Filters.DateRangeFilter column={column} />,
      },
    }),
    columnHelper.display({
      header: "Əməliyyatlar",
      enableSorting: false,
      cell: (cell) => {
        return (
          <div className="d-flex gap-3">
            <Link to={`/orders/${cell.row.original.id}`} className="text-primary">
              <i className="mdi mdi-eye font-size-18" id="viewtooltip" />
              <UncontrolledTooltip placement="top" target="viewtooltip">
                Ətraflı
              </UncontrolledTooltip>
            </Link>
          </div>
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
              controls={
                <Link to="/warehouse/entries/new" className="btn btn-primary mb-2 me-2">
                  <i className={`mdi mdi-plus-circle-outline me-1`} />
                  Əlavə et
                </Link>
              }
              loading={status.loading && status.lastAction === getOrders.typePrefix}
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
