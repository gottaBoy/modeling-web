import { IControl } from './icontrol';

/**
 *
 * @export
 * @interface IAjaxControl
 */
export interface IAjaxControl extends IControl {
  /**
   * 默认加载
   * @type {boolean}
   * @default true
   * 来源  isAutoLoad
   */
  autoLoad?: boolean;

  /**
   * 启用项权限
   * @type {boolean}
   * @default false
   * 来源  isEnableItemPrivilege
   */
  enableItemPrivilege?: boolean;

  /**
   * 显示处理提示
   * @type {boolean}
   * @default true
   * 来源  isShowBusyIndicator
   */
  showBusyIndicator?: boolean;
}
