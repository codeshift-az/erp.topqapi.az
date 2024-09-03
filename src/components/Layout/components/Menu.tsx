import { USER_ROLES } from "@/constants";
import { hasPermission } from "@/helpers";

import { Branch, User } from "@/types/models";

export interface IMenuItem {
  id: string;
  label: string;
  icon?: string;
  url: string;
  badge?: {
    color: string;
    value: string;
  };
  subItems?: IMenuItem[];
  permissions?: number[];
}

const menuItems: IMenuItem[] = [
  {
    id: "orders",
    label: "Satışlar",
    icon: "bx bx-cart",
    url: "/orders",
    permissions: [USER_ROLES.WAREHOUSE, USER_ROLES.STORE],
    subItems: [
      {
        id: "orders",
        label: "Bütün Satışlar",
        url: "/orders",
        permissions: [USER_ROLES.WAREHOUSE],
      },
      {
        id: "orders-items",
        label: "Satılan məhsullar",
        url: "/orders/items",
        permissions: [USER_ROLES.WAREHOUSE],
      },
      {
        id: "branch-orders",
        label: "Filial Satışları",
        url: "/",
        permissions: [USER_ROLES.WAREHOUSE],
        subItems: [],
      },
    ],
  },
  {
    id: "warehouse",
    label: "Anbar",
    icon: "bx bx-store",
    url: "/warehouse",
    permissions: [USER_ROLES.WAREHOUSE, USER_ROLES.STORE],
    subItems: [
      {
        id: "warehouse-entries",
        label: "Giriş tarixçəsi",
        url: "/warehouse/entries",
        permissions: [USER_ROLES.WAREHOUSE],
      },
      {
        id: "warehouse-items",
        label: "Məhsul girişləri",
        url: "/warehouse/items",
        permissions: [USER_ROLES.WAREHOUSE],
      },
      {
        id: "warehouse-products",
        label: "Məhsullar",
        url: "/warehouse/products",
        permissions: [USER_ROLES.WAREHOUSE, USER_ROLES.STORE],
      },
    ],
  },
  {
    id: "staff",
    label: "İşçilər",
    icon: "bx bx-user",
    url: "/staff",
    permissions: [USER_ROLES.WAREHOUSE],
    subItems: [
      {
        id: "staff-drivers",
        label: "Taksilər",
        url: "/staff/drivers",
        permissions: [USER_ROLES.WAREHOUSE],
      },
      {
        id: "staff-sellers",
        label: "Satıcılar",
        url: "/staff/sellers",
        permissions: [USER_ROLES.WAREHOUSE],
      },
      {
        id: "staff-workers",
        label: "Ustalar",
        url: "/staff/workers",
        permissions: [USER_ROLES.WAREHOUSE],
      },
    ],
  },
  {
    id: "branches",
    label: "Filiallar",
    icon: "bx bx-building",
    url: "/branches",
    permissions: [USER_ROLES.WAREHOUSE],
  },
  {
    id: "suppliers",
    label: "Firmalar",
    icon: "bx bx-building-house",
    url: "/suppliers",
    permissions: [USER_ROLES.WAREHOUSE],
  },
  {
    id: "payments",
    label: "Ödəmələr",
    icon: "bx bx-money",
    url: "/payments",
    permissions: [USER_ROLES.WAREHOUSE],
  },
  {
    id: "expenses",
    label: "Xərclər",
    icon: "bx bx-money",
    url: "/expenses",
    permissions: [USER_ROLES.WAREHOUSE, USER_ROLES.STORE],
  },
  {
    id: "details",
    label: "Ətraflı",
    icon: "bx bx-detail",
    url: "/details",
    permissions: [USER_ROLES.WAREHOUSE],
    subItems: [
      {
        id: "catalog",
        label: "Məhsul Kataloqu",
        icon: "bx bx-list-ul",
        url: "/catalog",
        permissions: [USER_ROLES.WAREHOUSE],
      },
      {
        id: "details-products",
        label: "Məhsullar",
        url: "/products",
        permissions: [USER_ROLES.WAREHOUSE],
      },
      {
        id: "details-categories",
        label: "Kateqoriyalar",
        url: "/categories",
        permissions: [USER_ROLES.WAREHOUSE],
      },
    ],
  },
];

const addBranchOrders: (branches: Branch[]) => void = (branches) => {
  const branchOrderSubMenu: IMenuItem[] = [];

  if (branches) {
    branches.forEach((branch) => {
      branchOrderSubMenu.push({
        id: "branch-orders-" + branch.id,
        label: branch.name,
        url: `/branch/${branch.id}/orders`,
        permissions: [],
      });
    });
  }

  if (menuItems[0].subItems && menuItems[0].subItems[2].subItems)
    menuItems[0].subItems[2].subItems = branchOrderSubMenu;
};

const getMenuItems: (user: User, branches: Branch[]) => IMenuItem[] = (
  user,
  branches
) => {
  addBranchOrders(branches);

  const items: IMenuItem[] = [];

  menuItems.forEach((menuItem) => {
    if (menuItem.permissions && !hasPermission(user, menuItem.permissions))
      return;

    if (menuItem.subItems) {
      const subItems = menuItem.subItems.filter((subItem) => {
        return !subItem.permissions || hasPermission(user, subItem.permissions);
      });

      if (subItems.length > 0) {
        items.push({ ...menuItem, subItems });
      } else {
        items.push({ ...menuItem, subItems: undefined });
      }
    } else {
      items.push(menuItem);
    }
  });

  return items;
};

export { getMenuItems };
