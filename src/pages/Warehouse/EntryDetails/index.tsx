import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";

// Reactstrap
import { Container, Row } from "reactstrap";

// Components
import Breadcrumbs from "@/components/Breadcrumb";

// Helpers
import { getPageTitle } from "@/helpers";

// Actions
import { getWarehouseEntryDetails } from "@/store/actions";

// Related Components
import EntryContainer from "./components/EntryContainer";
import ProductContainer from "./components/ProductContainer";

const WarehouseEntry = () => {
  const location = useLocation();
  const [entryID, setEntryID] = useState<number | null>(null);

  const dispatch = useDispatch<AppDispatch>();
  const { item: entry, status, update } = useSelector((state: RootState) => state.warehouseEntry);

  const fetchEntry = () => {
    if (entryID) dispatch(getWarehouseEntryDetails(entryID));
  };

  useEffect(() => {
    setEntryID(Number(location.pathname.split("/").pop()));
  }, [location]);

  useEffect(() => {
    fetchEntry();
  }, [entryID]);

  useEffect(() => {
    if (update) fetchEntry();
  }, [update]);

  const title = `Giriş #${entry?.id || ""}`;

  document.title = getPageTitle(title);

  if (!entry) {
    if (status.loading) return <h1 className="text-center mt-5">Loading...</h1>;
    return <h1>Not found</h1>;
  }

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

          <Row>
            <ProductContainer />
            <EntryContainer />
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default WarehouseEntry;
