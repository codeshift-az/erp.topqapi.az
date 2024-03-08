import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";

// Reactstrap
import { Container } from "reactstrap";

// Components
import Breadcrumbs from "@/components/Breadcrumb";
import Loader from "@/components/Loader";

// Helpers
import { getPageTitle } from "@/helpers";

// Related Components
import DataContainer from "./components/DataContainer";

// Actions
import { getWarehouseEntryDetails } from "@/store/actions";

const WarehouseEntry = () => {
  const location = useLocation();

  const dispatch = useDispatch<AppDispatch>();
  const { item: entry, status } = useSelector((state: RootState) => state.warehouseEntry);

  useEffect(() => {
    const id = location.pathname.split("/").pop();
    dispatch(getWarehouseEntryDetails(Number(id)));
  }, [location]);

  if (!entry) {
    if (status.loading) {
      return <Loader />;
    }
    return <h1>Not found</h1>;
  }

  const title = `Giriş #${entry?.id || ""}`;

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
              { title: "Giriş tarixçəsi", url: "/warehouse/entries" },
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
