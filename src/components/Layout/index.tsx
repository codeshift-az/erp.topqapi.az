import React, { useState, useEffect } from "react";

// Helpers
import { changeBodyAttribute } from "@/helpers";

// Related Components
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";

interface IProps {
  children: React.ReactNode;
}

const Layout = ({ children }: IProps) => {
  const [isPreloader] = useState(false);

  useEffect(() => {
    const preloader = document.getElementById("preloader");
    const status = document.getElementById("status");

    if (!preloader || !status) return;

    if (isPreloader) {
      preloader.style.display = "block";
      status.style.display = "block";

      setTimeout(function () {
        preloader.style.display = "none";
        status.style.display = "none";
      }, 2500);
    } else {
      preloader.style.display = "none";
      status.style.display = "none";
    }
  }, [isPreloader]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  changeBodyAttribute("data-layout", "vertical");
  changeBodyAttribute("data-sidebar", "dark");
  changeBodyAttribute("data-topbar", "light");

  return (
    <React.Fragment>
      <div id="preloader">
        <div id="status">
          <div className="spinner-chase">
            <div className="chase-dot" />
            <div className="chase-dot" />
            <div className="chase-dot" />
            <div className="chase-dot" />
            <div className="chase-dot" />
            <div className="chase-dot" />
          </div>
        </div>
      </div>

      <div id="layout-wrapper">
        <Header />
        <Sidebar />
        <div className="main-content">{children}</div>
        <Footer />
      </div>
    </React.Fragment>
  );
};

export default Layout;
