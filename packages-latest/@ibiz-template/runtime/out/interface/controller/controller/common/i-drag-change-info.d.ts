/**
 * @description 拖拽变更信息
 * @export
 * @interface IDragChangeInfo
 */
export interface IDragChangeInfo {
    /**
     * @description 变更前的分组标识
     * @type {(string | number)}
     * @memberof IDragChangeInfo
     */
    from: string | number;
    /**
     * @description 变更后的分组标识
     * @type {(string | number)}
     * @memberof IDragChangeInfo
     */
    to: string | number;
    /**
     * @description 变更前的索引位置
     * @type {number}
     * @memberof IDragChangeInfo
     */
    fromIndex: number;
    /**
     * @description 变更后的索引位置
     * @type {number}
     * @memberof IDragChangeInfo
     */
    toIndex: number;
    /**
     * @description 变更前的泳道
     * @type {string}
     * @memberof IDragChangeInfo
     */
    fromLane?: string;
    /**
     * @description 变更后的泳道
     * @type {string}
     * @memberof IDragChangeInfo
     */
    toLane?: string;
}
//# sourceMappingURL=i-drag-change-info.d.ts.map