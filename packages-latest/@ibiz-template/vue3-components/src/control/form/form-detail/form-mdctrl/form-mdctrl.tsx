import { defineComponent, PropType } from 'vue';
import {
  useController,
  useNamespace,
  useSemanticNode,
} from '@ibiz-template/vue3-util';
import { IDEFormMDCtrl, IUIActionGroupDetail } from '@ibiz/model-core';
import { FormMDCtrlController } from '@ibiz-template/runtime';
import './form-mdctrl.scss';

export const FormMDCtrl = defineComponent({
  name: 'IBizFormMDCtrl',
  props: {
    modelData: {
      type: Object as PropType<IDEFormMDCtrl>,
      required: true,
    },
    controller: {
      type: FormMDCtrlController,
      required: true,
    },
  },
  setup(props) {
    const ns = useNamespace('form-mdctrl');
    useController(props.controller);
    const { semanticClass, semanticStyle } = useSemanticNode(
      props.controller.form,
    );

    const c = props.controller;
    const zIndex = props.controller.form.state.zIndex;
    const hasCaption = c.model.showCaption && !!c.model.caption;
    const hasHeader = hasCaption || c.model.uiactionGroup;

    // 是否处于设计预览状态
    const isDesignPreview = c.context?.srfrunmode === 'DESIGN';

    const onActionClick = async (
      detail: IUIActionGroupDetail,
      event: MouseEvent,
    ): Promise<void> => {
      await props.controller.onActionClick(detail, event);
    };

    return {
      c,
      ns,
      zIndex,
      hasHeader,
      hasCaption,
      isDesignPreview,
      onActionClick,
      semanticClass,
      semanticStyle,
    };
  },
  render() {
    if (this.isDesignPreview) {
      return (
        <div class={this.ns.b()}>
          <div class={this.ns.b('preview-content')}>
            {ibiz.i18n.t('control.form.formMDctrl.defaultText')}
          </div>
        </div>
      );
    }
    const { model } = this.c;
    let content;

    // 根据内容类型绘制内容组件
    switch (model.contentType) {
      case 'GRID':
      case 'LIST':
      case 'DATAVIEW':
        content = (
          <iBizFormMDCtrlMD
            class={[
              this.ns.b('content'),
              this.semanticClass('mdctrl.content', {
                mdctrl: this.controller,
              }),
            ]}
            style={this.semanticStyle('mdctrl.content', {
              mdctrl: this.controller,
            })}
            controller={this.c}
          />
        );
        break;
      case 'FORM':
        content = (
          <iBizFormMDCtrlForm
            class={[
              this.ns.b('content'),
              this.semanticClass('mdctrl.content', {
                mdctrl: this.controller,
              }),
            ]}
            style={this.semanticStyle('mdctrl.content', {
              mdctrl: this.controller,
            })}
            controller={this.c}
          />
        );
        break;
      case 'REPEATER':
        content = (
          <iBizFormMDCtrlRepeater
            class={[
              this.ns.b('content'),
              this.semanticClass('mdctrl.content', {
                mdctrl: this.controller,
              }),
            ]}
            style={this.semanticStyle('mdctrl.content', {
              mdctrl: this.controller,
            })}
            controller={this.c}
          />
        );
        break;
      default:
        <div>{ibiz.i18n.t('app.noSupport')}</div>;
        break;
    }
    return (
      <div
        class={[
          this.ns.b(),
          this.ns.m(this.modelData.codeName),
          ...this.controller.containerClass,
          this.hasCaption ? this.ns.m('show-caption') : '',
          this.semanticClass('mdctrl', { mdctrl: this.controller }),
        ]}
        style={this.semanticStyle('mdctrl', { mdctrl: this.controller })}
      >
        {this.hasHeader && (
          <div
            class={[
              this.ns.b('header'),
              this.semanticClass('mdctrl.header', { mdctrl: this.controller }),
            ]}
            style={this.semanticStyle('mdctrl.header', {
              mdctrl: this.controller,
            })}
          >
            <div
              class={[
                this.ns.b('title'),
                this.semanticClass('mdctrl.caption', {
                  mdctrl: this.controller,
                }),
              ]}
              style={this.semanticStyle('mdctrl.caption', {
                mdctrl: this.controller,
              })}
            >
              {this.hasCaption ? this.c.model.caption : ''}
            </div>
            {model.uiactionGroup && (
              <iBizActionToolbar
                zIndex={this.zIndex}
                class={[
                  this.ns.b('toolbar'),
                  this.semanticClass('mdctrl.toolbar', {
                    mdctrl: this.controller,
                  }),
                ]}
                style={this.semanticStyle('mdctrl.toolbar', {
                  mdctrl: this.controller,
                })}
                action-details={model.uiactionGroup.uiactionGroupDetails}
                actions-state={this.controller.state.actionGroupState}
                onActionClick={this.onActionClick}
              ></iBizActionToolbar>
            )}
          </div>
        )}
        {content}
      </div>
    );
  },
});

export default FormMDCtrl;
