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
import { WarehouseEntry } from "@/types/models";

// Actions
import { getWarehouseEntries } from "@/store/actions";

const TableContainer = () => {
  // Pagination
  const { page, limit, pagination, onPaginationChange } = usePagination();

  // Sorting
  const { ordering, sorting, onSortingChange } = useSorting();

  // Column Filtering
  const { filters, columnFilters, onColumnFiltersChange } = useColumnFiltering();

  // Table data
  const dispatch = useDispatch<AppDispatch>();
  const { update, items, status, count } = useSelector((state: RootState) => state.warehouseEntry);

  const fetchItems = () => {
    dispatch(getWarehouseEntries({ ...filters, page, limit, ordering }));
  };

  useEffect(() => {
    fetchItems();
  }, [columnFilters, pagination, sorting]);

  useEffect(() => {
    if (update) fetchItems();
  }, [update]);

  // Columns
  const columnHelper = createColumnHelper<WarehouseEntry>();

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
    columnHelper.accessor("supplier", {
      header: "Firma",
      cell: (cell) => {
        return <Fields.TextField text={cell.getValue().name} />;
      },
      meta: {
        filterComponent: (column) => <Filters.TextFilter column={column} />,
      },
    }),
    columnHelper.accessor("invoice", {
      header: "Firma kodu",
      cell: (cell) => {
        return <Fields.TextField text={cell.getValue()} />;
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
            <Link to={`/warehouse/entries/${cell.row.original.id}`} className="text-primary">
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
              loading={status.loading && status.lastAction === getWarehouseEntries.typePrefix}
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
