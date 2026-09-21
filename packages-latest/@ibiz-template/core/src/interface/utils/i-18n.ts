import { IApiI18n } from '../api';

/**
 * @description 多语言工具接口
 * @export
 * @interface I18n
 */
export interface I18n extends IApiI18n {
  /**
   * @description 异步初始化，加载多语言文件
   * @returns {*}  {Promise<void>}
   * @memberof I18n
   */
  init(): Promise<void>;

  /**
   * @description 设置异步加载的多语言模块
   * @param {Record<string, () => Promise<IData>>} languages
   * @memberof I18n
   */
  setLangConfigs(languages: Record<string, () => Promise<IData>>): void;
}
