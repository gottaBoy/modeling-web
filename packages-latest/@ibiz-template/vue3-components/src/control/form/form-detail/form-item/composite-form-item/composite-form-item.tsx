import { defineComponent, h, PropType, ref, resolveComponent } from 'vue';
import { IDEFormItem } from '@ibiz/model-core';
import { FormItemController } from '@ibiz-template/runtime';

export const CompositeFormItem = defineComponent({
  name: 'IBizCompositeFormItem',
  props: {
    modelData: {
      type: Object as PropType<IDEFormItem>,
      required: true,
    },
    controller: {
      type: FormItemController,
      required: true,
    },
    attrs: {
      type: Object as PropType<IData>,
      required: false,
    },
  },
  setup(props) {
    const c = props.controller;
    const onValueChange = (val: unknown, name?: string): void => {
      props.controller.setDataValue(val, name);
    };

    // 额外参数
    const extraParams = ref({});

    // 是否隐藏无值的单位
    let emptyHiddenUnit = ibiz.config.form.emptyHiddenUnit;
    const emptyhiddenunit =
      props.controller.form?.controlParams?.emptyhiddenunit;

    if (emptyhiddenunit) {
      emptyHiddenUnit = Object.is(emptyhiddenunit, 'true');
    }

    // 编辑器参数优先级最高
    const editorParams = props.controller.editor?.model?.editorParams || {};
    const { EMPTYHIDDENUNIT } = editorParams;

    if (EMPTYHIDDENUNIT) {
      emptyHiddenUnit = Object.is(EMPTYHIDDENUNIT, 'true');
    }

    Object.assign(extraParams.value, {
      emptyHiddenUnit,
    });

    return { c, extraParams, onValueChange };
  },
  render() {
    if (
      !this.c.state.visible ||
      this.controller.model.editor?.editorType === 'HIDDEN'
    ) {
      return null;
    }

    // 编辑器内容
    let editor = null;
    const editMode = this.controller.editor?.model?.editorParams?.editMode;
    const editorProps = {
      style: this.controller.editor?.style,
      value: this.controller.value,
      data: this.controller.data,
      controller: this.controller.editor,
      disabled: this.controller.state.disabled,
      readonly: this.controller.state.readonly,
      onChange: this.onValueChange,
      extraParams: this.extraParams,
      controlParams: editMode
        ? { ...this.controller.form.controlParams, editmode: editMode }
        : this.controller.form.controlParams,
      onFocus: (event: MouseEvent) => this.c.onFocus(event),
      onBlur: (event: MouseEvent) => this.c.onBlur(event),
      onEnter: (event: MouseEvent) => this.controller.onEnter(event),
      onClick: (event: MouseEvent, params: IParams) =>
        this.controller.onClick(event, params),
      ...this.attrs,
    };
    if (this.$slots.default) {
      editor = this.$slots.default(editorProps);
    } else if (this.controller.editorProvider) {
      const component = resolveComponent(
        this.controller.editorProvider.formEditor,
      );
      editor = h(component, {
        ...editorProps,
      });
    } else {
      editor = (
        <not-supported-editor
          modelData={this.modelData.editor}
          context={this.controller.context}
        />
      );
    }

    return editor;
  },
});
export default CompositeFormItem;
