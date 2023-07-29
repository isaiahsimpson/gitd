import { createRouter, createWebHashHistory } from "vue-router";
import DocView from "@/components/doc-view.vue";
import HomeView from "@/components/home-view.vue";

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home-view",
      component: HomeView,
    },
    {
      path: "/:owner/:repo/:path*",
      name: "doc-view",
      component: DocView,
      // props(route) {
      //   let {
      //     params: { owner, repo, path },
      //     query: { ref },
      //   } = route;

      //   return {
      //     owner,
      //     repository: repo,
      //     path: path.join("/"),
      //     reference: ref,
      //   };
      // },
    },
  ],
});

export default router;