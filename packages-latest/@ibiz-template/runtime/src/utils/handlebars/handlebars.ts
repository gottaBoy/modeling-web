import { IApiHandlebarsUtil } from '../../interface';
import { installHelpers } from './helpers';

/**
 * @description handlebars 渲染工具类
 * @export
 * @class HandlebarsUtil
 * @implements {IApiHandlebarsUtil}
 */
export class HandlebarsUtil implements IApiHandlebarsUtil {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  protected hsb: any;

  /**
   * @description 如果已经在请求中，则不再重复请求
   * @protected
   * @type {(Promise<unknown> | null)}
   * @memberof HandlebarsUtil
   */
  protected p: Promise<unknown> | null = null;

  /**
   * @description handlebars 是否已经初始化
   * @readonly
   * @type {boolean}
   * @memberof HandlebarsUtil
   */
  get isInit(): boolean {
    return !!this.hsb;
  }

  /**
   * @description 异步加载，初始化 handlebars
   * @returns {*}  {Promise<unknown>}
   * @memberof HandlebarsUtil
   */
  async init(): Promise<unknown> {
    if (this.isInit) {
      return;
    }
    if (this.p) {
      return this.p;
    }
    this.p = import('handlebars');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const module = (await this.p) as any;
    this.hsb = module.default || module;
    this.p = null;
    installHelpers(this.hsb);
    return this.hsb;
  }

  /**
   * @description 异步绘制模板，返回渲染后的字符串
   * @param {string} template
   * @param {IData} data
   * @returns {*}  {Promise<string>}
   * @memberof HandlebarsUtil
   */
  async render(template: string, data: IData): Promise<string> {
    if (!this.hsb) {
      await this.init();
    }
    const tmp = this.hsb.compile(template);
    return tmp(data);
  }

  /**
   * @description 同步绘制模板，返回渲染后的字符串
   * @param {string} template
   * @param {IData} data
   * @returns {*}  {string}
   * @memberof HandlebarsUtil
   */
  syncRender(template: string, data: IData): string {
    if (!this.hsb) {
      throw new Error(ibiz.i18n.t('runtime.utils.handlebars.noInitHandlebars'));
    }
    const tmp = this.hsb.compile(template);
    return tmp(data);
  }
}
