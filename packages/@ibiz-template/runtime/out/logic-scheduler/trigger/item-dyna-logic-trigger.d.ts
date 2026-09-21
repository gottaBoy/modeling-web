import type { ITriggerMatchParams, IUILogicParams } from '../../interface';
import { LogicExecutor } from '../executor/logic-executor';
import { ScriptExecutor } from '../executor/script-executor';
import { LogicTrigger } from './logic-trigger';
export declare class ItemDynaLogicTrigger extends LogicTrigger {
    type: 'ITEMVISIBLE' | 'ITEMENABLE' | 'ITEMBLANK';
    executor: ScriptExecutor;
    bindExecutor(executor: LogicExecutor): void;
    bindScriptExecutor(executor: ScriptExecutor): void;
    match(matchParams: ITriggerMatchParams): boolean;
    execute(executeParams: IUILogicParams): boolean;
}
//# sourceMappingURL=item-dyna-logic-trigger.d.ts.map