import { CTX, IControlController } from '@ibiz-template/runtime';
import { IPanelCtrlPos } from '@ibiz/model-core';
import { defineComponent, inject, PropType, VNode } from 'vue';
import { useNamespace, useSemanticNode } from '../../use';
import { PanelCtrlPosController } from './panel-ctrl-pos.controller';
import './panel-ctrl-pos.scss';

/**
 * 面板部件占位
 * @primary
 * @description 面板中的动态部件占位组件，用于绘制实体部件。
 */
export const PanelCtrlPos = defineComponent({
  name: 'IBizPanelCtrlPos',
  props: {
    /**
     * @description 面板部件占位模型数据
     */
    modelData: {
      type: Object as PropType<IPanelCtrlPos>,
      required: true,
    },
    /**
     * @description 面板部件占位控制器
     */
    controller: {
      type: Object as PropType<PanelCtrlPosController>,
      required: true,
    },
  },
  setup(props) {
    const ns = useNamespace('panel-ctrl-pos');
    const { semanticClass, semanticStyle } = useSemanticNode(props.controller);
    // 上下文里提前预告部件
    const ctx = inject('ctx') as CTX;
    ctx.evt.on('onRegister', (name, c) => {
      if (name === props.modelData.id) {
        props.controller.bindControl(c as IControlController);
      }
    });

    return { ns, semanticClass, semanticStyle };
  },
  render() {
    const { state } = this.controller;
    let content: VNode | VNode[] | undefined;

    if (this.$slots.default) {
      content = this.$slots.default();
    }

    return (
      <div
        class={[
          this.ns.b(),
          this.ns.m(this.modelData.id),
          this.semanticClass('root'),
          ...this.controller.containerClass,
          this.ns.is('hidden', !state.visible),
        ]}
        style={this.semanticStyle('root')}
      >
        {content ||
          (ibiz.env.dev
            ? ibiz.i18n.t('vue3Util.panelComponent.noProvidedSlot', {
                id: this.modelData.id,
              })
            : '')}
      </div>
    );
  },
});
