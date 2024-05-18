import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

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
import { usePagination } from "@/components/DataTable/Hooks";

// Types
import { Transaction } from "@/types/models";

// Actions
import { getSuppliers, getSupplierTransactions } from "@/store/actions";

const TableContainer = () => {
  // Pagination
  const { page, limit, pagination, onPaginationChange } = usePagination();

  // Table data
  const dispatch = useDispatch<AppDispatch>();
  const {
    update,
    transactions: items,
    status,
    transactionCount: count,
  } = useSelector((state: RootState) => state.supplier);

  const { pathname } = useLocation();
  const id = pathname.split("/")?.[2];

  const fetchItems = () => {
    dispatch(
      getSupplierTransactions({ id: Number(id), filters: { page, limit } })
    );
  };

  useEffect(() => {
    fetchItems();
  }, [pagination]);

  useEffect(() => {
    if (update) fetchItems();
  }, [update]);

  // Columns
  const columnHelper = createColumnHelper<Transaction>();

  const columns = [
    columnHelper.display({
      header: "#",
      enableSorting: false,
      cell: (cell) => {
        return <Fields.IndexField cell={cell} />;
      },
    }),
    columnHelper.accessor("id", {
      header: "Kod",
      cell: (cell) => {
        const name = cell.row.original.type ? "Ödəmə" : "Giriş";
        if (!cell.row.original.type) {
          return (
            <Link to={`/warehouse/entries/${cell.getValue()}`}>
              <Fields.TextField text={`${name} #${cell.getValue()}`} />
            </Link>
          );
        }
        return <Fields.TextField text={`${name} #${cell.getValue()}`} />;
      },
    }),
    columnHelper.accessor("amount", {
      header: "Miqdar",
      cell: (cell) => {
        return <Fields.PriceField amount={cell.getValue()} />;
      },
    }),
    columnHelper.accessor("type", {
      header: "Növü",
      cell: (cell) => {
        return (
          <Fields.BooleanField
            value={cell.getValue()}
            trueText="Ödəmə"
            falseText="Alış"
          />
        );
      },
    }),
    columnHelper.accessor("date", {
      header: "Tarix",
      cell: (cell) => {
        return <Fields.DateField value={cell.getValue()} />;
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
                status.loading && status.lastAction === getSuppliers.typePrefix
              }
              // Pagination
              pagination={pagination}
              onPaginationChange={onPaginationChange}
              pageCount={Math.ceil(count / limit)}
            />
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};

export default TableContainer;
