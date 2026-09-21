import { INavigateParamContainer } from '../inavigate-param-container';
/**
 *
 * @export
 * @interface IDETreeNodeRV
 */
export interface IDETreeNodeRV extends INavigateParamContainer {
    /**
     * 引用视图
     *
     * @type {string}
     * 来源  getRefPSAppView
     */
    refAppViewId?: string;
}
