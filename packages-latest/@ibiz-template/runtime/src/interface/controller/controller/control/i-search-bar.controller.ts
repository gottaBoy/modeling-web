import { ISearchBar } from '@ibiz/model-core';
import { ISearchBarEvent } from '../../event';
import { ISearchBarState } from '../../state';
import { IControlController } from './i-control.controller';
import { IApiSearchBarController } from '../../../api';
import { IViewController } from '../view';

/**
 * @description 搜索栏控制器接口
 * @export
 * @interface ISearchBarController
 * @extends {IControlController<ISearchBar, ISearchBarState, ISearchBarEvent>}
 * @extends {IApiSearchBarController<ISearchBar, ISearchBarState>}
 */
export interface ISearchBarController
  extends IControlController<ISearchBar, ISearchBarState, ISearchBarEvent>,
    IApiSearchBarController<ISearchBar, ISearchBarState> {
  /**
   * @description 视图控制器
   * @type {IViewController}
   * @memberof ISearchBarController
   */
  view: IViewController;

  /**
   * @description 有默认选中分组
   * @type {boolean}
   * @memberof ISearchBarController
   */
  hasDefaultSelect: boolean;

  /**
   * @description 设置默认选中
   * @memberof ISearchBarController
   */
  setDefaultSelect(): void;
}
