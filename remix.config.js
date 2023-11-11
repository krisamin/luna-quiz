import { flatRoutes } from "remix-flat-routes";

/** @type {import('@remix-run/dev').AppConfig} */
export default {
  ignoredRouteFiles: ["**/.*", "**/*.css", "**/*.scss", "**/*.css.map"],
  routes: async (defineRoutes) => {
    return flatRoutes("routes", defineRoutes);
  },
  // appDirectory: "app",
  // assetsBuildDirectory: "public/build",
  // publicPath: "/build/",
  // serverBuildPath: "build/index.js",
};
