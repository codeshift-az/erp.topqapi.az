import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";

// Reactstrap
import { Container } from "reactstrap";

// Components
import Breadcrumbs from "@/components/Breadcrumb";

// Helpers
import { getPageTitle } from "@/helpers";

// Actions
import { getBranch } from "@/store/actions";

// Related components
import TableContainer from "./components/TableContainer";

const BranchOrders = () => {
  const [title, setTitle] = useState("");

  document.title = getPageTitle(title);

  const dispatch = useDispatch<AppDispatch>();

  const { pathname } = useLocation();
  const [branchId, setBranchId] = useState<number>();
  const { item: branch } = useSelector((state: RootState) => state.branch);

  useEffect(() => {
    setBranchId(Number(pathname.split("/")[2]));
  }, [pathname]);

  useEffect(() => {
    if (branchId) dispatch(getBranch(branchId));
  }, [branchId]);

  useEffect(() => {
    if (branch) setTitle(`${branch.name} Filialı - Sifarişlər`);
  }, [branch]);

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs
            title={title}
            breadcrumbItems={[
              { title: "Ana Səhifə", url: "/" },
              { title: "Satışlar", url: "/orders" },
              { title: title },
            ]}
          />

          {/* Render Table Container */}
          <TableContainer />
        </Container>
      </div>
    </React.Fragment>
  );
};

export default BranchOrders;
