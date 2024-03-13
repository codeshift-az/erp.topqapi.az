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
import { ProductRecord } from "@/types/models";

// Actions
import { createProductRecord, updateProductRecord, deleteProductRecord } from "@/store/actions";

// Related components
import TableContainer from "./components/TableContainer";
import FormModal from "./components/FormModal";

const ProductCatalog = () => {
  const title = "Məhsul Kataloqu";

  document.title = getPageTitle(title);

  const dispatch = useDispatch<AppDispatch>();
  const { status } = useSelector((state: RootState) => state.catalog);

  // Selected item
  const [item, setItem] = useState<ProductRecord | null>(null);

  // Form Modal
  const [formModal, setFormModal] = useState<boolean>(false);

  const onCreate = () => {
    setItem(null);
    setFormModal(true);
  };

  const onUpdate = (data: ProductRecord) => {
    setItem(data);
    setFormModal(true);
  };

  const handleSubmit = (formData: FormData) => {
    if (item !== null) {
      dispatch(updateProductRecord({ id: item!.id, data: formData }));
    } else {
      dispatch(createProductRecord(formData));
    }
  };

  // Delete Modal
  const [deleteModal, setDeleteModal] = useState<boolean>(false);

  const onDelete = (data: ProductRecord) => {
    setItem(data);
    setDeleteModal(true);
  };

  const handleDelete = () => {
    if (item) dispatch(deleteProductRecord(item.id));
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
            action={deleteProductRecord.typePrefix}
            onClose={() => setDeleteModal(false)}
            message="Seçilmiş məlumatı silmək istədiyinizə əminsiniz?"
          />
        </Container>
      </div>
    </React.Fragment>
  );
};

export default ProductCatalog;
