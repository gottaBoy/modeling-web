import { isVNode, createVNode, resolveComponent, h, defineComponent, getCurrentInstance, ref, isReactive, reactive } from 'vue';
import { useControlController, useControlPopoverzIndex, useSemanticNode, useNamespace } from '@ibiz-template/vue3-util';
import { DashboardController } from '@ibiz-template/runtime';
import { uniqueId } from 'lodash-es';
import './dashboard.css';

"use strict";
function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !isVNode(s);
}
const refreshTagObj = {};
function renderPortletByType(model, c, opts) {
  var _a;
  const provider = c.providers[model.id];
  const controller = c.portlets[model.id];
  const commonProps = {
    modelData: model,
    controller
  };
  if (!provider) {
    return createVNode("div", null, [model.portletType, ibiz.i18n.t("app.noSupport")]);
  }
  const providerComp = resolveComponent(provider.component);
  if (model.portletType === "CONTAINER") {
    const container = model;
    return h(providerComp, {
      ...commonProps,
      key: model.id,
      id: model.id
    }, {
      default: () => {
        var _a2;
        return (_a2 = container.controls) == null ? void 0 : _a2.map((child) => renderPortletByType(child, c, opts));
      }
    });
  }
  return h(providerComp, {
    ...commonProps,
    key: ((_a = refreshTagObj[model.id]) == null ? void 0 : _a.refreshtag) ? refreshTagObj[model.id].refreshtag : model.id,
    id: model.id
  });
}
const DashboardControl = /* @__PURE__ */ defineComponent({
  name: "IBizDashboardControl",
  props: {
    /**
     * @description 看板模型数据
     */
    modelData: {
      type: Object,
      required: true
    },
    /**
     * @description 应用上下文对象
     */
    context: {
      type: Object,
      required: true
    },
    /**
     * @description 视图参数对象
     * @default {}
     */
    params: {
      type: Object,
      default: () => ({})
    },
    /**
     * @description 部件适配器
     */
    provider: {
      type: Object
    }
  },
  setup() {
    const c = useControlController((...args) => new DashboardController(...args));
    useControlPopoverzIndex(c);
    const {
      semanticClass,
      semanticStyle
    } = useSemanticNode(c);
    const vue = getCurrentInstance().proxy;
    const customModelDatas = ref([]);
    const anchorList = ref([]);
    const dashboardRef = ref();
    const ns = useNamespace("control-".concat(c.model.controlType.toLowerCase()));
    c.evt.on("onInitPortlets", () => {
      Object.values(c.portlets).forEach((portlet) => {
        if (!isReactive(portlet.state)) {
          portlet.state = reactive(portlet.state);
        }
      });
      anchorList.value = c.enableAnchorCtrls;
    });
    c.evt.on("onItemModelReset", async (args) => {
      if (c.model.customizeMode !== 2) {
        return;
      }
      const {
        name
      } = args;
      const targetIndex = customModelDatas.value.findIndex((item) => {
        return item.id === name;
      });
      if (targetIndex !== -1) {
        const app = ibiz.hub.getApp(c.model.appId);
        const model = await c.loadDynaPortletById("".concat(app.model.codeName, ".").concat(name));
        if (model) {
          refreshTagObj[model.id] = {
            refreshtag: uniqueId()
          };
          customModelDatas.value.splice(targetIndex, 1, model);
          vue.$forceUpdate();
        }
      }
    });
    const handleCustomModelChange = (args) => {
      const model = args.model;
      const controls = c.model.controls;
      if (model && model.length > 0) {
        model.forEach((element) => {
          if (element.portletType === "FILTER") {
            refreshTagObj[element.id] = {
              refreshtag: uniqueId()
            };
          }
        });
      } else if (controls && controls.length > 0) {
        controls.forEach((element) => {
          if (element.portletType === "FILTER") {
            refreshTagObj[element.id] = {
              refreshtag: uniqueId()
            };
          }
        });
      }
      customModelDatas.value = model;
      vue.$forceUpdate();
    };
    const calcNavBarConfig = () => {
      const {
        navBarPos,
        navBarSysCss,
        navBarWidth,
        navBarStyle,
        navbarHeight
      } = c.model;
      return {
        navBarPos,
        navBarSysCss,
        navBarWidth,
        navBarStyle,
        navbarHeight
      };
    };
    return {
      c,
      ns,
      customModelDatas,
      anchorList,
      dashboardRef,
      calcNavBarConfig,
      handleCustomModelChange,
      semanticClass,
      semanticStyle
    };
  },
  render() {
    const {
      state,
      model
    } = this.c;
    const renderDefaultContent = () => {
      return createVNode(resolveComponent("iBizRow"), {
        "ref": "dashboardRef",
        "class": [this.ns.b(), this.semanticClass("content")],
        "style": this.semanticStyle("content"),
        "layout": model.layout
      }, {
        default: () => {
          var _a;
          return [(_a = model.controls) == null ? void 0 : _a.map((child) => {
            var _a2;
            let _slot;
            return createVNode(resolveComponent("iBizCol"), {
              "layoutPos": child.layoutPos,
              "state": (_a2 = this.c.portlets[child.id]) == null ? void 0 : _a2.state
            }, _isSlot(_slot = renderPortletByType(child, this.c)) ? _slot : {
              default: () => [_slot]
            });
          })];
        }
      });
    };
    const renderCustomSlots = () => {
      const slots = {
        default: () => {
          return renderDefaultContent();
        }
      };
      this.customModelDatas.forEach((item) => {
        slots[item.codeName] = () => renderPortletByType(item, this.c);
      });
      return slots;
    };
    let content = null;
    if (model.enableCustomized) {
      let _slot2;
      content = createVNode(resolveComponent("iBizCustomDashboardContainer"), {
        "modelData": this.modelData,
        "dashboard": this.c,
        "onChanged": this.handleCustomModelChange
      }, _isSlot(_slot2 = renderCustomSlots()) ? _slot2 : {
        default: () => [_slot2]
      });
    } else if (model.showDashboardNavBar) {
      let _slot3;
      content = createVNode(resolveComponent("iBizAnchorContainer"), {
        "anchorList": this.anchorList.map((item) => {
          return {
            id: item.id,
            title: item.title
          };
        }),
        "anchorTargetEle": this.dashboardRef,
        "navBarConfig": this.calcNavBarConfig(),
        "semantic": {
          root: {
            class: this.semanticClass("anchor"),
            style: this.semanticStyle("anchor")
          },
          item: {
            class: this.semanticClass("anchor.item"),
            style: this.semanticStyle("anchor.item")
          }
        }
      }, _isSlot(_slot3 = renderDefaultContent()) ? _slot3 : {
        default: () => [_slot3]
      });
    } else {
      content = renderDefaultContent();
    }
    return createVNode(resolveComponent("iBizControlBase"), {
      "controller": this.c,
      "class": [this.ns.b(), this.semanticClass("root")],
      "style": this.semanticStyle("root")
    }, {
      default: () => [state.isCreated && content]
    });
  }
});

export { DashboardControl };
