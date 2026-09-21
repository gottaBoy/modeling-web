import { IDELogicParam } from '../../dataentity/logic/idelogic-param';
/**
 *
 * @export
 * @interface IAppDELogicParam
 */
export interface IAppDELogicParam extends IDELogicParam {
    /**
     * 参数应用实体对象
     *
     * @type {string}
     * 来源  getParamPSAppDataEntity
     */
    paramAppDataEntityId?: string;
}
