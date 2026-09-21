import { IApiContext } from '../global-param';

/**
 * @description 当前用户应用数据
 * @export
 * @interface IOrgData
 */
export interface IAppData {
  /**
   * @description 当前用户可看到的菜单项集合，启用菜单权限控制才生效
   * @type {string[]}
   * @memberof IAppData
   */
  appmenu: string[];

  /**
   * @description 当前用户用户身份信息
   * @type {IApiContext}
   * @memberof IAppData
   */
  context: IApiContext;

  /**
   * @description 是否启用权限控制
   * @type {boolean}
   * @memberof IAppData
   */
  enablepermissionvalid: boolean;

  /**
   * @description 当前用户过期时间，字符串格式，如 "2026-03-24 15:43:25"（本地时间）
   * @type {string}
   * @memberof IAppData
   */
  expireddate: string;

  /**
   * @description 当前用户过期剩余时间，单位秒
   * @type {number}
   * @memberof IAppData
   */
  expirein: number;

  /**
   * @description 当前用户权限资源,配合前端权限控制使用
   * @type {string[]}
   * @memberof IAppData
   */
  unires: string[];

  /**
   * @description 当前后台服务版本
   * @type {string}
   * @memberof IAppData
   */
  version: string;

  /**
   * @description 模型动态标记
   * @type {string}
   * @memberof IAppData
   */
  dynamodeltag: string;
}
