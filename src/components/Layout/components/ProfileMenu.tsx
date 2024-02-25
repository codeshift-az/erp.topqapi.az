import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/store";

// Reactstrap
import { Dropdown, DropdownToggle, DropdownMenu } from "reactstrap";

// Assets
import { UserAvatar } from "@/assets/images";

// Actions
import { getAccount } from "@/store/account/actions";

const ProfileMenu = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.account);

  useEffect(() => {
    if (!user) {
      dispatch(getAccount());
    }
  }, [dispatch, user]);

  const [menu, setMenu] = useState(false);

  return (
    <React.Fragment>
      <Dropdown isOpen={menu} toggle={() => setMenu(!menu)} className="d-inline-block">
        <DropdownToggle className="btn header-item " id="page-header-user-dropdown" tag="button">
          <img
            className="rounded-circle header-profile-user"
            src={UserAvatar}
            alt="Header Avatar"
          />

          <span className="d-none d-xl-inline-block ms-2 me-1">
            {user?.first_name} {user?.last_name}
          </span>

          <i className="mdi mdi-chevron-down d-none d-xl-inline-block" />
        </DropdownToggle>

        <DropdownMenu className="dropdown-menu-end">
          <Link to="/account" className="dropdown-item">
            <i className="bx bx-user font-size-16 align-middle me-1" />
            <span>Profil</span>
          </Link>

          <Link to="/settings" className="dropdown-item">
            <i className="bx bx-wrench font-size-16 align-middle me-1" />
            <span>Tənzimləmələr</span>
          </Link>

          <div className="dropdown-divider" />

          <Link to="/auth/logout" className="dropdown-item">
            <i className="bx bx-power-off font-size-16 align-middle me-1 text-danger" />
            <span>Çıxış</span>
          </Link>
        </DropdownMenu>
      </Dropdown>
    </React.Fragment>
  );
};

export default ProfileMenu;
