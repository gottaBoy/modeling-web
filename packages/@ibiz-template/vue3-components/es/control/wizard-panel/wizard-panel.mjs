import { isVNode, defineComponent, resolveComponent, h, createVNode } from 'vue';
import { useControlController, useNamespace } from '@ibiz-template/vue3-util';
import './wizard-panel.css';
import { WizardPanelController } from '@ibiz-template/runtime';
import { showTitle } from '@ibiz-template/core';

"use strict";
function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !isVNode(s);
}
const WizardPanelControl = /* @__PURE__ */ defineComponent({
  name: "IBizWizardPanelControl",
  props: {
    modelData: {
      type: Object,
      required: true
    },
    context: {
      type: Object,
      required: true
    },
    params: {
      type: Object,
      default: () => ({})
    },
    provider: {
      type: Object
    }
  },
  setup() {
    const c = useControlController((...args) => new WizardPanelController(...args));
    const ns = useNamespace("control-".concat(c.model.controlType.toLowerCase()));
    return {
      c,
      ns
    };
  },
  render() {
    var _a, _b, _c, _d, _e;
    const {
      activeFormTag,
      buttonsState
    } = this.c.state;
    let stepsTitle = null;
    let formComponent = null;
    let footer = null;
    if (activeFormTag && this.c.activeWizardForm) {
      if (this.c.providers[activeFormTag]) {
        const component = resolveComponent(this.c.providers[activeFormTag].component);
        const editForm = (_a = this.c.model.deeditForms) == null ? void 0 : _a.find((_editForm) => {
          var _a2;
          return activeFormTag === ((_a2 = _editForm.dewizardForm) == null ? void 0 : _a2.formTag);
        });
        formComponent = h(component, {
          class: this.ns.e("form"),
          modelData: editForm,
          context: this.c.context,
          params: this.c.params,
          key: activeFormTag,
          onMounted: (event) => this.c.onFormMounted(activeFormTag, event),
          onSaveSuccess: (event) => this.c.onFormSaved(event)
        });
      }
      const {
        dewizard
      } = this.c.model;
      footer = dewizard && createVNode("div", {
        "key": "".concat(activeFormTag, "footer"),
        "class": this.ns.b("footer")
      }, [((_b = buttonsState["".concat(activeFormTag, "@PREV")]) == null ? void 0 : _b.visible) && createVNode(resolveComponent("el-button"), {
        "onClick": () => {
          this.c.onPrevClick();
        }
      }, {
        default: () => [dewizard.prevCaption ? dewizard.prevCaption : ibiz.i18n.t("control.common.retreat")]
      }), ((_c = buttonsState["".concat(activeFormTag, "@NEXT")]) == null ? void 0 : _c.visible) && createVNode(resolveComponent("el-button"), {
        "onClick": () => {
          this.c.onNextClick();
        }
      }, {
        default: () => [dewizard.nextCaption ? dewizard.nextCaption : ibiz.i18n.t("control.common.forward")]
      }), ((_d = buttonsState["".concat(activeFormTag, "@FINISH")]) == null ? void 0 : _d.visible) && createVNode(resolveComponent("el-button"), {
        "onClick": () => {
          this.c.onFinishClick();
        }
      }, {
        default: () => [dewizard.finishCaption ? dewizard.finishCaption : ibiz.i18n.t("app.complete")]
      })]);
      const {
        dewizardSteps
      } = dewizard;
      if (this.c.model.showStepBar && dewizardSteps && dewizardSteps.length > 0) {
        let _slot;
        let active = this.c.steps.indexOf(this.c.stepTags["".concat(this.c.model.name, "_form_").concat((_e = this.c.state.activeFormTag) == null ? void 0 : _e.toLowerCase())]);
        if (active === -1)
          active = 0;
        stepsTitle = createVNode(resolveComponent("el-steps"), {
          "class": this.ns.b("header"),
          "align-center": true,
          "finish-status": "success",
          "active": active
        }, _isSlot(_slot = dewizardSteps.map((step) => {
          return createVNode(resolveComponent("el-step"), {
            "title": showTitle(step.title)
          }, null);
        })) ? _slot : {
          default: () => [_slot]
        });
      }
    }
    return createVNode(resolveComponent("iBizControlBase"), {
      "controller": this.c,
      "class": [this.ns.b(), this.ns.is("header", this.c.model.showStepBar)]
    }, {
      default: () => [stepsTitle, formComponent, footer]
    });
  }
});

export { WizardPanelControl };
