import { defineComponent, createVNode, withDirectives, vModelText, ref } from 'vue';
import { useNamespace } from '@ibiz-template/vue3-util';
import '../../icons/index.mjs';
import './input-search.css';
import { SearchSvg } from '../../icons/search.mjs';

"use strict";
const InputSearch = /* @__PURE__ */ defineComponent({
  name: "IBizInputSearch",
  emits: ["update"],
  setup(props, {
    emit
  }) {
    const ns = useNamespace("emoji-input-search");
    const inputSearch = ref("");
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
    return createVNode("div", {
      "class": [this.ns.b()]
    }, [createVNode("div", {
      "class": this.ns.e("container"),
      "onKeyup": this.handleKeyUp
    }, [createVNode("div", {
      "class": this.ns.em("container", "search"),
      "onClick": this.onSearch
    }, [SearchSvg()]), withDirectives(createVNode("input", {
      "class": this.ns.em("container", "input"),
      "type": "text",
      "onUpdate:modelValue": ($event) => this.inputSearch = $event,
      "placeholder": ibiz.i18n.t("app.search")
    }, null), [[vModelText, this.inputSearch]])])]);
  }
});

export { InputSearch };
