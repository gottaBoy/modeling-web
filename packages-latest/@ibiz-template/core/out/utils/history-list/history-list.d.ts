import { HistoryItem } from './history-item';
/**
 * @description 数据对象历史记录，只支持纯对象形式的数据。并未支持数组
 * @export
 * @class HistoryList
 * @template E
 */
export declare class HistoryList<E = IData> {
    /**
     * @description 当前步骤的历史记录
     * @private
     * @type {HistoryItem<E>}
     * @memberof HistoryList
     */
    private _cur;
    /**
     * @description 当前的数据
     * @readonly
     * @type {E}
     * @memberof HistoryList
     */
    get data(): E;
    /**
     * Creates an instance of HistoryList.
     * @param {E} data
     * @memberof HistoryList
     */
    constructor(data: E);
    /**
     * @description 先创建一次历史记录，再赋值
     * @param {IData} data
     * @memberof HistoryList
     */
    assign(data: IData): void;
    /**
     * @description 创建一次历史记录
     * @memberof HistoryList
     */
    save(): void;
    /**
     * @description 上一步
     * @returns {*}  {boolean}
     * @memberof HistoryList
     */
    prev(): boolean;
    /**
     * @description 下一步
     * @returns {*}  {boolean}
     * @memberof HistoryList
     */
    next(): boolean;
    /**
     * @description 清空引用，避免内存泄漏
     * @protected
     * @param {HistoryItem<E>} h
     * @memberof HistoryList
     */
    protected _clear(h: HistoryItem<E>): void;
    /**
     * @description 禁止克隆，直接返回当前实例
     * @protected
     * @returns {*}  {HistoryList<E>}
     * @memberof HistoryList
     */
    protected clone(): HistoryList<E>;
    /**
     * @description 销毁
     * @memberof HistoryList
     */
    destroy(): void;
}
//# sourceMappingURL=history-list.d.ts.map