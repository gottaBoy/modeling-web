/**
 * 历史项
 *
 * @author chitanda
 * @date 2023-12-28 21:12:38
 * @export
 * @class History
 * @template E
 */
export declare class HistoryItem<E> {
    static readonly Undefined: HistoryItem<any>;
    _prev: HistoryItem<E>;
    _next: HistoryItem<E>;
    data: E;
    constructor(data?: unknown);
    /**
     * 克隆整个历史链
     *
     * @author chitanda
     * @date 2023-12-28 23:12:56
     * @return {*}  {HistoryItem<E>}
     */
    clone(): HistoryItem<E>;
}
//# sourceMappingURL=history-item.d.ts.map