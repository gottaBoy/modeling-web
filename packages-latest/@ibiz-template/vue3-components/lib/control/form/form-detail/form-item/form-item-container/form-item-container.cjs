'use strict';

var vue = require('vue');
var vue3Util = require('@ibiz-template/vue3-util');
var core = require('@ibiz-template/core');
require('./form-item-container.css');

"use strict";
const IBizFormItemContainer = /* @__PURE__ */ vue.defineComponent({
  name: "IBizFormItemContainer",
  props: {
    controller: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const ns = vue3Util.useNamespace("form-item-container");
    const c = props.controller;
    const {
      semanticClass,
      semanticStyle
    } = vue3Util.useSemanticNode(c.form);
    const visible = vue.ref(false);
    const {
      sysImage,
      enableInputTip,
      labelPos
    } = c.model;
    vue.watch(() => visible.value, () => {
      if (visible.value)
        c.loadInputTip();
    });
    vue.onUnmounted(() => c.clearTipsCache());
    const showError = vue.computed(() => {
      const {
        validateMode
      } = c.form;
      return validateMode === "default";
    });
    const renderTipContent = () => {
      const {
        inputTip
      } = c.state;
      switch (ibiz.config.tooltiprendermode) {
        case "none":
          return vue.createVNode("span", {
            "class": ns.m("text")
          }, [inputTip]);
        case "html":
          return vue.createVNode("div", {
            "class": ns.m("html"),
            "innerHTML": inputTip
          }, null);
        case "md":
        default:
          return vue.createVNode(vue.resolveComponent("iBizMarkDown"), {
            "value": inputTip,
            "disabled": true
          }, null);
      }
    };
    const renderTipsIcon = () => {
      return vue.createVNode(vue.resolveComponent("el-tooltip"), {
        "effect": "light",
        "visible": visible.value,
        "onUpdate:visible": ($event) => visible.value = $event,
        "popper-class": [ns.e("popper"), ns.is(ibiz.config.tooltiprendermode.toLowerCase(), true)],
        "disabled": !enableInputTip,
        "placement": labelPos === "RIGHT" ? "right" : "left"
      }, {
        default: () => {
          return vue.createVNode("ion-icon", {
            "name": "bulb-outline",
            "class": [ns.em("label", "icon"), semanticClass("item.icon", {
              item: props.controller
            })],
            "style": semanticStyle("item.icon", {
              item: props.controller
            })
          }, null);
        },
        content: () => {
          return vue.createVNode("div", {
            "class": [ns.em("popper", "content"), semanticClass("item.tooltip", {
              item: props.controller
            })],
            "style": semanticStyle("item.tooltip", {
              item: props.controller
            })
          }, [vue.createVNode("div", {
            "class": ns.em("popper", "tooltip")
          }, [renderTipContent()]), c.state.inputTipUrl && vue.createVNode("a", {
            "target": "_blank",
            "href": c.state.inputTipUrl,
            "title": ibiz.i18n.t("component.formItemContainer.more")
          }, [ibiz.i18n.t("component.formItemContainer.more")])]);
        }
      });
    };
    const renderLabelWithoutTips = () => {
      return vue.createVNode(vue.resolveComponent("el-tooltip"), {
        "effect": "light",
        "visible": visible.value,
        "onUpdate:visible": ($event) => visible.value = $event,
        "popper-class": [ns.e("popper"), ns.is(ibiz.config.tooltiprendermode.toLowerCase(), true)],
        "disabled": !enableInputTip,
        "placement": labelPos === "RIGHT" ? "right" : "left"
      }, {
        default: () => {
          return vue.createVNode("div", {
            "class": [ns.em("label", "content"), ns.is("tooltip", enableInputTip)]
          }, [sysImage && vue.createVNode(vue3Util.IBizIcon, {
            "class": [ns.em("label", "icon"), semanticClass("item.icon", {
              item: props.controller
            })],
            "style": semanticStyle("item.icon", {
              item: props.controller
            }),
            "icon": sysImage
          }, null), vue.createVNode("div", {
            "class": [ns.em("label", "text"), semanticClass("item.caption", {
              item: props.controller
            }), ...ibiz.config.common.enhancedUI === true ? c.labelClass : []],
            "style": [ibiz.config.common.enhancedUI === true ? c.model.labelCssStyle || "" : "", semanticStyle("item.caption", {
              item: props.controller
            })],
            "title": core.showTitle(enableInputTip ? void 0 : c.labelCaption)
          }, [c.labelCaption])]);
        },
        content: () => {
          return vue.createVNode("div", {
            "class": [ns.em("popper", "content"), semanticClass("item.tooltip", {
              item: props.controller
            })],
            "style": semanticStyle("item.tooltip", {
              item: props.controller
            })
          }, [vue.createVNode("div", {
            "class": ns.em("popper", "tooltip")
          }, [renderTipContent()]), c.state.inputTipUrl && vue.createVNode("a", {
            "target": "_blank",
            "href": c.state.inputTipUrl,
            "title": ibiz.i18n.t("component.formItemContainer.more")
          }, [ibiz.i18n.t("component.formItemContainer.more")])]);
        }
      });
    };
    const renderLabel = () => {
      const form = props.controller.form;
      const showTipsIcon = enableInputTip && form.showTipsIcon;
      return vue.createVNode("div", {
        "class": [ns.e("label"), semanticClass("item.label", {
          item: props.controller
        }), ...ibiz.config.common.enhancedUI === false ? c.labelClass : []],
        "style": [ibiz.config.common.enhancedUI === false ? c.model.labelCssStyle || "" : "", semanticStyle("item.label", {
          item: props.controller
        })]
      }, [showTipsIcon && vue.createVNode("div", {
        "class": [ns.em("label", "content"), ns.is("tooltip", enableInputTip)]
      }, [renderTipsIcon(), sysImage && vue.createVNode(vue3Util.IBizIcon, {
        "class": [ns.em("label", "icon"), semanticClass("item.icon", {
          item: props.controller
        })],
        "style": semanticStyle("item.icon", {
          item: props.controller
        }),
        "icon": sysImage
      }, null), vue.createVNode("div", {
        "class": [ns.em("label", "text"), semanticClass("item.caption", {
          item: props.controller
        }), ...ibiz.config.common.enhancedUI === true ? c.labelClass : []],
        "style": [ibiz.config.common.enhancedUI === true ? c.model.labelCssStyle || "" : "", semanticStyle("item.caption", {
          item: props.controller
        })],
        "title": core.showTitle(c.labelCaption)
      }, [c.labelCaption])]), !showTipsIcon && renderLabelWithoutTips()]);
    };
    return {
      ns,
      showError,
      renderLabel,
      semanticClass,
      semanticStyle
    };
  },
  render() {
    var _a, _b;
    const {
      labelPos
    } = this.controller.model;
    const content = vue.createVNode("div", {
      "class": [this.ns.e("content"), this.ns.em("content", "label-".concat(labelPos == null ? void 0 : labelPos.toLowerCase()))]
    }, [vue.withDirectives(vue.createVNode("div", {
      "class": [this.ns.e("editor"), this.semanticClass("item.content", {
        item: this.controller
      })],
      "style": this.semanticStyle("item.content", {
        item: this.controller
      })
    }, [(_b = (_a = this.$slots).default) == null ? void 0 : _b.call(_a)]), [[vue.resolveDirective("tooltip"), vue3Util.renderTooltip(this.controller.data, this.controller.model, this.controller.form)]]), this.showError && this.controller.state.error ? vue.createVNode("div", {
      "title": core.showTitle(this.controller.state.error),
      "class": [this.ns.e("error"), this.semanticClass("item.error", {
        item: this.controller
      })],
      "style": this.semanticStyle("item.error", {
        item: this.controller
      })
    }, [this.controller.state.error]) : null]);
    return vue.createVNode("div", {
      "class": [this.ns.b(), this.ns.m(labelPos == null ? void 0 : labelPos.toLowerCase()), this.ns.is("required", this.controller.state.required), this.ns.is("error", !!this.controller.state.error)]
    }, [labelPos && ["LEFT", "TOP"].includes(labelPos) && this.renderLabel(), content, labelPos && ["RIGHT", "BOTTOM"].includes(labelPos) && this.renderLabel()]);
  }
});

exports.IBizFormItemContainer = IBizFormItemContainer;
