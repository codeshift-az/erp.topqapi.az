import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";

// Reactstrap
import { Button, Card, CardBody, CardTitle, Col, Table } from "reactstrap";

// Actions
import { createOrder } from "@/store/actions";

// Related Components
import OrderModal from "./OrderModal";

const OrderContainer = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();
  const { items } = useSelector((state: RootState) => state.orderCart);

  // Order Modal
  const [orderModal, setOrderModal] = useState<boolean>(false);

  const onEdit = () => {
    setOrderModal(true);
  };

  const handleSubmit = (formData: FormData) => {
    dispatch(createOrder(formData)).then(({ payload }: any) => {
      if (payload) navigate(`/orders/${payload.id}`);
    });
  };

  const [priceSum, setPriceSum] = useState<number>(0);

  useEffect(() => {
    if (items && items.length > 0) {
      const sum = items.reduce(
        (a, b) => Number(a) + Number(b["price"] || 0) * Number(b["quantity"] || 0),
        0
      );
      setPriceSum(sum);
    }
  }, [items]);

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
                    <td>Satış kodu: </td>
                    <td>#</td>
                  </tr>

                  <tr>
                    <td>Filial: </td>
                    <td></td>
                  </tr>

                  <tr>
                    <td>Satıcı: </td>
                    <td></td>
                  </tr>

                  <tr>
                    <td>Müştəri adı: </td>
                    <td></td>
                  </tr>

                  <tr>
                    <td>Müştəri telefon: </td>
                    <td></td>
                  </tr>

                  <tr>
                    <td>Müştəri adresi: </td>
                    <td></td>
                  </tr>

                  <tr>
                    <th>Status :</th>
                    <th></th>
                  </tr>

                  <tr>
                    <td>Satış Tarixi: </td>
                    <td></td>
                  </tr>

                  <tr>
                    <th>Ümumi Cəm :</th>
                    <th>{priceSum} AZN</th>
                  </tr>

                  <tr>
                    <td>Endirim: </td>
                    <td></td>
                  </tr>

                  <tr>
                    <th>Toplam :</th>
                    <th>{priceSum} AZN</th>
                  </tr>

                  <tr>
                    <td>Satıcı Payı: </td>
                    <td></td>
                  </tr>

                  <tr>
                    <td>Qeyd: </td>
                    <td></td>
                  </tr>

                  <tr>
                    <th colSpan={2}>
                      <div className="d-flex justify-content-between">
                        <Button color="primary" className="mb-2 col-12" onClick={onEdit}>
                          <i className={`mdi mdi-pencil me-1`} />
                          Məlumatları daxil et
                        </Button>
                      </div>
                    </th>
                  </tr>
                </tbody>
              </Table>
            </div>
          </CardBody>
        </Card>
      </Col>

      {/* Render Product Modal */}
      {orderModal && (
        <OrderModal
          show={orderModal}
          toggle={() => setOrderModal(false)}
          handleSubmit={handleSubmit}
        />
      )}
    </React.Fragment>
  );
};

export default OrderContainer;
