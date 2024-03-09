import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";

// Reactstrap
import { Button, Card, CardBody, CardTitle, Col, Table } from "reactstrap";

// Actions
import { createWarehouseEntry } from "@/store/actions";

// Related Components
import EntryModal from "./EntryModal";

const EntryContainer = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();
  const { items } = useSelector((state: RootState) => state.warehouseCart);

  // Entry Modal
  const [entryModal, setEntryModal] = useState<boolean>(false);

  const onEdit = () => {
    setEntryModal(true);
  };

  const handleSubmit = (formData: FormData) => {
    dispatch(createWarehouseEntry(formData)).then(({ payload }: any) => {
      if (payload) navigate(`/warehouse/entries/${payload.id}`);
    });
  };

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
                    <td>Firma: </td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>Qaimə kodu: </td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>Tarix: </td>
                    <td></td>
                  </tr>
                  <tr>
                    <th>Ümumi Cəm :</th>
                    <th>
                      {items?.reduce(
                        (a, b) => Number(a) + Number(b["price"] || 0) * Number(b["quantity"] || 0),
                        0
                      ) || 0}{" "}
                      AZN
                    </th>
                  </tr>

                  <tr>
                    <th colSpan={2}>
                      <div className="d-flex justify-content-between">
                        <Button color="success" className="mb-2 col-12" onClick={onEdit}>
                          <i className={`mdi mdi-check-bold me-1`} />
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
      {entryModal && (
        <EntryModal
          show={entryModal}
          toggle={() => setEntryModal(false)}
          handleSubmit={handleSubmit}
        />
      )}
    </React.Fragment>
  );
};

export default EntryContainer;
