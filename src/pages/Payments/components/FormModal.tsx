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
import { getSuppliers, createPayment, updatePayment } from "@/store/actions";

interface Props {
  data: any;
  show: boolean;
  isEdit: boolean;
  toggle: () => void;
  handleSubmit: (formData: any) => void;
}

const FormModal = ({ data, show, isEdit, toggle, handleSubmit }: Props) => {
  const title = isEdit ? "Ödəniş məlumatlarını redaktə et" : "Ödəniş əlavə Et";

  const dispatch = useDispatch<AppDispatch>();

  const { status, errors } = useSelector((state: RootState) => state.payment);

  const [alertError, setAlertError] = useState<string>("");

  // Validation
  const validation = useFormik({
    enableReinitialize: true,

    initialValues: {
      supplier: (data && data.supplier && data.supplier.id) || "",
      amount: (data && data.amount) || "",
      date: (data && data.date) || new Date().toISOString().split("T")[0],
      note: (data && data.note) || "",
    },

    validationSchema: Yup.object({
      supplier: Yup.number().required("Zəhmət olmasa firma seçin!"),
      amount: Yup.number().required("Zəhmət olmasa məbləğ daxil edin!"),
      date: Yup.string().required("Zəhmət olmasa tarix daxil edin!"),
      note: Yup.string(),
    }),

    onSubmit: (values) => {
      const formData = new FormData();

      // Supplier
      if (!data || values["supplier"] !== data["supplier"])
        formData.append("supplier", values["supplier"]);

      // Amount
      if (!data || values["amount"] !== data["amount"])
        formData.append("amount", values["amount"]);

      // Date
      if (!data || values["date"] !== data["date"])
        formData.append("date", values["date"]);

      // Note
      if (!data || values["note"] !== data["note"])
        formData.append("note", values["note"]);

      handleSubmit(formData);
    },
  });

  // Supplier Options
  const { items: supplier } = useSelector((state: RootState) => state.supplier);

  const [supplierName, setSupplierName] = useState<string>("");
  const [supplierOptions, setSupplierOptions] = useState<Option[]>([]);

  useEffect(() => {
    dispatch(getSuppliers({ name: supplierName }));
  }, [supplierName]);

  useEffect(() => {
    setSupplierOptions(getOptions(supplier));
  }, [supplier]);

  useEffect(() => {
    if (data && data.supplier) setSupplierName(data.supplier.name);
  }, [data]);

  // Success
  useEffect(() => {
    if (show && status) {
      if (
        ((isEdit && status.lastAction === updatePayment.typePrefix) ||
          (!isEdit && status.lastAction === createPayment.typePrefix)) &&
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
            {/* Supplier */}
            <Col className="col-12 mb-3">
              <Label>Firma</Label>

              <Select
                name="supplier"
                options={supplierOptions || []}
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
            {/* Amount */}
            <Col className="col-12 mb-3">
              <Label>Məbləğ</Label>

              <Input
                type="number"
                name="amount"
                placeholder="Məbləğ daxil edin"
                onBlur={validation.handleBlur}
                onChange={validation.handleChange}
                value={validation.values.amount}
                invalid={
                  validation.touched.amount && validation.errors.amount
                    ? true
                    : false
                }
              />

              {validation.touched.amount && validation.errors.amount ? (
                <FormFeedback type="invalid">
                  {validation.errors.amount.toString()}
                </FormFeedback>
              ) : null}
            </Col>
          </Row>

          <Row>
            {/* Date */}
            <Col className="col-12 mb-3">
              <Label>Tarix</Label>

              <Input
                name="date"
                type="date"
                placeholder="Tarix daxil edin"
                onBlur={validation.handleBlur}
                onChange={validation.handleChange}
                value={validation.values.date}
                invalid={
                  validation.touched.date && validation.errors.date
                    ? true
                    : false
                }
              />

              {validation.touched.date && validation.errors.date ? (
                <FormFeedback type="invalid">
                  {validation.errors.date.toString()}
                </FormFeedback>
              ) : null}
            </Col>
          </Row>

          <Row>
            {/* Note */}
            <Col className="col-12 mb-3">
              <Label>Qeyd</Label>

              <Input
                name="note"
                type="textarea"
                placeholder={"Qeyd daxil edin"}
                onBlur={validation.handleBlur}
                onChange={validation.handleChange}
                value={validation.values.note}
                invalid={
                  validation.touched.note && validation.errors.note
                    ? true
                    : false
                }
              />

              {validation.touched.note && validation.errors.note ? (
                <FormFeedback type="invalid">
                  {validation.errors.note.toString()}
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

export default FormModal;
