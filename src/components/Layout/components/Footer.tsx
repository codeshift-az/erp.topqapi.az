import React from "react";

// Reactstrap
import { Container, Row, Col } from "reactstrap";

const PROJECT_NAME = import.meta.env.VITE_PROJECT_NAME;

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
                <a href="https://www.codeshift.az" target="_blank">
                  CodeShift
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
