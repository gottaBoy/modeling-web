/**
 * 模型配置缺失
 *
 * @author chitanda
 * @date 2022-08-30 16:08:15
 * @export
 * @class DefectModelError
 * @extends {Error}
 */
export class RuntimeModelError extends Error {
    /**
     * Creates an instance of DefectModelError.
     *
     * @author chitanda
     * @date 2022-08-30 16:08:58
     * @param {IModelObject} model 丢失配置的模型
     * @param {string} [msg] 缺失配置描述
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
