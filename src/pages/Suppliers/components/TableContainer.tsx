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
  usePagination,
  useSorting,
  useColumnFiltering,
} from "@/components/DataTable/Hooks";

// Types
import { Supplier } from "@/types/models";

// Actions
import { getSuppliers, getSupplierStats } from "@/store/actions";
import { Link } from "react-router-dom";

interface Props {
  onCreate?: () => void;
  onUpdate?: (data: Supplier) => void;
  onDelete?: (data: Supplier) => void;
}

const TableContainer = ({ onCreate, onUpdate, onDelete }: Props) => {
  // Pagination
  const { page, limit, pagination, onPaginationChange } = usePagination();

  // Sorting
  const { ordering, sorting, onSortingChange } = useSorting();

  // Column Filtering
  const { filters, columnFilters, onColumnFiltersChange } =
    useColumnFiltering();

  // Table data
  const dispatch = useDispatch<AppDispatch>();
  const { update, items, status, count, stats } = useSelector(
    (state: RootState) => state.supplier
  );

  const fetchItems = () => {
    dispatch(getSuppliers({ ...filters, page, limit, ordering }));
    dispatch(getSupplierStats(filters));
  };

  useEffect(() => {
    fetchItems();
  }, [columnFilters, pagination, sorting]);

  useEffect(() => {
    if (update) fetchItems();
  }, [update]);

  // Columns
  const columnHelper = createColumnHelper<Supplier>();

  const columns = [
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
        return (
          <Link to={`/suppliers/${cell.row.original.id}/transactions`}>
            <Fields.TextField text={cell.getValue()} />
          </Link>
        );
      },
      meta: {
        filterComponent: (column) => <Filters.TextFilter column={column} />,
      },
    }),
    columnHelper.accessor("total_price", {
      header: "Toplam alınan",
      cell: (cell) => {
        return <Fields.PriceField amount={cell.getValue()} />;
      },
      footer: () => {
        return <Fields.PriceField amount={stats?.total_price || 0} />;
      },
    }),
    columnHelper.accessor("total_payed", {
      header: "Toplam ödənilən",
      cell: (cell) => {
        return <Fields.PriceField amount={cell.getValue()} />;
      },
      footer: () => {
        return <Fields.PriceField amount={stats?.total_payed || 0} />;
      },
    }),
    columnHelper.display({
      header: "Ümumi borc",
      enableSorting: false,
      cell: (cell) => {
        return (
          <Fields.PriceField
            amount={
              Number(cell.row.original.total_price) -
              Number(cell.row.original.total_payed)
            }
          />
        );
      },
      footer: () => {
        return (
          <Fields.PriceField
            amount={
              Number(stats?.total_price || 0) - Number(stats?.total_payed || 0)
            }
          />
        );
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
                onClick={() => onUpdate(cell.row.original as Supplier)}
              />
            )}
            {onDelete && (
              <Fields.DeleteButton
                onClick={() => onDelete(cell.row.original as Supplier)}
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
                <Button
                  color="primary"
                  className="mb-2 me-2"
                  onClick={onCreate}>
                  <i className={`mdi mdi-plus-circle-outline me-1`} />
                  Əlavə et
                </Button>
              }
              loading={
                status.loading && status.lastAction === getSuppliers.typePrefix
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
