import { ModelHandler } from './model-handler';

/**
 * @description 模型变换器
 * @author tony001
 * @date 2026-08-13 09:08:03
 * @export
 * @class ModelTransformer
 */
export class ModelTransformer {
  /**
   * @description 单例变量声明
   * @private
   * @static
   * @type {ModelTransformer}
   * @memberof ModelTransformer
   */
  private static modelTransformer: ModelTransformer;

  /**
   * @description 获取 ModelTransformer 单例对象
   * @static
   * @returns {*}  {ModelTransformer}
   * @memberof ModelTransformer
   */
  public static getInstance(): ModelTransformer {
    if (!this.modelTransformer) {
      this.modelTransformer = new ModelTransformer();
    }
    return this.modelTransformer;
  }

  /**
   * @description 模型处理器Map
   * @private
   * @type {Map<string, ModelHandler[]>}
   * @memberof ModelTransformer
   */
  private handlerMap: Map<string, ModelHandler[]> = new Map();

  /**
   * @description 模型缓存Map
   * @private
   * @type {Map<string, IModel>}
   * @memberof ModelTransformer
   */
  private modelCacheMap: Map<string, IModel> = new Map();

  /**
   * @description 注册模型处理器
   * @param {string} dynaModelFilePath 模型路径
   * @param {IModelHandler} handler 执行器
   * @memberof ModelTransformer
   */
  public registerHandler(
    dynaModelFilePath: string,
    handler: ModelHandler,
  ): void {
    const handlers = this.handlerMap.get(dynaModelFilePath);
    if (handlers) {
      handlers.push(handler);
    } else {
      this.handlerMap.set(dynaModelFilePath, [handler]);
    }
    // 注册新处理器后清除该路径的模型缓存，确保新处理器能生效
    this.modelCacheMap.delete(dynaModelFilePath);
  }

  /**
   * @description 变换模型
   * @param {string} dynaModelFilePath 模型路径
   * @param {IModel} model 原始模型
   * @returns {*}  {IModel}
   * @memberof ModelTransformer
   */
  public transform(dynaModelFilePath: string, model: IModel): IModel {
    ibiz.log.debug(
      ibiz.i18n.t('modelHelper.utils.tryGetModel', {
        dynaModelFilePath,
      }),
    );
    if (this.modelCacheMap.has(dynaModelFilePath)) {
      return this.modelCacheMap.get(dynaModelFilePath)!;
    }
    const handlers = this.handlerMap.get(dynaModelFilePath);
    if (!handlers || handlers.length === 0) {
      this.modelCacheMap.set(dynaModelFilePath, model);
      return model;
    }
    // 按照优先级升序排序，优先级高的后执行
    const sortedHandlers = [...handlers].sort(
      (a: ModelHandler, b: ModelHandler) => a.priority - b.priority,
    );
    // 模型处理
    let result = model;
    for (const handler of sortedHandlers) {
      try {
        const next = handler.execute(result);
        if (next) {
          result = next;
        } else {
          ibiz.log.error(
            ibiz.i18n.t('modelHelper.utils.transformNoModelData', {
              dynaModelFilePath,
            }),
          );
          // 未返回模型数据时返回传入的原始模型，防止界面异常
          return model;
        }
      } catch (error) {
        ibiz.log.error(
          ibiz.i18n.t('modelHelper.utils.transformException', {
            dynaModelFilePath,
          }),
          error,
        );
        // 执行异常时返回传入的原始模型，防止界面异常
        return model;
      }
    }
    this.modelCacheMap.set(dynaModelFilePath, result);
    return result;
  }
}
