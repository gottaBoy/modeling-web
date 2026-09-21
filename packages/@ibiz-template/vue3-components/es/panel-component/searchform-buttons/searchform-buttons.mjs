import { isVNode, defineComponent, createVNode, resolveComponent } from 'vue';
import { useNamespace } from '@ibiz-template/vue3-util';
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
    modelData: {
      type: Object,
      required: true
    },
    controller: {
      type: SearchFormButtonsController,
      required: true
    }
  },
  setup(prop) {
    const ns = useNamespace("searchform-buttons");
    const c = prop.controller;
    const onSearchButtonClick = () => {
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
    return {
      ns,
      c,
      onSearchButtonClick,
      onResetButtonClick,
      saveFilterConfirm
    };
  },
  render() {
    let _slot;
    return createVNode("div", {
      "class": [this.ns.b(), this.ns.m(this.modelData.id), ...this.controller.containerClass]
    }, [this.controller.searchButtonStyle === "SEARCHONLY" ? createVNode(resolveComponent("el-button"), {
      "onClick": this.onSearchButtonClick
    }, _isSlot(_slot = ibiz.i18n.t("app.search")) ? _slot : {
      default: () => [_slot]
    }) : createVNode(resolveComponent("el-dropdown"), {
      "split-button": true,
      "type": "primary",
      "onClick": this.onSearchButtonClick
    }, {
      default: () => createVNode("span", {
        "class": this.ns.b("label")
      }, [ibiz.i18n.t("app.search")]),
      dropdown: () => {
        let _slot2, _slot3;
        return createVNode(resolveComponent("el-dropdown-menu"), null, {
          default: () => [createVNode(resolveComponent("el-dropdown-item"), {
            "onClick": this.onResetButtonClick
          }, _isSlot(_slot2 = ibiz.i18n.t("app.reset")) ? _slot2 : {
            default: () => [_slot2]
          }), this.controller.searchFrom.state.enableStoredFilters && createVNode(resolveComponent("el-dropdown-item"), {
            "onClick": this.saveFilterConfirm
          }, _isSlot(_slot3 = ibiz.i18n.t("panelComponent.searchformButtons.saveCondition")) ? _slot3 : {
            default: () => [_slot3]
          }), this.controller.storedFilters.length > 0 && this.controller.storedFilters.map((item, index) => {
            return createVNode(resolveComponent("el-dropdown-item"), {
              "class": this.ns.b("filter-item"),
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
    })]);
  }
});

export { SearchFormButtons };
