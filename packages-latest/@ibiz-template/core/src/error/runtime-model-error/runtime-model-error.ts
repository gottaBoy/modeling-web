/**
 * @description 模型配置缺失错误
 * @export
 * @class RuntimeModelError
 * @extends {Error}
 */
export class RuntimeModelError extends Error {
  name: string = ibiz.i18n.t('core.error.modelConfigurationMissing');

  /**
   * Creates an instance of RuntimeModelError.
   * @param {IData} model 丢失配置的模型
   * @param {string} [msg] 缺失配置描述
   * @memberof RuntimeModelError
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
