import { isVNode, defineComponent, createVNode, h, resolveComponent, Teleport, withDirectives, resolveDirective, computed, renderSlot, onMounted, nextTick, onBeforeUnmount } from 'vue';
import { getErrorViewProvider, ViewController, getControlsByView, getCtrlTeleportParams } from '@ibiz-template/runtime';
import './view.css';
import '../../use/index.mjs';
import { useNamespace } from '../../use/namespace/namespace.mjs';
import { useViewController } from '../../use/view/use-view-controller/use-view-controller.mjs';
import { useViewOperation } from '../../use/view/use-view-operation/use-view-operation.mjs';

"use strict";
function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !isVNode(s);
}
const View = /* @__PURE__ */ defineComponent({
  name: "IBizView",
  props: {
    /**
     * @description 应用上下文
     */
    context: {
      type: Object
    },
    /**
     * @description 视图参数
     * @default {}
     */
    params: {
      type: Object,
      default: () => ({})
    },
    /**
     * @description 视图模型
     */
    modelData: {
      type: Object,
      required: true
    },
    /**
     * @description 视图模态操作对象，在模态等形式打开视图时，需给视图注入此对象
     */
    modal: {
      type: Object
    },
    /**
     * @description 视图状态
     */
    state: {
      type: Object
    },
    /**
     * @description 视图适配器
     */
    provider: {
      type: Object
    }
  },
  setup(_props, {
    slots
  }) {
    const ns = useNamespace("view");
    const c = useViewController((...args) => new ViewController(...args));
    useViewOperation(c);
    const allControls = getControlsByView(c.model);
    const teleportControls = [];
    const teleportTags = /* @__PURE__ */ new Map();
    const controls = [];
    allControls.forEach((ctrl) => {
      const {
        teleportFlag,
        teleportTag
      } = getCtrlTeleportParams(ctrl);
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
    const viewClassNames = computed(() => [ns.b(), ns.b(typeClass), ns.m(codeName), sysCssName, c.state.viewMessages.TOP ? "has-top-message" : "", c.state.viewMessages.BOTTOM ? "has-bottom-message" : "", c.state.presetClassList]);
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
        return renderSlot(slots, slotKey, ctrlProps);
      }
      const provider = c.providers[slotKey];
      const comp = resolveComponent((provider == null ? void 0 : provider.component) || "IBizControlShell");
      if (provider) {
        ctrlProps.provider = provider;
      }
      return h(comp, ctrlProps);
    };
    let watermarkDestroy;
    onMounted(() => {
      nextTick(async () => {
        const container = document.getElementById(c.id);
        const appView = await ibiz.hub.config.view.get(c.model.id);
        if (!container || !(appView == null ? void 0 : appView.waterMarkOption))
          return;
        watermarkDestroy = ibiz.util.watermark.mount(appView.waterMarkOption, container, c.context, c.params, c.state.srfactiveviewdata || {});
      });
    });
    onBeforeUnmount(() => {
      watermarkDestroy == null ? void 0 : watermarkDestroy();
    });
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
        layoutPanel = createVNode("span", {
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
        layoutPanel = h(resolveComponent(provider.component), {
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
        return createVNode("div", {
          "style": this.getControlStyle()
        }, [createVNode(Teleport, {
          "to": tag,
          "disabled": !this.c.state.activated
        }, _isSlot(_slot = this.renderControl(ctrl)) ? _slot : {
          default: () => [_slot]
        })]);
      });
    }
    let errorContent = null;
    if (this.c.state.hasError && this.c.error.status) {
      const provider = getErrorViewProvider(this.c.error.status);
      if (provider) {
        if (typeof provider.component === "string") {
          errorContent = h(resolveComponent(provider.component));
        }
        errorContent = h(provider.component);
      }
    }
    return withDirectives(createVNode("div", {
      "class": this.viewClassNames,
      "id": this.c.id,
      "element-loading-text": this.c.state.loadingText
    }, [layoutPanel, teleportContent, errorContent]), [[resolveDirective("loading"), this.c.state.isLoading]]);
  }
});

export { View };
