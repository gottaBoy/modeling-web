/* eslint-disable @typescript-eslint/no-explicit-any */
import { IAppIndexView } from '@ibiz/model-core';
import { IApiIndexViewState } from '../../state';
import { IApiViewController } from './i-api-view.controller';

/**
 * @description 应用首页视图控制器接口
 * @export
 * @interface IApiIndexViewController
 * @extends {IApiViewController<IAppIndexView, IApiIndexViewState>}
 */
export interface IApiIndexViewController
  extends IApiViewController<IAppIndexView, IApiIndexViewState> {}
