import { IScriptFunctionOpts, IUILogicParams } from '../../interface';
import { ScriptFunction } from '../../utils';
import { LogicExecutor } from './logic-executor';
/**
 * 脚本代码执行器
 * @author lxm
 * @date 2023-06-25 08:36:00
 * @export
 * @class ScriptExecutor
 * @extends {LogicExecutor}
 */
export declare class ScriptExecutor extends LogicExecutor {
    type: 'SCRIPT';
    scriptFn?: ScriptFunction;
    /**
     * 初始化完成
     * @author lxm
     * @date 2023-08-21 04:27:38
     * @type {boolean}
     */
    initialized: boolean;
    /**
     * 执行参数转换成脚本执行作用域参数
     * @author lxm
     * @date 2023-06-26 03:29:24
     * @param {IUILogicParams} _executeParams
     * @return {*}  {IData[]}
     */
    convertScriptArgs(executeParams: IUILogicParams): IData;
    /**
     * 初始化脚本执行器
     * @author lxm
     * @date 2023-06-26 03:27:50
     * @param {string[]} paramKeys 脚本作用域参数键值和顺序
     * @param {(executeParams: IUILogicParams) => IData[]} convertFun 脚本参数转换方法
     */
    init(paramKeys: string[], convertFun: (executeParams: IUILogicParams) => IData, options?: IScriptFunctionOpts): void;
    execute(executeParams: IUILogicParams): any;
}
//# sourceMappingURL=script-executor.d.ts.map