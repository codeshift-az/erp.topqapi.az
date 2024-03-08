// Reactstrap
import { Row, Col, Card, CardBody, Button, Table, CardTitle } from "reactstrap";

// Types
import { WarehouseCartItem, WarehouseEntry } from "@/types/models";
import { AppDispatch, RootState } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getWarehouseCartItems } from "@/store/actions";

interface Props {
  entry?: WarehouseEntry;
  onAddProduct?: () => void;
  onUpdateProduct?: (data: WarehouseCartItem) => void;
  onDeleteProduct?: (data: WarehouseCartItem) => void;
  onUpdate?: () => void;
  onSubmit?: () => void;
}

const DataContainer = ({
  entry,
  onAddProduct,
  onUpdateProduct,
  onDeleteProduct,
  onUpdate,
  onSubmit,
}: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    items: cartItems,
    status,
    update,
  } = useSelector((state: RootState) => state.warehouseCart);

  useEffect(() => {
    // Fetch Cart Items
    dispatch(getWarehouseCartItems());
  }, []);

  useEffect(() => {
    if (update) dispatch(getWarehouseCartItems());
  }, [update]);

  return (
    <Row>
      <Col lx="8">
        <Card>
          <CardBody>
            <div className="table-responsive">
              <Table className="table align-middle mb-0 table-nowrap">
                <thead className="table-light">
                  <tr>
                    <th>Məhsul</th>
                    <th>Qiymət</th>
                    <th>Miqdar</th>
                    <th colSpan={2}>Cəm</th>
                  </tr>
                </thead>

                <tbody>
                  {cartItems && !status.loading ? (
                    cartItems.map((item) => (
                      <tr key={item.id}>
                        <td>
                          <h5 className="font-size-14 text-truncate">
                            <span className="text-dark">{item.product.name}</span>
                          </h5>
                          <p className="mb-0">{`Kateqoriya: ${item.product.category.name}`}</p>
                        </td>
                        <td>{item.price} AZN</td>
                        <td>{item.quantity}</td>
                        <td>{Number(item.price) * Number(item.quantity)} AZN</td>
                        <td>
                          <div className="d-flex gap-3">
                            {onUpdateProduct && (
                              <a
                                role="button"
                                className="action-icon text-success"
                                onClick={() => onUpdateProduct(item)}>
                                <i className="mdi mdi-pencil font-size-18" />
                              </a>
                            )}
                            {onDeleteProduct && (
                              <a
                                role="button"
                                className="action-icon text-danger"
                                onClick={() => onDeleteProduct(item)}>
                                <i className="mdi mdi-trash-can font-size-18" />
                              </a>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="text-center">
                        <div className="spinner-border spinner-border-sm" role="status">
                          <span className="visually-hidden">Loading...</span>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </div>

            <Row className="mt-4">
              <Col sm="6">
                <div className="text-sm-end mt-2 mt-sm-0">
                  <Button color="primary" className="mb-2 me-2" onClick={onAddProduct}>
                    <i className={`mdi mdi-plus-circle-outline me-1`} />
                    Əlavə et
                  </Button>
                </div>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </Col>

      <Col xl="4">
        <Card>
          <CardBody>
            <CardTitle className="mb-3">Giriş məlumatları</CardTitle>

            <div className="table-responsive">
              <Table className="table mb-0">
                <tbody>
                  <tr>
                    <td>Firma: </td>
                    <td>{entry?.supplier?.name}</td>
                  </tr>
                  <tr>
                    <td>Qaimə kodu: </td>
                    <td>{entry?.invoice}</td>
                  </tr>
                  <tr>
                    <td>Tarix: </td>
                    <td>{entry?.date}</td>
                  </tr>
                  <tr>
                    <th>Ümumi Cəm :</th>
                    <th>
                      {cartItems?.reduce(
                        (a, b) => Number(a) + Number(b["price"] || 0) * Number(b["quantity"] || 0),
                        0
                      ) || 0}{" "}
                      AZN
                    </th>
                  </tr>

                  <tr>
                    <th colSpan={2}>
                      <div className="d-flex justify-content-between">
                        <Button color="primary" className="mb-2 col-5" onClick={onUpdate}>
                          <i className={`mdi mdi-pencil me-1`} />
                          Düzəliş et
                        </Button>

                        <Button color="success" className="mb-2 col-5" onClick={onSubmit}>
                          <i className={`mdi mdi-check-bold me-1`} />
                          Girişi tamamla
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
    </Row>
  );
};

export default DataContainer;
