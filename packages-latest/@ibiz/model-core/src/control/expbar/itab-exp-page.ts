import { IAppCounterRef } from '../../app/control/iapp-counter-ref';
import { IControl } from '../icontrol';
import { INavigateParamContainer } from '../inavigate-param-container';
import { IDERBase } from '../../dataentity/der/iderbase';
import { ISysImage } from '../../res/isys-image';

/**
 *
 * 分页导航分页模型对象接口
 * @export
 * @interface ITabExpPage
 */
export interface ITabExpPage extends IControl, INavigateParamContainer {
  /**
   * @type {string}
   * 来源  getCounterId
   */
  counterId?: string;

  /**
   *
   * @type {IDERBase}
   * 来源  getNavPSDER
   */
  navDER?: IDERBase;

  /**
   *
   * @type {IAppCounterRef}
   * 来源  getPSAppCounterRef
   */
  appCounterRef?: IAppCounterRef;

  /**
   *
   * @type {ISysImage}
   * 来源  getPSSysImage
   */
  sysImage?: ISysImage;

  /**
   * 视图父数据对象
   * @type {IModel}
   * 来源  getParentDataJO
   */
  parentDataJO?: IModel;
}
