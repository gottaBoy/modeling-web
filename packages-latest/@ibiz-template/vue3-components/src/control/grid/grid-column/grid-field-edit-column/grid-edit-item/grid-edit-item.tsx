import { computed, defineComponent } from 'vue';
import { useNamespace } from '@ibiz-template/vue3-util';
import './grid-edit-item.scss';

export const IBizGridEditItem = defineComponent({
  name: 'IBizGridEditItem',
  props: {
    required: {
      type: Boolean,
      default: false,
    },
    showEditMask: {
      type: Boolean,
      default: false,
    },
    stopPropagation: {
      type: Boolean,
      default: false,
    },
    error: {
      type: String,
    },
  },
  emits: {
    maskClick: (_event: MouseEvent) => true,
  },
  setup(props, { emit }) {
    const ns = useNamespace('grid-edit-item');
    const onStopPropagation = (e: MouseEvent): void => {
      if (props.stopPropagation) {
        e.stopPropagation();
      }
    };

    const onClick = (e: MouseEvent): void => {
      if (props.stopPropagation) {
        e.stopPropagation();
      }
      if (props.showEditMask) {
        emit('maskClick', e);
      }
    };

    // tooltip相关
    const showTooltip = computed(() => {
      // 有报错信息的时候显示
      return props.error;
    });

    const tooltipContent = computed(() => {
      return props.error;
    });

    return { ns, tooltipContent, showTooltip, onClick, onStopPropagation };
  },
  render() {
    return (
      <div
        class={[
          this.ns.b(),
          this.ns.is('error', !!this.error),
          this.showEditMask && this.ns.m('show-mask'),
        ]}
        onDblclick={this.onStopPropagation}
        onClick={this.onClick}
      >
        <el-tooltip
          content={this.tooltipContent}
          disabled={!this.showTooltip}
          transfer
          popper-class={this.ns.e('tooltip-popper')}
          placement='top'
        >
          <div class={this.ns.e('tooltip')}>{this.$slots.default?.()}</div>
        </el-tooltip>
      </div>
    );
  },
});
export default IBizGridEditItem;
