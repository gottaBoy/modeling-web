import { isVNode, defineComponent, createVNode, resolveComponent, withDirectives, resolveDirective, ref } from 'vue';
import { useNamespace, useController, useSemanticNode } from '@ibiz-template/vue3-util';
import './form-tab-panel.css';
import { FormTabPanelController } from '@ibiz-template/runtime';

"use strict";
function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !isVNode(s);
}
const FormTabPanel = /* @__PURE__ */ defineComponent({
  name: "IBizFormTabPanel",
  props: {
    modelData: {
      type: Object,
      required: true
    },
    controller: {
      type: FormTabPanelController,
      required: true
    }
  },
  setup(props) {
    const ns = useNamespace("form-tab-panel");
    useController(props.controller);
    const {
      semanticClass,
      semanticStyle
    } = useSemanticNode(props.controller.form);
    const popoverVisible = ref(false);
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
      return createVNode("div", {
        "class": ns.be("tab-panel-container-style2", "content")
      }, [(_a = props.modelData.deformTabPages) == null ? void 0 : _a.map((page) => {
        return createVNode("div", {
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
      return createVNode("span", {
        "class": [this.ns.b("tab-item-content"), this.semanticClass("tabpanel.label", {
          tabPanel: this.controller,
          item: c
        }), ...c.labelClass],
        "style": this.semanticStyle("tabpanel.label", {
          tabPanel: this.controller,
          item: c
        })
      }, [c.model.sysImage && createVNode(resolveComponent("iBizIcon"), {
        "icon": c.model.sysImage
      }, null), c.model.showCaption && c.model.caption]);
    };
    const tabContent = withDirectives(createVNode(resolveComponent("el-tabs"), {
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
      return createVNode(resolveComponent("el-tab-pane"), {
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
          return c.model.counterId ? createVNode(resolveComponent("el-badge"), {
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
    }), [[resolveDirective("loading"), this.controller.state.loading && !isStyle2]]);
    if (this.modelData.detailStyle === "STYLE2") {
      return withDirectives(createVNode("div", {
        "class": [this.ns.b("tab-panel-container-style2"), this.semanticClass("tabpanel", {
          tabPanel: this.controller
        })],
        "style": this.semanticStyle("tabpanel", {
          tabPanel: this.controller
        }),
        "element-loading-text": this.controller.state.loadingText
      }, [tabContent, createVNode(resolveComponent("el-popover"), {
        "trigger": "click",
        "placement": "top-end",
        "visible": this.popoverVisible,
        "onUpdate:visible": ($event) => this.popoverVisible = $event,
        "popper-class": this.ns.be("tab-panel-container-style2", "popover")
      }, {
        reference: () => {
          return createVNode("div", {
            "class": this.ns.be("tab-panel-container-style2", "select")
          }, [createVNode("div", {
            "class": this.ns.bem("tab-panel-container-style2", "select", "title")
          }, [ibiz.i18n.t("control.form.formTabPnel.all")]), createVNode("ion-icon", {
            "name": "caret-down-outline"
          }, null)]);
        },
        default: () => {
          return this.renderAllTabContent();
        }
      })]), [[resolveDirective("loading"), this.controller.state.loading]]);
    }
    return tabContent;
  }
});

export { FormTabPanel, FormTabPanel as default };
