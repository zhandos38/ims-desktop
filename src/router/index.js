import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/login",
    name: "login",
    meta: { layout: "auth" },
    component: () => import("@/views/Login.vue")
  },
  {
    path: "/signup",
    name: "signup",
    meta: { layout: "auth" },
    component: () => import("@/views/Signup.vue")
  },
  {
    path: "/invoice",
    name: "invoice",
    component: () => import("@/views/Invoice.vue")
  },
  {
    path: "/invoice-create",
    name: "invoice-create",
    meta: { layout: "full" },
    component: () => import("@/views/InvoiceCreate.vue")
  },
  {
    path: "/supplier",
    name: "supplier",
    component: () => import("@/views/Supplier.vue")
  },
  {
    path: "/product",
    name: "product",
    meta: { layout: "full" },
    component: () => import("@/views/Product.vue")
  },
  {
    path: "/category",
    name: "category",
    component: () => import("@/views/Category.vue")
  },
  {
    path: "/customer",
    name: "customer",
    component: () => import("@/views/Customer.vue")
  },
  {
    path: "/report",
    name: "report",
    component: () => import("@/views/Report.vue")
  },
  {
    path: "/staff",
    name: "staff",
    component: () => import("@/views/Staff.vue")
  },
  {
    path: "/order",
    name: "order",
    meta: { layout: "full" },
    component: () => import("@/views/Order.vue")
  },
  {
    path: "/cashbox",
    name: "cashbox",
    component: () => import("@/views/Cashbox.vue")
  },
  {
    path: "/revision",
    name: "revision",
    component: () => import("@/views/Revision.vue")
  },
  {
    path: "/revision-create",
    name: "revision-create",
    component: () => import("@/views/RevisionCreate.vue")
  },
  {
    path: "/shift",
    name: "shift",
    component: () => import("@/views/Shift.vue")
  },
  {
    path: "/product-report",
    name: "product-report",
    component: () => import("@/views/ProductReport.vue")
  },
  {
    path: "/cashbox-transactions",
    name: "cashbox-transactions",
    component: () => import("@/views/CashboxTransactions.vue")
  },
  {
    path: "/cash",
    name: "cashbox-transactions",
    component: () => import("@/views/CashboxTransactions.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
