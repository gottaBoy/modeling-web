import { IDEUIActionGroupDetail } from '../../dataentity/uiaction/ideuiaction-group-detail';
import { ISysCss } from '../../res/isys-css';
import { ISysImage } from '../../res/isys-image';
/**
 *
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
