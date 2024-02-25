import React from "react";
import { Link } from "react-router-dom";

// Assets
import { LogoSmall, LogoLarge, LogoLightSmall, LogoLightLarge } from "@/assets/images";

// Related Components
import SidebarContent from "./SidebarContent";

interface IProps {
  type?: string;
}

const Sidebar = ({ type }: IProps) => {
  return (
    <React.Fragment>
      <div className="vertical-menu">
        <div className="navbar-brand-box">
          <Link to="/" className="logo logo-dark">
            <span className="logo-sm">
              <img src={LogoSmall} alt="Logo Small" height="22" />
            </span>
            <span className="logo-lg">
              <img src={LogoLarge} alt="Logo Large" height="30" />
            </span>
          </Link>

          <Link to="/" className="logo logo-light">
            <span className="logo-sm">
              <img src={LogoLightSmall} alt="Logo Light Small" height="22" />
            </span>
            <span className="logo-lg">
              <img src={LogoLightLarge} alt="Logo Light Large" height="30" />
            </span>
          </Link>
        </div>
        <div data-simplebar className="h-100">
          {type !== "condensed" ? <SidebarContent /> : <SidebarContent />}
        </div>

        <div className="sidebar-background"></div>
      </div>
    </React.Fragment>
  );
};

export default Sidebar;
