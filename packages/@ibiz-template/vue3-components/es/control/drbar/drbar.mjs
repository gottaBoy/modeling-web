import { defineComponent, reactive, onUnmounted, watch, createVNode, resolveComponent } from 'vue';
import { useControlController, useNamespace, getNestedRoutePath, route2routePath } from '@ibiz-template/vue3-util';
import { useRouter, useRoute } from 'vue-router';
import { DRBarController } from './drbar.controller.mjs';
import './drbar.css';

"use strict";
const DRBarControl = /* @__PURE__ */ defineComponent({
  name: "IBizDrBarControl",
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
    },
    provider: {
      type: Object
    },
    srfnav: {
      type: String,
      required: false
    },
    showMode: {
      type: String,
      default: "vertical"
    },
    hideEditItem: {
      type: Boolean,
      default: void 0
    }
  },
  setup(props) {
    const c = useControlController((...args) => new DRBarController(...args));
    const ns = useNamespace("control-".concat(c.model.controlType.toLowerCase()));
    const router = useRouter();
    const counterData = reactive({});
    const fn = (counter) => {
      Object.assign(counterData, counter);
    };
    c.evt.on("onCreated", () => {
      if (c.counter) {
        c.counter.onChange(fn, true);
      }
    });
    onUnmounted(() => {
      var _a;
      (_a = c.counter) == null ? void 0 : _a.offChange(fn);
    });
    c.setRouter(router);
    const handleSelect = (key) => {
      c.handleSelectChange(key);
    };
    const route = useRoute();
    let expViewRoutePath = "";
    const opens = [];
    watch(() => c.state.isCreated, (_newVal, _oldVal) => {
      if (props.showMode !== "horizontal") {
        const {
          drBarItems
        } = c.state;
        drBarItems.forEach((item) => {
          opens.push(item.tag);
        });
      }
    });
    if (c.routeDepth) {
      expViewRoutePath = getNestedRoutePath(route, c.routeDepth);
    }
    if (route) {
      watch(() => route.fullPath, (newVal, oldVal) => {
        if (newVal !== oldVal) {
          const depth = c.routeDepth;
          if (depth) {
            const currentRoutePath = getNestedRoutePath(route, c.routeDepth);
            if (currentRoutePath === expViewRoutePath) {
              const routePath = route2routePath(route);
              const {
                srfnav
              } = routePath.pathNodes[depth - 1];
              c.handleSelectChange(srfnav);
            }
          }
        }
      }, {
        immediate: true
      });
    }
    const renderMenuItems = (item) => {
      if (!item.visible) {
        return;
      }
      if (item.children) {
        let subtitle = "";
        if (props.showMode === "horizontal") {
          if (item.tag !== c.state.selectedItem) {
            const find = item.children.find((x) => x.tag === c.state.selectedItem);
            if (find) {
              subtitle = "-".concat(find.caption);
            }
          }
        }
        return createVNode(resolveComponent("el-sub-menu"), {
          "class": ns.b("group"),
          "index": item.tag,
          "disabled": item.disabled
        }, {
          default: () => item.children.map((child) => {
            return renderMenuItems(child);
          }),
          title: () => [createVNode(resolveComponent("iBizIcon"), {
            "class": ns.e("icon"),
            "icon": item.sysImage
          }, null), createVNode("span", null, [item.caption, subtitle])]
        });
      }
      return createVNode(resolveComponent("el-menu-item"), {
        "class": ns.e("item"),
        "index": item.tag,
        "disabled": item.disabled
      }, {
        default: () => [createVNode(resolveComponent("iBizIcon"), {
          "class": ns.e("icon"),
          "icon": item.sysImage
        }, null), createVNode("span", null, [item.caption]), item.counterId && counterData[item.counterId] != null && createVNode(resolveComponent("iBizBadge"), {
          "class": ns.e("counter"),
          "value": counterData[item.counterId],
          "counterMode": item.counterMode
        }, null)]
      });
    };
    return {
      c,
      ns,
      handleSelect,
      renderMenuItems,
      opens
    };
  },
  render() {
    const {
      isCreated,
      drBarItems,
      selectedItem,
      isCalculatedPermission
    } = this.c.state;
    return createVNode(resolveComponent("iBizControlBase"), {
      "controller": this.c,
      "class": this.ns.b()
    }, {
      default: () => [isCreated && isCalculatedPermission && createVNode(resolveComponent("el-menu"), {
        "class": this.ns.e("menu"),
        "mode": this.showMode,
        "default-active": selectedItem,
        "onSelect": this.handleSelect,
        "default-openeds": this.opens
      }, {
        default: () => {
          return drBarItems.map((item) => {
            return this.renderMenuItems(item);
          });
        }
      })]
    });
  }
});

export { DRBarControl };
