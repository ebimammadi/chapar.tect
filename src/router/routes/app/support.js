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
        path: "id/:ticketId",
        name: "ticket page",
        component: () => import("@/views/app/support/TicketPage.vue"),
        meta: {
        },
        props: true
      },
      {
        path: "new",
        name: "new ticket",
        component: () => import("@/views/app/support/TicketNewPage.vue"),
        meta: {
        }
      }
    ]
  }
]
