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
import { getCategories, createFactoryProduct, updateFactoryProduct } from "@/store/actions";

interface Props {
  data: any;
  show: boolean;
  isEdit: boolean;
  toggle: () => void;
  handleSubmit: (formData: any) => void;
}

const FormModal = ({ data, show, isEdit, toggle, handleSubmit }: Props) => {
  const title = isEdit ? "Məhsul məlumatlarını redaktə et" : "Məhsul əlavə Et";

  const dispatch = useDispatch<AppDispatch>();

  const { status, errors } = useSelector((state: RootState) => state.factoryProduct);

  const [alertError, setAlertError] = useState<string>("");

  // Validation
  const validation = useFormik({
    enableReinitialize: true,

    initialValues: {
      name: (data && data.name) || "",
      category: (data && data.category && data.category.id) || "",
    },

    validationSchema: Yup.object({
      name: Yup.string().required("Zəhmət olmasa ad daxil edin!"),
      category: Yup.number().required("Zəhmət olmasa kateqoriya seçin!"),
    }),

    onSubmit: (values) => {
      const formData = new FormData();

      // Name
      if (!data || values["name"] !== data["name"]) formData.append("name", values["name"]);

      // Category
      if (!data || values["category"] !== data["category"])
        formData.append("category", values["category"]);

      handleSubmit(formData);
    },
  });

  // Category Options
  const { items: categories } = useSelector((state: RootState) => state.category);

  const [categoryName, setCategoryName] = useState<string>("");
  const [categoryOptions, setCategoryOptions] = useState<Option[]>([]);

  useEffect(() => {
    dispatch(getCategories({ name: categoryName }));
  }, [categoryName]);

  useEffect(() => {
    setCategoryOptions(getOptions(categories));
  }, [categories]);

  useEffect(() => {
    if (data && data.category) setCategoryName(data.category.name);
  }, [data]);

  // Success
  useEffect(() => {
    if (show && status) {
      if (
        ((isEdit && status.lastAction === updateFactoryProduct.typePrefix) ||
          (!isEdit && status.lastAction === createFactoryProduct.typePrefix)) &&
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
            {/* Category */}
            <Col className="col-12 mb-3">
              <Label>Kateqoriya</Label>

              <Select
                name="category"
                options={categoryOptions || []}
                onInputChange={(e) => setCategoryName(e)}
                styles={getSelectStyle(validation, "category")}
                onChange={(e) => {
                  if (e && typeof e === "object" && e.value)
                    validation.setFieldValue("category", e.value);
                }}
                onBlur={() => {
                  validation.setFieldTouched("category", true);
                }}
                value={
                  validation.values.category &&
                  categoryOptions &&
                  categoryOptions.find((option) => option.value === validation.values.category)
                }
              />

              {validation.touched.category && validation.errors.category ? (
                <FormFeedback type="invalid" className="d-block">
                  {validation.errors.category.toString()}
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
