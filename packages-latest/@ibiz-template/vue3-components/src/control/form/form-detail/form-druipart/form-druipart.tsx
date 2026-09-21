import { defineComponent, h, PropType, resolveComponent } from 'vue';
import {
  useController,
  useNamespace,
  useSemanticNode,
} from '@ibiz-template/vue3-util';
import { IDEFormDRUIPart } from '@ibiz/model-core';
import { EventBase, FormDRUIPartController } from '@ibiz-template/runtime';
import './form-druipart.scss';

export const FormDRUIPart = defineComponent({
  name: 'IBizFormDRUIPart',
  props: {
    modelData: {
      type: Object as PropType<IDEFormDRUIPart>,
      required: true,
    },
    controller: {
      type: FormDRUIPartController,
      required: true,
    },
  },
  setup(props) {
    const ns = useNamespace('form-druipart');
    useController(props.controller);

    const c = props.controller;
    const { semanticClass, semanticStyle } = useSemanticNode(c.form);

    // 是否处于设计预览状态
    const isDesignPreview = props.controller.context?.srfrunmode === 'DESIGN';

    const onCreated = (event: EventBase): void => {
      props.controller.setEmbedView(event.view);
    };

    return {
      ns,
      isDesignPreview,
      onCreated,
      semanticClass,
      semanticStyle,
    };
  },
  render() {
    if (
      (!this.controller.state.visible && !this.controller.state.keepAlive) ||
      !this.controller.state.viewComponentKey
    ) {
      return null;
    }
    if (this.isDesignPreview) {
      return (
        <div class={this.ns.b()}>
          <div class={this.ns.b('preview-content')}>
            {ibiz.i18n.t('control.form.formDruipart.defaultText')}
          </div>
        </div>
      );
    }
    const viewShell = resolveComponent('IBizViewShell');
    return (
      <div
        class={[
          this.ns.b(),
          this.ns.m(this.modelData.codeName),
          this.semanticClass('druipart', { druipart: this.controller }),
          ...this.controller.containerClass,
        ]}
        style={this.semanticStyle('druipart', { druipart: this.controller })}
        onClick={(event: MouseEvent) => this.controller.onClick(event)}
      >
        {h(viewShell, {
          context: this.controller.navContext,
          params: this.controller.navParams,
          key: this.controller.state.viewComponentKey,
          viewId: this.controller.model.appViewId,
          state: { noLoadDefault: true },
          onCreated: this.onCreated,
        })}
        {this.controller.state.showMask && (
          <div class={this.ns.e('mask')}>
            {this.modelData.maskInfo ||
              ibiz.i18n.t('control.form.formDruipart.saveFirst')}
          </div>
        )}
      </div>
    );
  },
});
export default FormDRUIPart;
