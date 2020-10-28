import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    meta: {
      requiresAuth: true
    },
    component: Home
  },
  {
    path: "/login",
    name: "login",
    meta: {
      layout: "auth"
    },
    component: () => import("@/views/Login.vue")
  },
  {
    path: "/signup",
    name: "signup",
    meta: {
      layout: "auth",
      requiresAuth: true
    },
    component: () => import("@/views/Signup.vue")
  },
  {
    path: "/invoice",
    name: "invoice",
    meta: {
      requiresAuth: true
    },
    component: () => import("@/views/Invoice.vue")
  },
  {
    path: "/invoice-create",
    name: "invoice-create",
    meta: {
      layout: "full",
      requiresAuth: true
    },
    component: () => import("@/views/InvoiceCreate.vue")
  },
  {
    path: "/supplier",
    name: "supplier",
    meta: {
      requiresAuth: true
    },
    component: () => import("@/views/Supplier.vue")
  },
  {
    path: "/product",
    name: "product",
    meta: {
      layout: "full",
      requiresAuth: true
    },
    component: () => import("@/views/Product.vue")
  },
  {
    path: "/category",
    name: "category",
    meta: {
      requiresAuth: true
    },
    component: () => import("@/views/Category.vue")
  },
  {
    path: "/customer",
    name: "customer",
    meta: {
      requiresAuth: true
    },
    component: () => import("@/views/Customer.vue")
  },
  {
    path: "/report",
    name: "report",
    meta: {
      requiresAuth: true
    },
    component: () => import("@/views/Report.vue")
  },
  {
    path: "/staff",
    name: "staff",
    meta: {
      requiresAuth: true
    },
    component: () => import("@/views/Staff.vue")
  },
  {
    path: "/order",
    name: "order",
    meta: {
      layout: "full",
      requiresAuth: true
    },
    component: () => import("@/views/Order.vue")
  },
  {
    path: "/cashbox",
    name: "cashbox",
    meta: {
      requiresAuth: true
    },
    component: () => import("@/views/Cashbox.vue")
  },
  {
    path: "/revision",
    name: "revision",
    meta: {
      requiresAuth: true
    },
    component: () => import("@/views/Revision.vue")
  },
  {
    path: "/revision-create",
    name: "revision-create",
    meta: {
      requiresAuth: true
    },
    component: () => import("@/views/RevisionCreate.vue")
  },
  {
    path: "/shift",
    name: "shift",
    meta: {
      requiresAuth: true
    },
    component: () => import("@/views/Shift.vue")
  },
  {
    path: "/product-report",
    name: "product-report",
    meta: {
      requiresAuth: true
    },
    component: () => import("@/views/ProductReport.vue")
  },
  {
    path: "/cashbox-transactions",
    name: "cashbox-transactions",
    meta: {
      requiresAuth: true
    },
    component: () => import("@/views/CashboxTransactions.vue")
  },
  {
    path: "/date-report",
    name: "date-report",
    meta: {
      requiresAuth: true
    },
    component: () => import("@/views/DateReport.vue")
  },
  {
    path: "/return-report",
    name: "return-report",
    meta: {
      requiresAuth: true
    },
    component: () => import("@/views/ReturnReport.vue")
  },
  {
    path: "/settings",
    name: "settings",
    meta: {
      requiresAuth: true
    },
    component: () => import("@/views/Settings.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
