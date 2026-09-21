'use strict';

var vue = require('vue');
var runtime = require('@ibiz-template/runtime');
require('../../use/index.cjs');
var namespace = require('../../use/namespace/namespace.cjs');
var useViewController = require('../../use/view/use-view-controller/use-view-controller.cjs');

"use strict";
const PortalView = /* @__PURE__ */ vue.defineComponent({
  name: "IBizPortalView",
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
    }
  },
  setup() {
    var _a;
    const ns = namespace.useNamespace("view");
    const c = useViewController.useViewController((...args) => new runtime.ViewController(...args));
    const controls = ((_a = c.model.viewLayoutPanel) == null ? void 0 : _a.controls) || c.model.controls;
    const {
      viewType,
      sysCss,
      codeName
    } = c.model;
    const typeClass = viewType.toLowerCase();
    const sysCssName = sysCss == null ? void 0 : sysCss.cssName;
    const viewClassNames = [ns.b(), ns.b(typeClass), ns.m(codeName), sysCssName];
    return {
      c,
      ns,
      controls,
      viewClassNames
    };
  },
  render() {
    var _a;
    let content = null;
    if (this.c.state.isCreated) {
      const slots = {
        ...this.$slots
      };
      if ((_a = this.controls) == null ? void 0 : _a.length) {
        this.controls.forEach((ctrl) => {
          const slotKey = ctrl.name || ctrl.id;
          const ctrlProps = {
            context: this.c.context,
            params: this.c.params
          };
          if (this.c.slotProps[slotKey]) {
            Object.assign(ctrlProps, this.c.slotProps[slotKey]);
          }
          const outCtrlSlot = slots[slotKey];
          if (outCtrlSlot) {
            slots[slotKey] = () => {
              return outCtrlSlot({
                modelData: ctrl,
                ...ctrlProps
              });
            };
            return;
          }
          const provider = this.c.providers[slotKey];
          if (provider) {
            slots[slotKey] = () => {
              const comp = vue.resolveComponent(provider.component);
              return vue.h(comp, {
                modelData: ctrl,
                ...ctrlProps,
                provider
              });
            };
          }
        });
      }
      if (slots.dashboard) {
        content = slots.dashboard();
      }
    }
    return vue.createVNode("div", {
      "class": this.viewClassNames
    }, [content]);
  }
});

exports.PortalView = PortalView;
