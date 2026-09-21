import { isVNode, defineComponent, watch, createVNode, resolveComponent } from 'vue';
import { useNamespace } from '@ibiz-template/vue3-util';
import './nav-tabs.css';
import { NavTabsController } from './nav-tabs.controller.mjs';

"use strict";
function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !isVNode(s);
}
const NavTabs = /* @__PURE__ */ defineComponent({
  name: "IBizNavTabs",
  props: {
    modelData: {
      type: Object,
      required: true
    },
    controller: {
      type: NavTabsController,
      required: true
    }
  },
  setup(props) {
    const ns = useNamespace("nav-tabs");
    const c = props.controller;
    const {
      state
    } = props.controller;
    const actions = [{
      text: ibiz.i18n.t("panelComponent.navTabs.closeAll"),
      value: "closeAll"
    }, {
      text: ibiz.i18n.t("panelComponent.navTabs.closeOther"),
      value: "closeOther"
    }];
    const changePage = (pane) => {
      if (state.currentKey !== pane.paneName) {
        c.onTabClick(pane.paneName);
      }
    };
    const onTabRemove = (key) => {
      c.onTabRemove(key);
    };
    const handleCommand = (command) => {
      if (command.value === "closeAll") {
        c.removeAll();
      } else if (command.value === "closeOther") {
        c.removeOther();
      }
    };
    watch(() => c.state.currentKey, (newVal, oldVal) => {
      if (newVal !== oldVal) {
        const findItem = c.findTabItem(newVal);
        if (findItem) {
          state.activeTab = newVal;
        }
      }
    });
    return {
      ns,
      actions,
      changePage,
      onTabRemove,
      handleCommand
    };
  },
  render() {
    let _slot;
    const {
      state
    } = this.controller;
    return createVNode("div", {
      "class": [this.ns.b(), ...this.controller.containerClass]
    }, [createVNode("div", {
      "class": this.ns.e("left")
    }, [createVNode(resolveComponent("el-tabs"), {
      "type": "card",
      "modelValue": state.activeTab,
      "onUpdate:modelValue": ($event) => state.activeTab = $event,
      "closable": true,
      "onTabClick": this.changePage,
      "onTabRemove": this.onTabRemove
    }, _isSlot(_slot = state.tabItems.map((msg) => {
      let label = msg.caption;
      if (msg.dataInfo) {
        label += " - ".concat(msg.dataInfo);
      }
      return createVNode(resolveComponent("el-tab-pane"), {
        "name": msg.key,
        "key": msg.key,
        "label": label
      }, {
        label: () => {
          return createVNode("div", {
            "class": this.ns.em("left", "content")
          }, [createVNode(resolveComponent("iBizIcon"), {
            "class": this.ns.em("left", "icon"),
            "icon": msg.sysImage
          }, null), createVNode("div", {
            "class": this.ns.em("left", "caption")
          }, [label])]);
        }
      });
    })) ? _slot : {
      default: () => [_slot]
    })]), createVNode("div", {
      "class": this.ns.e("right")
    }, [createVNode(resolveComponent("el-dropdown"), {
      "onCommand": this.handleCommand
    }, {
      default: () => {
        return createVNode(resolveComponent("el-button"), {
          "size": "small",
          "type": "primary"
        }, {
          default: () => [ibiz.i18n.t("app.more"), createVNode("ion-icon", {
            "name": "arrow-down"
          }, null)]
        });
      },
      dropdown: () => {
        let _slot2;
        return createVNode(resolveComponent("el-dropdown-menu"), null, _isSlot(_slot2 = this.actions.map((action) => {
          return createVNode(resolveComponent("el-dropdown-item"), {
            "command": action
          }, {
            default: () => [action.text]
          });
        })) ? _slot2 : {
          default: () => [_slot2]
        });
      }
    })])]);
  }
});

export { NavTabs };
