import Vue from "vue";
import Router from "vue-router";
import routes from "./routes";

Vue.use(Router);

const router = new Router({
  routes,
  mode: "history"
});

router.beforeEach((to, from, next) => {
  //this will recursively go up from child to parent, useful if utilizing children routes. otherwise, you don't need it
  let matchedObject = from.matched
    .slice()
    .reverse()
    .find(r => r.meta && r.meta.hasOwnProperty("windowRedirectAfter"));

  if (matchedObject) {
    if (matchedObject.meta.windowRedirectAfter === true) {
      window.location.href = to.fullPath;
      return;
    }
  }

  next();
});

export default router;
