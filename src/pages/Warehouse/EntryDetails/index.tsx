import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";

// Reactstrap
import { Container } from "reactstrap";

// Components
import Breadcrumbs from "@/components/Breadcrumb";
import VerifyModal from "@/components/VerifyModal";
import Loader from "@/components/Loader";

// Helpers
import { getPageTitle } from "@/helpers";

// Types
import { WarehouseProduct } from "@/types/models";

// Related Components
import ProductModal from "./components/ProductModal";
import DataContainer from "./components/DataContainer";

// Actions
import {
  getWarehouseEntryDetails,
  createWarehouseEntryProduct,
  updateWarehouseEntryProduct,
  deleteWarehouseEntryProduct,
} from "@/store/actions";

const WarehouseEntry = () => {
  const location = useLocation();

  const dispatch = useDispatch<AppDispatch>();
  const { item: entry, status, update } = useSelector((state: RootState) => state.warehouseEntry);

  useEffect(() => {
    const id = location.pathname.split("/").pop();
    dispatch(getWarehouseEntryDetails(Number(id)));
  }, [location]);

  useEffect(() => {
    if (update) {
      const id = location.pathname.split("/").pop();
      dispatch(getWarehouseEntryDetails(Number(id)));
    }
  }, [update]);

  const title = `Giriş #${entry?.id || ""}`;

  document.title = getPageTitle(title);

  // Product Modal
  const [item, setItem] = useState<WarehouseProduct | null>(null);
  const [productModal, setProductModal] = useState<boolean>(false);

  const onAddProduct = () => {
    setItem(null);
    setProductModal(true);
  };

  const onUpdateProduct = (data: WarehouseProduct) => {
    setItem(data);
    setProductModal(true);
  };

  const handleProductSubmit = (formData: FormData) => {
    if (item) {
      // Update
      dispatch(updateWarehouseEntryProduct({ id: item.id, data: formData }));
    } else {
      // Create
      formData.append("entry", entry?.id.toString() || "");
      dispatch(createWarehouseEntryProduct(formData));
    }
  };

  // Delete Modal
  const [deleteModal, setDeleteModal] = useState<boolean>(false);

  const onProductDelete = (data: WarehouseProduct) => {
    setItem(data);
    setDeleteModal(true);
  };

  const handleDelete = () => {
    if (item) dispatch(deleteWarehouseEntryProduct(item.id));
    setDeleteModal(false);
  };

  if (!entry) {
    if (status.loading) {
      return <Loader />;
    }
    return <h1>Not found</h1>;
  }

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
            action={deleteWarehouseEntryProduct.typePrefix}
            onClose={() => setDeleteModal(false)}
            message="Seçilmiş məhsulu silmək istədiyinizə əminsiniz?"
          />
        </Container>
      </div>
    </React.Fragment>
  );
};

export default WarehouseEntry;
