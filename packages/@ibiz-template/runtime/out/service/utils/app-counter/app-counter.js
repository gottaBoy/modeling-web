import { IBizContext, RuntimeError } from '@ibiz-template/core';
import { notNilEmpty, QXEvent } from 'qx-util';
import { clone } from 'ramda';
import { calcDeCodeNameById } from '../../../model';
/**
 * 应用计数器基类
 *
 * @author chitanda
 * @date 2022-10-26 18:10:51
 * @export
 * @class AppCounter
 */
export class AppCounter {
    /**
     * 计数器是否已经销毁
     *
     * @author chitanda
     * @date 2022-10-26 20:10:55
     * @protected
     * @type {boolean}
     */
    get isDestroyed() {
        return this.destroyed;
    }
    /**
     * Creates an instance of AppCounter.
     *
     * @author chitanda
     * @date 2022-10-26 20:10:55
     * @param {IAppCounter} model 应用计数器模型
     */
    constructor(model) {
        this.model = model;
        this.destroyed = false;
        this.context = IBizContext.create();
        this.params = {};
        this.evt = new QXEvent();
        /**
         * 计数器数据
         *
         * @author chitanda
         * @date 2022-10-26 19:10:08
         * @protected
         * @type {IData}
         */
        this.data = {};
        this.countChange = this.countChange.bind(this);
    }
    /**
     * 计数器初始化
     *
     * @author chitanda
     * @date 2022-10-26 19:10:24
     * @param {IContext} [context]
     * @param {IParams} [params]
     */
    async init(context, params) {
        this.setParams(context, params);
        this.interval();
        await this.load();
        if (this.model.appDataEntityId) {
            ibiz.mc.command.change.on(this.countChange);
        }
    }
    /**
     * 接受计数器实体数据变更，刷新计数器
     *
     * @author chitanda
     * @date 2024-03-07 14:03:00
     * @protected
     * @param {IPortalMessage} msg
     */
    countChange(msg) {
        const data = msg.data;
        if (this.model.appDataEntityId) {
            const codeName = calcDeCodeNameById(this.model.appDataEntityId);
            if (data &&
                data.srfdecodename &&
                data.srfdecodename.toLowerCase() === codeName) {
                this.refresh();
            }
        }
    }
    /**
     * 设置上下文以及查询参数
     *
     * @author chitanda
     * @date 2022-10-26 19:10:58
     * @protected
     * @param {IContext} [context]
     * @param {IParams} [params]
     */
    setParams(context, params) {
        if (context) {
            this.context = clone(context);
        }
        if (params) {
            this.params = clone(params);
        }
    }
    /**
     * 计数器定时刷新
     *
     * @author chitanda
     * @date 2022-10-26 18:10:13
     * @protected
     */
    interval() {
        this.destroyInterval();
        if (this.model.timer) {
            this.intervalTimer = setInterval(() => {
                // 当无人订阅计数器时，跳过刷新
                if (this.evt.getSize('change') > 0) {
                    this.load();
                }
            }, this.model.timer);
        }
    }
    /**
     * 销毁定时器自动刷新
     *
     * @author chitanda
     * @date 2022-10-26 18:10:31
     * @protected
     */
    destroyInterval() {
        if (this.intervalTimer) {
            clearInterval(this.intervalTimer);
            this.intervalTimer = null;
        }
    }
    /**
     * 加载计数器
     *
     * @author chitanda
     * @date 2022-10-26 19:10:38
     * @protected
     * @return {*}  {Promise<IData>}
     */
    async load() {
        throw new RuntimeError(ibiz.i18n.t('runtime.service.noImplementedCounter'));
    }
    /**
     * 计数器刷新
     *
     * @author chitanda
     * @date 2022-10-26 19:10:46
     * @param {IContext} [context]
     * @param {IParams} [params]
     * @return {*}  {Promise<IData>}
     */
    refresh(context, params) {
        this.setParams(context, params);
        return this.load();
    }
    /**
     * 计数器数据变更事件监听
     *
     * @author chitanda
     * @date 2022-10-26 20:10:13
     * @param {(data: IData) => void} fn
     * @param {boolean} [immediate=true] 当有计时器数据时，立即触发一次回调
     */
    onChange(fn, immediate = true) {
        this.evt.on('change', fn);
        if (immediate && notNilEmpty(this.data)) {
            fn(this.data);
        }
    }
    /**
     * 取消计数器数据变更监听
     *
     * @author chitanda
     * @date 2022-10-26 20:10:13
     * @param {(data: IData) => void} fn
     */
    offChange(fn) {
        this.evt.off('change', fn);
    }
    /**
     * 根据计数器标识，获取计数器数值
     *
     * @author chitanda
     * @date 2022-10-26 20:10:08
     * @param {string} tag
     * @return {*}  {number}
     */
    getCounter(tag) {
        return this.data[tag.toLowerCase()] || 0;
    }
    /**
     * 销毁计数器
     *
     * @author chitanda
     * @date 2022-10-26 18:10:31
     */
    destroy() {
        this.destroyed = true;
        this.context.destroy();
        this.destroyInterval();
        this.evt.reset();
        ibiz.mc.command.change.off(this.countChange);
    }
}
