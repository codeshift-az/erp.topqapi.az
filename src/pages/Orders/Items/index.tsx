import React from "react";

// Reactstrap
import { Container } from "reactstrap";

// Components
import Breadcrumbs from "@/components/Breadcrumb";

// Helpers
import { getPageTitle } from "@/helpers";

// Related components
import TableContainer from "./components/TableContainer";

const OrderItems = () => {
  const title = "Satılan Məhsullar";

  document.title = getPageTitle(title);

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

export default OrderItems;
