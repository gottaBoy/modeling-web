import { defineComponent, createVNode, ref, watch, onMounted, onUnmounted } from 'vue';
import { FormMDCtrlFormController } from '@ibiz-template/runtime';
import { useNamespace, useSemanticNode } from '@ibiz-template/vue3-util';
import draggable from 'vuedraggable';
import './mdctrl-container2.css';
import { showTitle } from '@ibiz-template/core';
import { addIcon, leftArrowIcon, rightArrowIcon, dragIcon, removeIcon } from './icon/index.mjs';

"use strict";
const MDCtrlContainer2 = /* @__PURE__ */ defineComponent({
  name: "IBizMDCtrlContainer2",
  components: {
    draggable
  },
  props: {
    controller: {
      type: FormMDCtrlFormController,
      required: true
    },
    items: {
      type: Array,
      default: () => []
    }
  },
  setup(props) {
    const ns = useNamespace("mdctrl-container2");
    const ns2 = useNamespace("form-mdctrl");
    const {
      semanticClass,
      semanticStyle
    } = useSemanticNode(props.controller.form);
    const currentItem = ref("");
    watch(() => props.items, () => {
      var _a;
      if (!currentItem.value) {
        currentItem.value = ((_a = props.items[0]) == null ? void 0 : _a.id) || "";
      }
    }, {
      immediate: true
    });
    const draggingKey = ref("");
    const container = ref();
    const isShowLeftArrow = ref(false);
    const isShowRightArrow = ref(false);
    const isShowBorder = ref(true);
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
    onMounted(() => {
      if (container.value && container.value.$el) {
        resizeObserver = new ResizeObserver((entries) => {
          entries.forEach(() => {
            updateArrowVisible();
          });
        });
        resizeObserver.observe(container.value.$el);
      }
    });
    onUnmounted(() => {
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
      ns2,
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
      handleDragEnd,
      semanticClass,
      semanticStyle
    };
  },
  render() {
    return createVNode("div", {
      "class": this.ns.b()
    }, [createVNode("div", {
      "class": [this.ns.b("header")]
    }, [createVNode(draggable, {
      "ref": "container",
      "class": [this.ns.b("header-content")],
      "list": this.items,
      "ghostClass": this.ns.bm("header-item", "ghost"),
      "itemKey": "id"
    }, {
      item: ({
        element
      }) => {
        return createVNode("div", {
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
        }, [createVNode("div", {
          "class": this.ns.be("header-item", "drag-icon")
        }, [dragIcon()]), createVNode("div", {
          "class": this.ns.be("header-item", "text")
        }, [element.title]), this.controller.enableDelete && createVNode("div", {
          "class": [this.ns2.b("button"), this.ns.be("header-item", "btn"), this.semanticClass("mdctrl.button", {
            mdctrl: this.controller,
            tag: "remove"
          })],
          "style": this.semanticStyle("mdctrl.button", {
            mdctrl: this.controller,
            tag: "remove"
          }),
          "title": showTitle(ibiz.i18n.t("app.delete")),
          "onClick": (e) => {
            this.handleRemove(e, element);
          }
        }, [removeIcon()])]);
      },
      footer: () => {
        return [this.controller.enableCreate && createVNode("div", {
          "class": [this.ns.b("header-item"), this.ns2.b("button"), this.semanticClass("mdctrl.button", {
            mdctrl: this.controller,
            tag: "create"
          }), !this.isShowBorder && this.ns.bm("header-item", "hidden-border")],
          "style": this.semanticStyle("mdctrl.button", {
            mdctrl: this.controller,
            tag: "create"
          }),
          "onClick": (e) => {
            this.handleAdd(e);
          }
        }, [createVNode("div", {
          "class": this.ns.be("header-item", "icon")
        }, [addIcon()]), createVNode("div", {
          "class": this.ns.be("header-item", "text")
        }, [ibiz.i18n.t("app.add")])]), this.isShowLeftArrow && createVNode("div", {
          "class": this.ns.b("header-left-arrow"),
          "onClick": (e) => {
            this.handleArrowClick(e, "left");
          }
        }, [leftArrowIcon()]), this.isShowRightArrow && createVNode("div", {
          "class": this.ns.b("header-right-arrow"),
          "onClick": (e) => {
            this.handleArrowClick(e, "right");
          }
        }, [rightArrowIcon()])];
      }
    })]), createVNode("div", {
      "class": this.ns.b("content")
    }, [this.items.map((item) => {
      var _a, _b;
      return createVNode("div", {
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

export { MDCtrlContainer2 };
