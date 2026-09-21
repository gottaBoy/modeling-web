import { IScriptFunctionOpts } from '../../interface';
export declare class ScriptFunction {
    protected scriptFn: Function;
    protected argKeys: string[];
    protected options: IScriptFunctionOpts;
    constructor(argKeys: string[], scriptCode: string, options?: IScriptFunctionOpts);
    /**
     * 格式化脚本
     * @author lxm
     * @date 2023-07-25 11:02:33
     * @protected
     * @param {string} scriptCode
     * @param {IScriptFunctionOpts} options
     * @return {*}  {string}
     */
    protected formatCode(scriptCode: string, options: IScriptFunctionOpts): string;
    /**
     * 计算参数名称集合
     * @author lxm
     * @date 2023-07-25 11:42:37
     * @protected
     * @param {string[]} argKeys
     * @param {IScriptFunctionOpts} options
     */
    protected calcArgKeys(argKeys: string[], options: IScriptFunctionOpts): void;
    /**
     * 转换参数，把exec的对象参数转换成数组
     * @author lxm
     * @date 2023-07-25 11:22:03
     * @protected
     * @param {IParams} params
     * @return {*}  {any[]}
     */
    protected convertArgs(params: IParams): any[];
    /**
     * 填充预置参数
     * @author lxm
     * @date 2023-08-21 04:07:50
     * @protected
     * @param {string} key
     * @param {IParams} param
     */
    protected fillDefaultParams(key: string, param: IParams): void;
    /**
     * 执行脚本代码
     * @author lxm
     * @date 2023-07-25 11:21:44
     * @param {IParams} params
     * @return {*}
     */
    exec(params: IParams): unknown;
}
//# sourceMappingURL=script-function.d.ts.map