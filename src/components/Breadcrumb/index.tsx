import { Link } from "react-router-dom";

// Reactstrap
import { Row, Col, BreadcrumbItem } from "reactstrap";

interface IProps {
  title: string;
  breadcrumbItems: { title: string; url?: string }[];
}

const Breadcrumb = ({ title, breadcrumbItems }: IProps) => {
  return (
    <Row>
      <Col xs="12">
        <div className="page-title-box d-flex align-items-center justify-content-between">
          <h4 className="mb-0 font-size-18">{title}</h4>
          <div className="page-title-right">
            <ol className="breadcrumb m-0">
              {breadcrumbItems.map((item, key) => (
                <BreadcrumbItem key={key} active={key + 1 === breadcrumbItems.length}>
                  <Link to={item.url ? item.url : "#"}>{item.title}</Link>
                </BreadcrumbItem>
              ))}
            </ol>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default Breadcrumb;
