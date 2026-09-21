'use strict';

var vue = require('vue');
var vue3Util = require('@ibiz-template/vue3-util');
require('./sort-bar.css');

"use strict";
const IBizSortBar = /* @__PURE__ */ vue.defineComponent({
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
    const ns = vue3Util.useNamespace("sort-bar");
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
    return vue.createVNode("div", {
      "class": this.ns.b()
    }, [this.sortItems.length > 0 && this.sortItems.map((item) => {
      return vue.createVNode("div", {
        "onClick": () => this.onItemClick(item),
        "class": [this.ns.b("item"), item.order === "asc" ? this.ns.bm("item", "asc") : "", item.order === "desc" ? this.ns.bm("item", "desc") : ""]
      }, [item.caption, vue.createVNode("div", {
        "class": this.ns.b("icon-wrapper")
      }, [vue.createVNode("i", {
        "class": this.ns.be("icon-wrapper", "icon-asc")
      }, null), vue.createVNode("i", {
        "class": this.ns.be("icon-wrapper", "icon-desc")
      }, null)])]);
    })]);
  }
});

exports.IBizSortBar = IBizSortBar;
