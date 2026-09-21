import { useNamespace, useSemanticNode } from '@ibiz-template/vue3-util';
import { defineComponent, PropType } from 'vue';
import { IDBToolbarPortlet, IUIActionGroupDetail } from '@ibiz/model-core';
import { ActionBarPortletController } from '@ibiz-template/runtime';

export const ActionBarPortlet = defineComponent({
  name: 'IBizActionBarPortlet',
  props: {
    modelData: {
      type: Object as PropType<IDBToolbarPortlet>,
      required: true,
    },
    controller: {
      type: ActionBarPortletController,
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

    const zIndex = props.controller.dashboard.state.zIndex;

    // 点击工具栏处理
    const onActionClick = async (
      detail: IUIActionGroupDetail,
      event: MouseEvent,
    ): Promise<void> => {
      await props.controller.onActionClick(detail, event);
    };

    return { ns, zIndex, onActionClick, semanticClass, semanticStyle };
  },

  render() {
    const classArr: string[] = [
      this.ns.b(),
      this.ns.m(this.modelData.codeName),
      ...this.controller.containerClass,
    ];

    return (
      <iBizPortletLayout controller={this.controller} class={classArr}>
        {this.modelData.uiactionGroup && (
          <iBizActionToolbar
            class={this.semanticClass('portlet.actionbar', {
              actionbar: this.controller,
            })}
            style={this.semanticStyle('portlet.actionbar', {
              actionbar: this.controller,
            })}
            zIndex={this.zIndex}
            action-details={this.modelData.uiactionGroup.uiactionGroupDetails}
            actions-state={this.controller.state.actionGroupState}
            onActionClick={this.onActionClick}
          ></iBizActionToolbar>
        )}
      </iBizPortletLayout>
    );
  },
});
