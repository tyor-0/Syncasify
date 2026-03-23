import React from 'react';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { requireRole } from './features/auth/RequireRole';
import { createBrowserRouter } from "react-router-dom";
import LandingPageLayout from './layouts/LandingPageLayout';
import LandingPage from './features/landing/LandingPage';
import Signin from './features/auth/Signin';
import Register from './features/auth/Register';
import AuthCompo from './features/auth/AuthCompo';
import DashboardLayout from './layouts/DashboardLayout';
import Dashboard from '@/features/dashboard/index';
import AdminLayout from './layouts/AdminLayout';
import AdminLandingPage from './features/admin/AdminLandingPage';
import ReportLayout from './layouts/ReportLayout';
import Reports from './features/dashboard/reports';
import Sales from './features/dashboard/sales';
import CRM from './features/dashboard/CRM';
import getAllProducts from './features/dashboard/products';
import Categories from './features/dashboard/category';
import Stock from './features/dashboard/stock management';
import AllProducts from './features/dashboard/products';
import AddStock from './features/dashboard/inventory/AddStock';
import CreateSale from './features/dashboard/sales/CreateSale';
import AddNewCustomer from './features/dashboard/customers/CreateCustomer';
import InventoryPage from './features/dashboard/inventory/Inventory';
import Customer from './features/dashboard/customers/Customer';
import DiscountDashboard from './features/dashboard/discount';
import { Component } from 'lucide-react';
import ConfirmPayment from './features/dashboard/purchases/Confirmpayment';
import CartPage from './features/dashboard/sales/Cart';
import AddtoCart from './features/dashboard/sales/AddtoCart';



export function route() {
    return createBrowserRouter([
        {
            path: '/',
            Component: LandingPageLayout,
            // HydrateFallback: () => null,
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
            path: '/dashboard',
            Component: DashboardLayout,
            loader: () => requireRole(["user", "admin"]),
            children: [
                { index: true, Component: Dashboard },
                // { path: '/products/:id', Component: getProductById },
                // { path: '/products/:id', Component: AddtoCart },
                { path: 'reports', Component: Reports },
                { path: 'sales', Component: Sales },
                { path: 'crm', Component: CRM },
                { path: 'crm/customers', Component: Customer },
                { path: 'all-items', Component: AllProducts },
                { path: 'categories', Component: Categories },
                { path: 'stock-management', Component: Stock },
                // { path: 'customers', Component: Customers }
            ]
        },

        {
            path: '/admin',
            Component: AdminLayout,
            loader: () => requireRole(["admin"]),
            children: [
                { index: true, Component: AdminLandingPage },

                // Sales
                { path: 'sales/new', Component: CreateSale },
                { path: 'sales/saved-carts', Component: CartPage },
                { path: 'sales/add-to-carts', Component: AddtoCart },
                { path: 'sales/discounts', Component: DiscountDashboard },
                { path: 'sales/:id/confirm', Component: ConfirmPayment },
                { path: 'sales/:id/receipt', Component: ConfirmPayment },


                // Inventory
                { path: 'inventory/stock-management', Component: InventoryPage },
                { path: 'inventory/new', Component: AddStock },

                // CRM
                { path: 'crm/customers', Component: Customer },
                { path: 'crm/customers/new', Component: AddNewCustomer },

                // Products
                { path: 'all-items', Component: AllProducts },


                // { path: 'products/new', component: AddProduct },
                // { path: 'sales', component: Sales },
                // { path: 'sales/:id', component: SingleSale },
                // { path: 'customers', component: Customers },

                // { path: 'checkout', component: Checkout }
                // { path: 'users', Component: Users },
                // { path: 'users', Component: createUser },
                // { path: '/users/:id', Component: getuserById },
                // { path: '/users/:id', Component: deleteUser },
                // { path: '/users/:id', Component: updateUser },
            ]
        },

        //       {/* REPORTS */}
        // {
        //     path: '/reports',
        //     Component: ReportLayout,
        //     children: [
        //         { index: true, Component: Reports },
        //         { path: 'reports/sales', Component: SalesReport },
        //         { path: 'reports/inventory', Component: InventoryReport },
        //         { path: 'reports/profit', Component: ProfitReport },
        //         { path: 'reports/expenses', Component: ExpensesReport },
        //     ]
        // },

        // {
        //     path: '/products',
        //     Component: ProductLayout,
        //     children: [
        //         { index: true, Component: Products },
        //         { path: 'products/new', Component: CreateProduct },
        //         { path: 'products/:id', Component: DeleteDetails },
        //         { path: 'products/:id/edit', Component: EditProduct },
        //     ]
        // },


        // {
        //     path: '/cart',
        //     Component: cardLayout,
        //     children: [
        //         { index: true, Component: Cart },
        //         { path: '/dashboard/products', Component: UsersProducts },
        //         { path: '/dashboard/add-product', Component: CreateProduct },
        //     ]
        // },

        // {
        //     path: '/checkout',
        //     Component: cardLayout,
        //     children: [
        //         { index: true, Component: Cart },
        //         { path: '/dashboard/products', Component: UsersProducts },
        //         { path: '/dashboard/add-product', Component: CreateProduct },
        //     ]
        // },

        // {
        //     path: '/profile',
        //     Component: DashboardLayout,
        //     children: [
        //         { index: true, Component: Dashboard },
        //         { path: '/dashboard/products', Component: UsersProducts },
        //         { path: '/dashboard/add-product', Component: CreateProduct },
        //     ]
        // },

        //       {/* INVENTORY */}

        // {
        //     path: '/inventory',
        //     Component: InventoryLayout,
        //     children: [
        //         { index: true, Component: Inventory },
        //         { path: 'inventory/logs', Component: InventoryLogs },
        //     ]
        // },


        //       {/* SALES */}

        // {
        //     path: '/sales',
        //     Component: SalesLayout,
        //     children: [
        //         { index: true, Component: Sales },
        //         { path: 'sales/new', Component: CreateSale },
        //         {path: "sales/:id", Component: SaleDetails},
        //     ]
        // },


        //       {/* PURCHASES */}

        // {
        //     path: '/purchases',
        //     Component: PurchaseLayout,
        //     children: [
        //         { index: true, Component: Purchases },
        //         { path: 'purchases/new', Component: CreatePurchase },
        //     ]
        // },



        //       {/* CUSTOMERS */}

        // {
        //     path: '/customers',
        //     Component: CustomerLayout,
        //     children: [
        //         { index: true, Component: Customers },
        //         { path: 'customers/:id', Component: CustomerDetails },
        //     ]
        // },



        //       {/* SUPPLIERS */}

        // {
        //     path: '/suppliers',
        //     Component: SupplierLayout,
        //     children: [
        //         { index: true, Component: Suppliers },
        //         { path: 'suppliers/:id', Component: SupplierDetails },
        //     ]
        // },




        //       {/* EXPENSES */}

        // {
        //     path: '/expenses',
        //     Component: ExpensesLayout,
        //     children: [
        //         { index: true, Component: Expenses },
        //         { path: 'expenses/new', Component: CreateExpense },
        //     ]
        // },


        //       {/* SETTINGS */}

        // {
        //     path: '/settings',
        //     Component: SettingsLayout,
        //     children: [
        //         { index: true, Component: Settings },
        //         { path: 'settings/business', Component: BusinessSettings },
        //         { path: 'settings/users', Component: UserSettings },
        //         { path: 'settings/roles', Component: RoleSettings },
        //     ]
        // }


        //       {/* USERS/STAFF MANAGEMENT */}

        // {
        //     path: '/users',
        //     Component: SettingsLayout,
        //     children: [
        //         { index: true, Component: Settings },
        //         { path: 'users/new', Component: CreateUser },
        //         { path: 'users/:id', Component: UserDetails },
        //         { path: 'users/roles', Component: UserRoles },
        //     ]
        // }


    ]);
}
