/**
 * @description 历史项
 * @export
 * @class ChangeHistoryItem
 * @implements {IApiChangeHistoryItem<T>}
 * @template T
 */
export class ChangeHistoryItem {
    /**
     * Creates an instance of ChangeHistoryItem.
     * @param {T} state
     * @memberof ChangeHistoryItem
     */
    constructor(state) {
        this.state = state;
        this.timestamp = Date.now();
    }
}
