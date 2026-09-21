/**
 * @description 模型变换处理器
 * @export
 * @abstract
 * @class ModelHandler
 * @implements {IModelHandler}
 */
export class ModelHandler {
    /**
     * Creates an instance of ModelHandler.
     * @param {number} [priority=1] 优先级，数值越小越先执行
     * @memberof ModelHandler
     */
    constructor(priority = 1) {
        /**
         * @description 优先级，默认值为1
         * @public
         * @type {number}
         * @memberof ModelHandler
         */
        this.priority = 1;
        this.priority = priority;
    }
}
