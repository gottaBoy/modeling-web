/**
 * @description 未支持的模型错误
 * @export
 * @class ModelError
 * @extends {Error}
 */
export class ModelError extends Error {
  name: string = ibiz.i18n.t('core.error.unsupportedModels');

  /**
   * Creates an instance of ModelError.
   * @param {IData} model 模板未支持的模型
   * @param {string} [msg] 错误信息
   * @memberof ModelError
   */
  constructor(
    public model: IData,
    msg?: string,
  ) {
    super(
      ibiz.i18n.t('core.error.modelMsg', {
        id: model.id,
        msg: msg ? `： ${msg}` : '',
      }),
    );
  }
}
