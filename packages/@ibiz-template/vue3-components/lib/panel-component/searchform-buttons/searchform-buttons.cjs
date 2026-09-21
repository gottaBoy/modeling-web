'use strict';

var vue = require('vue');
var vue3Util = require('@ibiz-template/vue3-util');
require('./searchform-buttons.css');
var ElementPlus = require('element-plus');
var searchformButtons_controller = require('./searchform-buttons.controller.cjs');

"use strict";
function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !vue.isVNode(s);
}
const SearchFormButtons = /* @__PURE__ */ vue.defineComponent({
  name: "IBizSearchFormButtons",
  props: {
    modelData: {
      type: Object,
      required: true
    },
    controller: {
      type: searchformButtons_controller.SearchFormButtonsController,
      required: true
    }
  },
  setup(prop) {
    const ns = vue3Util.useNamespace("searchform-buttons");
    const c = prop.controller;
    const onSearchButtonClick = () => {
      c.onSearchButtonClick();
    };
    const onResetButtonClick = () => {
      c.onResetButtonClick();
    };
    const saveFilterConfirm = () => {
      ElementPlus.ElMessageBox.prompt(ibiz.i18n.t("panelComponent.searchformButtons.enterPrompt"), ibiz.i18n.t("panelComponent.searchformButtons.queryPrompt"), {
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
    return vue.createVNode("div", {
      "class": [this.ns.b(), this.ns.m(this.modelData.id), ...this.controller.containerClass]
    }, [this.controller.searchButtonStyle === "SEARCHONLY" ? vue.createVNode(vue.resolveComponent("el-button"), {
      "onClick": this.onSearchButtonClick
    }, _isSlot(_slot = ibiz.i18n.t("app.search")) ? _slot : {
      default: () => [_slot]
    }) : vue.createVNode(vue.resolveComponent("el-dropdown"), {
      "split-button": true,
      "type": "primary",
      "onClick": this.onSearchButtonClick
    }, {
      default: () => vue.createVNode("span", {
        "class": this.ns.b("label")
      }, [ibiz.i18n.t("app.search")]),
      dropdown: () => {
        let _slot2, _slot3;
        return vue.createVNode(vue.resolveComponent("el-dropdown-menu"), null, {
          default: () => [vue.createVNode(vue.resolveComponent("el-dropdown-item"), {
            "onClick": this.onResetButtonClick
          }, _isSlot(_slot2 = ibiz.i18n.t("app.reset")) ? _slot2 : {
            default: () => [_slot2]
          }), this.controller.searchFrom.state.enableStoredFilters && vue.createVNode(vue.resolveComponent("el-dropdown-item"), {
            "onClick": this.saveFilterConfirm
          }, _isSlot(_slot3 = ibiz.i18n.t("panelComponent.searchformButtons.saveCondition")) ? _slot3 : {
            default: () => [_slot3]
          }), this.controller.storedFilters.length > 0 && this.controller.storedFilters.map((item, index) => {
            return vue.createVNode(vue.resolveComponent("el-dropdown-item"), {
              "class": this.ns.b("filter-item"),
              "onClick": () => {
                this.controller.searchFrom.applyStoredFilter(index);
              }
            }, {
              default: () => [vue.createVNode("span", {
                "class": this.ns.be("filter-item", "text")
              }, [item.name, vue.createVNode("ion-icon", {
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

exports.SearchFormButtons = SearchFormButtons;
