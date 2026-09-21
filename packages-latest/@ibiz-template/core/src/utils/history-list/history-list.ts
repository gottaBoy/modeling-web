import { clone } from 'ramda';
import { HistoryItem } from './history-item';

/**
 * @description 数据对象历史记录，只支持纯对象形式的数据。并未支持数组
 * @export
 * @class HistoryList
 * @template E
 */
export class HistoryList<E = IData> {
  /**
   * @description 当前步骤的历史记录
   * @private
   * @type {HistoryItem<E>}
   * @memberof HistoryList
   */
  private _cur: HistoryItem<E>;

  /**
   * @description 当前的数据
   * @readonly
   * @type {E}
   * @memberof HistoryList
   */
  get data(): E {
    return this._cur.data;
  }

  /**
   * Creates an instance of HistoryList.
   * @param {E} data
   * @memberof HistoryList
   */
  constructor(data: E) {
    this._cur = new HistoryItem<E>(data);
  }

  /**
   * @description 先创建一次历史记录，再赋值
   * @param {IData} data
   * @memberof HistoryList
   */
  assign(data: IData): void {
    if (data) {
      this.save();
      Object.assign(this._cur.data!, data);
    }
  }

  /**
   * @description 创建一次历史记录
   * @memberof HistoryList
   */
  save(): void {
    const oldCur = this._cur;
    // 克隆当前数据对象
    const data = clone(oldCur.data);
    // 新的历史对象
    const history = new HistoryItem<E>(data);
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
   * @description 上一步
   * @returns {*}  {boolean}
   * @memberof HistoryList
   */
  prev(): boolean {
    if (this._cur._prev && this._cur._prev !== HistoryItem.Undefined) {
      this._cur = this._cur._prev;
      return true;
    }
    return false;
  }

  /**
   * @description 下一步
   * @returns {*}  {boolean}
   * @memberof HistoryList
   */
  next(): boolean {
    if (this._cur._next && this._cur._next !== HistoryItem.Undefined) {
      this._cur = this._cur._next;
      return true;
    }
    return false;
  }

  /**
   * @description 清空引用，避免内存泄漏
   * @protected
   * @param {HistoryItem<E>} h
   * @memberof HistoryList
   */
  protected _clear(h: HistoryItem<E>): void {
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
    h.data = {} as E;
  }

  /**
   * @description 禁止克隆，直接返回当前实例
   * @protected
   * @returns {*}  {HistoryList<E>}
   * @memberof HistoryList
   */
  protected clone(): HistoryList<E> {
    const history = new HistoryList<E>({} as E);
    history._cur = clone(this._cur);
    return this;
  }

  /**
   * @description 销毁
   * @memberof HistoryList
   */
  destroy(): void {
    this._clear(this._cur);
  }
}
