import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";

// Reactstrap
import { Button, Card, CardBody, CardTitle, Col, Table } from "reactstrap";

// Components
import VerifyModal from "@/components/VerifyModal";

// Constants
import { USER_TYPES, ORDER_STATUS, ORDER_STATUS_LABELS } from "@/constants";

// Helpers
import { getFormData, hasPermission, hasPermissionByStatus } from "@/helpers";

// Actions
import { deleteOrder, updateOrder } from "@/store/actions";

// Related Components
import OrderModal from "./OrderModal";

const OrderContainer = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.account);
  const { item: order, status } = useSelector((state: RootState) => state.order);

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

  const [priceSum, setPriceSum] = useState<number>(0);

  useEffect(() => {
    if (order && order.items.length > 0) {
      const sum = order.items.reduce(
        (a, b) => Number(a) + Number(b["price"] || 0) * Number(b["quantity"] || 0),
        0
      );
      setPriceSum(sum);
    }
  }, [order]);

  const handleStatusUpdate = (status: number) => {
    if (order) dispatch(updateOrder({ id: order.id, data: getFormData({ status }) }));
  };

  if (!order || status.loading) return null;

  const orderStatus = ORDER_STATUS_LABELS[order.status];

  return (
    <React.Fragment>
      <Col xl="4">
        <Card>
          <CardBody>
            <CardTitle className="mb-3">Giriş məlumatları</CardTitle>

            <div className="table-responsive">
              <Table className="table mb-0">
                <tbody>
                  <tr>
                    <td>Sifariş Qaimə kodu: </td>
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
                    <th>Status :</th>
                    <th>
                      <a
                        role="button"
                        className={`badge badge-soft-${orderStatus.color} font-size-11 m-1`}>
                        {orderStatus.label}
                      </a>
                    </th>
                  </tr>

                  <tr>
                    <td>Tarix: </td>
                    <td>{order.date}</td>
                  </tr>

                  <tr>
                    <td>Ümumi Cəm :</td>
                    <td>{priceSum} AZN</td>
                  </tr>

                  <tr>
                    <td>Endirim: </td>
                    <td>{order.discount} AZN</td>
                  </tr>

                  <tr>
                    <th>Toplam :</th>
                    <th>{priceSum - order.discount} AZN</th>
                  </tr>

                  <tr>
                    <td>Qeyd: </td>
                    <td>{order.note}</td>
                  </tr>

                  {hasPermissionByStatus(user, order.status) && (
                    <tr>
                      <th colSpan={2}>
                        <div className="d-flex justify-content-between">
                          {onUpdate && (
                            <Button
                              color="success"
                              className="mb-2 col-5"
                              onClick={() => onUpdate()}>
                              <i className={`mdi mdi-pencil me-1`} />
                              Redaktə et
                            </Button>
                          )}

                          {onDelete && (
                            <Button
                              color="danger"
                              className="mb-2 col-5"
                              onClick={() => onDelete()}>
                              <i className={`mdi mdi-trash-can me-1`} />
                              Sil
                            </Button>
                          )}
                        </div>
                      </th>
                    </tr>
                  )}

                  {order.status === ORDER_STATUS.DRAFT && (
                    <tr>
                      <th colSpan={2}>
                        <Button
                          color="success"
                          className="mb-2 col-12"
                          onClick={() => handleStatusUpdate(ORDER_STATUS.REGISTERED)}>
                          <i className={`mdi mdi-check me-1`} />
                          Sifariş tamamlandı
                        </Button>
                      </th>
                    </tr>
                  )}

                  {hasPermission(user, [USER_TYPES.WAREHOUSE]) &&
                    order.status === ORDER_STATUS.REGISTERED && (
                      <tr>
                        <th colSpan={2}>
                          <Button
                            color="success"
                            className="mb-2 col-12"
                            onClick={() => handleStatusUpdate(ORDER_STATUS.ACCEPTED)}>
                            <i className={`mdi mdi-check me-1`} />
                            Sifariş qəbul olundu
                          </Button>
                        </th>
                      </tr>
                    )}

                  {hasPermission(user, [USER_TYPES.WAREHOUSE]) &&
                    order.status === ORDER_STATUS.ACCEPTED && (
                      <tr>
                        <th colSpan={2}>
                          <Button
                            color="success"
                            className="mb-2 col-12"
                            onClick={() => handleStatusUpdate(ORDER_STATUS.PENDING)}>
                            <i className={`mdi mdi-check me-1`} />
                            Sifariş hazırlanır
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
