import { useEffect } from "react";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";

// Reactstrap
import { Row, Col, Card, CardBody, Button } from "reactstrap";

// React Table
import { createColumnHelper } from "@tanstack/react-table";

// Components
import DataTable from "@/components/DataTable";
import * as Fields from "@/components/DataTable/Fields";
import * as Filters from "@/components/DataTable/Filters";
import { usePagination, useSorting, useColumnFiltering } from "@/components/DataTable/Hooks";

// Types
import { FactoryStorageItem } from "@/types/models";

// Actions
import { getFactoryStorageItems } from "@/store/actions";

interface Props {
  onCreate?: () => void;
  onUpdate?: (data: FactoryStorageItem) => void;
  onDelete?: (data: FactoryStorageItem) => void;
}

const TableContainer = ({ onCreate, onUpdate, onDelete }: Props) => {
  // Pagination
  const { page, limit, pagination, onPaginationChange } = usePagination();

  // Sorting
  const { ordering, sorting, onSortingChange } = useSorting();

  // Column Filtering
  const { filters, columnFilters, onColumnFiltersChange } = useColumnFiltering();

  // Table data
  const dispatch = useDispatch<AppDispatch>();
  const { update, items, status, count } = useSelector((state: RootState) => state.factoryStorage);

  const fetchItems = () => {
    dispatch(getFactoryStorageItems({ ...filters, page, limit, ordering }));
  };

  useEffect(() => {
    fetchItems();
  }, [columnFilters, pagination, sorting]);

  useEffect(() => {
    if (update) fetchItems();
  }, [update]);

  // Columns
  const columnHelper = createColumnHelper<FactoryStorageItem>();

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
    columnHelper.accessor("quantity", {
      header: "Giriş Miqdarı",
      cell: (cell) => {
        return <Fields.NumberField value={cell.getValue()} />;
      },
    }),
    columnHelper.accessor("sale_count", {
      header: "Satış Miqdarı",
      cell: (cell) => {
        return <Fields.NumberField value={cell.getValue()} />;
      },
    }),
    columnHelper.accessor("usage_count", {
      header: "İstifadə Miqdarı",
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
            value={
              cell.row.original.quantity -
              cell.row.original.usage_count -
              cell.row.original.sale_count
            }
          />
        );
      },
    }),
    columnHelper.accessor("price", {
      header: "Qiymət",
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
        filterComponent: (column) => <Filters.DateRangeFilter column={column} />,
      },
    }),
    columnHelper.display({
      header: "Əməliyyatlar",
      enableSorting: false,
      cell: (cell) => {
        return (
          <div className="d-flex gap-3">
            {onUpdate && (
              <Fields.EditButton
                onClick={() => onUpdate(cell.row.original as FactoryStorageItem)}
              />
            )}
            {onDelete && (
              <Fields.DeleteButton
                onClick={() => onDelete(cell.row.original as FactoryStorageItem)}
              />
            )}
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
                <Button color="primary" className="mb-2 me-2" onClick={onCreate}>
                  <i className={`mdi mdi-plus-circle-outline me-1`} />
                  Əlavə et
                </Button>
              }
              loading={status.loading && status.lastAction === getFactoryStorageItems.typePrefix}
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
