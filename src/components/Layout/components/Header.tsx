import React, { useState } from "react";
import { Link } from "react-router-dom";

// Assets
import { LogoSmall, LogoLightSmall } from "@/assets/images";

// Helpers
import { toggleFullscreen } from "@/helpers";

// Related Components
import ProfileMenu from "./ProfileMenu";

const Header = () => {
  const [search, setsearch] = useState(false);

  function toggleMenu() {
    if (window.screen.width <= 998) {
      document.body.classList.toggle("sidebar-enable");
    } else {
      document.body.classList.toggle("vertical-collapsed");
      document.body.classList.toggle("sidebar-enable");
    }
  }

  return (
    <React.Fragment>
      <header id="page-topbar">
        <div className="navbar-header">
          <div className="d-flex">
            <div className="navbar-brand-box d-lg-none d-md-block">
              <Link to="/" className="logo logo-dark">
                <span className="logo-sm">
                  <img src={LogoSmall} alt="Logo Small" height="22" />
                </span>
              </Link>

              <Link to="/" className="logo logo-light">
                <span className="logo-sm">
                  <img src={LogoLightSmall} alt="Logo Light Small" height="22" />
                </span>
              </Link>
            </div>

            <button
              type="button"
              onClick={toggleMenu}
              className="btn btn-sm px-3 font-size-16 header-item"
              id="vertical-menu-btn">
              <i className="fa fa-fw fa-bars" />
            </button>

            <form className="app-search d-none d-lg-block">
              <div className="position-relative">
                <input type="text" className="form-control" placeholder={"Axtar..."} />
                <span className="bx bx-search-alt" />
              </div>
            </form>
          </div>

          <div className="d-flex">
            <div className="dropdown d-inline-block d-lg-none ms-2">
              <button
                onClick={() => {
                  setsearch(!search);
                }}
                type="button"
                className="btn header-item noti-icon "
                id="page-header-search-dropdown">
                <i className="mdi mdi-magnify" />
              </button>
              <div
                className={
                  search
                    ? "dropdown-menu dropdown-menu-lg dropdown-menu-end p-0 show"
                    : "dropdown-menu dropdown-menu-lg dropdown-menu-end p-0"
                }
                aria-labelledby="page-header-search-dropdown">
                <form className="p-3">
                  <div className="form-group m-0">
                    <div className="input-group">
                      <input type="text" className="form-control" placeholder="Axtar..." />
                      <div className="input-group-append">
                        <button className="btn btn-primary" type="submit">
                          <i className="mdi mdi-magnify" />
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>

            <div className="dropdown d-none d-lg-inline-block ms-1">
              <button
                type="button"
                onClick={toggleFullscreen}
                className="btn header-item noti-icon "
                data-toggle="fullscreen">
                <i className="bx bx-fullscreen" />
              </button>
            </div>

            <ProfileMenu />
          </div>
        </div>
      </header>
    </React.Fragment>
  );
};

export default Header;
