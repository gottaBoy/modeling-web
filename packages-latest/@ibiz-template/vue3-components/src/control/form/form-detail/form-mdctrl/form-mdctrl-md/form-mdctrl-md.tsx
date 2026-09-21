import {
  VNode,
  computed,
  defineComponent,
  h,
  ref,
  resolveComponent,
} from 'vue';
import {
  EventBase,
  FormMDCtrlMDController,
  IMDControlController,
} from '@ibiz-template/runtime';
import { useNamespace, useSemanticNode } from '@ibiz-template/vue3-util';
import './form-mdctrl-md.scss';
import { showTitle } from '@ibiz-template/core';

export const FormMDCtrlMD = defineComponent({
  name: 'IBizFormMDCtrlMD',
  props: {
    controller: {
      type: FormMDCtrlMDController,
      required: true,
    },
  },
  setup(props) {
    const ns = useNamespace('form-mdctrl-md');
    const ns2 = useNamespace('form-mdctrl');
    const { semanticClass, semanticStyle } = useSemanticNode(
      props.controller.form,
    );

    /** 是否显示操作按钮 */
    const showActions = computed(() => {
      return props.controller.enableCreate || props.controller.enableDelete;
    });

    const onCreated = (event: EventBase): void => {
      props.controller.setMDControl(event.ctrl as IMDControlController);
    };

    /** 是否选中数据 */
    const isSelected = ref(false);
    const onSelectionChange = (event: EventBase): void => {
      isSelected.value = event.data.length > 0;
    };

    /** 处理删除 */
    const handleRemove = (): void => {
      isSelected.value = false;
      props.controller.remove();
    };

    /** 绘制删除按钮 */
    const renderRemoveBtn = () => {
      if (!props.controller.enableDelete) return null;
      if (ibiz.config.form.mdCtrlConfirmBeforeRemove) {
        return (
          <el-popconfirm
            title={showTitle(
              ibiz.i18n.t('control.form.mdCtrlContainer.promptInformation'),
            )}
            confirm-button-text={ibiz.i18n.t('app.confirm')}
            cancel-button-text={ibiz.i18n.t('app.cancel')}
            onConfirm={() => handleRemove()}
          >
            {{
              reference: () => {
                return (
                  <el-button
                    type='danger'
                    disabled={!isSelected.value}
                    class={[
                      ns.be('actions', 'remove'),
                      ns.be('actions', 'btn'),
                      ns2.b('button'),
                      semanticClass('mdctrl.button', {
                        mdctrl: props.controller,
                        tag: 'remove',
                      }),
                    ]}
                    style={semanticStyle('mdctrl.button', {
                      mdctrl: props.controller,
                      tag: 'remove',
                    })}
                  >
                    {ibiz.i18n.t('app.delete')}
                  </el-button>
                );
              },
            }}
          </el-popconfirm>
        );
      }
      return (
        <el-button
          type='danger'
          disabled={!isSelected.value}
          class={[
            ns.be('actions', 'remove'),
            ns.be('actions', 'btn'),
            ns2.b('button'),
            semanticClass('mdctrl.button', {
              mdctrl: props.controller,
              tag: 'remove',
            }),
          ]}
          style={semanticStyle('mdctrl.button', {
            mdctrl: props.controller,
            tag: 'remove',
          })}
          onClick={(): void => handleRemove()}
        >
          {ibiz.i18n.t('app.delete')}
        </el-button>
      );
    };

    return {
      ns,
      ns2,
      showActions,
      onCreated,
      onSelectionChange,
      renderRemoveBtn,
      semanticClass,
      semanticStyle,
    };
  },
  render() {
    const { mdProvider, model } = this.controller;

    let controlComponent: VNode | null = null;

    //* 绘制多数据部件
    const controlProps: IData = {
      modelData: model.contentControl!,
      context: this.controller.form.context,
      params: this.controller.form.params,
      loadDefault: false,
      onCreated: this.onCreated,
      onSelectionChange: this.onSelectionChange,
    };

    // 表格的额外props
    if (model.contentType === 'GRID') {
      controlProps.rowEditOpen = true;
    }

    controlComponent = h(resolveComponent(mdProvider.component), controlProps);

    return (
      <div class={[this.ns.b()]}>
        <div class={[this.ns.b('content')]}>{controlComponent}</div>
        {this.showActions && (
          <div class={this.ns.b('actions')}>
            {this.controller.enableCreate && (
              <el-button
                class={[
                  this.ns.be('actions', 'create'),
                  this.ns.be('actions', 'btn'),
                  this.ns2.b('button'),
                  this.semanticClass('mdctrl.button', {
                    mdctrl: this.controller,
                    tag: 'create',
                  }),
                ]}
                style={this.semanticStyle('mdctrl.button', {
                  mdctrl: this.controller,
                  tag: 'create',
                })}
                onClick={(): void => this.controller.create()}
              >
                {ibiz.i18n.t('app.add')}
              </el-button>
            )}
            {this.renderRemoveBtn()}
          </div>
        )}
      </div>
    );
  },
});
