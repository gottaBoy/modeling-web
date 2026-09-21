import { useNamespace, useSemanticNode } from '@ibiz-template/vue3-util';
import { IPanelContainer } from '@ibiz/model-core';
import { computed, defineComponent, PropType, ref, VNode } from 'vue';
import { PanelItemController } from '@ibiz-template/runtime';
import './panel-exp-header.scss';

/**
 * 面板容器（导航部件头部）
 * @primary
 * @description 导航栏头部区域呈现容器。
 */
export const PanelExpHeader = defineComponent({
  name: 'IBizPanelExpHeader',
  props: {
    /**
     * @description 面板容器（导航部件头部）模型数据
     */
    modelData: {
      type: Object as PropType<IPanelContainer>,
      required: true,
    },
    /**
     * @description 面板容器（导航部件头部）控制器
     */
    controller: {
      type: PanelItemController,
      required: true,
    },
  },
  setup(props) {
    const ns = useNamespace('panel-exp-header');
    const { semanticClass, semanticStyle } = useSemanticNode(props.controller);
    const { showCaption, titleBarCloseMode, id } = props.modelData;
    const collapsible = titleBarCloseMode !== 0;
    const isCollapse = ref(titleBarCloseMode === 2);
    const changeCollapse = (): void => {
      if (collapsible) {
        isCollapse.value = !isCollapse.value;
      }
    };

    // 类名控制
    const classArr = computed(() => {
      let result: Array<string | false> = [ns.b(), ns.m(id)];
      if (showCaption === true) {
        result = [
          ...result,
          ...props.controller.containerClass,
          showCaption && ns.m('show-header'),
          collapsible && ns.m('collapsible'),
          ns.is('collapse', collapsible && isCollapse.value),
          ns.is('hidden', !props.controller.state.visible),
        ];
      }
      return result;
    });

    return {
      ns,
      isCollapse,
      classArr,
      changeCollapse,
      semanticClass,
      semanticStyle,
    };
  },
  render() {
    // 内容区默认插槽处理，封装app-col
    const defaultSlots: VNode[] = this.$slots.default?.() || [];
    const content = (
      <iBizRow
        slot='content'
        class={[this.ns.e('content'), this.semanticClass('content')]}
        style={this.semanticStyle('content')}
        layout={this.modelData.layout}
      >
        {defaultSlots.map(slot => {
          const props = slot.props as IData;
          if (!props || !props.controller) {
            return slot;
          }

          return (
            <iBizCol
              class={this.semanticClass('item', { props })}
              style={this.semanticStyle('item', { props })}
              layoutPos={props.modelData.layoutPos}
              state={props.controller.state}
            >
              {slot}
            </iBizCol>
          );
        })}
      </iBizRow>
    );

    return (
      <div
        class={[this.classArr, this.semanticClass('root')]}
        style={this.semanticStyle('root')}
      >
        {content}
      </div>
    );
  },
});
