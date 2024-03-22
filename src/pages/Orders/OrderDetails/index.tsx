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
import { getOrderDetails } from "@/store/actions";

// Related Components
import EntryContainer from "./components/OrderContainer";
import ProductContainer from "./components/ProductContainer";

const OrderDetails = () => {
  const location = useLocation();
  const [orderID, setEntryID] = useState<number | null>(null);

  const dispatch = useDispatch<AppDispatch>();
  const { item: order, status, update } = useSelector((state: RootState) => state.order);

  const fetchEntry = () => {
    if (orderID) dispatch(getOrderDetails(orderID));
  };

  useEffect(() => {
    setEntryID(Number(location.pathname.split("/").pop()));
  }, [location]);

  useEffect(() => {
    fetchEntry();
  }, [orderID]);

  useEffect(() => {
    if (update) fetchEntry();
  }, [update]);

  const title = `Satış #${order?.id || ""}`;

  document.title = getPageTitle(title);

  if (!order) {
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
              { title: "Satışlar", url: "/orders" },
              { title: title },
            ]}
          />

          {status.loading && <h1 className="text-center mt-5">Yüklənir...</h1>}

          {order && status.success && (
            <Row>
              <ProductContainer />
              <EntryContainer />
            </Row>
          )}
        </Container>
      </div>
    </React.Fragment>
  );
};

export default OrderDetails;
