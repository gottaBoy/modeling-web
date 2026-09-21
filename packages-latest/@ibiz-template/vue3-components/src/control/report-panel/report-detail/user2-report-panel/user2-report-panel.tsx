import { defineComponent, PropType } from 'vue';
import { ReportPanelController, UIActionUtil } from '@ibiz-template/runtime';
import { useNamespace } from '@ibiz-template/vue3-util';
import './user2-report-panel.scss';

export const User2ReportPanel = defineComponent({
  name: 'IBizUser2ReportPanel',
  props: {
    controller: { type: Object as PropType<ReportPanelController> },
  },
  setup(props) {
    const c = props.controller;
    const ns = useNamespace(`user2-report-panel`);
    const generator = c && c.generator;
    const handleClick = async (e: MouseEvent) => {
      let clickValue = (e.target as HTMLElement).getAttribute('click');
      let params = (e.target as HTMLElement).getAttribute('params');
      if (!clickValue || !c || !params) {
        return;
      }
      clickValue = clickValue.replaceAll('`', '');
      params = params.replaceAll('`', '"');
      const pattern = /\(([^)]+)\)/;
      const result = pattern.exec(clickValue);
      if (result && result[1]) {
        UIActionUtil.exec(
          result[1]!,
          {
            context: c.context,
            params: c.params,
            data: [JSON.parse(params)],
            view: c.view,
          },
          c.context.srfappid,
        );
      }
    };
    return {
      c,
      ns,
      generator,
      handleClick,
    };
  },
  render() {
    if (!this.c) {
      return;
    }
    const state = this.c.state;
    if (state.isLoaded) {
      return (
        <div
          class={this.ns.e('container')}
          v-html={state.data}
          onClick={(e: MouseEvent) => {
            this.handleClick(e);
          }}
        ></div>
      );
    }
    return (
      <div class={this.ns.e('empty')}>
        {ibiz.i18n.t('control.common.currentNoData')}
      </div>
    );
  },
});
