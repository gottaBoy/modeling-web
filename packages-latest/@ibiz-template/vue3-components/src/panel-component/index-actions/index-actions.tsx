import {
  PanelContainerController,
  useNamespace,
  useSemanticNode,
} from '@ibiz-template/vue3-util';
import { IPanelContainer } from '@ibiz/model-core';
import { computed, defineComponent, PropType, VNode } from 'vue';
import './index-actions.scss';

/**
 * 首页行为容器组件
 * @primary
 * @description 用于包裹首页预定义布局中的四个预定义按钮组件。
 * @param {IPanelContainer} props
 * @returns
 */
export const IndexActions = defineComponent({
  name: 'IBizIndexActions',
  props: {
    /**
     * @description 首页行为容器组件模型数据
     */
    modelData: {
      type: Object as PropType<IPanelContainer>,
      required: true,
    },
    /**
     * @description 首页行为容器组件控制器
     */
    controller: {
      type: PanelContainerController,
      required: true,
    },
  },
  setup(props) {
    const ns = useNamespace('index-actions');
    const { id } = props.modelData;
    const { semanticClass, semanticStyle } = useSemanticNode(props.controller);

    const isCollapse = computed(() => {
      return (props.controller.panel.view.state as IData).isCollapse;
    });

    // 类名控制
    const classArr = computed(() => {
      let result: Array<string | false> = [ns.b(), ns.m(id)];
      result = [
        ...result,
        ...props.controller.containerClass,
        ns.is('hidden', !props.controller.state.visible),
        ns.is('collapse', isCollapse.value),
      ];
      return result;
    });

    return { ns, classArr, isCollapse, semanticClass, semanticStyle };
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
        onClick={event => this.controller.onClick(event)}
      >
        {this.controller.model.cssStyle ? (
          <style type='text/css'>{this.controller.model.cssStyle}</style>
        ) : null}
        {content}
      </div>
    );
  },
});
