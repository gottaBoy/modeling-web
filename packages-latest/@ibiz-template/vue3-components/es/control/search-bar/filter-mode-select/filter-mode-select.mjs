import { isVNode, defineComponent, createVNode, resolveComponent, computed } from 'vue';
import { ValueOP } from '@ibiz-template/runtime';

"use strict";
function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !isVNode(s);
}
const FilterModeSelect = /* @__PURE__ */ defineComponent({
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
      valueOP: ValueOP.EQ,
      label: ibiz.i18n.t("control.searchBar.conditions.eq")
    }, {
      valueOP: ValueOP.NOT_EQ,
      label: ibiz.i18n.t("control.searchBar.conditions.not_eq")
    }, {
      valueOP: ValueOP.GT,
      label: ibiz.i18n.t("control.searchBar.conditions.gt")
    }, {
      valueOP: ValueOP.GT_AND_EQ,
      label: ibiz.i18n.t("control.searchBar.conditions.gt_and_eq")
    }, {
      valueOP: ValueOP.LT,
      label: ibiz.i18n.t("control.searchBar.conditions.lt")
    }, {
      valueOP: ValueOP.LT_AND_EQ,
      label: ibiz.i18n.t("control.searchBar.conditions.lt_and_eq")
    }, {
      valueOP: ValueOP.IS_NULL,
      label: ibiz.i18n.t("control.searchBar.conditions.is_null")
    }, {
      valueOP: ValueOP.IS_NOT_NULL,
      label: ibiz.i18n.t("control.searchBar.conditions.is_not_null")
    }, {
      valueOP: ValueOP.IN,
      label: ibiz.i18n.t("control.searchBar.conditions.in")
    }, {
      valueOP: ValueOP.NOT_IN,
      label: ibiz.i18n.t("control.searchBar.conditions.not_in")
    }, {
      valueOP: ValueOP.LIKE,
      label: ibiz.i18n.t("control.searchBar.conditions.like")
    }, {
      valueOP: ValueOP.LEFT_LIKE,
      label: ibiz.i18n.t("control.searchBar.conditions.left_like")
    }, {
      valueOP: ValueOP.RIGHT_LIKE,
      label: ibiz.i18n.t("control.searchBar.conditions.right_like")
    }, {
      valueOP: ValueOP.EXISTS,
      label: ibiz.i18n.t("control.searchBar.conditions.exists")
    }, {
      valueOP: ValueOP.NOT_EXISTS,
      label: ibiz.i18n.t("control.searchBar.conditions.not_exists")
    }];
    const availableModes = computed(() => {
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
    return createVNode(resolveComponent("el-select"), {
      "model-value": this.value,
      "disabled": this.disabled,
      "teleported": false,
      "onChange": (value) => {
        this.onChange(value);
      }
    }, _isSlot(_slot = this.availableModes.map((mode) => {
      return createVNode(resolveComponent("el-option"), {
        "key": mode.valueOP,
        "value": mode.valueOP,
        "label": mode.label
      }, null);
    })) ? _slot : {
      default: () => [_slot]
    });
  }
});

export { FilterModeSelect };
