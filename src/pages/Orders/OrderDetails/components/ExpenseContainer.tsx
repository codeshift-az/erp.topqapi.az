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
import { OrderExpense } from "@/types/models";

// Helpers
import { formatPrice, hasPermission } from "@/helpers";

// Actions
import { createOrderExpense, updateOrderExpense, deleteOrderExpense } from "@/store/actions";

// Related Components
import ExpenseModal from "./ExpenseModal";

const ExpenseContainer = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { user } = useSelector((state: RootState) => state.account);
  const { item: order, status } = useSelector((state: RootState) => state.order);

  // Expense Modal
  const [item, setItem] = useState<OrderExpense | null>(null);
  const [productModal, setExpenseModal] = useState<boolean>(false);

  const onCreate = () => {
    setItem(null);
    setExpenseModal(true);
  };

  const onUpdate = (data: OrderExpense) => {
    setItem(data);
    setExpenseModal(true);
  };

  const handleSubmit = (formData: FormData) => {
    if (item) {
      // Update
      dispatch(updateOrderExpense({ id: item.id, data: formData }));
    } else {
      // Create
      formData.append("order", order?.id.toString() || "");
      dispatch(createOrderExpense(formData));
    }
  };

  // Verify Modal
  const [verifyModalData, setVerifyModalData] = useState({
    show: false,
    status: {} as Status,
    action: "",
    icon: "",
    onVerify: () => {},
    message: "Seçilmiş xərci silmək istədiyinizə əminsiniz?",
  });

  // Delete Modal
  const onDelete = (data: OrderExpense) => {
    const handleDelete = () => {
      dispatch(deleteOrderExpense(data.id));
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
      action: deleteOrderExpense.typePrefix,
      onVerify: handleDelete,
    }));
  };

  if (!order || status.loading) return null;

  return (
    <React.Fragment>
      <Col xl="12">
        <Card>
          <CardBody>
            <div className="table-responsive">
              <Table className="table align-middle mb-0 table-nowrap">
                <thead className="table-light">
                  <tr>
                    <th>Ad</th>
                    <th colSpan={2}>Məbləğ</th>
                  </tr>
                </thead>

                <tbody>
                  {order.expenses.map((item) => (
                    <tr key={item.id}>
                      <td>
                        <h5 className="font-size-14 text-truncate">
                          <span className="text-dark">{item.name}</span>
                        </h5>
                      </td>
                      <td>{formatPrice(item.price)}</td>

                      {hasPermission(user, [USER_TYPES.WAREHOUSE]) &&
                        order.status < ORDER_STATUS.INSTALLED && (
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
                            </div>
                          </td>
                        )}
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>

            {hasPermission(user, [USER_TYPES.WAREHOUSE]) &&
              order.status < ORDER_STATUS.INSTALLED && (
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

      {/* Render Expense Modal */}
      {productModal && (
        <ExpenseModal
          data={item}
          show={productModal}
          isEdit={item !== null}
          toggle={() => setExpenseModal(false)}
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

export default ExpenseContainer;
