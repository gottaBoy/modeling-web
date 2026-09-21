/**
 * @description 模型处理器
 * @export
 * @interface IModelHandler
 */
export interface IModelHandler {
    /**
     * @description 执行模型处理
     *
     * 调用约定：
     * - 入参 `model` 为当前已处理的模型对象，处理器可就地修改该对象，也可返回一个新的模型对象。
     * - 返回值将作为下一个处理器的入参，并最终作为该路径模型的最终结果被缓存。
     * - 若返回 `null`、`undefined` 等假值，将中断当前路径后续处理器的执行，并回退到原始模型。
     * - 处理器抛出异常时同样会中断后续执行，并回退到原始模型。
     * @param {IModel} model 当前待处理的模型对象
     * @returns {IModel} 处理后的模型对象
     */
    execute(model: IModel): IModel;
}
//# sourceMappingURL=i-model-handler.d.ts.map