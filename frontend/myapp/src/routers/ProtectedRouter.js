import React from "react";

import AdminLayout from "../layout/ProtectedLayout/AdminLayout";
import CashierLayout from "../layout/ProtectedLayout/CashierLayout";
import ModeratorLayout from "../layout/ProtectedLayout/ModeratorLayout";
import ProtectedLayout from "../layout/ProtectedLayout/ProtectedLayout";

import MainLayout from "../layout/MainLayout";

import EmployeeCreate from "../pages/Employees/EmployeeCreate";
import EmployeeDetail from "../pages/Employees/EmployeeDetail";
import EmployeeList from "../pages/Employees/EmployeeList";

import CustomerCreate from "../pages/Customers/CustomerCreate";
import CustomerDetail from "../pages/Customers/CustomerDetail";
import CustomerList from "../pages/Customers/CustomerList";

import ProductCreate from "../pages/Products/ProductCreate";
import ProductDetail from "../pages/Products/ProductDetail";
import ProductList from "../pages/Products/ProductList";

import ServiceDetail from "../pages/RepairServices/ServiceDetail";
import ServiceList from "../pages/RepairServices/ServiceList";

import TicketDetail from "../pages/Tickets/TicketComponent/TicketDetail";
import TicketList from "../pages/Tickets/TicketComponent/TicketList";
import TicketForm from "../pages/Tickets/TicketForm/TicketForm";
import TicketFormUpdate from "../pages/Tickets/TicketForm/TicketFormUpdate";

import RevenueStatistics from "../pages/Statistics/RevenueStatistics";
import Statistics from "../pages/Statistics/Statistics";
import TopMechanicStatistics from "../pages/Statistics/TopMechanicStatistics";
import ProductServiceStatistics from "../pages/Statistics/ProductServiceStatistics";
import CustomerStatistics from "../pages/Statistics/CustomerStatistics";

export const ProtectedRouter = {
  element: <ProtectedLayout />,
  children: [
    {
      element: <CashierLayout />,
      children: [
        {
          element: <MainLayout />,
          children: [
            {
              path: "/manage/tickets",
              element: <TicketList />,
            },
            {
              path: "/manage/tickets/:id",
              element: <TicketDetail />,
            },
          ],
        },
      ],
    },

    {
      element: <ModeratorLayout />,
      children: [
        {
          element: <MainLayout />,
          children: [
            {
              path: "/manage/tickets",
              element: <TicketList />,
            },
            {
              path: "/manage/tickets/:id",
              element: <TicketDetail />,
            },
            {
              path: "/manage/tickets/create",
              element: <TicketForm />,
            },
            {
              path: "/manage/tickets/update/:id",
              element: <TicketFormUpdate />,
            },
            {
              path: "/manage/customers",
              element: <CustomerList />,
            },
            {
              path: "/manage/customers/create",
              element: <CustomerCreate />,
            },
            {
              path: "/manage/customers/:id",
              element: <CustomerDetail />,
            },
          ],
        },
      ],
    },

    {
      element: <AdminLayout />,
      children: [
        {
          element: <MainLayout />,
          children: [
            {
              path: "/manage/employees",
              element: <EmployeeList />,
            },
            {
              path: "/manage/employees/:id",
              element: <EmployeeDetail />,
            },
            {
              path: "/manage/employees/create",
              element: <EmployeeCreate />,
            },
            {
              path: "/manage/customers",
              element: <CustomerList />,
            },
            {
              path: "/manage/customers/create",
              element: <CustomerCreate />,
            },
            {
              path: "/manage/customers/:id",
              element: <CustomerDetail />,
            },
            {
              path: "/manage/products",
              element: <ProductList />,
            },
            {
              path: "/manage/products/:id",
              element: <ProductDetail />,
            },
            {
              path: "/manage/products/create",
              element: <ProductCreate />,
            },
            {
              path: "/manage/services",
              element: <ServiceList />,
            },
            {
              path: "/manage/services/:id",
              element: <ServiceDetail />,
            },
            {
              path: "/manage/tickets",
              element: <TicketList />,
            },
            {
              path: "/manage/tickets/:id",
              element: <TicketDetail />,
            },
            {
              path: "/manage/tickets/create",
              element: <TicketForm />,
            },
            {
              path: "/manage/tickets/update/:id",
              element: <TicketFormUpdate />,
            },
            {
              path: "/",
              element: <Statistics />,
            },
            {
              path: "/manage/statistics",
              element: <Statistics />,
            },
            {
              path: "/manage/statistics/revenue",
              element: <RevenueStatistics />,
            },
            {
              path: "/manage/statistics/ticket_mechanic",
              element: <TopMechanicStatistics />,
            },
            {
              path: "/manage/statistics/product_service",
              element: <ProductServiceStatistics />,
            },
            {
              path: "/manage/statistics/customer",
              element: <CustomerStatistics />,
            },
          ],
        },
      ],
    },
  ],
};
