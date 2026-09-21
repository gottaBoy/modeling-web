import { IModelObject } from '../../imodel-object';

/**
 *
 * 应用实体搜索视图模型基础对象接口，定义搜索视图的基本能力
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
