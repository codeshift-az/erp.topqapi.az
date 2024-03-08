import React, { useState } from "react";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";

// Reactstrap
import { Container } from "reactstrap";

// Components
import Breadcrumbs from "@/components/Breadcrumb";

// Helpers
import { getPageTitle } from "@/helpers";

// Types
import { WarehouseCartItem } from "@/types/models";

// Actions
import {
  createWarehouseCartItem,
  deleteWarehouseCartItem,
  updateWarehouseCartItem,
} from "@/store/actions";

// Related Components
import ProductModal from "./components/ProductModal";
import DataContainer from "./components/DataContainer";
import VerifyModal from "@/components/VerifyModal";

const WarehouseNewEntry = () => {
  const title = "Yeni Giriş";

  document.title = getPageTitle(title);

  const dispatch = useDispatch<AppDispatch>();
  const { status } = useSelector((state: RootState) => state.warehouseCart);

  // Product Modal
  const [item, setItem] = useState<WarehouseCartItem | null>(null);
  const [productModal, setProductModal] = useState<boolean>(false);

  const onAddProduct = () => {
    setItem(null);
    setProductModal(true);
  };

  const onUpdateProduct = (data: WarehouseCartItem) => {
    setItem(data);
    setProductModal(true);
  };

  const handleProductSubmit = (formData: FormData) => {
    if (item) {
      // Update
      dispatch(updateWarehouseCartItem({ id: item.id, data: formData }));
    } else {
      // Create
      dispatch(createWarehouseCartItem(formData));
    }
  };

  // Delete Modal
  const [deleteModal, setDeleteModal] = useState<boolean>(false);

  const onProductDelete = (data: WarehouseCartItem) => {
    setItem(data);
    setDeleteModal(true);
  };

  const handleDelete = () => {
    if (item) dispatch(deleteWarehouseCartItem(item.id));
    setDeleteModal(false);
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs
            title={title}
            breadcrumbItems={[
              { title: "Ana Səhifə", url: "/" },
              { title: "Anbar", url: "/warehouse" },
              { title: "Giriş tarixçəsi", url: "/warehouse/entries" },
              { title: title },
            ]}
          />

          <DataContainer
            onAddProduct={onAddProduct}
            onUpdateProduct={onUpdateProduct}
            onDeleteProduct={onProductDelete}
          />

          {/* Render Product Modal */}
          <ProductModal
            data={item}
            show={productModal}
            isEdit={item !== null}
            toggle={() => setProductModal(false)}
            handleSubmit={handleProductSubmit}
          />

          {/* Render Delete Modal */}
          <VerifyModal
            status={status}
            show={deleteModal}
            onVerify={handleDelete}
            action={deleteWarehouseCartItem.typePrefix}
            onClose={() => setDeleteModal(false)}
            message="Seçilmiş məhsulu silmək istədiyinizə əminsiniz?"
          />
        </Container>
      </div>
    </React.Fragment>
  );
};

export default WarehouseNewEntry;
