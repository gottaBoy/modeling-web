'use strict';

var vue = require('vue');
var runtime = require('@ibiz-template/runtime');
require('./view.css');
require('../../use/index.cjs');
var namespace = require('../../use/namespace/namespace.cjs');
var useViewController = require('../../use/view/use-view-controller/use-view-controller.cjs');
var useViewOperation = require('../../use/view/use-view-operation/use-view-operation.cjs');

"use strict";
function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !vue.isVNode(s);
}
const View = /* @__PURE__ */ vue.defineComponent({
  name: "IBizView",
  props: {
    context: Object,
    params: {
      type: Object,
      default: () => ({})
    },
    modelData: {
      type: Object,
      required: true
    },
    modal: {
      type: Object
    },
    state: {
      type: Object
    },
    provider: {
      type: Object
    }
  },
  setup(_props, {
    slots
  }) {
    const ns = namespace.useNamespace("view");
    const c = useViewController.useViewController((...args) => new runtime.ViewController(...args));
    useViewOperation.useViewOperation(c);
    const allControls = runtime.getControlsByView(c.model);
    const teleportControls = [];
    const teleportTags = /* @__PURE__ */ new Map();
    const controls = [];
    allControls.forEach((ctrl) => {
      const {
        teleportFlag,
        teleportTag
      } = runtime.getCtrlTeleportParams(ctrl);
      if (!!teleportTag || teleportFlag) {
        teleportControls.push(ctrl);
        teleportTags.set(ctrl.id, teleportTag || "");
      } else {
        controls.push(ctrl);
      }
    });
    const getCtrlTeleportTag = (ctrl) => {
      var _a, _b;
      const tag = teleportTags.get(ctrl.id);
      if (tag) {
        return tag;
      }
      const placeholderC = (_b = (_a = c.parentView) == null ? void 0 : _a.layoutPanel) == null ? void 0 : _b.panelItems[ctrl.name];
      if (placeholderC) {
        return "#".concat(placeholderC.state.teleportTag);
      }
    };
    const {
      viewType,
      sysCss,
      codeName
    } = c.model;
    const typeClass = viewType.toLowerCase();
    const sysCssName = sysCss == null ? void 0 : sysCss.cssName;
    const viewClassNames = vue.computed(() => [ns.b(), ns.b(typeClass), ns.m(codeName), sysCssName, c.state.viewMessages.TOP ? "has-top-message" : "", c.state.viewMessages.BOTTOM ? "has-bottom-message" : "", c.state.presetClassList]);
    const onLayoutPanelCreated = (controller) => {
      c.setLayoutPanel(controller);
    };
    const getControlStyle = () => {
      const result = {};
      Object.assign(result, {
        display: c.state.hasError ? "none" : "initial"
      });
      return result;
    };
    const getCtrlProps = (ctrl, slotProps = {}) => {
      const slotKey = ctrl.name || ctrl.id;
      return {
        context: c.context,
        params: c.params,
        modelData: ctrl,
        ...c.slotProps[slotKey] || {},
        ...slotProps
      };
    };
    const renderControl = (ctrl, slotProps = {}) => {
      const slotKey = ctrl.name || ctrl.id;
      const ctrlProps = getCtrlProps(ctrl, slotProps);
      if (slots[slotKey]) {
        return vue.renderSlot(slots, slotKey, ctrlProps);
      }
      const provider = c.providers[slotKey];
      const comp = vue.resolveComponent((provider == null ? void 0 : provider.component) || "IBizControlShell");
      if (provider) {
        ctrlProps.provider = provider;
      }
      return vue.h(comp, ctrlProps);
    };
    return {
      c,
      ns,
      controls,
      teleportControls,
      viewClassNames,
      onLayoutPanelCreated,
      getCtrlProps,
      renderControl,
      getCtrlTeleportTag,
      getControlStyle
    };
  },
  render() {
    var _a, _b;
    let layoutPanel = null;
    if (this.c.state.isCreated) {
      if (this.c.engines.length === 0) {
        layoutPanel = vue.createVNode("span", {
          "style": "color:red;"
        }, [ibiz.i18n.t("vue3Util.view.viewType", {
          viewType: this.modelData.viewType
        })]);
      } else {
        const slots = {
          ...this.$slots
        };
        if ((_a = this.controls) == null ? void 0 : _a.length) {
          this.controls.forEach((ctrl) => {
            const slotKey = ctrl.name || ctrl.id;
            slots[slotKey] = (slotProps) => {
              return this.renderControl(ctrl, slotProps);
            };
          });
        }
        const viewLayoutPanel = this.c.model.viewLayoutPanel;
        const provider = this.c.providers[viewLayoutPanel.name];
        layoutPanel = vue.h(vue.resolveComponent(provider.component), {
          modelData: viewLayoutPanel,
          context: this.c.context,
          params: this.c.params,
          provider,
          container: this.c,
          style: this.getControlStyle(),
          onControllerAppear: this.onLayoutPanelCreated
        }, slots);
      }
    }
    let teleportContent = null;
    if (this.c.state.isCreated && ((_b = this.teleportControls) == null ? void 0 : _b.length)) {
      teleportContent = this.teleportControls.map((ctrl) => {
        let _slot;
        const tag = this.getCtrlTeleportTag(ctrl);
        if (!tag) {
          ibiz.log.error(ibiz.i18n.t("vue3Util.view.noTeleportTag", {
            name: ctrl.name
          }));
          return null;
        }
        return vue.createVNode("div", {
          "style": this.getControlStyle()
        }, [vue.createVNode(vue.Teleport, {
          "to": tag,
          "disabled": !this.c.state.activated
        }, _isSlot(_slot = this.renderControl(ctrl)) ? _slot : {
          default: () => [_slot]
        })]);
      });
    }
    let errorContent = null;
    if (this.c.state.hasError && this.c.error.status) {
      const provider = runtime.getErrorViewProvider(this.c.error.status);
      if (provider) {
        if (typeof provider.component === "string") {
          errorContent = vue.h(vue.resolveComponent(provider.component));
        }
        errorContent = vue.h(provider.component);
      }
    }
    return vue.withDirectives(vue.createVNode("div", {
      "class": this.viewClassNames,
      "id": this.c.id
    }, [layoutPanel, teleportContent, errorContent]), [[vue.resolveDirective("loading"), this.c.state.isLoading]]);
  }
});

exports.View = View;
