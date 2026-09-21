import { defineComponent, createVNode, resolveComponent, computed } from 'vue';
import { useNamespace } from '@ibiz-template/vue3-util';
import './kanben-setting.css';

"use strict";
const IBizKanbanSetting = /* @__PURE__ */ defineComponent({
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
    const ns = useNamespace("kanban-setting");
    const groups = computed(() => {
      return props.controller.state.groups;
    });
    return {
      ns,
      groups
    };
  },
  render() {
    return createVNode("div", {
      "class": this.ns.b()
    }, [createVNode(resolveComponent("el-popover"), {
      "trigger": "click",
      "placement": "bottom",
      "popper-class": this.ns.e("popover")
    }, {
      reference: () => {
        return createVNode(resolveComponent("el-button"), this.buttonStyle, {
          default: () => [createVNode("ion-icon", {
            "name": "options-outline",
            "title": ibiz.i18n.t("component.kanbanSetting.hideGroup")
          }, null)]
        });
      },
      default: () => {
        return createVNode("div", {
          "class": this.ns.em("popover", "content")
        }, [this.groups.map((group) => {
          return createVNode(resolveComponent("el-checkbox"), {
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

export { IBizKanbanSetting };
