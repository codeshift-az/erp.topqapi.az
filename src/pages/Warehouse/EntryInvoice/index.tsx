import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/store";

// Reactstrap
import { Button, Card, CardBody, Col, Container, Row, Table } from "reactstrap";

// Components
import Breadcrumbs from "@/components/Breadcrumb";
import Loader from "@/components/Loader";

// Helpers
import { getPageTitle } from "@/helpers";

// Actions
import { getWarehouseEntryDetails } from "@/store/actions";

const WarehouseEntryInvoice = () => {
  const location = useLocation();

  const dispatch = useDispatch<AppDispatch>();

  const { item: entry, status } = useSelector((state: RootState) => state.warehouseEntry);

  useEffect(() => {
    const id = location.pathname.split("/")?.[3];
    dispatch(getWarehouseEntryDetails(Number(id)));
  }, [location]);

  // Print the Invoice
  const printInvoice = () => {
    window.print();
  };

  if (!entry) {
    if (status.loading) return <Loader />;
    return <div>Entry not found</div>;
  }

  const title = `Giriş #${entry?.id || ""} Qaiməsi`;

  document.title = getPageTitle(title);

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs
            title={title}
            breadcrumbItems={[
              { title: "Ana Səhifə", url: "/" },
              { title: "Anbar", url: "/warehouse" },
              { title: "Giriş tarixçəsi", url: "/warehouse/entries" },
              { title: `Giriş #${entry.id}`, url: `/warehouse/entries/${entry.id}` },
              { title: title },
            ]}
          />

          <Row>
            <Col lg="12">
              <Card>
                <CardBody>
                  <div className="invoice-title">
                    <h4 className="float-end font-size-16">Giriş #{entry.id} Fakturası</h4>
                  </div>

                  <hr />

                  <Row>
                    <Col sm="12" className="mt-3 text-sm-end">
                      <address>
                        <strong>Firma: </strong>
                        <br />

                        {entry.supplier.name}

                        <br />
                      </address>
                    </Col>
                  </Row>

                  <Row>
                    <Col sm="12" className="mt-3 text-sm-end">
                      <address>
                        <strong>Tarix:</strong>
                        <br />

                        {entry.date}

                        <br />
                      </address>
                    </Col>
                  </Row>

                  <div className="py-2 mt-3">
                    <h3 className="font-size-15 fw-bold">Giriş detalları</h3>
                  </div>

                  <div className="table-responsive">
                    <Table className="table-nowrap">
                      <thead>
                        <tr>
                          <th style={{ width: "70px" }}>#</th>
                          <th>Məhsul</th>
                          <th className="text-end">Qiymət</th>
                          <th className="text-end">Say</th>
                          <th className="text-end">Cəm</th>
                        </tr>
                      </thead>

                      <tbody>
                        {entry.items.map((item, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{item.product.name}</td>
                            <td className="text-end">{Number(item.price).toFixed(2)} AZN</td>
                            <td className="text-end">{item.quantity}</td>
                            <td className="text-end">
                              {(Number(item.price) * item.quantity).toFixed(2)} AZN
                            </td>
                          </tr>
                        ))}

                        <tr>
                          <td colSpan={4} className="border-0 text-end">
                            <strong>Ümumi Cəm</strong>
                          </td>

                          <td className="border-0 text-end">
                            <h5 className="m-0">
                              {entry.items
                                .reduce((acc, item) => acc + Number(item.price) * item.quantity, 0)
                                .toFixed(2)}{" "}
                              AZN
                            </h5>
                          </td>
                        </tr>
                      </tbody>
                    </Table>
                  </div>

                  <div className="d-print-none">
                    <div className="float-end">
                      <Button color="success" className="me-2 mb-2" onClick={printInvoice}>
                        <i className="mdi mdi-printer me-1" />
                        Çap et
                      </Button>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default WarehouseEntryInvoice;
