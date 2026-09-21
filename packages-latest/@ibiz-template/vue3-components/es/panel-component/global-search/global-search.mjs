import { isVNode, defineComponent, createVNode, resolveComponent, ref, computed, watch, onMounted, onUnmounted, h } from 'vue';
import { showTitle } from '@ibiz-template/core';
import { useNamespace, useSemanticNode } from '@ibiz-template/vue3-util';
import { VirtualList } from './virtual-list/virtual-list.mjs';
import './global-search.css';

"use strict";
function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !isVNode(s);
}
const GlobalSearch = /* @__PURE__ */ defineComponent({
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
    const ns = useNamespace("global-search");
    const {
      semanticClass,
      semanticStyle
    } = useSemanticNode(props.controller);
    const editorRef = ref();
    let ignoreFocusEvent = false;
    const activated = ref(false);
    const virtualListRef = ref();
    const searchValue = ref("");
    const visible = computed(() => {
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
    const curPlaceholder = computed(() => {
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
    watch(() => visible.value, () => {
      if (visible.value) {
        setTimeout(() => {
          var _a;
          (_a = virtualListRef.value) == null ? void 0 : _a.scrollTo(0);
        });
        if (searchValue.value !== c.state.histories[c.state.histories.length - 1])
          handleClearSearch();
      }
    });
    onMounted(() => {
      document.addEventListener("click", handleClickOutside, {
        capture: true
      });
      document.addEventListener("keydown", handleKeyup);
    });
    onUnmounted(() => {
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
        return createVNode("div", {
          "class": [ns.e("footer"), semanticClass("empty")],
          "style": semanticStyle("empty")
        }, [ibiz.i18n.t("panelComponent.globalSearch.".concat(loading ? "loading" : "empty"))]);
    };
    const renderAction = () => {
      let _slot;
      if (!c.state.query && c.state.histories.length)
        return createVNode("div", {
          "class": [ns.em("content", "action-item"), semanticClass("clear")],
          "style": semanticStyle("clear")
        }, [createVNode(resolveComponent("el-button"), {
          "text": true,
          "onClick": handleClearHistory
        }, _isSlot(_slot = ibiz.i18n.t("panelComponent.globalSearch.clearHistory")) ? _slot : {
          default: () => [_slot]
        })]);
    };
    const renderHistoryList = () => {
      return createVNode("div", {
        "class": ns.e("list")
      }, [c.state.histories.map((history) => {
        return createVNode("div", {
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
      return createVNode(VirtualList, {
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
            content = h(resolveComponent(searchItem.acItemProvider.component), {
              item,
              controller: c
            });
          } else if (searchItem == null ? void 0 : searchItem.deACMode.itemLayoutPanel) {
            content = createVNode(resolveComponent("iBizControlShell"), {
              "data": item,
              "modelData": searchItem.deACMode.itemLayoutPanel,
              "context": c.panel.context,
              "params": c.panel.params
            }, null);
          }
          return createVNode("div", {
            "class": [ns.em("list", "item"), ns.em("list", "srearch-item"), semanticClass("item", {
              item
            })],
            "style": semanticStyle("item", {
              item
            }),
            "onClick": () => handleSearchItemClick(item, searchItem),
            "title": showTitle(item[c.textName])
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
    return createVNode("div", {
      "class": [this.ns.b(), this.semanticClass("root")],
      "style": this.semanticStyle("root")
    }, [createVNode(resolveComponent("el-popover"), {
      "width": "auto",
      "visible": this.visible,
      "placement": "bottom-start",
      "popper-class": [this.ns.e("popper"), this.semanticClass("popup")],
      "popper-style": this.semanticStyle("popup")
    }, {
      reference: () => {
        return createVNode(resolveComponent("el-input"), {
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
            return createVNode("ion-icon", {
              "name": "search",
              "class": [this.ns.em("search", "icon"), this.semanticClass("prefix")],
              "style": this.semanticStyle("prefix")
            }, null);
          },
          suffix: () => {
            if (this.searchValue)
              return createVNode("ion-icon", {
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
        return createVNode("div", {
          "class": this.ns.e("content")
        }, [this.c.state.query ? this.renderSearchList() : this.renderHistoryList(), this.renderAction(), this.renderFooter()]);
      }
    })]);
  }
});

export { GlobalSearch };
