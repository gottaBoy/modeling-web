import { IAppMenuItem } from '@ibiz/model-core';
import { IAppMenuController } from '../controller';

/**
 * 应用菜单项适配器的接口
 *
 * @author lxm
 * @date 2022-10-25 13:10:45
 * @export
 * @interface IAppMenuItemProvider
 */
export interface IAppMenuItemProvider {
  /**
   * @description 执行菜单项点击
   * @param {IAppMenuItem} menuItem
   * @param {MouseEvent} event
   * @param {IAppMenuController} [AppMenuController]
   * @returns {*}  {Promise<void>}
   * @memberof IAppMenuItemProvider
   */
  onClick?(
    menuItem: IAppMenuItem,
    event: MouseEvent,
    AppMenuController?: IAppMenuController,
  ): Promise<void>;

  /**
   * 绘制菜单项文本
   * @author lxm
   * @date 2023-12-29 03:05:22
   * @param {IAppMenuItem} menuItem
   * @param {IAppMenuController} AppMenuController
   * @return {*}  {*}
   */
  renderText?(
    menuItem: IAppMenuItem,
    AppMenuController?: IAppMenuController,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ): any;
}
