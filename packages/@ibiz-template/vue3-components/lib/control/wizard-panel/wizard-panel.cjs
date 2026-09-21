'use strict';

var vue = require('vue');
var vue3Util = require('@ibiz-template/vue3-util');
require('./wizard-panel.css');
var runtime = require('@ibiz-template/runtime');
var core = require('@ibiz-template/core');

"use strict";
function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !vue.isVNode(s);
}
const WizardPanelControl = /* @__PURE__ */ vue.defineComponent({
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
    const c = vue3Util.useControlController((...args) => new runtime.WizardPanelController(...args));
    const ns = vue3Util.useNamespace("control-".concat(c.model.controlType.toLowerCase()));
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
        const component = vue.resolveComponent(this.c.providers[activeFormTag].component);
        const editForm = (_a = this.c.model.deeditForms) == null ? void 0 : _a.find((_editForm) => {
          var _a2;
          return activeFormTag === ((_a2 = _editForm.dewizardForm) == null ? void 0 : _a2.formTag);
        });
        formComponent = vue.h(component, {
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
      footer = dewizard && vue.createVNode("div", {
        "key": "".concat(activeFormTag, "footer"),
        "class": this.ns.b("footer")
      }, [((_b = buttonsState["".concat(activeFormTag, "@PREV")]) == null ? void 0 : _b.visible) && vue.createVNode(vue.resolveComponent("el-button"), {
        "onClick": () => {
          this.c.onPrevClick();
        }
      }, {
        default: () => [dewizard.prevCaption ? dewizard.prevCaption : ibiz.i18n.t("control.common.retreat")]
      }), ((_c = buttonsState["".concat(activeFormTag, "@NEXT")]) == null ? void 0 : _c.visible) && vue.createVNode(vue.resolveComponent("el-button"), {
        "onClick": () => {
          this.c.onNextClick();
        }
      }, {
        default: () => [dewizard.nextCaption ? dewizard.nextCaption : ibiz.i18n.t("control.common.forward")]
      }), ((_d = buttonsState["".concat(activeFormTag, "@FINISH")]) == null ? void 0 : _d.visible) && vue.createVNode(vue.resolveComponent("el-button"), {
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
        stepsTitle = vue.createVNode(vue.resolveComponent("el-steps"), {
          "class": this.ns.b("header"),
          "align-center": true,
          "finish-status": "success",
          "active": active
        }, _isSlot(_slot = dewizardSteps.map((step) => {
          return vue.createVNode(vue.resolveComponent("el-step"), {
            "title": core.showTitle(step.title)
          }, null);
        })) ? _slot : {
          default: () => [_slot]
        });
      }
    }
    return vue.createVNode(vue.resolveComponent("iBizControlBase"), {
      "controller": this.c,
      "class": [this.ns.b(), this.ns.is("header", this.c.model.showStepBar)]
    }, {
      default: () => [stepsTitle, formComponent, footer]
    });
  }
});

exports.WizardPanelControl = WizardPanelControl;
