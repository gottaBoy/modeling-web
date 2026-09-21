'use strict';

var vue = require('vue');
var runtime = require('@ibiz-template/runtime');
var vue3Util = require('@ibiz-template/vue3-util');
var draggable = require('vuedraggable');
require('./mdctrl-container2.css');
var core = require('@ibiz-template/core');
var index = require('./icon/index.cjs');

"use strict";
const MDCtrlContainer2 = /* @__PURE__ */ vue.defineComponent({
  name: "IBizMDCtrlContainer2",
  components: {
    draggable
  },
  props: {
    controller: {
      type: runtime.FormMDCtrlFormController,
      required: true
    },
    items: {
      type: Array,
      default: () => []
    }
  },
  setup(props) {
    const ns = vue3Util.useNamespace("mdctrl-container2");
    const currentItem = vue.ref("");
    vue.watch(() => props.items, () => {
      var _a;
      if (!currentItem.value) {
        currentItem.value = ((_a = props.items[0]) == null ? void 0 : _a.id) || "";
      }
    }, {
      immediate: true
    });
    const draggingKey = vue.ref("");
    const container = vue.ref();
    const isShowLeftArrow = vue.ref(false);
    const isShowRightArrow = vue.ref(false);
    const isShowBorder = vue.ref(true);
    let resizeObserver;
    const updateArrowVisible = () => {
      if (container.value) {
        const el = container.value.$el;
        if (el) {
          isShowLeftArrow.value = el.scrollLeft > 0;
          isShowRightArrow.value = el.scrollLeft < el.scrollWidth - el.offsetWidth;
          isShowBorder.value = el.offsetWidth > el.scrollWidth;
        }
      }
    };
    vue.onMounted(() => {
      if (container.value && container.value.$el) {
        resizeObserver = new ResizeObserver((entries) => {
          entries.forEach(() => {
            updateArrowVisible();
          });
        });
        resizeObserver.observe(container.value.$el);
      }
    });
    vue.onUnmounted(() => {
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
    });
    const handleSelect = (e, item) => {
      e.stopPropagation();
      currentItem.value = item.id;
    };
    const handleAdd = (e) => {
      var _a;
      e.stopPropagation();
      props.controller.create();
      currentItem.value = ((_a = props.items[props.items.length - 1]) == null ? void 0 : _a.id) || "";
    };
    const handleRemove = async (e, item) => {
      var _a;
      e.stopPropagation();
      await props.controller.remove(item.id);
      if (currentItem.value === item.id) {
        currentItem.value = ((_a = props.items[0]) == null ? void 0 : _a.id) || "";
      }
      updateArrowVisible();
    };
    const handleArrowClick = (e, direction) => {
      e.stopPropagation();
      if (container.value) {
        const el = container.value.$el;
        if (el) {
          const children = Array.from(el.children || []);
          const child = children.find((item) => item.classList.contains(ns.b("header-item")));
          if (child) {
            const width = child.offsetWidth;
            if (direction === "right") {
              el.scrollLeft += width;
            }
            if (direction === "left") {
              el.scrollLeft -= width;
            }
          }
          updateArrowVisible();
        }
      }
    };
    const handleDragStart = (item) => {
      draggingKey.value = item.id;
    };
    const handleDragEnd = () => {
      draggingKey.value = "";
      props.controller.updateData();
      updateArrowVisible();
    };
    return {
      ns,
      currentItem,
      draggingKey,
      container,
      isShowLeftArrow,
      isShowRightArrow,
      isShowBorder,
      handleSelect,
      handleAdd,
      handleRemove,
      handleArrowClick,
      handleDragStart,
      handleDragEnd
    };
  },
  render() {
    return vue.createVNode("div", {
      "class": this.ns.b()
    }, [vue.createVNode("div", {
      "class": [this.ns.b("header")]
    }, [vue.createVNode(draggable, {
      "ref": "container",
      "class": [this.ns.b("header-content")],
      "list": this.items,
      "ghostClass": this.ns.bm("header-item", "ghost"),
      "itemKey": "id"
    }, {
      item: ({
        element
      }) => {
        return vue.createVNode("div", {
          "class": [this.ns.b("header-item"), this.draggingKey && this.ns.bm("header-item", "dragging"), this.draggingKey === element.id && this.ns.bm("header-item", "drag"), this.currentItem === element.id && this.ns.bm("header-item", "active")],
          "onDragstart": () => {
            this.handleDragStart(element);
          },
          "onDragend": () => {
            this.handleDragEnd();
          },
          "onClick": (e) => {
            this.handleSelect(e, element);
          }
        }, [vue.createVNode("div", {
          "class": this.ns.be("header-item", "drag-icon")
        }, [index.dragIcon()]), vue.createVNode("div", {
          "class": this.ns.be("header-item", "text")
        }, [element.title]), this.controller.enableDelete && vue.createVNode("div", {
          "class": this.ns.be("header-item", "btn"),
          "title": core.showTitle(ibiz.i18n.t("app.delete")),
          "onClick": (e) => {
            this.handleRemove(e, element);
          }
        }, [index.removeIcon()])]);
      },
      footer: () => {
        return [this.controller.enableCreate && vue.createVNode("div", {
          "class": [this.ns.b("header-item"), !this.isShowBorder && this.ns.bm("header-item", "hidden-border")],
          "onClick": (e) => {
            this.handleAdd(e);
          }
        }, [vue.createVNode("div", {
          "class": this.ns.be("header-item", "icon")
        }, [index.addIcon()]), vue.createVNode("div", {
          "class": this.ns.be("header-item", "text")
        }, [ibiz.i18n.t("app.add")])]), this.isShowLeftArrow && vue.createVNode("div", {
          "class": this.ns.b("header-left-arrow"),
          "onClick": (e) => {
            this.handleArrowClick(e, "left");
          }
        }, [index.leftArrowIcon()]), this.isShowRightArrow && vue.createVNode("div", {
          "class": this.ns.b("header-right-arrow"),
          "onClick": (e) => {
            this.handleArrowClick(e, "right");
          }
        }, [index.rightArrowIcon()])];
      }
    })]), vue.createVNode("div", {
      "class": this.ns.b("content")
    }, [this.items.map((item) => {
      var _a, _b;
      return vue.createVNode("div", {
        "key": item.id,
        "class": this.ns.b("content-item"),
        "style": {
          display: item.id !== this.currentItem ? "none" : ""
        }
      }, [(_b = (_a = this.$slots).item) == null ? void 0 : _b.call(_a, {
        data: item
      })]);
    })])]);
  }
});

exports.MDCtrlContainer2 = MDCtrlContainer2;
