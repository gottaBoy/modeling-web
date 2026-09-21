import { IAppBICube } from './iapp-bicube';
import { IAppBIReport } from './iapp-bireport';
import { IModelObject } from '../../imodel-object';

/**
 *
 * 应用智能报表体系模型对象接口
 * @export
 * @interface IAppBIScheme
 */
export interface IAppBIScheme extends IModelObject {
  /**
   * 智能立方体集合
   *
   * @type {IAppBICube[]}
   * 来源  getPSAppBICubes
   */
  appBICubes?: IAppBICube[];

  /**
   * 智能报表集合
   *
   * @type {IAppBIReport[]}
   * 来源  getPSAppBIReports
   */
  appBIReports?: IAppBIReport[];

  /**
   * 智能报表唯一标记
   * @type {string}
   * 来源  getUniqueTag
   */
  uniqueTag?: string;
}
