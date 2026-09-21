import { Ref } from 'vue';
import { IMDControlEvent, INavViewMsg, MDControlController } from '@ibiz-template/runtime';
import { IMDControl, INavigatable } from '@ibiz/model-core';
/**
 * 导航适配器
 *
 * @export
 * @class NavgationBaseProvider
 */
export declare class NavgationBaseProvider {
    protected controller: MDControlController;
    /**
     * 导航栈数据
     *
     * @type {string[]}
     * @memberof NavgationBaseProvider
     */
    navStack: string[];
    /**
     * 主键名称
     *
     * @memberof NavgationBaseProvider
     */
    keyName: string;
    /**
     * 模型
     *
     * @type {IMDControl}
     * @memberof NavgationBaseProvider
     */
    model: IMDControl;
    /**
     * 导航视图信息
     *
     * @type {(Ref<INavViewMsg | undefined>)}
     * @memberof NavgationBaseProvider
     */
    navViewMsg: Ref<INavViewMsg | undefined>;
    /**
     * Creates an instance of NavgationBaseProvider.
     * @param {MDControlController} controller
     * @memberof NavgationBaseProvider
     */
    constructor(controller: MDControlController);
    /**
     * 解析参数
     *
     * @param {(INavigatable & { appDataEntityId?: string })} XDataModel
     * @param {IData} data
     * @param {IContext} context
     * @param {IParams} params
     * @return {*}  {{ context: IContext; params: IParams }}
     * @memberof NavgationBaseProvider
     */
    prepareParams(XDataModel: INavigatable & {
        appDataEntityId?: string;
    }, data: IData, context: IContext, params: IParams): {
        context: IContext;
        params: IParams;
    };
    /**
     * 通过栈数据导航
     *
     * @memberof NavgationBaseProvider
     */
    onNavDataByStack(): void;
    /**
     * 导航数据变化
     *
     * @param {IMDControlEvent['onNavDataChange']['event']} event
     * @memberof NavgationBaseProvider
     */
    onNavDataChange(event: IMDControlEvent['onNavDataChange']['event']): void;
    /**
     * 获取导航视图信息
     *
     * @param {IData} data
     * @param {IContext} context
     * @param {IParams} params
     * @return {*}  {INavViewMsg}
     * @memberof NavgationBaseProvider
     */
    getNavViewMsg(data: IData, context: IContext, params: IParams): INavViewMsg;
}
