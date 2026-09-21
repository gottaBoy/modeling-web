'use strict';

var vue = require('vue');
var vue3Util = require('@ibiz-template/vue3-util');
require('./portlet-layout.css');
var runtime = require('@ibiz-template/runtime');
var core = require('@ibiz-template/core');

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
    return {
      c,
      ns,
      popperClass,
      portletType,
      isShowHeader,
      onActionClick,
      openLink,
      clickPorlet
    };
  },
  render() {
    var _a, _b;
    const {
      model,
      state
    } = this.controller;
    return vue.createVNode("div", {
      "class": [this.ns.b(), this.ns.is("no-header", !this.isShowHeader), this.ns.is("hight-light", state.hightLight)]
    }, [this.isShowHeader && vue.createVNode("div", {
      "key": "header",
      "class": this.ns.b("header")
    }, [vue.createVNode("div", {
      "class": this.ns.be("header", "left"),
      "onClick": (event) => this.clickPorlet(event, "title")
    }, [model.showTitleBar && vue.createVNode("div", {
      "class": [this.ns.e("caption"), this.ns.is("link", !!this.linkAction)],
      "onClick": this.openLink
    }, [vue.createVNode(vue.resolveComponent("iBizIcon"), {
      "class": this.ns.e("caption-icon"),
      "icon": model.sysImage
    }, null), vue.createVNode("span", {
      "class": this.ns.e("caption-text"),
      "title": core.showTitle(state.title)
    }, [state.title])])]), vue.createVNode("div", {
      "class": this.ns.be("header", "right")
    }, [model.portletType !== "ACTIONBAR" && model.uiactionGroup && vue.createVNode(vue.resolveComponent("iBizActionToolbar"), {
      "class": this.ns.e("toolbar"),
      "action-details": model.uiactionGroup.uiactionGroupDetails,
      "actions-state": state.actionGroupState,
      "mode": model.actionGroupExtractMode === "ITEMS" ? "dropdown" : "buttons",
      "popperClass": this.popperClass,
      "onActionClick": this.onActionClick
    }, null)])]), vue.createVNode("div", {
      "key": "content",
      "class": this.ns.b("content"),
      "onClick": (event) => this.clickPorlet(event, "content")
    }, [(_b = (_a = this.$slots).default) == null ? void 0 : _b.call(_a)])]);
  }
});

exports.PortletLayout = PortletLayout;
