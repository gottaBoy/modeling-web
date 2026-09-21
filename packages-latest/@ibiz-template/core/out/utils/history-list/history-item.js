import { RuntimeError } from '../../error';
/**
 * @description 历史项
 * @export
 * @class HistoryItem
 * @template E
 */
export class HistoryItem {
    constructor(data = {}) {
        this.data = data;
        this._prev = HistoryItem.Undefined;
        this._next = HistoryItem.Undefined;
    }
    /**
     * @description 克隆整个历史链
     * @returns {*}  {HistoryItem<E>}
     * @memberof HistoryItem
     */
    clone() {
        // const history = new HistoryItem<E>(clone(this.data));
        // if (history._prev && history._prev !== HistoryItem.Undefined) {
        //   history._prev = clone(this._prev);
        // }
        // if (history._next && history._next !== HistoryItem.Undefined) {
        //   history._next = clone(this._next);
        // }
        // return history;
        throw new RuntimeError(ibiz.i18n.t('core.utils.unrealized'));
    }
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
HistoryItem.Undefined = new HistoryItem(undefined);
