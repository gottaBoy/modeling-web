import { ILayout } from './ilayout';
import { IModelObject } from '../../imodel-object';
/**
 *
 * @export
 * @interface ILayoutContainer
 */
export interface ILayoutContainer extends IModelObject {
    /**
     * 看板布局
     *
     * @type {ILayout}
     * 来源  getPSLayout
     */
    layout?: ILayout;
}
