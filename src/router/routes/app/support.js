export default [
  {
    path: "support",
    component: () => import("@/views/app/support/SupportParent.vue"),
    meta: {
      requiresAuth: true
    },
    children: [
      {
        path: "",
        name: "ticket list",
        component: () => import("@/views/app/support/TicketList.vue"),
        meta: {
        }
      },
      {
        path: ":ticketId",
        name: "ticket page",
        component: () => import("@/views/app/support/TicketPage.vue"),
        meta: {
        }
      }
    ]
  }
]
