'use strict';

var vue = require('vue');
var vue3Util = require('@ibiz-template/vue3-util');
var runtime = require('@ibiz-template/runtime');
var core = require('@ibiz-template/core');
require('./portlet-layout.css');

"use strict";
const PortletLayout = /* @__PURE__ */ vue.defineComponent({
  name: "IBizPortletLayout",
  props: {
    controller: {
      type: runtime.PortletPartController,
      required: true
    },
    linkAction: {
      type: Object
    }
  },
  setup(props) {
    var _a;
    const ns = vue3Util.useNamespace("portlet-layout");
    const portletType = "portlet-".concat((_a = props.controller.model.portletType) == null ? void 0 : _a.toLowerCase());
    const c = props.controller;
    const {
      semanticClass,
      semanticStyle
    } = vue3Util.useSemanticNode(c.dashboard);
    const zIndex = props.controller.dashboard.state.zIndex;
    const popperClass = vue.computed(() => {
      const classNames = [ns.em("toolbar", "".concat(portletType, "-").concat(c.model.id))];
      const {
        codeName
      } = c.dashboard.view.model;
      classNames.push(ns.em("toolbar", codeName));
      return classNames;
    });
    const isShowHeader = vue.computed(() => {
      return c.model.showTitleBar && (c.model.title || c.model.sysImage) || c.model.uiactionGroup;
    });
    const onActionClick = async (detail, event) => {
      await props.controller.onActionClick(detail, event);
    };
    const openLink = (event) => {
      if (props.linkAction) {
        props.controller.onActionClick(props.linkAction, event);
      }
    };
    const clickPorlet = (event, position) => {
      event.stopPropagation();
      c.dashboard.view.evt.emit("onPorletClick", {
        data: {
          tag: c.model.codeName,
          position
        }
      });
    };
    const controlRenders = c.dashboard.model.controlRenders;
    const header = controlRenders == null ? void 0 : controlRenders.find((item) => "dashboard_".concat(item.id) === "".concat(c.model.name, "_header"));
    const headerCaption = controlRenders == null ? void 0 : controlRenders.find((item) => "dashboard_".concat(item.id) === "".concat(c.model.name, "_header_caption"));
    const headerBg = controlRenders == null ? void 0 : controlRenders.find((item) => "dashboard_".concat(item.id) === "".concat(c.model.name, "_header_bg"));
    const headerAction = controlRenders == null ? void 0 : controlRenders.find((item) => "dashboard_".concat(item.id) === "".concat(c.model.name, "_header_action"));
    const renderContent = (model) => {
      if (model.renderType === "LAYOUTPANEL_MODEL" && model.layoutPanelModel) {
        const htmlCode = runtime.ScriptFactory.execScriptFn({
          params: c.params,
          context: c.context
        }, model.layoutPanelModel, {
          isAsync: false
        });
        return vue.createVNode("div", {
          "class": ns.b("header-render"),
          "innerHTML": htmlCode
        }, null);
      }
      if (model.renderType === "LAYOUTPANEL" && model.layoutPanel) {
        return vue.createVNode(vue.resolveComponent("iBizControlShell"), {
          "class": ns.b("header-render"),
          "params": c.params,
          "context": c.context,
          "modelData": model.layoutPanel
        }, null);
      }
    };
    return {
      c,
      ns,
      zIndex,
      popperClass,
      portletType,
      isShowHeader,
      header,
      headerCaption,
      headerBg,
      headerAction,
      renderContent,
      openLink,
      clickPorlet,
      onActionClick,
      semanticClass,
      semanticStyle
    };
  },
  render() {
    var _a, _b;
    const {
      model,
      state
    } = this.controller;
    const isCustom = !!(this.header || this.headerCaption || this.headerBg || this.headerAction);
    return vue.createVNode("div", {
      "class": [this.ns.b(), this.ns.is("no-header", !this.isShowHeader), this.ns.is("hight-light", state.hightLight), this.semanticClass("portlet", {
        portlet: this.controller
      })],
      "style": this.semanticStyle("portlet", {
        portlet: this.controller
      })
    }, [this.isShowHeader ? this.header ? vue.createVNode("div", {
      "key": "header",
      "class": [this.ns.b("header"), this.ns.is("custom", isCustom), this.semanticClass("portlet.header", {
        portlet: this.controller
      })],
      "style": this.semanticStyle("portlet.header", {
        portlet: this.controller
      })
    }, [this.renderContent(this.header)]) : vue.createVNode("div", {
      "key": "header",
      "class": [this.ns.b("header"), this.ns.is("custom", isCustom), this.semanticClass("portlet.header", {
        portlet: this.controller
      })],
      "style": this.semanticStyle("portlet.header", {
        portlet: this.controller
      })
    }, [this.headerBg && vue.createVNode("div", {
      "class": this.ns.be("header", "bg")
    }, [this.renderContent(this.headerBg)]), vue.createVNode("div", {
      "class": this.ns.be("header", "left"),
      "onClick": (event) => this.clickPorlet(event, "title")
    }, [model.showTitleBar && (this.headerCaption ? this.renderContent(this.headerCaption) : vue.createVNode("div", {
      "class": [this.ns.e("caption"), this.ns.is("link", !!this.linkAction), this.semanticClass("portlet.caption", {
        portlet: this.controller
      })],
      "style": this.semanticStyle("portlet.caption", {
        portlet: this.controller
      }),
      "onClick": this.openLink
    }, [vue.createVNode(vue.resolveComponent("iBizIcon"), {
      "class": this.ns.e("caption-icon"),
      "icon": model.sysImage
    }, null), vue.createVNode("span", {
      "class": this.ns.e("caption-text"),
      "title": core.showTitle(state.title)
    }, [state.title])]))]), vue.createVNode("div", {
      "class": this.ns.be("header", "right")
    }, [this.headerAction ? this.renderContent(this.headerAction) : model.portletType !== "ACTIONBAR" && model.uiactionGroup && vue.createVNode(vue.resolveComponent("iBizActionToolbar"), {
      "zIndex": this.zIndex,
      "class": [this.ns.e("toolbar"), this.semanticClass("portlet.action", {
        portlet: this.controller
      })],
      "style": this.semanticStyle("portlet.action", {
        portlet: this.controller
      }),
      "action-details": model.uiactionGroup.uiactionGroupDetails,
      "actions-state": state.actionGroupState,
      "mode": model.actionGroupExtractMode === "ITEMS" ? "dropdown" : "buttons",
      "popperClass": this.popperClass,
      "onActionClick": this.onActionClick
    }, null)])]) : null, vue.createVNode("div", {
      "key": "content",
      "class": [this.ns.b("content"), this.semanticClass("portlet.content", {
        portlet: this.controller
      })],
      "style": this.semanticStyle("portlet.content", {
        portlet: this.controller
      }),
      "onClick": (event) => this.clickPorlet(event, "content")
    }, [(_b = (_a = this.$slots).default) == null ? void 0 : _b.call(_a)])]);
  }
});

exports.PortletLayout = PortletLayout;
