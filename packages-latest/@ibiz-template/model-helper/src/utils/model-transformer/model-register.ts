import { ModelHandler } from './model-handler';
import { ModelTransformer } from './model-transformer';

/**
 * @description 注册模型处理器
 * @export
 * @param {string} dynaModelFilePath 模型路径
 * @param {ModelHandler} handler 模型处理器
 */
export function registerModelHandler(
  dynaModelFilePath: string,
  handler: ModelHandler,
): void {
  ModelTransformer.getInstance().registerHandler(dynaModelFilePath, handler);
}
