/* eslint-disable prettier/prettier */

import { IApiNotificationParams, IApiNotificationUtil } from "../../api";

/**
 * @description 全局通知参数
 * @export
 * @interface NotificationParams
 * @extends {IApiNotificationParams}
 */
export interface NotificationParams extends IApiNotificationParams { }

/**
 * @description 上传管理器参数
 * @export
 * @interface IUploadManagerParams
 */
export interface IUploadManagerParams {
  /**
   * @description 上传路径
   * @type {string}
   * @memberof IUploadManagerParams
   */
  uploadUrl: string;
  /**
   * @description 上传文件
   * @type {FileList}
   * @memberof IUploadManagerParams
   */
  files: FileList;
  /**
   * @description 请求头
   * @type {Record<string, string>}
   * @memberof IUploadManagerParams
   */
  headers?: Record<string, string>;
}

/**
 * @description 悬浮出现在界面右上角，显示全局的通知
 * @export
 * @interface INotificationUtil
 * @extends {IApiNotificationUtil}
 */
export interface INotificationUtil extends IApiNotificationUtil {
  /**
   * @description 上传管理器
   * @param {IUploadManagerParams} params
   * @returns {*}  {Promise<IData[]>}
   * @memberof INotificationUtil
   */
  uploadManager(params: IUploadManagerParams): Promise<IData[]>;
}
