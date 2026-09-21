/**
 * 未支持的模型
 *
 * @author chitanda
 * @date 2022-08-30 16:08:03
 * @export
 * @class ModelError
 */
export class ModelError extends Error {
    /**
     * Creates an instance of ModelError.
     *
     * @author chitanda
     * @date 2022-08-30 16:08:38
     * @param {IModelObject} model 模板未支持的模型
     * @param {string} [msg]
     */
    constructor(model, msg) {
        super(ibiz.i18n.t('core.error.modelMsg', {
            id: model.id,
            msg: msg ? `： ${msg}` : '',
        }));
        this.model = model;
        this.name = ibiz.i18n.t('core.error.unsupportedModels');
    }
}
