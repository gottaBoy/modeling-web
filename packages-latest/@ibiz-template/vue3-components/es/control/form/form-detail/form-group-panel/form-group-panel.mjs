import { isVNode, defineComponent, createVNode, resolveComponent, withDirectives, resolveDirective, computed } from 'vue';
import { FormGroupPanelController } from '@ibiz-template/runtime';
import { useNamespace, useSemanticNode } from '@ibiz-template/vue3-util';
import './form-group-panel.css';

"use strict";
function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !isVNode(s);
}
const FormGroupPanel = /* @__PURE__ */ defineComponent({
  name: "IBizFormGroupPanel",
  props: {
    modelData: {
      type: Object,
      required: true
    },
    controller: {
      type: FormGroupPanelController,
      required: true
    }
  },
  setup(props) {
    const ns = useNamespace("form-group");
    const c = props.controller;
    const {
      semanticClass,
      semanticStyle
    } = useSemanticNode(c.form);
    const zIndex = props.controller.form.state.zIndex;
    const changeCollapse = () => {
      if (!c.disableClose) {
        c.state.collapse = !c.state.collapse;
      }
    };
    const onActionClick = async (detail, event) => {
      const tempParams = {
        srfgroupid: props.modelData.codeName
      };
      await props.controller.onActionClick(detail, event, tempParams);
    };
    const captionText = computed(() => {
      const {
        captionItemName,
        caption
      } = props.modelData;
      if (captionItemName) {
        return props.controller.data[captionItemName];
      }
      return caption;
    });
    return {
      ns,
      zIndex,
      captionText,
      changeCollapse,
      onActionClick,
      semanticClass,
      semanticStyle
    };
  },
  render() {
    var _a, _b;
    let _slot;
    const {
      state
    } = this.controller;
    const defaultSlots = ((_b = (_a = this.$slots).default) == null ? void 0 : _b.call(_a)) || [];
    const content = createVNode(resolveComponent("iBizRow"), {
      "class": this.ns.be("content", "row"),
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
    const classArr = [this.ns.b(), this.ns.m(this.modelData.codeName), this.semanticClass("group", {
      group: this.controller
    }), this.modelData.detailStyle ? this.ns.m(this.modelData.detailStyle.toLowerCase()) : "", ...this.controller.containerClass];
    if (this.modelData.showCaption === true) {
      classArr.push(this.ns.m("show-header"));
      classArr.push(this.ns.b("collapse"));
      classArr.push(this.ns.is("collapse", this.controller.state.collapse));
      if (this.controller.disableClose) {
        classArr.push(this.ns.bm("collapse", "disable-close"));
      }
      if (this.modelData.showMoreMode === 2) {
        classArr.push(this.ns.m("show-more"));
      }
    }
    let header = null;
    if (this.modelData.showCaption) {
      header = createVNode("div", {
        "class": [this.ns.b("header"), this.semanticClass("group.header", {
          group: this.controller
        })],
        "onClick": this.changeCollapse,
        "style": [this.controller.model.labelCssStyle, this.semanticStyle("group.header", {
          group: this.controller
        })]
      }, [createVNode("div", {
        "class": [this.ns.be("header", "left")]
      }, [createVNode("div", {
        "class": [this.ns.e("caption"), ...this.controller.labelClass]
      }, [this.modelData.sysImage && createVNode(resolveComponent("iBizIcon"), {
        "class": [this.ns.em("caption", "icon"), this.semanticClass("group.icon", {
          group: this.controller
        })],
        "style": this.semanticStyle("group.icon", {
          group: this.controller
        }),
        "icon": this.modelData.sysImage
      }, null), createVNode("span", {
        "class": this.semanticClass("group.caption", {
          group: this.controller
        }),
        "style": this.semanticStyle("group.caption", {
          group: this.controller
        })
      }, [this.captionText])])]), createVNode("div", {
        "class": [this.ns.be("header", "right")]
      }, [this.modelData.uiactionGroup && createVNode(resolveComponent("iBizActionToolbar"), {
        "zIndex": this.zIndex,
        "class": [this.ns.e("toolbar"), this.semanticClass("group.toolbar", {
          group: this.controller
        })],
        "style": this.semanticStyle("group.toolbar", {
          group: this.controller
        }),
        "action-details": this.modelData.uiactionGroup.uiactionGroupDetails,
        "actions-state": state.actionGroupState,
        "onActionClick": this.onActionClick,
        "caption": this.modelData.uiactionGroup.name,
        "mode": this.modelData.actionGroupExtractMode === "ITEMS" ? "dropdown" : "buttons"
      }, null), this.modelData.titleBarCloseMode !== void 0 && this.modelData.titleBarCloseMode !== 0 && (this.controller.state.collapse ? createVNode("svg", {
        "xmlns": "http://www.w3.org/2000/svg",
        "viewBox": "0 0 1024 1024",
        "width": "1em",
        "height": "1em",
        "class": this.ns.be("header", "icon")
      }, [createVNode("title", null, [ibiz.i18n.t("control.form.formGroup.unfold")]), createVNode("path", {
        "fill": "currentColor",
        "d": "M340.864 149.312a30.592 30.592 0 0 0 0 42.752L652.736 512 340.864 831.872a30.592 30.592 0 0 0 0 42.752 29.12 29.12 0 0 0 41.728 0L714.24 534.336a32 32 0 0 0 0-44.672L382.592 149.376a29.12 29.12 0 0 0-41.728 0z"
      }, null)]) : createVNode("svg", {
        "xmlns": "http://www.w3.org/2000/svg",
        "viewBox": "0 0 1024 1024",
        "width": "1em",
        "height": "1em",
        "class": this.ns.be("header", "icon")
      }, [createVNode("title", null, [ibiz.i18n.t("control.form.formGroup.fold")]), createVNode("path", {
        "fill": "currentColor",
        "d": "M831.872 340.864 512 652.672 192.128 340.864a30.592 30.592 0 0 0-42.752 0 29.12 29.12 0 0 0 0 41.6L489.664 714.24a32 32 0 0 0 44.672 0l340.288-331.712a29.12 29.12 0 0 0 0-41.728 30.592 30.592 0 0 0-42.752 0z"
      }, null)]))])]);
    }
    let footer = null;
    if (this.modelData.showMoreMode === 2) {
      footer = createVNode("div", {
        "class": [this.ns.b("footer"), this.semanticClass("group.footer", {
          group: this.controller
        })],
        "style": this.semanticStyle("group.footer", {
          group: this.controller
        })
      }, [createVNode("div", {
        "class": this.ns.be("footer", "show-more-button"),
        "onClick": () => {
          state.isShowMore = !state.isShowMore;
        }
      }, [!state.isShowMore ? ibiz.i18n.t("control.form.formGroupPanel.showMore") : ibiz.i18n.t("app.retract")])]);
    }
    return withDirectives(createVNode("div", {
      "class": classArr,
      "style": this.semanticStyle("group", {
        group: this.controller
      }),
      "element-loading-text": this.controller.state.loadingText,
      "id": "".concat(this.controller.form.view.model.codeName, "_").concat(this.controller.form.model.codeName, "_").concat(this.modelData.codeName),
      "onClick": (event) => this.controller.onClick(event)
    }, [header, createVNode("div", {
      "class": [this.ns.b("content"), this.semanticClass("group.content", {
        group: this.controller
      })],
      "style": [this.controller.model.cssStyle, this.semanticStyle("group.content", {
        group: this.controller
      })]
    }, [content]), footer]), [[resolveDirective("loading"), this.controller.state.loading]]);
  }
});

export { FormGroupPanel, FormGroupPanel as default };
