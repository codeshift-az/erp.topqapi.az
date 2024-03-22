import React, { useState } from "react";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";

// Reactstrap
import { Row, Col, Card, CardBody, Button, Table } from "reactstrap";

// Components
import VerifyModal from "@/components/VerifyModal";

// Constants
import { ORDER_STATUS, USER_TYPES } from "@/constants";

// Types
import { Status } from "@/types/store";
import { OrderItem } from "@/types/models";

// Helpers
import { getFormData, hasPermission, hasPermissionByStatus } from "@/helpers";

// Actions
import { createOrderItem, updateOrderItem, deleteOrderItem } from "@/store/actions";

// Related Components
import ProductModal from "./ProductModal";

const ProductContainer = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.account);
  const { item: order, status } = useSelector((state: RootState) => state.order);

  // Product Modal
  const [item, setItem] = useState<OrderItem | null>(null);
  const [productModal, setProductModal] = useState<boolean>(false);

  const onCreate = () => {
    setItem(null);
    setProductModal(true);
  };

  const onUpdate = (data: OrderItem) => {
    setItem(data);
    setProductModal(true);
  };

  const handleSubmit = (formData: FormData) => {
    if (item) {
      // Update
      dispatch(updateOrderItem({ id: item.id, data: formData }));
    } else {
      // Create
      formData.append("order", order?.id.toString() || "");
      dispatch(createOrderItem(formData));
    }
  };

  // Verify Modal
  const [verifyModalData, setVerifyModalData] = useState({
    show: false,
    status: {} as Status,
    action: "",
    icon: "",
    onVerify: () => {},
    message: "Seçilmiş məhsulu silmək istədiyinizə əminsiniz?",
  });

  // Delete Modal
  const onDelete = (data: OrderItem) => {
    const handleDelete = () => {
      dispatch(deleteOrderItem(data.id));
      setVerifyModalData((prev) => ({
        ...prev,
        show: false,
      }));
    };

    setVerifyModalData((prev) => ({
      ...prev,
      show: true,
      status: status,
      icon: "mdi mdi-trash-can-outline",
      action: deleteOrderItem.typePrefix,
      onVerify: handleDelete,
    }));
  };

  // Sale Action
  const handleSale = (id: number) => {
    dispatch(updateOrderItem({ id: id, data: getFormData({ is_done: true }) }));
  };

  // Return Action
  const handleReturn = (id: number) => {
    dispatch(updateOrderItem({ id: id, data: getFormData({ is_return: true }) }));
  };

  if (!order || status.loading) return null;

  return (
    <React.Fragment>
      <Col lx="8">
        <Card>
          <CardBody>
            <div className="table-responsive">
              <Table className="table align-middle mb-0 table-nowrap">
                <thead className="table-light">
                  <tr>
                    <th>Məhsul</th>
                    <th>Firma</th>
                    <th>Qiymət</th>
                    <th>Miqdar</th>
                    <th colSpan={2}>Cəm</th>
                  </tr>
                </thead>

                <tbody>
                  {order.items.map((item) => (
                    <tr key={item.id}>
                      <td>
                        <h5 className="font-size-14 text-truncate">
                          <span className="text-dark">{item.product.name}</span>
                        </h5>
                        <p className="mb-0">{`Kateqoriya: ${item.product.category.name}`}</p>
                      </td>
                      <td>{item.supplier.name}</td>
                      <td>{item.price} AZN</td>
                      <td>{item.quantity}</td>
                      <td>{Number(item.price) * Number(item.quantity)} AZN</td>

                      {hasPermissionByStatus(user, order.status) && !item.is_sold && (
                        <td>
                          <div className="d-flex gap-3">
                            {onUpdate && (
                              <a
                                role="button"
                                className="action-icon text-success"
                                onClick={() => onUpdate(item)}>
                                <i className="mdi mdi-pencil font-size-18" />
                              </a>
                            )}

                            {onDelete && (
                              <a
                                role="button"
                                className="action-icon text-danger"
                                onClick={() => onDelete(item)}>
                                <i className="mdi mdi-trash-can font-size-18" />
                              </a>
                            )}

                            {order.status === ORDER_STATUS.PENDING && handleSale && (
                              <a
                                role="button"
                                className="action-icon text-success"
                                onClick={() => handleSale(item.id)}>
                                <i className="mdi mdi-check font-size-18" />
                              </a>
                            )}
                          </div>
                        </td>
                      )}

                      {item.is_sold && hasPermission(user, [USER_TYPES.WAREHOUSE]) && (
                        <td>
                          <div className="d-flex gap-3">
                            {handleReturn && (
                              <a
                                role="button"
                                className="action-icon text-danger"
                                onClick={() => handleReturn(item.id)}>
                                <i className="mdi mdi-refresh font-size-18" />
                              </a>
                            )}
                          </div>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>

            {hasPermissionByStatus(user, order.status) && (
              <Row className="mt-4">
                <Col sm="6">
                  <div className="text-sm-end mt-2 mt-sm-0">
                    <Button color="primary" className="mb-2 me-2" onClick={onCreate}>
                      <i className={`mdi mdi-plus-circle-outline me-1`} />
                      Əlavə et
                    </Button>
                  </div>
                </Col>
              </Row>
            )}
          </CardBody>
        </Card>
      </Col>

      {/* Render Product Modal */}
      {productModal && (
        <ProductModal
          data={item}
          show={productModal}
          isEdit={item !== null}
          toggle={() => setProductModal(false)}
          handleSubmit={handleSubmit}
        />
      )}

      {/* Render Delete Modal */}
      {verifyModalData.show && (
        <VerifyModal
          status={status}
          show={verifyModalData.show}
          icon={verifyModalData.icon}
          action={verifyModalData.action}
          onVerify={verifyModalData.onVerify}
          onClose={() => setVerifyModalData((prev) => ({ ...prev, show: false }))}
          message={verifyModalData.message}
        />
      )}
    </React.Fragment>
  );
};

export default ProductContainer;
