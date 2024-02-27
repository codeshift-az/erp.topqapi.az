import React from "react";

// Reactstrap
import { Table, Row, Col, Button, Input, Alert, Spinner } from "reactstrap";

// React Table
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  PaginationState,
  getPaginationRowModel,
  OnChangeFn,
  SortingState,
  ColumnFiltersState,
  getSortedRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";

// React Table Types
import { ColumnDef } from "@tanstack/react-table";

interface Props {
  data: any[];
  columns: ColumnDef<any, any>[];
  controls?: React.ReactNode;
  className?: string;
  loading?: boolean;
  // Pagination
  pagination?: PaginationState;
  onPaginationChange?: OnChangeFn<PaginationState>;
  pageCount?: number;
  // Sorting
  sorting?: SortingState;
  onSortingChange?: OnChangeFn<SortingState>;
  // Filtering
  columnFilters?: ColumnFiltersState;
  onColumnFiltersChange?: OnChangeFn<ColumnFiltersState>;
}

const DataTable = ({
  data,
  columns,
  controls,
  loading,
  className,
  // Pagination
  pagination,
  onPaginationChange,
  pageCount,
  // Sorting
  sorting,
  onSortingChange,
  // Filtering
  columnFilters,
  onColumnFiltersChange,
}: Props) => {
  const tableInstance = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    // Pagination
    manualPagination: true,
    onPaginationChange: onPaginationChange,
    pageCount,
    // Sorting
    manualSorting: true,
    onSortingChange,
    // Filtering
    manualFiltering: true,
    onColumnFiltersChange,
    state: {
      pagination,
      sorting,
      columnFilters,
    },
  });

  const pageSizeOptions = [5, 10, 20, 30, 40, 50, 100];

  return (
    <React.Fragment>
      <Row className="mb-2">
        <Col sm={1}>
          <select
            className="form-select"
            value={tableInstance.getState().pagination.pageSize}
            onChange={(event) => {
              tableInstance.setPageSize(Number(event.target.value));
            }}>
            {pageSizeOptions.map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                {pageSize}
              </option>
            ))}
          </select>
        </Col>

        {controls && (
          <Col sm="11">
            <div className="text-sm-end">{controls}</div>
          </Col>
        )}
      </Row>

      <div className="table-responsive">
        <Table bordered hover className={`custom-header-css ${className || ""}`}>
          <thead className="table-light table-nowrap">
            {tableInstance.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id}>
                    <div
                      className="mb-2"
                      {...(header.column.getCanSort()
                        ? { onClick: header.column.getToggleSortingHandler() }
                        : {})}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}

                      {header.column.getIsSorted() === "asc" ? (
                        <span> 🔼</span>
                      ) : header.column.getIsSorted() === "desc" ? (
                        <span> 🔽</span>
                      ) : null}
                    </div>

                    {header.column.columnDef?.meta?.filterComponent(header.column)}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody className="table-hover table-striped">
            {loading ? (
              <tr>
                <td colSpan={100} className="text-center">
                  <Alert
                    color="primary"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: "15px",
                    }}>
                    <Spinner className="ms-2" color="primary" />
                    Yüklənir...
                  </Alert>
                </td>
              </tr>
            ) : (
              tableInstance.getRowModel().rows.map((row) => (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>

          <tfoot>
            {tableInstance.getFooterGroups().map((footerGroup) => (
              <tr key={footerGroup.id}>
                {footerGroup.headers.map((header) => (
                  <th key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.footer, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </tfoot>
        </Table>
      </div>

      {/* Pagination */}
      {pagination && (
        <Row className="justify-content-md-end justify-content-center align-items-center">
          <Col className="col-md-auto">
            <div className="d-flex gap-1">
              <Button
                color="primary"
                onClick={() => tableInstance.setPageIndex(0)}
                disabled={!tableInstance.getCanPreviousPage()}>
                {"<<"}
              </Button>
              <Button
                color="primary"
                onClick={tableInstance.previousPage}
                disabled={!tableInstance.getCanPreviousPage()}>
                {"<"}
              </Button>
            </div>
          </Col>

          <Col className="col-md-auto d-none d-md-block">
            Səhifə{" "}
            <strong>
              {tableInstance.getState().pagination.pageIndex + 1} / {tableInstance.getPageCount()}
            </strong>
          </Col>

          <Col className="col-md-auto">
            <Input
              type="number"
              style={{ width: 70 }}
              defaultValue={tableInstance.getState().pagination.pageIndex + 1}
              onChange={(e) => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0;
                tableInstance.setPageIndex(page);
              }}
            />
          </Col>

          <Col className="col-md-auto">
            <div className="d-flex gap-1">
              <Button
                color="primary"
                onClick={tableInstance.nextPage}
                disabled={!tableInstance.getCanNextPage()}>
                {">"}
              </Button>
              <Button
                color="primary"
                onClick={() => tableInstance.setPageIndex(tableInstance.getPageCount() - 1)}
                disabled={!tableInstance.getCanNextPage()}>
                {">>"}
              </Button>
            </div>
          </Col>
        </Row>
      )}
    </React.Fragment>
  );
};
export default DataTable;
