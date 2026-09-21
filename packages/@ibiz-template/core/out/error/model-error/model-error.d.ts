/**
 * 未支持的模型
 *
 * @author chitanda
 * @date 2022-08-30 16:08:03
 * @export
 * @class ModelError
 */
export declare class ModelError extends Error {
    model: IData;
    name: string;
    /**
     * Creates an instance of ModelError.
     *
     * @author chitanda
     * @date 2022-08-30 16:08:38
     * @param {IModelObject} model 模板未支持的模型
     * @param {string} [msg]
     */
    constructor(model: IData, msg?: string);
}
//# sourceMappingURL=model-error.d.ts.map