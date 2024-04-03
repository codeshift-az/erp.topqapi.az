import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";

// Reactstrap
import { Button, Card, CardBody, CardTitle, Col, Table } from "reactstrap";

// Components
import VerifyModal from "@/components/VerifyModal";

// Actions
import { deleteWarehouseEntry, updateWarehouseEntry } from "@/store/actions";

// Related Components
import EntryModal from "./EntryModal";

const EntryContainer = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();
  const { item: entry, status } = useSelector((state: RootState) => state.warehouseEntry);

  // Entry Modal
  const [entryModal, setEntryModal] = useState<boolean>(false);

  const onUpdate = () => {
    setEntryModal(true);
  };

  const handleSubmit = (formData: FormData) => {
    if (entry) dispatch(updateWarehouseEntry({ id: entry.id, data: formData }));
  };

  // Delete Modal
  const [deleteModal, setDeleteModal] = useState<boolean>(false);

  const onDelete = () => {
    setDeleteModal(true);
  };

  const handleDelete = () => {
    if (entry) dispatch(deleteWarehouseEntry(entry.id)).then(() => navigate("/warehouse/entries"));
    setDeleteModal(false);
  };

  if (!entry) return null;

  return (
    <React.Fragment>
      <Col xl="12">
        <Card>
          <CardBody>
            <CardTitle className="mb-3">Giriş məlumatları</CardTitle>

            <div className="table-responsive">
              <Table className="table mb-0">
                <tbody>
                  <tr>
                    <td>Firma: </td>
                    <td>{entry.supplier.name}</td>
                  </tr>

                  <tr>
                    <td>Firma Qaimə kodu: </td>
                    <td>{entry.invoice}</td>
                  </tr>

                  <tr>
                    <td>Tarix: </td>
                    <td>{entry.date}</td>
                  </tr>

                  <tr>
                    <th>Ümumi Cəm :</th>
                    <th>
                      {entry.items
                        .reduce(
                          (a, b) =>
                            Number(a) + Number(b["price"] || 0) * Number(b["quantity"] || 0),
                          0
                        )
                        .toFixed(2)}{" "}
                      AZN
                    </th>
                  </tr>

                  <tr>
                    <th colSpan={2}>
                      <div className="d-flex justify-content-between">
                        <Link
                          to={`/warehouse/entries/${entry.id}/invoice`}
                          className="btn btn-primary mb-2 col-2">
                          <i className={`mdi mdi-printer me-1`} />
                          Qaimə
                        </Link>

                        <Link to={`/warehouse/entries/`} className="btn btn-success mb-2 col-2">
                          <i className={`mdi mdi-check me-1`} />
                          Yadda Saxla
                        </Link>

                        {onUpdate && (
                          <Button color="success" className="mb-2 col-2" onClick={() => onUpdate()}>
                            <i className={`mdi mdi-pencil me-1`} />
                            Redaktə et
                          </Button>
                        )}

                        {onDelete && (
                          <Button color="danger" className="mb-2 col-2" onClick={() => onDelete()}>
                            <i className={`mdi mdi-trash-can me-1`} />
                            Sil
                          </Button>
                        )}
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
          data={entry}
          show={entryModal}
          toggle={() => setEntryModal(false)}
          handleSubmit={handleSubmit}
        />
      )}

      {/* Render Delete Modal */}
      {deleteModal && (
        <VerifyModal
          status={status}
          show={deleteModal}
          onVerify={handleDelete}
          action={deleteWarehouseEntry.typePrefix}
          onClose={() => setDeleteModal(false)}
          message="Seçilmiş məhsulu silmək istədiyinizə əminsiniz?"
        />
      )}
    </React.Fragment>
  );
};

export default EntryContainer;
