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
import { getOrderDetails } from "@/store/actions";

const OrderInvoice = () => {
  const location = useLocation();

  const dispatch = useDispatch<AppDispatch>();

  const { item: order, status } = useSelector(
    (state: RootState) => state.order
  );

  useEffect(() => {
    const id = location.pathname.split("/")?.[2];
    dispatch(getOrderDetails(Number(id)));
  }, [location]);

  // Print the Invoice
  const printInvoice = () => {
    window.print();
  };

  if (!order) {
    if (status.loading) return <Loader />;
    return <div>Order not found</div>;
  }

  const title = `Satış #${order?.id || ""} Fakturası`;

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
              { title: "Satışlar", url: "/orders" },
              { title: `Satış #${order.id}`, url: `/orders/${order.id}` },
              { title: title },
            ]}
          />

          <Row>
            <Col lg="12">
              <Card>
                <CardBody>
                  <div className="invoice-title">
                    <h4 className="float-end font-size-16">
                      Satış #{order.id} Fakturası
                    </h4>
                  </div>

                  <hr />

                  <Row>
                    <Col sm="6" className="mt-3">
                      <address>
                        <strong>Müştəri: </strong>
                        <br />
                        Ad: {order.customer}
                        <br />
                        Telefon: {order.phone}
                        <br />
                        <p style={{ color: "red" }}>Ünvan: {order.address}</p>
                        <br />
                      </address>

                      <address>
                        <strong>Satıcı:</strong>
                        <br />
                        TopQAPI MMC
                        <br />
                        Filial: {order.branch.name}
                        <br />
                        Satıcı: {order.seller.name}
                        <br />
                      </address>
                    </Col>

                    <Col sm="6" className="mt-3 text-sm-end">
                      <address>
                        <strong>Çatdırılma tarixi:</strong>
                        <br />

                        {order.delivery_date || "Çatdırılma tarixi yoxdur"}

                        <br />
                      </address>

                      <address>
                        <strong>Quraşdırılma tarixi:</strong>
                        <br />

                        {order.install_date || "Quraşdırılma tarixi yoxdur"}

                        <br />
                      </address>

                      <address>
                        <strong>Satış tarixi:</strong>
                        <br />

                        {order.sale_date}

                        <br />
                      </address>
                    </Col>
                  </Row>

                  <div className="py-2 mt-3">
                    <h3 className="font-size-15 fw-bold">Satış detalları</h3>
                  </div>

                  <div className="table-responsive">
                    <Table className="table-nowrap table-bordered table-striped border-secondary-subtle">
                      <thead>
                        <tr>
                          <th style={{ width: "70px" }}>#</th>
                          <th style={{ color: "red" }}>Məhsul</th>
                          <th className="text-end">Ölçü</th>
                          <th className="text-end">Say</th>
                          <th style={{ color: "red" }} className="text-end">
                            Qiymət
                          </th>
                          <th className="text-end">Cəm</th>
                        </tr>
                      </thead>

                      <tbody>
                        {order.items.map((item, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td style={{ color: "red" }}>
                              {item.product.name}
                            </td>
                            <td className="text-end">{item.size}</td>
                            <td className="text-end">{item.quantity}</td>
                            <td style={{ color: "red" }} className="text-end">
                              {Number(item.price).toFixed(2)} AZN
                            </td>
                            <td className="text-end">
                              {(Number(item.price) * item.quantity).toFixed(2)}{" "}
                              AZN
                            </td>
                          </tr>
                        ))}

                        <tr>
                          <td colSpan={4} className="border-0 text-end">
                            <strong>Ümumi Cəm</strong>
                          </td>

                          <td
                            style={{ color: "red" }}
                            className="border-0 text-end">
                            <h6 className="m-0">
                              {order.items
                                .reduce(
                                  (acc, item) =>
                                    acc + Number(item.price) * item.quantity,
                                  0
                                )
                                .toFixed(2)}{" "}
                              AZN
                            </h6>
                          </td>
                          <td className="border-0" />
                        </tr>

                        <tr>
                          <td colSpan={4} className="border-0 text-end">
                            <strong>Ödənilən</strong>
                          </td>

                          <td
                            style={{ color: "red" }}
                            className="border-0 text-end">
                            <h6 className="m-0">
                              {Number(order.payed).toFixed(2)} AZN
                            </h6>
                          </td>
                          <td className="border-0" />
                        </tr>

                        <tr>
                          <td colSpan={4} className="border-0 text-end">
                            <strong>Qalıq</strong>
                          </td>

                          <td
                            style={{ color: "red" }}
                            className="border-0 text-end">
                            <h6 className="m-0">
                              {(
                                order.items.reduce(
                                  (acc, item) =>
                                    acc + Number(item.price) * item.quantity,
                                  0
                                ) - order.payed
                              ).toFixed(2)}{" "}
                              AZN
                            </h6>
                          </td>
                          <td className="border-0" />
                        </tr>
                      </tbody>
                    </Table>
                  </div>

                  <div className="d-print-none">
                    <div className="float-end">
                      <Button
                        color="success"
                        className="me-2 mb-2"
                        onClick={printInvoice}>
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

export default OrderInvoice;
