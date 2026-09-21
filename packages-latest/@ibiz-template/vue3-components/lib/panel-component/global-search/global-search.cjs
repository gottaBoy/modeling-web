'use strict';

var vue = require('vue');
var core = require('@ibiz-template/core');
var vue3Util = require('@ibiz-template/vue3-util');
var virtualList = require('./virtual-list/virtual-list.cjs');
require('./global-search.css');

"use strict";
function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !vue.isVNode(s);
}
const GlobalSearch = /* @__PURE__ */ vue.defineComponent({
  name: "IBizGlobalSearch",
  props: {
    /**
     * @description 全局搜索控件模型数据
     */
    modelData: {
      type: Object,
      required: true
    },
    /**
     * @description 全局搜索控件控制器
     */
    controller: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const c = props.controller;
    const ns = vue3Util.useNamespace("global-search");
    const {
      semanticClass,
      semanticStyle
    } = vue3Util.useSemanticNode(props.controller);
    const editorRef = vue.ref();
    let ignoreFocusEvent = false;
    const activated = vue.ref(false);
    const virtualListRef = vue.ref();
    const searchValue = vue.ref("");
    const visible = vue.computed(() => {
      const {
        query,
        list,
        histories,
        loading
      } = c.state;
      const showSearch = query && list.length > 0;
      const showHistory = !query && histories.length > 0;
      const showEmpty = histories.includes(query) && list.length === 0;
      return (showSearch || showEmpty || showHistory || loading) && activated.value;
    });
    const curPlaceholder = vue.computed(() => {
      const {
        placeholder
      } = c.rawItemParams;
      if (placeholder) {
        return ibiz.appUtil.resolveI18nText(placeholder);
      }
      return ibiz.i18n.t("panelComponent.globalSearch.placeholder");
    });
    const handleEnter = (event) => {
      if (event.key === "Enter") {
        activated.value = true;
        c.search(searchValue.value);
      }
    };
    const handleFocus = (_evt) => {
      if (!ignoreFocusEvent) {
        activated.value = true;
      } else {
        ignoreFocusEvent = false;
      }
    };
    const handleClearSearch = () => {
      c.state.list = [];
      c.state.query = "";
    };
    const handleHistoryItemClick = (value) => {
      searchValue.value = value;
      c.search(searchValue.value);
    };
    const handleSearchItemClick = (data, item) => {
      ignoreFocusEvent = true;
      activated.value = false;
      if (item)
        c.openLinkView(data, item);
    };
    const handleClickOutside = (event) => {
      const target = event.target;
      if (!target.closest(".".concat(ns.b())) && !target.closest(".".concat(ns.e("popper"))) && !target.closest(".el-input__suffix")) {
        activated.value = false;
      }
    };
    const handleClearHistory = () => {
      handleClearSearch();
      c.clearHistory();
    };
    const handleKeyup = (event) => {
      var _a;
      if ((event.ctrlKey || event.metaKey) && event.key === "k") {
        event.preventDefault();
        (_a = editorRef.value) == null ? void 0 : _a.focus();
      }
    };
    vue.watch(() => visible.value, () => {
      if (visible.value) {
        setTimeout(() => {
          var _a;
          (_a = virtualListRef.value) == null ? void 0 : _a.scrollTo(0);
        });
        if (searchValue.value !== c.state.histories[c.state.histories.length - 1])
          handleClearSearch();
      }
    });
    vue.onMounted(() => {
      document.addEventListener("click", handleClickOutside, {
        capture: true
      });
      document.addEventListener("keydown", handleKeyup);
    });
    vue.onUnmounted(() => {
      document.removeEventListener("click", handleClickOutside, {
        capture: true
      });
      document.removeEventListener("keydown", handleKeyup);
    });
    const renderFooter = () => {
      const {
        query,
        list,
        histories,
        loading
      } = c.state;
      const showEmpty = histories.includes(query) && list.length === 0;
      if (loading || showEmpty)
        return vue.createVNode("div", {
          "class": [ns.e("footer"), semanticClass("empty")],
          "style": semanticStyle("empty")
        }, [ibiz.i18n.t("panelComponent.globalSearch.".concat(loading ? "loading" : "empty"))]);
    };
    const renderAction = () => {
      let _slot;
      if (!c.state.query && c.state.histories.length)
        return vue.createVNode("div", {
          "class": [ns.em("content", "action-item"), semanticClass("clear")],
          "style": semanticStyle("clear")
        }, [vue.createVNode(vue.resolveComponent("el-button"), {
          "text": true,
          "onClick": handleClearHistory
        }, _isSlot(_slot = ibiz.i18n.t("panelComponent.globalSearch.clearHistory")) ? _slot : {
          default: () => [_slot]
        })]);
    };
    const renderHistoryList = () => {
      return vue.createVNode("div", {
        "class": ns.e("list")
      }, [c.state.histories.map((history) => {
        return vue.createVNode("div", {
          "onClick": () => handleHistoryItemClick(history),
          "class": [ns.em("list", "item"), ns.em("list", "history-item"), semanticClass("item", {
            item: history
          })],
          "style": semanticStyle("item", {
            item: history
          })
        }, [history]);
      })]);
    };
    const renderSearchList = () => {
      if (!c.state.list.length)
        return;
      return vue.createVNode(virtualList.VirtualList, {
        "ref": virtualListRef,
        "items": c.state.list,
        "class": ns.e("virtual-list"),
        "getKey": (item) => item[c.keyName]
      }, {
        default: ({
          item
        }) => {
          const searchItem = c.getSearchItemByEntity(item.srfdecodename);
          let content = item[c.textName];
          if (searchItem == null ? void 0 : searchItem.acItemProvider) {
            content = vue.h(vue.resolveComponent(searchItem.acItemProvider.component), {
              item,
              controller: c
            });
          } else if (searchItem == null ? void 0 : searchItem.deACMode.itemLayoutPanel) {
            content = vue.createVNode(vue.resolveComponent("iBizControlShell"), {
              "data": item,
              "modelData": searchItem.deACMode.itemLayoutPanel,
              "context": c.panel.context,
              "params": c.panel.params
            }, null);
          }
          return vue.createVNode("div", {
            "class": [ns.em("list", "item"), ns.em("list", "srearch-item"), semanticClass("item", {
              item
            })],
            "style": semanticStyle("item", {
              item
            }),
            "onClick": () => handleSearchItemClick(item, searchItem),
            "title": core.showTitle(item[c.textName])
          }, [content]);
        }
      });
    };
    return {
      c,
      ns,
      visible,
      editorRef,
      searchValue,
      curPlaceholder,
      handleFocus,
      handleEnter,
      renderAction,
      renderFooter,
      renderSearchList,
      renderHistoryList,
      handleClearSearch,
      semanticClass,
      semanticStyle
    };
  },
  render() {
    return vue.createVNode("div", {
      "class": [this.ns.b(), this.semanticClass("root")],
      "style": this.semanticStyle("root")
    }, [vue.createVNode(vue.resolveComponent("el-popover"), {
      "width": "auto",
      "visible": this.visible,
      "placement": "bottom-start",
      "popper-class": [this.ns.e("popper"), this.semanticClass("popup")],
      "popper-style": this.semanticStyle("popup")
    }, {
      reference: () => {
        return vue.createVNode(vue.resolveComponent("el-input"), {
          "clearable": true,
          "ref": "editorRef",
          "modelValue": this.searchValue,
          "onUpdate:modelValue": ($event) => this.searchValue = $event,
          "placeholder": this.curPlaceholder,
          "class": [this.ns.e("search"), this.ns.is("search", this.visible), this.semanticClass("content")],
          "style": this.semanticStyle("content"),
          "onFocus": this.handleFocus,
          "onKeyup": this.handleEnter,
          "onClear": this.handleClearSearch
        }, {
          prefix: () => {
            return vue.createVNode("ion-icon", {
              "name": "search",
              "class": [this.ns.em("search", "icon"), this.semanticClass("prefix")],
              "style": this.semanticStyle("prefix")
            }, null);
          },
          suffix: () => {
            if (this.searchValue)
              return vue.createVNode("ion-icon", {
                "title": ibiz.i18n.t("panelComponent.globalSearch.search"),
                "name": "return-down-back-outline",
                "class": [this.ns.em("search", "icon"), this.ns.em("search", "enter-icon"), this.semanticClass("suffix")],
                "style": this.semanticStyle("suffix"),
                "onClick": () => this.c.search(this.searchValue)
              }, null);
          }
        });
      },
      default: () => {
        return vue.createVNode("div", {
          "class": this.ns.e("content")
        }, [this.c.state.query ? this.renderSearchList() : this.renderHistoryList(), this.renderAction(), this.renderFooter()]);
      }
    })]);
  }
});

exports.GlobalSearch = GlobalSearch;
