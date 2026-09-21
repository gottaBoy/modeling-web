import { IPanelField } from '@ibiz/model-core';
import { computed, defineComponent, PropType, resolveComponent, h } from 'vue';
import { renderTooltip, useNamespace, useSemanticNode } from '../../use';
import { PanelFieldController } from './panel-field.controller';
import './panel-field.scss';

/**
 * 面板属性
 * @primary
 * @description 面板中的属性项，承载数据属性，内容为编辑器控件。
 */
export const PanelField = defineComponent({
  name: 'IBizPanelField',
  props: {
    /**
     * @description 面板项模型数据
     */
    modelData: { type: Object as PropType<IPanelField>, required: true },
    /**
     * @description 面板项控制器
     */
    controller: {
      type: PanelFieldController,
      required: true,
    },
    /**
     * @description 面板项属性
     */
    attrs: {
      type: Object as PropType<IData>,
      require: false,
    },
  },
  setup(props) {
    const ns = useNamespace('panel-field');
    const { semanticClass, semanticStyle } = useSemanticNode(props.controller);

    // 类名控制
    const classArr = computed(() => {
      const { id } = props.modelData;
      const result: Array<string | false> = [
        ns.b(),
        ns.m(id),
        ns.is('error', !!props.controller.state.error),
        ns.is('mob', window.Environment && window.Environment.isMob),
      ];
      return result;
    });

    const onValueChange = (val: unknown, name?: string): void => {
      props.controller.setDataValue(val, name);
    };

    const showTitle = computed(() => {
      const { controlRenders = [], id } = props.modelData;
      return !controlRenders.some(
        renderItem => renderItem.id === `${id?.toLowerCase()}_tooltip`,
      );
    });

    return {
      ns,
      classArr,
      showTitle,
      onValueChange,
      semanticClass,
      semanticStyle,
    };
  },
  render() {
    // 编辑器内容
    let editor = null;
    if (this.controller.data) {
      const editorProps = {
        value: this.controller.value,
        data: this.controller.data,
        controller: this.controller.editor,
        disabled: this.controller.state.disabled,
        class: [
          this.ns.b('content'),
          ibiz.config.common.enhancedUI === true
            ? this.controller.containerClass
            : '',
          this.semanticClass('content'),
        ],
        style: [this.semanticStyle('content')],
        showTitle: this.showTitle,
        readonly: this.controller.state.readonly,
        onChange: this.onValueChange,
        onFocus: (event: MouseEvent) => this.controller.onFocus(event),
        onBlur: (event: MouseEvent) => this.controller.onBlur(event),
        onEnter: (event: MouseEvent) => this.controller.onEnter(event),
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
        editor = <not-supported-editor modelData={this.modelData.editor} />;
      }
    }

    return (
      <div
        class={[
          this.classArr,
          ibiz.config.common.enhancedUI === false
            ? this.controller.containerClass
            : '',
          this.semanticClass('root'),
        ]}
        style={this.semanticStyle('root')}
        onClick={event => this.controller.onClick(event)}
        v-tooltip={renderTooltip(
          this.controller.data,
          this.controller.model,
          this.controller.panel,
        )}
      >
        {editor}
        {this.controller.state.error && (
          <div
            class={[this.ns.e('error'), this.semanticClass('error')]}
            style={this.semanticStyle('error')}
          >
            {this.controller.state.error}
          </div>
        )}
      </div>
    );
  },
});
