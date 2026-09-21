import { IUILogicParams } from '../../interface';
import { LogicExecutor } from './logic-executor';
/**
 * 应用界面行为执行
 * @author lxm
 * @date 2023-07-17 01:57:27
 * @export
 * @class AppUILogicExecutor
 * @extends {LogicExecutor}
 */
export declare class AppDEUIActionExecutor extends LogicExecutor {
    type: 'APPDEUIACTION';
    execute(executeParams: IUILogicParams): any;
}
//# sourceMappingURL=app-ui-action-executor.d.ts.map