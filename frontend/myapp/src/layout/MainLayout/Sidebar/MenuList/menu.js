import {
    IconAssembly,
    IconBrandProducthunt,
    IconKey,
    IconTicket,
    IconUser,
    IconUsers,
    IconReportAnalytics
} from "@tabler/icons";

const icons = {
  IconKey,
  IconUsers,
  IconUser,
  IconBrandProducthunt,
  IconAssembly,
  IconTicket,
  IconReportAnalytics,
};

export const menuAdmin = [
  {
    id: "tickets",
    title: "Quản Lý Phiếu Sửa",
    type: "item",
    icon: icons.IconTicket,
    url: "/manage/tickets",
  },
  {
    id: "employees",
    title: "Quản Lý Nhân Viên",
    type: "item",
    icon: icons.IconUsers,
    url: "/manage/employees",
  },
  {
    id: "customers",
    title: "Quản Lý Khách Hàng",
    type: "item",
    icon: icons.IconUser,
    url: "/manage/customers",
  },
  {
    id: "products",
    title: "Quản Lý Linh Kiện",
    type: "item",
    icon: icons.IconBrandProducthunt,
    url: "/manage/products",
  },
  {
    id: "services",
    title: "Quản Lý Dịch Vụ",
    type: "item",
    icon: icons.IconAssembly,
    url: "/manage/services",
  },
  {
    id: "statistics",
    title: "Báo cáo",
    type: "item",
    icon: icons.IconReportAnalytics,
    url: "/manage/statistics",
  },
];

export const menuMod = [
  {
    id: "tickets",
    title: "Quản Lý Phiếu Sửa",
    type: "item",
    icon: icons.IconTicket,
    url: "/manage/tickets",
  },
  {
    id: "customers",
    title: "Quản Lý Khách Hàng",
    type: "item",
    icon: icons.IconUser,
    url: "/manage/customers",
  },
];

export const menuCashier = [
  {
    id: "tickets",
    title: "Quản Lý Phiếu Sửa",
    type: "item",
    icon: icons.IconTicket,
    url: "/manage/tickets",
  },
];
