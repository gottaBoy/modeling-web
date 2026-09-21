import { IApiChangeTracker } from '../../interface';
/**
 * @description 变更追踪器
 * @export
 * @class ChangeTracker
 * @implements {IApiChangeTracker<T>}
 * @template T
 */
export declare class ChangeTracker<T> implements IApiChangeTracker<T> {
    /**
     * @description 当前值前序清单
     * @private
     * @type {ChangeHistoryItem<T>[]}
     * @memberof ChangeTracker
     */
    private past;
    /**
     * @description 当前值
     * @private
     * @type {(ChangeHistoryItem<T> | null)}
     * @memberof ChangeTracker
     */
    private present;
    /**
     * @description 当前值后序清单
     * @private
     * @type {ChangeHistoryItem<T>[]}
     * @memberof ChangeTracker
     */
    private future;
    /**
     * @description 历史记录限制条数，默认历史记录限制100条
     * @private
     * @type {number}
     * @memberof ChangeTracker
     */
    private readonly limit;
    /**
     * Creates an instance of ChangeTracker.
     * @param {{ limit?: number }} [options={}]
     * @memberof ChangeTracker
     */
    constructor(options?: {
        limit?: number;
    });
    /**
     * @description 添加状态
     * @param {T} state
     * @memberof ChangeTracker
     */
    add(state: T): void;
    /**
     * @description 重置状态
     * @param {T} state
     * @memberof ChangeTracker
     */
    reset(state: T): void;
    /**
     * @description 撤销上一步操作
     * @returns {*}  {(T | null)}
     * @memberof ChangeTracker
     */
    undo(): T | null;
    /**
     * @description 重做下一步操作
     * @returns {*}  {(T | null)}
     * @memberof ChangeTracker
     */
    redo(): T | null;
    /**
     * @description 获取当前状态
     * @returns {*}  {(T | null)}
     * @memberof ChangeTracker
     */
    getState(): T | null;
    /**
     * @description 是否可以撤销
     * @returns {*}  {boolean}
     * @memberof ChangeTracker
     */
    canUndo(): boolean;
    /**
     * @description 是否可以重做
     * @returns {*}  {boolean}
     * @memberof ChangeTracker
     */
    canRedo(): boolean;
    /**
     * @description 清空历史记录
     * @memberof ChangeTracker
     */
    clearHistory(): void;
    /**
     * @description 获取历史记录长度信息
     * @returns {*}  {{ past: number; future: number }}
     * @memberof ChangeTracker
     */
    getHistorySize(): {
        past: number;
        future: number;
    };
    /**
     * @description 限制历史记录长度
     * @private
     * @param {IApiChangeHistoryItem<T>[]} history 历史记录数组
     * @memberof ChangeTracker
     */
    private trimHistory;
}
//# sourceMappingURL=change-tracker.d.ts.map