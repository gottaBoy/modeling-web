import { IModelHandler } from '../../interface';

/**
 * @description 模型变换处理器
 * @export
 * @abstract
 * @class ModelHandler
 * @implements {IModelHandler}
 */
export abstract class ModelHandler implements IModelHandler {
  /**
   * @description 优先级，默认值为1
   * @public
   * @type {number}
   * @memberof ModelHandler
   */
  public priority: number = 1;

  /**
   * Creates an instance of ModelHandler.
   * @param {number} [priority=1] 优先级，数值越小越先执行
   * @memberof ModelHandler
   */
  constructor(priority: number = 1) {
    this.priority = priority;
  }

  /**
   * @description 执行器
   * @abstract
   * @param {IModel} model
   * @returns {*}  {IModel}
   * @memberof ModelHandler
   */
  abstract execute(model: IModel): IModel;
}
