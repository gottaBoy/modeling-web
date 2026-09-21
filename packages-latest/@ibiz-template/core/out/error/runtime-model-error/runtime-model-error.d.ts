/**
 * @description 模型配置缺失错误
 * @export
 * @class RuntimeModelError
 * @extends {Error}
 */
export declare class RuntimeModelError extends Error {
    model: IData;
    name: string;
    /**
     * Creates an instance of RuntimeModelError.
     * @param {IData} model 丢失配置的模型
     * @param {string} [msg] 缺失配置描述
     * @memberof RuntimeModelError
     */
    constructor(model: IData, msg?: string);
}
//# sourceMappingURL=runtime-model-error.d.ts.map