import { defineComponent, PropType, VNode } from 'vue';
import {
  ControlController,
  PredefinedControlRender,
  ScriptFactory,
} from '@ibiz-template/runtime';
import { fixJsonString } from '@ibiz-template/core';
import { useNamespace } from '../../use';
import './custom-render.scss';

export const IBizCustomRender = defineComponent({
  name: 'IBizCustomRender',
  props: {
    controller: {
      type: Object as PropType<ControlController>,
      required: true,
    },
  },
  setup(props) {
    const ns = useNamespace('custom-render');

    /**
     * 处理html事件
     *
     * @param {MouseEvent} e
     * @param {string} eventName
     */
    const handleHtmlEvent = async (e: MouseEvent, eventName: string) => {
      e.stopPropagation();
      const scriptCode = (e.target as HTMLElement).getAttribute(eventName);
      const data = (e.target as HTMLElement).getAttribute('data');
      const context = props.controller.context.clone();
      const _context = (e.target as HTMLElement).getAttribute('context');
      if (_context) {
        Object.assign(context, fixJsonString(_context));
      }
      const params = { ...props.controller.params };
      const _params = (e.target as HTMLElement).getAttribute('params');
      if (_params) {
        Object.assign(params, fixJsonString(_params));
      }
      if (scriptCode) {
        await ScriptFactory.asyncExecScriptFn(
          {
            ...props.controller.getEventArgs(),
            context,
            params,
            data: data ? fixJsonString(data) : null,
          },
          scriptCode,
        );
      }
    };

    /**
     * 获取无数据绘制器
     *
     * @return {*}  {(VNode | undefined)}
     */
    const getControlRender = (): VNode | undefined => {
      const controlRenders = props.controller?.model.controlRenders;
      if (!controlRenders || controlRenders.length === 0) {
        return undefined;
      }

      const noDataRender = controlRenders.find(
        item => item.id === PredefinedControlRender.EMPTYPANEL,
      );

      if (!noDataRender) return undefined;

      if (
        noDataRender.renderType === 'LAYOUTPANEL_MODEL' &&
        noDataRender.layoutPanelModel
      ) {
        const htmlCode = ScriptFactory.execScriptFn(
          {
            ...props.controller.getEventArgs(),
          },
          noDataRender.layoutPanelModel,
          { isAsync: false },
        ) as string;
        return (
          <div
            v-html={htmlCode}
            onClick={(e: MouseEvent) => handleHtmlEvent(e, 'click')}
            onDblclick={(e: MouseEvent) => handleHtmlEvent(e, 'dbclick')}
            class={[ns.b(), ns.e(noDataRender.renderName?.toLowerCase())]}
          ></div>
        );
      }
      if (
        noDataRender.renderType === 'LAYOUTPANEL' &&
        noDataRender.layoutPanel
      ) {
        return (
          <iBizControlShell
            class={[ns.b(), ns.e(noDataRender.renderName?.toLowerCase())]}
            params={props.controller.params}
            context={props.controller.context}
            modelData={noDataRender.layoutPanel}
          ></iBizControlShell>
        );
      }
    };
    return { ns, getControlRender };
  },
  render() {
    return this.getControlRender();
  },
});
