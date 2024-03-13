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
import { getSuppliers, createWarehouseEntry } from "@/store/actions";

interface Props {
  show: boolean;
  toggle: () => void;
  handleSubmit: (formData: any) => void;
}

const EntryModal = ({ show, toggle, handleSubmit }: Props) => {
  const title = "Giriş məlumatlarını daxil et";

  const dispatch = useDispatch<AppDispatch>();
  const { status, errors } = useSelector((state: RootState) => state.warehouseEntry);

  const [alertError, setAlertError] = useState<string>("");

  // Validation
  const validation = useFormik({
    enableReinitialize: true,

    initialValues: {
      supplier: "",
      invoice: "",
      date: new Date().toISOString().split("T")[0],
    },

    validationSchema: Yup.object({
      supplier: Yup.number().required("Zəhmət olmasa firma seçin!"),
      invoice: Yup.string(),
      date: Yup.string().required("Zəhmət olmasa tarix daxil edin!"),
    }),

    onSubmit: (values) => {
      const formData = new FormData();

      // Supplier
      formData.append("supplier", values["supplier"]);

      // Invoice
      formData.append("invoice", values["invoice"]);

      // Date
      formData.append("date", values["date"]);

      handleSubmit(formData);
    },
  });

  // Prodcut Options
  const { items: suppliers } = useSelector((state: RootState) => state.supplier);

  const [supplierName, setSupplierName] = useState<string>("");
  const [supplierOptions, setSupplierOptions] = useState<Option[]>([]);

  useEffect(() => {
    dispatch(getSuppliers({ name: supplierName }));
  }, [supplierName]);

  useEffect(() => {
    setSupplierOptions(getOptions(suppliers));
  }, [suppliers]);

  // Success
  useEffect(() => {
    if (show && status) {
      if (status.lastAction === createWarehouseEntry.typePrefix && status.success) {
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
                  supplierOptions.find((option) => option.value === validation.values.supplier)
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
            {/* Invoice */}
            <Col className="col-12 mb-3">
              <Label>Firma Qaimə kodu</Label>

              <Input
                type="text"
                name="invoice"
                placeholder="Firma Qaimə kodu daxil edin"
                onBlur={validation.handleBlur}
                onChange={validation.handleChange}
                value={validation.values.invoice}
                invalid={validation.touched.invoice && validation.errors.invoice ? true : false}
              />

              {validation.touched.invoice && validation.errors.invoice ? (
                <FormFeedback type="invalid">{validation.errors.invoice.toString()}</FormFeedback>
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
                invalid={validation.touched.date && validation.errors.date ? true : false}
              />

              {validation.touched.date && validation.errors.date ? (
                <FormFeedback type="invalid">{validation.errors.date.toString()}</FormFeedback>
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

export default EntryModal;
