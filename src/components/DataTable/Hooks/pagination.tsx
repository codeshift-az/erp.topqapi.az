import { useState } from "react";

export const usePagination = () => {
  const [pagination, setPagination] = useState({
    pageSize: 10,
    pageIndex: 0,
  });

  const { pageSize, pageIndex } = pagination;

  return {
    page: pageIndex + 1,
    limit: pageSize,
    pagination,
    onPaginationChange: setPagination,
  };
};
