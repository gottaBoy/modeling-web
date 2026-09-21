import { isVNode, defineComponent, createVNode, resolveComponent } from 'vue';
import { useNamespace, useSemanticNode } from '@ibiz-template/vue3-util';
import './searchform-buttons.css';
import { ElMessageBox } from 'element-plus';
import { SearchFormButtonsController } from './searchform-buttons.controller.mjs';

"use strict";
function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !isVNode(s);
}
const SearchFormButtons = /* @__PURE__ */ defineComponent({
  name: "IBizSearchFormButtons",
  props: {
    /**
     * @description 搜索表单按钮模型数据
     */
    modelData: {
      type: Object,
      required: true
    },
    /**
     * @description 搜索表单按钮控制器
     */
    controller: {
      type: SearchFormButtonsController,
      required: true
    }
  },
  setup(prop) {
    var _a, _b;
    const ns = useNamespace("searchform-buttons");
    const c = prop.controller;
    const {
      semanticClass,
      semanticStyle
    } = useSemanticNode(c.searchFrom);
    const isDesignPreview = ((_b = (_a = c.panel) == null ? void 0 : _a.context) == null ? void 0 : _b.srfrunmode) === "DESIGN";
    const onSearchButtonClick = () => {
      if (isDesignPreview) {
        return;
      }
      c.onSearchButtonClick();
    };
    const onResetButtonClick = () => {
      c.onResetButtonClick();
    };
    const saveFilterConfirm = () => {
      ElMessageBox.prompt(ibiz.i18n.t("panelComponent.searchformButtons.enterPrompt"), ibiz.i18n.t("panelComponent.searchformButtons.queryPrompt"), {
        confirmButtonText: ibiz.i18n.t("app.save"),
        cancelButtonText: ibiz.i18n.t("app.cancel")
      }).then(({
        value
      }) => {
        c.searchFrom.storeFilter(value);
      });
    };
    const onAdvanceSearch = () => {
      c.searchFrom.evt.emit("openAdvanceSearch", void 0);
    };
    return {
      c,
      ns,
      onSearchButtonClick,
      onResetButtonClick,
      saveFilterConfirm,
      onAdvanceSearch,
      semanticClass,
      semanticStyle
    };
  },
  render() {
    let _slot, _slot4;
    return createVNode("div", {
      "class": [this.ns.b(), this.semanticClass("button"), this.ns.m(this.modelData.id), ...this.controller.containerClass],
      "style": this.semanticStyle("button")
    }, [this.controller.searchButtonStyle === "SEARCHONLY" ? createVNode(resolveComponent("el-button"), {
      "onClick": this.onSearchButtonClick,
      "class": [this.ns.e("search"), this.semanticClass("button.search")],
      "style": this.semanticStyle("button.search")
    }, _isSlot(_slot = ibiz.i18n.t("app.search")) ? _slot : {
      default: () => [_slot]
    }) : createVNode(resolveComponent("el-dropdown"), {
      "split-button": true,
      "type": "primary",
      "class": [this.ns.e("search"), this.semanticClass("button.search")],
      "style": this.semanticStyle("button.search"),
      "onClick": this.onSearchButtonClick
    }, {
      default: () => createVNode("span", {
        "class": this.ns.b("label")
      }, [ibiz.i18n.t("app.search")]),
      dropdown: () => {
        let _slot2, _slot3;
        return createVNode(resolveComponent("el-dropdown-menu"), {
          "class": this.semanticClass("popup"),
          "style": this.semanticStyle("popup")
        }, {
          default: () => [createVNode(resolveComponent("el-dropdown-item"), {
            "onClick": this.onResetButtonClick,
            "class": [this.ns.e("reset"), this.semanticClass("button.reset")],
            "style": this.semanticStyle("button.reset")
          }, _isSlot(_slot2 = ibiz.i18n.t("app.reset")) ? _slot2 : {
            default: () => [_slot2]
          }), this.controller.searchFrom.state.enableStoredFilters && createVNode(resolveComponent("el-dropdown-item"), {
            "onClick": this.saveFilterConfirm,
            "class": [this.ns.e("save"), this.semanticClass("button.save")],
            "style": this.semanticStyle("button.save")
          }, _isSlot(_slot3 = ibiz.i18n.t("panelComponent.searchformButtons.saveCondition")) ? _slot3 : {
            default: () => [_slot3]
          }), this.controller.storedFilters.length > 0 && this.controller.storedFilters.map((item, index) => {
            return createVNode(resolveComponent("el-dropdown-item"), {
              "class": [this.ns.b("filter-item"), this.semanticClass("button.item", {
                item
              })],
              "style": this.semanticStyle("button.item", {
                item
              }),
              "onClick": () => {
                this.controller.searchFrom.applyStoredFilter(index);
              }
            }, {
              default: () => [createVNode("span", {
                "class": this.ns.be("filter-item", "text")
              }, [item.name, createVNode("ion-icon", {
                "class": this.ns.be("filter-item", "remove"),
                "onClick": (event) => {
                  event.stopPropagation();
                  this.controller.searchFrom.removeStoredFilter(index);
                },
                "name": "close-outline"
              }, null)])]
            });
          })]
        });
      }
    }), this.controller.advanceSearch && createVNode(resolveComponent("el-button"), {
      "onClick": this.onAdvanceSearch,
      "class": [this.ns.e("advance"), this.semanticClass("button.advance")],
      "style": this.semanticStyle("button.advance")
    }, _isSlot(_slot4 = ibiz.i18n.t("app.advanceSearch")) ? _slot4 : {
      default: () => [_slot4]
    })]);
  }
});

export { SearchFormButtons };
