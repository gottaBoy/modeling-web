'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var vue3Util = require('@ibiz-template/vue3-util');
require('./form-tab-panel.css');
var runtime = require('@ibiz-template/runtime');

"use strict";
function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !vue.isVNode(s);
}
const FormTabPanel = /* @__PURE__ */ vue.defineComponent({
  name: "IBizFormTabPanel",
  props: {
    modelData: {
      type: Object,
      required: true
    },
    controller: {
      type: runtime.FormTabPanelController,
      required: true
    }
  },
  setup(props) {
    const ns = vue3Util.useNamespace("form-tab-panel");
    vue3Util.useController(props.controller);
    const {
      semanticClass,
      semanticStyle
    } = vue3Util.useSemanticNode(props.controller.form);
    const popoverVisible = vue.ref(false);
    const triggerClick = (key, event) => {
      const pageC = props.controller.form.details[key];
      if (pageC) {
        pageC.onClick(event);
      }
    };
    const onTabClick = (tabIns, event) => {
      props.controller.onTabChange(tabIns.props.name);
      triggerClick(tabIns.props.name, event);
    };
    const onPopoverClick = (key, event) => {
      props.controller.selectTab(key);
      popoverVisible.value = false;
      triggerClick(key, event);
    };
    const renderAllTabContent = () => {
      var _a;
      return vue.createVNode("div", {
        "class": ns.be("tab-panel-container-style2", "content")
      }, [(_a = props.modelData.deformTabPages) == null ? void 0 : _a.map((page) => {
        return vue.createVNode("div", {
          "class": [ns.be("tab-panel-container-style2", "tab-item-content"), ns.is("active", page.id === props.controller.state.activeTab)],
          "onClick": (event) => onPopoverClick(page.codeName, event),
          "title": page.caption
        }, [page.caption]);
      })]);
    };
    return {
      ns,
      popoverVisible,
      onTabClick,
      renderAllTabContent,
      semanticClass,
      semanticStyle
    };
  },
  render() {
    var _a, _b;
    let _slot2;
    const isStyle2 = this.modelData.detailStyle === "STYLE2";
    const defaultSlots = ((_b = (_a = this.$slots).default) == null ? void 0 : _b.call(_a)) || [];
    const renderItemText = (c) => {
      return vue.createVNode("span", {
        "class": [this.ns.b("tab-item-content"), this.semanticClass("tabpanel.label", {
          tabPanel: this.controller,
          item: c
        }), ...c.labelClass],
        "style": this.semanticStyle("tabpanel.label", {
          tabPanel: this.controller,
          item: c
        })
      }, [c.model.sysImage && vue.createVNode(vue.resolveComponent("iBizIcon"), {
        "icon": c.model.sysImage
      }, null), c.model.showCaption && c.model.caption]);
    };
    const tabContent = vue.withDirectives(vue.createVNode(vue.resolveComponent("el-tabs"), {
      "class": [this.ns.b(), this.semanticClass("tabpanel", {
        tabPanel: this.controller
      }), this.ns.m(this.modelData.codeName), this.modelData.detailStyle ? this.ns.m(this.modelData.detailStyle.toLowerCase()) : "", ...this.controller.containerClass],
      "style": this.semanticStyle("tabpanel", {
        tabPanel: this.controller
      }),
      "model-value": this.controller.state.activeTab,
      "element-loading-text": this.controller.state.loadingText,
      "onTabClick": this.onTabClick
    }, _isSlot(_slot2 = defaultSlots.map((slot) => {
      const props = slot.props;
      if (!props || !props.controller) {
        return slot;
      }
      const c = props.controller;
      if (!c.state.visible && !c.state.keepAlive) {
        return null;
      }
      return vue.createVNode(vue.resolveComponent("el-tab-pane"), {
        "class": [this.ns.b("tab-item"), this.semanticClass("tabpanel.item", {
          tabPanel: this.controller,
          item: c
        })],
        "style": this.semanticStyle("tabpanel.item", {
          tabPanel: this.controller,
          item: c
        }),
        "label": c.model.caption,
        "name": c.model.id,
        "lazy": true
      }, {
        default: () => slot,
        label: () => {
          let _slot;
          const value = c.model.counterId ? this.controller.state.counterData[c.model.counterId] : void 0;
          return c.model.counterId ? vue.createVNode(vue.resolveComponent("el-badge"), {
            "class": [this.ns.e("badge"), this.ns.is("no-counter", !value && value !== 0 || c.model.counterMode === 1 && value <= 0)],
            "data-value": value,
            "value": value,
            "hidden": !value && value !== 0 || c.model.counterMode === 1 && value <= 0,
            "max": 99
          }, _isSlot(_slot = renderItemText(c)) ? _slot : {
            default: () => [_slot]
          }) : renderItemText(c);
        }
      });
    })) ? _slot2 : {
      default: () => [_slot2]
    }), [[vue.resolveDirective("loading"), this.controller.state.loading && !isStyle2]]);
    if (this.modelData.detailStyle === "STYLE2") {
      return vue.withDirectives(vue.createVNode("div", {
        "class": [this.ns.b("tab-panel-container-style2"), this.semanticClass("tabpanel", {
          tabPanel: this.controller
        })],
        "style": this.semanticStyle("tabpanel", {
          tabPanel: this.controller
        }),
        "element-loading-text": this.controller.state.loadingText
      }, [tabContent, vue.createVNode(vue.resolveComponent("el-popover"), {
        "trigger": "click",
        "placement": "top-end",
        "visible": this.popoverVisible,
        "onUpdate:visible": ($event) => this.popoverVisible = $event,
        "popper-class": this.ns.be("tab-panel-container-style2", "popover")
      }, {
        reference: () => {
          return vue.createVNode("div", {
            "class": this.ns.be("tab-panel-container-style2", "select")
          }, [vue.createVNode("div", {
            "class": this.ns.bem("tab-panel-container-style2", "select", "title")
          }, [ibiz.i18n.t("control.form.formTabPnel.all")]), vue.createVNode("ion-icon", {
            "name": "caret-down-outline"
          }, null)]);
        },
        default: () => {
          return this.renderAllTabContent();
        }
      })]), [[vue.resolveDirective("loading"), this.controller.state.loading]]);
    }
    return tabContent;
  }
});

exports.FormTabPanel = FormTabPanel;
exports.default = FormTabPanel;
