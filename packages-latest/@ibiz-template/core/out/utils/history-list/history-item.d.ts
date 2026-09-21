/**
 * @description 历史项
 * @export
 * @class HistoryItem
 * @template E
 */
export declare class HistoryItem<E> {
    static readonly Undefined: HistoryItem<any>;
    _prev: HistoryItem<E>;
    _next: HistoryItem<E>;
    data: E;
    constructor(data?: unknown);
    /**
     * @description 克隆整个历史链
     * @returns {*}  {HistoryItem<E>}
     * @memberof HistoryItem
     */
    clone(): HistoryItem<E>;
}
//# sourceMappingURL=history-item.d.ts.map