import { IMDControlController, IRecordNavUtil } from '../../interface';
/**
 *
 * 记录导航工具类
 *
 * @author tony001
 * @date 2024-07-15 13:07:12
 * @export
 * @class RecordNavUtil
 * @implements {IRecordNavUtil}
 */
export declare class RecordNavUtil implements IRecordNavUtil {
    /**
     * 部件Map
     *
     * @author tony001
     * @date 2024-07-15 13:07:58
     * @private
     * @type {Map<string, IMDControlController>}
     */
    private controlMap;
    /**
     * 触发源Map
     *
     * @author tony001
     * @date 2024-09-27 14:09:19
     * @private
     * @type {Map<string, IData>}
     */
    private triggerLogicMap;
    /**
     * 添加部件数据
     *
     * @author tony001
     * @date 2024-07-15 13:07:10
     * @param {string} id
     * @param {IMDControlController} ctrl
     */
    add(id: string, ctrl: IMDControlController): void;
    /**
     * 添加触发源
     *
     * @author tony001
     * @date 2024-09-27 15:09:31
     * @param {string} viewId
     * @param {IData} data
     * @param {IData} tempContext
     */
    addTriggerLogic(viewId: string, data: IData, tempContext: IData): void;
    /**
     * 删除部件数据
     *
     * @author tony001
     * @date 2024-07-15 13:07:23
     * @param {string} id
     */
    remove(id: string): void;
    /**
     * 通过视图标识删除触发源
     *
     * @author tony001
     * @date 2024-09-27 15:09:16
     * @param {string} viewId
     */
    removeTriggerLogic(viewId: string): void;
    /**
     * 获取部件数据
     *
     * @author tony001
     * @date 2024-07-15 14:07:32
     * @param {string} id
     * @return {*}  {(IMDControlController | undefined)}
     */
    getCtrl(id: string): IMDControlController | undefined;
    /**
     * 获取触发源数据
     *
     * @author tony001
     * @date 2024-09-27 14:09:22
     * @param {string} id
     * @return {*}  {(IData | undefined)}
     */
    getTriggerLogic(id: string): IData | undefined;
    /**
     * 获取第一条记录
     *
     * @author tony001
     * @date 2024-07-15 15:07:26
     * @param {string} ctrlId
     * @param {string} dataId
     * @return {*}  {Promise<IData | undefined>}
     */
    getFirstRecord(ctrlId: string, dataId: string): Promise<IData | undefined>;
    /**
     * 获取上一条记录
     *
     * @author tony001
     * @date 2024-07-15 15:07:01
     * @param {string} ctrlId
     * @param {string} dataId
     * @return {*}  {Promise<IData | undefined>}
     */
    getPreviousRecord(ctrlId: string, dataId: string): Promise<IData | undefined>;
    /**
     * 获取下一条记录
     *
     * @author tony001
     * @date 2024-07-15 15:07:17
     * @param {string} ctrlId
     * @param {string} dataId
     * @return {*}  {Promise<IData | undefined>}
     */
    getNextRecord(ctrlId: string, dataId: string): Promise<IData | undefined>;
    /**
     * 获取最后一条记录
     *
     * @author tony001
     * @date 2024-07-15 15:07:31
     * @param {string} ctrlId
     * @param {string} dataId
     * @return {*}  {Promise<IData | undefined>}
     */
    getLastRecord(ctrlId: string, dataId: string): Promise<IData | undefined>;
}
//# sourceMappingURL=record-nav-util.d.ts.map