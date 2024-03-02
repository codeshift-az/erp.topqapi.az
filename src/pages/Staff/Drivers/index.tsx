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
import { Driver } from "@/types/models";

// Actions
import { createDriver, deleteDriver, updateDriver } from "@/store/actions";

// Related components
import TableContainer from "./components/TableContainer";
import FormModal from "./components/FormModal";

const Drivers = () => {
  const title = "Sürücülər";

  document.title = getPageTitle(title);

  const dispatch = useDispatch<AppDispatch>();
  const { status } = useSelector((state: RootState) => state.driver);

  // Selected item
  const [item, setItem] = useState<Driver | null>(null);

  // Form Modal
  const [formModal, setFormModal] = useState<boolean>(false);

  const onCreate = () => {
    setItem(null);
    setFormModal(true);
  };

  const onUpdate = (data: Driver) => {
    setItem(data);
    setFormModal(true);
  };

  const handleSubmit = (formData: FormData) => {
    if (item !== null) {
      dispatch(updateDriver({ id: item!.id, data: formData }));
    } else {
      dispatch(createDriver(formData));
    }
  };

  // Delete Modal
  const [deleteModal, setDeleteModal] = useState<boolean>(false);

  const onDelete = (data: Driver) => {
    setItem(data);
    setDeleteModal(true);
  };

  const handleDelete = () => {
    if (item) dispatch(deleteDriver(item.id));
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
          <FormModal
            data={item}
            show={formModal}
            isEdit={item !== null}
            toggle={() => setFormModal(false)}
            handleSubmit={handleSubmit}
          />

          {/* Render Delete Modal */}
          <VerifyModal
            status={status}
            show={deleteModal}
            onVerify={handleDelete}
            action={deleteDriver.typePrefix}
            onClose={() => setDeleteModal(false)}
            message="Seçilmiş məlumatı silmək istədiyinizə əminsiniz?"
          />
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Drivers;
