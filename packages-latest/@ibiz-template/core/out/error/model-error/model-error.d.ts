/**
 * @description 未支持的模型错误
 * @export
 * @class ModelError
 * @extends {Error}
 */
export declare class ModelError extends Error {
    model: IData;
    name: string;
    /**
     * Creates an instance of ModelError.
     * @param {IData} model 模板未支持的模型
     * @param {string} [msg] 错误信息
     * @memberof ModelError
     */
    constructor(model: IData, msg?: string);
}
//# sourceMappingURL=model-error.d.ts.map