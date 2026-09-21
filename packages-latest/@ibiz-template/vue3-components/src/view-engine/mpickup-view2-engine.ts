import { ITreeExpBarController } from '@ibiz-template/runtime';
import { MPickupViewEngine } from './mpickup-view-engine';

/**
 * 多数据选择视图（左右关系）引擎
 *
 * @author zk
 * @date 2023-05-25 03:05:17
 * @export
 * @class MPickupViewEngine
 * @extends {ViewEngineBase}
 */
export class MPickupView2Engine extends MPickupViewEngine {
  /**
   * 树导航栏
   *
   * @readonly
   * @memberof TreeExpViewEngine
   */
  get treeExpBar(): ITreeExpBarController {
    return this.view.getController('treeexpbar') as ITreeExpBarController;
  }

  /**
   * 视图created生命周期执行逻辑
   *
   * @return {*}  {Promise<void>}
   * @memberof PickupView2Engine
   */
  async onCreated(): Promise<void> {
    await super.onCreated();
    const { childNames } = this.view;
    childNames.push('treeexpbar');
    if (!this.view.slotProps.treeexpbar) {
      this.view.slotProps.treeexpbar = {};
    }
    this.view.slotProps.treeexpbar.noNeedNavView = true;
    this.view.slotProps.pickupviewpanel.noLoadDefault = true;
  }

  /**
   * 视图mounted生命周期执行逻辑
   *
   * @return {*}  {Promise<void>}
   * @memberof PickupView2Engine
   */
  async onMounted(): Promise<void> {
    await super.onMounted();
    this.treeExpBar.load();
    this.treeExpBar.evt.on('onNavViewChange', event => {
      this.view.slotProps.pickupviewpanel.context = event.navViewMsg.context;
      this.view.slotProps.pickupviewpanel.params = event.navViewMsg.params;
    });
  }
}
