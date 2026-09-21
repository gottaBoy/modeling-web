import {
  getAllPanelField,
  IPanelController,
  IPanelDataContainerController,
  IPanelItemContainerController,
  IPanelItemController,
  isDataContainer,
  PanelData,
  PanelNotifyState,
} from '@ibiz-template/runtime';
import { IPanelContainer, IPanelItem, IPanelTabPanel } from '@ibiz/model-core';
import { MultiDataContainerItemState } from './multi-data-container-itm.state';
import { MultiDataContainerController } from './multi-data-container.controller';

/**
 * 多项数据容器每一个数据项的控制器
 * @author lxm
 * @date 2023-09-05 05:04:01
 * @export
 * @class MultiDataContainerItemController
 * @extends {PanelItemController<IPanelContainer>}
 * @implements {IPanelDataContainerController}
 */
export class MultiDataContainerItemController
  implements IPanelDataContainerController
{
  state = new MultiDataContainerItemState();

  readonly isDataContainer = true;

  get data(): IData {
    return this.state.data;
  }

  /**
   * 所有面板成员的控制器
   *
   * @author lxm
   * @date 2022-08-24 20:08:07
   * @type {{ [key: string]: IPanelItemController }}
   */
  panelItems: { [key: string]: IPanelItemController } = {};

  /**
   * Creates an instance of PanelItemController.
   * @author lxm
   * @date 2023-04-27 06:37:12
   * @param {T} model 面板成员模型
   * @param {PanelController} panel 面板控制器
   * @param {PanelItemController} [parent] 父容器控制器
   */
  constructor(
    public readonly model: IPanelContainer,
    public readonly panel: IPanelController,
    public readonly parent: MultiDataContainerController,
    data: PanelData,
  ) {
    this.state.data = data;

    const fields = getAllPanelField(this.model);
    const fieldKeys = fields.map(item => item.id!);

    // 面板属性变更的触发变更通知
    data._evt.on('change', key => {
      if (fieldKeys.includes(key)) {
        this.childDataChangeNotify([key]);
      }
    });
  }

  /**
   * 值校验
   *
   * @return {*}  {Promise<boolean>}
   * @memberof MultiDataContainerItemController
   */
  async validate(): Promise<boolean> {
    const values = await Promise.all(
      Object.values(this.panelItems).map(item => item.validate()),
    );
    return values.every(value => value);
  }

  /**
   * 初始化方法
   * @author lxm
   * @date 2023-09-05 05:48:53
   * @return {*}  {Promise<void>}
   */
  async init(): Promise<void> {
    await this.initChildrenController();
  }

  /**
   * 初始化面板成员控制器
   *
   * @author lxm
   * @date 2022-08-24 21:08:48
   * @protected
   */
  protected async initChildrenController(
    panelItems: IPanelItem[] | undefined = this.model.panelItems,
    panel: IPanelController = this.panel,
    parent: IPanelItemContainerController | undefined = this,
  ): Promise<void> {
    if (!panelItems) {
      return;
    }
    await Promise.all(
      panelItems.map(async panelItem => {
        // 生成面板成员控制器
        const panelItemProvider = this.parent.providers[panelItem.id!];
        if (!panelItemProvider) {
          return;
        }
        const panelItemController = await panelItemProvider.createController(
          panelItem,
          panel,
          parent,
        );
        this.panelItems[panelItem.id!] = panelItemController;
        // 有子成员的,且不是数据容器的。生成子控制器
        if (
          (panelItem as IPanelContainer).panelItems?.length &&
          !isDataContainer(panelItem)
        ) {
          await this.initChildrenController(
            (panelItem as IPanelContainer).panelItems,
            panel,
            panelItemController as IPanelItemContainerController,
          );
        } else if ((panelItem as IPanelTabPanel).panelTabPages?.length) {
          await this.initChildrenController(
            (panelItem as IPanelTabPanel).panelTabPages,
            panel,
            panelItemController as IPanelItemContainerController,
          );
        }
      }),
    );
  }

  async dataChangeNotify(_names: string[]): Promise<void> {
    // 不需要实现
  }

  async childDataChangeNotify(names: string[]): Promise<void> {
    Object.values(this.panelItems).forEach(panelItem => {
      panelItem.dataChangeNotify(names);
    });
  }

  async panelStateNotify(state: PanelNotifyState): Promise<void> {
    Object.values(this.panelItems).forEach(panelItem => {
      panelItem.panelStateNotify(state);
    });
  }

  async setDataValue(name: string, value: unknown): Promise<void> {
    if (
      Object.prototype.hasOwnProperty.call(this.state.data, name) &&
      this.state.data[name] === value
    ) {
      // *`面板里没有属性${name}或者${name}的值未发生改变`
      return;
    }

    // 改变值
    this.state.data[name] = value;
    this.childDataChangeNotify([name]);
  }

  destroy(): void {
    this.data.destroy?.();
    Object.values(this.panelItems).forEach(item => {
      item.destroy();
    });
  }
}
