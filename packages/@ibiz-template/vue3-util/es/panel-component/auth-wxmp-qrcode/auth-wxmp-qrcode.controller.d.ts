import { RouteLocationNormalizedLoaded } from 'vue-router';
import { IPanelRawItem } from '@ibiz/model-core';
import { PanelItemController } from '@ibiz-template/runtime';
import { AuthWxmpQrcodeState } from './auth-wxmp-qrcode.state';
/**
 * 微信公众号扫码登录控制器
 *
 * @export
 * @class AuthWxmpQrcodeController
 * @extends {PanelItemController<IPanelRawItem>}
 */
export declare class AuthWxmpQrcodeController extends PanelItemController<IPanelRawItem> {
    /**
     * 微信公众号扫码登录UI状态对象
     *
     * @type {AuthWxmpQrcodeState}
     * @memberof AuthWxmpQrcodeController
     */
    state: AuthWxmpQrcodeState;
    /**
     * 过期定时器
     *
     * @private
     * @type {(NodeJS.Timeout | undefined)}
     * @memberof AuthWxmpQrcodeController
     */
    private expirationTimer;
    /**
     * 轮询定时器
     *
     * @private
     * @type {(NodeJS.Timeout | undefined)}
     * @memberof AuthWxmpQrcodeController
     */
    private pollingTimer;
    /**
     * 轮询时间（秒）
     * - 默认2秒
     * @private
     * @type {number}
     * @memberof AuthWxmpQrcodeController
     */
    private pollingTime;
    /**
     * 自定义补充参数
     *
     * @type {IData}
     * @memberof AuthWxmpQrcodeController
     */
    rawItemParams: IData;
    /**
     * Route 对象
     *
     * @type {RouteLocationNormalizedLoaded}
     * @memberof AuthWxmpQrcodeController
     */
    route: RouteLocationNormalizedLoaded;
    /**
     * 创建状态对象
     *
     * @protected
     * @return {*}  {AuthWxmpQrcodeState}
     * @memberof AuthWxmpQrcodeController
     */
    protected createState(): AuthWxmpQrcodeState;
    /**
     * 初始化
     *
     * @protected
     * @return {*}  {Promise<void>}
     * @memberof AuthWxmpQrcodeController
     */
    protected onInit(): Promise<void>;
    /**
     * 设置 Route 对象
     *
     * @param {RouteLocationNormalizedLoaded} route
     * @memberof AuthWxmpQrcodeController
     */
    setRouter(route: RouteLocationNormalizedLoaded): void;
    /**
     * 处理自定义补充参数
     *
     * @protected
     * @memberof AuthWxmpQrcodeController
     */
    protected handleRawItemParams(): void;
    /**
     * 初始化参数
     *
     * @protected
     * @memberof AuthWxmpQrcodeController
     */
    protected initParams(): void;
    /**
     * 加载二维码
     *
     * @protected
     * @return {*}  {Promise<void>}
     * @memberof AuthWxmpQrcodeController
     */
    loadQrcode(): Promise<void>;
    /**
     * 设置定时器
     *
     * @protected
     * @memberof AuthWxmpQrcodeController
     */
    protected setTimer(): void;
    /**
     * 轮询登录
     *
     * @protected
     * @return {*}  {Promise<void>}
     * @memberof AuthWxmpQrcodeController
     */
    protected pollingLogin(): Promise<void>;
    /**
     * 销毁方法
     *
     * @return {*}  {Promise<void>}
     * @memberof AuthWxmpQrcodeController
     */
    destroy(): Promise<void>;
}
//# sourceMappingURL=auth-wxmp-qrcode.controller.d.ts.map