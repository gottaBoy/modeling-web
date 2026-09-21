import { ChangeHistoryItem } from './change-history-item';
/**
 * @description 变更追踪器
 * @export
 * @class ChangeTracker
 * @implements {IApiChangeTracker<T>}
 * @template T
 */
export class ChangeTracker {
    /**
     * Creates an instance of ChangeTracker.
     * @param {{ limit?: number }} [options={}]
     * @memberof ChangeTracker
     */
    constructor(options = {}) {
        /**
         * @description 当前值前序清单
         * @private
         * @type {ChangeHistoryItem<T>[]}
         * @memberof ChangeTracker
         */
        this.past = [];
        /**
         * @description 当前值
         * @private
         * @type {(ChangeHistoryItem<T> | null)}
         * @memberof ChangeTracker
         */
        this.present = null;
        /**
         * @description 当前值后序清单
         * @private
         * @type {ChangeHistoryItem<T>[]}
         * @memberof ChangeTracker
         */
        this.future = [];
        this.limit = options.limit || 100;
    }
    /**
     * @description 添加状态
     * @param {T} state
     * @memberof ChangeTracker
     */
    add(state) {
        if (this.present) {
            this.past.push(this.present);
            this.trimHistory(this.past);
        }
        this.present = new ChangeHistoryItem(state);
        this.future = [];
    }
    /**
     * @description 重置状态
     * @param {T} state
     * @memberof ChangeTracker
     */
    reset(state) {
        this.clearHistory();
        this.add(state);
    }
    /**
     * @description 撤销上一步操作
     * @returns {*}  {(T | null)}
     * @memberof ChangeTracker
     */
    undo() {
        if (this.past.length === 0 || !this.present) {
            return null;
        }
        const previous = this.past.pop();
        this.future.unshift(this.present);
        this.present = previous;
        return this.getState();
    }
    /**
     * @description 重做下一步操作
     * @returns {*}  {(T | null)}
     * @memberof ChangeTracker
     */
    redo() {
        if (this.future.length === 0 || !this.present) {
            return null;
        }
        const next = this.future.shift();
        this.past.push(this.present);
        this.present = next;
        return this.getState();
    }
    /**
     * @description 获取当前状态
     * @returns {*}  {(T | null)}
     * @memberof ChangeTracker
     */
    getState() {
        var _a, _b;
        return (_b = (_a = this.present) === null || _a === void 0 ? void 0 : _a.state) !== null && _b !== void 0 ? _b : null;
    }
    /**
     * @description 是否可以撤销
     * @returns {*}  {boolean}
     * @memberof ChangeTracker
     */
    canUndo() {
        return this.past.length > 0;
    }
    /**
     * @description 是否可以重做
     * @returns {*}  {boolean}
     * @memberof ChangeTracker
     */
    canRedo() {
        return this.future.length > 0;
    }
    /**
     * @description 清空历史记录
     * @memberof ChangeTracker
     */
    clearHistory() {
        this.past = [];
        this.future = [];
        this.present = null;
    }
    /**
     * @description 获取历史记录长度信息
     * @returns {*}  {{ past: number; future: number }}
     * @memberof ChangeTracker
     */
    getHistorySize() {
        return {
            past: this.past.length,
            future: this.future.length,
        };
    }
    /**
     * @description 限制历史记录长度
     * @private
     * @param {IApiChangeHistoryItem<T>[]} history 历史记录数组
     * @memberof ChangeTracker
     */
    trimHistory(history) {
        if (history.length > this.limit) {
            const excess = history.length - this.limit;
            history.splice(0, excess);
        }
    }
}
