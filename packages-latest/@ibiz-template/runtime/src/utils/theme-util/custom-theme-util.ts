import { notNilEmpty } from 'qx-util';
import { clone } from 'ramda';
import { RuntimeError } from '@ibiz-template/core';
import { ConfigService } from '../../service';
import { ThemeUtil } from './theme-util';

/**
 * 自定义主题工具类
 *
 * @author zzq
 * @date 2024-05-10 23:12:15
 * @export
 * @class CustomThemeUtil
 */
export class CustomThemeUtil {
  /**
   * 自定义主题参数
   *
   * @author tony001
   * @date 2024-12-26 16:12:54
   * @type {Record<string, string>}
   */
  themeVars: Record<string, string> = {};

  /**
   * Creates an instance of CustomThemeUtil.
   * @author tony001
   * @date 2024-12-26 15:12:39
   * @param {ThemeUtil} themeUtil
   */
  constructor(protected themeUtil: ThemeUtil) {}

  /**
   * 获取应用主题存储服务
   *
   * @author tony001
   * @date 2024-12-26 18:12:52
   * @param {string} themeTag 主题标识
   * @param {boolean} [isShare=false] 是否分享
   * @return {*}  {ConfigService}
   */
  public getConfigService(
    themeTag: string,
    isShare: boolean = false,
  ): ConfigService {
    const app = ibiz.hub.getApp();
    return new ConfigService(
      app.appId,
      'customtheme',
      `${ibiz.env.appId}_${themeTag}_theme_config${isShare ? '?share=true' : ''}`,
    );
  }

  /**
   * 加载自定义主题
   *
   * @author tony001
   * @date 2024-12-26 18:12:18
   * @private
   * @param {string} themeTag 主题标识
   * @return {*}  {(Promise<IData | undefined>)}
   */
  private async loadCustomTheme(themeTag: string): Promise<IData | undefined> {
    const config = this.getConfigService(themeTag);
    const res = await config!.load();
    if (notNilEmpty(res.themeVars)) {
      return res.themeVars;
    }
  }

  /**
   * 初始化主题
   *
   * @author tony001
   * @date 2024-12-26 15:12:14
   * @return {*}  {Promise<void>}
   */
  public async init(): Promise<void> {
    const themeTag = this.themeUtil.getTheme();
    const result = await this.loadCustomTheme(themeTag);
    if (result) {
      this.themeVars = result;
      this.setCustomThemeParams(themeTag, result);
    }
  }

  /**
   * 清除自定义主题参数
   *
   * @author tony001
   * @date 2024-12-26 17:12:40
   * @param {string} themeTag
   */
  clearCustomThemeParams(themeTag: string): void {
    const themeStyle = document.getElementById(themeTag);
    if (themeStyle) {
      themeStyle.remove();
    }
  }

  /**
   * 预览自定义主题
   *
   * @author tony001
   * @date 2024-12-26 18:12:25
   * @param {string} themeTag
   * @param {Record<string, string>} [themeVars={}]
   * @param {boolean} [isLoad=true]
   * @return {*}  {Promise<IData>}
   */
  public async previewCustomTheme(
    themeTag: string,
    themeVars: Record<string, string> = {},
    isLoad: boolean = true,
  ): Promise<IData> {
    const cloneThemeVars = clone(themeVars);
    if (isLoad) {
      const result = await this.loadCustomTheme(themeTag);
      if (result) {
        Object.assign(cloneThemeVars, result);
      }
    }
    if (notNilEmpty(themeVars)) {
      Object.assign(cloneThemeVars, themeVars);
    }
    this.setCustomThemeParams(themeTag, cloneThemeVars);
    return { themeTag, themeVars: cloneThemeVars };
  }

  /**
   * 保存自定义主题
   *
   * @author tony001
   * @date 2024-12-26 17:12:10
   * @param {string} themeTag
   * @param {Record<string, string>} themeVars
   * @param {boolean} isShare
   * @return {*}  {Promise<IData>}
   */
  public async saveCustomTheme(
    themeTag: string,
    themeVars: Record<string, string>,
    isShare: boolean,
  ): Promise<IData> {
    const config = this.getConfigService(themeTag, isShare);
    const result = await config!.save({
      themeVars,
    });
    if (result) {
      ibiz.message.success(
        ibiz.i18n.t('runtime.controller.utils.customThemeUtil.saveSuccess'),
      );
    } else {
      throw new RuntimeError(
        ibiz.i18n.t('runtime.controller.utils.customThemeUtil.saveError'),
      );
    }
    return { themeTag, themeVars };
  }

  /**
   * 重置自定义主题
   *
   * @author tony001
   * @date 2024-12-26 17:12:33
   * @param {string} themeTag
   * @return {*}  {Promise<IData>}
   */
  async resetCustomTheme(themeTag: string, isShare: boolean): Promise<IData> {
    const config = this.getConfigService(themeTag, isShare);
    let res;
    if (!isShare) {
      res = await config!.reset();
    } else {
      res = await config!.save({
        themeVars: {},
      });
    }
    if (res) {
      ibiz.message.success(
        ibiz.i18n.t('runtime.controller.utils.customThemeUtil.resetSuccess'),
      );
    } else {
      throw new RuntimeError(
        ibiz.i18n.t('runtime.controller.utils.customThemeUtil.resetError'),
      );
    }
    this.clearCustomThemeParams(themeTag);
    const result = await this.loadCustomTheme(themeTag);
    if (result) {
      this.setCustomThemeParams(themeTag, result);
      return { themeTag, themeVars: result };
    }

    return { themeTag, themeVars: {} };
  }

  /**
   * 转换自定义变量
   *
   * @param {Record<string, string>} themeVars
   * @return {string}
   * @memberof CustomThemeUtil
   */
  transCustomVars(themeVars: Record<string, string>): string {
    let result = '';
    for (const key in themeVars) {
      if (Object.prototype.hasOwnProperty.call(themeVars, key)) {
        const val = themeVars[key];
        result += `.${key}{${val}}`;
      }
    }
    return result;
  }

  /**
   * 设置自定义主题测试
   *
   * @param {string} themeTag
   * @param {Record<string, string>} themeVars
   * @memberof CustomThemeUtil
   */
  setCustomThemeParams(
    themeTag: string,
    themeVars: Record<string, string>,
  ): void {
    const themeStyle = document.getElementById(themeTag);
    if (themeStyle) {
      themeStyle.remove();
    }
    const otherContent: IData = {};
    let content = `:root.${themeTag}{`;
    for (const key in themeVars) {
      if (Object.prototype.hasOwnProperty.call(themeVars, key)) {
        if (key.split(':').length === 2) {
          const className = key.split(':')[0];
          const varName = key.split(':')[1];
          const val = themeVars[key];
          if (!otherContent[className]) {
            otherContent[className] = '';
          }
          otherContent[className] +=
            `${varName}: ${val}${val.endsWith(';') ? '' : ';'}`;
        } else {
          const val = themeVars[key];
          content += `${key}: ${val}${val.endsWith(';') ? '' : ';'}`;
        }
      }
    }
    content += '}';
    content += this.transCustomVars(otherContent);
    const script = document.createElement('style');
    script.id = themeTag;
    script.type = 'text/css';
    script.innerHTML = content;
    document.head.appendChild(script);
  }
}
