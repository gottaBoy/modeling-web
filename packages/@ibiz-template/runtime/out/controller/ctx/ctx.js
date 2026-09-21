/* eslint-disable @typescript-eslint/no-explicit-any */
import { QXEvent } from 'qx-util';
import { CTXState } from './ctx.state';
/**
 * 上下文环境对象
 * @author lxm
 * @date 2023-03-27 01:43:36
 * @export
 * @class CTX
 */
export class CTX {
    /**
     * Creates an instance of CTX.
     * @author lxm
     * @date 2023-07-06 09:43:47
     * @param {CTX} [parent] 父级上下文环境对象
     */
    constructor(parent) {
        this.parent = parent;
        /**
         * 是否已经销毁
         *
         * @author chitanda
         * @date 2023-09-11 11:09:57
         * @public
         */
        this.isDestroyed = false;
        /**
         * CTX事件
         * @author lxm
         * @date 2023-04-26 07:54:46
         * @protected
         */
        this.evt = new QXEvent(3000);
        /**
         * 当前视图控制器集合（包含自身视图控制器，部件控制器，和下一层级的视图的控制器）
         * @author lxm
         * @date 2023-03-28 02:25:59
         * @protected
         */
        this.controllersMap = new Map();
        this.state = new CTXState();
    }
    /**
     * 初始化上下文环境对象
     * @author lxm
     * @date 2023-03-27 01:54:18
     * @param {V} controller 当前视图的控制器
     * @return {*}  {Promise<void>}
     */
    async init(controller) {
        // 注册自己
        this.view = controller;
        this.registerController(controller.model.name, controller);
    }
    /**
     * 销毁ctx
     * @author lxm
     * @date 2023-03-28 02:29:45
     */
    destroy() {
        this.controllersMap.clear();
        this.view = null;
        this.state = null;
        this.isDestroyed = true;
    }
    /**
     * 修改上下文环境状态
     * @author lxm
     * @date 2023-03-27 01:50:38
     * @param {Required<CTXState>} nextState
     * @return {*}  {Promise<void>}
     */
    async setState(nextState) {
        Object.assign(this.state, nextState);
    }
    /**
     * 开启视图加载
     * @author lxm
     * @date 2023-03-27 01:59:22
     */
    startLoading() {
        if (this.isDestroyed) {
            return;
        }
        this.view.startLoading();
    }
    /**
     * 关闭视图加载
     * @author lxm
     * @date 2023-03-27 01:59:35
     */
    endLoading() {
        if (this.isDestroyed) {
            return;
        }
        this.view.endLoading();
    }
    /**
     * 注册控制器到上下文里
     * @author lxm
     * @date 2023-03-28 02:26:46
     * @param {string} name
     * @param {IController} c
     */
    registerController(name, c) {
        this.controllersMap.set(name, c);
        this.evt.emit('onRegister', name, c);
    }
    /**
     * 获取指定名称的控制器
     * @author lxm
     * @date 2023-04-25 10:14:42
     * @param {string} name
     * @param {boolean} [traceRoot=false] 是否跨越视图作用域，一路向根上找。
     * @return {*}  {(IController | undefined)}
     */
    getController(name, traceRoot = false) {
        if (this.controllersMap.has(name)) {
            return this.controllersMap.get(name);
        }
        if (this.parent && traceRoot) {
            return this.parent.getController(name);
        }
    }
    /**
     * 获取顶级视图，
     * - 模态等打开方式是根ctx的视图
     * - 路由模式是首页下一级的视图，即第二级路由的视图
     * @author lxm
     * @date 2023-07-14 11:59:30
     * @return {*}  {IViewController}
     */
    getTopView() {
        if (!this.parent) {
            return this.view;
        }
        if (this.view.modal.routeDepth === 2) {
            return this.view;
        }
        return this.parent.getTopView();
    }
}
