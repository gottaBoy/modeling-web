import { IModelObject } from '../../imodel-object';
/**
 *
 * 继承父接口类型值[DETABEXPVIEW|DETABEXPVIEW9]
 * @export
 * @interface IAppDESearchView
 */
export interface IAppDESearchView extends IModelObject {
    /**
     * 默认展开搜索表单
     * @type {boolean}
     * @default false
     * 来源  isExpandSearchForm
     */
    expandSearchForm?: boolean;
    /**
     * 默认加载数据
     * @type {boolean}
     * 来源  isLoadDefault
     */
    loadDefault?: boolean;
}
