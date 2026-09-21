/**
 * @description 异步作业信息
 * @export
 * @interface IPortalAsyncAction
 */
export interface IPortalAsyncAction {
  /**
   * @description 异步操作标识
   * @type {string}
   * @memberof IPortalAsyncAction
   */
  asyncacitonid: string;
  /**
   * @description 异步操作名称
   * @type {string}
   * @memberof IPortalAsyncAction
   */
  asyncacitonname: string;
  /**
   * @description 会话标识
   * @type {string}
   * @memberof IPortalAsyncAction
   */
  fulltopictag: string;
  /**
   * @description 租户标识
   * @type {string}
   * @memberof IPortalAsyncAction
   */
  srfdcid: string;
  /**
   * @description 租户系统标识
   * @type {string}
   * @memberof IPortalAsyncAction
   */
  dcsystemid: string;

  /**
   * @description 异步作业类型，DEIMPORTDATA2: 异步导入
   * @type {string}
   * @memberof IPortalAsyncAction
   */
  actiontype: string;

  /**
   * @description 作业状态
   * @type {(10 | 20 | 30 | 40)} 未开始 | 执行中 | 已执行 | 执行失败
   * @memberof IPortalAsyncAction
   */
  actionstate: 10 | 20 | 30 | 40;

  /**
   * @description 异步作业执行结果
   * @type {unknown}
   * @memberof IPortalAsyncAction
   */
  actionresult?: unknown;

  /**
   * @description 步骤信息
   * @type {string}
   * @memberof IPortalAsyncAction
   */
  stepinfo?: string;

  /**
   * @description 完成百分比
   * @type {number}
   * @memberof IPortalAsyncAction
   */
  completionrate?: number;

  /**
   * @description 异步结果下载路径，目前是留给导出数据使用
   * @type {string}
   * @memberof IPortalAsyncAction
   */
  asyncresultdownloadurl?: string;

  /**
   * @description 预留参数
   * @type {unknown}
   * @memberof IPortalAsyncAction
   */
  actionparam?: unknown;

  /**
   * @description 预留参数2
   * @type {unknown}
   * @memberof IPortalAsyncAction
   */
  actionparam2?: unknown;

  /**
   * @description 预留参数3
   * @type {unknown}
   * @memberof IPortalAsyncAction
   */
  actionparam3?: unknown;

  /**
   * @description 预留参数4
   * @type {unknown}
   * @memberof IPortalAsyncAction
   */
  actionparam4?: unknown;

  /**
   * @description 操作开始时间
   * @type {string}
   * @memberof IPortalAsyncAction
   */
  begintime: string;
  /**
   * @description 操作结束时间
   * @type {string}
   * @memberof IPortalAsyncAction
   */
  endtime: string;
  /**
   * @description 创建人标识
   * @type {string}
   * @memberof IPortalAsyncAction
   */
  createman: string;
  /**
   * @description 创建时间
   * @type {string}
   * @memberof IPortalAsyncAction
   */
  createdate: string;
  /**
   * @description 更新人标识
   * @type {string}
   * @memberof IPortalAsyncAction
   */
  updateman: string;
  /**
   * @description 更新时间
   * @type {string}
   * @memberof IPortalAsyncAction
   */
  updatedate: string;
}
