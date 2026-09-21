import { PropType, defineComponent, ref, watch } from 'vue';
import { useNamespace } from '@ibiz-template/vue3-util';
import type { CenterController } from '../../controller/center.controller';
import './index-page.scss';
import { ViewList } from '../view-list/view-list';
import { GlobalToolbar } from '../global-toolbar/global-toolbar';

export const IndexPage = defineComponent({
  name: 'DevToolIndexPage',
  props: {
    center: {
      type: Object as PropType<CenterController>,
      required: true,
    },
  },
  setup(props) {
    const ns = useNamespace('index-page');

    const rootRef = ref();

    watch(rootRef, newVal => {
      // eslint-disable-next-line vue/no-mutating-props
      props.center.rootElement = newVal;
    });

    return { ns, rootRef };
  },
  render() {
    const { state } = this.center;
    return (
      <div
        ref='rootRef'
        class={[this.ns.b(), this.ns.is('hidden', !state.isShow)]}
      >
        <div class={this.ns.b('header')}>
          <GlobalToolbar center={this.center} />
        </div>
        <div class={this.ns.b('content')}>
          <ViewList center={this.center}></ViewList>
        </div>
      </div>
    );
  },
});
