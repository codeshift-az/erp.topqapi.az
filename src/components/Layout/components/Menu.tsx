import { USER_TYPES } from "@/constants";

interface IMenuItem {
  id: string;
  label: string;
  isHeader?: false;
  icon?: string;
  link: string;
  badge?: {
    color: string;
    value: string;
  };
  subItems?: IMenuItem[];
  parentId?: string;
  types?: number[];
}

const menuItems: IMenuItem[] = [
  {
    id: "dashboard",
    label: "Ana Səhifə",
    icon: "bx bx-home-circle",
    link: "/dashboard",
  },
  {
    id: "warehouse",
    label: "Anbar",
    icon: "bx bx-store",
    link: "/warehouse",
    types: [USER_TYPES.WAREHOUSE],
    subItems: [
      {
        id: "warehouse-entries",
        label: "Giriş tarixçəsi",
        link: "/warehouse/entries",
        parentId: "warehouse",
        types: [USER_TYPES.WAREHOUSE],
      },
      {
        id: "warehouse-products",
        label: "Məhsullar",
        link: "/warehouse/products",
        parentId: "warehouse",
        types: [USER_TYPES.WAREHOUSE],
      },
    ],
  },
  {
    id: "products",
    label: "Məhsullar",
    icon: "bx bx-box",
    link: "/products",
    types: [USER_TYPES.WAREHOUSE],
  },
  {
    id: "staff",
    label: "İşçilər",
    icon: "bx bx-user",
    link: "/staff",
    types: [USER_TYPES.WAREHOUSE],
    subItems: [
      {
        id: "staff-drivers",
        label: "Taksilər",
        link: "/staff/drivers",
        parentId: "staff",
        types: [USER_TYPES.WAREHOUSE],
      },
      {
        id: "staff-sellers",
        label: "Satıcılar",
        link: "/staff/sellers",
        parentId: "staff",
        types: [USER_TYPES.WAREHOUSE],
      },
      {
        id: "staff-workers",
        label: "Ustalar",
        link: "/staff/workers",
        parentId: "staff",
        types: [USER_TYPES.WAREHOUSE],
      },
    ],
  },
  {
    id: "branches",
    label: "Filiallar",
    icon: "bx bx-building",
    link: "/branches",
    types: [USER_TYPES.WAREHOUSE],
  },
  {
    id: "suppliers",
    label: "Firmalar",
    icon: "bx bx-building-house",
    link: "/suppliers",
    types: [USER_TYPES.WAREHOUSE],
  },
  {
    id: "categories",
    label: "Kateqoriyalar",
    icon: "bx bx-list-ol",
    link: "/categories",
    types: [USER_TYPES.WAREHOUSE],
  },
  {
    id: "expenses",
    label: "Xərclər",
    icon: "bx bx-money",
    link: "/expenses",
    types: [USER_TYPES.WAREHOUSE],
  },
];

export { menuItems };
