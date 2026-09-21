import { RuntimeError } from '../../error';
/**
 * 历史项
 *
 * @author chitanda
 * @date 2023-12-28 21:12:38
 * @export
 * @class History
 * @template E
 */
export class HistoryItem {
    constructor(data = {}) {
        this.data = data;
        this._prev = HistoryItem.Undefined;
        this._next = HistoryItem.Undefined;
    }
    /**
     * 克隆整个历史链
     *
     * @author chitanda
     * @date 2023-12-28 23:12:56
     * @return {*}  {HistoryItem<E>}
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
