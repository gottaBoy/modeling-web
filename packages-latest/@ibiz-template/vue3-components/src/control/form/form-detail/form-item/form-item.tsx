import {
  computed,
  defineComponent,
  h,
  PropType,
  resolveComponent,
  normalizeStyle,
} from 'vue';
import {
  useNamespace,
  computedAsync,
  renderTooltip,
  useSemanticNode,
} from '@ibiz-template/vue3-util';
import { IDEFormItem } from '@ibiz/model-core';
import { FormItemController } from '@ibiz-template/runtime';
import CompositeFormItem from './composite-form-item/composite-form-item';
import './form-item.scss';

export const FormItem = defineComponent({
  name: 'IBizFormItem',
  props: {
    modelData: {
      type: Object as PropType<IDEFormItem>,
      required: true,
    },
    controller: {
      type: Object as PropType<FormItemController>,
      required: true,
    },
    attrs: {
      type: Object as PropType<IData>,
      required: false,
    },
  },
  setup(props) {
    const ns = useNamespace('form-item');
    const c = props.controller;
    const { semanticClass, semanticStyle } = useSemanticNode(c.form);
    const onValueChange = (
      val: unknown,
      name?: string,
      ignore: boolean = false,
    ): void => {
      props.controller.setDataValue(val, name, ignore);
    };

    const CustomHtml = computedAsync(async () => {
      const html = await props.controller.getCustomHtml(props.controller.data);
      return html;
    });

    const showTitle = computed(() => {
      const { controlRenders = [], id } = c.model;
      return !controlRenders.some(
        renderItem => renderItem.id === `${id?.toLowerCase()}_tooltip`,
      );
    });

    return {
      ns,
      c,
      showTitle,
      CustomHtml,
      onValueChange,
      semanticClass,
      semanticStyle,
    };
  },
  render() {
    if (!this.c.state.visible || this.c.model.editor?.editorType === 'HIDDEN')
      return null;
    // 编辑器内容
    let editor = null;
    const compositeItem = this.c.model.compositeItem;
    const { editorType, editorItems = [] } = this.c.model.editor || {};
    // 复合表单项且编辑器类型不是时间范围选择器和数值范围选择器
    if (
      compositeItem &&
      editorType &&
      !editorType.includes('DATERANGE') &&
      !editorType.includes('NUMBERRANGE')
    ) {
      editor = editorItems.map((item: IData, index: number) => {
        const controller = this.c.form.details[item.id] as FormItemController;
        return [
          <CompositeFormItem
            modelData={controller.model}
            controller={controller}
            attrs={this.attrs}
          />,
          // feat：复合表单项样式2会在编辑器之间加`-`分隔符
          editorItems.length - 1 > index &&
            this.c.model.detailStyle === 'STYLE2' && (
              <span class={this.ns.e('composite-separator')}>-</span>
            ),
        ];
      });
    } else {
      const editMode = this.c.editor?.model?.editorParams?.editMode;
      const editorProps = {
        style: this.c.editor?.style,
        class: this.c.state.editorClass,
        value: this.c.value,
        data: this.c.data,
        showTitle: this.showTitle,
        controller: this.c.editor,
        disabled: this.c.state.disabled,
        readonly: this.c.state.readonly,
        onChange: this.onValueChange,
        controlParams: editMode
          ? { ...this.c.form.controlParams, editmode: editMode }
          : this.c.form.controlParams,
        onFocus: (event: MouseEvent) => this.c.onFocus(event),
        onBlur: (event: MouseEvent) => this.c.onBlur(event),
        onEnter: (event: MouseEvent) => this.c.onEnter(event),
        onClick: (event: MouseEvent, params: IParams) =>
          this.c.onClick(event, params),
        onCustomAction: (_value: IData) => this.c.onCustomAction(_value),
        ...this.attrs,
      };
      if (this.$slots.default) {
        editor = this.$slots.default(editorProps);
      } else if (this.c.editorProvider) {
        const component = resolveComponent(this.c.editorProvider.formEditor);
        editor = h(component, {
          ...editorProps,
        });
      } else {
        editor = (
          <not-supported-editor
            modelData={this.modelData.editor}
            context={this.c.context}
          />
        );
      }
    }

    if (this.c.isCustomCode)
      return (
        <div
          class={[
            this.ns.b(),
            this.ns.e('script'),
            this.semanticClass('item', { item: this.controller }),
            this.ns.m(this.modelData.id),
            this.ns.is('compositeItem', compositeItem),
            ...this.c.containerClass,
          ]}
          style={normalizeStyle([
            this.modelData.cssStyle,
            this.semanticStyle('item', { item: this.controller }),
          ])}
          v-html={this.CustomHtml}
          v-tooltip={renderTooltip(this.c.data, this.c.model, this.c.form)}
        ></div>
      );

    return (
      <iBizFormItemContainer
        id={`${this.c.form.view.model.codeName}_${this.c.form.model.codeName}_${this.modelData.codeName}`}
        class={[
          this.ns.b(),
          this.ns.m(this.modelData.id),
          this.semanticClass('item', { item: this.controller }),
          this.ns.is('compositeItem', compositeItem),
          ...this.c.containerClass,
        ]}
        style={[
          this.ns.cssVarBlock({
            'label-width': `${this.c.model.labelWidth || 130}px`,
          }),
          this.modelData.cssStyle,
          this.semanticStyle('item', { item: this.controller }),
        ]}
        controller={this.c}
        onClick={(event: MouseEvent) => this.c.onClick(event)}
      >
        {editor}
      </iBizFormItemContainer>
    );
  },
});
export default FormItem;
