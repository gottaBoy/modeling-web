import { createRouter, createWebHashHistory } from 'vue-router';
import qs from 'qs';
import { AppRedirectView } from '@ibiz-template/vue3-util';
import { RouteConst } from '@ibiz-template/runtime';
import NProgress from '../../node_modules/.pnpm/nprogress@0.2.0/node_modules/nprogress/nprogress.mjs';
import '../../view/index.mjs';
import '../components/index.mjs';
import { ShareView } from '../../view/share-view/share-view.mjs';
import '../../util/index.mjs';
import 'nprogress/nprogress.css';
import { LoginView } from '../../view/login-view/login-view.mjs';
import { ErrorView } from '../../view/error-view/error-view.mjs';
import { UnauthorizedView } from '../../view/unauthorized-view/unauthorized-view.mjs';
import { ModalRouterShell } from '../components/modal-router-shell/modal-router-shell.mjs';
import { RouterShell } from '../components/router-shell/router-shell.mjs';
import { splitPathToSegments, validateRouteSegments } from '../../util/user-route-util/user-route-util.mjs';

"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class AppRouter {
  static setAuthGuard(authGuard) {
    this.authGuard = authGuard;
  }
  static getAppContext(route) {
    let appContext = {};
    if (route.params.appContext && route.params.appContext !== ibiz.env.routePlaceholder) {
      appContext = qs.parse(route.params.appContext, {
        strictNullHandling: true,
        delimiter: ";"
      });
    }
    return appContext;
  }
  static getRoutes() {
    const placeholder = ibiz.env.routePlaceholder;
    const paramReg = "[^/]+=[^/]+|".concat(placeholder);
    const viewReg = "[^=/]+";
    const routes = [
      {
        path: "/",
        redirect: "/".concat(placeholder, "/index/").concat(placeholder)
      },
      {
        path: "/login",
        name: "loginView",
        beforeEnter: async (_to, from, next) => {
          await this.authGuard(this.getAppContext(_to), false);
          next();
        },
        component: LoginView
      },
      {
        path: "/share",
        name: "shareView",
        beforeEnter: async (_to, from, next) => {
          const authority = await this.authGuard(this.getAppContext(_to));
          if (authority) {
            next();
          } else {
            next(false);
          }
        },
        component: ShareView
      },
      {
        path: "/error/:code",
        name: "errorView1",
        component: ErrorView
      },
      {
        path: "/appredirectview",
        name: "appRedirectView",
        beforeEnter: async (_to, from, next) => {
          const authority = await this.authGuard(this.getAppContext(_to));
          if (authority) {
            next();
          } else {
            next(false);
          }
        },
        component: AppRedirectView
      },
      {
        path: "/unauthorized/:viewcodename",
        name: "unauthorizedView",
        beforeEnter: async (_to, from, next) => {
          await this.authGuard(this.getAppContext(_to), false);
          next();
        },
        component: UnauthorizedView
      },
      {
        path: "/:appContext(".concat(paramReg, ")/:view1(").concat(viewReg, ")/:params1(").concat(paramReg, ")"),
        beforeEnter: async (_to, from, next) => {
          const authority = await this.authGuard(this.getAppContext(_to));
          if (authority) {
            next();
          } else {
            next(false);
          }
        },
        component: RouterShell,
        meta: {
          depth: 1
        },
        children: [
          {
            path: "error/:code",
            name: "errorView2",
            component: ErrorView
          },
          {
            path: "".concat(RouteConst.ROUTE_MODAL_TAG, "/:modalView(").concat(viewReg, ")/:modalParams(").concat(paramReg, ")"),
            components: {
              [RouteConst.ROUTE_MODAL_TAG]: ModalRouterShell
            }
          },
          {
            path: ":view2(".concat(viewReg, ")/:params2(").concat(paramReg, ")"),
            component: RouterShell,
            meta: {
              depth: 2
            },
            children: [
              {
                path: "error/:code",
                name: "errorView3",
                component: ErrorView
              },
              {
                path: "".concat(RouteConst.ROUTE_MODAL_TAG, "/:modalView(").concat(viewReg, ")/:modalParams(").concat(paramReg, ")"),
                components: {
                  [RouteConst.ROUTE_MODAL_TAG]: ModalRouterShell
                }
              },
              {
                path: ":view3(".concat(viewReg, ")/:params3(").concat(paramReg, ")"),
                component: RouterShell,
                meta: {
                  depth: 3
                },
                children: [
                  {
                    path: "error/:code",
                    name: "errorView4",
                    component: ErrorView
                  },
                  {
                    path: "".concat(RouteConst.ROUTE_MODAL_TAG, "/:modalView(").concat(viewReg, ")/:modalParams(").concat(paramReg, ")"),
                    components: {
                      [RouteConst.ROUTE_MODAL_TAG]: ModalRouterShell
                    }
                  },
                  {
                    path: ":view4(".concat(viewReg, ")/:params4(").concat(paramReg, ")"),
                    component: RouterShell,
                    meta: {
                      depth: 4
                    },
                    children: [
                      {
                        path: "error/:code",
                        name: "errorView5",
                        component: ErrorView
                      },
                      {
                        path: "".concat(RouteConst.ROUTE_MODAL_TAG, "/:modalView(").concat(viewReg, ")/:modalParams(").concat(paramReg, ")"),
                        components: {
                          [RouteConst.ROUTE_MODAL_TAG]: ModalRouterShell
                        }
                      },
                      {
                        path: ":view5(".concat(viewReg, ")/:params5(").concat(paramReg, ")"),
                        component: RouterShell,
                        meta: {
                          depth: 5
                        },
                        children: [
                          {
                            path: "error/:code",
                            name: "errorView6",
                            component: ErrorView
                          },
                          {
                            path: "".concat(RouteConst.ROUTE_MODAL_TAG, "/:modalView(").concat(viewReg, ")/:modalParams(").concat(paramReg, ")"),
                            components: {
                              [RouteConst.ROUTE_MODAL_TAG]: ModalRouterShell
                            }
                          },
                          {
                            path: ":view6(".concat(viewReg, ")/:params6(").concat(paramReg, ")"),
                            component: RouterShell,
                            meta: {
                              depth: 6
                            },
                            children: [
                              {
                                path: "error/:code",
                                name: "errorView7",
                                component: ErrorView
                              },
                              {
                                path: "".concat(RouteConst.ROUTE_MODAL_TAG, "/:modalView(").concat(viewReg, ")/:modalParams(").concat(paramReg, ")"),
                                components: {
                                  [RouteConst.ROUTE_MODAL_TAG]: ModalRouterShell
                                }
                              },
                              {
                                path: ":view7(".concat(viewReg, ")/:params7(").concat(paramReg, ")"),
                                component: RouterShell,
                                meta: {
                                  depth: 7
                                },
                                children: [
                                  {
                                    path: "error/:code",
                                    name: "errorView8",
                                    component: ErrorView
                                  },
                                  {
                                    path: "".concat(RouteConst.ROUTE_MODAL_TAG, "/:modalView(").concat(viewReg, ")/:modalParams(").concat(paramReg, ")"),
                                    components: {
                                      [RouteConst.ROUTE_MODAL_TAG]: ModalRouterShell
                                    }
                                  },
                                  {
                                    path: ":view8(".concat(viewReg, ")/:params8(").concat(paramReg, ")"),
                                    component: RouterShell,
                                    meta: {
                                      depth: 8
                                    }
                                  },
                                  {
                                    path: ":pathMatch(.*)*",
                                    redirect: { name: "errorView8" }
                                  }
                                ]
                              },
                              {
                                path: ":pathMatch(.*)*",
                                redirect: { name: "errorView7" }
                              }
                            ]
                          },
                          {
                            path: ":pathMatch(.*)*",
                            redirect: { name: "errorView6" }
                          }
                        ]
                      },
                      {
                        path: ":pathMatch(.*)*",
                        redirect: { name: "errorView5" }
                      }
                    ]
                  },
                  {
                    path: ":pathMatch(.*)*",
                    redirect: { name: "errorView4" }
                  }
                ]
              },
              {
                path: ":pathMatch(.*)*",
                redirect: { name: "errorView3" }
              }
            ]
          },
          {
            path: ":pathMatch(.*)*",
            redirect: { name: "errorView2" }
          }
        ]
      },
      {
        path: "/:pathMatch(.*)*",
        redirect: { name: "errorView1" }
      }
    ];
    return routes;
  }
  /**
   * 添加路由
   * @param parentDepth 父路由层级
   * @param userRoute
   * @param routes
   * @returns
   */
  static addRoute(parentDepth, userRoute, routes) {
    if (!parentDepth)
      return;
    const findAndAdd = (routeList) => {
      for (const route of routeList) {
        if (route && route.meta && route.meta.depth === parentDepth) {
          if (route.children && route.children.length > 0) {
            route.children.push(userRoute);
          } else {
            route.children = [userRoute];
          }
          return true;
        }
        if (route.children && route.children.length > 0) {
          if (findAndAdd(route.children)) {
            return true;
          }
        }
      }
      return false;
    };
    findAndAdd(routes);
  }
  /**
   * 获取路由器
   * @param userRoutes
   * @returns
   */
  static getRouter(userRoutes = []) {
    if (!this.router) {
      const routes = this.getRoutes();
      if (userRoutes && userRoutes.length > 0) {
        for (let i = 0; i < userRoutes.length; i++) {
          const route = userRoutes[i];
          const paginationathSegments = splitPathToSegments(route.path);
          const validateResult = validateRouteSegments(paginationathSegments);
          if (!validateResult) {
            ibiz.log.warn(
              "\u8DEF\u7531\u914D\u7F6E\u9519\u8BEF\uFF1A\u8DEF\u7531\u8DEF\u5F84\u6709\u8BEF\uFF0C\u8BF7\u68C0\u67E5\u8DEF\u7531\u914D\u7F6E\uFF0C\u8BE6\u60C5\u53C2\u89C1\uFF1Ahttps://open.ibizlab.cn/apphub/zh/guide/router.html"
            );
            continue;
          }
          const pathDeepth = (paginationathSegments.length - 1) / 2;
          if (pathDeepth > 1) {
            const segmentLength = paginationathSegments.length;
            route.path = "".concat(paginationathSegments[segmentLength - 2], "/").concat(paginationathSegments[segmentLength - 1]);
            this.addRoute(pathDeepth - 1, route, routes);
          } else {
            routes.push(route);
          }
        }
      }
      this.router = createRouter({
        history: createWebHashHistory(),
        routes
      });
      this.router.beforeEach((_to, _from, next) => {
        NProgress.configure({ showSpinner: false });
        NProgress.start();
        next();
      });
      this.router.afterEach(() => {
        NProgress.done();
      });
    }
    return this.router;
  }
}
__publicField(AppRouter, "router");
__publicField(AppRouter, "authGuard");

export { AppRouter };
