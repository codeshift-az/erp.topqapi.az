import { useEffect, useState } from "react";

// Redux
import { useSelector } from "react-redux";
import { RootState } from "@/store";

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

// Yup and Formik for validation
import * as Yup from "yup";
import { useFormik } from "formik";

// Actions
import { createExpense, updateExpense } from "@/store/actions";

interface Props {
  data: any;
  show: boolean;
  isEdit: boolean;
  toggle: () => void;
  handleSubmit: (formData: any) => void;
}

const FormModal = ({ data, show, isEdit, toggle, handleSubmit }: Props) => {
  const title = isEdit ? "Xərc məlumatlarını redaktə et" : "Xərc əlavə et";

  const { status, errors } = useSelector((state: RootState) => state.expense);

  const [alertError, setAlertError] = useState<string>("");

  // Validation
  const validation = useFormik({
    enableReinitialize: true,

    initialValues: {
      name: (data && data.name) || "",
      amount: (data && data.amount) || "",
      date: (data && data.date) || new Date().toISOString().split("T")[0],
    },

    validationSchema: Yup.object({
      name: Yup.string().required("Zəhmət olmasa ad daxil edin!"),
      amount: Yup.number()
        .required("Zəhmət olmasa məbləğ daxil edin!")
        .min(1, "Məbləğ 0-dan böyük olmalıdır!"),
      date: Yup.string().required("Zəhmət olmasa tarix daxil edin!"),
    }),

    onSubmit: (values) => {
      const formData = new FormData();

      // Name
      if (!data || values["name"] !== data["name"])
        formData.append("name", values["name"]);

      // Amount
      if (!data || values["amount"] !== data["amount"])
        formData.append("amount", values["amount"]);

      // Date
      if (!data || values["date"] !== data["date"])
        formData.append("date", values["date"]);

      handleSubmit(formData);
    },
  });

  // Success
  useEffect(() => {
    if (show && status) {
      if (
        ((isEdit && status.lastAction === updateExpense.typePrefix) ||
          (!isEdit && status.lastAction === createExpense.typePrefix)) &&
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
            {/* Name */}
            <Col className="col-12 mb-3">
              <Label>Ad</Label>

              <Input
                type="text"
                name="name"
                placeholder="Ad daxil edin"
                onBlur={validation.handleBlur}
                onChange={validation.handleChange}
                value={validation.values.name}
                invalid={
                  validation.touched.name && validation.errors.name
                    ? true
                    : false
                }
              />

              {validation.touched.name && validation.errors.name ? (
                <FormFeedback type="invalid">
                  {validation.errors.name.toString()}
                </FormFeedback>
              ) : null}
            </Col>
          </Row>

          <Row>
            {/* Amount */}
            <Col className="col-12 mb-3">
              <Label>Miqdar</Label>

              <Input
                name="amount"
                type="number"
                placeholder="Miqdar daxil edin"
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
