'use strict';

var vue = require('vue');
var vue3Util = require('@ibiz-template/vue3-util');
require('../category-label/index.cjs');
require('../emoji-item/index.cjs');
require('./emoji-list.css');
var emojiItem = require('../emoji-item/emoji-item.cjs');
var categoryLabel = require('../category-label/category-label.cjs');

"use strict";
const searchByAlias = (term, emoji) => {
  const isRelevant = (alias) => alias.toLowerCase().includes(term);
  return emoji.aliases.some((alias) => isRelevant(alias));
};
const EmojiList = /* @__PURE__ */ vue.defineComponent({
  name: "IBizEmojiList",
  props: {
    data: {
      type: Object,
      required: true
    },
    emojisByRow: {
      type: Number,
      required: true
    },
    emojiWithBorder: {
      type: Boolean
    },
    emojiSize: {
      type: Number
    },
    filter: {
      type: String,
      default: ""
    },
    continuousList: {
      type: Boolean
    },
    category: {
      type: String,
      default: ""
    },
    categories: {
      type: Object,
      required: true,
      default: () => {
      }
    },
    hasSearch: {
      type: Boolean
    }
  },
  emits: ["select", "data"],
  setup(props, {
    emit
  }) {
    const ns = vue3Util.useNamespace("emoji-list");
    const emojisRef = vue.ref({});
    const categoryRefs = vue.ref({});
    const dataFiltered = vue.computed(() => {
      let data = props.data[props.category];
      const searchValue = props.filter.trim().toLowerCase();
      if (searchValue) {
        data = data.filter((emoji) => searchByAlias(searchValue, emoji));
      }
      return data;
    });
    const categories = vue.computed(() => {
      return Object.keys(props.data);
    });
    const setCategoryRef = (categoryName, el) => {
      if (el) {
        categoryRefs.value[categoryName] = el;
      }
    };
    const calcScrollTop = () => {
      return props.hasSearch ? 88 : 44;
    };
    const gridDynamic = vue.computed(() => {
      const percent = 100 / props.emojisByRow;
      return {
        gridTemplateColumns: "repeat(".concat(props.emojisByRow, ", ").concat(percent, "%)")
      };
    });
    const dataFilteredByCategory = vue.computed(() => {
      const _data = {};
      Object.assign(_data, props.data);
      const searchValue = props.filter.trim().toLowerCase();
      if (searchValue) {
        categories.value.forEach((category) => {
          _data[category] = props.data[category].filter((item) => searchByAlias(searchValue, item));
        });
      }
      return _data;
    });
    const onSelect = (emoji) => {
      emit("select", emoji);
    };
    vue.watch(() => props.data, () => {
      emojisRef.value.$el.scrollTop = 0;
    });
    vue.watch(() => props.category, (newValue) => {
      if (props.continuousList) {
        const categoryEl = categoryRefs.value[newValue].$el;
        emojisRef.value.scrollTop = categoryEl.offsetTop - calcScrollTop();
      }
    });
    const renderGridEmojis = (params) => {
      const {
        emojis,
        style,
        size,
        withBorder
      } = params;
      return emojis && emojis.length > 0 ? vue.createVNode("div", {
        "class": [ns.m("grid-emojis")],
        "style": style
      }, [emojis.map((emoji) => {
        return vue.createVNode(emojiItem.EmojiItem, {
          "emoji": emoji,
          "size": size,
          "withBorder": withBorder,
          "onClick": () => onSelect(emoji)
        }, null);
      })]) : "";
    };
    return {
      ns,
      emojisRef,
      gridDynamic,
      dataFiltered,
      dataFilteredByCategory,
      onSelect,
      setCategoryRef,
      renderGridEmojis
    };
  },
  render() {
    return vue.createVNode("div", {
      "class": [this.ns.b()]
    }, [vue.createVNode("div", {
      "ref": "emojisRef",
      "class": [this.ns.e("container")]
    }, [this.continuousList ? Object.keys(this.dataFilteredByCategory).map((categoryName) => {
      const category = this.dataFilteredByCategory[categoryName];
      const categoriesItem = this.categories[categoryName];
      const labelName = categoriesItem ? categoriesItem.text : categoryName;
      return vue.createVNode("div", null, [category.length ? vue.createVNode(categoryLabel.CategoryLabel, {
        "name": labelName,
        "ref": (el) => this.setCategoryRef(categoryName, el)
      }, null) : "", this.renderGridEmojis({
        emojis: category,
        style: this.gridDynamic,
        size: this.emojiSize,
        withBorder: this.emojiWithBorder
      })]);
    }) : this.renderGridEmojis({
      emojis: this.dataFiltered || [],
      style: this.gridDynamic,
      size: this.emojiSize,
      withBorder: this.emojiWithBorder
    })])]);
  }
});

exports.EmojiList = EmojiList;
