'use strict';

var vue = require('vue');
var vueRouter = require('vue-router');
var runtime = require('@ibiz-template/runtime');
var vue3Util = require('@ibiz-template/vue3-util');
var draggable = require('vuedraggable');
var core = require('@ibiz-template/core');
require('./short-cut.css');

"use strict";
const ShortCut = /* @__PURE__ */ vue.defineComponent({
  name: "IBizShortCut",
  components: {
    draggable
  },
  props: {
    /**
     * @description 快捷操作组件模型数据
     */
    modelData: {
      type: Object,
      required: true
    },
    /**
     * @description 快捷操作组件控制器
     */
    controller: {
      type: runtime.PanelItemController,
      required: true
    }
  },
  setup(props) {
    const ns = vue3Util.useNamespace("short-cut");
    const vue$1 = vue.getCurrentInstance().proxy;
    const router = vueRouter.useRouter();
    const {
      semanticClass,
      semanticStyle
    } = vue3Util.useSemanticNode(props.controller);
    const route = vueRouter.useRoute();
    const shortCutUtil = ibiz.util.shortCut;
    const isShowToolbar = vue.ref(true);
    const isShowMore = vue.ref(false);
    const data = vue.reactive(shortCutUtil.data);
    const dragCache = {
      newIndex: 0,
      oldIndex: 0
    };
    const openModeMap = /* @__PURE__ */ new Map([["ROUTE_MODAL", "INDEXVIEWTAB_POPUPMODAL"], ["MODAL", "POPUPMODAL"], ["DRAWER", "DRAWER_RIGHT"]]);
    const onShortCutChange = (items) => {
      if (data.length === 0 && isShowMore.value) {
        isShowMore.value = false;
      }
      vue$1.$forceUpdate();
    };
    vue.onMounted(() => {
      isShowToolbar.value = shortCutUtil.mode !== "vertical";
      ibiz.util.shortCut.onChange(onShortCutChange);
    });
    vue.onUnmounted(() => {
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
    const processRouteContext = (item) => {
      const tempContext = core.IBizContext.create(item.context);
      const {
        pathNodes
      } = vue3Util.route2routePath(route);
      if (pathNodes && pathNodes.length > 0) {
        let srfKeepNull = false;
        pathNodes.forEach((pathNode) => {
          if (pathNode.context && Object.keys(pathNode.context).length > 0) {
            Object.keys(pathNode.context).forEach((key) => {
              if (!tempContext[key]) {
                tempContext[key] = null;
                srfKeepNull = true;
              }
            });
          }
        });
        if (srfKeepNull) {
          tempContext.srfkeepnull = true;
        }
      }
      return tempContext;
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
        const tempContext = processRouteContext(item);
        ibiz.commands.execute(runtime.OpenAppViewCommand.TAG, item.appViewId, tempContext, item.params, {
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
      return vue.createVNode(draggable, {
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
            return vue.createVNode("div", {
              "class": [ns.e("item"), ns.e("draggable-item"), semanticClass("item", {
                item: element
              })],
              "style": semanticStyle("item", {
                item: element
              }),
              "title": core.showTitle(element.caption),
              "onClick": () => onClick(element)
            }, [vue.createVNode("svg", {
              "viewBox": "0 0 16 16",
              "class": ["drag-icon", "icon"],
              "xmlns": "http://www.w3.org/2000/svg",
              "height": "16px",
              "width": "16px",
              "focusable": "false"
            }, [vue.createVNode("g", {
              "id": "drag-icon/drag--",
              "stroke-width": "1",
              "fill-rule": "evenodd"
            }, [vue.createVNode("g", {
              "id": "drag-icon",
              "transform": "translate(5 1)",
              "fill-rule": "nonzero"
            }, [vue.createVNode("path", {
              "d": "M1 2a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm4 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2zM1 6a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm4 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm-4 4a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm4 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm-4 4a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm4 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2z",
              "id": "drag-icon-air"
            }, null)])])]), element.icon ? vue.createVNode(vue.resolveComponent("iBizIcon"), {
              "class": ["caption-icon", "icon", semanticClass("item.icon", {
                item: element
              })],
              "style": semanticStyle("item.icon", {
                item: element
              }),
              "icon": element.icon
            }, null) : vue.createVNode("ion-icon", {
              "class": ["caption-icon", "icon", semanticClass("item.icon", {
                item: element
              })],
              "style": semanticStyle("item.icon", {
                item: element
              }),
              "name": "ellipsis-horizontal-circle-outline"
            }, null), vue.createVNode("div", {
              "class": [ns.em("item", "caption"), semanticClass("item.caption", {
                item: element
              })],
              "style": semanticStyle("item.caption", {
                item: element
              })
            }, [element.caption]), vue.createVNode("ion-icon", {
              "name": "close-outline",
              "class": ["close-icon", "icon", semanticClass("item.close", {
                item: element
              })],
              "style": semanticStyle("item.close", {
                item: element
              }),
              "onClick": (event) => onDelete(event, element.key)
            }, null)]);
          }
        }
      });
    };
    const renderAction = () => {
      return vue.createVNode("div", {
        "class": [ns.e("item"), ns.e("action-item"), ns.is("hidden", isShowToolbar.value), semanticClass("more")],
        "style": semanticStyle("more"),
        "onClick": onShowChange
      }, [vue.createVNode("ion-icon", {
        "class": ["expand-icon", "icon"],
        "name": "chevron-back-outline"
      }, null), vue.createVNode("div", {
        "class": ns.em("item", "caption")
      }, [ibiz.i18n.t("panelComponent.shortCut.expandToolbar")])]);
    };
    const renderMore = () => {
      return vue.createVNode(vue.resolveComponent("el-popover"), {
        "visible": isShowMore.value,
        "onUpdate:visible": ($event) => isShowMore.value = $event,
        "placement": "top-start",
        "trigger": "click",
        "width": "auto",
        "popper-class": [ns.e("popover"), semanticClass("popup")],
        "popper-style": semanticStyle("popup")
      }, {
        reference: () => {
          return vue.createVNode("div", {
            "class": [ns.e("more"), ns.e("operate"), semanticClass("operate")],
            "style": semanticStyle("operate")
          }, [vue.createVNode(vue.resolveComponent("el-tooltip"), {
            "content": ibiz.i18n.t("app.more"),
            "placement": "top"
          }, {
            default: () => [vue.createVNode("div", null, [vue.createVNode("span", {
              "class": ns.em("more", "caption")
            }, [isShowToolbar.value ? "6/".concat(data.length) : data.length]), vue.createVNode("i", {
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
      return vue.createVNode("div", {
        "class": [ns.e("recover"), ns.e("operate"), semanticClass("operate")],
        "style": semanticStyle("operate"),
        "onClick": onShowChange
      }, [vue.createVNode(vue.resolveComponent("el-tooltip"), {
        "effect": "dark",
        "content": ibiz.i18n.t("app.retract"),
        "placement": "top"
      }, {
        default: () => [vue.createVNode("ion-icon", {
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
      renderRecover,
      semanticClass,
      semanticStyle
    };
  },
  render() {
    return vue.createVNode("div", {
      "class": [this.ns.b(), ...this.controller.containerClass, this.ns.is("conceal", this.data.length === 0), this.semanticClass("root")],
      "style": this.semanticStyle("root")
    }, [this.isShowToolbar && this.renderDraggable(false), (!this.isShowToolbar || this.data.length > 6) && this.renderMore(), this.isShowToolbar && this.renderRecover()]);
  }
});

exports.ShortCut = ShortCut;
