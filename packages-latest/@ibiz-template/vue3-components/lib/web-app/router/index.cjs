'use strict';

var vueRouter = require('vue-router');
var qs = require('qs');
var vue3Util = require('@ibiz-template/vue3-util');
var runtime = require('@ibiz-template/runtime');
var nprogress = require('../../node_modules/.pnpm/nprogress@0.2.0/node_modules/nprogress/nprogress.cjs');
require('../../view/index.cjs');
require('../components/index.cjs');
var shareView = require('../../view/share-view/share-view.cjs');
require('../../util/index.cjs');
require('nprogress/nprogress.css');
var loginView = require('../../view/login-view/login-view.cjs');
var errorView = require('../../view/error-view/error-view.cjs');
var unauthorizedView = require('../../view/unauthorized-view/unauthorized-view.cjs');
var modalRouterShell = require('../components/modal-router-shell/modal-router-shell.cjs');
var routerShell = require('../components/router-shell/router-shell.cjs');
var userRouteUtil = require('../../util/user-route-util/user-route-util.cjs');

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
        component: loginView.LoginView
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
        component: shareView.ShareView
      },
      {
        path: "/error/:code",
        name: "errorView1",
        component: errorView.ErrorView
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
        component: vue3Util.AppRedirectView
      },
      {
        path: "/unauthorized/:viewcodename",
        name: "unauthorizedView",
        beforeEnter: async (_to, from, next) => {
          await this.authGuard(this.getAppContext(_to), false);
          next();
        },
        component: unauthorizedView.UnauthorizedView
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
        component: routerShell.RouterShell,
        meta: {
          depth: 1
        },
        children: [
          {
            path: "error/:code",
            name: "errorView2",
            component: errorView.ErrorView
          },
          {
            path: "".concat(runtime.RouteConst.ROUTE_MODAL_TAG, "/:modalView(").concat(viewReg, ")/:modalParams(").concat(paramReg, ")"),
            components: {
              [runtime.RouteConst.ROUTE_MODAL_TAG]: modalRouterShell.ModalRouterShell
            }
          },
          {
            path: ":view2(".concat(viewReg, ")/:params2(").concat(paramReg, ")"),
            component: routerShell.RouterShell,
            meta: {
              depth: 2
            },
            children: [
              {
                path: "error/:code",
                name: "errorView3",
                component: errorView.ErrorView
              },
              {
                path: "".concat(runtime.RouteConst.ROUTE_MODAL_TAG, "/:modalView(").concat(viewReg, ")/:modalParams(").concat(paramReg, ")"),
                components: {
                  [runtime.RouteConst.ROUTE_MODAL_TAG]: modalRouterShell.ModalRouterShell
                }
              },
              {
                path: ":view3(".concat(viewReg, ")/:params3(").concat(paramReg, ")"),
                component: routerShell.RouterShell,
                meta: {
                  depth: 3
                },
                children: [
                  {
                    path: "error/:code",
                    name: "errorView4",
                    component: errorView.ErrorView
                  },
                  {
                    path: "".concat(runtime.RouteConst.ROUTE_MODAL_TAG, "/:modalView(").concat(viewReg, ")/:modalParams(").concat(paramReg, ")"),
                    components: {
                      [runtime.RouteConst.ROUTE_MODAL_TAG]: modalRouterShell.ModalRouterShell
                    }
                  },
                  {
                    path: ":view4(".concat(viewReg, ")/:params4(").concat(paramReg, ")"),
                    component: routerShell.RouterShell,
                    meta: {
                      depth: 4
                    },
                    children: [
                      {
                        path: "error/:code",
                        name: "errorView5",
                        component: errorView.ErrorView
                      },
                      {
                        path: "".concat(runtime.RouteConst.ROUTE_MODAL_TAG, "/:modalView(").concat(viewReg, ")/:modalParams(").concat(paramReg, ")"),
                        components: {
                          [runtime.RouteConst.ROUTE_MODAL_TAG]: modalRouterShell.ModalRouterShell
                        }
                      },
                      {
                        path: ":view5(".concat(viewReg, ")/:params5(").concat(paramReg, ")"),
                        component: routerShell.RouterShell,
                        meta: {
                          depth: 5
                        },
                        children: [
                          {
                            path: "error/:code",
                            name: "errorView6",
                            component: errorView.ErrorView
                          },
                          {
                            path: "".concat(runtime.RouteConst.ROUTE_MODAL_TAG, "/:modalView(").concat(viewReg, ")/:modalParams(").concat(paramReg, ")"),
                            components: {
                              [runtime.RouteConst.ROUTE_MODAL_TAG]: modalRouterShell.ModalRouterShell
                            }
                          },
                          {
                            path: ":view6(".concat(viewReg, ")/:params6(").concat(paramReg, ")"),
                            component: routerShell.RouterShell,
                            meta: {
                              depth: 6
                            },
                            children: [
                              {
                                path: "error/:code",
                                name: "errorView7",
                                component: errorView.ErrorView
                              },
                              {
                                path: "".concat(runtime.RouteConst.ROUTE_MODAL_TAG, "/:modalView(").concat(viewReg, ")/:modalParams(").concat(paramReg, ")"),
                                components: {
                                  [runtime.RouteConst.ROUTE_MODAL_TAG]: modalRouterShell.ModalRouterShell
                                }
                              },
                              {
                                path: ":view7(".concat(viewReg, ")/:params7(").concat(paramReg, ")"),
                                component: routerShell.RouterShell,
                                meta: {
                                  depth: 7
                                },
                                children: [
                                  {
                                    path: "error/:code",
                                    name: "errorView8",
                                    component: errorView.ErrorView
                                  },
                                  {
                                    path: "".concat(runtime.RouteConst.ROUTE_MODAL_TAG, "/:modalView(").concat(viewReg, ")/:modalParams(").concat(paramReg, ")"),
                                    components: {
                                      [runtime.RouteConst.ROUTE_MODAL_TAG]: modalRouterShell.ModalRouterShell
                                    }
                                  },
                                  {
                                    path: ":view8(".concat(viewReg, ")/:params8(").concat(paramReg, ")"),
                                    component: routerShell.RouterShell,
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
          const paginationathSegments = userRouteUtil.splitPathToSegments(route.path);
          const validateResult = userRouteUtil.validateRouteSegments(paginationathSegments);
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
      this.router = vueRouter.createRouter({
        history: vueRouter.createWebHashHistory(),
        routes
      });
      this.router.beforeEach((_to, _from, next) => {
        nprogress.default.configure({ showSpinner: false });
        nprogress.default.start();
        next();
      });
      this.router.afterEach(() => {
        nprogress.default.done();
      });
    }
    return this.router;
  }
}
__publicField(AppRouter, "router");
__publicField(AppRouter, "authGuard");

exports.AppRouter = AppRouter;
