import { defineComponent, ref, computed, createVNode, resolveComponent } from 'vue';
import { useNamespace, IBizIcon } from '@ibiz-template/vue3-util';
import './form-item-container.css';
import { showTitle } from '@ibiz-template/core';

"use strict";
const IBizFormItemContainer = /* @__PURE__ */ defineComponent({
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
    const ns = useNamespace("form-item-container");
    const tooltip = ref();
    const cssVars = computed(() => {
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
        return createVNode(resolveComponent("el-tooltip"), {
          "effect": "light",
          "offset": 4,
          "popper-class": ns.e("popper"),
          "ref": "tooltip"
        }, {
          default: () => {
            return createVNode("div", {
              "class": classList
            }, [props.labelSysImg && createVNode(IBizIcon, {
              "class": ns.em("label", "icon"),
              "icon": props.labelSysImg
            }, null), props.label]);
          },
          content: () => {
            return createVNode("div", {
              "class": ns.em("label", "tooltip")
            }, [props.inputTip || props.label, props.inputTipUrl && createVNode("a", {
              "href": props.inputTipUrl,
              "target": "_blank"
            }, [ibiz.i18n.t("component.formItemContainer.more")]), props.inputTipClosable && createVNode("ion-icon", {
              "name": "close-circle",
              "onClick": hiddenTooltip
            }, null)]);
          }
        });
      }
      return createVNode("div", {
        "class": classList,
        "title": showTitle(props.label)
      }, [props.labelSysImg && createVNode(IBizIcon, {
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
    const content = createVNode("div", {
      "class": [this.ns.e("content"), this.ns.em("content", "label-".concat(this.labelPos.toLowerCase()))]
    }, [createVNode("div", {
      "class": [this.ns.e("editor")]
    }, [(_b = (_a = this.$slots).default) == null ? void 0 : _b.call(_a)]), this.error ? createVNode("div", {
      "title": showTitle(this.error),
      "class": [this.ns.e("error")]
    }, [this.error]) : null]);
    return createVNode("div", {
      "class": [this.ns.b(), this.ns.m(this.labelPos.toLowerCase()), this.ns.is("required", this.required), this.ns.is("error", !!this.error)],
      "style": this.cssVars
    }, [this.labelPos === "LEFT" || this.labelPos === "TOP" ? this.renderLabel() : null, content, this.labelPos === "RIGHT" || this.labelPos === "BOTTOM" ? this.renderLabel() : null]);
  }
});

export { IBizFormItemContainer };
