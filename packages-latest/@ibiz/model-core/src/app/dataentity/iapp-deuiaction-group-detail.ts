import { IDEUIActionGroupDetail } from '../../dataentity/uiaction/ideuiaction-group-detail';
import { ISysCss } from '../../res/isys-css';
import { ISysImage } from '../../res/isys-image';

/**
 *
 * 应用实体界面行为组成员模型对象接口
 * @export
 * @interface IAppDEUIActionGroupDetail
 */
export interface IAppDEUIActionGroupDetail extends IDEUIActionGroupDetail {
  /**
   * 后置内容界面样式表
   *
   * @type {ISysCss}
   * 来源  getAfterPSSysCss
   */
  afterSysCss?: ISysCss;

  /**
   * 前置内容界面样式表
   *
   * @type {ISysCss}
   * 来源  getBeforePSSysCss
   */
  beforeSysCss?: ISysCss;

  /**
   * 界面行为界面样式表
   *
   * @type {ISysCss}
   * 来源  getPSSysCss
   */
  sysCss?: ISysCss;

  /**
   * 界面行为图标资源
   *
   * @type {ISysImage}
   * 来源  getPSSysImage
   */
  sysImage?: ISysImage;
}
