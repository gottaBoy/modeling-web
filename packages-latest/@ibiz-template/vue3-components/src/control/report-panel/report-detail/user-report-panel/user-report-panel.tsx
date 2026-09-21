import { defineComponent, PropType } from 'vue';
import { ReportPanelController } from '@ibiz-template/runtime';
import { useNamespace } from '@ibiz-template/vue3-util';
import './user-report-panel.scss';

export const UserReportPanel = defineComponent({
  name: 'IBizUserReportPanel',
  props: {
    controller: { type: Object as PropType<ReportPanelController> },
  },
  setup(props) {
    const c = props.controller;
    const ns = useNamespace(`user-report-panel`);
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
    const state = this.c.state;
    return (
      <div class={this.ns.e('container')}>
        <iBizRelationshipDesign
          data={state.data}
          context={this.c.context}
          params={this.c.params}
          config={this.generator && this.generator.config.CONFIG}
          pluginConfig={this.generator && this.generator.config.PLUGINCONFIG}
          nodeLegendConfig={
            this.generator && this.generator.config.NODELEGENDCONFIG
          }
          edgeLegendConfig={
            this.generator && this.generator.config.EDGELEGENDCONFIG
          }
          hooks={this.generator && this.generator.config.HOOKS}
          showLoading={true}
          onInit={(args: IData) => {
            // eslint-disable-next-line no-unused-expressions
            this.generator && this.generator.init(args);
          }}
        ></iBizRelationshipDesign>
      </div>
    );
  },
});
