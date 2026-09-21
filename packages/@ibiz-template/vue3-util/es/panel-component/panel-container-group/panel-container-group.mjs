import { isVNode, defineComponent, ref, computed, createVNode, resolveComponent } from 'vue';
import { PanelContainerGroupController } from './panel-container-group.controller.mjs';
import './panel-container-group.css';
import '../../use/index.mjs';
import { useNamespace } from '../../use/namespace/namespace.mjs';

"use strict";
function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !isVNode(s);
}
const PanelContainerGroup = /* @__PURE__ */ defineComponent({
  name: "IBizPanelContainerGroup",
  props: {
    modelData: {
      type: Object,
      required: true
    },
    controller: {
      type: PanelContainerGroupController,
      required: true
    }
  },
  setup(props) {
    const ns = useNamespace("panel-container-group");
    const isCollapse = ref(!props.controller.defaultExpansion);
    const changeCollapse = () => {
      if (!props.controller.disableClose) {
        isCollapse.value = !isCollapse.value;
      }
    };
    const captionText = computed(() => {
      const {
        captionItemName,
        caption,
        capLanguageRes
      } = props.modelData;
      if (captionItemName) {
        return props.controller.data[captionItemName];
      }
      let text = caption;
      if (capLanguageRes) {
        text = ibiz.i18n.t(capLanguageRes.lanResTag, caption);
      }
      return text;
    });
    return {
      ns,
      captionText,
      changeCollapse,
      isCollapse
    };
  },
  render() {
    var _a, _b;
    let _slot;
    const classArr = [this.ns.b(), this.ns.m(this.modelData.id), ...this.controller.containerClass, this.ns.is("hidden", !this.controller.state.visible)];
    if (this.modelData.showCaption === true) {
      classArr.push(this.ns.m("show-header"));
      classArr.push(this.ns.b("collapse"));
      classArr.push(this.ns.is("collapse", this.isCollapse));
      if (this.controller.disableClose) {
        classArr.push(this.ns.bm("collapse", "disable-close"));
      }
    }
    const defaultSlots = ((_b = (_a = this.$slots).default) == null ? void 0 : _b.call(_a)) || [];
    const content = createVNode(resolveComponent("iBizRow"), {
      "slot": "content",
      "layout": this.modelData.layout
    }, _isSlot(_slot = defaultSlots.map((slot) => {
      const props = slot.props;
      if (!props || !props.controller) {
        return slot;
      }
      return createVNode(resolveComponent("iBizCol"), {
        "layoutPos": props.modelData.layoutPos,
        "state": props.controller.state
      }, _isSlot(slot) ? slot : {
        default: () => [slot]
      });
    })) ? _slot : {
      default: () => [_slot]
    });
    let header = null;
    if (this.modelData.showCaption) {
      header = createVNode("div", {
        "class": [this.ns.b("header")],
        "onClick": this.changeCollapse
      }, [createVNode("div", {
        "class": [this.ns.be("header", "left")]
      }, [createVNode("div", {
        "class": [this.ns.e("caption"), ...this.controller.labelClass]
      }, [this.captionText])]), createVNode("div", {
        "class": [this.ns.be("header", "right")]
      }, [this.modelData.titleBarCloseMode !== void 0 && this.modelData.titleBarCloseMode !== 0 && (this.isCollapse ? createVNode("ion-icon", {
        "name": "caret-forward-sharp"
      }, null) : createVNode("ion-icon", {
        "name": "caret-down-sharp"
      }, null))])]);
    }
    return createVNode("div", {
      "class": classArr
    }, [header, createVNode("div", {
      "class": [this.ns.b("content")]
    }, [content])]);
  }
});

export { PanelContainerGroup };
