import { UILogicContext } from '../ui-logic-context';
type SrcValParams = {
    /**
     * 源值类型
     */
    srcValueType?: string;
    /**
     * 源属性名称
     */
    srcFieldName?: string;
    /**
     * 直接值
     */
    srcValue?: string;
    /**
     * 源参数对象id
     */
    srcDEUILogicParamId?: string;
};
/**
 * 解析模型并获取源参数或其中的某个属性
 * @author lxm
 * @date 2023-06-13 11:20:39
 * @export
 * @param {SrcValParams} srcValParams
 * @param {DELogicContext} ctx
 * @return {*}
 */
export declare function handleSrcVal(ctx: UILogicContext, srcValParams: SrcValParams): unknown;
export {};
//# sourceMappingURL=handle-src-val.d.ts.map