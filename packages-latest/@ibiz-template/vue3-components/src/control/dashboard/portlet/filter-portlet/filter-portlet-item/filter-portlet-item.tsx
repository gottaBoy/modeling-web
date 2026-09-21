/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  h,
  ref,
  Ref,
  watch,
  computed,
  PropType,
  defineComponent,
  resolveComponent,
} from 'vue';
import {
  IEditorContainerController,
  IEditorController,
  IEditorProvider,
  IFilterNodeField,
  ValueOP,
  getEditorProvider,
} from '@ibiz-template/runtime';
import { useNamespace } from '@ibiz-template/vue3-util';
import './filter-portlet-item.scss';
import { IEditor } from '@ibiz/model-core';

export const FilterPortletItem = defineComponent({
  name: 'IBizFilterPortletItem',
  props: {
    context: {
      type: Object as PropType<IContext>,
      required: true,
    },
    params: {
      type: Object as PropType<IParams>,
      required: true,
    },
    field: {
      type: Object as PropType<IData>,
      required: true,
    },
    filterNode: {
      type: Object as PropType<IFilterNodeField>,
    },
  },
  emits: ['change'],
  setup(props, { emit }) {
    const ns = useNamespace(`filter-portlet-item`);
    // 编辑器适配器
    const editorProvider: Ref<IEditorProvider | undefined> = ref(undefined);
    // 编辑器控制器
    const editor: Ref<IEditorController | undefined> = ref(undefined);
    // 当前数据
    const data: Ref<IFilterNodeField> = ref({
      value: null,
      valueOP: null,
      nodeType: 'FIELD',
      field: props.field.appDEFieldId,
    });
    // 可选操作符
    const valueOPs = computed(() => {
      return ibiz.util.jsonSchema.getValueOPsByDataType(props.field.type);
    });

    /**
     * 获取编辑器
     *
     * @author tony001
     * @date 2024-07-25 17:07:51
     * @param {ValueOP} valueOP
     */
    const getEditor = async (valueOP: ValueOP) => {
      const editorModel = ibiz.util.jsonSchema.getMockEditor(
        props.context,
        props.field,
        valueOP,
      ) as IEditor;
      if (editorModel) {
        editorProvider.value = await getEditorProvider(editorModel);
        if (editorProvider.value) {
          editor.value = await editorProvider.value.createController(
            editorModel,
            {
              context: props.context,
              params: props.params,
            } as IEditorContainerController,
          );
        }
      }
    };

    /**
     * 初始化
     */
    const init = async () => {
      if (props.filterNode) {
        data.value = { ...props.filterNode };
      }
      getEditor(valueOPs.value[0].valueOP);
    };

    watch(
      () => props.filterNode,
      () => {
        init();
      },
      { immediate: true },
    );

    /**
     * 值变更
     *
     * @param {*} value
     */
    const onValueChange = (value: unknown) => {
      data.value.value = value;
      emit('change', data.value);
    };

    /**
     * 值操作模式选择变更
     *
     * @param {ValueOP} valueOP
     */
    const onValueOPSelect = (valueOP: ValueOP) => {
      data.value.valueOP = valueOP;
      onValueChange(null);
      getEditor(valueOP);
    };

    /**
     * 绘制编辑器
     *
     * @return {*}
     */
    const renderEditor = () => {
      if (editor.value) {
        const component = resolveComponent(editorProvider.value!.formEditor);
        return h(component, {
          value: data.value.value,
          controller: editor.value,
          onChange: (val: unknown, _name?: string): void => {
            onValueChange(val);
          },
        });
      }
    };

    /**
     * 绘制内容
     *
     * @return {*}
     */
    const renderContent = () => {
      return (
        <div class={ns.e('content')}>
          <div class={ns.em('content', 'option')}>
            <el-select
              model-value={data.value.valueOP}
              onChange={(valueOP: ValueOP) => {
                onValueOPSelect(valueOP);
              }}
            >
              {valueOPs.value.map((mode: IData) => {
                return (
                  <el-option
                    key={mode.valueOP}
                    value={mode.valueOP}
                    label={mode.label}
                  />
                );
              })}
            </el-select>
          </div>
          <div class={ns.em('content', 'editor')}>{renderEditor()}</div>
        </div>
      );
    };

    return {
      ns,
      renderContent,
    };
  },
  render() {
    return (
      <div class={this.ns.b()}>
        <div class={this.ns.e('header')}>
          <span class={this.ns.em('header', 'caption')}>
            {this.field.caption}
          </span>
        </div>
        {this.renderContent()}
      </div>
    );
  },
});
