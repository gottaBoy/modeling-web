'use strict';

var vue = require('vue');
var vue3Util = require('@ibiz-template/vue3-util');
require('../../icons/index.cjs');
require('./input-search.css');
var search = require('../../icons/search.cjs');

"use strict";
const InputSearch = /* @__PURE__ */ vue.defineComponent({
  name: "IBizInputSearch",
  emits: ["update"],
  setup(props, {
    emit
  }) {
    const ns = vue3Util.useNamespace("emoji-input-search");
    const inputSearch = vue.ref("");
    const onSearch = () => {
      emit("update", inputSearch.value);
    };
    const handleKeyUp = (e) => {
      if (e && e.code === "Enter") {
        onSearch();
      }
    };
    return {
      ns,
      inputSearch,
      onSearch,
      handleKeyUp
    };
  },
  render() {
    return vue.createVNode("div", {
      "class": [this.ns.b()]
    }, [vue.createVNode("div", {
      "class": this.ns.e("container"),
      "onKeyup": this.handleKeyUp
    }, [vue.createVNode("div", {
      "class": this.ns.em("container", "search"),
      "onClick": this.onSearch
    }, [search.SearchSvg()]), vue.withDirectives(vue.createVNode("input", {
      "class": this.ns.em("container", "input"),
      "type": "text",
      "onUpdate:modelValue": ($event) => this.inputSearch = $event,
      "placeholder": ibiz.i18n.t("app.search")
    }, null), [[vue.vModelText, this.inputSearch]])])]);
  }
});

exports.InputSearch = InputSearch;
