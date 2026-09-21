import { IAppDataEntity, IDEUILogic } from '@ibiz/model-core';
import { IUILogicProvider } from '../provider';
/**
 * @description 界面逻辑接口
 * @export
 * @interface IUILogic
 * @extends {IUILogicProvider}
 */
export interface IUILogic extends IUILogicProvider {
    /**
     * @description 模型
     * @type {IDEUILogic}
     * @memberof IUILogic
     */
    model: IDEUILogic;
    /**
     * @description 实体模型
     * @type {IAppDataEntity}
     * @memberof IUILogic
     */
    entity: IAppDataEntity;
}
//# sourceMappingURL=i-ui-logic.d.ts.map