'use strict';

var vue = require('vue');
var vue3Util = require('@ibiz-template/vue3-util');
var runtime = require('@ibiz-template/runtime');
require('./medit-view-panel.css');

"use strict";
function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !vue.isVNode(s);
}
const MEditViewPanelControl = /* @__PURE__ */ vue.defineComponent({
  name: "IBizMEditViewPanelControl",
  props: {
    modelData: {
      type: Object,
      required: true
    },
    context: {
      type: Object,
      required: true
    },
    params: {
      type: Object,
      default: () => ({})
    }
  },
  setup() {
    const c = vue3Util.useControlController((...args) => new runtime.MEditViewPanelController(...args));
    const ns = vue3Util.useNamespace("control-".concat(c.model.controlType.toLowerCase()));
    const panelContent = vue.ref(null);
    const lastScrollHeight = vue.ref(0);
    let mutationObserver = null;
    const handleDelete = (item) => {
      c.handleDelete(item);
    };
    vue.onMounted(() => {
      if (panelContent.value) {
        mutationObserver = new MutationObserver(() => {
          const scrollHeight = panelContent.value.scrollHeight;
          if (scrollHeight !== lastScrollHeight.value) {
            if (c.state.isNeedScroll) {
              lastScrollHeight.value = scrollHeight;
              panelContent.value.scrollTop = scrollHeight;
            }
          }
        });
        mutationObserver.observe(panelContent.value, {
          childList: true,
          // 子节点的变动（新增、删除或者更改）
          attributes: true,
          // 属性的变动
          characterData: true,
          // 节点内容或节点文本的变动
          subtree: true
          // 是否将观察器应用于该节点的所有后代节点
        });
      }
    });
    vue.onUnmounted(() => {
      if (mutationObserver) {
        mutationObserver.disconnect();
      }
    });
    return {
      c,
      ns,
      panelContent,
      handleDelete
    };
  },
  render() {
    const viewShell = vue.resolveComponent("IBizViewShell");
    const renderTabTop = () => {
      let _slot;
      return vue.createVNode(vue.resolveComponent("el-tabs"), {
        "class": this.ns.b("tabs"),
        "modelValue": this.c.state.activeTab,
        "onUpdate:modelValue": ($event) => this.c.state.activeTab = $event
      }, _isSlot(_slot = this.c.state.panelUiItems.map((item, index) => {
        return vue.createVNode(vue.resolveComponent("el-tab-pane"), {
          "key": item.id + item.srfmajortext,
          "name": item.id
        }, {
          label: () => {
            return vue.createVNode("div", {
              "class": this.ns.b("tab-label")
            }, [vue.createVNode("span", null, [item.srfmajortext]), vue.createVNode("ion-icon", {
              "name": "close-outline",
              "onClick": () => this.c.handleTabDelete(item, index)
            }, null)]);
          },
          default: () => {
            return this.c.state.activeTab === item.id && vue.h(viewShell, {
              context: item.context,
              params: item.params,
              viewId: this.c.model.embeddedAppViewId,
              onDataChange: (args) => this.c.onViewDataChange(args, item.id)
            });
          }
        });
      })) ? _slot : {
        default: () => [_slot]
      });
    };
    const renderRow = () => {
      return this.c.state.panelUiItems.map((item) => {
        return vue.createVNode("div", {
          "class": this.ns.b("item"),
          "key": item.id
        }, [[vue.h(viewShell, {
          context: item.context,
          params: item.params,
          viewId: this.c.model.embeddedAppViewId,
          onDataChange: (args) => this.c.onViewDataChange(args, item.id)
        }), vue.createVNode("div", {
          "class": this.ns.b("close")
        }, [vue.createVNode("ion-icon", {
          "name": "close-outline",
          "onClick": () => this.handleDelete(item)
        }, null)])]]);
      });
    };
    const renderContent = () => {
      if (!this.c.model.embeddedAppViewId) {
        return;
      }
      if (Object.is(this.c.model.panelStyle, "TAB_TOP")) {
        return renderTabTop();
      }
      return renderRow();
    };
    return vue.createVNode(vue.resolveComponent("iBizControlBase"), {
      "controller": this.c
    }, {
      default: () => [vue.createVNode("div", {
        "class": this.ns.b("content"),
        "ref": "panelContent"
      }, [this.c.state.panelUiItems.length > 0 ? renderContent() : null])]
    });
  }
});

exports.MEditViewPanelControl = MEditViewPanelControl;
