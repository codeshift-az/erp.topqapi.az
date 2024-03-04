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
import { createBranch, updateBranch } from "@/store/actions";

interface Props {
  data: any;
  show: boolean;
  isEdit: boolean;
  toggle: () => void;
  handleSubmit: (formData: any) => void;
}

const FormModal = ({ data, show, isEdit, toggle, handleSubmit }: Props) => {
  const title = isEdit ? "Filial məlumatlarını redaktə et" : "Filial əlavə Et";

  const { status, errors } = useSelector((state: RootState) => state.branch);

  const [alertError, setAlertError] = useState<string>("");

  // Validation
  const validation = useFormik({
    enableReinitialize: true,

    initialValues: {
      name: (data && data.name) || "",
      username: (data && data.username) || "",
      password: "",
    },

    validationSchema: Yup.object({
      name: Yup.string().required("Zəhmət olmasa ad daxil edin!"),
      username: Yup.string().required("Zəhmət olmasa istifadəçi adı daxil edin!"),
      password: Yup.string().when("isEdit", (_, schema) => {
        if (isEdit) return schema;
        return schema.required("Zəhmət olmasa şifrə daxil edin!");
      }),
    }),

    onSubmit: (values) => {
      const formData = new FormData();

      // Name
      if (!data || values["name"] !== data["name"]) formData.append("name", values["name"]);

      // Username
      if (!data || values["username"] !== data["username"])
        formData.append("username", values["username"]);

      // Password
      if (!data || values["password"] !== data["password"])
        formData.append("password", values["password"]);

      handleSubmit(formData);
    },
  });

  // Success
  useEffect(() => {
    if (show && status) {
      if (
        ((isEdit && status.lastAction === updateBranch.typePrefix) ||
          (!isEdit && status.lastAction === createBranch.typePrefix)) &&
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
            {/* Username */}
            <Col className="col-12 mb-3">
              <Label>İstifadəçi Adı</Label>

              <Input
                type="text"
                name="username"
                placeholder="İstifadəçi Adı daxil edin"
                onBlur={validation.handleBlur}
                onChange={validation.handleChange}
                value={validation.values.username}
                invalid={validation.touched.username && validation.errors.username ? true : false}
              />

              {validation.touched.username && validation.errors.username ? (
                <FormFeedback type="invalid">{validation.errors.username.toString()}</FormFeedback>
              ) : null}
            </Col>
          </Row>

          <Row>
            {/* Password */}
            <Col className="col-12 mb-3">
              <Label>Şifrə</Label>

              <Input
                type="password"
                name="password"
                placeholder="Şifrə daxil edin"
                onBlur={validation.handleBlur}
                onChange={validation.handleChange}
                value={validation.values.password}
                invalid={validation.touched.password && validation.errors.password ? true : false}
              />

              {validation.touched.password && validation.errors.password ? (
                <FormFeedback type="invalid">{validation.errors.password.toString()}</FormFeedback>
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
