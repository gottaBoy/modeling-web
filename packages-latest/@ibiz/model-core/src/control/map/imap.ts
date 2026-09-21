import { IControlContainer } from '../icontrol-container';
import { IControlNavigatable } from '../icontrol-navigatable';
import { IMDAjaxControl } from '../imdajax-control';
import { ILanguageRes } from '../../res/ilanguage-res';

/**
 *
 * 地图部件模型对象基础接口
 * @export
 * @interface IMap
 */
export interface IMap
  extends IMDAjaxControl,
    IControlContainer,
    IControlNavigatable {
  /**
   * 无值显示内容
   * @type {string}
   * 来源  getEmptyText
   */
  emptyText?: string;

  /**
   * 无值内容语言资源
   *
   * @type {ILanguageRes}
   * 来源  getEmptyTextPSLanguageRes
   */
  emptyTextLanguageRes?: ILanguageRes;

  /**
   * 地图样式
   * @description 值模式 [地图样式] {USER：用户自定义、 USER2：用户自定义2 }
   * @type {( string | 'USER' | 'USER2')}
   * 来源  getMapStyle
   */
  mapStyle?: string | 'USER' | 'USER2';
}
