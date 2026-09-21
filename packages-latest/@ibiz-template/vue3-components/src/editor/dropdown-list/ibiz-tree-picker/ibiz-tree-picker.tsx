import { ref, Ref, defineComponent, watch, onMounted } from 'vue';
import { recursiveIterate } from '@ibiz-template/core';
import {
  useNamespace,
  getEditorEmits,
  useSemanticNode,
  getDropdownProps,
  useCodeListListen,
} from '@ibiz-template/vue3-util';
import { isArray, isString } from 'lodash-es';
import { CodeListItem } from '@ibiz-template/runtime';
import { DropDownListEditorController } from '../dropdown-list-editor.controller';
import './ibiz-tree-picker.scss';

/**
 * 树形多选（扩展）
 *
 * @description 用于以树形样式呈现选择项，支持搜索过滤、全选、取消全选、全展开及全收起功能，常用于绘制树形结构的代码表数据。基于`下拉列表框（多选）`编辑器进行扩展，编辑器样式代码名称为：TREE_PICKER
 * @primary
 * @editorparams {"name":"showtoolbar","parameterType":"boolean","defaultvalue":"false","description":"是否显示顶部工具栏。默认不显示，若此值为 true，则会在顶部呈现快捷工具栏，该工具栏可用于执行全选、取消全选、全展开以及全收起操作"}
 * @editorparams {"name":"valuetype","parameterType":"string","description":"编辑器的值类型"}
 * @editorparams {name:autoselectfirstoption,parameterType:boolean,defaultvalue:false,description:编辑器无值时，自动选中第一个数据}
 * @ignoreprops autoFocus | overflowMode
 * @ignoreemits blur | focus | enter | infoTextChange
 */
export const IBizTreePicker = defineComponent({
  name: 'IBizTreePicker',
  props: getDropdownProps<DropDownListEditorController>(),
  emits: getEditorEmits(),
  setup(props, { emit }) {
    const ns = useNamespace('tree-picker');
    const c = props.controller;
    const { semanticClass, semanticStyle } = useSemanticNode(c);
    // 子类类名透传
    const childClass = [
      {
        class: semanticClass('editor.toolbar'),
        selector: `.${ns.e('toolbar')}`,
      },
      {
        class: semanticClass('editor.toolbar.item'),
        selector: `.${ns.em('toolbar', 'item')}`,
      },
      {
        class: semanticClass('editor.search'),
        selector: `.${ns.em('search', 'input')}`,
      },
      {
        class: semanticClass('editor.tree'),
        selector: `.${ns.b('tree')}`,
      },
    ];

    // 子类样式透传
    const childStyle = [
      {
        style: semanticStyle('editor.toolbar'),
        selector: `.${ns.e('toolbar')}`,
      },
      {
        style: semanticStyle('editor.toolbar.item'),
        selector: `.${ns.em('toolbar', 'item')}`,
      },
      {
        style: semanticStyle('editor.search'),
        selector: `.${ns.em('search', 'input')}`,
      },
      {
        style: semanticStyle('editor.tree'),
        selector: `.${ns.b('tree')}`,
      },
    ];
    const editorModel = c.model;

    const items: Ref<readonly IData[]> = ref([]);

    /** 树型数据展开的代码表 */
    const codeListItems: Ref<IData[]> = ref([]);

    /** 是否已加载代码表 */
    const isLoadedCodeList = ref(false);

    /** 树数据 */
    const treeNodes: Ref<IData[]> = ref([]);

    /** 展开项 */
    const defaultCheckedKeys = ref<string[]>([]);

    /** 是否正在加载 */
    const isLoading = ref(false);

    /** 代码项值是否为数值 */
    const codeItemValueNumber = ref(false);

    /** 过滤文本 */
    const filterText = ref('');

    /** 树实例 */
    const treeRef = ref();

    /** 是否取消 */
    const isCancel = ref(true);

    /** 全部展开状态 */
    const allExpand = ref(false);

    /** 默认展开节点集合 */
    const expandedKeys = ref<string[]>([]);

    const valueSeparator = c.model.valueSeparator || ',';

    let showToolbar = false;

    if (editorModel.editorParams) {
      const { editorParams } = editorModel;
      if (editorParams.showtoolbar)
        showToolbar = editorParams.showtoolbar === 'true';
    }

    /** 处理节点展开 */
    const handleExpand = (_key: string, state: boolean): void => {
      const treeNode = treeRef.value?.getNode(_key);
      if (treeNode.isLeaf) return;
      if (state) {
        treeNode.expand();
      } else {
        treeNode.collapse();
      }
    };

    // 处理树数据
    const handleTreeNodes = (nodes: readonly IData[]): IData[] => {
      if (nodes.length === 0) {
        return [];
      }
      const list: IData[] = [];
      nodes.forEach((codeItem: IData) => {
        const index = codeListItems.value.findIndex((_item: IData) => {
          return _item.value === codeItem.value;
        });
        if (index === -1) {
          codeListItems.value.push(codeItem);
        }
        const tempObj: IData = {
          label: codeItem.text,
          value: codeItem.value?.toString(),
          color: codeItem?.color,
          textCls: codeItem?.textCls,
          sysImage: codeItem.sysImage,
          disabled: codeItem.disableSelect === true,
          children: [],
        };
        if (codeItem.children && codeItem.children.length > 0) {
          tempObj.children = handleTreeNodes(codeItem.children);
        }
        list.push(tempObj);
      });
      return list;
    };

    /**
     * @description 自动选中第一项
     */
    const autoSelectFirstOption = (): void => {
      const item = items.value[0];
      if (!c.autoSelectFirstOption || props.value || !item) return;
      const selections: string[] = [];
      recursiveIterate(
        { children: [item] },
        _item => {
          selections.push(_item.value);
        },
        { childrenFields: ['children'] },
      );
      emit(
        'change',
        c.model.valueType === 'SIMPLES'
          ? selections
          : selections.join(valueSeparator),
        undefined,
        true,
      );
    };

    /**
     * 加载代码表后续处理
     *
     * @param {readonly} codeList
     * @param {*} CodeListItem
     * @param {*} []
     */
    const afterLoadCodeList = (codeList: readonly CodeListItem[]): void => {
      items.value = [];
      codeListItems.value = [];
      let tempCodeList = codeList;
      if (c.multiple && !tempCodeList.some(item => item.children)) {
        tempCodeList = c.handleCodeListAllItems(tempCodeList);
      }

      items.value = tempCodeList;
      for (let i = 0; i < items.value.length; i++) {
        const _item = items.value[i];
        if (_item.children) {
          treeNodes.value = handleTreeNodes(tempCodeList);
          break;
        }
      }
      autoSelectFirstOption();
    };

    /** 加载代码表数据 */
    const loadCodeList = async (): Promise<void> => {
      if (c.model.appCodeListId) {
        const app = ibiz.hub.getApp(c.context.srfappid);
        const codeListModel = app.codeList.getCodeList(c.model.appCodeListId);
        if (codeListModel) {
          codeItemValueNumber.value =
            codeListModel.codeItemValueNumber || false;
        }
      }
      isLoading.value = true;
      const codeList = await c.loadCodeList(props.data!);
      afterLoadCodeList(codeList);
      isLoadedCodeList.value = true;
      isLoading.value = false;
    };

    watch(
      () => props.value,
      async (newVal, oldVal): Promise<void> => {
        if (newVal) {
          let val: string[] = [];
          // 值从无到有、并且没搜索过的情况
          if (!isLoadedCodeList.value && oldVal === undefined) {
            await loadCodeList();
          }
          if (isArray(newVal)) {
            val = newVal;
          } else if (isString(newVal)) {
            val = newVal.split(valueSeparator);
          }
          defaultCheckedKeys.value = val.filter(_key =>
            codeListItems.value.find(
              (item: IData) => item.value === _key && !item.children,
            ),
          );
        }
      },
      { immediate: true },
    );

    const onChange = (values: IData): void => {
      let selectArr = null;
      if (c.model.valueType === 'SIMPLES') {
        selectArr = values;
      } else {
        selectArr = values.join(valueSeparator);
      }
      emit('change', selectArr);
    };

    /**
     * 自定义节点样式
     * @param data 数据对象
     * @returns
     */
    const customNodeClass = (data: IData): string | null => {
      return data.children.length ? ns.e('branch-node') : null;
    };

    const fn = (data: CodeListItem[] | undefined): void => {
      if (data) afterLoadCodeList(data);
    };

    useCodeListListen(c.model.appCodeListId, c.context.srfappid, fn);

    onMounted(() => {
      loadCodeList();
    });

    const filterNode = (value: string, data: IData): boolean => {
      if (!value) return true;
      return data.label && data.label.includes(value);
    };

    watch(filterText, (val: string) => {
      treeRef.value?.filter(val);
    });

    /** 处理展开切换 */
    const handleExpandSwitch = (state: boolean = true): void => {
      codeListItems.value.forEach((item: IData) => {
        if (item.children && item.children.length > 0) {
          handleExpand(item.value, state);
        }
      });
    };

    /** 全部展开 */
    const onAllExpand = (): void => {
      allExpand.value = true;
      handleExpandSwitch();
    };

    /** 全部收起 */
    const onAllCollapse = (): void => {
      allExpand.value = false;
      handleExpandSwitch(false);
    };

    /** 全部允许 */
    const onAllSelect = (): void => {
      const checkedKeys = codeListItems.value?.map((item: IData) => item.value);
      handleExpandSwitch(allExpand.value);
      treeRef.value?.setCheckedKeys(checkedKeys);
      onChange(checkedKeys);
    };

    /** 全部禁止 */
    const onAllCancel = (): void => {
      handleExpandSwitch(allExpand.value);
      treeRef.value?.setCheckedKeys([]);
      onChange([]);
    };

    /** 处理复选框选中 */
    const onCheck = (...args: IData[]): void => {
      if (args[1]) {
        const { checkedKeys, halfCheckedKeys } = args[1];
        // 合并两个数组
        const combinedKeys = [...halfCheckedKeys, ...checkedKeys];
        const filterArr = combinedKeys.filter((value, index, self) => {
          return self.indexOf(value) === index;
        });
        onChange(filterArr);
      }
    };

    /** 处理节点展开 */
    const onNodeExpand = (...args: IData[]): void => {
      if (args[0] && args[0].value) {
        expandedKeys.value.push(args[0].value);
      }
    };

    /** 处理节点收起 */
    const onNodeCollapse = (...args: IData[]): void => {
      if (args[0] && args[0].value) {
        const index = expandedKeys.value.findIndex(
          _key => args[0].value === _key,
        );
        if (index !== -1) {
          expandedKeys.value.splice(index, 1);
        }
      }
    };

    return {
      ns,
      c,
      items,
      treeRef,
      isCancel,
      treeNodes,
      filterText,
      childClass,
      childStyle,
      showToolbar,
      expandedKeys,
      semanticClass,
      semanticStyle,
      defaultCheckedKeys,
      onCheck,
      filterNode,
      onAllExpand,
      onAllSelect,
      onAllCancel,
      onNodeExpand,
      onAllCollapse,
      onNodeCollapse,
      customNodeClass,
    };
  },

  render() {
    const isReadonly = this.readonly || this.disabled;

    const content = [
      <div class={this.ns.e('search')}>
        <el-input
          v-model={this.filterText}
          class={this.ns.em('search', 'input')}
          placeholder={this.c.placeHolder || ' '}
        />
      </div>,
      <div class={[this.ns.e('tree')]}>
        <el-tree
          ref={'treeRef'}
          class={this.ns.b('tree')}
          data={this.treeNodes}
          node-key='value'
          props={{
            children: 'children',
            label: 'label',
            class: this.customNodeClass,
          }}
          show-checkbox={!isReadonly}
          default-checked-keys={this.defaultCheckedKeys}
          default-expanded-keys={this.expandedKeys}
          filter-node-method={this.filterNode}
          onNodeExpand={this.onNodeExpand}
          onNodeCollapse={this.onNodeCollapse}
          onCheck={this.onCheck}
        >
          {{
            default: ({ data }: { data: IData }) => {
              return (
                <div
                  class={[
                    this.ns.be('tree', 'node'),
                    this.semanticClass('editor.tree.node'),
                  ]}
                  style={this.semanticStyle('editor.tree.node')}
                >
                  {data.label}
                </div>
              );
            },
          }}
        </el-tree>
      </div>,
    ];

    if (!isReadonly && this.showToolbar) {
      content.unshift(
        ...[
          <div class={[this.ns.e('header'), this.ns.e('toolbar')]}>
            <el-button
              type='primary'
              class={this.ns.em('toolbar', 'item')}
              onClick={this.onAllSelect}
            >
              {ibiz.i18n.t('editor.treePicker.allowAll')}
            </el-button>
            <el-button
              type='primary'
              class={this.ns.em('toolbar', 'item')}
              onClick={this.onAllCancel}
            >
              {ibiz.i18n.t('editor.treePicker.allProhibited')}
            </el-button>
            <el-button
              type='primary'
              class={this.ns.em('toolbar', 'item')}
              onClick={this.onAllExpand}
            >
              {ibiz.i18n.t('editor.treePicker.expandAll')}
            </el-button>
            <el-button
              type='primary'
              class={this.ns.em('toolbar', 'item')}
              onClick={this.onAllCollapse}
            >
              {ibiz.i18n.t('editor.treePicker.collapseAll')}
            </el-button>
          </div>,
        ],
      );
    }

    return (
      <div
        style={this.semanticStyle('editor.root')}
        class={[this.ns.b(), this.semanticClass('editor.root')]}
        v-child-class={this.childClass}
        v-child-style={this.childStyle}
      >
        {content}
      </div>
    );
  },
});
