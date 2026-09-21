import { HistoryItem } from './history-item';
/**
 * 数据对象历史记录，只支持纯对象形式的数据。并未支持数组
 *
 * @author chitanda
 * @date 2023-12-28 17:12:05
 * @export
 * @class HistoryList
 */
export declare class HistoryList<E = IData> {
    /**
     * 当前步骤的历史记录
     *
     * @author chitanda
     * @date 2023-12-28 20:12:08
     * @private
     * @type {(HistoryItem<E>)}
     */
    private _cur;
    /**
     * 当前的数据
     *
     * @author chitanda
     * @date 2023-12-28 18:12:27
     * @type {E}
     */
    get data(): E;
    constructor(data: E);
    /**
     * 先创建一次历史记录，再赋值
     *
     * @author chitanda
     * @date 2023-12-28 17:12:05
     * @param {IData} data
     */
    assign(data: IData): void;
    /**
     * 创建一次历史记录
     *
     * @author chitanda
     * @date 2023-12-28 20:12:13
     */
    save(): void;
    /**
     * 上一步
     *
     * @author chitanda
     * @date 2023-12-28 16:12:28
     * @return {*}  {boolean}
     */
    prev(): boolean;
    /**
     * 下一步
     *
     * @author chitanda
     * @date 2023-12-28 16:12:20
     * @return {*}  {boolean}
     */
    next(): boolean;
    /**
     * 清空引用，避免内存泄漏
     *
     * @author chitanda
     * @date 2023-12-28 22:12:43
     * @protected
     * @param {HistoryItem<E>} h
     */
    protected _clear(h: HistoryItem<E>): void;
    /**
     * 禁止克隆，直接返回当前实例
     *
     * @author chitanda
     * @date 2023-12-28 22:12:49
     * @private
     * @return {*}  {HistoryList<E>}
     */
    protected clone(): HistoryList<E>;
    /**
     * 销毁
     *
     * @author chitanda
     * @date 2023-12-28 21:12:34
     */
    destroy(): void;
}
//# sourceMappingURL=history-list.d.ts.map