import { PanelItemController } from '@ibiz-template/runtime';
import { useNamespace, useSemanticNode } from '@ibiz-template/vue3-util';
import { IPanelContainer } from '@ibiz/model-core';
import { computed, defineComponent, PropType, ref, VNode } from 'vue';
import './panel-app-header.scss';

/**
 * 面板容器（应用头部）
 * @primary
 * @description 用于首页视图布局头部区域的绘制。
 */
export const PanelAppHeader = defineComponent({
  name: 'IBizPanelAppHeader',
  props: {
    /**
     * @description 面板容器（应用头部）模型数据
     */
    modelData: {
      type: Object as PropType<IPanelContainer>,
      required: true,
    },
    /**
     * @description 面板容器（应用头部）控制器
     */
    controller: {
      type: PanelItemController,
      required: true,
    },
  },
  setup(props) {
    const ns = useNamespace('panel-app-header');
    const { semanticClass, semanticStyle } = useSemanticNode(props.controller);
    const { showCaption, titleBarCloseMode, id } = props.modelData;
    const collapsible = titleBarCloseMode !== 0;
    const isCollapse = ref(titleBarCloseMode === 2);
    const changeCollapse = (): void => {
      if (collapsible) {
        isCollapse.value = !isCollapse.value;
      }
    };

    const menuMode = computed(() => {
      const model = props.controller.panel.view.model.mainMenuAlign;
      switch (model) {
        case 'TOP':
          return 'horizontal';
        default:
          return 'vertical';
      }
    });

    // 类名控制
    const classArr = computed(() => {
      let result: Array<string | false> = [
        ns.b(),
        ns.m(menuMode.value),
        ns.m(id),
      ];
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
        class={this.semanticClass('content')}
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
