import { setAppCookie, CoreConst, clearAppCookie } from '@ibiz-template/core';
import { notNilEmpty } from 'qx-util';
import { PanelItemController } from '@ibiz-template/runtime';
import { AuthWxmpQrcodeState } from './auth-wxmp-qrcode.state.mjs';

"use strict";
class AuthWxmpQrcodeController extends PanelItemController {
  constructor() {
    super(...arguments);
    /**
     * 轮询时间（秒）
     * - 默认2秒
     * @private
     * @type {number}
     * @memberof AuthWxmpQrcodeController
     */
    this.pollingTime = 2;
    /**
     * 自定义补充参数
     *
     * @type {IData}
     * @memberof AuthWxmpQrcodeController
     */
    this.rawItemParams = {};
  }
  /**
   * 创建状态对象
   *
   * @protected
   * @return {*}  {AuthWxmpQrcodeState}
   * @memberof AuthWxmpQrcodeController
   */
  createState() {
    var _a;
    return new AuthWxmpQrcodeState((_a = this.parent) == null ? void 0 : _a.state);
  }
  /**
   * 初始化
   *
   * @protected
   * @return {*}  {Promise<void>}
   * @memberof AuthWxmpQrcodeController
   */
  async onInit() {
    await super.onInit();
    this.handleRawItemParams();
    this.initParams();
  }
  /**
   * 设置 Route 对象
   *
   * @param {RouteLocationNormalizedLoaded} route
   * @memberof AuthWxmpQrcodeController
   */
  setRouter(route) {
    this.route = route;
  }
  /**
   * 处理自定义补充参数
   *
   * @protected
   * @memberof AuthWxmpQrcodeController
   */
  handleRawItemParams() {
    var _a;
    let params = {};
    const rawItemParams = (_a = this.model.rawItem) == null ? void 0 : _a.rawItemParams;
    if (notNilEmpty(rawItemParams)) {
      params = rawItemParams.reduce((param, item) => {
        param[item.key.toLowerCase()] = item.value;
        return param;
      }, {});
    }
    Object.assign(this.rawItemParams, params);
  }
  /**
   * 初始化参数
   *
   * @protected
   * @memberof AuthWxmpQrcodeController
   */
  initParams() {
    const isNumeric = (str) => {
      return !!str && isFinite(Number(str));
    };
    this.pollingTime = isNumeric(this.rawItemParams.pollingtime) ? Number(this.rawItemParams.pollingtime) : 2;
    this.state.tips = this.model.caption || ibiz.i18n.t("vue3Util.panelComponent.wxQrcodeCaption");
  }
  /**
   * 加载二维码
   *
   * @protected
   * @return {*}  {Promise<void>}
   * @memberof AuthWxmpQrcodeController
   */
  async loadQrcode() {
    try {
      const res = await ibiz.net.get(
        "/uaa/open/wxmp/createqrcode",
        {},
        { srfdcsystem: ibiz.env.dcSystem }
      );
      if (res.ok && res.data) {
        this.state.qrcode = res.data;
        this.setTimer();
      }
    } catch (error) {
      ibiz.log.error(error.message);
    }
  }
  /**
   * 设置定时器
   *
   * @protected
   * @memberof AuthWxmpQrcodeController
   */
  setTimer() {
    this.expirationTimer = setInterval(() => {
      if (this.state.qrcode && this.state.qrcode.expirein > 0) {
        this.state.qrcode.expirein -= 1;
      } else {
        clearInterval(this.expirationTimer);
      }
    }, 1e3);
    this.pollingTimer = setInterval(async () => {
      await this.pollingLogin();
    }, this.pollingTime * 1e3);
  }
  /**
   * 轮询登录
   *
   * @protected
   * @return {*}  {Promise<void>}
   * @memberof AuthWxmpQrcodeController
   */
  async pollingLogin() {
    try {
      if (this.state.qrcode && this.state.qrcode.expirein > 0) {
        if (this.state.visible) {
          const res = await ibiz.net.get(
            "/uaa/open/wxmp/qrcode/".concat(this.state.qrcode.ticket),
            {},
            { srfdcsystem: ibiz.env.dcSystem }
          );
          const { data, ok } = res;
          if (ok && (data == null ? void 0 : data.token)) {
            clearInterval(this.pollingTimer);
            const cacheDay = 30;
            setAppCookie(CoreConst.TOKEN_REMEMBER, "1", cacheDay);
            setAppCookie(CoreConst.TOKEN, data.token, cacheDay);
            const expiredDate = (/* @__PURE__ */ new Date()).getTime() + (data.expirein || 7199) * 1e3;
            setAppCookie(CoreConst.TOKEN_EXPIRES, "".concat(expiredDate), cacheDay);
            if (data.refresh_token) {
              setAppCookie(
                CoreConst.REFRESH_TOKEN,
                data.refresh_token,
                cacheDay
              );
            }
            clearAppCookie(CoreConst.IS_ANONYMOUS);
            const ru = this.route.query.ru || "/";
            window.location.hash = ru || "/";
            window.history.pushState({}, "");
            window.location.reload();
          }
        }
      } else {
        clearInterval(this.pollingTimer);
      }
    } catch (error) {
      ibiz.log.error(error.message);
    }
  }
  /**
   * 销毁方法
   *
   * @return {*}  {Promise<void>}
   * @memberof AuthWxmpQrcodeController
   */
  async destroy() {
    await super.destroy();
    if (this.pollingTimer) {
      clearInterval(this.pollingTimer);
      this.pollingTimer = void 0;
    }
    if (this.expirationTimer) {
      clearInterval(this.expirationTimer);
      this.expirationTimer = void 0;
    }
  }
}

export { AuthWxmpQrcodeController };
