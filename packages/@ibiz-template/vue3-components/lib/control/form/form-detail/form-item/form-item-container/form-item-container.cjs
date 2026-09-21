'use strict';

var vue = require('vue');
var vue3Util = require('@ibiz-template/vue3-util');
require('./form-item-container.css');
var core = require('@ibiz-template/core');

"use strict";
const IBizFormItemContainer = /* @__PURE__ */ vue.defineComponent({
  name: "IBizFormItemContainer",
  props: {
    required: {
      type: Boolean,
      required: true
    },
    error: {
      type: String
    },
    label: {
      type: String
    },
    labelClass: {
      type: Array
    },
    labelPos: {
      type: String,
      required: true
    },
    labelWidth: {
      type: Number,
      default: 130
    },
    enableInputTip: {
      type: Boolean
    },
    inputTip: {
      type: String
    },
    inputTipUrl: {
      type: String
    },
    inputTipClosable: {
      type: Boolean
    },
    labelSysImg: {
      type: Object
    }
  },
  setup(props) {
    const ns = vue3Util.useNamespace("form-item-container");
    const tooltip = vue.ref();
    const cssVars = vue.computed(() => {
      if (props.labelWidth !== 130) {
        return ns.cssVarBlock({
          "label-width": "".concat(props.labelWidth, "px")
        });
      }
      return {};
    });
    const hiddenTooltip = () => {
      if (tooltip.value) {
        tooltip.value.hide();
      }
    };
    const renderLabel = () => {
      const classList = [ns.e("label"), ...props.labelClass || []];
      if (props.enableInputTip) {
        return vue.createVNode(vue.resolveComponent("el-tooltip"), {
          "effect": "light",
          "offset": 4,
          "popper-class": ns.e("popper"),
          "ref": "tooltip"
        }, {
          default: () => {
            return vue.createVNode("div", {
              "class": classList
            }, [props.labelSysImg && vue.createVNode(vue3Util.IBizIcon, {
              "class": ns.em("label", "icon"),
              "icon": props.labelSysImg
            }, null), props.label]);
          },
          content: () => {
            return vue.createVNode("div", {
              "class": ns.em("label", "tooltip")
            }, [props.inputTip || props.label, props.inputTipUrl && vue.createVNode("a", {
              "href": props.inputTipUrl,
              "target": "_blank"
            }, [ibiz.i18n.t("component.formItemContainer.more")]), props.inputTipClosable && vue.createVNode("ion-icon", {
              "name": "close-circle",
              "onClick": hiddenTooltip
            }, null)]);
          }
        });
      }
      return vue.createVNode("div", {
        "class": classList,
        "title": core.showTitle(props.label)
      }, [props.labelSysImg && vue.createVNode(vue3Util.IBizIcon, {
        "class": ns.em("label", "icon"),
        "icon": props.labelSysImg
      }, null), props.label]);
    };
    return {
      ns,
      cssVars,
      tooltip,
      renderLabel
    };
  },
  render() {
    var _a, _b;
    const content = vue.createVNode("div", {
      "class": [this.ns.e("content"), this.ns.em("content", "label-".concat(this.labelPos.toLowerCase()))]
    }, [vue.createVNode("div", {
      "class": [this.ns.e("editor")]
    }, [(_b = (_a = this.$slots).default) == null ? void 0 : _b.call(_a)]), this.error ? vue.createVNode("div", {
      "title": core.showTitle(this.error),
      "class": [this.ns.e("error")]
    }, [this.error]) : null]);
    return vue.createVNode("div", {
      "class": [this.ns.b(), this.ns.m(this.labelPos.toLowerCase()), this.ns.is("required", this.required), this.ns.is("error", !!this.error)],
      "style": this.cssVars
    }, [this.labelPos === "LEFT" || this.labelPos === "TOP" ? this.renderLabel() : null, content, this.labelPos === "RIGHT" || this.labelPos === "BOTTOM" ? this.renderLabel() : null]);
  }
});

exports.IBizFormItemContainer = IBizFormItemContainer;
