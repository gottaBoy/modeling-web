import { isVNode, defineComponent, createVNode, resolveComponent } from 'vue';
import { useNamespace } from '@ibiz-template/vue3-util';
import './form-page.css';

"use strict";
function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !isVNode(s);
}
const FormPage = /* @__PURE__ */ defineComponent({
  name: "IBizFormPage",
  props: {
    modelData: {
      type: Object,
      required: true
    },
    controller: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const ns = useNamespace("form-page");
    let position = "top";
    if (props.modelData.tabHeaderPos) {
      position = props.modelData.tabHeaderPos.toLowerCase();
    }
    const onTabChange = (name) => {
      props.controller.setActiveTab(name);
    };
    return {
      ns,
      position,
      onTabChange
    };
  },
  render() {
    var _a, _b, _c, _d;
    let _slot;
    const {
      noTabHeader
    } = this.modelData;
    const defaultSlots = ((_c = (_b = (_a = this.$slots).default) == null ? void 0 : _b.call(_a)[0]) == null ? void 0 : _c.children) || [];
    if (defaultSlots.length === 1 || noTabHeader) {
      return createVNode("div", {
        "class": [this.ns.b(), this.ns.m("no-tab-header")]
      }, [defaultSlots]);
    }
    return createVNode(resolveComponent("el-tabs"), {
      "class": [this.ns.b(), this.ns.b("tab"), this.ns.e(this.position)],
      "model-value": (_d = defaultSlots[0]) == null ? void 0 : _d.key,
      "tab-position": this.position,
      "onTabChange": this.onTabChange
    }, _isSlot(_slot = defaultSlots.map((slot) => {
      const props = slot.props;
      if (!props || !props.controller) {
        return slot;
      }
      const c = props.controller;
      if (!c.state.visible && !c.state.keepAlive) {
        return null;
      }
      return createVNode(resolveComponent("el-tab-pane"), {
        "class": this.ns.b("tab-item"),
        "name": c.model.id,
        "lazy": true
      }, {
        default: () => slot,
        label: () => {
          return createVNode("span", {
            "class": c.labelClass
          }, [c.model.sysImage ? createVNode(resolveComponent("iBizIcon"), {
            "icon": c.model.sysImage
          }, null) : null, c.model.caption]);
        }
      });
    })) ? _slot : {
      default: () => [_slot]
    });
  }
});

export { FormPage, FormPage as default };
