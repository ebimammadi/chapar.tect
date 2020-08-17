export default [
  {
    path: "products",
    component: () => import("@/views/app/products/ProductsParent.vue"),
    meta: {
      requiresAuth: true
    },
    children: [
      {
        path: "",
        name: "product list",
        component: () => import("@/views/app/products/ProductsList.vue"),
        meta: {
        }
      },
      {
        path: "id/:_id",
        name: "edit product",
        component: () => import("@/views/app/products/ProductsNewPage.vue"),
        meta: {
        },
        props: true
      },
      {
        path: "new",
        name: "new product",
        component: () => import("@/views/app/products/ProductsNewPage.vue"),
        meta: {
        }
      }
    ]
  }
]
