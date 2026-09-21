import { RuntimeError } from '@ibiz-template/core';
import {
  getControlPanel,
  IControlProvider,
  ITreeController,
  ITreeNodeData,
  ScriptFactory,
  TreeController,
} from '@ibiz-template/runtime';
import { IControlRender, IDETree, IPanel } from '@ibiz/model-core';
import { ElTree } from 'element-plus';
import { createUUID } from 'qx-util';
import { NodeDropType } from 'element-plus/es/components/tree/src/tree.type';
import { cloneDeep, debounce } from 'lodash-es';
import { Ref, watch } from 'vue';

/**
 * 树props接口
 *
 * @export
 * @interface IGridProps
 */
export interface ITreeProps {
  // 模型
  modelData: IDETree;
  // 上下文
  context: IContext;
  // 视图参数
  params: IParams;
  // 适配器
  provider?: IControlProvider;
  // 部件行数据默认激活模式
  mdctrlActiveMode?: number;
  // 是否单选
  singleSelect?: boolean;
  // 是否是导航的
  navigational?: boolean;
  // 默认展开节点
  defaultExpandedKeys?: string[];
  // 在显示复选框的情况下，是否严格的遵循父子不互相关联的做法
  checkStrictly?: boolean;
  // 是否是本地数据模式
  isSimple?: boolean;
  // 本地数据模式data
  data?: Array<ITreeNodeData>;
  // 默认加载
  loadDefault: boolean;
}

/**
 * 根据id查找树节点数据对象
 * @author lxm
 * @date 2023-09-28 03:45:35
 * @export
 * @param {string} key (数据的_uuid 或者 _id)
 * @param {ITreeController} c
 * @return {*}  {(ITreeNodeData | undefined)}
 */
export function findNodeData(
  key: string,
  c: ITreeController,
): ITreeNodeData | undefined {
  const find = c.state.items.find(item => item._id === key);
  if (find) {
    return find;
  }
  return c.state.items.find(item => item._uuid === key);
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function useElTreeUtil(
  treeRef: Ref<InstanceType<typeof ElTree> | null>,
  c: ITreeController,
) {
  const getTreeInstance = () => {
    const elTree = treeRef.value;
    if (!elTree) {
      throw new RuntimeError(ibiz.i18n.t('control.tree.noFoundInstance'));
    }
    return elTree;
  };

  const _updateUI = () => {
    const elTree = treeRef.value;
    if (!elTree) {
      setTimeout(() => {
        _updateUI();
      }, 200);
      return;
    }
    // 设置节点展开
    Object.values(elTree.store.nodesMap).forEach(node => {
      const shouldExpanded = c.state.expandedKeys.includes(node.data._id);
      if (shouldExpanded !== node.expanded) {
        if (shouldExpanded) {
          node.expand();
        } else {
          node.collapse();
        }
      }
    });
    // 设置选中状态。
    if (c.state.singleSelect) {
      treeRef.value!.setCurrentKey(c.state.selectedData[0]?._id || undefined);
    } else {
      // el-tree，会把没选中的反选，且不触发check事件
      elTree.setCheckedKeys(c.state.selectedData.map(item => item._id));
    }
  };

  /**
   * 更新树的UI状态，如选中状态和展开状态。
   * 在树组件的loadData和调用updateKeyChildren之后去更新
   * 加了防抖，所以尽可能多的调用，确保状态 todo
   * @author lxm
   * @date 2023-09-28 03:36:44
   */
  const updateUI = debounce(_updateUI, 500) as typeof _updateUI;

  /**
   * 切换节点的展开
   * @author lxm
   * @date 2023-11-08 03:57:27
   * @param {string} id
   */
  const triggerNodeExpand = (id: string): boolean | undefined => {
    const elTree = getTreeInstance();
    const target = elTree.store.nodesMap[id];
    if (target) {
      if (target.expanded) {
        target.collapse();
        return false;
      }
      target.expand();
      return true;
    }
  };

  return { getTreeInstance, updateUI, triggerNodeExpand };
}

/**
 * 格式化dropType
 * @author lxm
 * @date 2023-12-14 02:13:10
 * @export
 * @param {NodeDropType} dropType
 * @return {*}  {('inner' | 'prev' | 'next')}
 */
export function formatNodeDropType(
  dropType: NodeDropType,
): 'inner' | 'prev' | 'next' {
  switch (dropType) {
    case 'inner':
      return 'inner';
    case 'before':
      return 'prev';
    case 'after':
      return 'next';
    default:
      throw new RuntimeError(
        ibiz.i18n.t('control.tree.noSupported', { dropType }),
      );
  }
}

/**
 * 初始化树数据
 *
 * @export
 * @param {TreeController} c
 * @param {ITreeProps} props
 */
export function useAppTreeBase(c: TreeController, props: ITreeProps): void {
  // 设置默认展开
  if (props.defaultExpandedKeys) {
    c.state.defaultExpandedKeys = props.defaultExpandedKeys;
  }

  // 初始化数据
  const initSimpleData = (): void => {
    if (!props.data) {
      return;
    }
    const root = props.data.find((item: ITreeNodeData) => {
      return (item as IData).isRoot === true;
    });
    if (root) {
      c.state.rootNodes = props.data;
      c.state.items = props.data;
    }
  };

  c.evt.on('onCreated', async () => {
    if (props.isSimple) {
      initSimpleData();
      c.state.isLoaded = true;
    }
  });

  watch(
    () => props.data,
    () => {
      if (props.isSimple) {
        initSimpleData();
      }
    },
    {
      deep: true,
    },
  );
}

/**
 * 根据关系获取当前项的子节点
 *
 * @export
 * @param {TreeController} c
 * @param {IData} modelData
 * @param {IData} curItem
 */
export function findChildItems(
  c: TreeController,
  modelData: IData,
  curItem: IData,
): IData[] {
  const { detreeNodeRSs } = modelData;
  const children: IData[] = [];
  if (!detreeNodeRSs || detreeNodeRSs.length === 0) {
    return children;
  }
  const rss = detreeNodeRSs.filter((_rss: IData) => {
    const temp = c.state.items.find((_item: IData) => {
      return _item._uuid === curItem.data._uuid;
    });

    if (temp) {
      return _rss.parentDETreeNodeId === temp._nodeId?.toLowerCase();
    }
    return false;
  });
  rss.sort((a: IData, b: IData) => {
    return a.ordervalue - b.ordervalue;
  });
  rss.forEach((_rss: IData) => {
    const _children = c.state.items.filter((_item: IData) => {
      return _item._nodeId?.toLowerCase() === _rss.childDETreeNodeId;
    });
    if (_children.length) {
      _children.forEach(child => {
        const temp = cloneDeep(child);
        temp._id = createUUID();
        children.push(temp);
      });
    }
  });
  return children;
}

/**
 * 获取树节点布局面板
 *
 * @param {{
 *       controlRenders?: IControlRender[];
 *     }} control
 * @return {*}  {(IPanel | undefined)}
 */
export function getNodeControlPanel(control: {
  controlRenders?: IControlRender[];
}): IPanel | undefined {
  if (control.controlRenders) {
    // 排除新建节点内容绘制器
    const controlRenders = control.controlRenders.filter(
      item => (item.id || '').split('_')[0] !== 'newnoderender',
    );
    return getControlPanel({ controlRenders });
  }
}

/**
 * 获取新建树节点布局面板
 *
 * @param {{
 *       controlRenders?: IControlRender[];
 *     }} control
 * @return {*}  {(IPanel | undefined)}
 */
export function getNewNodeControlPanel(control: {
  controlRenders?: IControlRender[];
}): IPanel | undefined {
  if (control.controlRenders) {
    // 排除新建节点内容绘制器
    const controlRender = control.controlRenders.find(
      item => (item.id || '').split('_')[0] === 'newnoderender',
    );
    if (!controlRender) return;

    if (
      controlRender.renderType === 'LAYOUTPANEL_MODEL' &&
      controlRender.layoutPanelModel
    ) {
      const layoutPanelModel = ScriptFactory.execScriptFn(
        {},
        controlRender.layoutPanelModel,
        { isAsync: false },
      ) as IPanel;
      return layoutPanelModel;
    }

    if (
      controlRender.renderType === 'LAYOUTPANEL' &&
      controlRender.layoutPanel
    ) {
      return controlRender.layoutPanel;
    }
  }
}

/**
 * @description 树加载更多工具
 * @export
 * @param {(Ref<InstanceType<typeof ElTree> | null>)} treeRef
 * @param {TreeController} c
 * @returns {*}
 */
export function useLoadMoreUtil(
  treeRef: Ref<InstanceType<typeof ElTree> | null>,
  c: TreeController,
): {
  toLoadMoreNode: (parentId: string) => IData;
  addLoadMoreNode: (parentId: string, parentNode: IData) => void;
} {
  // 获取加载更多节点
  const toLoadMoreNode = (parentId: string) => {
    const _loadMoreNodeData = {
      _id: `${parentId}_load_more`,
      _text: ibiz.i18n.t('control.common.loadMore'),
      _leaf: true,
      _disableSelect: true,
      _load_more: true,
    };
    return _loadMoreNodeData;
  };

  // 添加加载更多节点
  const addLoadMoreNode = (parentId: string, parentNode: IData) => {
    if (!treeRef.value || !parentId || !parentNode) {
      return;
    }
    const _loadMoreNodeData = toLoadMoreNode(parentId);
    if (treeRef.value.getNode(_loadMoreNodeData)) {
      treeRef.value.remove(_loadMoreNodeData);
    }
    const infoItems = c.getLoadMoreInfoItems(parentId);
    if (infoItems) {
      // 是否有分页数据没有到达最后一页
      const result = infoItems.some(infoItem => {
        return infoItem.curPage < infoItem.totalPage - 1;
      });
      if (result) {
        treeRef.value.append(_loadMoreNodeData, parentNode);
      }
    }
  };

  return {
    toLoadMoreNode,
    addLoadMoreNode,
  };
}
