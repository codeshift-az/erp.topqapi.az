import React, { useEffect } from "react";

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
import { getWarehouseCartItems } from "@/store/actions";

// Related Components
import ProductContainer from "./components/ProductContainer";
import EntryContainer from "./components/EntryContainer";

const WarehouseNewEntry = () => {
  const title = "Yeni Giriş";

  document.title = getPageTitle(title);

  const dispatch = useDispatch<AppDispatch>();
  const { update } = useSelector((state: RootState) => state.warehouseCart);

  const fetchCartItems = () => {
    dispatch(getWarehouseCartItems());
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  useEffect(() => {
    if (update) fetchCartItems();
  }, [update]);

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

export default WarehouseNewEntry;
