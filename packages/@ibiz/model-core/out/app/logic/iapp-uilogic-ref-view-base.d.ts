import { INavigateParamContainer } from '../../control/inavigate-param-container';
/**
 *
 * @export
 * @interface IAppUILogicRefViewBase
 */
export interface IAppUILogicRefViewBase extends INavigateParamContainer {
    /**
     * 视图打开模式
     * @type {string}
     * 来源  getOpenMode
     */
    openMode?: string;
    /**
     * 引用模式
     * @type {string}
     * 来源  getRefMode
     */
    refMode?: string;
    /**
     * 实际引用视图
     *
     * @type {string}
     * 来源  getRefPSAppView
     */
    refAppViewId?: string;
}
