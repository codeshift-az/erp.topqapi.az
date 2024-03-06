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
import { createDriver, updateDriver } from "@/store/actions";

interface Props {
  data: any;
  show: boolean;
  isEdit: boolean;
  toggle: () => void;
  handleSubmit: (formData: any) => void;
}

const FormModal = ({ data, show, isEdit, toggle, handleSubmit }: Props) => {
  const title = isEdit ? "Taksi məlumatlarını redaktə et" : "Taksi əlavə Et";

  const { status, errors } = useSelector((state: RootState) => state.driver);

  const [alertError, setAlertError] = useState<string>("");

  // Validation
  const validation = useFormik({
    enableReinitialize: true,

    initialValues: {
      name: (data && data.name) || "",
    },

    validationSchema: Yup.object({
      name: Yup.string().required("Zəhmət olmasa ad daxil edin!"),
    }),

    onSubmit: (values) => {
      const formData = new FormData();

      // Name
      if (!data || values["name"] !== data["name"]) formData.append("name", values["name"]);

      handleSubmit(formData);
    },
  });

  // Success
  useEffect(() => {
    if (show && status) {
      if (
        ((isEdit && status.lastAction === updateDriver.typePrefix) ||
          (!isEdit && status.lastAction === createDriver.typePrefix)) &&
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
                invalid={validation.touched.name && validation.errors.name ? true : false}
              />

              {validation.touched.name && validation.errors.name ? (
                <FormFeedback type="invalid">{validation.errors.name.toString()}</FormFeedback>
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
