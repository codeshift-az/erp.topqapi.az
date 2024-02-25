import React from "react";
import { Container } from "reactstrap";

// Components
import Breadcrumbs from "@/components/Breadcrumb";

// Helpers
import { getPageTitle } from "@/helpers";

const Dashboard = () => {
  const title = "Ana Səhifə";

  document.title = getPageTitle(title);

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title={title} breadcrumbItems={[{ title: title }]} />
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Dashboard;
