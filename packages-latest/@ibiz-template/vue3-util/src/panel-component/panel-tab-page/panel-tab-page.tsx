import { computed, defineComponent, PropType, VNode } from 'vue';
import { IPanelContainer } from '@ibiz/model-core';
import { PanelContainerController } from '@ibiz-template/runtime';
import { useNamespace, useSemanticNode } from '../../use';

/**
 * 面板分页
 * @primary
 * @description 为分页面板下的分页子容器，此容器下才是面板成员。
 */
export const PanelTabPage = defineComponent({
  name: 'IBizPanelTabPage',
  props: {
    /**
     * @description 面板分页模型
     */
    modelData: {
      // IPanelTabPage 不能使用 IPanelTabPage模型 否则会类型报错
      type: Object as PropType<IPanelContainer>,
      required: true,
    },
    /**
     * @description 面板分页控制器
     */
    controller: {
      type: PanelContainerController,
      required: true,
    },
  },
  setup(props) {
    const ns = useNamespace('panel-tab-page');
    const { semanticClass, semanticStyle } = useSemanticNode(props.controller);

    // 类名控制
    const classArr = computed(() => {
      const { id } = props.modelData;
      const result: Array<string | false> = [ns.b(), ns.m(id)];
      result.push(...props.controller.containerClass);
      return result;
    });
    return {
      ns,
      classArr,
      semanticClass,
      semanticStyle,
    };
  },
  render() {
    const defaultSlots: VNode[] = this.$slots.default?.() || [];
    return (
      <iBizRow
        class={[
          this.ns.b(),
          this.ns.m(this.modelData.codeName),
          this.classArr,
          this.semanticClass('root'),
        ]}
        style={this.semanticStyle('root')}
        layout={this.modelData.layout}
        v-loading={this.controller.state.loading}
        element-loading-text={this.controller.state.loadingText}
      >
        {defaultSlots.map(slot => {
          const props = slot.props as IData;
          if (!props || !props.controller) {
            return slot;
          }
          const c = props.controller;
          return (
            <iBizCol
              class={this.semanticClass('item', { props })}
              style={this.semanticStyle('item', { props })}
              layoutPos={c.model.layoutPos}
              state={c.state}
            >
              {slot}
            </iBizCol>
          );
        })}
      </iBizRow>
    );
  },
});
