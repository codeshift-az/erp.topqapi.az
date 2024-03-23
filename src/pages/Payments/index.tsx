import React, { useState } from "react";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";

// Reactstrap
import { Container } from "reactstrap";

// Components
import Breadcrumbs from "@/components/Breadcrumb";
import VerifyModal from "@/components/VerifyModal";

// Helpers
import { getPageTitle } from "@/helpers";

// Types
import { Payment } from "@/types/models";

// Actions
import { createPayment, updatePayment, deletePayment } from "@/store/actions";

// Related components
import TableContainer from "./components/TableContainer";
import FormModal from "./components/FormModal";

const Payments = () => {
  const title = "Ödənişlər";

  document.title = getPageTitle(title);

  const dispatch = useDispatch<AppDispatch>();
  const { status } = useSelector((state: RootState) => state.payment);

  // Selected item
  const [item, setItem] = useState<Payment | null>(null);

  // Form Modal
  const [formModal, setFormModal] = useState<boolean>(false);

  const onCreate = () => {
    setItem(null);
    setFormModal(true);
  };

  const onUpdate = (data: Payment) => {
    setItem(data);
    setFormModal(true);
  };

  const handleSubmit = (formData: FormData) => {
    if (item !== null) {
      dispatch(updatePayment({ id: item!.id, data: formData }));
    } else {
      dispatch(createPayment(formData));
    }
  };

  // Delete Modal
  const [deleteModal, setDeleteModal] = useState<boolean>(false);

  const onDelete = (data: Payment) => {
    setItem(data);
    setDeleteModal(true);
  };

  const handleDelete = () => {
    if (item) dispatch(deletePayment(item.id));
    setDeleteModal(false);
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs
            title={title}
            breadcrumbItems={[{ title: "Ana Səhifə", url: "/" }, { title: title }]}
          />

          {/* Render Table Container */}
          <TableContainer onCreate={onCreate} onUpdate={onUpdate} onDelete={onDelete} />

          {/* Render Form Modal */}
          {formModal && (
            <FormModal
              data={item}
              show={formModal}
              isEdit={item !== null}
              toggle={() => setFormModal(false)}
              handleSubmit={handleSubmit}
            />
          )}

          {/* Render Delete Modal */}
          {deleteModal && (
            <VerifyModal
              status={status}
              show={deleteModal}
              onVerify={handleDelete}
              action={deletePayment.typePrefix}
              onClose={() => setDeleteModal(false)}
              message="Seçilmiş məlumatı silmək istədiyinizə əminsiniz?"
            />
          )}
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Payments;
