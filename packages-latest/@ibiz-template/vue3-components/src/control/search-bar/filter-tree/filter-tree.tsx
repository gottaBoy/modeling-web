/* eslint-disable no-template-curly-in-string */
import {
  IFilterNodeGroup,
  IFilterNodeField,
  IFilterNode,
  SearchBarFilterController,
  SearchBarFilterItemsController,
  ValueOP,
  IFilterNodeItems,
  SearchBarFilterSimpleItemsController,
} from '@ibiz-template/runtime';
import { useNamespace } from '@ibiz-template/vue3-util';
import {
  computed,
  defineComponent,
  h,
  PropType,
  ref,
  resolveComponent,
  watch,
} from 'vue';
import './filter-tree.scss';
import { clearAll } from 'qx-util';

type FieldInfo = {
  name: string;
  label: string;
  valueOPs: string[];
  fieldName: string;
  simpleFilterC?: SearchBarFilterSimpleItemsController;
};

/** 不需要编辑器的OP */
export const ExcludeOPs: string[] = [
  ValueOP.IS_NULL,
  ValueOP.IS_NOT_NULL,
  ValueOP.EXISTS,
  ValueOP.NOT_EXISTS,
] as const;

export const FilterTreeControl = defineComponent({
  name: 'IBizFilterTreeControl',
  props: {
    /**
     * 过滤项控制器集合
     */
    filterControllers: {
      type: Array as PropType<SearchBarFilterController[]>,
      required: true,
    },
    /**
     * 过滤项树节点数据集合
     */
    filterNodes: {
      type: Array as PropType<IFilterNode[]>,
      required: true,
    },
    /**
     * 父容器
     */
    parent: {
      type: String,
      required: true,
    },
    filterMode: {
      type: String as PropType<'default' | 'pql'>,
      default: 'default',
    },
    customCond: {
      type: String,
      default: '',
    },
    context: {
      type: Object as PropType<IContext>,
    },
    params: {
      type: Object as PropType<IParams>,
    },
    schemaEntityMap: {
      type: Object as PropType<Map<string, string | undefined>>,
      default: () => new Map(),
    },
  },
  emits: ['confirm', 'cancel', 'change', 'customCondChange'],
  setup(props, { emit }) {
    // 过滤条件
    const FilterModes = [
      {
        valueOP: ValueOP.EQ,
        label: ibiz.i18n.t('control.searchBar.conditions.eq'),
      },
      {
        valueOP: ValueOP.NOT_EQ,
        label: ibiz.i18n.t('control.searchBar.conditions.not_eq'),
      },
      {
        valueOP: ValueOP.GT,
        label: ibiz.i18n.t('control.searchBar.conditions.gt'),
      },
      {
        valueOP: ValueOP.GT_AND_EQ,
        label: ibiz.i18n.t('control.searchBar.conditions.gt_and_eq'),
      },
      {
        valueOP: ValueOP.LT,
        label: ibiz.i18n.t('control.searchBar.conditions.lt'),
      },
      {
        valueOP: ValueOP.LT_AND_EQ,
        label: ibiz.i18n.t('control.searchBar.conditions.lt_and_eq'),
      },
      {
        valueOP: ValueOP.IS_NULL,
        label: ibiz.i18n.t('control.searchBar.conditions.is_null'),
      },
      {
        valueOP: ValueOP.IS_NOT_NULL,
        label: ibiz.i18n.t('control.searchBar.conditions.is_not_null'),
      },
      {
        valueOP: ValueOP.IN,
        label: ibiz.i18n.t('control.searchBar.conditions.in'),
      },
      {
        valueOP: ValueOP.NOT_IN,
        label: ibiz.i18n.t('control.searchBar.conditions.not_in'),
      },
      {
        valueOP: ValueOP.LIKE,
        label: ibiz.i18n.t('control.searchBar.conditions.like'),
      },
      {
        valueOP: ValueOP.LEFT_LIKE,
        label: ibiz.i18n.t('control.searchBar.conditions.left_like'),
      },
      {
        valueOP: ValueOP.RIGHT_LIKE,
        label: ibiz.i18n.t('control.searchBar.conditions.right_like'),
      },
      {
        valueOP: ValueOP.EXISTS,
        label: ibiz.i18n.t('control.searchBar.conditions.exists'),
      },
      {
        valueOP: ValueOP.NOT_EXISTS,
        label: ibiz.i18n.t('control.searchBar.conditions.not_exists'),
      },
    ] as const;

    const ns = useNamespace('filter-tree');

    // 是否在搜索栏内（该组件可在编辑器内）
    const isInSearchBar = computed(() => {
      return props.parent === 'search-bar';
    });

    // UI实际用的FilterNodes
    const UiFilterNodes = computed(() => {
      return props.filterNodes;
    });

    /**
     * 根据节点数据找到对应的控制器
     * @param node 节点数据
     * @returns
     */
    const findFilterController = (
      node: IFilterNodeField | IFilterNodeItems,
    ) => {
      // simple模式查找控制器
      if (node.nodeType === 'ITEMS' && node.simple) {
        const subNode = node.children[0] as IFilterNodeField;
        return props.filterControllers.find(item => {
          if (item.type === 'SIMPLE_ITEMS') {
            const simpleC = item as SearchBarFilterSimpleItemsController;
            if (
              simpleC.fieldName === node.field &&
              simpleC.valueOP === node.valueOP &&
              simpleC.subFieldName === subNode.field &&
              simpleC.subValueOP === subNode.valueOP
            ) {
              return true;
            }
          }
          return false;
        });
      }

      const { field, valueOP } = node;
      return props.filterControllers.find(item => {
        // 给ITEMS模式排除掉SIMPLE_ITEMS的控制器
        if (item.type === 'SIMPLE_ITEMS') {
          return false;
        }
        if (item.fieldName === field) {
          // 有配属性搜索模式的匹配才是，没配的都是指向没配的哪个过滤项
          return item.valueOP ? item.valueOP === valueOP : true;
        }
        return false;
      });
    };

    const allFields: Array<FieldInfo> = [];

    // !初始化所有属性字段信息
    props.filterControllers.forEach(filterC => {
      let find = allFields.find(x => x.name === filterC.key);
      if (filterC.hidden) {
        return;
      }
      // 没有且不是隐藏的添加进去
      if (find === undefined) {
        find = {
          name: filterC.key,
          fieldName: filterC.fieldName,
          label: filterC.label,
          valueOPs: [],
        };
        if (filterC.type === 'SIMPLE_ITEMS') {
          find.simpleFilterC = filterC as SearchBarFilterSimpleItemsController;
        }

        allFields.push(find);
      }

      // 添加操作符号(没有配置的给全部)
      if (!filterC.valueOP) {
        find.valueOPs = FilterModes.map(item => item.valueOP);
      } else {
        find.valueOPs.push(filterC.valueOP);
      }
    });

    // schema字段列表
    const schemaFields = ref<IData[]>([]);

    allFields.forEach(async field => {
      const filterController = props.filterControllers.find(
        item => item.key === field.name,
      );
      if (!filterController) {
        return;
      }
      schemaFields.value.push({
        appDEFieldId: field.fieldName,
        caption: field.label,
        valueOPs: field.valueOPs,
        appDataEntityId: props.schemaEntityMap.get(field.fieldName),
        appDataEntityFullTag: filterController.appDataEntity?.defullTag,
        appCodeListId: (filterController.model.editor as IData)?.appCodeListId,
      });
    });

    // pql编辑器
    const pqlEditor = ref();

    // 当前过滤模式
    const mode = ref(props.filterMode || 'default');

    // 当前自定义条件
    const currentCustomCond = ref('');

    // 处理自定义条件变化
    const handleCustomCondChange = (value: string) => {
      currentCustomCond.value = value;
      emit('customCondChange', currentCustomCond.value);
    };

    watch(
      () => props.customCond,
      () => {
        currentCustomCond.value = props.customCond;
      },
      { immediate: true },
    );

    /** 获取对应属性的操作符号 */
    const getFilterModes = (
      fieldName: string | null,
      fieldInfos: FieldInfo[] = allFields,
    ) => {
      if (!fieldName) {
        return;
      }
      const field = fieldInfos.find(item => item.name === fieldName);
      if (!field) {
        return;
      }
      return field.valueOPs;
    };

    /**
     * 全局属性选择变更
     * @author lxm
     * @date 2023-10-16 05:02:07
     * @param {IFilterNodeField} node
     * @param {string} field
     */
    const onFieldSelect = (
      node: IFilterNodeField | IFilterNodeItems,
      key: string,
      fields: FieldInfo[] = allFields,
    ) => {
      const fieldInfo = fields.find(item => item.name === key);
      if (!fieldInfo) {
        ibiz.log.error(`allFields找不到属性标识为${key}的`);
        return;
      }
      // 清空数据
      clearAll(node);

      if (fieldInfo.simpleFilterC) {
        fieldInfo.simpleFilterC.addSimpleFilterNode(node);
        return;
      }

      // 设置过滤属性相关默认值
      node.nodeType = 'FIELD';
      node.field = fieldInfo.fieldName;
    };

    /**
     * 值操作模式选择变更
     * @author lxm
     * @date 2023-10-16 05:02:23
     * @param {IFilterNodeField} node
     * @param {string} valueOP
     */
    const onValueOPSelect = (node: IFilterNodeField, valueOP: string) => {
      node.valueOP = valueOP as ValueOP;
      // 修改条件的同时清空后面的值
      node.value = null;

      // 操作父改成存在或者不存在的时候调整参数，变成分组接口
      if (['EXISTS', 'NOTEXISTS'].includes(valueOP)) {
        Object.assign(node, {
          nodeType: 'ITEMS',
          children: [
            { nodeType: 'FIELD', field: null, valueOP: null, value: null },
          ],
        });
      } else {
        Object.assign(node, {
          nodeType: 'FIELD',
          children: undefined,
        });
      }
    };

    /**
     * 过滤分组逻辑类型变更
     * @author lxm
     * @date 2023-10-16 05:05:44
     * @param {IFilterNodeGroup} node
     * @param {('AND' | 'OR')} logicType
     */
    const onGroupLogicTypeChange = (
      node: IFilterNodeGroup,
      logicType: 'AND' | 'OR',
    ) => {
      node.logicType = logicType;
    };

    /**
     * 添加一个过滤组
     * @author lxm
     * @date 2023-10-16 05:02:43
     * @param {IFilterNodeGroup} node
     */
    const addGroup = (node: IFilterNodeGroup) => {
      node.children.push({
        nodeType: 'GROUP',
        logicType: 'AND',
        children: [
          { nodeType: 'FIELD', field: null, valueOP: null, value: null },
        ],
      });
    };

    /**
     * 添加一个过滤项
     * @author lxm
     * @date 2023-10-16 05:02:57
     * @param {IFilterNodeGroup} node
     */
    const addItem = (node: IFilterNodeGroup | IFilterNodeItems) => {
      node.children.push({
        nodeType: 'FIELD',
        field: null,
        valueOP: null,
        value: null,
      });
    };

    /**
     * 绘制编辑器
     * @param node
     * @param filterC
     * @returns
     */
    const renderEditor = (
      node: IFilterNodeField,
      filterC: SearchBarFilterController,
    ) => {
      if (
        filterC.noEditor ||
        (node.valueOP && ExcludeOPs.includes(node.valueOP))
      ) {
        return null;
      }
      let editor = null;

      if (filterC.editorProvider) {
        const { data, value } = filterC.calcEditorProps(node);
        const component = resolveComponent(filterC.editorProvider.formEditor);
        editor = h(component, {
          key: filterC.editor!.model.id,
          value,
          controller: filterC.editor,
          disabled: node.disabled,
          data,
          onChange: (val: unknown, name?: string): void => {
            filterC.onEditorChange(node, val, name);
          },
        });
      } else {
        editor = <not-supported-editor modelData={filterC.model.editor} />;
      }
      return <div class={ns.e('editor')}>{editor}</div>;
    };

    /**
     * 绘制过滤项
     * @param node
     * @returns
     */
    const renderFilterItem = (
      node: IFilterNodeField,
      itemsC?: SearchBarFilterItemsController,
    ) => {
      // 不显示的不绘制
      if (node.hidden) {
        return;
      }
      let fieldInfos = allFields;
      if (itemsC) {
        fieldInfos = itemsC.allFields;
      }
      const availableModes = getFilterModes(node.field, fieldInfos);

      let editor = null;
      if (node.field && node.valueOP) {
        // 当属性和操作符号都选择之后才绘制编辑器
        if (itemsC) {
          // items的时候编辑器由子filterController控制
          const subFilterC = itemsC.getSubFilterController(
            node.field!,
            node.valueOP!,
          );
          editor = renderEditor(node, subFilterC);
        } else {
          const filterC = findFilterController(node);
          if (filterC && !['EXISTS', 'NOTEXISTS'].includes(filterC.valueOP!)) {
            editor = renderEditor(node, filterC);
          }
        }
      }

      return (
        <div class={ns.b('item')}>
          <el-select
            disabled={node.disabled}
            model-value={node.field}
            teleported={false}
            class={ns.e('field-select')}
            onChange={(field: string) => {
              onFieldSelect(node, field, fieldInfos);
            }}
          >
            {fieldInfos?.map(field => {
              return (
                <el-option
                  key={field.name}
                  value={field.name}
                  label={field.label}
                />
              );
            })}
          </el-select>
          {availableModes && availableModes.length > 0 && (
            <iBizFilterModeSelect
              disabled={node.disabled}
              class={ns.e('mode-select')}
              value={node.valueOP}
              modes={availableModes}
              onChange={(valueOP: string) => {
                onValueOPSelect(node, valueOP);
              }}
            ></iBizFilterModeSelect>
          )}
          {editor}
        </div>
      );
    };

    /** 仅占位 */
    let renderFilterItems = (
      _node: IFilterNodeItems,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ): any => <div></div>;

    /**
     * 绘制过滤分组
     * @param node
     * @returns
     */
    const renderFilterGroup = (
      node: IFilterNodeGroup | IFilterNodeItems,
      itemsC?: SearchBarFilterItemsController,
      root?: boolean,
    ) => {
      // 不显示的不绘制
      if (node.hidden) {
        return;
      }
      if (node.nodeType === 'ITEMS') {
        return renderFilterItems(node);
      }

      return (
        <div class={ns.b('group')}>
          <div class={ns.be('group', 'actions')}>
            <el-button
              text
              type='primary'
              onClick={() => {
                if (mode.value === 'pql') {
                  mode.value = 'default';
                  return;
                }
                addGroup(node);
              }}
            >
              {mode.value === 'pql'
                ? ibiz.i18n.t('control.searchBar.filterTree.switchGroup')
                : ibiz.i18n.t('control.searchBar.filterTree.addGroup')}
            </el-button>
            <el-button
              text
              onClick={() => {
                if (mode.value === 'pql') {
                  mode.value = 'default';
                  return;
                }
                addItem(node);
              }}
            >
              {mode.value === 'pql'
                ? ibiz.i18n.t('control.searchBar.filterTree.switchItem')
                : ibiz.i18n.t('control.searchBar.filterTree.addItem')}
            </el-button>
            {root && isInSearchBar.value && (
              <el-button
                text
                onClick={() => {
                  mode.value = 'pql';
                }}
              >
                {ibiz.i18n.t('control.searchBar.filterTree.addPQL')}
              </el-button>
            )}
            <el-select
              model-value={node.logicType}
              teleported={false}
              class={ns.be('group', 'logic-type')}
              onChange={(logicType: 'AND' | 'OR') => {
                mode.value = 'default';
                onGroupLogicTypeChange(node, logicType);
              }}
            >
              <el-option key='AND' value='AND' label='AND' />
              <el-option key='OR' value='OR' label='OR' />
            </el-select>
          </div>
          {mode.value === 'pql' && (
            <div class={ns.be('group', 'editor')}>
              <iBizPqlEditor
                ref='pqlEditor'
                value={currentCustomCond.value}
                fields={schemaFields.value}
                context={props.context}
                params={props.params}
                onChange={handleCustomCondChange}
              ></iBizPqlEditor>
            </div>
          )}
          {mode.value !== 'pql' && (
            <div class={ns.be('group', 'list')}>
              {node.children.length > 0 &&
                node.children.map((child, index) => {
                  const childContent =
                    child.nodeType === 'FIELD'
                      ? renderFilterItem(child, itemsC)
                      : renderFilterGroup(
                          child as IFilterNodeGroup | IFilterNodeItems,
                          itemsC,
                        );

                  // 没有内容的不绘制
                  if (!childContent) {
                    return null;
                  }

                  return (
                    <div class={ns.be('group', 'list-item')}>
                      <div class={ns.be('group', 'list-item-left')}>
                        {node.logicType}
                      </div>
                      {childContent}
                      <iBizIcon
                        class={ns.be('group', 'list-item-right')}
                        onClick={() => {
                          node.children.splice(index, 1);
                        }}
                        icon={{ cssClass: 'trash' }}
                      ></iBizIcon>
                    </div>
                  );
                })}
            </div>
          )}
        </div>
      );
    };

    /**
     * 绘制存在，不存在分组
     * @author lxm
     * @date 2024-03-14 01:13:23
     * @param {IFilterNodeGroup} node
     */
    renderFilterItems = (node: IFilterNodeItems) => {
      const itemsC = findFilterController(
        node,
      ) as SearchBarFilterItemsController;
      if (!itemsC) return;
      // 绘制简单模式
      if (node.simple) {
        const child = node.children[0] as IFilterNodeField | undefined;
        if (!child) {
          return;
        }
        // items的时候编辑器由子filterController控制
        return [
          <el-select
            disabled={child.disabled}
            model-value={itemsC.key}
            teleported={false}
            class={ns.e('field-select')}
            onChange={(field: string) => {
              onFieldSelect(node, field);
            }}
          >
            {allFields.map(field => {
              return (
                <el-option
                  key={field.name}
                  value={field.name}
                  label={field.label}
                />
              );
            })}
          </el-select>,
          <iBizFilterModeSelect
            disabled={true}
            class={ns.e('mode-select')}
            value={child.valueOP}
            modes={[child.valueOP]}
          ></iBizFilterModeSelect>,
          renderEditor(child, itemsC),
        ];
      }

      return (
        <div class={(ns.b('group'), ns.bm('group', 'items'))}>
          <div class={ns.be('group', 'actions')}>
            {renderFilterItem(node as IData as IFilterNodeField)}
            <el-button
              text
              onClick={() => {
                addItem(node);
              }}
            >
              {ibiz.i18n.t('control.searchBar.filterTree.addItem')}
            </el-button>
          </div>
          <div class={ns.be('group', 'list')}>
            {node.children.length > 0 &&
              node.children.map((child, index) => {
                const childContent =
                  child.nodeType === 'FIELD'
                    ? renderFilterItem(child, itemsC)
                    : renderFilterGroup(
                        child as IFilterNodeGroup | IFilterNodeItems,
                        itemsC,
                      );

                return (
                  <div class={ns.be('group', 'list-item')}>
                    <div class={ns.be('group', 'list-item-left')}>AND</div>
                    {childContent}
                    <iBizIcon
                      class={ns.be('group', 'list-item-right')}
                      onClick={() => {
                        node.children.splice(index, 1);
                      }}
                      icon={{ cssClass: 'trash' }}
                    ></iBizIcon>
                  </div>
                );
              })}
          </div>
        </div>
      );
    };

    /**
     * 确认
     */
    const onConfirm = () => {
      if (mode.value === 'pql') {
        if (pqlEditor.value) {
          const result = pqlEditor.value.verify?.();
          if (result) {
            emit('confirm', mode.value, currentCustomCond.value);
          }
        }
        return;
      }
      emit('confirm', mode.value, currentCustomCond.value);
    };

    /**
     * 取消
     */
    const onCancel = () => {
      emit('cancel');
    };

    return {
      ns,
      renderFilterGroup,
      renderFilterItem,
      onConfirm,
      onCancel,
      isInSearchBar,
      UiFilterNodes,
      pqlEditor,
    };
  },
  render() {
    return (
      <div class={[this.ns.b()]}>
        {this.UiFilterNodes.length > 0 &&
          this.UiFilterNodes.map(node => {
            if (node.nodeType === 'FIELD') {
              return this.renderFilterItem(node);
            }
            return this.renderFilterGroup(
              node as IFilterNodeGroup | IFilterNodeItems,
              undefined,
              true,
            );
          })}
        <div class={this.ns.b('footer')}>
          <el-button
            onClick={() => {
              this.onConfirm();
            }}
          >
            {this.isInSearchBar
              ? ibiz.i18n.t('app.search')
              : ibiz.i18n.t('control.common.determine')}
          </el-button>
          <el-button
            onClick={() => {
              this.onCancel();
            }}
          >
            {ibiz.i18n.t('app.reset')}
          </el-button>
        </div>
      </div>
    );
  },
});
