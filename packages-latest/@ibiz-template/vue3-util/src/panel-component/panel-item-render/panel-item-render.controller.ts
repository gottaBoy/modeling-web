import { IControlRender, IPanelContainer } from '@ibiz/model-core';
import {
  PanelItemController,
  ScriptFactory,
  ViewLayoutPanelController,
} from '@ibiz-template/runtime';

/**
 * 面板绘制器控制器
 *
 * @author zk
 * @date 2024-01-15 06:01:08
 * @export
 * @class PanelItemRenderController
 * @extends {PanelItemController<IPanelContainer>}
 */
export class PanelItemRenderController extends PanelItemController<IPanelContainer> {
  /**
   * @description 面板控制器
   * @exposedoc
   * @author lxm
   * @date 2022-08-24 22:08:59
   * @type {PanelController}
   */
  declare panel: ViewLayoutPanelController;

  /**
   * @description 获取面板绘制器自定义html
   * @exposedoc
   * @export
   * @param {IControlRender[]} controlRenders
   * @return {*}  {(string | undefined)}
   */
  getPanelItemCustomHtml(
    controlRenders: IControlRender[],
    data: IData | undefined,
  ): string | undefined {
    if (controlRenders.length === 0) {
      return undefined;
    }
    const controlRender = controlRenders[0];
    if (controlRender.layoutPanelModel) {
      let scriptCode = controlRender.layoutPanelModel;
      // 兼容单行脚本
      if (!scriptCode.includes('return')) {
        scriptCode = `return (${scriptCode})`;
      }
      return ScriptFactory.execScriptFn({ data: data || {} }, scriptCode, {
        isAsync: false,
      }) as string;
    }
  }
}
