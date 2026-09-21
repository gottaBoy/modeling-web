/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-duplicate-case */
import {
  IControlProvider,
  ReportPanelController,
} from '@ibiz-template/runtime';
import {
  useNamespace,
  useSemanticNode,
  useControlController,
} from '@ibiz-template/vue3-util';
import { defineComponent, PropType, VNode } from 'vue';
import { IDEReportPanel } from '@ibiz/model-core';
import './report-panel.scss';

export const ReportPanelControl = defineComponent({
  name: 'IBizReportPanelControl',
  props: {
    /**
     * @description 报表模型数据
     */
    modelData: { type: Object as PropType<IDEReportPanel>, required: true },
    /**
     * @description 应用上下文对象
     */
    context: { type: Object as PropType<IContext>, required: true },
    /**
     * @description 视图参数对象
     * @default {}
     */
    params: { type: Object as PropType<IParams>, default: () => ({}) },
    /**
     * @description 部件适配器
     */
    provider: { type: Object as PropType<IControlProvider> },
    /**
     * @description 不默认加载数据
     * @default false
     */
    noLoadDefault: { type: Boolean, default: false },
  },
  setup() {
    const c: ReportPanelController = useControlController(
      (...args) => new ReportPanelController(...args),
    );
    const ns = useNamespace(`control-${c.model.controlType!.toLowerCase()}`);
    const { semanticClass, semanticStyle } = useSemanticNode(c);
    // 绘制内容
    const renderContent = (): VNode | false => {
      // 未加载不显示无数据
      switch (c.model.appDEReport?.reportType) {
        case 'USER':
          return (
            <iBizUserReportPanel
              controller={c}
              class={semanticClass('content')}
              style={semanticStyle('content')}
            ></iBizUserReportPanel>
          );
        case 'USER2':
          return (
            <iBizUser2ReportPanel
              controller={c}
              class={semanticClass('content')}
              style={semanticStyle('content')}
            ></iBizUser2ReportPanel>
          );
        case 'SYSBIREPORT':
        case 'DESYSBIREPORTS':
        case 'SYSBICUBE':
        case 'DESYSBICUBES':
        case 'ALLSYSBICUBES':
        case 'SYSBICUBEREPORTS':
        case 'ALLSYSBIREPORTS':
          if (c.isBIReportDesign)
            return (
              <iBizBIReportPanel
                controller={c}
                class={semanticClass('content')}
                style={semanticStyle('content')}
              ></iBizBIReportPanel>
            );
          return (
            <iBizBIReport
              controller={c}
              class={semanticClass('content')}
              style={semanticStyle('content')}
            ></iBizBIReport>
          );
        default:
          return <div>{ibiz.i18n.t('control.reportPanel.unrealized')}</div>;
      }
    };

    return {
      c,
      ns,
      semanticClass,
      semanticStyle,
      renderContent,
    };
  },
  render() {
    if (!this.c.state.isCreated) return;
    return (
      <iBizControlBase
        controller={this.c}
        class={this.semanticClass('root')}
        style={this.semanticStyle('root')}
      >
        {this.renderContent()}
      </iBizControlBase>
    );
  },
});
