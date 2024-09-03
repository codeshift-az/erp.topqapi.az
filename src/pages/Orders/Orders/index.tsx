import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

// Redux
import { useSelector } from "react-redux";
import { RootState } from "@/store";

// Reactstrap
import { Container } from "reactstrap";

// Components
import Breadcrumbs from "@/components/Breadcrumb";

// Constants
import { USER_ROLES } from "@/constants";

// Types
import { Branch } from "@/types/models";

// Helpers
import { getPageTitle } from "@/helpers";

// API
import { getBranch } from "@/api/branch";

// Related components
import TableContainer from "./components/TableContainer";

const Orders = () => {
  const { pathname } = useLocation();

  const [title, setTitle] = useState("");

  document.title = getPageTitle(title);

  const { user } = useSelector((state: RootState) => state.account);

  const [branch, setBranch] = useState<Branch | null>(null);
  const [branchID, setBranchID] = useState<number | null>(null);

  useEffect(() => {
    if (!user) return;
  }, [user]);

  useEffect(() => {
    if (!user) return;

    if (user.type === USER_ROLES.STORE) {
      setBranchID(user.branch.id);
      return;
    }

    if (pathname.includes("branch")) {
      setBranchID(() => Number(pathname.split("/")[2]));
      return;
    }

    setBranchID(null);
    setTitle("Bütün Satışlar");
  }, [pathname, user]);

  useEffect(() => {
    if (!branchID) return;

    getBranch(branchID)
      .then((branch) => {
        setBranch(branch);
        setTitle(`${branch.name} Filialı Satışları`);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [branchID]);

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs
            title={title}
            breadcrumbItems={
              branch && user?.type === USER_ROLES.ADMIN
                ? [
                    { title: "Ana Səhifə", url: "/" },
                    { title: "Filiallar", url: "/branches" },
                    { title: branch.name, url: `/branch/${branchID}` },
                    { title: title },
                  ]
                : [{ title: "Ana Səhifə", url: "/" }, { title: title }]
            }
          />

          {/* Render Table Container */}
          <TableContainer branchID={branchID} />
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Orders;
