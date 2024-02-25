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
];

export { menuItems };
