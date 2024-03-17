import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Redux
import { useSelector } from "react-redux";
import { RootState } from "@/store";

// Reactstrap
import { Container } from "reactstrap";

// Components
import Breadcrumbs from "@/components/Breadcrumb";

// Constants
import { USER_TYPES } from "@/constants";

// Helpers
import { getPageTitle } from "@/helpers";

// Related components
import TableContainer from "./components/TableContainer";

const MyOrders = () => {
  const title = "Mənim Sifarişlərim";

  document.title = getPageTitle(title);

  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.account);

  useEffect(() => {
    if (user && user.type != USER_TYPES.STORE) navigate("/orders/all");
  }, [user, navigate]);

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs
            title={title}
            breadcrumbItems={[
              { title: "Ana Səhifə", url: "/" },
              { title: "Sifarişlər", url: "/orders" },
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

export default MyOrders;
