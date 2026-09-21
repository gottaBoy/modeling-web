import { computed, defineComponent } from 'vue';
import {
  useNamespace,
  getEditorEmits,
  useFocusAndBlur,
  useSemanticNode,
  getCheckboxProps,
  useAutoFocusBlur,
} from '@ibiz-template/vue3-util';
import { CheckBoxEditorController } from '../check-box-editor.controller';
import './ibiz-checkbox.scss';

/**
 * 选项框
 *
 * @description 使用el-checkbox组件，两种相互对立的状态间的切换，呈现样式为复选框。支持编辑器类型包含：`选项框`
 * @primary
 * @editorparams {name:selectvalue,parameterType:number | string,defaultvalue:1,description:该参数用于设置复选框被选中时所对应的值。当复选框状态为选中时，组件会将此值作为选中状态的值进行处理}
 * @editorparams {name:nullvalue,parameterType:number | string,defaultvalue:0,description:该参数用于设置复选框未被选中时所对应的值。当复选框状态为未选中时，组件会将此值作为未选中状态的值进行处理}
 * @editorparams {"name":"readonly","parameterType":"boolean","defaultvalue":false,"description":"设置编辑器是否为只读态"}
 * @ignoreprops autoFocus | overflowMode
 * @ignoreemits blur | focus | enter | infoTextChange
 */
export const IBizCheckbox = defineComponent({
  name: 'IBizCheckbox',
  props: getCheckboxProps<CheckBoxEditorController>(),
  emits: getEditorEmits(),
  setup(props, { emit }) {
    const ns = useNamespace('checkbox');

    const c = props.controller;
    const { semanticClass, semanticStyle } = useSemanticNode(c);
    const editorModel = c.model;

    let selectValue = 1;

    let nullValue = 0;

    if (editorModel.editorParams?.selectValue) {
      selectValue = editorModel.editorParams.selectValue;
    }
    if (editorModel.editorParams?.selectvalue) {
      selectValue = editorModel.editorParams.selectvalue;
    }
    if (editorModel.editorParams?.nullValue) {
      nullValue = editorModel.editorParams.nullValue;
    }
    if (editorModel.editorParams?.nullvalue) {
      nullValue = editorModel.editorParams.nullvalue;
    }

    // 是否显示表单默认内容
    const showFormDefaultContent = computed(() => {
      if (
        props.controlParams &&
        props.controlParams.editmode === 'hover' &&
        !props.readonly
      ) {
        return true;
      }
      return false;
    });

    const { useInFocusAndBlur, useInValueChange } = useAutoFocusBlur(
      props,
      emit,
    );

    // 当前值
    const currentVal = computed({
      get() {
        // eslint-disable-next-line eqeqeq
        if (props.value == selectValue) {
          return true;
        }
        return false;
      },
      set(val: boolean) {
        let value;
        if (val) {
          value = selectValue;
        } else {
          value = nullValue;
        }
        emit('change', value);
        useInValueChange();
      },
    });

    // 聚焦失焦事件
    const { componentRef: editorRef } = useFocusAndBlur(
      () => emit('focus'),
      () => useInFocusAndBlur(),
    );

    return {
      ns,
      editorRef,
      currentVal,
      editorModel,
      semanticClass,
      semanticStyle,
      showFormDefaultContent,
    };
  },
  render() {
    return (
      <div
        class={[
          this.ns.b(),
          this.semanticClass('editor.root'),
          this.ns.is('show-default', this.showFormDefaultContent),
        ]}
        ref='editorRef'
        style={this.semanticStyle('editor.root')}
      >
        <el-checkbox
          class={[this.ns.e('content'), this.semanticClass('editor.content')]}
          style={this.semanticStyle('editor.content')}
          v-model={this.currentVal}
          disabled={this.disabled || this.readonly}
          {...this.$attrs}
        ></el-checkbox>
      </div>
    );
  },
});
