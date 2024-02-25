import React from "react";
import { Routes, Route } from "react-router-dom";

// Import Routes
import { publicRoutes, protectedRoutes } from "@/routes";

// Import Middleware
import Authmiddleware from "@/routes/middleware";

// Import Layout
import Layout from "@/components/Layout";

// Import scss
import "@/assets/scss/theme.scss";

const App = () => {
  return (
    <React.Fragment>
      <Routes>
        {publicRoutes.map((route, index) => (
          <Route key={index} path={route.path} element={route.component} />
        ))}
        {protectedRoutes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            element={
              <Authmiddleware>
                <Layout>{route.component}</Layout>
              </Authmiddleware>
            }
          />
        ))}
      </Routes>
    </React.Fragment>
  );
};

export default App;
