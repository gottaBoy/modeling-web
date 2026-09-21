import { IDECalendar } from '@ibiz/model-core';
import { ICalendarEvent } from '../../event';
import { ICalendarItemData, ICalendarState } from '../../state';
import { IMDControlController } from './i-md-control.controller';
import { IApiCalendarController } from '../../../api';
import { IViewController } from '../view';
import { IContextMenuController } from './i-context-menu.controller';
import { IUIActionResult } from '../../../common';

/**
 * @description 日历部件控制器接口
 * @export
 * @interface ICalendarController
 * @extends {IMDControlController<IDECalendar, ICalendarState, ICalendarEvent>}
 * @extends {IApiCalendarController<IDECalendar, ICalendarState>}
 */
export interface ICalendarController
  extends IMDControlController<IDECalendar, ICalendarState, ICalendarEvent>,
    IApiCalendarController<IDECalendar, ICalendarState> {
  /**
   * @description 视图控制器
   * @type {IViewController}
   * @memberof ICalendarController
   */
  view: IViewController;

  /**
   * @description 上下文菜单控制器
   * @type {{ [p: string]: IContextMenuController }}
   * @memberof ICalendarController
   */
  contextMenus: { [p: string]: IContextMenuController };

  /**
   * @description 打开编辑数据视图
   * @param {ICalendarItemData} item
   * @returns {*}  {Promise<IUIActionResult>}
   * @memberof ICalendarController
   */
  openData(item: ICalendarItemData): Promise<IUIActionResult>;
}
