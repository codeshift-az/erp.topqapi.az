import React from "react";

// Reactstrap
import { Container, Row, Col } from "reactstrap";

// Config
import { PROJECT_NAME, CREATER_URL, CREATER_NAME } from "@/config";

const Footer = () => {
  return (
    <React.Fragment>
      <footer className="footer">
        <Container fluid={true}>
          <Row>
            <Col md={6}>
              {new Date().getFullYear()} © {PROJECT_NAME}.
            </Col>
            <Col md={6}>
              <div className="text-sm-end d-none d-sm-block">
                Develop and Design by{" "}
                <a href={CREATER_URL} target="_blank">
                  {CREATER_NAME}
                </a>
              </div>
            </Col>
          </Row>
        </Container>
      </footer>
    </React.Fragment>
  );
};

export default Footer;
