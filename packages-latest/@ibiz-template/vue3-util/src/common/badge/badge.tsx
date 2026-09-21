import { defineComponent, PropType, computed } from 'vue';
import { useNamespace } from '../../use';
import './badge.scss';

export const IBizBadge = defineComponent({
  name: 'IBizBadge',
  props: {
    value: {
      type: Number,
      required: true,
    },
    type: {
      type: String as PropType<
        'primary' | 'success' | 'warning' | 'danger' | 'info'
      >,
      default: 'danger',
    },
    max: {
      type: Number,
    },
    counterMode: {
      type: Number,
    },
  },
  setup(props) {
    const ns = useNamespace('badge');

    const maxValue = computed(() => {
      if (props.max) {
        return props.max;
      }
      return ibiz.config.common.counterMaxValue;
    });
    return { ns, maxValue };
  },
  render() {
    if (!this.value && this.value !== 0) {
      return;
    }
    if (this.counterMode === 1 && this.value <= 0) {
      return;
    }
    return (
      <div
        class={[
          this.ns.b(),
          this.ns.m(this.type),
          this.ns.is('mob', ibiz.env.isMob),
        ]}
      >
        {this.value > this.maxValue ? `${this.maxValue}+` : this.value}
      </div>
    );
  },
});
