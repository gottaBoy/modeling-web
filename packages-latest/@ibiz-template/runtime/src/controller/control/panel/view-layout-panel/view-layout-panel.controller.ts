import {
  IPanelContainer,
  IPanelItem,
  IViewLayoutPanel,
} from '@ibiz/model-core';
import {
  IViewLayoutPanelState,
  IViewLayoutPanelEvent,
  IViewLayoutPanelController,
} from '../../../../interface';
import { PanelController } from '../panel/panel.controller';

/**
 * 视图布局面板部件控制器
 *
 * @author lxm
 * @date 2022-09-08 20:09:55
 * @export
 * @class ViewLayoutPanelController
 * @extends {ControlController<ViewLayoutPanelModel>}
 */
export class ViewLayoutPanelController
  extends PanelController<
    IViewLayoutPanel,
    IViewLayoutPanelState,
    IViewLayoutPanelEvent
  >
  implements IViewLayoutPanelController
{
  protected async onCreated(): Promise<void> {
    this.preprocessModel();
    await super.onCreated();

    if (this.scheduler?.hasControlEventTrigger) {
      // 监听部件事件触发部件事件触发器
      this.evt.on('onControlEvent', event => {
        this.scheduler!.triggerControlEvent(
          event.triggerControlName,
          event.triggerEventName,
          event.triggerEvent,
        );
      });
    }
  }

  protected registerToCtx(): void {
    // 视图布局面板不注册
  }

  /**
   * 预处理面板模型
   * @author lxm
   * @date 2023-06-27 06:57:57
   * @param {IPanelContainer} [container]
   */
  preprocessModel(container?: IPanelContainer): void {
    // 生成新的成员数组，把引用部件那层删掉，他的子展开到他原来的位置。
    const getNewArr = (items: IPanelItem[]): IPanelItem[] => {
      const children: IPanelItem[] = [];
      items.forEach(item => {
        if (
          item.itemType === 'CONTAINER' &&
          (item as IPanelContainer).predefinedType === 'PANELPART'
        ) {
          children.push(...((item as IPanelContainer).panelItems || []));
        } else {
          children.push(item);
        }
      });
      // 过滤深层的子成员
      children.forEach(item => {
        if (item.itemType === 'CONTAINER') {
          this.preprocessModel(item);
        }
      });
      return children;
    };

    // 面板和面板容器子成员数组调整
    if (!container) {
      if (this.model.rootPanelItems?.length) {
        this.model.rootPanelItems = getNewArr(this.model.rootPanelItems || []);
      }
    } else {
      container.panelItems = getNewArr(container.panelItems || []);
    }
  }
}
