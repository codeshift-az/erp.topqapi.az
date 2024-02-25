import React, { useState } from "react";
import { Link } from "react-router-dom";

// Reactstrap
import { Dropdown, DropdownToggle, DropdownMenu, Row, Col } from "reactstrap";

// SimpleBar
import SimpleBar from "simplebar-react";

const NotificationDropdown = () => {
  const [menu, setMenu] = useState(false);

  const notifications = [
    {
      id: 1,
      text: "Your order is placed",
      subText: "If several languages coalesce the grammar",
      bgColor: "primary",
      icon: "bx bx-cart",
      time: "3 min ago",
      to: "/",
    },
    {
      id: 2,
      text: "James Lemire",
      subText: "It will seem like simplified English",
      bgColor: "success",
      icon: "bx bx-user",
      time: "1 hours ago",
      to: "/",
    },
  ];

  return (
    <React.Fragment>
      <Dropdown
        isOpen={menu}
        toggle={() => setMenu(!menu)}
        className="dropdown d-inline-block"
        tag="li">
        <DropdownToggle
          className="btn header-item noti-icon position-relative"
          tag="button"
          id="page-header-notifications-dropdown">
          <i className="bx bx-bell bx-tada" />
          <span className="badge bg-danger rounded-pill">3</span>
        </DropdownToggle>

        <DropdownMenu className="dropdown-menu dropdown-menu-lg p-0 dropdown-menu-end">
          <div className="p-3">
            <Row className="align-items-center">
              <Col>
                <h6 className="m-0">Bildirişlər</h6>
              </Col>
              <div className="col-auto">
                <a href="#!" className="small">
                  Hamısını göstər
                </a>
              </div>
            </Row>
          </div>

          <SimpleBar style={{ height: "230px" }}>
            {notifications.map((notification, index) => (
              <Link to={notification.to} className="text-reset notification-item" key={index}>
                <div className="d-flex">
                  <div className="avatar-xs me-3">
                    <span
                      className={`avatar-title bg-${notification.bgColor} rounded-circle font-size-16`}>
                      <i className={notification.icon} />
                    </span>
                  </div>

                  <div className="flex-grow-1">
                    <h6 className="mt-0 mb-1">{notification.text}</h6>
                    <div className="font-size-12 text-muted">
                      <p className="mb-1">{notification.subText}</p>
                      <p className="mb-0">
                        <i className="mdi mdi-clock-outline" /> {notification.time}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </SimpleBar>

          <div className="p-2 border-top d-grid">
            <Link className="btn btn-sm btn-link font-size-14 btn-block text-center" to="#">
              <i className="mdi mdi-arrow-right-circle me-1"></i> Hamısını göstər
            </Link>
          </div>
        </DropdownMenu>
      </Dropdown>
    </React.Fragment>
  );
};

export default NotificationDropdown;
