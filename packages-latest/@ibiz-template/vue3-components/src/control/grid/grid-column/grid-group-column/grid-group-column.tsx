import { defineComponent } from 'vue';
import { useNamespace } from '@ibiz-template/vue3-util';
import {
  GridGroupColumnController,
  GridRowState,
} from '@ibiz-template/runtime';

export const GridGroupColumn = defineComponent({
  name: 'IBizGridGroupColumn',
  props: {
    controller: {
      type: GridGroupColumnController,
      required: true,
    },
    row: {
      type: GridRowState,
      required: true,
    },
  },
  setup() {
    const ns = useNamespace('grid-group-column');

    return { ns };
  },
  render() {
    return <div class={[this.ns.b()]}></div>;
  },
});
export default GridGroupColumn;
