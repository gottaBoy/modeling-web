import { ModelHandler } from './model-handler';
/**
 * @description 模型变换器
 * @author tony001
 * @date 2026-08-13 09:08:03
 * @export
 * @class ModelTransformer
 */
export declare class ModelTransformer {
    /**
     * @description 单例变量声明
     * @private
     * @static
     * @type {ModelTransformer}
     * @memberof ModelTransformer
     */
    private static modelTransformer;
    /**
     * @description 获取 ModelTransformer 单例对象
     * @static
     * @returns {*}  {ModelTransformer}
     * @memberof ModelTransformer
     */
    static getInstance(): ModelTransformer;
    /**
     * @description 模型处理器Map
     * @private
     * @type {Map<string, ModelHandler[]>}
     * @memberof ModelTransformer
     */
    private handlerMap;
    /**
     * @description 模型缓存Map
     * @private
     * @type {Map<string, IModel>}
     * @memberof ModelTransformer
     */
    private modelCacheMap;
    /**
     * @description 注册模型处理器
     * @param {string} dynaModelFilePath 模型路径
     * @param {IModelHandler} handler 执行器
     * @memberof ModelTransformer
     */
    registerHandler(dynaModelFilePath: string, handler: ModelHandler): void;
    /**
     * @description 变换模型
     * @param {string} dynaModelFilePath 模型路径
     * @param {IModel} model 原始模型
     * @returns {*}  {IModel}
     * @memberof ModelTransformer
     */
    transform(dynaModelFilePath: string, model: IModel): IModel;
}
//# sourceMappingURL=model-transformer.d.ts.map