import { defineComponent, createVNode, resolveComponent, onActivated, computed } from 'vue';
import { useControlController, useNamespace } from '@ibiz-template/vue3-util';
import { CaptionBarController } from '@ibiz-template/runtime';
import './caption-bar.css';

"use strict";
const CaptionBarControl = /* @__PURE__ */ defineComponent({
  name: "IBizCaptionBarControl",
  props: {
    /**
     * @description 标题栏模型数据
     */
    modelData: {
      type: Object,
      required: true
    },
    /**
     * @description 应用上下文
     */
    context: {
      type: Object,
      required: true
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
     * @description 部件适配器
     */
    provider: {
      type: Object
    },
    /**
     * @description 业务数据（为修复面板下）
     */
    data: {
      type: Object
    }
  },
  setup() {
    const c = useControlController((...args) => new CaptionBarController(...args));
    const ns = useNamespace("control-".concat(c.model.controlType.toLowerCase()));
    c.setBrowserTabTitle();
    onActivated(() => {
      c.setBrowserTabTitle();
    });
    const showTotal = computed(() => {
      return c.state.totalx !== void 0;
    });
    return {
      c,
      ns,
      showTotal
    };
  },
  render() {
    return createVNode(resolveComponent("iBizControlBase"), {
      "controller": this.c,
      "class": [this.ns.b()]
    }, {
      default: () => [createVNode("div", {
        "class": [this.ns.b("caption"), this.ns.is("show-icon", !!this.c.model.sysImage)]
      }, [this.c.model.sysImage && createVNode(resolveComponent("iBizIcon"), {
        "class": [this.ns.be("caption", "icon")],
        "icon": this.c.model.sysImage
      }, null), createVNode("div", {
        "class": [this.ns.be("caption", "content")]
      }, [this.c.state.caption]), this.showTotal && createVNode("div", {
        "class": [this.ns.be("caption", "total")]
      }, [ibiz.i18n.t("control.captionBar.total", {
        total: this.c.state.totalx,
        invisibleNum: this.c.state.totalx - this.c.state.total
      })])])]
    });
  }
});

export { CaptionBarControl };
