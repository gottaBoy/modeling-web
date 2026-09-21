import { useNamespace, useSemanticNode } from '@ibiz-template/vue3-util';
import {
  defineComponent,
  PropType,
  resolveComponent,
  h,
  onMounted,
  onBeforeUnmount,
  computed,
} from 'vue';
import { IDBReportPortletPart } from '@ibiz/model-core';
import { ControlType, ReportPortletController } from '@ibiz-template/runtime';

export const ReportPortlet = defineComponent({
  name: 'IBizReportPortlet',
  props: {
    modelData: {
      type: Object as PropType<IDBReportPortletPart>,
      required: true,
    },
    controller: {
      type: ReportPortletController,
      required: true,
    },
  },
  setup(props) {
    const ns = useNamespace(
      `portlet-${props.modelData.portletType?.toLowerCase()}`,
    );
    const { semanticClass, semanticStyle } = useSemanticNode(
      props.controller.dashboard,
    );

    const report = props.modelData.controls?.find(item => {
      return item.controlType === ControlType.REPORT_PANEL;
    });

    const linkAction = computed(() => {
      const { uiactionGroupDetails = [] } =
        props.controller.model.uiactionGroup || {};
      return uiactionGroupDetails.find(
        x => x.uiactionId && x.uiactionId.startsWith('bi_report_view'),
      );
    });

    let timerTag: NodeJS.Timeout | undefined;

    onMounted(() => {
      const timer = props.controller.model.timer;
      if (timer && timer > 0) {
        timerTag = setInterval(() => {
          props.controller.refresh();
        }, timer);
      }
    });

    onBeforeUnmount(() => {
      clearInterval(timerTag);
    });

    return { ns, report, linkAction, semanticClass, semanticStyle };
  },

  render() {
    const classArr: string[] = [
      this.ns.b(),
      this.ns.m(this.modelData.codeName),
      ...this.controller.containerClass,
    ];
    const { context, params } = this.controller;
    return (
      <iBizPortletLayout
        controller={this.controller}
        linkAction={this.linkAction}
        class={classArr}
      >
        {h(resolveComponent('IBizControlShell'), {
          class: this.semanticClass('portlet.report', {
            report: this.controller,
          }),
          style: this.semanticStyle('portlet.report', {
            report: this.controller,
          }),
          context,
          params,
          modelData: this.report,
        })}
      </iBizPortletLayout>
    );
  },
});
