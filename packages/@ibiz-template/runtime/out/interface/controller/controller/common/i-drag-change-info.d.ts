/**
 * 拖拽变更信息
 * @author lxm
 * @date 2023-08-30 04:23:41
 * @export
 * @interface IDragChangeInfo
 */
export interface IDragChangeInfo {
    /**
     * 变更前的分组标识
     * @author lxm
     * @date 2023-08-30 04:24:25
     * @type {string}
     */
    from: string | number;
    /**
     * 变更后的分组标识
     * @author lxm
     * @date 2023-08-30 04:24:45
     * @type {string}
     */
    to: string | number;
    /**
     * 变更前的索引位置
     * @author lxm
     * @date 2023-08-30 04:25:02
     * @type {number}
     */
    fromIndex: number;
    /**
     * 变更后的索引位置
     * @author lxm
     * @date 2023-08-30 04:24:53
     * @type {number}
     */
    toIndex: number;
}
//# sourceMappingURL=i-drag-change-info.d.ts.map