'use strict';

var vue = require('vue');
var vue3Util = require('@ibiz-template/vue3-util');
require('./ibiz-color-mpicker-custom.css');

"use strict";
const IBizColorMPickerCustom = /* @__PURE__ */ vue.defineComponent({
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
    },
    semanticClass: {
      type: Function
    },
    semanticStyle: {
      type: Function
    }
  },
  emits: ["change"],
  setup(props, {
    emit
  }) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n;
    const ns = vue3Util.useNamespace("color-mpicker-custom");
    const childClass = [{
      class: (_a = props.semanticClass) == null ? void 0 : _a.call(props, "editor.content"),
      selector: ".".concat(ns.e("content"))
    }, {
      class: (_b = props.semanticClass) == null ? void 0 : _b.call(props, "editor.tabs"),
      selector: ".".concat(ns.e("tabs"))
    }, {
      class: (_c = props.semanticClass) == null ? void 0 : _c.call(props, "editor.tabs.tab"),
      selector: ".".concat(ns.em("tabs", "tab"))
    }, {
      class: (_d = props.semanticClass) == null ? void 0 : _d.call(props, "editor.add"),
      selector: ".".concat(ns.em("color-list", "add"))
    }, {
      class: (_e = props.semanticClass) == null ? void 0 : _e.call(props, "editor.textarea"),
      selector: ".".concat(ns.e("textarea"))
    }, {
      class: (_f = props.semanticClass) == null ? void 0 : _f.call(props, "editor.item"),
      selector: ".".concat(ns.em("color-list", "item"))
    }, {
      class: (_g = props.semanticClass) == null ? void 0 : _g.call(props, "editor.item.color"),
      selector: ".el-color-picker__color"
    }];
    const childStyle = [{
      style: (_h = props.semanticStyle) == null ? void 0 : _h.call(props, "editor.content"),
      selector: ".".concat(ns.e("content"))
    }, {
      style: (_i = props.semanticStyle) == null ? void 0 : _i.call(props, "editor.tabs"),
      selector: ".".concat(ns.e("tabs"))
    }, {
      style: (_j = props.semanticStyle) == null ? void 0 : _j.call(props, "editor.tabs.tab"),
      selector: ".".concat(ns.em("tabs", "tab"))
    }, {
      style: (_k = props.semanticStyle) == null ? void 0 : _k.call(props, "editor.add"),
      selector: ".".concat(ns.em("color-list", "add"))
    }, {
      style: (_l = props.semanticStyle) == null ? void 0 : _l.call(props, "editor.textarea"),
      selector: ".".concat(ns.e("textarea"))
    }, {
      style: (_m = props.semanticStyle) == null ? void 0 : _m.call(props, "editor.item"),
      selector: ".".concat(ns.em("color-list", "item"))
    }, {
      style: (_n = props.semanticStyle) == null ? void 0 : _n.call(props, "editor.item.color"),
      selector: ".el-color-picker__color"
    }];
    const tabs = [{
      text: ibiz.i18n.t("editor.colorPicker.selector"),
      value: "select"
    }, {
      text: ibiz.i18n.t("editor.colorPicker.textValue"),
      value: "write"
    }];
    const predefineColors = vue.ref(["#000000", "#2C2C2C", "#50555C", "#ACB3BF", "#D0D3D9", "#C4C4C4", "#DADADA", "#E5E5E5", "#F0F0F0", "#F24E1E", "#E99C58", "#FFC700", "#FF4D00", "#FF00D6", "#D82E57", "#8E1DE8", "#0ACF83", "#18A0FB", "#A259FF", "#907CFF"]);
    const items = vue.ref([]);
    const curSelect = vue.ref("select");
    const colorStr = vue.ref("");
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
        return vue.createVNode("div", {
          "class": ns.em("color-list", "item")
        }, [vue.createVNode(vue.resolveComponent("el-color-picker"), {
          "modelValue": item,
          "onUpdate:modelValue": ($event) => item = $event,
          "disabled": props.disabled || props.readonly,
          "predefine": predefineColors.value,
          "onChange": (value) => onColorChange(index, value)
        }, null), vue.createVNode("ion-icon", {
          "name": "close-circle-outline",
          "onClick": () => onRemove(index)
        }, null)]);
      });
    };
    vue.watch(() => props.value, () => {
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
      colorStr,
      curSelect,
      childClass,
      childStyle,
      onAdd,
      onBlur,
      onSelect,
      renderColorList
    };
  },
  render() {
    var _a, _b;
    return vue.withDirectives(vue.createVNode("div", {
      "style": (_a = this.semanticStyle) == null ? void 0 : _a.call(this, "editor.root"),
      "class": [this.ns.b(), (_b = this.semanticClass) == null ? void 0 : _b.call(this, "editor.root")]
    }, [vue.createVNode("div", {
      "class": this.ns.e("tabs")
    }, [vue.createVNode("div", {
      "class": [this.ns.e("anchor"), this.ns.is("select-text", this.curSelect === "write")]
    }, [this.tabs.map((tab) => {
      return vue.createVNode("div", {
        "class": [this.ns.em("tabs", "tab"), this.ns.is("selected", tab.value === this.curSelect)],
        "onClick": () => this.onSelect(tab.value)
      }, [tab.text]);
    })])]), vue.createVNode("div", {
      "class": this.ns.e("content")
    }, [this.curSelect === "select" ? vue.createVNode("div", {
      "class": this.ns.e("color-list")
    }, [this.renderColorList(), vue.createVNode("div", {
      "class": [this.ns.em("color-list", "add"), this.ns.is("disabled", this.disabled || this.readonly)],
      "onClick": this.onAdd,
      "title": ibiz.i18n.t("editor.colorPicker.add")
    }, [vue.createVNode("ion-icon", {
      "name": "add-outline"
    }, null)])]) : vue.createVNode(vue.resolveComponent("el-input"), {
      "type": "textarea",
      "class": this.ns.e("textarea"),
      "modelValue": this.colorStr,
      "onUpdate:modelValue": ($event) => this.colorStr = $event,
      "disabled": this.disabled,
      "readonly": this.readonly,
      "onBlur": this.onBlur
    }, null)])]), [[vue.resolveDirective("child-class"), this.childClass], [vue.resolveDirective("child-style"), this.childStyle]]);
  }
});

exports.IBizColorMPickerCustom = IBizColorMPickerCustom;
