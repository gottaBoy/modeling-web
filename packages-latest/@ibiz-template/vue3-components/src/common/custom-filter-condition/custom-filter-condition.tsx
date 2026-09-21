import {
  PropType,
  defineComponent,
  h,
  ref,
  resolveComponent,
  watch,
} from 'vue';
import { useNamespace } from '@ibiz-template/vue3-util';
import { createUUID } from 'qx-util';
import { IEditor } from '@ibiz/model-core';
import {
  IEditorContainerController,
  ValueOP,
  getEditorProvider,
} from '@ibiz-template/runtime';
import { IField, IFilterCondition } from '../../interface';
import './custom-filter-condition.scss';

export const IBizCustomFilterCondition = defineComponent({
  name: 'IBizCustomFilterCondition',
  props: {
    value: {
      type: Object as PropType<IData>,
    },
    context: {
      type: Object as PropType<IContext>,
      required: true,
    },
    params: {
      type: Object as PropType<IParams>,
    },
    schemaFields: {
      type: Array as PropType<IData[]>,
      default: () => [],
    },
  },
  emits: ['change'],
  setup(props, { emit }) {
    const ns = useNamespace('custom-filter-condition');

    // 属性字段
    const fields = ref<IField[]>([]);

    // 属性字段映射
    const fieldMap = ref<Map<string, IField>>(new Map());

    // 条件项
    const items = ref<IFilterCondition[]>([]);

    // 初始化项编辑器
    const initItemEditor = async (item: IFilterCondition) => {
      item.editorProvider = undefined;
      item.editor = undefined;
      const field = fieldMap.value.get(item.field);
      if (!field || !item.valueOP || !props.context) {
        return;
      }
      const editorModel = ibiz.util.jsonSchema.getMockEditor(
        props.context,
        field,
        item.valueOP as ValueOP,
      ) as IEditor;
      if (!editorModel) {
        return;
      }
      const editorProvider = await getEditorProvider(editorModel);
      if (editorProvider) {
        item.editorProvider = editorProvider;
        const editorController = await editorProvider.createController(
          editorModel,
          {
            context: props.context,
            params: props.params,
          } as IEditorContainerController,
        );
        item.editor = editorController;
      }
    };

    // 转换值
    const transformValue = async () => {
      if (!props.value) {
        items.value = [];
        return;
      }
      const conditionList = props.value.searchconds;
      if (Array.isArray(conditionList) && conditionList.length) {
        items.value = await Promise.all(
          conditionList.map(async (condition: IData) => {
            const field = condition.fieldname || '';
            const valueOP = condition.condop || '';
            const value = condition.value;
            const item: IFilterCondition = {
              key: createUUID(),
              field,
              valueOP,
              value,
            };
            await initItemEditor(item);
            return item;
          }),
        );
        return;
      }
      items.value = [];
    };

    // 初始化属性字段
    const init = async () => {
      if (Array.isArray(props.schemaFields)) {
        fields.value = props.schemaFields.map(item => {
          return {
            ...item,
            valueOPs: item.type
              ? ibiz.util.jsonSchema.getValueOPsByDataType(item.type)
              : [],
          };
        }) as IField[];
        fields.value.forEach(item => {
          fieldMap.value.set(item.appDEFieldId, item);
        });
        await transformValue();
      }
    };

    watch(
      () => props.schemaFields,
      () => {
        init();
      },
      { immediate: true },
    );

    watch(
      () => props.value,
      () => {
        transformValue();
      },
      {
        immediate: true,
      },
    );

    // 处理值变更
    const handleValueChange = () => {
      if (!items.value.length) {
        emit('change', undefined);
        return;
      }
      const searchconds: IData = {
        condop: 'AND',
        condtype: 'GROUP',
        searchconds: [],
      };
      items.value.forEach(item => {
        searchconds.searchconds.push({
          condtype: 'DEFIELD',
          fieldname: item.field,
          condop: item.valueOP,
          value: item.value,
        });
      });
      emit('change', searchconds);
    };

    // 处理项添加
    const handleAdd = async () => {
      let filterItem = fields.value;
      if (items.value.length) {
        const set = new Set();
        items.value.forEach(condition => {
          set.add(condition.field);
        });
        filterItem = fields.value.filter(field => !set.has(field.appDEFieldId));
        if (!filterItem.length) {
          filterItem = fields.value;
        }
      }
      const item = {
        key: createUUID(),
        field: filterItem[0]?.appDEFieldId || '',
        valueOP: filterItem[0]?.valueOPs?.[0]?.valueOP || '',
      };
      await initItemEditor(item);
      items.value.push(item);
      handleValueChange();
    };

    // 处理项删除
    const handleRemove = (index: number) => {
      items.value.splice(index, 1);
      handleValueChange();
    };

    // 渲染编辑器
    const renderEditor = (item: IFilterCondition) => {
      if (!item.valueOP) {
        return null;
      }
      if (item.editorProvider && item.editor) {
        const component = resolveComponent(item.editorProvider.formEditor);
        return h(component, {
          value: item.value,
          controller: item.editor,
          data: {},
          onChange: (val: unknown) => {
            item.value = val;
            handleValueChange();
          },
        });
      }
    };

    // 处理属性字段变更
    const handleFieldChange = async (item: IFilterCondition) => {
      const field = fieldMap.value.get(item.field);
      item.valueOP = field?.valueOPs?.[0]?.valueOP || '';
      item.value = undefined;
      await initItemEditor(item);
      handleValueChange();
    };

    // 处理操作符变更
    const handleValueOPChange = async (item: IFilterCondition) => {
      item.value = undefined;
      await initItemEditor(item);
      handleValueChange();
    };

    return {
      ns,
      fields,
      fieldMap,
      items,
      handleAdd,
      handleRemove,
      renderEditor,
      handleFieldChange,
      handleValueOPChange,
    };
  },
  render() {
    return (
      <div class={this.ns.b()}>
        <div class={this.ns.b('content')}>
          {this.items.map((item, i) => {
            return (
              <div class={this.ns.b('item')}>
                <div class={this.ns.b('item-header')}>
                  <div class={this.ns.b('item-header-text')}>
                    {ibiz.i18n.t(
                      'control.dashboard.filterPortletDesign.queryConditions',
                    )}
                    ({i + 1})
                  </div>
                  <div
                    class={this.ns.b('item-header-btn')}
                    onClick={() => this.handleRemove(i)}
                  >
                    <svg
                      viewBox='0 0 16 16'
                      xmlns='http://www.w3.org/2000/svg'
                      height='1em'
                      width='1em'
                      preserveAspectRatio='xMidYMid meet'
                      focusable='false'
                    >
                      <g stroke-width='1' fill-rule='evenodd'>
                        <path d='M4.002 3.403V1a1 1 0 0 1 1-1h6.003a1 1 0 0 1 1 1v2.403h3.396a.6.6 0 1 1 0 1.2h-1.395V15a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4.603H.6a.6.6 0 1 1 0-1.2h3.4zm8.804 1.205H3.2V14.8h9.605V4.608zM5.202 1.2v2.155h5.603V1.2H5.202zm.6 6.417a.6.6 0 0 1 1.201 0v4.758a.6.6 0 0 1-1.2 0V7.617zm3.202 0a.6.6 0 0 1 1.2 0v4.758a.6.6 0 0 1-1.2 0V7.617z'></path>
                      </g>
                    </svg>
                  </div>
                </div>
                <div class={this.ns.b('item-content')}>
                  <div class={this.ns.be('item', 'field')}>
                    <el-select
                      v-model={item.field}
                      onChange={() => {
                        this.handleFieldChange(item);
                      }}
                    >
                      {this.fields.map(field => {
                        return (
                          <el-option
                            key={field.appDEFieldId}
                            value={field.appDEFieldId}
                            label={field.caption}
                          />
                        );
                      })}
                    </el-select>
                  </div>
                  <div class={this.ns.be('item', 'valueOP')}>
                    <el-select
                      v-model={item.valueOP}
                      onChange={() => {
                        this.handleValueOPChange(item);
                      }}
                    >
                      {this.fieldMap.get(item.field)?.valueOPs?.map(op => {
                        return (
                          <el-option
                            key={op.valueOP}
                            value={op.valueOP}
                            label={op.label}
                          />
                        );
                      })}
                    </el-select>
                  </div>
                  <div class={this.ns.be('item', 'editor')}>
                    {this.renderEditor(item)}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div class={this.ns.b('footer')}>
          <div class={this.ns.b('footer-btn')} onClick={this.handleAdd}>
            <svg
              class={this.ns.be('footer-btn', 'icon')}
              viewBox='0 0 16 16'
              xmlns='http://www.w3.org/2000/svg'
              height='1em'
              width='1em'
              preserveAspectRatio='xMidYMid meet'
              focusable='false'
            >
              <g stroke-width='1' fill-rule='evenodd'>
                <path d='M8.578 7.383V1.602a.601.601 0 1 0-1.2 0v5.781H1.6a.601.601 0 0 0 0 1.203h5.777v5.812a.601.601 0 1 0 1.2 0V8.586H14.4a.601.601 0 0 0 0-1.203H8.578z'></path>
              </g>
            </svg>
            <div class={this.ns.be('footer-btn', 'text')}>
              {ibiz.i18n.t(
                'control.dashboard.filterPortletDesign.addQueryConditions',
              )}
            </div>
          </div>
        </div>
      </div>
    );
  },
});
