import { IAppBICubeDimension } from './iapp-bicube-dimension';
import { IAppBICubeMeasure } from './iapp-bicube-measure';
import { IModelObject } from '../../imodel-object';

/**
 *
 * 应用智能立方体模型对象接口
 * @export
 * @interface IAppBICube
 */
export interface IAppBICube extends IModelObject {
  /**
   * 访问标识
   * @type {string}
   * 来源  getAccessKey
   */
  accessKey?: string;

  /**
   * 智能立方体维度集合
   *
   * @type {IAppBICubeDimension[]}
   * 来源  getPSAppBICubeDimensions
   */
  appBICubeDimensions?: IAppBICubeDimension[];

  /**
   * 智能立方体指标集合
   *
   * @type {IAppBICubeMeasure[]}
   * 来源  getPSAppBICubeMeasures
   */
  appBICubeMeasures?: IAppBICubeMeasure[];

  /**
   * 系统智能立方体
   *
   * @type {string}
   * 来源  getPSAppDataEntity
   */
  appDataEntityId?: string;
}
