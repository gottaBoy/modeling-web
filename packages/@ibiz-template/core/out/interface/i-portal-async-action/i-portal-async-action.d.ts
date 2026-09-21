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
     * 异步操作标识
     * @author lxm
     * @date 2023-11-14 02:26:59
     * @type {string}
     */
    asyncacitonid: string;
    /**
     * 异步操作名称
     * @author lxm
     * @date 2023-11-14 02:27:18
     * @type {string}
     */
    asyncacitonname: string;
    /**
     * 会话标识
     *
     * @author chitanda
     * @date 2023-09-05 15:09:57
     * @type {string}
     */
    fulltopictag: string;
    srfdcid: string;
    /**
     * 中心系统标识
     * @author lxm
     * @date 2023-11-14 02:26:15
     * @type {string}
     */
    dcsystemid: string;
    /**
     * 异步作业类型
     * - DEIMPORTDATA2: 异步导入
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
     * 完成百分比
     * @author lxm
     * @date 2023-11-14 05:38:15
     * @type {number}
     */
    completionrate?: number;
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
    /**
     * 操作开始时间
     * @author lxm
     * @date 2023-11-14 02:24:41
     * @type {string}
     */
    begintime: string;
    /**
     * 操作结束时间
     * @author lxm
     * @date 2023-11-14 02:24:43
     * @type {string}
     */
    endtime: string;
    /**
     * 创建人标识
     * @author lxm
     * @date 2023-11-14 02:24:03
     * @type {string}
     */
    createman: string;
    /**
     * 创建时间
     * @author lxm
     * @date 2023-11-14 02:24:11
     * @type {string}
     */
    createdate: string;
    /**
     * 更新人标识
     * @author lxm
     * @date 2023-11-14 02:24:20
     * @type {string}
     */
    updateman: string;
    /**
     * 更新时间
     * @author lxm
     * @date 2023-11-14 02:24:24
     * @type {string}
     */
    updatedate: string;
}
//# sourceMappingURL=i-portal-async-action.d.ts.map