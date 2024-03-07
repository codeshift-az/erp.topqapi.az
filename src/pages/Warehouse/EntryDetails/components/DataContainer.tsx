import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Redux
import { AppDispatch, RootState } from "@/store";
import { useDispatch, useSelector } from "react-redux";

// Reactstrap
import { Row, Col, Card, CardBody, Button, Table, CardTitle } from "reactstrap";

// Actions
import { getWarehouseEntryDetails } from "@/store/actions";
import Loader from "@/components/Loader";

interface Props {
  onCreate?: () => void;
  onUpdate?: () => void;
  onDelete?: () => void;
}

const DataContainer = ({ onCreate, onUpdate, onDelete }: Props) => {
  const location = useLocation();

  const dispatch = useDispatch<AppDispatch>();
  const { item: entry, status } = useSelector((state: RootState) => state.warehouseEntry);

  useEffect(() => {
    const id = location.pathname.split("/").pop();
    dispatch(getWarehouseEntryDetails(Number(id)));
  }, [location]);

  if (!entry) {
    if (status.loading) {
      return <Loader />;
    }
    return <h1>Not found</h1>;
  }

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
                  {entry.products.map((item) => (
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
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>

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
          </CardBody>
        </Card>
      </Col>

      <Col xl="4">
        <Card>
          <CardBody>
            <CardTitle className="mb-3 d-flex justify-content-between">
              Giriş məlumatları
            </CardTitle>

            <div className="table-responsive">
              <Table className="table mb-0">
                <tbody>
                  <tr>
                    <td>Firma: </td>
                    <td>{entry.supplier.name}</td>
                  </tr>
                  <tr>
                    <td>Qaimə kodu: </td>
                    <td>{entry.invoice}</td>
                  </tr>
                  <tr>
                    <td>Tarix: </td>
                    <td>{entry.date}</td>
                  </tr>
                  <tr>
                    <th>Ümumi Cəm :</th>
                    <th>
                      {entry.products.reduce(
                        (a, b) => Number(a) + Number(b["price"] || 0) * Number(b["quantity"] || 0),
                        0
                      )}{" "}
                      AZN
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
