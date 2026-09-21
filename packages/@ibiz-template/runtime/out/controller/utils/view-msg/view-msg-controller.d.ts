import { IAppDataEntity, IAppDEDataSetViewMsg, IAppViewMsg, IAppViewMsgGroup, IAppViewMsgGroupDetail } from '@ibiz/model-core';
import { IViewMessage } from '../../../interface';
/** 视图消息前缀 */
export declare const VIEW_MSG_PREFIX = "VIEW_MSG";
export declare class ViewMsgController {
    protected msgGroupId: string;
    /**
     * 视图消息组模型
     * @author lxm
     * @date 2023-09-22 05:37:24
     * @type {IAppViewMsgGroup}
     */
    msgGroup: IAppViewMsgGroup;
    /**
     * 视图消息map
     * @author lxm
     * @date 2023-09-22 05:38:03
     */
    viewMsgMap: Map<string, IAppViewMsg>;
    /**
     * 视图消息tag
     *
     * @author zhanghengfeng
     * @date 2024-04-23 19:04:58
     */
    protected tag: string;
    constructor(msgGroupId: string, tag?: string);
    /**
     * 初始化方法，从全局获取视图消息组和视图消息的模型
     * @author lxm
     * @date 2023-09-22 05:41:08
     * @param {IContext} context
     * @return {*}  {Promise<void>}
     */
    init(context: IContext): Promise<void>;
    /**
     * 通过属性id获取属性的name属性
     *
     * @author tony001
     * @date 2024-05-08 15:05:03
     * @param {IAppDataEntity} appDataEntity
     * @param {string} [fieldId]
     * @return {*}  {(string | undefined)}
     */
    getDeFieldName(appDataEntity: IAppDataEntity, fieldId?: string): string | undefined;
    /**
     * 查询并获取指定实体的数据集数据
     * @author lxm
     * @date 2023-09-20 08:10:57
     * @static
     * @param {IPSAppDEDataSetViewMsg} msgModel
     * @param {IParams} [context={}]
     * @param {IParams} [params={}]
     * @return {*}  {Promise<IData[]>}
     */
    static fetchDataSet(msgModel: IAppDEDataSetViewMsg, context: IContext, params: IParams): Promise<IData[]>;
    /**
     * 获取视图消息删除模式存储
     *
     * @author zhanghengfeng
     * @date 2024-05-09 16:05:59
     * @param {IViewMessage} item
     * @return {*}  {(string | null)}
     */
    getMsgRemoveModeStorage(item: IViewMessage): string | null;
    /**
     * 设置视图消息删除模式存储
     *
     * @author zhanghengfeng
     * @date 2024-05-09 16:05:21
     * @param {IViewMessage} item
     * @return {*}  {void}
     */
    setMsgRemoveModeStorage(item: IViewMessage): void;
    /**
     * 计算视图消息是否显示
     *
     * @author zhanghengfeng
     * @date 2024-05-09 16:05:34
     * @param {IAppViewMsg} model
     * @param {IData} data
     * @param {IContext} context
     * @param {IParams} params
     * @return {*}  {Promise<boolean>}
     */
    calcViewMsgVisible(model: IAppViewMsg, data: IData, context: IContext, params: IParams): Promise<boolean>;
    /**
     * 计算视图信息呈现数据
     * @author lxm
     * @date 2023-09-20 09:16:59
     * @param {IContext} context
     * @param {IParams} params
     * @return {*}  {IViewMessage[]}
     */
    calcViewMessages(context: IContext, params: IParams): Promise<IViewMessage[]>;
    /**
     * 计算静态消息数据(或者动态的里面静态的配置)
     * @author lxm
     * @date 2023-09-20 09:46:45
     * @protected
     * @param {IPSAppViewMsgGroupDetail} detail
     * @return {*}  {IViewMessage}
     */
    protected calcStaticMsg(detail: IAppViewMsgGroupDetail): IViewMessage;
    /**
     * 计算动态视图消息数据
     * @author lxm
     * @date 2023-09-20 09:46:26
     * @protected
     * @param {IPSAppViewMsgGroupDetail} detail
     * @param {IContext} context
     * @param {IParams} params
     * @return {*}  {Promise<IViewMessage[]>}
     */
    protected calcDynaMsgs(detail: IAppViewMsgGroupDetail, context: IContext, params: IParams): Promise<IViewMessage[]>;
}
//# sourceMappingURL=view-msg-controller.d.ts.map