import { defineComponent, ref, createVNode, resolveComponent, watch } from 'vue';
import { useNamespace } from '@ibiz-template/vue3-util';
import './ibiz-color-mpicker-custom.css';

"use strict";
const IBizColorMPickerCustom = /* @__PURE__ */ defineComponent({
  name: "IBizColorMPickerCustom",
  props: {
    value: {
      type: Array
    },
    readonly: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    defaultVal: {
      type: Array,
      default: () => []
    }
  },
  emits: ["change"],
  setup(props, {
    emit
  }) {
    const ns = useNamespace("color-mpicker-custom");
    const tabs = [{
      text: ibiz.i18n.t("editor.colorPicker.selector"),
      value: "select"
    }, {
      text: ibiz.i18n.t("editor.colorPicker.textValue"),
      value: "write"
    }];
    const predefineColors = ref(["#000000", "#2C2C2C", "#50555C", "#ACB3BF", "#D0D3D9", "#C4C4C4", "#DADADA", "#E5E5E5", "#F0F0F0", "#F24E1E", "#E99C58", "#FFC700", "#FF4D00", "#FF00D6", "#D82E57", "#8E1DE8", "#0ACF83", "#18A0FB", "#A259FF", "#907CFF"]);
    const items = ref([]);
    const curSelect = ref("select");
    const colorStr = ref("");
    const onColorChange = (index, value) => {
      items.value[index] = value;
      emit("change", [...items.value]);
    };
    const onSelect = (value) => {
      curSelect.value = value;
      if (value === "select") {
        const list = colorStr.value.split(",");
        items.value = list.filter((item) => {
          return /^#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})$/.test(item);
        });
      } else {
        colorStr.value = items.value.toString();
      }
    };
    const onAdd = () => {
      if (props.readonly || props.disabled) {
        return;
      }
      items.value.push("#FFFFFF");
      emit("change", [...items.value]);
    };
    const onRemove = (index) => {
      items.value.splice(index, 1);
      if (items.value.length) {
        emit("change", [...items.value]);
      } else {
        emit("change", null);
      }
    };
    const onBlur = () => {
      if (curSelect.value === "select") {
        emit("change", items.value);
      } else {
        const list = colorStr.value.split(",");
        items.value = list.filter((item) => {
          return /^#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})$/.test(item);
        });
        emit("change", items.value);
      }
    };
    const renderColorList = () => {
      return items.value.map((item, index) => {
        return createVNode("div", {
          "class": ns.em("color-list", "item")
        }, [createVNode(resolveComponent("el-color-picker"), {
          "modelValue": item,
          "onUpdate:modelValue": ($event) => item = $event,
          "disabled": props.disabled || props.readonly,
          "predefine": predefineColors.value,
          "onChange": (value) => onColorChange(index, value)
        }, null), createVNode("ion-icon", {
          "name": "close-circle-outline",
          "onClick": () => onRemove(index)
        }, null)]);
      });
    };
    watch(() => props.value, () => {
      if (!props.value || props.value.length === 0) {
        colorStr.value = "";
        items.value = props.defaultVal || [];
      } else {
        items.value = props.value;
        colorStr.value = items.value.toString();
      }
    }, {
      immediate: true,
      deep: true
    });
    return {
      ns,
      tabs,
      curSelect,
      colorStr,
      renderColorList,
      onSelect,
      onAdd,
      onBlur
    };
  },
  render() {
    return createVNode("div", {
      "class": this.ns.b()
    }, [createVNode("div", {
      "class": [this.ns.e("tabs")]
    }, [createVNode("div", {
      "class": [this.ns.e("anchor"), this.ns.is("select-text", this.curSelect === "write")]
    }, [this.tabs.map((tab) => {
      return createVNode("div", {
        "class": [this.ns.em("tabs", "tab"), this.ns.is("selected", tab.value === this.curSelect)],
        "onClick": () => this.onSelect(tab.value)
      }, [tab.text]);
    })])]), createVNode("div", {
      "class": this.ns.e("content")
    }, [this.curSelect === "select" ? createVNode("div", {
      "class": this.ns.e("color-list")
    }, [this.renderColorList(), createVNode("div", {
      "class": [this.ns.em("color-list", "add"), this.ns.is("disabled", this.disabled || this.readonly)],
      "onClick": this.onAdd,
      "title": ibiz.i18n.t("editor.colorPicker.add")
    }, [createVNode("ion-icon", {
      "name": "add-outline"
    }, null)])]) : createVNode(resolveComponent("el-input"), {
      "type": "textarea",
      "modelValue": this.colorStr,
      "onUpdate:modelValue": ($event) => this.colorStr = $event,
      "disabled": this.disabled,
      "readonly": this.readonly,
      "onBlur": this.onBlur
    }, null)])]);
  }
});

export { IBizColorMPickerCustom };
