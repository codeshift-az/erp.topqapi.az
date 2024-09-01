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
import {
  useSorting,
  usePagination,
  useColumnFiltering,
} from "@/components/DataTable/Hooks";

// Types
import { CatalogItem } from "@/types/models";

// Actions
import { getCatalogItems } from "@/store/actions";

interface Props {
  onCreate: () => void;
  onUpdate: (data: CatalogItem) => void;
  onDelete: (data: CatalogItem) => void;
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
  const { items, count, update, status } = useSelector(
    (state: RootState) => state.catalog
  );

  const fetchItems = () => {
    dispatch(getCatalogItems({ ...filters, page, limit, ordering }));
  };

  useEffect(() => {
    fetchItems();
  }, [columnFilters, pagination, sorting]);

  useEffect(() => {
    if (update) fetchItems();
  }, [update]);

  // Columns
  const columnHelper = createColumnHelper<CatalogItem>();

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
    columnHelper.accessor("supplier", {
      header: "Firma",
      cell: (cell) => {
        return <Fields.TextField text={cell.getValue().name} />;
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
                status.loading &&
                status.lastAction === getCatalogItems.typePrefix
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
