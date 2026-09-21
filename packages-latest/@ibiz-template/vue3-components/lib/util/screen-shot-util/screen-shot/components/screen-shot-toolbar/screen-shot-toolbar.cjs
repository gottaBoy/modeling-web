'use strict';

var vue = require('vue');
var ElementPlus = require('element-plus');
var vue3Util = require('@ibiz-template/vue3-util');
var index = require('../../type/index.cjs');
var index$1 = require('../../constant/index.cjs');
require('./screen-shot-toolbar.css');

"use strict";
const ScreenShotToolbar = /* @__PURE__ */ vue.defineComponent({
  name: "IBizScreenShotToolbar",
  props: {
    history: {
      type: Array,
      required: true
    }
  },
  emits: {
    itemClick: (_type, _opt) => true
  },
  setup(_props, {
    emit
  }) {
    const ns = vue3Util.useNamespace("screen-shot-toolbar");
    const items = vue.reactive(index$1.getDefaultToolbarItems());
    const activeItem = vue.ref(null);
    const onChange = () => {
      const {
        type,
        color,
        size
      } = activeItem.value || {};
      if (!type)
        return;
      emit("itemClick", type, {
        size,
        color
      });
    };
    const handleSizeClick = (size) => {
      if (activeItem.value)
        activeItem.value.size = size;
      onChange();
    };
    const handleColorChange = (color) => {
      if (activeItem.value)
        activeItem.value.color = color;
      onChange();
    };
    const handleItemClick = (item) => {
      activeItem.value = item;
      onChange();
    };
    const stopPropagation = (e) => {
      e.stopPropagation();
      e.preventDefault();
    };
    return {
      ns,
      items,
      activeItem,
      stopPropagation,
      handleItemClick,
      handleSizeClick,
      handleColorChange
    };
  },
  render() {
    var _a, _b;
    return vue.createVNode("div", {
      "class": this.ns.b(),
      "onClick": this.stopPropagation
    }, [vue.createVNode("div", {
      "class": this.ns.e("content"),
      "onMouseup": this.stopPropagation
    }, [this.items.map((item) => {
      var _a2;
      return vue.createVNode("div", {
        "class": [this.ns.e("item"), this.ns.em("item", item.type), this.ns.is("active", item.type !== index.ToolbarItemType.DRAWDOWN && item.type === ((_a2 = this.activeItem) == null ? void 0 : _a2.type)), this.ns.is("disabled", item.type === index.ToolbarItemType.DRAWDOWN && this.history.length <= 1)],
        "onClick": () => this.handleItemClick(item)
      }, [vue.createVNode("div", {
        "class": this.ns.em("item", "icon"),
        "title": item.text
      }, [item.icon])]);
    })]), ((_a = this.activeItem) == null ? void 0 : _a.size) || ((_b = this.activeItem) == null ? void 0 : _b.color) ? vue.createVNode("div", {
      "class": this.ns.e("item-options")
    }, [vue.createVNode("div", {
      "class": this.ns.em("item-options", "content")
    }, [this.activeItem.sizeOpts ? vue.createVNode("div", {
      "class": this.ns.e("size")
    }, [this.activeItem.sizeOpts.map((item) => vue.createVNode("div", {
      "class": [this.ns.em("size", "item"), this.ns.em("size", item.type), this.ns.is("active", item.value === this.activeItem.size)],
      "title": item.text,
      "onClick": () => this.handleSizeClick(item.value)
    }, null))]) : null, this.activeItem.color ? vue.createVNode("div", {
      "class": this.ns.e("color-picker")
    }, [vue.createVNode(ElementPlus.ElColorPicker, {
      "teleported": false,
      "modelValue": this.activeItem.color,
      "onUpdate:modelValue": ($event) => this.activeItem.color = $event,
      "onChange": this.handleColorChange
    }, null)]) : null])]) : null]);
  }
});

exports.ScreenShotToolbar = ScreenShotToolbar;
