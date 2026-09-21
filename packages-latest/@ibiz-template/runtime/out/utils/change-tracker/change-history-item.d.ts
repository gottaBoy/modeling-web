import { IApiChangeHistoryItem } from '../../interface';
/**
 * @description 历史项
 * @export
 * @class ChangeHistoryItem
 * @implements {IApiChangeHistoryItem<T>}
 * @template T
 */
export declare class ChangeHistoryItem<T> implements IApiChangeHistoryItem<T> {
    /**
     * @description 状态
     * @type {T}
     * @memberof ChangeHistoryItem
     */
    state: T;
    /**
     * @description 时间戳
     * @type {number}
     * @memberof ChangeHistoryItem
     */
    timestamp: number;
    /**
     * Creates an instance of ChangeHistoryItem.
     * @param {T} state
     * @memberof ChangeHistoryItem
     */
    constructor(state: T);
}
//# sourceMappingURL=change-history-item.d.ts.map