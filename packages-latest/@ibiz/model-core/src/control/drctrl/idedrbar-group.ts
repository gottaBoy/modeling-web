import { ILanguageRes } from '../../res/ilanguage-res';
import { ISysImage } from '../../res/isys-image';
import { IModelObject } from '../../imodel-object';

/**
 *
 * 实体数据关系边栏部件分组模型对象接口
 * @export
 * @interface IDEDRBarGroup
 */
export interface IDEDRBarGroup extends IModelObject {
  /**
   * 标题语言系统对象
   *
   * @type {ILanguageRes}
   * 来源  getCapPSLanguageRes
   */
  capLanguageRes?: ILanguageRes;

  /**
   * 标题
   * @type {string}
   * 来源  getCaption
   */
  caption?: string;

  /**
   * 头部前端扩展插件
   *
   * @type {string}
   * 来源  getHeaderPSSysPFPlugin
   */
  headerSysPFPluginId?: string;

  /**
   * 分组图片资源对象
   *
   * @type {ISysImage}
   * 来源  getPSSysImage
   */
  sysImage?: ISysImage;

  /**
   * 隐藏分组
   * @type {boolean}
   * 来源  isHidden
   */
  hidden?: boolean;
}
