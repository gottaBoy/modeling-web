import {
  IBizIcon,
  useNamespace,
  useSemanticNode,
  useControlController,
} from '@ibiz-template/vue3-util';
import { defineComponent, PropType, resolveComponent, h } from 'vue';
import { IDEWizardEditForm, IDEWizardPanel } from '@ibiz/model-core';
import {
  EventBase,
  IControlProvider,
  WizardPanelController,
} from '@ibiz-template/runtime';
import { showTitle } from '@ibiz-template/core';
import './wizard-panel.scss';

export const WizardPanelControl = defineComponent({
  name: 'IBizWizardPanelControl',
  props: {
    /**
     * @description 向导面板模型数据
     */
    modelData: {
      type: Object as PropType<IDEWizardPanel>,
      required: true,
    },
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
  },
  setup() {
    const c = useControlController(
      (...args) => new WizardPanelController(...args),
    );
    const { semanticClass, semanticStyle } = useSemanticNode(c);
    const ns = useNamespace(`control-${c.model.controlType!.toLowerCase()}`);

    return { c, ns, semanticClass, semanticStyle };
  },
  render() {
    const { activeFormTag, buttonsState } = this.c.state;
    let stepsTitle = null;
    let formComponent = null;
    let footer = null;

    // 表单绘制
    if (activeFormTag && this.c.activeWizardForm) {
      if (this.c.providers[activeFormTag]) {
        const component = resolveComponent(
          this.c.providers[activeFormTag]!.component,
        );
        const editForm = this.c.model.deeditForms?.find(_editForm => {
          return (
            activeFormTag ===
            (_editForm as IDEWizardEditForm).dewizardForm?.formTag
          );
        });
        formComponent = h(component, {
          modelData: editForm,
          style: this.semanticStyle('content'),
          class: [this.ns.e('form'), this.semanticClass('content')],
          context: Object.assign(this.c.context, { srfsilent: true }),
          params: this.c.params,
          key: activeFormTag,
          onMounted: (event: EventBase) =>
            this.c.onFormMounted(activeFormTag, event),
          onSaveSuccess: (event: EventBase) => this.c.onFormSaved(event),
        });
      }

      const { dewizard } = this.c.model;
      // 底部按钮
      footer = dewizard && (
        <div
          key={`${activeFormTag}footer`}
          class={[this.ns.b('footer'), this.semanticClass('footer')]}
          style={this.semanticStyle('footer')}
        >
          {buttonsState[`${activeFormTag}@PREV`]?.visible && (
            <el-button
              class={[
                this.ns.be('footer', 'button'),
                this.semanticClass('footer.button', {
                  item: buttonsState[`${activeFormTag}@PREV`],
                }),
              ]}
              style={this.semanticStyle('footer.button', {
                item: buttonsState[`${activeFormTag}@PREV`],
              })}
              onClick={(): void => {
                this.c.onPrevClick();
              }}
            >
              {dewizard.prevCaption
                ? dewizard.prevCaption
                : ibiz.i18n.t('control.common.retreat')}
            </el-button>
          )}
          {buttonsState[`${activeFormTag}@NEXT`]?.visible && (
            <el-button
              class={[
                this.ns.be('footer', 'button'),
                this.semanticClass('footer.button', {
                  item: buttonsState[`${activeFormTag}@NEXT`],
                }),
              ]}
              style={this.semanticStyle('footer.button', {
                item: buttonsState[`${activeFormTag}@NEXT`],
              })}
              onClick={(): void => {
                this.c.onNextClick();
              }}
            >
              {dewizard.nextCaption
                ? dewizard.nextCaption
                : ibiz.i18n.t('control.common.forward')}
            </el-button>
          )}
          {buttonsState[`${activeFormTag}@FINISH`]?.visible && (
            <el-button
              class={[
                this.ns.be('footer', 'button'),
                this.semanticClass('footer.button', {
                  item: buttonsState[`${activeFormTag}@FINISH`],
                }),
              ]}
              style={this.semanticStyle('footer.button', {
                item: buttonsState[`${activeFormTag}@FINISH`],
              })}
              onClick={(): void => {
                this.c.onFinishClick();
              }}
            >
              {dewizard.finishCaption
                ? dewizard.finishCaption
                : ibiz.i18n.t('app.complete')}
            </el-button>
          )}
        </div>
      );

      const { dewizardSteps } = dewizard!;
      if (
        this.c.model.showStepBar &&
        dewizardSteps &&
        dewizardSteps.length > 0
      ) {
        let active = this.c.steps.indexOf(
          this.c.stepTags[
            `${
              this.c.model.name
            }_form_${this.c.state.activeFormTag?.toLowerCase()}`
          ],
        );
        if (active === -1) active = 0;

        stepsTitle = (
          <el-steps
            class={[
              this.ns.e('steps'),
              this.ns.b('header'),
              this.semanticClass('header'),
            ]}
            style={this.semanticStyle('header')}
            align-center
            active={active}
            finish-status='success'
          >
            {dewizardSteps.map(step => {
              const _slot = {
                title: () => (
                  <span
                    class={[
                      this.ns.em('step', 'caption'),
                      this.ns.bm('header', 'title'),
                      step.titleSysCss?.cssName,
                      this.semanticClass('step.caption', { item: step }),
                    ]}
                    style={this.semanticStyle('step.caption', { item: step })}
                  >
                    {showTitle(step.title)}
                  </span>
                ),
              };
              if (step.sysImage) {
                Object.assign(_slot, {
                  icon: () => (
                    <IBizIcon
                      style={this.semanticStyle('step.icon', { item: step })}
                      class={[
                        this.ns.bm('header', 'step-icon'),
                        this.ns.em('step', 'icon'),
                        this.semanticClass('step.icon', { item: step }),
                      ]}
                      icon={step.sysImage}
                    />
                  ),
                });
              }
              return (
                <el-step
                  class={[
                    this.ns.e('step'),
                    this.semanticClass('step', { item: step }),
                  ]}
                  style={this.semanticStyle('step', { item: step })}
                >
                  {_slot}
                </el-step>
              );
            })}
          </el-steps>
        );
      }
    }
    return (
      <iBizControlBase
        controller={this.c}
        class={[
          this.ns.b(),
          this.semanticClass('root'),
          this.ns.is('header', this.c.model.showStepBar),
        ]}
        style={this.semanticStyle('root')}
      >
        {stepsTitle}
        {formComponent}
        {footer}
      </iBizControlBase>
    );
  },
});
