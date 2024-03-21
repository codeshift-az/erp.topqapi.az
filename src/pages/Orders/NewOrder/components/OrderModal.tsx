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

// Constants
import { USER_TYPES } from "@/constants";

// Helpers
import { getOptions, getSelectStyle } from "@/helpers";

// Types
import { Option } from "@/types/option";

// Actions
import { getBranches, getSellers, createOrder } from "@/store/actions";

interface Props {
  show: boolean;
  toggle: () => void;
  handleSubmit: (formData: any) => void;
}

const OrderModal = ({ show, toggle, handleSubmit }: Props) => {
  const title = "Sifariş məlumatlarını daxil et";

  const dispatch = useDispatch<AppDispatch>();

  const { user } = useSelector((state: RootState) => state.account);
  const { status, errors } = useSelector((state: RootState) => state.order);

  const [alertError, setAlertError] = useState<string>("");

  // Validation
  const validation = useFormik({
    enableReinitialize: true,

    initialValues: {
      branch: (user && user.type === USER_TYPES.STORE && user.branch.id) || "",
      seller: "",
      customer: "",
      phone: "",
      address: "",
      discount: 0,
      seller_share: 0,
      note: "",
      sale_date: new Date().toISOString().split("T")[0],
    },

    validationSchema: Yup.object({
      branch: Yup.number().required("Zəhmət olmasa filial seçin!"),
      seller: Yup.number().required("Zəhmət olmasa satıcı seçin!"),
      customer: Yup.string().required("Zəhmət olmasa müştəri adı daxil edin!"),
      phone: Yup.string().required("Zəhmət olmasa telefon nömrəsi daxil edin!"),
      address: Yup.string().required("Zəhmət olmasa ünvan daxil edin!"),
      discount: Yup.number(),
      seller_share: Yup.number(),
      note: Yup.string(),
      sale_date: Yup.string().required("Zəhmət olmasa tarix daxil edin!"),
    }),

    onSubmit: (values) => {
      const formData = new FormData();

      // Branch
      formData.append("branch", values["branch"].toString());

      // Seller
      formData.append("seller", values["seller"]);

      // Customer
      formData.append("customer", values["customer"]);

      // Phone
      formData.append("phone", values["phone"]);

      // Address
      formData.append("address", values["address"]);

      // Note
      formData.append("note", values["note"]);

      // Discount
      formData.append("discount", values["discount"].toString());

      // Seller Share
      formData.append("seller_share", values["seller_share"].toString());

      // Date
      formData.append("sale_date", values["sale_date"]);

      handleSubmit(formData);
    },
  });

  // Branch Options
  const { items: branches } = useSelector((state: RootState) => state.branch);

  const [branchName, setBranchName] = useState<string>("");
  const [branchOptions, setBranchOptions] = useState<Option[]>([]);

  useEffect(() => {
    dispatch(getBranches({ name: branchName }));
  }, [branchName]);

  useEffect(() => {
    setBranchOptions(getOptions(branches));
  }, [branches]);

  useEffect(() => {
    if (user && user.type === USER_TYPES.STORE) {
      setBranchName(user.branch.name);
    }
  }, [user]);

  // Seller Options
  const { items: sellers } = useSelector((state: RootState) => state.seller);

  const [sellerName, setSellerName] = useState<string>("");
  const [sellerOptions, setSellerOptions] = useState<Option[]>([]);

  useEffect(() => {
    dispatch(getSellers({ name: sellerName, branch_id: Number(validation.values.branch) }));
  }, [sellerName, validation.values.branch]);

  useEffect(() => {
    setSellerOptions(getOptions(sellers));
  }, [sellers]);

  useEffect(() => {
    validation.values.seller = "";
  }, [validation.values.branch]);

  // Success
  useEffect(() => {
    if (show && status) {
      if (status.lastAction === createOrder.typePrefix && status.success) {
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
            {/* Branch */}
            <Col className="col-12 mb-3">
              <Label>Filial</Label>

              <Select
                name="branch"
                options={branchOptions || []}
                isDisabled={user?.type === USER_TYPES.STORE}
                onInputChange={(e) => setBranchName(e)}
                styles={getSelectStyle(validation, "branch")}
                onChange={(e) => {
                  if (e && typeof e === "object" && e.value)
                    validation.setFieldValue("branch", e.value);
                }}
                onBlur={() => {
                  validation.setFieldTouched("branch", true);
                }}
                value={
                  validation.values.branch &&
                  branchOptions &&
                  branchOptions.find((option) => option.value === validation.values.branch)
                }
              />

              {validation.touched.branch && validation.errors.branch ? (
                <FormFeedback type="invalid" className="d-block">
                  {validation.errors.branch.toString()}
                </FormFeedback>
              ) : null}
            </Col>
          </Row>

          <Row>
            {/* Seller */}
            <Col className="col-12 mb-3">
              <Label>Satıcı</Label>

              <Select
                name="seller"
                options={sellerOptions || []}
                isDisabled={!validation.values.branch}
                onInputChange={(e) => setSellerName(e)}
                styles={getSelectStyle(validation, "seller")}
                onChange={(e) => {
                  if (e && typeof e === "object" && e.value)
                    validation.setFieldValue("seller", e.value);
                }}
                onBlur={() => {
                  validation.setFieldTouched("seller", true);
                }}
                value={
                  validation.values.seller &&
                  sellerOptions &&
                  sellerOptions.find((option) => option.value === validation.values.seller)
                }
              />

              {validation.touched.seller && validation.errors.seller ? (
                <FormFeedback type="invalid" className="d-block">
                  {validation.errors.seller.toString()}
                </FormFeedback>
              ) : null}
            </Col>
          </Row>

          <Row>
            {/* Customer */}
            <Col className="col-12 mb-3">
              <Label>Müştəri adı</Label>

              <Input
                type="text"
                name="customer"
                placeholder="Müştəri adını daxil edin"
                onBlur={validation.handleBlur}
                onChange={validation.handleChange}
                value={validation.values.customer}
                invalid={validation.touched.customer && validation.errors.customer ? true : false}
              />

              {validation.touched.customer && validation.errors.customer ? (
                <FormFeedback type="invalid">{validation.errors.customer.toString()}</FormFeedback>
              ) : null}
            </Col>
          </Row>

          <Row>
            {/* Phone */}
            <Col className="col-12 mb-3">
              <Label>Müştəri telefon nömrəsi</Label>

              <Input
                type="text"
                name="phone"
                placeholder="Müştəri telefon nömrəsi daxil edin"
                onBlur={validation.handleBlur}
                onChange={validation.handleChange}
                value={validation.values.phone}
                invalid={validation.touched.phone && validation.errors.phone ? true : false}
              />

              {validation.touched.phone && validation.errors.phone ? (
                <FormFeedback type="invalid">{validation.errors.phone.toString()}</FormFeedback>
              ) : null}
            </Col>
          </Row>

          <Row>
            {/* Address */}
            <Col className="col-12 mb-3">
              <Label>Müştəri ünvanı</Label>

              <Input
                type="text"
                name="address"
                placeholder="Müştəri ünvanını daxil edin"
                onBlur={validation.handleBlur}
                onChange={validation.handleChange}
                value={validation.values.address}
                invalid={validation.touched.address && validation.errors.address ? true : false}
              />

              {validation.touched.address && validation.errors.address ? (
                <FormFeedback type="invalid">{validation.errors.address.toString()}</FormFeedback>
              ) : null}
            </Col>
          </Row>

          <Row>
            {/* Discount */}
            <Col className="col-12 mb-3">
              <Label>Endirim</Label>

              <Input
                type="number"
                name="discount"
                placeholder="Endirim daxil edin"
                onBlur={validation.handleBlur}
                onChange={validation.handleChange}
                value={validation.values.discount}
                invalid={validation.touched.discount && validation.errors.discount ? true : false}
              />

              {validation.touched.discount && validation.errors.discount ? (
                <FormFeedback type="invalid">{validation.errors.discount.toString()}</FormFeedback>
              ) : null}
            </Col>
          </Row>

          <Row>
            {/* Seller Share */}
            <Col className="col-12 mb-3">
              <Label>Satıcı payı</Label>

              <Input
                type="number"
                name="seller_share"
                placeholder="Satıcı payı daxil edin"
                onBlur={validation.handleBlur}
                onChange={validation.handleChange}
                value={validation.values.seller_share}
                invalid={
                  validation.touched.seller_share && validation.errors.seller_share ? true : false
                }
              />

              {validation.touched.seller_share && validation.errors.seller_share ? (
                <FormFeedback type="invalid">
                  {validation.errors.seller_share.toString()}
                </FormFeedback>
              ) : null}
            </Col>
          </Row>

          <Row>
            {/* Note */}
            <Col className="col-12 mb-3">
              <Label>Qeyd</Label>

              <Input
                type="textarea"
                name="note"
                placeholder="Qeyd daxil edin"
                onBlur={validation.handleBlur}
                onChange={validation.handleChange}
                value={validation.values.note}
                invalid={validation.touched.note && validation.errors.note ? true : false}
              />

              {validation.touched.note && validation.errors.note ? (
                <FormFeedback type="invalid">{validation.errors.note.toString()}</FormFeedback>
              ) : null}
            </Col>
          </Row>

          <Row>
            {/* Sale Date */}
            <Col className="col-12 mb-3">
              <Label>Tarix</Label>

              <Input
                name="sale_date"
                type="date"
                placeholder="Satış tarixi daxil edin"
                onBlur={validation.handleBlur}
                onChange={validation.handleChange}
                value={validation.values.sale_date}
                invalid={validation.touched.sale_date && validation.errors.sale_date ? true : false}
              />

              {validation.touched.sale_date && validation.errors.sale_date ? (
                <FormFeedback type="invalid">{validation.errors.sale_date.toString()}</FormFeedback>
              ) : null}
            </Col>
          </Row>

          <Row>
            {/* Submit */}
            <Col className="text-end">
              <Button color="success" type="submit">
                {status && status.loading ? (
                  <Spinner color="primary" size="sm" className="mr-1" />
                ) : (
                  "Yadda Saxla"
                )}
              </Button>
            </Col>
          </Row>
        </Form>
      </ModalBody>
    </Modal>
  );
};

export default OrderModal;
