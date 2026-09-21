'use strict';

var vueRouter = require('vue-router');
var qs = require('qs');
var vue3Util = require('@ibiz-template/vue3-util');
var runtime = require('@ibiz-template/runtime');
var nprogress = require('../../node_modules/.pnpm/nprogress@0.2.0/node_modules/nprogress/nprogress.cjs');
require('../../view/index.cjs');
require('../components/index.cjs');
var shareView = require('../../view/share-view/share-view.cjs');
require('nprogress/nprogress.css');
var loginView = require('../../view/login-view/login-view.cjs');
var errorView = require('../../view/error-view/error-view.cjs');
var routerShell = require('../components/router-shell/router-shell.cjs');
var modalRouterShell = require('../components/modal-router-shell/modal-router-shell.cjs');

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
  static getRouter() {
    const placeholder = ibiz.env.routePlaceholder;
    const paramReg = "[^/]+=[^/]+|".concat(placeholder);
    const viewReg = "[^=/]+";
    if (!this.router) {
      this.router = vueRouter.createRouter({
        // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
        history: vueRouter.createWebHashHistory(),
        routes: [
          {
            path: "/",
            redirect: "/".concat(placeholder, "/index/").concat(placeholder)
          },
          {
            path: "/login",
            name: "loginView",
            beforeEnter: async (_to, _from, next) => {
              await this.authGuard(this.getAppContext(_to), false);
              next();
            },
            component: loginView.LoginView
          },
          {
            path: "/share",
            name: "shareView",
            beforeEnter: async (_to, _from, next) => {
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
            beforeEnter: async (_to, _from, next) => {
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
            path: "/:appContext(".concat(paramReg, ")/:view1(").concat(viewReg, ")/:params1(").concat(paramReg, ")"),
            beforeEnter: async (_to, _from, next) => {
              const authority = await this.authGuard(this.getAppContext(_to));
              if (authority) {
                next();
              } else {
                next(false);
              }
            },
            component: routerShell.RouterShell,
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
                                        component: routerShell.RouterShell
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
        ]
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
