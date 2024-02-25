import React from "react";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/store";

// Reactstrap
import {
  Container,
  Row,
  Col,
  Card,
  Alert,
  CardBody,
  Button,
  Label,
  Input,
  FormFeedback,
  Form,
} from "reactstrap";

// Yup and Formik for validation
import * as Yup from "yup";
import { useFormik } from "formik";

// Components
import Breadcrumbs from "@/components/Breadcrumb";

// Assets
import { UserAvatar } from "@/assets/images";

// Helpers
import { getPageTitle } from "@/helpers";

// Actions
import { updateAccount } from "@/store/account/actions";

const UserProfile = () => {
  document.title = getPageTitle("Profil");

  const dispatch = useDispatch<AppDispatch>();

  const { status, user, errors } = useSelector((state: RootState) => state.account);

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      first_name: (user && user.first_name) || "",
      last_name: (user && user.last_name) || "",
      username: (user && user.username) || "",
      email: (user && user.email) || "",
    },
    validationSchema: Yup.object({
      first_name: Yup.string().required("Zəhmət olmasa adınızı daxil edin"),
      last_name: Yup.string().required("Zəhmət olmasa soyadınızı daxil edin"),
      username: Yup.string().required("Zəhmət olmasa istifadəçi adınızı daxil edin"),
      email: Yup.string().required("Zəhmət olmasa emailinizi daxil edin"),
    }),
    onSubmit: (values) => {
      const formData = new FormData();

      // First Name
      formData.append("first_name", values.first_name);

      // Last Name
      formData.append("last_name", values.last_name);

      // Username
      formData.append("username", values.username);

      // Email
      formData.append("email", values.email);

      dispatch(updateAccount(formData));
    },
  });

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title={"Profil"} breadcrumbItems={[{ title: "Ana Səhifə", url: "/" }]} />

          <Row>
            <Col lg="12">
              {errors && errors ? (
                <Alert color="danger">{"Profil yeniləyərkən problem baş verdi!"}</Alert>
              ) : null}

              {status.lastAction === updateAccount.typePrefix && status.success ? (
                <Alert color="success">{"Profil detalları yeniləndi!"}</Alert>
              ) : null}

              <Card>
                <CardBody>
                  <div className="d-flex">
                    <div className="ms-3">
                      <img
                        src={UserAvatar}
                        alt="User Avatar"
                        className="avatar-md rounded-circle img-thumbnail"
                      />
                    </div>
                    <div className="flex-grow-1 align-self-center">
                      <div className="text-muted">
                        <h5>{`${user?.first_name} ${user?.last_name}`}</h5>
                        <p className="mb-1">İstifadəçi adı: {user?.username}</p>
                        <p className="mb-1">Email: {user?.email}</p>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>

          <h4 className="card-title mb-4">Profil Detallarını dəyiş</h4>

          <Card>
            <CardBody>
              <Form
                className="form-horizontal"
                onSubmit={(e) => {
                  e.preventDefault();
                  validation.handleSubmit();
                  return false;
                }}>
                <div className="form-group">
                  <Row>
                    {/* First Name */}
                    <Col sm="6" className="p-2">
                      <Label className="form-label">Ad</Label>

                      <Input
                        type="text"
                        name="first_name"
                        className="form-control"
                        placeholder="Ad daxil edin"
                        onBlur={validation.handleBlur}
                        onChange={validation.handleChange}
                        value={validation.values.first_name || ""}
                        invalid={
                          validation.touched.first_name && validation.errors.first_name
                            ? true
                            : false
                        }
                      />
                      {validation.touched.first_name && validation.errors.first_name ? (
                        <FormFeedback type="invalid">{validation.errors.first_name}</FormFeedback>
                      ) : null}
                    </Col>

                    {/* Last Name */}
                    <Col sm="6" className="p-2">
                      <Label className="form-label">Soyad</Label>

                      <Input
                        type="text"
                        name="last_name"
                        className="form-control"
                        placeholder="Soyad daxil edin"
                        onBlur={validation.handleBlur}
                        onChange={validation.handleChange}
                        value={validation.values.last_name || ""}
                        invalid={
                          validation.touched.last_name && validation.errors.last_name ? true : false
                        }
                      />

                      {validation.touched.last_name && validation.errors.last_name ? (
                        <FormFeedback type="invalid">{validation.errors.last_name}</FormFeedback>
                      ) : null}
                    </Col>

                    {/* Username */}
                    <Col sm="6" className="p-2">
                      <Label className="form-label">İstifadəçi adı</Label>

                      <Input
                        type="text"
                        name="username"
                        className="form-control"
                        placeholder="İstifadəçi adı daxil edin"
                        onBlur={validation.handleBlur}
                        onChange={validation.handleChange}
                        value={validation.values.username || ""}
                        invalid={
                          validation.touched.username && validation.errors.username ? true : false
                        }
                      />
                      {validation.touched.username && validation.errors.username ? (
                        <FormFeedback type="invalid">{validation.errors.username}</FormFeedback>
                      ) : null}
                    </Col>

                    {/* Email */}
                    <Col sm="6" className="p-2">
                      <Label className="form-label">Email</Label>

                      <Input
                        type="email"
                        name="email"
                        className="form-control"
                        placeholder="Email daxil edin"
                        onBlur={validation.handleBlur}
                        onChange={validation.handleChange}
                        value={validation.values.email || ""}
                        invalid={validation.touched.email && validation.errors.email ? true : false}
                      />
                      {validation.touched.email && validation.errors.email ? (
                        <FormFeedback type="invalid">{validation.errors.email}</FormFeedback>
                      ) : null}
                    </Col>
                  </Row>
                </div>

                <div className="text-center mt-4">
                  <Button type="submit" color="danger">
                    Yadda saxla
                  </Button>
                </div>
              </Form>
            </CardBody>
          </Card>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default UserProfile;
