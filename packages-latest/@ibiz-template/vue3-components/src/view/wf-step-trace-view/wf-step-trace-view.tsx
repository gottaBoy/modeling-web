import { IModal, WFStepTraceViewController } from '@ibiz-template/runtime';
import { useNamespace, useViewController } from '@ibiz-template/vue3-util';
import { IAppView } from '@ibiz/model-core';
import { defineComponent, PropType } from 'vue';

export const WFStepTraceView = defineComponent({
  name: 'IBizWFStepTraceView',
  props: {
    context: Object as PropType<IContext>,
    params: { type: Object as PropType<IParams>, default: () => ({}) },
    modelData: { type: Object as PropType<IAppView>, required: true },
    modal: { type: Object as PropType<IModal> },
    state: { type: Object as PropType<IData> },
  },
  setup() {
    const ns = useNamespace('view');
    const c = useViewController(
      (...args) => new WFStepTraceViewController(...args),
    );

    const { viewType, sysCss, codeName } = c.model;
    const typeClass = viewType!.toLowerCase();
    const sysCssName = sysCss?.cssName;
    const viewClassNames = [
      ns.b(),
      true && ns.b(typeClass),
      true && ns.m(codeName),
      true && sysCssName,
    ];

    return { c, ns, viewClassNames };
  },
  render() {
    return (
      <div class={this.viewClassNames}>
        <iBizExtendActionTimeLine
          data={this.c.state.historyData}
        ></iBizExtendActionTimeLine>
      </div>
    );
  },
});
