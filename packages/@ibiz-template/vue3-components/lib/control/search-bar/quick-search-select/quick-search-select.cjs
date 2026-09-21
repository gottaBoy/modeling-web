'use strict';

var vue = require('vue');
var runtime = require('@ibiz-template/runtime');
var vue3Util = require('@ibiz-template/vue3-util');
require('./quick-search-select.css');

"use strict";
function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !vue.isVNode(s);
}
const QuickSearchSelect = /* @__PURE__ */ vue.defineComponent({
  name: "IBizQuickSearchSelect",
  props: {
    controller: {
      type: runtime.SearchBarController,
      required: true
    }
  },
  setup(props) {
    const ns = vue3Util.useNamespace("quick-search-select");
    const onItemClick = (item) => {
      const key = item.fieldName;
      const {
        quickSearchFieldNames
      } = props.controller.state;
      const index = quickSearchFieldNames.indexOf(key);
      if (index === -1) {
        quickSearchFieldNames.push(key);
      } else {
        if (quickSearchFieldNames.length <= 1)
          return;
        quickSearchFieldNames.splice(index, 1);
      }
      props.controller.calcQuickSearchPlaceHolder();
    };
    return {
      ns,
      onItemClick
    };
  },
  render() {
    const {
      state
    } = this.controller;
    return vue.createVNode(vue.resolveComponent("el-dropdown"), {
      "onCommand": this.onItemClick,
      "trigger": "click",
      "hide-on-click": false,
      "class": [this.ns.b()],
      "popper-class": [this.ns.b("popover")]
    }, {
      default: () => vue.createVNode("div", {
        "title": ibiz.i18n.t("control.searchBar.quickSearchSelect.searchField"),
        "class": this.ns.e("icon")
      }, [vue.createVNode("ion-icon", {
        "name": "settings-outline"
      }, null)]),
      dropdown: () => {
        let _slot;
        return vue.createVNode(vue.resolveComponent("el-dropdown-menu"), null, _isSlot(_slot = state.quickSearchItems.map((item) => {
          const isSelected = state.quickSearchFieldNames.includes(item.fieldName);
          return vue.createVNode(vue.resolveComponent("el-dropdown-item"), {
            "class": [this.ns.be("popover", "item"), isSelected && this.ns.bem("popover", "item", "selected")],
            "command": item
          }, {
            default: () => [item.label]
          });
        })) ? _slot : {
          default: () => [_slot]
        });
      }
    });
  }
});

exports.QuickSearchSelect = QuickSearchSelect;
