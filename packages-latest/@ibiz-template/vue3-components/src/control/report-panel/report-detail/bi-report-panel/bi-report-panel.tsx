/* eslint-disable no-unused-expressions */
import { defineComponent, PropType } from 'vue';
import { ReportPanelController } from '@ibiz-template/runtime';
import { useNamespace } from '@ibiz-template/vue3-util';
import './bi-report-panel.scss';

export const BIReportPanel = defineComponent({
  name: 'IBizBIReportPanel',
  props: {
    controller: { type: Object as PropType<ReportPanelController> },
  },
  setup(props) {
    const c = props.controller;
    const ns = useNamespace(`bi-report-panel`);
    const generator = c && c.generator;
    return {
      c,
      ns,
      generator,
    };
  },
  render() {
    if (!this.c) {
      return;
    }
    return (
      <div class={this.ns.e('container')}>
        <iBizBIReportContent
          mode={'CONTENT'}
          context={this.c.context}
          viewParams={this.c.params}
          config={this.generator && this.generator.config}
          onInit={(args: IData) => {
            this.generator && this.generator.init(args);
          }}
          onReportChartChange={(args: IData) => {
            this.generator && this.generator.init(args);
          }}
        ></iBizBIReportContent>
      </div>
    );
  },
});
