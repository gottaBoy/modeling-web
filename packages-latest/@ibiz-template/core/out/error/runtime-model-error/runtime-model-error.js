/**
 * @description 模型配置缺失错误
 * @export
 * @class RuntimeModelError
 * @extends {Error}
 */
export class RuntimeModelError extends Error {
    /**
     * Creates an instance of RuntimeModelError.
     * @param {IData} model 丢失配置的模型
     * @param {string} [msg] 缺失配置描述
     * @memberof RuntimeModelError
     */
    constructor(model, msg) {
        super(ibiz.i18n.t('core.error.modelMsg', {
            id: model.id,
            msg: msg ? `： ${msg}` : '',
        }));
        this.model = model;
        this.name = ibiz.i18n.t('core.error.modelConfigurationMissing');
    }
}
