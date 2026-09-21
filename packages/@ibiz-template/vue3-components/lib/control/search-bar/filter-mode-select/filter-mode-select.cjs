'use strict';

var vue = require('vue');
var runtime = require('@ibiz-template/runtime');

"use strict";
function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !vue.isVNode(s);
}
const FilterModes = [{
  valueOP: runtime.ValueOP.EQ,
  label: "\u7B49\u4E8E(=)"
}, {
  valueOP: runtime.ValueOP.NOT_EQ,
  label: "\u4E0D\u7B49\u4E8E(<>)"
}, {
  valueOP: runtime.ValueOP.GT,
  label: "\u5927\u4E8E(>)"
}, {
  valueOP: runtime.ValueOP.GT_AND_EQ,
  label: "\u5927\u4E8E\u7B49\u4E8E(>=)"
}, {
  valueOP: runtime.ValueOP.LT,
  label: "\u5C0F\u4E8E(<)"
}, {
  valueOP: runtime.ValueOP.LT_AND_EQ,
  label: "\u5C0F\u4E8E\u7B49\u4E8E(<=)"
}, {
  valueOP: runtime.ValueOP.IS_NULL,
  label: "\u503C\u4E3A\u7A7A(Nil)"
}, {
  valueOP: runtime.ValueOP.IS_NOT_NULL,
  label: "\u503C\u4E0D\u4E3A\u7A7A(NotNil)"
}, {
  valueOP: runtime.ValueOP.IN,
  label: "\u503C\u5728\u8303\u56F4\u4E2D(In)"
}, {
  valueOP: runtime.ValueOP.NOT_IN,
  label: "\u503C\u4E0D\u5728\u8303\u56F4\u4E2D(NotIn)"
}, {
  valueOP: runtime.ValueOP.LIKE,
  label: "\u6587\u672C\u5305\u542B(%)"
}, {
  valueOP: runtime.ValueOP.LIFT_LIKE,
  label: "\u6587\u672C\u5DE6\u5305\u542B(%#)"
}, {
  valueOP: runtime.ValueOP.RIGHT_LIKE,
  label: "\u6587\u672C\u53F3\u5305\u542B(#%)"
}, {
  valueOP: runtime.ValueOP.EXISTS,
  label: "\u5B58\u5728(EXISTS)"
}, {
  valueOP: runtime.ValueOP.NOT_EXISTS,
  label: "\u4E0D\u5B58\u5728(NOTEXISTS)"
}];
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
