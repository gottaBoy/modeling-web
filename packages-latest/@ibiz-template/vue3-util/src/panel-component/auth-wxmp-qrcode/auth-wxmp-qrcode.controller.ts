/* eslint-disable no-restricted-globals */
/* eslint-disable no-param-reassign */
import { RouteLocationNormalizedLoaded } from 'vue-router';
import { IPanelRawItem, ITextItem } from '@ibiz/model-core';
import { clearAppCookie, CoreConst, setAppCookie } from '@ibiz-template/core';
import { notNilEmpty } from 'qx-util';
import { PanelItemController } from '@ibiz-template/runtime';
import { AuthWxmpQrcodeState, IQrcode } from './auth-wxmp-qrcode.state';

/**
 * 微信公众号扫码登录控制器
 *
 * @export
 * @class AuthWxmpQrcodeController
 * @extends {PanelItemController<IPanelRawItem>}
 */
export class AuthWxmpQrcodeController extends PanelItemController<IPanelRawItem> {
  /**
   * @description 微信公众号扫码登录UI状态对象
   * @exposedoc
   * @type {AuthWxmpQrcodeState}
   * @memberof AuthWxmpQrcodeController
   */
  declare state: AuthWxmpQrcodeState;

  /**
   * 过期定时器
   *
   * @private
   * @type {(NodeJS.Timeout | undefined)}
   * @memberof AuthWxmpQrcodeController
   */
  private expirationTimer: NodeJS.Timeout | undefined;

  /**
   * 轮询定时器
   *
   * @private
   * @type {(NodeJS.Timeout | undefined)}
   * @memberof AuthWxmpQrcodeController
   */
  private pollingTimer: NodeJS.Timeout | undefined;

  /**
   * 轮询时间（秒）
   * - 默认2秒
   * @private
   * @type {number}
   * @memberof AuthWxmpQrcodeController
   */
  private pollingTime: number = 2;

  /**
   * @description 自定义补充参数
   * @exposedoc
   * @type {IData}
   * @memberof AuthWxmpQrcodeController
   */
  rawItemParams: IData = {};

  /**
   * @description Route 对象
   * @type {RouteLocationNormalizedLoaded}
   * @memberof AuthWxmpQrcodeController
   */
  route!: RouteLocationNormalizedLoaded;

  /**
   * 创建状态对象
   *
   * @protected
   * @return {*}  {AuthWxmpQrcodeState}
   * @memberof AuthWxmpQrcodeController
   */
  protected createState(): AuthWxmpQrcodeState {
    return new AuthWxmpQrcodeState(this.parent?.state);
  }

  /**
   * 初始化
   *
   * @protected
   * @return {*}  {Promise<void>}
   * @memberof AuthWxmpQrcodeController
   */
  protected async onInit(): Promise<void> {
    await super.onInit();
    this.handleRawItemParams();
    this.initParams();
  }

  /**
   * @description 设置 Route 对象
   * @param {RouteLocationNormalizedLoaded} route
   * @memberof AuthWxmpQrcodeController
   */
  setRouter(route: RouteLocationNormalizedLoaded): void {
    this.route = route;
  }

  /**
   * 处理自定义补充参数
   *
   * @protected
   * @memberof AuthWxmpQrcodeController
   */
  protected handleRawItemParams(): void {
    let params = {};
    const rawItemParams = this.model.rawItem?.rawItemParams;
    if (notNilEmpty(rawItemParams)) {
      params = rawItemParams!.reduce((param: IData, item) => {
        param[item.key!.toLowerCase()] = item.value;
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
  protected initParams(): void {
    const isNumeric = (str: string): boolean => {
      return !!str && isFinite(Number(str));
    };
    this.pollingTime = isNumeric(this.rawItemParams.pollingtime)
      ? Number(this.rawItemParams.pollingtime)
      : 2;
    const caption =
      (this.model.rawItem as ITextItem)?.caption || this.model.caption;
    this.state.tips = caption
      ? ibiz.appUtil.resolveI18nText(caption)
      : ibiz.i18n.t('vue3Util.panelComponent.wxQrcodeCaption');
  }

  /**
   * 加载二维码
   *
   * @protected
   * @return {*}  {Promise<void>}
   * @memberof AuthWxmpQrcodeController
   */
  async loadQrcode(): Promise<void> {
    try {
      const res = await ibiz.net.get(
        '/uaa/open/wxmp/createqrcode',
        {},
        { srfdcsystem: ibiz.env.dcSystem },
      );
      if (res.ok && res.data) {
        this.state.qrcode = res.data as IQrcode;
        this.setTimer();
      }
    } catch (error) {
      ibiz.log.error((error as IData).message);
    }
  }

  /**
   * 设置定时器
   *
   * @protected
   * @memberof AuthWxmpQrcodeController
   */
  protected setTimer(): void {
    // 过期定时器
    this.expirationTimer = setInterval(() => {
      if (this.state.qrcode && this.state.qrcode.expirein > 0) {
        this.state.qrcode.expirein -= 1;
      } else {
        clearInterval(this.expirationTimer);
      }
    }, 1000);
    // 轮询定时器
    this.pollingTimer = setInterval(async () => {
      await this.pollingLogin();
    }, this.pollingTime * 1000);
  }

  /**
   * 轮询登录
   *
   * @protected
   * @return {*}  {Promise<void>}
   * @memberof AuthWxmpQrcodeController
   */
  protected async pollingLogin(): Promise<void> {
    try {
      if (this.state.qrcode && this.state.qrcode.expirein > 0) {
        // 显示状态才发轮询登录
        if (this.state.visible) {
          const res = await ibiz.net.get(
            `/uaa/open/wxmp/qrcode/${this.state.qrcode.ticket}`,
            {},
            { srfdcsystem: ibiz.env.dcSystem },
          );
          const { data, ok } = res;
          if (ok && data?.token) {
            clearInterval(this.pollingTimer);
            const cacheDay = 30;
            setAppCookie(CoreConst.TOKEN_REMEMBER, '1', cacheDay);
            setAppCookie(CoreConst.TOKEN, data.token, cacheDay);
            const expiredDate =
              new Date().getTime() + (data.expirein || 7199) * 1000;
            setAppCookie(CoreConst.TOKEN_EXPIRES, `${expiredDate}`, cacheDay);
            if (data.refresh_token) {
              setAppCookie(
                CoreConst.REFRESH_TOKEN,
                data.refresh_token,
                cacheDay,
              );
            }
            clearAppCookie(CoreConst.IS_ANONYMOUS);
            const ru = (this.route.query.ru as string) || '/';
            window.location.hash = ru || '/';
            // 重置会话记录state,防止直接返回到登录页
            window.history.pushState({}, '');
            window.location.reload();
          }
        }
      } else {
        clearInterval(this.pollingTimer);
      }
    } catch (error) {
      ibiz.log.error((error as IData).message);
    }
  }

  /**
   * @description 销毁方法
   * @return {*}  {Promise<void>}
   * @memberof AuthWxmpQrcodeController
   */
  async destroy(): Promise<void> {
    await super.destroy();
    if (this.pollingTimer) {
      clearInterval(this.pollingTimer);
      this.pollingTimer = undefined;
    }
    if (this.expirationTimer) {
      clearInterval(this.expirationTimer);
      this.expirationTimer = undefined;
    }
  }
}
