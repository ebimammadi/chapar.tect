export default [
  {
    path: "tickets",
    component: () => import("@/views/app/tickets/TicketParent.vue"),
    meta: {
      requiresAuth: true,
      requiresAdmin: true
    },
    children: [
      {
        path: "",
        name: "ticket list",
        component: () => import("@/views/app/tickets/TicketList.vue"),
        meta: {
        }
      },
      {
        path: ":ticketId",
        name: "ticket id public page",
        component: () => import("@/views/app/tickets/TicketPage.vue"),
        meta: {
        }
      }
    ]
  }
]
