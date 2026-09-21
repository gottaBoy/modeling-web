/**
 * 模型配置缺失
 *
 * @author chitanda
 * @date 2022-08-30 16:08:15
 * @export
 * @class DefectModelError
 * @extends {Error}
 */
export declare class RuntimeModelError extends Error {
    model: IData;
    name: string;
    /**
     * Creates an instance of DefectModelError.
     *
     * @author chitanda
     * @date 2022-08-30 16:08:58
     * @param {IModelObject} model 丢失配置的模型
     * @param {string} [msg] 缺失配置描述
     */
    constructor(model: IData, msg?: string);
}
//# sourceMappingURL=runtime-model-error.d.ts.map