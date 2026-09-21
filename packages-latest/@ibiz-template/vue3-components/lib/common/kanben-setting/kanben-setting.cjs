'use strict';

var vue = require('vue');
var vue3Util = require('@ibiz-template/vue3-util');
require('./kanben-setting.css');

"use strict";
const IBizKanbanSetting = /* @__PURE__ */ vue.defineComponent({
  name: "IBizKanbanSetting",
  props: {
    controller: {
      type: Object,
      required: true
    },
    buttonStyle: {
      type: Object,
      default: () => ({
        circle: false,
        type: "info"
      })
    }
  },
  setup(props) {
    const ns = vue3Util.useNamespace("kanban-setting");
    const groups = vue.computed(() => {
      return props.controller.state.groups;
    });
    return {
      ns,
      groups
    };
  },
  render() {
    return vue.createVNode("div", {
      "class": this.ns.b()
    }, [vue.createVNode(vue.resolveComponent("el-popover"), {
      "trigger": "click",
      "placement": "bottom",
      "popper-class": this.ns.e("popover")
    }, {
      reference: () => {
        return vue.createVNode(vue.resolveComponent("el-button"), this.buttonStyle, {
          default: () => [vue.createVNode("ion-icon", {
            "name": "options-outline",
            "title": ibiz.i18n.t("component.kanbanSetting.hideGroup")
          }, null)]
        });
      },
      default: () => {
        return vue.createVNode("div", {
          "class": this.ns.em("popover", "content")
        }, [this.groups.map((group) => {
          return vue.createVNode(vue.resolveComponent("el-checkbox"), {
            "size": "small",
            "label": group.caption,
            "model-value": !group.hidden,
            "onChange": (val) => {
              group.hidden = !val;
            }
          }, null);
        })]);
      }
    })]);
  }
});

exports.IBizKanbanSetting = IBizKanbanSetting;
