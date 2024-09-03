import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

// Types
import { TokenPair, User } from "@/types/models";

// Constants
import {
  USER_ROLES,
  ACCESS_TOKEN,
  ORDER_STATUS,
  REFRESH_TOKEN,
} from "@/constants";

export const setAuthCookies = (
  { access, refresh }: TokenPair,
  remember: boolean = false
) => {
  const accessDecoded = jwtDecode(access);

  Cookies.set(ACCESS_TOKEN, access, {
    path: "/",
    expires: new Date(accessDecoded.exp ? accessDecoded.exp * 1000 : 1000),
  });

  if (!remember) return;

  const refreshDecoded = jwtDecode(refresh);

  Cookies.set(REFRESH_TOKEN, refresh, {
    path: "/",
    expires: new Date(refreshDecoded.exp ? refreshDecoded.exp * 1000 : 1000),
  });
};

export const removeAuthCookies = () => {
  Cookies.remove(ACCESS_TOKEN);
  Cookies.remove(REFRESH_TOKEN);
};

export const getAccessToken = () => {
  const token = Cookies.get(ACCESS_TOKEN);
  return token ? token : "";
};

export const getRefreshToken = () => {
  const token = Cookies.get(REFRESH_TOKEN);
  return token ? token : "";
};

export const hasPermission = (
  user: User | null,
  permissions?: number[],
  is_delete: boolean = false
) => {
  if (!user) return false;

  if (is_delete) return user.type === USER_ROLES.SUPERADMIN;

  if (!permissions) return true;

  if (user.type === USER_ROLES.ADMIN) return true;

  if (user.type === USER_ROLES.SUPERADMIN) return true;

  return permissions.includes(user.type);
};

export const hasPermissionByStatus = (user: User | null, status?: number) => {
  if (!user) return false;

  if (user.type === USER_ROLES.ADMIN) return true;

  if (!status) return true;

  if (user.type === USER_ROLES.STORE) return status < ORDER_STATUS.PENDING;

  return true;
};
