import React from "react";

// Reactstrap
import { Container } from "reactstrap";

// Components
import Breadcrumbs from "@/components/Breadcrumb";

// Helpers
import { getPageTitle } from "@/helpers";

// Related Components
import DataContainer from "./components/DataContainer";

const WarehouseEntry = () => {
  const title = "Giriş Detalları";

  document.title = getPageTitle(title);

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs
            title={title}
            breadcrumbItems={[
              { title: "Ana Səhifə", url: "/" },
              { title: "Anbar", url: "/warehouse" },
              { title: title },
            ]}
          />

          <DataContainer />
        </Container>
      </div>
    </React.Fragment>
  );
};

export default WarehouseEntry;
