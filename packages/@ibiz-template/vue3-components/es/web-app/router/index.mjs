import { createRouter, createWebHashHistory } from 'vue-router';
import qs from 'qs';
import { AppRedirectView } from '@ibiz-template/vue3-util';
import { RouteConst } from '@ibiz-template/runtime';
import NProgress from '../../node_modules/.pnpm/nprogress@0.2.0/node_modules/nprogress/nprogress.mjs';
import '../../view/index.mjs';
import '../components/index.mjs';
import { ShareView } from '../../view/share-view/share-view.mjs';
import 'nprogress/nprogress.css';
import { LoginView } from '../../view/login-view/login-view.mjs';
import { ErrorView } from '../../view/error-view/error-view.mjs';
import { RouterShell } from '../components/router-shell/router-shell.mjs';
import { ModalRouterShell } from '../components/modal-router-shell/modal-router-shell.mjs';

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
      this.router = createRouter({
        // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
        history: createWebHashHistory(),
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
            component: LoginView
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
            beforeEnter: async (_to, _from, next) => {
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
            path: "/:appContext(".concat(paramReg, ")/:view1(").concat(viewReg, ")/:params1(").concat(paramReg, ")"),
            beforeEnter: async (_to, _from, next) => {
              const authority = await this.authGuard(this.getAppContext(_to));
              if (authority) {
                next();
              } else {
                next(false);
              }
            },
            component: RouterShell,
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
                                        component: RouterShell
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
