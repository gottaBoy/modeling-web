import { IAppDELogic, IAppDataEntity } from '@ibiz/model-core';
import { IDELogicProvider } from '../provider';
/**
 * @description 实体逻辑节点接口
 * @export
 * @interface IDeLogic
 * @extends {IDELogicProvider}
 */
export interface IDeLogic extends IDELogicProvider {
    /**
     * @description 模型
     * @type {IAppDELogic}
     * @memberof IDELogic
     */
    model: IAppDELogic;
    /**
     * @description 实体模型
     * @type {IAppDataEntity}
     * @memberof IDELogic
     */
    entity: IAppDataEntity;
}
//# sourceMappingURL=i-de-logic.d.ts.map