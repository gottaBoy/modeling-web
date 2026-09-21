import { defineComponent, createVNode, resolveComponent } from 'vue';
import { useRouter } from 'vue-router';
import { showTitle } from '@ibiz-template/core';
import { useNamespace, useSemanticNode } from '@ibiz-template/vue3-util';
import { AppSwitchController } from './app-switch.controller.mjs';
import './app-switch.css';

"use strict";
const AppSwitch = /* @__PURE__ */ defineComponent({
  name: "IBizAppSwitch",
  props: {
    /**
     * @description 应用切换器模型数据
     */
    modelData: {
      type: Object,
      required: true
    },
    /**
     * @description 应用切换器控制器
     */
    controller: {
      type: AppSwitchController,
      required: true
    }
  },
  setup(props) {
    const ns = useNamespace("app-switch");
    const {
      semanticClass,
      semanticStyle
    } = useSemanticNode(props.controller);
    const {
      state
    } = props.controller;
    const router = useRouter();
    const handleClick = (id) => {
      props.controller.switchMicroApp(id, router);
    };
    return {
      ns,
      state,
      handleClick,
      semanticClass,
      semanticStyle
    };
  },
  render() {
    if (!this.state.visible) {
      return null;
    }
    return createVNode(resolveComponent("el-dropdown"), {
      "class": [this.ns.b(), this.semanticClass("root")],
      "style": this.semanticStyle("root"),
      "trigger": "click",
      "onCommand": (command) => this.handleClick(command)
    }, {
      default: () => createVNode("span", {
        "class": [this.ns.e("icon"), this.semanticClass("content")],
        "style": this.semanticStyle("content")
      }, [createVNode("i", {
        "class": "fa fa-th",
        "aria-hidden": "true"
      }, null)]),
      dropdown: () => createVNode(resolveComponent("el-dropdown-menu"), {
        "class": [this.ns.e("dropdown"), this.semanticClass("popup")],
        "style": this.semanticStyle("popup")
      }, {
        default: () => [this.state.items.length > 0 ? this.state.items.map((item) => {
          return createVNode(resolveComponent("el-dropdown-item"), {
            "class": [this.ns.e("item"), this.semanticClass("item", {
              item
            }), this.ns.is("active", this.state.activeMicroAppId === item.id)],
            "style": this.semanticStyle("item", {
              item
            }),
            "title": showTitle(item.caption),
            "command": item.id
          }, {
            default: () => [item.caption]
          });
        }) : createVNode(resolveComponent("iBizNoData"), {
          "class": this.semanticClass("empty"),
          "style": this.semanticStyle("empty")
        }, null)]
      })
    });
  }
});

export { AppSwitch };
