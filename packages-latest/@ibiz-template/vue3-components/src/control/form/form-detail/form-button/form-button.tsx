import { FormButtonController } from '@ibiz-template/runtime';
import { useNamespace, useSemanticNode } from '@ibiz-template/vue3-util';
import { IDEFormButton } from '@ibiz/model-core';
import { defineComponent, PropType, computed } from 'vue';
import { showTitle } from '@ibiz-template/core';
import { convertBtnType } from '../../../../util';
import './form-button.scss';

export const FormButton = defineComponent({
  name: 'IBizFormButton',
  props: {
    modelData: {
      type: Object as PropType<IDEFormButton>,
      required: true,
    },
    controller: {
      type: FormButtonController,
      required: true,
    },
  },
  setup(props) {
    const ns = useNamespace('form-button');
    const c = props.controller;
    const { semanticClass, semanticStyle } = useSemanticNode(c.form);
    const captionText = computed(() => {
      const { caption, captionItemName } = props.modelData;
      if (captionItemName && props.controller.data[captionItemName]) {
        return props.controller.data[captionItemName];
      }
      return caption;
    });

    return { ns, captionText, semanticClass, semanticStyle };
  },
  render() {
    if (!this.controller.state.visible) {
      return null;
    }
    return (
      <div
        class={[
          this.ns.b(),
          this.ns.m(this.modelData.codeName),
          this.ns.is('loading', this.controller.state.loading),
          this.ns.is('readonly', this.controller.state.readonly),
          this.semanticClass('button', { button: this.controller }),
          this.modelData.detailStyle &&
            this.ns.m(this.modelData.detailStyle.toLowerCase()),
          ...(ibiz.config.common.enhancedUI === false
            ? this.controller.containerClass
            : []),
        ]}
        style={this.semanticStyle('button', { button: this.controller })}
      >
        <el-button
          sime='small'
          onClick={this.controller.onClick.bind(this.controller)}
          type={convertBtnType(this.modelData.buttonStyle)}
          loading={this.controller.state.loading}
          disabled={this.controller.state.disabled}
          title={showTitle(this.modelData.tooltip)}
          class={[
            ...(ibiz.config.common.enhancedUI === true
              ? this.controller.containerClass
              : []),
          ]}
        >
          <div class={this.ns.b('content')}>
            <iBizIcon
              class={[
                this.ns.bm('content', 'icon'),
                this.semanticClass('button.icon', { button: this.controller }),
              ]}
              style={this.semanticStyle('button.icon', {
                button: this.controller,
              })}
              icon={this.modelData.sysImage}
            />
            {this.modelData.showCaption ? (
              <span
                class={[
                  this.ns.bm('content', 'caption'),
                  this.semanticClass('button.caption', {
                    button: this.controller,
                  }),
                ]}
                style={this.semanticStyle('button.caption', {
                  button: this.controller,
                })}
              >
                {this.captionText}
              </span>
            ) : null}
          </div>
        </el-button>
      </div>
    );
  },
});
export default FormButton;
