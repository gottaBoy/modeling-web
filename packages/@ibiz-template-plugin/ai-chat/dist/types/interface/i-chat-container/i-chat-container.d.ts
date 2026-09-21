/**
 * 聊天窗口呈现配置
 *
 * @author chitanda
 * @date 2023-10-15 19:10:04
 * @export
 * @interface IChatContainerOptions
 */
export interface IChatContainerOptions {
    /**
     * 窗口 x 坐标
     *
     * @author chitanda
     * @date 2023-10-13 14:10:42
     * @type {number}
     */
    x?: number;
    /**
     * 窗口 y 坐标
     *
     * @author chitanda
     * @date 2023-10-13 14:10:52
     * @type {number}
     */
    y?: number;
    /**
     * 窗口宽度
     *
     * @author chitanda
     * @date 2023-10-13 14:10:56
     * @type {number}
     */
    width?: number;
    /**
     * 窗口高度
     *
     * @author chitanda
     * @date 2023-10-13 14:10:02
     * @type {number}
     */
    height?: number;
    /**
     * 窗口最小宽度
     *
     * @author chitanda
     * @date 2023-10-13 14:10:11
     * @type {number}
     */
    minWidth?: number;
    /**
     * 窗口最小高度
     *
     * @author chitanda
     * @date 2023-10-13 14:10:15
     * @type {number}
     */
    minHeight?: number;
    /**
     * 窗口index
     *
     * @author tony001
     * @date 2025-03-03 16:03:01
     * @type {number}
     */
    zIndex?: number;
    /**
     * 是否允许回填
     *
     * @author tony001
     * @date 2025-03-10 15:03:16
     * @type {boolean}
     */
    enableBackFill?: boolean;
}
