import { defineComponent, createVNode } from 'vue';
import { useNamespace } from '@ibiz-template/vue3-util';
import './sort-bar.css';

"use strict";
const IBizSortBar = /* @__PURE__ */ defineComponent({
  name: "IBizSortBar",
  props: {
    sortItems: {
      type: Array,
      required: true
    }
  },
  emits: {
    SortChange: (_item, _order) => true
  },
  setup(props, {
    emit
  }) {
    const ns = useNamespace("sort-bar");
    const onItemClick = (item) => {
      if (item.order === "asc") {
        item.order = "desc";
      } else if (item.order === "desc") {
        item.order = void 0;
      } else {
        props.sortItems.forEach((x) => {
          x.order = void 0;
        });
        item.order = "asc";
      }
      emit("SortChange", item, item.order);
    };
    return {
      ns,
      onItemClick
    };
  },
  render() {
    return createVNode("div", {
      "class": this.ns.b()
    }, [this.sortItems.length > 0 && this.sortItems.map((item) => {
      return createVNode("div", {
        "onClick": () => this.onItemClick(item),
        "class": [this.ns.b("item"), item.order === "asc" ? this.ns.bm("item", "asc") : "", item.order === "desc" ? this.ns.bm("item", "desc") : ""]
      }, [item.caption, createVNode("div", {
        "class": this.ns.b("icon-wrapper")
      }, [createVNode("i", {
        "class": this.ns.be("icon-wrapper", "icon-asc")
      }, null), createVNode("i", {
        "class": this.ns.be("icon-wrapper", "icon-desc")
      }, null)])]);
    })]);
  }
});

export { IBizSortBar };
