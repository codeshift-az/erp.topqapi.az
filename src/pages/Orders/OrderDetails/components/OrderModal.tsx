import React, { useEffect, useState } from "react";

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
import { ORDER_STATUS, USER_TYPES } from "@/constants";

// Helpers
import { getOptions, getSelectStyle, hasPermission } from "@/helpers";

// Types
import { Option } from "@/types/option";

// Actions
import { getBranches, getSellers, getWorkers, getDrivers, updateOrder } from "@/store/actions";

interface Props {
  data: any;
  show: boolean;
  toggle: () => void;
  handleSubmit: (formData: any) => void;
}

const OrderModal = ({ data, show, toggle, handleSubmit }: Props) => {
  const title = "Sifariş məlumatlarını redaktə et";

  const dispatch = useDispatch<AppDispatch>();

  const { user } = useSelector((state: RootState) => state.account);
  const { status, errors } = useSelector((state: RootState) => state.order);

  const [alertError, setAlertError] = useState<string>("");

  // Validation
  const validation = useFormik({
    enableReinitialize: true,

    initialValues: {
      branch: (data && data.branch && data.branch.id) || "",
      seller: (data && data.seller && data.seller.id) || "",
      customer: (data && data.customer) || "",
      phone: (data && data.phone) || "",
      address: (data && data.address) || "",
      discount: (data && data.discount) || 0,
      payed: (data && data.payed) || 0,
      seller_share: (data && data.seller_share) || 0,
      note: (data && data.note) || "",
      sale_date: (data && data.sale_date) || new Date().toISOString().split("T")[0],
      driver: (data && data.driver && data.driver.id) || "",
      delivery_date: (data && data.delivery_date) || "",
      worker: (data && data.worker && data.worker.id) || "",
      install_date: (data && data.install_date) || "",
    },

    validationSchema: Yup.object({
      branch: Yup.number().required("Zəhmət olmasa filial seçin!"),
      seller: Yup.number().required("Zəhmət olmasa satıcı seçin!"),
      customer: Yup.string().required("Zəhmət olmasa müştəri adı daxil edin!"),
      phone: Yup.string().required("Zəhmət olmasa telefon nömrəsi daxil edin!"),
      address: Yup.string().required("Zəhmət olmasa ünvan daxil edin!"),
      discount: Yup.number(),
      payed: Yup.number().required("Zəhmət olmasa ödənilən məbləğ daxil edin!"),
      seller_share: Yup.number(),
      note: Yup.string(),
      sale_date: Yup.string().required("Zəhmət olmasa satış tarixi daxil edin!"),
      driver: Yup.number(),
      delivery_date: Yup.string(),
      worker: Yup.number(),
      install_date: Yup.string(),
    }),

    onSubmit: (values) => {
      const formData = new FormData();

      // Branch
      if (!data || values["branch"] !== data["branch"]) formData.append("branch", values["branch"]);

      // Seller
      if (!data || values["seller"] !== data["seller"]) formData.append("seller", values["seller"]);

      // Customer
      if (!data || values["customer"] !== data["customer"])
        formData.append("customer", values["customer"]);

      // Phone
      if (!data || values["phone"] !== data["phone"]) formData.append("phone", values["phone"]);

      // Address
      if (!data || values["address"] !== data["address"])
        formData.append("address", values["address"]);

      // Discount
      if (!data || values["discount"] !== data["discount"])
        formData.append("discount", values["discount"]);

      // Payed
      if (!data || values["payed"] !== data["payed"]) formData.append("payed", values["payed"]);

      // Seller Share
      if (!data || values["seller_share"] !== data["seller_share"])
        formData.append("seller_share", values["seller_share"]);

      // Note
      if (!data || values["note"] !== data["note"]) formData.append("note", values["note"]);

      // Sale Date
      if (!data || values["sale_date"] !== data["sale_date"])
        formData.append("sale_date", values["sale_date"]);

      // Driver
      if (!data || values["driver"] !== data["driver"]) formData.append("driver", values["driver"]);

      // Delivery Date
      if (!data || values["delivery_date"] !== data["delivery_date"])
        formData.append("delivery_date", values["delivery_date"]);

      // Worker
      if (!data || values["worker"] !== data["worker"]) formData.append("worker", values["worker"]);

      // Install Date
      if (!data || values["install_date"] !== data["install_date"])
        formData.append("install_date", values["install_date"]);

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
    if (data && data.branch) setBranchName(data.branch.name);
  }, [data]);

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
    if (data && data.seller) setSellerName(data.seller.name);
  }, [data]);

  useEffect(() => {
    validation.values.seller = "";
  }, [validation.values.branch]);

  // Driver Options
  const { items: drivers } = useSelector((state: RootState) => state.driver);

  const [driverName, setDriverName] = useState<string>("");
  const [driverOptions, setDriverOptions] = useState<Option[]>([]);

  useEffect(() => {
    dispatch(getDrivers({ name: driverName }));
  }, [driverName]);

  useEffect(() => {
    setDriverOptions(getOptions(drivers));
  }, [drivers]);

  useEffect(() => {
    if (data && data.driver) setDriverName(data.driver.name);
  }, [data]);

  // Worker Options
  const { items: workers } = useSelector((state: RootState) => state.worker);

  const [workerName, setWorkerName] = useState<string>("");
  const [workerOptions, setWorkerOptions] = useState<Option[]>([]);

  useEffect(() => {
    dispatch(getWorkers({ name: workerName, date: validation.values.install_date }));
  }, [workerName, validation.values.install_date]);

  useEffect(() => {
    setWorkerOptions(getOptions(workers));
  }, [workers]);

  useEffect(() => {
    if (data && data.worker) setWorkerName(data.worker.name);
  }, [data]);

  useEffect(() => {
    validation.values.worker = "";
  }, [validation.values.install_date]);

  // Success
  useEffect(() => {
    if (show && status) {
      if (status.lastAction === updateOrder.typePrefix && status.success) {
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
            {/* Payed */}
            <Col className="col-12 mb-3">
              <Label>Ödənilən məbləğ</Label>

              <Input
                type="number"
                name="payed"
                placeholder="Ödənilən məbləğ daxil edin"
                onBlur={validation.handleBlur}
                onChange={validation.handleChange}
                value={validation.values.payed}
                invalid={validation.touched.payed && validation.errors.payed ? true : false}
              />

              {validation.touched.payed && validation.errors.payed ? (
                <FormFeedback type="invalid">{validation.errors.payed.toString()}</FormFeedback>
              ) : null}
            </Col>
          </Row>

          <Row>
            {/* Seller Share */}
            <Col className="col-12 mb-3">
              <Label>Satıcı Payı</Label>

              <Input
                type="number"
                name="seller_share"
                placeholder="Satıcı Payı daxil edin"
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
              <Label>Satış Tarixi</Label>

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

          {data.status >= ORDER_STATUS.ACCEPTED && hasPermission(user, [USER_TYPES.WAREHOUSE]) && (
            <React.Fragment>
              <Row>
                {/* Driver */}
                <Col className="col-12 mb-3">
                  <Label>Taksi</Label>

                  <Select
                    name="driver"
                    options={driverOptions || []}
                    onInputChange={(e) => setDriverName(e)}
                    styles={getSelectStyle(validation, "driver")}
                    onChange={(e) => {
                      if (e && typeof e === "object" && e.value)
                        validation.setFieldValue("driver", e.value);
                    }}
                    onBlur={() => {
                      validation.setFieldTouched("driver", true);
                    }}
                    value={
                      validation.values.driver &&
                      driverOptions &&
                      driverOptions.find((option) => option.value === validation.values.driver)
                    }
                  />

                  {validation.touched.driver && validation.errors.driver ? (
                    <FormFeedback type="invalid" className="d-block">
                      {validation.errors.driver.toString()}
                    </FormFeedback>
                  ) : null}
                </Col>
              </Row>

              <Row>
                {/* Delivery Date */}
                <Col className="col-12 mb-3">
                  <Label>Çatdırılma Tarixi</Label>

                  <Input
                    name="delivery_date"
                    type="date"
                    placeholder="Çatdırılma tarixi daxil edin"
                    onBlur={validation.handleBlur}
                    onChange={validation.handleChange}
                    value={validation.values.delivery_date}
                    invalid={
                      validation.touched.delivery_date && validation.errors.delivery_date
                        ? true
                        : false
                    }
                  />

                  {validation.touched.delivery_date && validation.errors.delivery_date ? (
                    <FormFeedback type="invalid">
                      {validation.errors.delivery_date.toString()}
                    </FormFeedback>
                  ) : null}
                </Col>
              </Row>

              <Row>
                {/* Worker */}
                <Col className="col-12 mb-3">
                  <Label>Usta</Label>

                  <Select
                    name="worker"
                    options={workerOptions || []}
                    isDisabled={!validation.values.install_date}
                    onInputChange={(e) => setWorkerName(e)}
                    styles={getSelectStyle(validation, "worker")}
                    onChange={(e) => {
                      if (e && typeof e === "object" && e.value)
                        validation.setFieldValue("worker", e.value);
                    }}
                    onBlur={() => {
                      validation.setFieldTouched("worker", true);
                    }}
                    value={
                      validation.values.worker &&
                      workerOptions &&
                      workerOptions.find((option) => option.value === validation.values.worker)
                    }
                  />

                  {validation.touched.worker && validation.errors.worker ? (
                    <FormFeedback type="invalid" className="d-block">
                      {validation.errors.worker.toString()}
                    </FormFeedback>
                  ) : null}
                </Col>
              </Row>

              <Row>
                {/* Install Date */}
                <Col className="col-12 mb-3">
                  <Label>Quraşdırılma Tarixi</Label>

                  <Input
                    name="install_date"
                    type="date"
                    placeholder="Quraşdırılma tarixi daxil edin"
                    onBlur={validation.handleBlur}
                    onChange={validation.handleChange}
                    value={validation.values.install_date}
                    invalid={
                      validation.touched.install_date && validation.errors.install_date
                        ? true
                        : false
                    }
                  />

                  {validation.touched.install_date && validation.errors.install_date ? (
                    <FormFeedback type="invalid">
                      {validation.errors.install_date.toString()}
                    </FormFeedback>
                  ) : null}
                </Col>
              </Row>
            </React.Fragment>
          )}

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
