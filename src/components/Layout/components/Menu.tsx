interface IMenuHeader {
  id: string;
  label: string;
  isHeader: true;
}

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
}

const menuItems: (IMenuHeader | IMenuItem)[] = [
  {
    id: "menu",
    label: "Menu",
    isHeader: true,
  },
  {
    id: "dashboard",
    label: "Ana Səhifə",
    icon: "bx bx-home-circle",
    link: "/dashboard",
  },
  {
    id: "branches",
    label: "Filiallar",
    icon: "bx bx-building",
    link: "/branches",
  },
  {
    id: "suppliers",
    label: "Firmalar",
    icon: "bx bx-building-house",
    link: "/suppliers",
  },
  {
    id: "categories",
    label: "Kateqoriyalar",
    icon: "bx bx-list-ol",
    link: "/categories",
  },
];

export { menuItems };
