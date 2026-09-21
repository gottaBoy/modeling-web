'use strict';

var vue = require('vue');
var vue3Util = require('@ibiz-template/vue3-util');
var qxUtil = require('qx-util');
require('./view-message.css');

"use strict";
function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !vue.isVNode(s);
}
const ViewMessage = /* @__PURE__ */ vue.defineComponent({
  name: "ViewMessage",
  props: {
    messages: {
      type: Array
    },
    scroll: {
      type: Boolean,
      default: false
    },
    context: {
      type: Object,
      required: false
    },
    params: {
      type: Object,
      required: false
    },
    controller: {
      type: Object
    }
  },
  setup(props) {
    const ns = vue3Util.useNamespace("view-message");
    const getType = (messageType) => {
      switch (messageType) {
        case "WARN":
          return "warning";
        case "ERROR":
          return "error";
        default:
          return "info";
      }
    };
    const items = vue.ref([]);
    const initialIndex = vue.ref(0);
    const uuid = vue.ref("");
    const isHiddenContainer = vue.ref(false);
    vue.watch(() => props.messages, () => {
      initialIndex.value = 0;
      uuid.value = qxUtil.createUUID();
      if (Array.isArray(props.messages)) {
        items.value = props.messages.filter((item) => item.title || item.message || item.layoutPanel && item.data).map((item) => {
          return {
            ...item
          };
        });
        isHiddenContainer.value = false;
      } else {
        items.value = [];
        isHiddenContainer.value = true;
      }
    }, {
      immediate: true
    });
    const container = vue.ref(null);
    const carouselHeight = vue.ref("");
    vue.onMounted(() => {
      vue.nextTick(() => {
        const el = container.value;
        if (!el) {
          return;
        }
        const alertEl = el.querySelector(".el-alert");
        if (alertEl) {
          carouselHeight.value = "".concat(alertEl.offsetHeight, "px");
        }
      });
    });
    const handleAlertClose = (index) => {
      var _a;
      items.value[index].hidden = true;
      const isHiddenCarouse = items.value.every((item2) => item2.hidden);
      if (isHiddenCarouse) {
        isHiddenContainer.value = true;
      }
      uuid.value = qxUtil.createUUID();
      const item = items.value[index];
      (_a = props.controller) == null ? void 0 : _a.setMsgRemoveModeStorage(item);
    };
    const handleChange = (index) => {
      initialIndex.value = index;
    };
    return {
      ns,
      getType,
      items,
      container,
      carouselHeight,
      initialIndex,
      uuid,
      isHiddenContainer,
      handleAlertClose,
      handleChange
    };
  },
  render() {
    const renderLayoutPanel = (item) => {
      return vue.createVNode(vue.resolveComponent("iBizControlShell"), {
        "data": item.data,
        "modelData": item.layoutPanel,
        "context": this.context,
        "params": this.params
      }, null);
    };
    const renderScrollMessages = () => {
      let _slot;
      return vue.createVNode("div", {
        "class": [this.ns.b(), this.isHiddenContainer && this.ns.m("hidden")],
        "ref": "container"
      }, [vue.createVNode(vue.resolveComponent("el-carousel"), {
        "key": this.uuid,
        "indicatorPosition": "none",
        "arrow": "never",
        "height": this.carouselHeight,
        "initialIndex": this.initialIndex,
        "onChange": this.handleChange
      }, _isSlot(_slot = this.items.map((item, i) => {
        if (item.hidden) {
          return;
        }
        const isRenderDefault = item.message || item.layoutPanel && item.data;
        return vue.createVNode(vue.resolveComponent("el-carousel-item"), null, {
          default: () => {
            var _a;
            return [vue.createVNode(vue.resolveComponent("el-alert"), {
              "type": this.getType(item.messageType),
              "class": [this.ns.b("carousel-alert"), this.ns.bm("carousel-alert", item.title && isRenderDefault ? "" : "single"), (_a = item.sysCss) == null ? void 0 : _a.cssName],
              "closable": item.removeMode !== 0,
              "onClose": () => this.handleAlertClose(i)
            }, {
              title: () => {
                return vue.createVNode("div", {
                  "class": this.ns.be("carousel-alert", "title")
                }, [item.title || ""]);
              },
              default: () => {
                if (item.layoutPanel && item.data) {
                  return renderLayoutPanel(item);
                }
                return vue.createVNode("div", {
                  "class": this.ns.be("carousel-alert", "message")
                }, [item.message || ""]);
              }
            })];
          }
        });
      })) ? _slot : {
        default: () => [_slot]
      })]);
    };
    const renderMessages = () => {
      return vue.createVNode("div", {
        "class": [this.ns.b(), this.isHiddenContainer && this.ns.m("hidden")]
      }, [this.items.map((item, i) => {
        var _a;
        const isRenderDefault = item.message || item.layoutPanel && item.data;
        return vue.createVNode(vue.resolveComponent("el-alert"), {
          "type": this.getType(item.messageType),
          "class": [this.ns.b("alert"), this.ns.bm("alert", item.title && isRenderDefault ? "" : "single"), this.ns.bm("alert", !item.title && isRenderDefault ? "single-message" : ""), (_a = item.sysCss) == null ? void 0 : _a.cssName],
          "closable": item.removeMode !== 0,
          "onClose": () => this.handleAlertClose(i)
        }, {
          title: () => {
            return vue.createVNode("div", {
              "class": this.ns.be("alert", "title")
            }, [item.title || ""]);
          },
          default: () => {
            if (item.layoutPanel && item.data) {
              return renderLayoutPanel(item);
            }
            return vue.createVNode("div", {
              "class": this.ns.be("alert", "message")
            }, [item.message || ""]);
          }
        });
      })]);
    };
    if (!this.items.length) {
      return;
    }
    if (this.items.length > 1 && this.scroll) {
      return renderScrollMessages();
    }
    return renderMessages();
  }
});

exports.ViewMessage = ViewMessage;
