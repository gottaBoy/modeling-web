'use strict';

var vue = require('vue');
var vue3Util = require('@ibiz-template/vue3-util');
var runtime = require('@ibiz-template/runtime');
var core = require('@ibiz-template/core');
require('./wizard-panel.css');

"use strict";
function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !vue.isVNode(s);
}
const WizardPanelControl = /* @__PURE__ */ vue.defineComponent({
  name: "IBizWizardPanelControl",
  props: {
    /**
     * @description 向导面板模型数据
     */
    modelData: {
      type: Object,
      required: true
    },
    /**
     * @description 应用上下文对象
     */
    context: {
      type: Object,
      required: true
    },
    /**
     * @description 视图参数对象
     * @default {}
     */
    params: {
      type: Object,
      default: () => ({})
    },
    /**
     * @description 部件适配器
     */
    provider: {
      type: Object
    }
  },
  setup() {
    const c = vue3Util.useControlController((...args) => new runtime.WizardPanelController(...args));
    const {
      semanticClass,
      semanticStyle
    } = vue3Util.useSemanticNode(c);
    const ns = vue3Util.useNamespace("control-".concat(c.model.controlType.toLowerCase()));
    return {
      c,
      ns,
      semanticClass,
      semanticStyle
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
          modelData: editForm,
          style: this.semanticStyle("content"),
          class: [this.ns.e("form"), this.semanticClass("content")],
          context: Object.assign(this.c.context, {
            srfsilent: true
          }),
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
        "class": [this.ns.b("footer"), this.semanticClass("footer")],
        "style": this.semanticStyle("footer")
      }, [((_b = buttonsState["".concat(activeFormTag, "@PREV")]) == null ? void 0 : _b.visible) && vue.createVNode(vue.resolveComponent("el-button"), {
        "class": [this.ns.be("footer", "button"), this.semanticClass("footer.button", {
          item: buttonsState["".concat(activeFormTag, "@PREV")]
        })],
        "style": this.semanticStyle("footer.button", {
          item: buttonsState["".concat(activeFormTag, "@PREV")]
        }),
        "onClick": () => {
          this.c.onPrevClick();
        }
      }, {
        default: () => [dewizard.prevCaption ? dewizard.prevCaption : ibiz.i18n.t("control.common.retreat")]
      }), ((_c = buttonsState["".concat(activeFormTag, "@NEXT")]) == null ? void 0 : _c.visible) && vue.createVNode(vue.resolveComponent("el-button"), {
        "class": [this.ns.be("footer", "button"), this.semanticClass("footer.button", {
          item: buttonsState["".concat(activeFormTag, "@NEXT")]
        })],
        "style": this.semanticStyle("footer.button", {
          item: buttonsState["".concat(activeFormTag, "@NEXT")]
        }),
        "onClick": () => {
          this.c.onNextClick();
        }
      }, {
        default: () => [dewizard.nextCaption ? dewizard.nextCaption : ibiz.i18n.t("control.common.forward")]
      }), ((_d = buttonsState["".concat(activeFormTag, "@FINISH")]) == null ? void 0 : _d.visible) && vue.createVNode(vue.resolveComponent("el-button"), {
        "class": [this.ns.be("footer", "button"), this.semanticClass("footer.button", {
          item: buttonsState["".concat(activeFormTag, "@FINISH")]
        })],
        "style": this.semanticStyle("footer.button", {
          item: buttonsState["".concat(activeFormTag, "@FINISH")]
        }),
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
        let _slot2;
        let active = this.c.steps.indexOf(this.c.stepTags["".concat(this.c.model.name, "_form_").concat((_e = this.c.state.activeFormTag) == null ? void 0 : _e.toLowerCase())]);
        if (active === -1)
          active = 0;
        stepsTitle = vue.createVNode(vue.resolveComponent("el-steps"), {
          "class": [this.ns.e("steps"), this.ns.b("header"), this.semanticClass("header")],
          "style": this.semanticStyle("header"),
          "align-center": true,
          "active": active,
          "finish-status": "success"
        }, _isSlot(_slot2 = dewizardSteps.map((step) => {
          const _slot = {
            title: () => {
              var _a2;
              return vue.createVNode("span", {
                "class": [this.ns.em("step", "caption"), this.ns.bm("header", "title"), (_a2 = step.titleSysCss) == null ? void 0 : _a2.cssName, this.semanticClass("step.caption", {
                  item: step
                })],
                "style": this.semanticStyle("step.caption", {
                  item: step
                })
              }, [core.showTitle(step.title)]);
            }
          };
          if (step.sysImage) {
            Object.assign(_slot, {
              icon: () => vue.createVNode(vue3Util.IBizIcon, {
                "style": this.semanticStyle("step.icon", {
                  item: step
                }),
                "class": [this.ns.bm("header", "step-icon"), this.ns.em("step", "icon"), this.semanticClass("step.icon", {
                  item: step
                })],
                "icon": step.sysImage
              }, null)
            });
          }
          return vue.createVNode(vue.resolveComponent("el-step"), {
            "class": [this.ns.e("step"), this.semanticClass("step", {
              item: step
            })],
            "style": this.semanticStyle("step", {
              item: step
            })
          }, _isSlot(_slot) ? _slot : {
            default: () => [_slot]
          });
        })) ? _slot2 : {
          default: () => [_slot2]
        });
      }
    }
    return vue.createVNode(vue.resolveComponent("iBizControlBase"), {
      "controller": this.c,
      "class": [this.ns.b(), this.semanticClass("root"), this.ns.is("header", this.c.model.showStepBar)],
      "style": this.semanticStyle("root")
    }, {
      default: () => [stepsTitle, formComponent, footer]
    });
  }
});

exports.WizardPanelControl = WizardPanelControl;
