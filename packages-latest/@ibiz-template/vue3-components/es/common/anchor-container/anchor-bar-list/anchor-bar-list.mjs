import { defineComponent, createVNode, ref, watch } from 'vue';
import { useNamespace } from '@ibiz-template/vue3-util';
import './anchor-bar-list.css';

"use strict";
const IBizAnchorBarList = /* @__PURE__ */ defineComponent({
  name: "IBizAnchorBarList",
  props: {
    anchorList: {
      type: Array,
      default: []
    },
    navBarStyle: {
      type: String
    },
    navBarPos: {
      type: String
    },
    selected: {
      type: String,
      default: ""
    },
    semantic: {
      type: Object,
      default: () => ({
        item: {
          class: "",
          style: ""
        }
      })
    }
  },
  emits: ["select"],
  setup(props, {
    emit
  }) {
    const ns = useNamespace("anchor-bar-list");
    const select = ref("");
    const onSelect = (key) => {
      emit("select", key);
    };
    const renderAnchorDefaultStyle = () => {
      var _a, _b;
      if (!select.value) {
        select.value = (_b = (_a = props.anchorList) == null ? void 0 : _a[0]) == null ? void 0 : _b.id;
      }
      return props.anchorList.map((item) => {
        return createVNode("div", {
          "class": [ns.e("item"), ns.is("selected", select.value === item.id), props.semantic.item.class],
          "style": props.semantic.item.style,
          "title": item.title,
          "onClick": () => onSelect(item.id)
        }, [createVNode("div", {
          "class": ns.em("item", "title")
        }, [item.title])]);
      });
    };
    watch(() => props.selected, (newVal) => {
      select.value = newVal;
    }, {
      immediate: true
    });
    return {
      ns,
      renderAnchorDefaultStyle
    };
  },
  render() {
    let content = null;
    if (this.navBarStyle === "DEFAULT" || !this.navBarStyle) {
      content = this.renderAnchorDefaultStyle();
    }
    return createVNode("div", {
      "class": [this.ns.b(), this.ns.is("usermode", this.navBarPos === "USER" || this.navBarPos === "USER2")]
    }, [content]);
  }
});

export { IBizAnchorBarList };
