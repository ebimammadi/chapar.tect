export default [
  {
    path: "tickets",
    component: () => import("@/views/app/tickets/TicketParent.vue"),
    meta: {
      requiresAuth: true
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
        name: "ticket page",
        component: () => import("@/views/app/tickets/TicketPage.vue"),
        meta: {
        }
      }
    ]
  }
]
