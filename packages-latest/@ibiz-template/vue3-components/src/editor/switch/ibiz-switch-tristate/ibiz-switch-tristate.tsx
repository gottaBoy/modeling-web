import { defineComponent, ref, watch } from 'vue';
import {
  useNamespace,
  getEditorEmits,
  getSwitchProps,
  useSemanticNode,
} from '@ibiz-template/vue3-util';
import { SwitchEditorController } from '../switch-editor.controller';
import './ibiz-switch-tristate.scss';

export const IBizSwitchTriState = defineComponent({
  name: 'IBizSwitchTriState',
  props: getSwitchProps<SwitchEditorController>(),
  emits: getEditorEmits(),
  setup(props, { emit }) {
    const ns = useNamespace('switch-tristate');
    const c = props.controller;
    const { semanticClass, semanticStyle } = useSemanticNode(c);
    // 记录上一次选择的值, 用来辅助判断移动方向
    const lastVal = ref<number | null>(null);

    // 当前值
    const currentVal = ref<number | null>(null);

    watch(
      () => props.value,
      (newVal, oldVal) => {
        if (newVal !== oldVal) {
          if (newVal === 0) {
            currentVal.value = 0;
          } else if (newVal === 1) {
            currentVal.value = 1;
          } else {
            currentVal.value = null;
          }
        }
      },
      { immediate: true },
    );

    const onSwitchClick = () => {
      if (props.disabled || props.readonly) {
        return;
      }
      if (currentVal.value === null) {
        if (lastVal.value === null || lastVal.value === 0) {
          lastVal.value = null;
          emit('change', 1);
        }
        if (lastVal.value === 1) {
          lastVal.value = null;
          emit('change', 0);
        }
      }
      if (currentVal.value === 1) {
        lastVal.value = 1;
        emit('change', null);
      }
      if (currentVal.value === 0) {
        lastVal.value = 0;
        emit('change', null);
      }
    };

    return {
      c,
      ns,
      currentVal,
      semanticClass,
      semanticStyle,
      onSwitchClick,
    };
  },
  render() {
    return (
      <div
        class={[this.ns.b(), this.semanticClass('editor.root')]}
        style={this.semanticStyle('editor.root')}
      >
        <div
          class={[
            this.ns.e('switch-wrapper'),
            this.semanticClass('editor.content'),
            this.ns.is('left', this.currentVal === 0),
            this.ns.is('center', this.currentVal === null),
            this.ns.is('right', this.currentVal === 1),
            this.ns.is('disabled', this.disabled || this.readonly),
          ]}
          style={this.semanticStyle('editor.content')}
          onClick={this.onSwitchClick}
        ></div>
      </div>
    );
  },
});
