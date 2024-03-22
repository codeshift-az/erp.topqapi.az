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
import { getOrderCartItems } from "@/store/actions";

// Related Components
import ProductContainer from "./components/ProductContainer";
import OrderContainer from "./components/OrderContainer";

const NewOrder = () => {
  const title = "Yeni Satış";

  document.title = getPageTitle(title);

  const dispatch = useDispatch<AppDispatch>();
  const { update } = useSelector((state: RootState) => state.orderCart);

  const fetchCartItems = () => {
    dispatch(getOrderCartItems());
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
              { title: "Satışlar", url: "/orders" },
              { title: title },
            ]}
          />

          <Row>
            <ProductContainer />
            <OrderContainer />
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default NewOrder;
