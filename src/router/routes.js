import MapView from "@/views/MapView.vue";

export default [
  {
    path: "/",
    name: "mapview",
    component: MapView
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ "@/views/About.vue")
  },
  {
    path: "/blog",
    meta: {
      windowRedirectAfter: true
    }
  },
  {
    path: "/conf-schedule",
    component: () =>
      import(/* webpackChunkName: "about" */ "@/views/ConfSchedule.vue"),
    meta: {
      windowRedirectAfter: true
    }
  }
];
