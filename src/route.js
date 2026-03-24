import React from 'react';
import { createBrowserRouter } from "react-router-dom";
import { requireRole } from './features/auth/RequireRole';

import LandingPageLayout from './layouts/LandingPageLayout';
import LandingPage from './features/landing/LandingPage';
import Signin from './features/auth/Signin';
import Register from './features/auth/Register';
import AuthCompo from './features/auth/AuthCompo';

import DashboardLayout from './layouts/DashboardLayout';
import Dashboard from '@/features/dashboard/index';
import Reports from './features/dashboard/reports';
import Sales from './features/dashboard/sales';
import CRM from './features/dashboard/CRM';
import AllProducts from './features/dashboard/products';
import Categories from './features/dashboard/category';
import Stock from './features/dashboard/stock management';

import AdminLayout from './layouts/AdminLayout';
import AdminLandingPage from './features/admin/AdminLandingPage';

// Sales
import CreateSale from './features/dashboard/sales/CreateSale';
import ConfirmPayment from './features/dashboard/purchases/Confirmpayment';
import CartPage from './features/dashboard/sales/Cart';
import AddtoCart from './features/dashboard/sales/AddtoCart';
import Receipt from './features/dashboard/sales/Receipt';

// Inventory
import AddStock from './features/dashboard/inventory/AddStock';
import InventoryPage from './features/dashboard/inventory/Inventory';

// CRM
import Customer from './features/dashboard/customers/Customer';
import AddNewCustomer from './features/dashboard/customers/CreateCustomer';

// Other
import AllProducts2 from './features/dashboard/products';
import DiscountDashboard from './features/dashboard/discount/index';

import Unauthorized from '@/features/auth/Unauthorized';
import ComingSoon from '@/components/ComingSoon';

// Shared POS children — reused in both /dashboard and /admin
const salesChildren = [
  { index: true, Component: CreateSale },
  { path: 'new', Component: CreateSale },
  { path: 'saved-carts', Component: CartPage },
  { path: 'add-to-carts', Component: AddtoCart },
  { path: 'discounts', Component: DiscountDashboard },
  { path: ':id/confirm', Component: ConfirmPayment },
  { path: ':id/receipt', Component: Receipt },
]

const inventoryChildren = [
  { path: 'stock-management', Component: InventoryPage },
  { path: 'new', Component: AddStock },
]

const crmChildren = [
  { path: 'customers', Component: Customer },
  { path: 'customers/new', Component: AddNewCustomer },
]

export function route() {
  return createBrowserRouter([
    {
      path: '/',
      Component: LandingPageLayout,
      HydrateFallback: () => null,
      children: [
        { index: true, Component: LandingPage },
      ]
    },

    {
      path: '/auth',
      Component: AuthCompo,
      children: [
        { index: true, Component: Signin },
        { path: 'signup', Component: Register },
      ]
    },

    {
      path: '/unauthorized',
      Component: Unauthorized,
    },

    // ── Dashboard (users + admins) ──────────────────────────
    {
      path: '/dashboard',
      Component: DashboardLayout,
      loader: () => requireRole(["user", "admin"]),
      children: [
        { index: true, Component: Dashboard },
        { path: 'reports', Component: Reports },
        { path: 'crm', Component: CRM },
        { path: 'all-items', Component: AllProducts },
        { path: 'categories', Component: Categories },
        { path: 'stock-management', Component: Stock },

        // Full POS
        { path: 'sales', children: salesChildren },

        // Inventory
        { path: 'inventory', children: inventoryChildren },

        // CRM sub pages
        { path: 'crm', children: crmChildren },

        // Not built yet
        { path: 'suppliers', Component: ComingSoon },
        { path: 'purchases', Component: ComingSoon },
        { path: 'expenses', Component: ComingSoon },
        { path: 'settings', Component: ComingSoon },
        { path: 'users', Component: ComingSoon },
      ]
    },

    // ── Admin (admins only) ─────────────────────────────────
    {
      path: '/admin',
      Component: AdminLayout,
      loader: () => requireRole(["admin"]),
      children: [
        { index: true, Component: AdminLandingPage },
        { path: 'all-items', Component: AllProducts },

        // Full POS
        { path: 'sales', children: salesChildren },

        // Inventory
        { path: 'inventory', children: inventoryChildren },

        // CRM
        { path: 'crm', children: crmChildren },

        // Not built yet
        { path: 'reports', Component: ComingSoon },
        { path: 'suppliers', Component: ComingSoon },
        { path: 'purchases', Component: ComingSoon },
        { path: 'expenses', Component: ComingSoon },
        { path: 'settings', Component: ComingSoon },
        { path: 'users', Component: ComingSoon },
      ]
    },
  ]);
}