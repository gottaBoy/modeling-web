import { defineComponent, PropType, VNode } from 'vue';
import { useNamespace, useSemanticNode } from '@ibiz-template/vue3-util';
import './form-page.scss';
import { IDEForm } from '@ibiz/model-core';
import { FormController, FormPageController } from '@ibiz-template/runtime';

export const FormPage = defineComponent({
  name: 'IBizFormPage',
  props: {
    modelData: {
      type: Object as PropType<IDEForm>,
      required: true,
    },
    controller: {
      type: Object as PropType<FormController>,
      required: true,
    },
  },
  setup(props) {
    const ns = useNamespace('form-page');
    const { semanticClass, semanticStyle } = useSemanticNode(props.controller);
    let position = 'top';
    if (props.modelData.tabHeaderPos) {
      position = props.modelData.tabHeaderPos.toLowerCase();
    }

    const onTabChange = (name: string) => {
      props.controller.setActiveTab(name);
    };

    return { ns, position, onTabChange, semanticClass, semanticStyle };
  },
  render() {
    const { noTabHeader } = this.modelData;
    const defaultSlots: VNode[] =
      (this.$slots.default?.()[0]?.children as VNode[]) || [];
    if (defaultSlots.length === 1 || noTabHeader) {
      return (
        <div
          class={[
            this.ns.b(),
            this.semanticClass('page', { page: this.controller }),
            this.ns.m('no-tab-header'),
          ]}
          style={this.semanticStyle('page', { page: this.controller })}
        >
          {defaultSlots}
        </div>
      );
    }
    return (
      <el-tabs
        class={[
          this.ns.b(),
          this.ns.b('tab'),
          this.semanticClass('page', { page: this.controller }),
          this.ns.e(this.position),
        ]}
        style={this.semanticStyle('page', { page: this.controller })}
        model-value={defaultSlots[0]?.key}
        tab-position={this.position}
        onTabChange={this.onTabChange}
      >
        {defaultSlots.map(slot => {
          const props = slot.props;
          if (!props || !props.controller) {
            return slot;
          }
          const c = props.controller as FormPageController;
          // 不显示且不用保活时直接不绘制
          if (!c.state.visible && !c.state.keepAlive) {
            return null;
          }
          return (
            <el-tab-pane
              class={[
                this.ns.b('tab-item'),
                this.semanticClass('page.item', {
                  page: this.controller,
                  item: c,
                }),
              ]}
              name={c.model.id}
              style={this.semanticStyle('page.item', {
                page: this.controller,
                item: c,
              })}
              lazy
            >
              {{
                default: (): VNode => slot,
                label: (): JSX.Element => {
                  return (
                    <span
                      class={[
                        ...c.labelClass,
                        this.ns.b('tab-label'),
                        this.semanticClass('page.label', {
                          page: this.controller,
                          item: c,
                        }),
                      ]}
                      style={this.semanticStyle('page.label', {
                        page: this.controller,
                        item: c,
                      })}
                    >
                      {c.model.sysImage ? (
                        <iBizIcon icon={c.model.sysImage} />
                      ) : null}
                      {c.model.caption}
                    </span>
                  );
                },
              }}
            </el-tab-pane>
          );
        })}
      </el-tabs>
    );
  },
});

export default FormPage;
