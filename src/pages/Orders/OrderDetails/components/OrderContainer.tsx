import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";

// Reactstrap
import { Button, Card, CardBody, CardTitle, Col, Table } from "reactstrap";

// Components
import VerifyModal from "@/components/VerifyModal";

// Constants
import { USER_ROLES, ORDER_STATUS, ORDER_STATUS_LABELS } from "@/constants";

// Helpers
import {
  formatPrice,
  getFormData,
  hasPermission,
  hasPermissionByStatus,
} from "@/helpers";

// Actions
import { deleteOrder, getOrderDetails, updateOrder } from "@/store/actions";

// Related Components
import OrderModal from "./OrderModal";

const OrderContainer = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.account);
  const { item: order, status } = useSelector(
    (state: RootState) => state.order
  );

  // Order Modal
  const [orderModal, setOrderModal] = useState<boolean>(false);

  const onUpdate = () => {
    setOrderModal(true);
  };

  const handleSubmit = (formData: FormData) => {
    if (order) dispatch(updateOrder({ id: order.id, data: formData }));
  };

  // Delete Modal
  const [deleteModal, setDeleteModal] = useState<boolean>(false);

  const onDelete = () => {
    setDeleteModal(true);
  };

  const handleDelete = () => {
    if (order) dispatch(deleteOrder(order.id)).then(() => navigate("/orders"));
    setDeleteModal(false);
  };

  const handleStatusUpdate = (status: number) => {
    if (order)
      dispatch(updateOrder({ id: order.id, data: getFormData({ status }) }));
  };

  if (
    !order ||
    (status.lastAction == getOrderDetails.typePrefix && status.loading)
  )
    return null;

  const orderStatus = ORDER_STATUS_LABELS[order.status];

  return (
    <React.Fragment>
      <Col xl="12">
        <Card>
          <CardBody>
            <CardTitle className="mb-3">Giriş məlumatları</CardTitle>

            <div className="table-responsive">
              <Table striped className="table mb-0">
                <tbody>
                  <tr>
                    <td>Satış kodu: </td>
                    <td>#{order.id}</td>
                  </tr>

                  <tr>
                    <td>Filial: </td>
                    <td>{order.branch.name}</td>
                  </tr>

                  <tr>
                    <td>Satıcı: </td>
                    <td>{order.seller.name}</td>
                  </tr>

                  <tr>
                    <td>Müştəri adı: </td>
                    <td>{order.customer}</td>
                  </tr>

                  <tr>
                    <td>Müştəri telefon: </td>
                    <td>{order.phone}</td>
                  </tr>

                  <tr>
                    <td>Müştəri adresi: </td>
                    <td>{order.address}</td>
                  </tr>

                  <tr>
                    <td>Ümumi Cəm :</td>
                    <td>{formatPrice(order.total_price)}</td>
                  </tr>

                  <tr>
                    <td>Endirim: </td>
                    <td>{formatPrice(order.discount)}</td>
                  </tr>

                  <tr>
                    <th>Toplam :</th>
                    <th>{formatPrice(order.total_price - order.discount)}</th>
                  </tr>

                  <tr>
                    <th>Ödənilən məbləğ :</th>
                    <th>{formatPrice(order.payed)}</th>
                  </tr>

                  <tr>
                    <th>Qalıq məbləğ (Borc) :</th>
                    <th>
                      {formatPrice(
                        order.total_price - order.discount - order.payed
                      )}
                    </th>
                  </tr>

                  <tr>
                    <td>Satıcı Payı: </td>
                    <td>{formatPrice(order.seller_share)}</td>
                  </tr>

                  <tr>
                    <td>Satış Tarixi: </td>
                    <td>{order.sale_date}</td>
                  </tr>

                  <tr>
                    <td>Taksi: </td>
                    <td>{order.driver?.name}</td>
                  </tr>

                  <tr>
                    <td>Çatdırılma Tarixi: </td>
                    <td>{order.delivery_date}</td>
                  </tr>

                  <tr>
                    <td>Çatdırılma məbləği: </td>
                    <td>{formatPrice(order.delivery_price)}</td>
                  </tr>

                  <tr>
                    <td>Usta: </td>
                    <td>{order.worker?.name}</td>
                  </tr>

                  <tr>
                    <td>Quraşdırılma Tarixi: </td>
                    <td>{order.install_date}</td>
                  </tr>

                  <tr>
                    <td>Quraşdırılma məbləği: </td>
                    <td>{formatPrice(order.install_price)}</td>
                  </tr>

                  <tr>
                    <td>Qeyd: </td>
                    <td>{order.note}</td>
                  </tr>

                  {order.status >= ORDER_STATUS.READY &&
                    hasPermission(user, [USER_ROLES.WAREHOUSE]) && (
                      <tr>
                        <td>Ümumi gəlir: </td>
                        <td>{formatPrice(order.profit)}</td>
                      </tr>
                    )}

                  <tr>
                    <th>Status :</th>
                    <th>
                      <a
                        role="button"
                        className={`badge badge-soft-${orderStatus.color} font-size-11 m-1`}>
                        {orderStatus.label}
                      </a>
                    </th>
                  </tr>

                  {hasPermissionByStatus(user, order.status) && (
                    <React.Fragment>
                      <tr>
                        <th colSpan={2}>
                          {onUpdate && (
                            <Button
                              color="success"
                              className="mb-2 col-12"
                              onClick={() => onUpdate()}>
                              <i className={`mdi mdi-pencil me-1`} />
                              Redaktə et
                            </Button>
                          )}
                        </th>
                      </tr>
                      {onDelete &&
                        (order.status == 0 ||
                          hasPermission(user, [], true)) && (
                          <tr>
                            <th colSpan={2}>
                              <Button
                                color="danger"
                                className="mb-2 col-12"
                                onClick={() => onDelete()}>
                                <i className={`mdi mdi-trash-can me-1`} />
                                Sil
                              </Button>
                            </th>
                          </tr>
                        )}
                    </React.Fragment>
                  )}

                  {order.status === ORDER_STATUS.DRAFT && (
                    <tr>
                      <th colSpan={2}>
                        <Button
                          color="success"
                          className="mb-2 col-12"
                          disabled={
                            status.loading &&
                            status.lastAction === updateOrder.typePrefix
                          }
                          onClick={() => {
                            handleStatusUpdate(ORDER_STATUS.REGISTERED);
                            navigate("/orders");
                          }}>
                          <i className={`mdi mdi-check me-1`} />
                          Satış tamamlandı
                        </Button>
                      </th>
                    </tr>
                  )}

                  {order.status !== ORDER_STATUS.DRAFT && (
                    <tr>
                      <th colSpan={2}>
                        <Link
                          to={`/orders/${order.id}/invoice`}
                          className="btn btn-primary mb-2 col-12">
                          <i className={`mdi mdi-printer me-1`} />
                          Qaimə
                        </Link>
                      </th>
                    </tr>
                  )}

                  {hasPermission(user, [USER_ROLES.WAREHOUSE]) && (
                    <React.Fragment>
                      {order.status === ORDER_STATUS.REGISTERED && (
                        <tr>
                          <th colSpan={2}>
                            <Button
                              color="success"
                              className="mb-2 col-12"
                              disabled={
                                status.loading &&
                                status.lastAction === updateOrder.typePrefix
                              }
                              onClick={() =>
                                handleStatusUpdate(ORDER_STATUS.ACCEPTED)
                              }>
                              <i className={`mdi mdi-check me-1`} />
                              Satış qəbul olundu
                            </Button>
                          </th>
                        </tr>
                      )}

                      {order.status === ORDER_STATUS.ACCEPTED && (
                        <tr>
                          <th colSpan={2}>
                            <Button
                              color="success"
                              className="mb-2 col-12"
                              disabled={
                                status.loading &&
                                status.lastAction === updateOrder.typePrefix
                              }
                              onClick={() =>
                                handleStatusUpdate(ORDER_STATUS.PENDING)
                              }>
                              <i className={`mdi mdi-check me-1`} />
                              Məhsullar hazırlanır
                            </Button>
                          </th>
                        </tr>
                      )}

                      {order.status === ORDER_STATUS.PENDING &&
                        order.items.every((item) => item.is_sold) &&
                        order.worker &&
                        order.driver && (
                          <tr>
                            <th colSpan={2}>
                              <Button
                                color="success"
                                className="mb-2 col-12"
                                disabled={
                                  status.loading &&
                                  status.lastAction === updateOrder.typePrefix
                                }
                                onClick={() =>
                                  handleStatusUpdate(ORDER_STATUS.READY)
                                }>
                                <i className={`mdi mdi-check me-1`} />
                                Məhsullar hazırdır
                              </Button>
                            </th>
                          </tr>
                        )}

                      {(order.status === ORDER_STATUS.READY ||
                        order.status === ORDER_STATUS.RETURN) && (
                        <tr>
                          <th colSpan={2}>
                            <Button
                              color="primary"
                              className="mb-2 col-12"
                              disabled={
                                status.loading &&
                                status.lastAction === updateOrder.typePrefix
                              }
                              onClick={() =>
                                handleStatusUpdate(ORDER_STATUS.ON_DELIVERY)
                              }>
                              <i className={`mdi mdi-truck-delivery me-1`} />
                              Məhsullar yoldadır
                            </Button>
                          </th>
                        </tr>
                      )}

                      {order.status === ORDER_STATUS.ON_DELIVERY && (
                        <tr>
                          <th colSpan={2}>
                            <Button
                              color="primary"
                              className="mb-2 col-12"
                              disabled={
                                status.loading &&
                                status.lastAction === updateOrder.typePrefix
                              }
                              onClick={() =>
                                handleStatusUpdate(ORDER_STATUS.DELIVERED)
                              }>
                              <i className={`mdi mdi-truck-check me-1`} />
                              Məhsullar çatdırıldı
                            </Button>
                          </th>
                        </tr>
                      )}

                      {order.status === ORDER_STATUS.DELIVERED && (
                        <tr>
                          <th colSpan={2}>
                            <Button
                              color="success"
                              className="mb-2 col-12"
                              disabled={
                                Number(order.payed) !==
                                  order.total_price - order.discount ||
                                (status.loading &&
                                  status.lastAction === updateOrder.typePrefix)
                              }
                              onClick={() =>
                                handleStatusUpdate(ORDER_STATUS.INSTALLED)
                              }>
                              <i className={`mdi mdi-check me-1`} />
                              Məhsullar quraşdırıldı və satış tamamlandı
                            </Button>
                          </th>
                        </tr>
                      )}

                      {order.status >= ORDER_STATUS.READY &&
                        order.status !== ORDER_STATUS.RETURN && (
                          <tr>
                            <th colSpan={2}>
                              <Button
                                color="danger"
                                className="mb-2 col-12"
                                disabled={
                                  status.loading &&
                                  status.lastAction === updateOrder.typePrefix
                                }
                                onClick={() =>
                                  handleStatusUpdate(ORDER_STATUS.RETURN)
                                }>
                                <i className={`mdi mdi-refresh me-1`} />
                                Geri Qayıdış
                              </Button>
                            </th>
                          </tr>
                        )}
                    </React.Fragment>
                  )}
                </tbody>
              </Table>
            </div>
          </CardBody>
        </Card>
      </Col>

      {/* Render Product Modal */}
      {orderModal && (
        <OrderModal
          data={order}
          show={orderModal}
          toggle={() => setOrderModal(false)}
          handleSubmit={handleSubmit}
        />
      )}

      {/* Render Delete Modal */}
      {deleteModal && (
        <VerifyModal
          status={status}
          show={deleteModal}
          onVerify={handleDelete}
          action={deleteOrder.typePrefix}
          onClose={() => setDeleteModal(false)}
          message="Seçilmiş məhsulu silmək istədiyinizə əminsiniz?"
        />
      )}
    </React.Fragment>
  );
};

export default OrderContainer;
