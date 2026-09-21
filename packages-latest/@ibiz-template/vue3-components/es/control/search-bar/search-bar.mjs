import { defineComponent, createVNode, resolveComponent, ref, onUnmounted, computed } from 'vue';
import { useControlController, useSemanticNode, useLocalCacheKey, useNamespace } from '@ibiz-template/vue3-util';
import './search-bar.css';
import { SearchBarController } from '@ibiz-template/runtime';
import { showTitle } from '@ibiz-template/core';

"use strict";
const SearchBarControl = /* @__PURE__ */ defineComponent({
  name: "IBizSearchBarControl",
  props: {
    /**
     * @description 搜索栏模型数据
     */
    modelData: {
      type: Object,
      required: true
    },
    /**
     * @description 应用上下文对象
     */
    context: {
      type: Object,
      required: true
    },
    /**
     * @description 视图参数对象
     * @default {}
     */
    params: {
      type: Object,
      default: () => ({})
    },
    /**
     * @description 部件适配器
     */
    provider: {
      type: Object
    }
  },
  setup() {
    var _a;
    const c = useControlController((...args) => new SearchBarController(...args));
    const counterData = ref({});
    const {
      semanticClass,
      semanticStyle
    } = useSemanticNode(c);
    const fn = (counter) => {
      counterData.value = counter;
    };
    c.evt.on("onCreated", () => {
      if (c.counter) {
        c.counter.onChange(fn, true);
      }
    });
    onUnmounted(() => {
      var _a2;
      (_a2 = c.counter) == null ? void 0 : _a2.offChange(fn);
    });
    c.setStorageKeyFn(useLocalCacheKey(c.context, "SEARCH_BAR_SELECTED_GROUP", c.view.modal.routeDepth, "@", "".concat(c.view.model.codeName, "@").concat(c.model.codeName)));
    const ns = useNamespace("control-".concat(c.model.controlType.toLowerCase()));
    let isSearch = false;
    const onSearch = () => {
      isSearch = true;
      c.onSearch();
    };
    const onClear = () => {
      if (isSearch === true) {
        isSearch = false;
        c.onSearch();
      }
    };
    const onKeydown = (e) => {
      if (e.code === "Enter") {
        onSearch();
      }
    };
    const cssVars = computed(() => {
      if (c.model.quickSearchWidth) {
        return ns.cssVarBlock({
          "quick-search-width": "".concat(c.model.quickSearchWidth, "px")
        });
      }
      return {};
    });
    const onGroupClick = (item) => {
      c.state.selectedGroupItem = item;
      c.evt.emit("onTabChange", {
        data: [item]
      });
      onSearch();
    };
    if (c.model.enableGroup && c.model.searchBarGroups && ((_a = c.model.searchBarGroups) == null ? void 0 : _a.length) > 0) {
      const defaultGroup = c.model.searchBarGroups.find((x) => x.defaultGroup);
      c.state.selectedGroupItem = defaultGroup || c.model.searchBarGroups[0];
    }
    const filterButtonRef = ref();
    let popover;
    const showFilter = async () => {
      popover = ibiz.overlay.createPopover(() => {
        return createVNode(resolveComponent("iBizFilterTreeControl"), {
          "filterControllers": c.filterControllers,
          "filterNodes": c.state.filterNodes,
          "parent": "search-bar",
          "filterMode": c.state.filterMode,
          "customCond": c.state.customCond,
          "context": c.context,
          "params": c.params,
          "schemaEntityMap": c.schemaEntityMap,
          "onCustomCondChange": (customCond) => {
            c.state.customCond = customCond;
          },
          "onConfirm": (mode, customCond) => {
            c.state.filterMode = mode;
            c.state.customCond = customCond;
            c.onSearch();
            if (popover) {
              popover.dismiss();
            }
          },
          "onCancel": () => {
            c.resetFilter();
            c.state.customCond = "";
          }
        }, null);
      }, void 0, {
        placement: "bottom-end",
        autoClose: true
      });
      popover.present(filterButtonRef.value.$el);
      await popover.onWillDismiss();
      popover = void 0;
    };
    const triggerFilter = () => {
      if (popover) {
        popover.dismiss();
      } else {
        showFilter();
      }
    };
    const handleSave = () => {
      c.handleSave();
    };
    const renderAdvancedSearch = () => {
      if (!c.state.advancedQuickSearch) {
        return null;
      }
      return createVNode(resolveComponent("iBizQuickSearchSelect"), {
        "controller": c,
        "class": semanticClass("search.cond"),
        "style": semanticStyle("search.cond")
      }, null);
    };
    return {
      c,
      ns,
      cssVars,
      filterButtonRef,
      counterData,
      onClear,
      onSearch,
      onKeydown,
      onGroupClick,
      triggerFilter,
      handleSave,
      renderAdvancedSearch,
      semanticClass,
      semanticStyle
    };
  },
  render() {
    return createVNode(resolveComponent("iBizControlBase"), {
      "controller": this.c,
      "class": [this.ns.b(), this.semanticClass("root")],
      "style": [this.cssVars, this.semanticStyle("root")]
    }, {
      default: () => {
        var _a;
        return [this.c.model.enableGroup && (this.c.isBackendSearchGroup ? createVNode(resolveComponent("iBizSearchGroups"), {
          "controller": this.c,
          "counterData": this.counterData
        }, null) : createVNode("div", {
          "class": [this.ns.b("quick-group"), this.semanticClass("group")],
          "style": this.semanticStyle("group")
        }, [(_a = this.c.model.searchBarGroups) == null ? void 0 : _a.map((groupItem) => {
          var _a2;
          const visible = this.c.calcCountVisible(groupItem);
          if (!visible) {
            return null;
          }
          return createVNode("span", {
            "class": [this.ns.b("quick-group-item"), this.ns.is("selected", ((_a2 = this.c.state.selectedGroupItem) == null ? void 0 : _a2.id) === groupItem.id), this.semanticClass("groupitem", {
              item: groupItem
            })],
            "style": this.semanticStyle("groupitem", {
              item: groupItem
            }),
            "onClick": () => this.onGroupClick(groupItem)
          }, [groupItem.sysImage && createVNode(resolveComponent("iBizIcon"), {
            "icon": groupItem.sysImage,
            "class": [this.ns.be("quick-group-item", "icon"), this.semanticClass("groupitem.icon", {
              item: groupItem
            })],
            "style": this.semanticStyle("groupitem.icon", {
              item: groupItem
            })
          }, null), createVNode("span", {
            "class": [this.ns.be("quick-group-item", "caption"), this.semanticClass("groupitem.caption", {
              item: groupItem
            })],
            "style": this.semanticStyle("groupitem.caption", {
              item: groupItem
            })
          }, [groupItem.caption]), groupItem.counterId && createVNode(resolveComponent("iBizBadge"), {
            "class": [this.ns.e("counter"), this.semanticClass("groupitem.counter", {
              item: groupItem
            })],
            "style": this.semanticStyle("groupitem.counter", {
              item: groupItem
            }),
            "value": this.counterData[groupItem.counterId],
            "counterMode": groupItem.counterMode
          }, null)]);
        })])), this.c.model.enableGroup && this.c.isBackendSearchGroup && createVNode(resolveComponent("el-button"), {
          "class": [this.ns.b("save"), this.semanticClass("save")],
          "style": this.semanticStyle("save"),
          "title": showTitle(ibiz.i18n.t("control.searchBar.saveGroup")),
          "onClick": this.handleSave
        }, {
          default: () => [createVNode("ion-icon", {
            "name": "save-outline"
          }, null)]
        }), this.c.model.enableQuickSearch && createVNode(resolveComponent("el-input"), {
          "modelValue": this.c.state.query,
          "onUpdate:modelValue": ($event) => this.c.state.query = $event,
          "class": [this.ns.b("quick-search"), this.ns.is("advanced-quick-search", this.c.state.advancedQuickSearch), this.semanticClass("search")],
          "style": this.semanticStyle("search"),
          "placeholder": this.c.state.quickSearchPlaceHolder,
          "clearable": true,
          "onKeydown": this.onKeydown,
          "onClear": this.onClear,
          "suffix-icon": createVNode("ion-icon", {
            "onClick": this.onSearch,
            "class": this.ns.e("search-icon"),
            "name": "search"
          }, null)
        }, {
          prepend: () => this.renderAdvancedSearch()
        }), this.c.enableFilter && createVNode(resolveComponent("el-button"), {
          "ref": "filterButtonRef",
          "type": "primary",
          "title": showTitle(ibiz.i18n.t("control.searchBar.filter")),
          "class": [this.ns.b("filter"), this.semanticClass("filter")],
          "style": this.semanticStyle("filter"),
          "onClick": () => this.triggerFilter()
        }, {
          default: () => [createVNode(resolveComponent("iBizIcon"), {
            "icon": {
              cssClass: "funnel-outline"
            }
          }, null)]
        })];
      }
    });
  }
});

export { SearchBarControl };
