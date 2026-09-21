import { defineComponent, getCurrentInstance, ref, reactive, onMounted, onUnmounted, createVNode, resolveComponent } from 'vue';
import { useRouter } from 'vue-router';
import { PanelItemController, OpenAppViewCommand } from '@ibiz-template/runtime';
import { useNamespace } from '@ibiz-template/vue3-util';
import draggable from 'vuedraggable';
import { IBizContext, showTitle } from '@ibiz-template/core';
import './short-cut.css';

"use strict";
const ShortCut = /* @__PURE__ */ defineComponent({
  name: "IBizShortCut",
  components: {
    draggable
  },
  props: {
    modelData: {
      type: Object,
      required: true
    },
    controller: {
      type: PanelItemController,
      required: true
    }
  },
  setup(props) {
    const ns = useNamespace("short-cut");
    const vue = getCurrentInstance().proxy;
    const router = useRouter();
    const shortCutUtil = ibiz.util.shortCut;
    const isShowToolbar = ref(true);
    const isShowMore = ref(false);
    const data = reactive(shortCutUtil.data);
    const dragCache = {
      newIndex: 0,
      oldIndex: 0
    };
    const openModeMap = /* @__PURE__ */ new Map([["ROUTE_MODAL", "INDEXVIEWTAB_POPUPMODAL"], ["MODAL", "POPUPMODAL"], ["DRAWER", "DRAWER_RIGHT"]]);
    const onShortCutChange = (items) => {
      if (data.length === 0 && isShowMore.value) {
        isShowMore.value = false;
      }
      vue.$forceUpdate();
    };
    onMounted(() => {
      isShowToolbar.value = shortCutUtil.mode !== "vertical";
      ibiz.util.shortCut.onChange(onShortCutChange);
    });
    onUnmounted(() => {
      ibiz.util.shortCut.offChange(onShortCutChange);
    });
    const onShowChange = () => {
      isShowToolbar.value = !isShowToolbar.value;
      if (isShowToolbar.value) {
        isShowMore.value = false;
        shortCutUtil.setShortCutMode("horizontal");
      } else {
        shortCutUtil.setShortCutMode("vertical");
      }
    };
    const onClick = (item) => {
      isShowMore.value = false;
      if (item.openMode === "ROUTE") {
        const fullPath = item.fullPath.substring(1);
        if (router.currentRoute.value.fullPath !== fullPath) {
          router.push({
            path: item.fullPath.substring(1)
          });
        }
      } else {
        ibiz.commands.execute(OpenAppViewCommand.TAG, item.appViewId, IBizContext.create(item.context), item.params, {
          openMode: openModeMap.get(item.openMode)
        });
      }
    };
    const onChange = (evt) => {
      if (evt.moved) {
        ibiz.util.shortCut.changeIndex(evt.moved.newIndex, evt.moved.oldIndex);
      } else if (evt.added) {
        dragCache.newIndex = evt.added.newIndex;
      } else if (evt.removed) {
        dragCache.oldIndex = evt.removed.oldIndex;
        ibiz.util.shortCut.changeIndex(dragCache.newIndex, dragCache.oldIndex);
      }
    };
    const onDelete = (event, key) => {
      event.stopPropagation();
      ibiz.util.shortCut.removeShortCut(key);
    };
    const renderDraggable = (isVertical) => {
      return createVNode(draggable, {
        "itemKey": "key",
        "class": [ns.e("draggable"), ns.is("horizontal", !isVertical), ns.is("vertical", isVertical)],
        "modelValue": data,
        "group": props.controller.model.id,
        "onChange": (evt) => onChange(evt)
      }, {
        item: ({
          element,
          index
        }) => {
          if (isVertical && !isShowToolbar.value || isVertical && isShowToolbar.value && index > 5 || !isVertical && index < 6) {
            return createVNode("div", {
              "class": [ns.e("item"), ns.e("draggable-item")],
              "title": showTitle(element.caption),
              "onClick": () => onClick(element)
            }, [createVNode("svg", {
              "viewBox": "0 0 16 16",
              "class": ["drag-icon", "icon"],
              "xmlns": "http://www.w3.org/2000/svg",
              "height": "16px",
              "width": "16px",
              "focusable": "false"
            }, [createVNode("g", {
              "id": "drag-icon/drag--",
              "stroke-width": "1",
              "fill-rule": "evenodd"
            }, [createVNode("g", {
              "id": "drag-icon",
              "transform": "translate(5 1)",
              "fill-rule": "nonzero"
            }, [createVNode("path", {
              "d": "M1 2a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm4 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2zM1 6a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm4 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm-4 4a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm4 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm-4 4a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm4 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2z",
              "id": "drag-icon-air"
            }, null)])])]), element.icon ? createVNode(resolveComponent("iBizIcon"), {
              "class": ["caption-icon", "icon"],
              "icon": element.icon
            }, null) : createVNode("ion-icon", {
              "class": ["caption-icon", "icon"],
              "name": "ellipsis-horizontal-circle-outline"
            }, null), createVNode("div", {
              "class": ns.em("item", "caption")
            }, [element.caption]), createVNode("ion-icon", {
              "name": "close-outline",
              "class": ["close-icon", "icon"],
              "onClick": (event) => onDelete(event, element.key)
            }, null)]);
          }
        }
      });
    };
    const renderAction = () => {
      return createVNode("div", {
        "class": [ns.e("item"), ns.e("action-item"), ns.is("hidden", isShowToolbar.value)],
        "onClick": onShowChange
      }, [createVNode("ion-icon", {
        "class": ["expand-icon", "icon"],
        "name": "chevron-back-outline"
      }, null), createVNode("div", {
        "class": ns.em("item", "caption")
      }, [ibiz.i18n.t("panelComponent.shortCut.expandToolbar")])]);
    };
    const renderMore = () => {
      return createVNode(resolveComponent("el-popover"), {
        "visible": isShowMore.value,
        "onUpdate:visible": ($event) => isShowMore.value = $event,
        "placement": "top-start",
        "trigger": "click",
        "width": "auto",
        "popper-class": ns.e("popover")
      }, {
        reference: () => {
          return createVNode("div", {
            "class": [ns.e("more"), ns.e("operate")]
          }, [createVNode(resolveComponent("el-tooltip"), {
            "content": ibiz.i18n.t("app.more"),
            "placement": "top"
          }, {
            default: () => [createVNode("div", null, [createVNode("span", {
              "class": ns.em("more", "caption")
            }, [isShowToolbar.value ? "6/".concat(data.length) : data.length]), createVNode("i", {
              "class": ["fa", "icon", "more-icon", isShowMore.value ? "fa-angle-double-down" : "fa-angle-double-up"],
              "aria-hidden": "true"
            }, null)])]
          })]);
        },
        default: () => {
          return [renderDraggable(true), renderAction()];
        }
      });
    };
    const renderRecover = () => {
      return createVNode("div", {
        "class": [ns.e("recover"), ns.e("operate")],
        "onClick": onShowChange
      }, [createVNode(resolveComponent("el-tooltip"), {
        "effect": "dark",
        "content": ibiz.i18n.t("app.retract"),
        "placement": "top"
      }, {
        default: () => [createVNode("ion-icon", {
          "class": ["recover-icon", "icon"],
          "name": "chevron-forward-outline"
        }, null)]
      })]);
    };
    return {
      ns,
      data,
      isShowToolbar,
      onChange,
      renderDraggable,
      renderMore,
      renderRecover
    };
  },
  render() {
    return createVNode("div", {
      "class": [this.ns.b(), ...this.controller.containerClass, this.ns.is("conceal", this.data.length === 0)]
    }, [this.isShowToolbar && this.renderDraggable(false), (!this.isShowToolbar || this.data.length > 6) && this.renderMore(), this.isShowToolbar && this.renderRecover()]);
  }
});

export { ShortCut };
