import { isVNode, defineComponent, createVNode, resolveComponent, ref, watch, onMounted, nextTick } from 'vue';
import { useNamespace } from '@ibiz-template/vue3-util';
import { createUUID } from 'qx-util';
import './view-message.css';

"use strict";
function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !isVNode(s);
}
const ViewMessage = /* @__PURE__ */ defineComponent({
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
    },
    semantic: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props) {
    const ns = useNamespace("view-message");
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
    const items = ref([]);
    const initialIndex = ref(0);
    const uuid = ref("");
    const isHiddenContainer = ref(false);
    watch(() => props.messages, () => {
      initialIndex.value = 0;
      uuid.value = createUUID();
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
    const container = ref(null);
    const carouselHeight = ref("");
    onMounted(() => {
      nextTick(() => {
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
      uuid.value = createUUID();
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
      return createVNode(resolveComponent("iBizControlShell"), {
        "data": item.data,
        "modelData": item.layoutPanel,
        "context": this.context,
        "params": this.params
      }, null);
    };
    const renderScrollMessages = () => {
      let _slot;
      return createVNode("div", {
        "class": [this.ns.b(), this.isHiddenContainer && this.ns.m("hidden")],
        "ref": "container"
      }, [createVNode(resolveComponent("el-carousel"), {
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
        return createVNode(resolveComponent("el-carousel-item"), null, {
          default: () => {
            var _a, _b, _c;
            return [createVNode(resolveComponent("el-alert"), {
              "type": this.getType(item.messageType),
              "class": [this.ns.b("carousel-alert"), this.ns.bm("carousel-alert", item.title && isRenderDefault ? "" : "single"), (_a = item.sysCss) == null ? void 0 : _a.cssName, (_b = this.semantic.item) == null ? void 0 : _b.class],
              "style": (_c = this.semantic.item) == null ? void 0 : _c.style,
              "closable": item.removeMode !== 0,
              "onClose": () => this.handleAlertClose(i)
            }, {
              title: () => {
                return createVNode("div", {
                  "class": this.ns.be("carousel-alert", "title")
                }, [item.title || ""]);
              },
              default: () => {
                if (item.layoutPanel && item.data) {
                  return renderLayoutPanel(item);
                }
                return createVNode("div", {
                  "class": this.ns.be("carousel-alert", "message"),
                  "innerHTML": item.message || ""
                }, null);
              }
            })];
          }
        });
      })) ? _slot : {
        default: () => [_slot]
      })]);
    };
    const renderMessages = () => {
      return createVNode("div", {
        "class": [this.ns.b(), this.isHiddenContainer && this.ns.m("hidden")]
      }, [this.items.map((item, i) => {
        var _a, _b, _c;
        const isRenderDefault = item.message || item.layoutPanel && item.data;
        return createVNode(resolveComponent("el-alert"), {
          "type": this.getType(item.messageType),
          "class": [this.ns.b("alert"), this.ns.bm("alert", item.title && isRenderDefault ? "" : "single"), this.ns.bm("alert", !item.title && isRenderDefault ? "single-message" : ""), (_a = item.sysCss) == null ? void 0 : _a.cssName, (_b = this.semantic.item) == null ? void 0 : _b.class],
          "style": (_c = this.semantic.item) == null ? void 0 : _c.style,
          "closable": item.removeMode !== 0,
          "onClose": () => this.handleAlertClose(i)
        }, {
          title: () => {
            return createVNode("div", {
              "class": this.ns.be("alert", "title")
            }, [item.title || ""]);
          },
          default: () => {
            if (item.layoutPanel && item.data) {
              return renderLayoutPanel(item);
            }
            return createVNode("div", {
              "class": this.ns.be("alert", "message"),
              "innerHTML": item.message || ""
            }, null);
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

export { ViewMessage };
