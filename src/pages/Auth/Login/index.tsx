import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";

// Reactstrap
import {
  Spinner,
  Alert,
  Row,
  Col,
  CardBody,
  Card,
  Container,
  Form,
  Input,
  FormFeedback,
  Label,
} from "reactstrap";

// Formik Validation
import * as Yup from "yup";
import { useFormik } from "formik";

// Assets
import { LogoSmall, LoginBackground } from "@/assets/images";

// Helpers
import { getPageTitle } from "@/helpers";
import { getAccessToken, getRefreshToken } from "@/helpers/auth";

// Redux Actions
import { login, refreshToken, verifyToken } from "@/store/auth/actions";

const PROJECT_NAME = import.meta.env.VITE_PROJECT_NAME;

const Login = () => {
  document.title = getPageTitle("Giriş");

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const { status, errors, isAuth } = useSelector((state: RootState) => state.auth);

  const validation = useFormik({
    enableReinitialize: true,

    initialValues: {
      username: "",
      password: "",
      remember: false,
    },

    validationSchema: Yup.object({
      username: Yup.string().required("Zəhmət olmasa nömrə daxil edin!"),
      password: Yup.string().required("Zəhmət olmasa Şifrə daxil edin!"),
      remember: Yup.bool(),
    }),

    onSubmit: (values) => {
      const formData = new FormData();

      // Username
      formData.append("username", values.username);

      // Password
      formData.append("password", values.password);

      // Remember me
      formData.append("remember", values.remember.toString());

      dispatch(login(formData));
    },
  });

  useEffect(() => {
    const access = getAccessToken();
    const refresh = getRefreshToken();

    if (status.loading) return;

    if (isAuth) navigate("/");
    else if (access) dispatch(verifyToken(access));
    else if (refresh) dispatch(refreshToken(refresh));
  }, [isAuth]);

  return (
    <React.Fragment>
      <div className="account-pages my-5 pt-sm-5">
        <Container>
          <Row className="justify-content-center">
            <Col md={8} lg={6} xl={5}>
              <Card className="overflow-hidden">
                <div className="bg-primary bg-soft">
                  <Row>
                    <Col xs={7}>
                      <div className="text-primary p-4">
                        <h5 className="text-primary">Xoş gəldiniz!</h5>
                        <p>Zəhmət olmasa giriş edin.</p>
                      </div>
                    </Col>

                    <Col className="col-5 align-self-end">
                      <img src={LoginBackground} alt="Login Background" className="img-fluid" />
                    </Col>
                  </Row>
                </div>
                <CardBody className="pt-0">
                  <div>
                    <Link to="/" className="auth-logo-light">
                      <div className="avatar-md profile-user-wid mb-4">
                        <span className="avatar-title rounded-circle bg-light">
                          <img src={LogoSmall} alt="Logo Small" height="34" />
                        </span>
                      </div>
                    </Link>
                  </div>

                  <div className="p-2">
                    <Form
                      className="form-horizontal"
                      onSubmit={(e) => {
                        e.preventDefault();
                        validation.handleSubmit();
                        return false;
                      }}>
                      {errors && (
                        <Alert color="danger">İstifadəçi adı və yaxud şifrə yanlışdır!</Alert>
                      )}

                      {/* Username */}
                      <div className="mb-3">
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
                      </div>

                      {/*  Password */}
                      <div className="mb-3">
                        <Label className="form-label">Şifrə</Label>

                        <Input
                          type="password"
                          name="password"
                          placeholder="Şifrə daxil edin"
                          onBlur={validation.handleBlur}
                          onChange={validation.handleChange}
                          value={validation.values.password || ""}
                          invalid={
                            validation.touched.password && validation.errors.password ? true : false
                          }
                        />
                        {validation.touched.password && validation.errors.password ? (
                          <FormFeedback type="invalid">{validation.errors.password}</FormFeedback>
                        ) : null}
                      </div>

                      <div className="form-check">
                        <input
                          type="checkbox"
                          name="remember"
                          className="form-check-input"
                          onChange={validation.handleChange}
                          checked={validation.values.remember}
                        />

                        <label className="form-check-label" htmlFor="remember">
                          Məni xatırla
                        </label>
                      </div>

                      <div className="mt-3 d-grid">
                        <button className="btn btn-primary btn-block" type="submit">
                          {status.loading ? (
                            <Spinner color="primary" size="sm" className="mr-1" />
                          ) : (
                            "Giriş"
                          )}
                        </button>
                      </div>
                    </Form>
                  </div>
                </CardBody>
              </Card>

              <div className="mt-5 text-center">
                <p>
                  © {new Date().getFullYear()} {PROJECT_NAME}
                  <br />
                  Develop and Design by{" "}
                  <a href="https://www.codeshift.az" target="_blank">
                    CodeShift
                  </a>
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Login;
