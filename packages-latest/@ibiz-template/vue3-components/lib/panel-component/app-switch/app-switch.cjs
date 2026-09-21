'use strict';

var vue = require('vue');
var vueRouter = require('vue-router');
var core = require('@ibiz-template/core');
var vue3Util = require('@ibiz-template/vue3-util');
var appSwitch_controller = require('./app-switch.controller.cjs');
require('./app-switch.css');

"use strict";
const AppSwitch = /* @__PURE__ */ vue.defineComponent({
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
      type: appSwitch_controller.AppSwitchController,
      required: true
    }
  },
  setup(props) {
    const ns = vue3Util.useNamespace("app-switch");
    const {
      semanticClass,
      semanticStyle
    } = vue3Util.useSemanticNode(props.controller);
    const {
      state
    } = props.controller;
    const router = vueRouter.useRouter();
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
    return vue.createVNode(vue.resolveComponent("el-dropdown"), {
      "class": [this.ns.b(), this.semanticClass("root")],
      "style": this.semanticStyle("root"),
      "trigger": "click",
      "onCommand": (command) => this.handleClick(command)
    }, {
      default: () => vue.createVNode("span", {
        "class": [this.ns.e("icon"), this.semanticClass("content")],
        "style": this.semanticStyle("content")
      }, [vue.createVNode("i", {
        "class": "fa fa-th",
        "aria-hidden": "true"
      }, null)]),
      dropdown: () => vue.createVNode(vue.resolveComponent("el-dropdown-menu"), {
        "class": [this.ns.e("dropdown"), this.semanticClass("popup")],
        "style": this.semanticStyle("popup")
      }, {
        default: () => [this.state.items.length > 0 ? this.state.items.map((item) => {
          return vue.createVNode(vue.resolveComponent("el-dropdown-item"), {
            "class": [this.ns.e("item"), this.semanticClass("item", {
              item
            }), this.ns.is("active", this.state.activeMicroAppId === item.id)],
            "style": this.semanticStyle("item", {
              item
            }),
            "title": core.showTitle(item.caption),
            "command": item.id
          }, {
            default: () => [item.caption]
          });
        }) : vue.createVNode(vue.resolveComponent("iBizNoData"), {
          "class": this.semanticClass("empty"),
          "style": this.semanticStyle("empty")
        }, null)]
      })
    });
  }
});

exports.AppSwitch = AppSwitch;
