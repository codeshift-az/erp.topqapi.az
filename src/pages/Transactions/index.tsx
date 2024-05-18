import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

// Reactstrap
import { Container } from "reactstrap";

// Components
import Breadcrumbs from "@/components/Breadcrumb";

// Helpers
import { getPageTitle } from "@/helpers";

// Related components
import TableContainer from "./components/TableContainer";

// API
import { getSupplier } from "@/api/supplier";

const Transactions = () => {
  const { pathname } = useLocation();
  const id = pathname.split("/")?.[2];

  const [title, setTitle] = useState("");

  document.title = getPageTitle(title);

  useEffect(() => {
    getSupplier(Number(id)).then((data) => {
      setTitle(data.name);
    });
  }, [pathname]);

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs
            title={title}
            breadcrumbItems={[
              { title: "Ana Səhifə", url: "/" },
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

export default Transactions;
