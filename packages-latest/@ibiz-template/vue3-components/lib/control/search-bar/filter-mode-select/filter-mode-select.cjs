'use strict';

var vue = require('vue');
var runtime = require('@ibiz-template/runtime');

"use strict";
function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !vue.isVNode(s);
}
const FilterModeSelect = /* @__PURE__ */ vue.defineComponent({
  name: "IBizFilterModeSelect",
  props: {
    value: String,
    modes: Array,
    disabled: Boolean
  },
  emits: {
    change: (_mode) => true
  },
  setup(props, {
    emit
  }) {
    const FilterModes = [{
      valueOP: runtime.ValueOP.EQ,
      label: ibiz.i18n.t("control.searchBar.conditions.eq")
    }, {
      valueOP: runtime.ValueOP.NOT_EQ,
      label: ibiz.i18n.t("control.searchBar.conditions.not_eq")
    }, {
      valueOP: runtime.ValueOP.GT,
      label: ibiz.i18n.t("control.searchBar.conditions.gt")
    }, {
      valueOP: runtime.ValueOP.GT_AND_EQ,
      label: ibiz.i18n.t("control.searchBar.conditions.gt_and_eq")
    }, {
      valueOP: runtime.ValueOP.LT,
      label: ibiz.i18n.t("control.searchBar.conditions.lt")
    }, {
      valueOP: runtime.ValueOP.LT_AND_EQ,
      label: ibiz.i18n.t("control.searchBar.conditions.lt_and_eq")
    }, {
      valueOP: runtime.ValueOP.IS_NULL,
      label: ibiz.i18n.t("control.searchBar.conditions.is_null")
    }, {
      valueOP: runtime.ValueOP.IS_NOT_NULL,
      label: ibiz.i18n.t("control.searchBar.conditions.is_not_null")
    }, {
      valueOP: runtime.ValueOP.IN,
      label: ibiz.i18n.t("control.searchBar.conditions.in")
    }, {
      valueOP: runtime.ValueOP.NOT_IN,
      label: ibiz.i18n.t("control.searchBar.conditions.not_in")
    }, {
      valueOP: runtime.ValueOP.LIKE,
      label: ibiz.i18n.t("control.searchBar.conditions.like")
    }, {
      valueOP: runtime.ValueOP.LEFT_LIKE,
      label: ibiz.i18n.t("control.searchBar.conditions.left_like")
    }, {
      valueOP: runtime.ValueOP.RIGHT_LIKE,
      label: ibiz.i18n.t("control.searchBar.conditions.right_like")
    }, {
      valueOP: runtime.ValueOP.EXISTS,
      label: ibiz.i18n.t("control.searchBar.conditions.exists")
    }, {
      valueOP: runtime.ValueOP.NOT_EXISTS,
      label: ibiz.i18n.t("control.searchBar.conditions.not_exists")
    }];
    const availableModes = vue.computed(() => {
      var _a;
      if ((_a = props.modes) == null ? void 0 : _a.length) {
        return FilterModes.filter((item) => props.modes.includes(item.valueOP));
      }
      return FilterModes;
    });
    const onChange = (value) => {
      emit("change", value);
    };
    return {
      availableModes,
      onChange
    };
  },
  render() {
    let _slot;
    return vue.createVNode(vue.resolveComponent("el-select"), {
      "model-value": this.value,
      "disabled": this.disabled,
      "teleported": false,
      "onChange": (value) => {
        this.onChange(value);
      }
    }, _isSlot(_slot = this.availableModes.map((mode) => {
      return vue.createVNode(vue.resolveComponent("el-option"), {
        "key": mode.valueOP,
        "value": mode.valueOP,
        "label": mode.label
      }, null);
    })) ? _slot : {
      default: () => [_slot]
    });
  }
});

exports.FilterModeSelect = FilterModeSelect;
