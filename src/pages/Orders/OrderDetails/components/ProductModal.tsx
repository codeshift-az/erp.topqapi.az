import { useEffect, useState } from "react";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";

// Reactstrap
import {
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  Row,
  Col,
  Label,
  Input,
  FormFeedback,
  Alert,
  Spinner,
  Button,
} from "reactstrap";

// React Select
import Select from "react-select";

// Yup and Formik for validation
import * as Yup from "yup";
import { useFormik } from "formik";

// Helpers
import { getOptions, getSelectStyle } from "@/helpers";

// Types
import { Option } from "@/types/option";

// Actions
import {
  getProducts,
  getSuppliers,
  createOrderItem,
  updateOrderItem,
} from "@/store/actions";

interface Props {
  data: any;
  show: boolean;
  isEdit: boolean;
  toggle: () => void;
  handleSubmit: (formData: any) => void;
}

const ProductModal = ({ data, show, isEdit, toggle, handleSubmit }: Props) => {
  const title = isEdit ? "Məhsul məlumatlarını redaktə et" : "Məhsul əlavə Et";

  const dispatch = useDispatch<AppDispatch>();

  const { status, errors } = useSelector((state: RootState) => state.order);

  const [alertError, setAlertError] = useState<string>("");

  // Validation
  const validation = useFormik({
    enableReinitialize: true,

    initialValues: {
      product: (data && data.product && data.product.id) || "",
      supplier: (data && data.supplier && data.supplier.id) || "",
      size: (data && data.size) || "",
      price: (data && data.price) || 0,
      quantity: (data && data.quantity) || 0,
    },

    validationSchema: Yup.object({
      product: Yup.number().required("Zəhmət olmasa məhsul seçin!"),
      supplier: Yup.number().required("Zəhmət olmasa firma seçin!"),
      size: Yup.string()
        .required("Zəhmət olmasa ölçü daxil edin!")
        .max(20, "Ölçü 20 simvoldan çox ola bilməz!"),
      price: Yup.number()
        .required("Zəhmət olmasa qiymət daxil edin!")
        .min(0, "Qiymət 0 vəya 0-dan böyük olmalıdır!"),
      quantity: Yup.number()
        .required("Zəhmət olmasa miqdar daxil edin!")
        .min(1, "Miqdar 0-dan böyük olmalıdır!"),
    }),

    onSubmit: (values) => {
      const formData = new FormData();

      // Product
      if (!data || values["product"] !== data["product"])
        formData.append("product", values["product"]);

      // Supplier
      if (!data || values["supplier"] !== data["supplier"])
        formData.append("supplier", values["supplier"]);

      // Size
      if (!data || values["size"] !== data["size"])
        formData.append("size", values["size"]);

      // Price
      if (!data || values["price"] !== data["price"])
        formData.append("price", values["price"]);

      // Quantity
      if (!data || values["quantity"] !== data["quantity"])
        formData.append("quantity", values["quantity"]);

      handleSubmit(formData);
    },
  });

  // Product Options
  const { items: products } = useSelector((state: RootState) => state.product);

  const [productName, setProductName] = useState<string>("");
  const [productOptions, setProductOptions] = useState<Option[]>([]);

  useEffect(() => {
    dispatch(getProducts({ name: productName }));
  }, [productName]);

  useEffect(() => {
    setProductOptions(getOptions(products));
  }, [products]);

  useEffect(() => {
    if (data && data.product) setProductName(data.product.name);
  }, [data]);

  // Supplier Options
  const { items: suppliers } = useSelector(
    (state: RootState) => state.supplier
  );

  const [supplierName, setSupplierName] = useState<string>("");
  const [supplierOptions, setSupplierOptions] = useState<Option[]>([]);

  useEffect(() => {
    dispatch(
      getSuppliers({ name: supplierName, product: validation.values.product })
    );
  }, [supplierName, validation.values.product]);

  useEffect(() => {
    setSupplierOptions(getOptions(suppliers));
  }, [suppliers]);

  useEffect(() => {
    if (data && data.supplier) setSupplierName(data.supplier.name);
  }, [data]);

  useEffect(() => {
    validation.values.supplier = "";
  }, [validation.values.product]);

  // Success
  useEffect(() => {
    if (show && status) {
      if (
        ((isEdit && status.lastAction === updateOrderItem.typePrefix) ||
          (!isEdit && status.lastAction === createOrderItem.typePrefix)) &&
        status.success
      ) {
        validation.resetForm();
        toggle();
      }
    }
  }, [status]);

  // Failure
  useEffect(() => {
    if (show && status.failure) {
      if (errors && errors.status === 400) {
        validation.setErrors({ ...validation.errors, ...errors.data });
      } else {
        setAlertError("Əməliyyat zamanı xəta baş verdi!");
      }
    }
  }, [errors]);

  return (
    <Modal isOpen={show} toggle={toggle}>
      <ModalHeader toggle={toggle} tag="h4">
        {title}
      </ModalHeader>

      {alertError && (
        <Alert color="danger" className="text-center m-3">
          {alertError}
        </Alert>
      )}

      <ModalBody>
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            validation.handleSubmit();
            return false;
          }}>
          <Row>
            {/* Product */}
            <Col className="col-12 mb-3">
              <Label>Məhsul</Label>

              <Select
                name="product"
                options={productOptions || []}
                onInputChange={(e) => setProductName(e)}
                styles={getSelectStyle(validation, "product")}
                onChange={(e) => {
                  if (e && typeof e === "object" && e.value)
                    validation.setFieldValue("product", e.value);
                }}
                onBlur={() => {
                  validation.setFieldTouched("product", true);
                }}
                value={
                  validation.values.product &&
                  productOptions &&
                  productOptions.find(
                    (option) => option.value === validation.values.product
                  )
                }
              />

              {validation.touched.product && validation.errors.product ? (
                <FormFeedback type="invalid" className="d-block">
                  {validation.errors.product.toString()}
                </FormFeedback>
              ) : null}
            </Col>
          </Row>

          <Row>
            {/* Supplier */}
            <Col className="col-12 mb-3">
              <Label>Firma</Label>

              <Select
                name="supplier"
                options={supplierOptions || []}
                isDisabled={!validation.values.product}
                onInputChange={(e) => setSupplierName(e)}
                styles={getSelectStyle(validation, "supplier")}
                onChange={(e) => {
                  if (e && typeof e === "object" && e.value)
                    validation.setFieldValue("supplier", e.value);
                }}
                onBlur={() => {
                  validation.setFieldTouched("supplier", true);
                }}
                value={
                  validation.values.supplier &&
                  supplierOptions &&
                  supplierOptions.find(
                    (option) => option.value === validation.values.supplier
                  )
                }
              />

              {validation.touched.supplier && validation.errors.supplier ? (
                <FormFeedback type="invalid" className="d-block">
                  {validation.errors.supplier.toString()}
                </FormFeedback>
              ) : null}
            </Col>
          </Row>

          <Row>
            {/* Size */}
            <Col className="col-12 mb-3">
              <Label>Ölçü</Label>

              <Input
                type="text"
                name="size"
                placeholder="Ölçü daxil edin"
                onBlur={validation.handleBlur}
                onChange={validation.handleChange}
                value={validation.values.size}
                invalid={
                  validation.touched.size && validation.errors.size
                    ? true
                    : false
                }
              />

              {validation.touched.size && validation.errors.size ? (
                <FormFeedback type="invalid">
                  {validation.errors.size.toString()}
                </FormFeedback>
              ) : null}
            </Col>
          </Row>

          <Row>
            {/* Price */}
            <Col className="col-12 mb-3">
              <Label>Qiymət</Label>

              <Input
                type="number"
                name="price"
                placeholder="Qiymət daxil edin"
                onBlur={validation.handleBlur}
                onChange={validation.handleChange}
                value={validation.values.price}
                invalid={
                  validation.touched.price && validation.errors.price
                    ? true
                    : false
                }
              />

              {validation.touched.price && validation.errors.price ? (
                <FormFeedback type="invalid">
                  {validation.errors.price.toString()}
                </FormFeedback>
              ) : null}
            </Col>
          </Row>

          <Row>
            {/* Quantity */}
            <Col className="col-12 mb-3">
              <Label>Miqdar</Label>

              <Input
                type="number"
                name="quantity"
                placeholder="Miqdar daxil edin"
                onBlur={validation.handleBlur}
                onChange={validation.handleChange}
                value={validation.values.quantity}
                invalid={
                  validation.touched.quantity && validation.errors.quantity
                    ? true
                    : false
                }
              />

              {validation.touched.quantity && validation.errors.quantity ? (
                <FormFeedback type="invalid">
                  {validation.errors.quantity.toString()}
                </FormFeedback>
              ) : null}
            </Col>
          </Row>

          <Row>
            {/* Submit */}
            <Col className="text-end">
              <Button color="success" type="submit">
                {status && status.loading ? (
                  <Spinner color="primary" size="sm" className="mr-1" />
                ) : isEdit ? (
                  "Yadda Saxla"
                ) : (
                  "Əlavə et"
                )}
              </Button>
            </Col>
          </Row>
        </Form>
      </ModalBody>
    </Modal>
  );
};

export default ProductModal;
