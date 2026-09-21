import { defineComponent, ref, computed, watch, createVNode } from 'vue';
import { useNamespace } from '@ibiz-template/vue3-util';
import '../category-label/index.mjs';
import '../emoji-item/index.mjs';
import './emoji-list.css';
import { EmojiItem } from '../emoji-item/emoji-item.mjs';
import { CategoryLabel } from '../category-label/category-label.mjs';

"use strict";
const searchByAlias = (term, emoji) => {
  const isRelevant = (alias) => alias.toLowerCase().includes(term);
  return emoji.aliases.some((alias) => isRelevant(alias));
};
const EmojiList = /* @__PURE__ */ defineComponent({
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
    const ns = useNamespace("emoji-list");
    const emojisRef = ref({});
    const categoryRefs = ref({});
    const dataFiltered = computed(() => {
      let data = props.data[props.category];
      const searchValue = props.filter.trim().toLowerCase();
      if (searchValue) {
        data = data.filter((emoji) => searchByAlias(searchValue, emoji));
      }
      return data;
    });
    const categories = computed(() => {
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
    const gridDynamic = computed(() => {
      const percent = 100 / props.emojisByRow;
      return {
        gridTemplateColumns: "repeat(".concat(props.emojisByRow, ", ").concat(percent, "%)")
      };
    });
    const dataFilteredByCategory = computed(() => {
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
    watch(() => props.data, () => {
      emojisRef.value.$el.scrollTop = 0;
    });
    watch(() => props.category, (newValue) => {
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
      return emojis && emojis.length > 0 ? createVNode("div", {
        "class": [ns.m("grid-emojis")],
        "style": style
      }, [emojis.map((emoji) => {
        return createVNode(EmojiItem, {
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
    return createVNode("div", {
      "class": [this.ns.b()]
    }, [createVNode("div", {
      "ref": "emojisRef",
      "class": [this.ns.e("container")]
    }, [this.continuousList ? Object.keys(this.dataFilteredByCategory).map((categoryName) => {
      const category = this.dataFilteredByCategory[categoryName];
      const categoriesItem = this.categories[categoryName];
      const labelName = categoriesItem ? categoriesItem.text : categoryName;
      return createVNode("div", null, [category.length ? createVNode(CategoryLabel, {
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

export { EmojiList };
