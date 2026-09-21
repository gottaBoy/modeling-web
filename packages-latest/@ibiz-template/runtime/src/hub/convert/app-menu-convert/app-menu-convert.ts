import { IAppMenu } from '@ibiz/model-core';

/**
 * 应用菜单模型转换器
 *
 * @author chitanda
 * @date 2023-04-19 14:04:38
 * @export
 * @class AppMenuConvert
 */
export class AppMenuConvert {
  /**
   * 转化
   *
   * @author chitanda
   * @date 2023-04-19 14:04:46
   * @param {IAppMenu} appMenu
   * @return {*}  {IAppMenu}
   */
  parse(appMenu: IAppMenu): IAppMenu {
    return appMenu;
  }
}
