/**
 * 异步作业信息
 *
 * @author chitanda
 * @date 2023-09-05 15:09:59
 * @export
 * @interface IPortalAsyncAction
 */
export interface IPortalAsyncAction {
    /**
     * 会话标识
     *
     * @author chitanda
     * @date 2023-09-05 15:09:57
     * @type {string}
     */
    fulltopictag: string;
    /**
     * 异步作业类型
     *
     * @author chitanda
     * @date 2023-09-05 15:09:09
     * @type {string}
     */
    actiontype: string;
    /**
     * 作业状态
     *
     * @author chitanda
     * @date 2023-10-10 15:10:59
     * @type {(10 | 20 | 30 | 40)} 未开始 | 执行中 | 已执行 | 执行失败
     */
    actionstate: 10 | 20 | 30 | 40;
    /**
     * 异步作业执行结果
     *
     * @author chitanda
     * @date 2023-09-05 15:09:33
     * @type {unknown}
     */
    actionresult?: unknown;
    /**
     * 步骤信息
     *
     * @author chitanda
     * @date 2023-09-05 15:09:55
     * @type {string}
     */
    stepinfo?: string;
    /**
     * 异步结果下载路径，目前是留给导出数据使用
     *
     * @author chitanda
     * @date 2023-09-05 15:09:03
     * @type {string}
     */
    asyncresultdownloadurl?: string;
    /**
     * 预留参数
     *
     * @author chitanda
     * @date 2023-09-05 15:09:32
     * @type {unknown}
     */
    actionparam?: unknown;
    /**
     *预留参数2
     *
     * @author chitanda
     * @date 2023-09-05 15:09:41
     * @type {unknown}
     */
    actionparam2?: unknown;
    /**
     *预留参数3
     *
     * @author chitanda
     * @date 2023-09-05 15:09:43
     * @type {unknown}
     */
    actionparam3?: unknown;
    /**
     *预留参数4
     *
     * @author chitanda
     * @date 2023-09-05 15:09:45
     * @type {unknown}
     */
    actionparam4?: unknown;
}
