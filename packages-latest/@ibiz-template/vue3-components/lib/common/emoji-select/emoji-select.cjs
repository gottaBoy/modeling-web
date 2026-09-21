'use strict';

var vue = require('vue');
var vue3Util = require('@ibiz-template/vue3-util');
require('./icons/index.cjs');
require('./components/index.cjs');
require('./emoji-select.css');
var categories = require('./components/categories/categories.cjs');
var inputSearch = require('./components/input-search/input-search.cjs');
var emojiList = require('./components/emoji-list/emoji-list.cjs');
var categories$1 = require('./icons/categories.cjs');
var emoji = require('./icons/emoji.cjs');

"use strict";
const IBizEmojiSelect = /* @__PURE__ */ vue.defineComponent({
  name: "IBizEmojiSelect",
  props: {
    // 自定义表情符号数组，类型为IEmoji[]，必填项，默认值为emojisDefault
    customEmojis: {
      type: Array,
      required: true,
      default: () => emoji.emojisDefault
    },
    // 自定义分类数组，类型为ICategory[]，必填项，默认值为categoriesDefault
    customCategories: {
      type: Array,
      required: true,
      default: () => []
    },
    // 频繁使用表情符号的数量限制
    limitFrequently: {
      type: Number,
      default: 15
    },
    // 每行显示的表情符号数量
    emojisByRow: {
      type: Number,
      default: 8
    },
    // 是否使用连续列表显示表情符号
    continuousList: {
      type: Boolean,
      default: false
    },
    // 表情符号的大小
    emojiSize: {
      type: Number,
      default: 27
    },
    // 表情符号是否带有边框
    emojiWithBorder: {
      type: Boolean,
      default: true
    },
    // 是否显示搜索框
    showSearch: {
      type: Boolean,
      default: true
    },
    // 是否显示分类
    showCategories: {
      type: Boolean,
      default: true
    },
    // 是否使用深色模式
    dark: {
      type: Boolean,
      default: false
    },
    // 初始选择的分类
    initialCategory: {
      type: String,
      default: "peoples"
    },
    // 需要排除的分类数组
    exceptCategories: {
      type: Array,
      default: () => []
    },
    // 需要排除的表情符号数组
    exceptEmojis: {
      type: Array,
      default: () => []
    }
  },
  emits: ["select", "changeCategory", "customEmojis"],
  setup(props, {
    emit
  }) {
    const ns = vue3Util.useNamespace("emoji-select");
    const customEmojis = vue.ref([]);
    const customCategories = vue.ref([]);
    const initialCategory = vue.ref("peoples");
    const exceptCategories = vue.ref([]);
    const exceptEmojis = vue.ref([]);
    const frequentlyEmojis = vue.ref([]);
    const mapCategories = vue.ref({});
    const mapEmojis = vue.ref({});
    const currentCategory = vue.ref("");
    currentCategory.value = initialCategory.value;
    const filterEmoji = vue.ref("");
    const categoriesNames = customCategories.value.map((c) => c.name);
    if (!categoriesNames.includes(initialCategory.value)) {
      initialCategory.value = categoriesNames[0];
    }
    const onSearch = async (term) => {
      filterEmoji.value = term;
    };
    const categoriesFiltered = vue.computed(() => {
      return customCategories.value.filter((category) => !exceptCategories.value.includes(category));
    });
    const mapperCategories = (categories) => {
      categories.forEach((category) => {
        Object.assign(mapCategories.value, {
          [category.name]: category
        });
      });
    };
    const mapperEmojisCategory = (emojis) => {
      Object.assign(mapEmojis.value, {
        frequently: []
      });
      emojis.filter((emoji) => !exceptEmojis.value.includes(emoji)).forEach((emoji) => {
        const _category = emoji.category;
        if (!mapEmojis.value[_category]) {
          Object.assign(mapEmojis.value, {
            [_category]: []
          });
        }
        mapEmojis.value[_category].push(emoji);
      });
    };
    const restoreFrequentlyEmojis = async () => {
      const mapIndexEmojis = frequentlyEmojis.value || [];
      Object.assign(mapEmojis.value, {
        frequently: mapIndexEmojis.map((index) => customEmojis.value[index])
      });
    };
    const saveFrequentlyEmojis = (emojis) => {
      const mapIndexEmojis = emojis.map((emoji) => {
        return customEmojis.value.indexOf(emoji);
      });
      frequentlyEmojis.value = mapIndexEmojis;
    };
    const updateFrequently = async (emoji) => {
      const oldEmojis = mapEmojis.value.frequently;
      const emojis = [.../* @__PURE__ */ new Set([emoji, ...oldEmojis])];
      mapEmojis.value.frequently = emojis.slice(0, props.limitFrequently);
      saveFrequentlyEmojis(emojis);
    };
    const changeCategory = async (category) => {
      const hasEmojis = mapEmojis.value[category.name].length;
      currentCategory.value = category.name;
      if (hasEmojis) {
        emit("changeCategory", category);
      }
    };
    const onSelectEmoji = async (emoji) => {
      await updateFrequently(emoji);
      emit("select", emoji);
    };
    vue.watch(() => props.customEmojis, (newEmojis) => {
      customEmojis.value = props.customEmojis;
      if (newEmojis && newEmojis.length) {
        mapEmojis.value = {};
        mapperEmojisCategory(newEmojis);
      }
    }, {
      immediate: true,
      deep: true
    });
    vue.watch(() => props.customCategories, (newCategories) => {
      if (newCategories && newCategories.length > 0) {
        customCategories.value = newCategories;
      } else {
        customCategories.value = categories$1.categoriesDefault();
      }
      mapperCategories(customCategories.value);
    }, {
      immediate: true,
      deep: true
    });
    vue.watch(() => props.initialCategory, () => {
      initialCategory.value = props.initialCategory;
    });
    vue.watch(() => props.exceptCategories, () => {
      exceptCategories.value = props.exceptCategories;
    });
    vue.watch(() => props.exceptEmojis, () => {
      exceptEmojis.value = props.exceptEmojis;
    });
    vue.onMounted(() => {
      mapperEmojisCategory(customEmojis.value);
      restoreFrequentlyEmojis();
    });
    vue.onUnmounted(() => {
      mapEmojis.value = {};
      frequentlyEmojis.value = [];
    });
    return {
      ns,
      mapEmojis,
      filterEmoji,
      mapCategories,
      currentCategory,
      categoriesFiltered,
      onSearch,
      onSelectEmoji,
      changeCategory
    };
  },
  render() {
    return vue.createVNode("div", {
      "class": [this.ns.b(), this.ns.is("dark", this.dark)]
    }, [this.showCategories && vue.createVNode(categories.Categories, {
      "categories": this.categoriesFiltered,
      "current": this.currentCategory,
      "onSelect": this.changeCategory
    }, null), this.showSearch && vue.createVNode(inputSearch.InputSearch, {
      "onUpdate": this.onSearch
    }, null), vue.createVNode(emojiList.EmojiList, {
      "data": this.mapEmojis,
      "category": this.currentCategory,
      "filter": this.filterEmoji,
      "categories": this.mapCategories,
      "emojiWithBorder": this.emojiWithBorder,
      "emojiSize": this.emojiSize,
      "emojisByRow": this.emojisByRow,
      "continuousList": this.continuousList,
      "hasSearch": this.showSearch,
      "onSelect": this.onSelectEmoji
    }, null)]);
  }
});

exports.IBizEmojiSelect = IBizEmojiSelect;
