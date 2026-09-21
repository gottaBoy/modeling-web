import { IPanelRawItem } from '@ibiz/model-core';
import { computed, defineComponent, PropType, ref, normalizeStyle } from 'vue';
import { useNamespace, useSemanticNode } from '../../use';
import './teleport-placeholder.scss';
import { TeleportPlaceholderController } from './teleport-placeholder.controller';

/**
 * 传送占位
 * @primary
 * @description 使用vue的Teleport内置组件，用于绘制嵌入视图中的面板成员。
 * @panelitemparams {name:TeleportTag,parameterType:string,description:传送占位面板项与需传送部件的关联标识，其值必须与部件参数（teleporttag）的值一致}
 */
export const TeleportPlaceholder = defineComponent({
  name: 'IBizTeleportPlaceholder',
  props: {
    /**
     * @description 传送占位模型
     */
    modelData: {
      type: Object as PropType<IPanelRawItem>,
      required: true,
    },
    /**
     * @description 传送占位控制器
     */
    controller: {
      type: Object as PropType<TeleportPlaceholderController>,
      required: true,
    },
  },
  setup(props) {
    const ns = useNamespace('teleport-placeholder');
    const tempStyle = ref('');
    const { semanticClass, semanticStyle } = useSemanticNode(props.controller);

    const { rawItem } = props.modelData;

    if (rawItem && rawItem.cssStyle) {
      tempStyle.value = rawItem.cssStyle;
    }

    // 类名控制
    const classArr = computed(() => {
      const { id } = props.modelData;
      const result: Array<string | false> = [ns.b(), ns.m(id)];
      result.push(...props.controller.containerClass);
      return result;
    });

    return { ns, classArr, tempStyle, semanticClass, semanticStyle };
  },
  render() {
    // 动态控制显示
    if (!this.controller.state.visible) {
      return;
    }
    return (
      <div
        id={this.controller.state.teleportTag}
        class={[this.classArr, this.semanticClass('root')]}
        style={normalizeStyle([this.tempStyle, this.semanticStyle('root')])}
      ></div>
    );
  },
});
