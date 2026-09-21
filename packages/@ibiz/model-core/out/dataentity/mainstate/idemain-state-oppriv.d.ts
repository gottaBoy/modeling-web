import { IModelObject } from '../../imodel-object';
/**
 *
 * @export
 * @interface IDEMainStateOPPriv
 */
export interface IDEMainStateOPPriv extends IModelObject {
    /**
     * 实体操作标识
     *
     * @type {string}
     * 来源  getPSDEOPPriv
     */
    deopprivId?: string;
}
