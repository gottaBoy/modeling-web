'use strict';

var vue = require('vue');
var vue3Util = require('@ibiz-template/vue3-util');
var runtime = require('@ibiz-template/runtime');
var lodashEs = require('lodash-es');
require('./dashboard.css');

"use strict";
function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !vue.isVNode(s);
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
    return vue.createVNode("div", null, [model.portletType, ibiz.i18n.t("app.noSupport")]);
  }
  const providerComp = vue.resolveComponent(provider.component);
  if (model.portletType === "CONTAINER") {
    const container = model;
    return vue.h(providerComp, {
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
  return vue.h(providerComp, {
    ...commonProps,
    key: ((_a = refreshTagObj[model.id]) == null ? void 0 : _a.refreshtag) ? refreshTagObj[model.id].refreshtag : model.id,
    id: model.id
  });
}
const DashboardControl = /* @__PURE__ */ vue.defineComponent({
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
    const c = vue3Util.useControlController((...args) => new runtime.DashboardController(...args));
    vue3Util.useControlPopoverzIndex(c);
    const {
      semanticClass,
      semanticStyle
    } = vue3Util.useSemanticNode(c);
    const vue$1 = vue.getCurrentInstance().proxy;
    const customModelDatas = vue.ref([]);
    const anchorList = vue.ref([]);
    const dashboardRef = vue.ref();
    const ns = vue3Util.useNamespace("control-".concat(c.model.controlType.toLowerCase()));
    c.evt.on("onInitPortlets", () => {
      Object.values(c.portlets).forEach((portlet) => {
        if (!vue.isReactive(portlet.state)) {
          portlet.state = vue.reactive(portlet.state);
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
            refreshtag: lodashEs.uniqueId()
          };
          customModelDatas.value.splice(targetIndex, 1, model);
          vue$1.$forceUpdate();
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
              refreshtag: lodashEs.uniqueId()
            };
          }
        });
      } else if (controls && controls.length > 0) {
        controls.forEach((element) => {
          if (element.portletType === "FILTER") {
            refreshTagObj[element.id] = {
              refreshtag: lodashEs.uniqueId()
            };
          }
        });
      }
      customModelDatas.value = model;
      vue$1.$forceUpdate();
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
      return vue.createVNode(vue.resolveComponent("iBizRow"), {
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
            return vue.createVNode(vue.resolveComponent("iBizCol"), {
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
      content = vue.createVNode(vue.resolveComponent("iBizCustomDashboardContainer"), {
        "modelData": this.modelData,
        "dashboard": this.c,
        "onChanged": this.handleCustomModelChange
      }, _isSlot(_slot2 = renderCustomSlots()) ? _slot2 : {
        default: () => [_slot2]
      });
    } else if (model.showDashboardNavBar) {
      let _slot3;
      content = vue.createVNode(vue.resolveComponent("iBizAnchorContainer"), {
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
    return vue.createVNode(vue.resolveComponent("iBizControlBase"), {
      "controller": this.c,
      "class": [this.ns.b(), this.semanticClass("root")],
      "style": this.semanticStyle("root")
    }, {
      default: () => [state.isCreated && content]
    });
  }
});

exports.DashboardControl = DashboardControl;
