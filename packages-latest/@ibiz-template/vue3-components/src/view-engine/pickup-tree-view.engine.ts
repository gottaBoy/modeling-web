import {
  ViewCallTag,
  ITreeNodeData,
  ViewController,
  IPickupTreeViewState,
  IPickupTreeViewEvent,
  IApiPickupTreeViewCall,
} from '@ibiz-template/runtime';
import { IAppDETreeView } from '@ibiz/model-core';
import { TreeViewEngine } from './tree-view.engine';

export class PickupTreeViewEngine extends TreeViewEngine {
  declare protected view: ViewController<
    IAppDETreeView,
    IPickupTreeViewState,
    IPickupTreeViewEvent
  >;

  /**
   * @description 选中数据
   * @type {IData[]}
   * @memberof PickupTreeViewEngine
   */
  selectData: IData[] = [];

  /**
   * 创建完成
   *
   * @author zk
   * @date 2023-05-26 05:05:35
   * @memberof PickupGridViewEngine
   */
  async onCreated(): Promise<void> {
    super.onCreated();
    if (!this.view.slotProps.tree) {
      this.view.slotProps.tree = {};
    }
    this.view.slotProps.tree.singleSelect = this.view.state.singleSelect;
    this.view.slotProps.tree.checkStrictly = this.view.state.checkStrictly;
    this.initSelectData();
  }

  /**
   * @description 初始化选中数据
   * @protected
   * @memberof PickupTreeViewEngine
   */
  protected initSelectData(): void {
    if (this.view.params.selecteddata) {
      this.selectData = JSON.parse(this.view.params.selecteddata);
      delete this.view.params.selecteddata;
    }
    if (this.view.state.selectedData) {
      this.selectData = [...this.view.state.selectedData];
    }
  }

  /**
   * 挂载完成
   *
   * @author zk
   * @date 2023-05-26 10:05:13
   * @memberof PickupGridViewEngine
   */
  async onMounted(): Promise<void> {
    const { model } = this.view;
    this.xdataControl.evt.on('onSelectionChange', async event => {
      this.view.evt.emit('onSelectionChange', { ...event });
    });
    this.xdataControl.evt.on('onActive', async event => {
      this.view.evt.emit('onDataActive', { ...event });
    });
    // 默认加载
    if (!this.view.state.noLoadDefault && model.loadDefault) {
      this.load();
    }
    this.setSelectedData(this.selectData);
  }

  /**
   * @description 获取所有数据
   * @protected
   * @returns {*}  {ITreeNodeData[]}
   * @memberof PickupTreeViewEngine
   */
  protected getAllData(): ITreeNodeData[] {
    const { state, model } = this.tree;
    const { enableRootSelect, rootVisible, detreeNodes } = model;

    // 先过滤掉不可选中的项
    let items = state.items.filter(item => !item._disableSelect);

    // 只有当根节点不可选且不可见时，才过滤掉根节点
    if (!enableRootSelect && !rootVisible && detreeNodes?.length) {
      const rootNode = detreeNodes.find(node => node.rootNode === true);
      items = items.filter(item => rootNode?.id !== item._nodeId);
    }

    return items;
  }

  async call(
    key: keyof IApiPickupTreeViewCall,
    args: IData | undefined,
  ): Promise<IData | null | undefined> {
    if (key === ViewCallTag.GET_ALL_DATA) {
      return this.getAllData();
    }
    return super.call(key, args);
  }
}
