import { IViewLayoutPanel } from '@ibiz/model-core';
import { IApiPanelController } from './i-api-panel.controller';
import { IApiViewLayoutPanelState } from '../../state';

/**
 * 视图布局面板
 * @description 解析视图的树型结构布局模型，按照层级关系逐级渲染视图内容，确保布局模型与视图渲染内容完全一致。
 * @primary
 * @export
 * @interface IApiViewLayoutPanelController
 * @extends {IApiPanelController}
 */
export interface IApiViewLayoutPanelController<
  T extends IViewLayoutPanel = IViewLayoutPanel,
  S extends IApiViewLayoutPanelState = IApiViewLayoutPanelState,
> extends IApiPanelController<T, S> {}
