import { clone } from 'ramda';
import { HistoryItem } from './history-item';
/**
 * 数据对象历史记录，只支持纯对象形式的数据。并未支持数组
 *
 * @author chitanda
 * @date 2023-12-28 17:12:05
 * @export
 * @class HistoryList
 */
export class HistoryList {
    /**
     * 当前的数据
     *
     * @author chitanda
     * @date 2023-12-28 18:12:27
     * @type {E}
     */
    get data() {
        return this._cur.data;
    }
    constructor(data) {
        this._cur = new HistoryItem(data);
    }
    /**
     * 先创建一次历史记录，再赋值
     *
     * @author chitanda
     * @date 2023-12-28 17:12:05
     * @param {IData} data
     */
    assign(data) {
        if (data) {
            this.save();
            Object.assign(this._cur.data, data);
        }
    }
    /**
     * 创建一次历史记录
     *
     * @author chitanda
     * @date 2023-12-28 20:12:13
     */
    save() {
        const oldCur = this._cur;
        // 克隆当前数据对象
        const data = clone(oldCur.data);
        // 新的历史对象
        const history = new HistoryItem(data);
        // 设置新历史的上一次历史为当前历史
        history._prev = oldCur;
        // 将下一步的前一步置空，断开引用
        oldCur._next._prev = HistoryItem.Undefined;
        // 清空下一步的所有引用
        this._clear(oldCur._next);
        // 设置当前历史的下一次历史为新历史，如果有旧的前进步骤就干掉了
        oldCur._next = history;
        // 设置新历史为新历史对象
        this._cur = history;
    }
    /**
     * 上一步
     *
     * @author chitanda
     * @date 2023-12-28 16:12:28
     * @return {*}  {boolean}
     */
    prev() {
        if (this._cur._prev && this._cur._prev !== HistoryItem.Undefined) {
            this._cur = this._cur._prev;
            return true;
        }
        return false;
    }
    /**
     * 下一步
     *
     * @author chitanda
     * @date 2023-12-28 16:12:20
     * @return {*}  {boolean}
     */
    next() {
        if (this._cur._next && this._cur._next !== HistoryItem.Undefined) {
            this._cur = this._cur._next;
            return true;
        }
        return false;
    }
    /**
     * 清空引用，避免内存泄漏
     *
     * @author chitanda
     * @date 2023-12-28 22:12:43
     * @protected
     * @param {HistoryItem<E>} h
     */
    _clear(h) {
        if (h._prev && h._prev !== HistoryItem.Undefined) {
            h._prev._next = HistoryItem.Undefined;
            this._clear(h._prev);
            h._prev = HistoryItem.Undefined;
        }
        if (h._next && h._next !== HistoryItem.Undefined) {
            h._next._prev = HistoryItem.Undefined;
            this._clear(h._next);
            h._next = HistoryItem.Undefined;
        }
        h.data = {};
    }
    /**
     * 禁止克隆，直接返回当前实例
     *
     * @author chitanda
     * @date 2023-12-28 22:12:49
     * @private
     * @return {*}  {HistoryList<E>}
     */
    clone() {
        const history = new HistoryList({});
        history._cur = clone(this._cur);
        return this;
    }
    /**
     * 销毁
     *
     * @author chitanda
     * @date 2023-12-28 21:12:34
     */
    destroy() {
        this._clear(this._cur);
    }
}
