import { defineComponent, computed, createVNode, resolveComponent } from 'vue';
import { useNamespace } from '@ibiz-template/vue3-util';
import './portlet-layout.css';
import { PortletPartController } from '@ibiz-template/runtime';
import { showTitle } from '@ibiz-template/core';

"use strict";
const PortletLayout = /* @__PURE__ */ defineComponent({
  name: "IBizPortletLayout",
  props: {
    controller: {
      type: PortletPartController,
      required: true
    },
    linkAction: {
      type: Object
    }
  },
  setup(props) {
    var _a;
    const ns = useNamespace("portlet-layout");
    const portletType = "portlet-".concat((_a = props.controller.model.portletType) == null ? void 0 : _a.toLowerCase());
    const c = props.controller;
    const popperClass = computed(() => {
      const classNames = [ns.em("toolbar", "".concat(portletType, "-").concat(c.model.id))];
      const {
        codeName
      } = c.dashboard.view.model;
      classNames.push(ns.em("toolbar", codeName));
      return classNames;
    });
    const isShowHeader = computed(() => {
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
    return createVNode("div", {
      "class": [this.ns.b(), this.ns.is("no-header", !this.isShowHeader), this.ns.is("hight-light", state.hightLight)]
    }, [this.isShowHeader && createVNode("div", {
      "key": "header",
      "class": this.ns.b("header")
    }, [createVNode("div", {
      "class": this.ns.be("header", "left"),
      "onClick": (event) => this.clickPorlet(event, "title")
    }, [model.showTitleBar && createVNode("div", {
      "class": [this.ns.e("caption"), this.ns.is("link", !!this.linkAction)],
      "onClick": this.openLink
    }, [createVNode(resolveComponent("iBizIcon"), {
      "class": this.ns.e("caption-icon"),
      "icon": model.sysImage
    }, null), createVNode("span", {
      "class": this.ns.e("caption-text"),
      "title": showTitle(state.title)
    }, [state.title])])]), createVNode("div", {
      "class": this.ns.be("header", "right")
    }, [model.portletType !== "ACTIONBAR" && model.uiactionGroup && createVNode(resolveComponent("iBizActionToolbar"), {
      "class": this.ns.e("toolbar"),
      "action-details": model.uiactionGroup.uiactionGroupDetails,
      "actions-state": state.actionGroupState,
      "mode": model.actionGroupExtractMode === "ITEMS" ? "dropdown" : "buttons",
      "popperClass": this.popperClass,
      "onActionClick": this.onActionClick
    }, null)])]), createVNode("div", {
      "key": "content",
      "class": this.ns.b("content"),
      "onClick": (event) => this.clickPorlet(event, "content")
    }, [(_b = (_a = this.$slots).default) == null ? void 0 : _b.call(_a)])]);
  }
});

export { PortletLayout };
