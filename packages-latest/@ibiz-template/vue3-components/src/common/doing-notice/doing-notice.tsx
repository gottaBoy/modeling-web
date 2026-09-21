import { defineComponent, PropType } from 'vue';
import { useNamespace } from '@ibiz-template/vue3-util';
import './doing-notice.scss';

export const DoingNotice = defineComponent({
  name: 'DoingNotice',
  props: {
    info: {
      type: Object as PropType<{ num: number }>,
      required: true,
    },
  },
  setup() {
    const ns = useNamespace('doing-notice');

    return { ns };
  },
  render() {
    return (
      <div class={[this.ns.b()]}>
        <span
          class={this.ns.e('text')}
          v-html={ibiz.i18n.t('component.doingNotice.jobInProgress', {
            class: this.ns.e('num'),
            num: this.info.num,
          })}
        ></span>
        <svg class={this.ns.e('loading-icon')} viewBox='-10, -10, 50, 50'>
          <path
            class='path'
            d='
            M 30 15
            L 28 17
            M 25.61 25.61
            A 15 15, 0, 0, 1, 15 30
            A 15 15, 0, 1, 1, 27.99 7.5
            L 15 15
          '
            style='stroke-width: 4px; fill: rgba(0, 0, 0, 0)'
          />
        </svg>
      </div>
    );
  },
});
