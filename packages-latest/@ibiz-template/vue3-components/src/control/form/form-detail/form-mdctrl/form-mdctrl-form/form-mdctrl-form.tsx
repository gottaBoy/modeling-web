import { computed, defineComponent, h, resolveComponent } from 'vue';
import {
  EventBase,
  FormMDCtrlFormController,
  IEditFormController,
} from '@ibiz-template/runtime';
import { useNamespace, useSemanticNode } from '@ibiz-template/vue3-util';
import './form-mdctrl-form.scss';

export const FormMDCtrlForm = defineComponent({
  name: 'IBizFormMDCtrlForm',
  props: {
    controller: {
      type: FormMDCtrlFormController,
      required: true,
    },
  },
  setup(props) {
    const ns = useNamespace('form-mdctrl-form');
    const ns2 = useNamespace('form-mdctrl');
    const { semanticClass, semanticStyle } = useSemanticNode(
      props.controller.form,
    );

    /** 是否显示操作按钮 */
    const showActions = computed(() => {
      return props.controller.enableCreate || props.controller.enableDelete;
    });

    const renderAddBtn = () => {
      return (
        <el-button
          class={[
            ns.be('item-actions', 'create'),
            ns.be('item-actions', 'btn'),
            ns2.b('button'),
            semanticClass('mdctrl.button', props.controller, 'create'),
          ]}
          style={semanticStyle('mdctrl.button', props.controller, 'create')}
          onClick={(): void => props.controller.create()}
        >
          {ibiz.i18n.t('app.add')}
        </el-button>
      );
    };

    const onCreated = (id: string, event: EventBase): void => {
      props.controller.setFormController(id, event.ctrl as IEditFormController);
    };

    return {
      ns,
      ns2,
      showActions,
      onCreated,
      renderAddBtn,
      semanticClass,
      semanticStyle,
    };
  },
  render() {
    const { state, formProvider, model } = this.controller;

    if (model.detailStyle === 'STYLE2') {
      return (
        <iBizMDCtrlContainer2 controller={this.controller} items={state.items}>
          {{
            item: ({ data }: { data: IData }) => {
              if (!formProvider) {
                return (
                  <div>
                    {ibiz.i18n.t('control.form.formMDctrlForm.noFindProvider')}
                  </div>
                );
              }
              const formComponent = h(
                resolveComponent(formProvider.component),
                {
                  class: [
                    this.ns.be('item', 'form'),
                    this.ns2.b('item'),
                    this.semanticClass('mdctrl.item', {
                      mdctrl: this.controller,
                    }),
                  ],
                  style: this.semanticStyle('mdctrl.item', {
                    mdctrl: this.controller,
                  }),
                  key: data.id,
                  modelData: model.contentControl!,
                  context: data.context,
                  params: data.params,
                  onCreated: (event: EventBase) => {
                    this.onCreated(data.id, event);
                  },
                },
              );
              return formComponent;
            },
          }}
        </iBizMDCtrlContainer2>
      );
    }
    return (
      <iBizMDCtrlContainer
        class={[this.ns.b()]}
        items={state.items}
        controller={this.controller}
        enableCreate={this.controller.enableCreate}
        enableDelete={this.controller.enableDelete}
        onAddClick={(): void => this.controller.create()}
        onRemoveClick={(item: IData) => this.controller.remove(item.id)}
      >
        {{
          item: ({ data, index }: { data: IData; index: number }) => {
            if (!formProvider) {
              return (
                <div>
                  {ibiz.i18n.t('control.form.formMDctrlForm.noFindProvider')}
                </div>
              );
            }
            const formComponent = h(resolveComponent(formProvider.component), {
              class: [
                this.ns.be('item', 'form'),
                this.ns2.b('item'),
                this.semanticClass('mdctrl.item', { mdctrl: this.controller }),
              ],
              style: this.semanticStyle('mdctrl.item', {
                mdctrl: this.controller,
              }),
              key: data.id,
              modelData: model.contentControl!,
              mdCtrlFormIndex: index,
              context: data.context,
              params: data.params,
              onCreated: (event: EventBase) => {
                this.onCreated(data.id, event);
              },
            });
            return formComponent;
          },
        }}
      </iBizMDCtrlContainer>
    );
  },
});
