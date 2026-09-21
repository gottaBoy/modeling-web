import { defineComponent, computed, ref, createVNode, resolveComponent } from 'vue';
import { useControlController, useLocalCacheKey, useNamespace } from '@ibiz-template/vue3-util';
import './search-bar.css';
import { SearchBarController } from '@ibiz-template/runtime';
import { showTitle } from '@ibiz-template/core';

"use strict";
const SearchBarControl = /* @__PURE__ */ defineComponent({
  name: "IBizSearchBarControl",
  props: {
    modelData: {
      type: Object,
      required: true
    },
    context: {
      type: Object,
      required: true
    },
    params: {
      type: Object,
      default: () => ({})
    },
    provider: {
      type: Object
    }
  },
  setup() {
    var _a;
    const c = useControlController((...args) => new SearchBarController(...args));
    c.setStorageKeyFn(useLocalCacheKey(c.context, "SEARCH_BAR_SELECTED_GROUP", c.view.modal.routeDepth));
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
      onSearch();
    };
    if (c.model.enableGroup && c.model.searchBarGroups && ((_a = c.model.searchBarGroups) == null ? void 0 : _a.length) > 0) {
      c.state.selectedGroupItem = c.model.searchBarGroups[0];
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
        "controller": c
      }, null);
    };
    return {
      c,
      ns,
      cssVars,
      filterButtonRef,
      onClear,
      onSearch,
      onKeydown,
      onGroupClick,
      triggerFilter,
      handleSave,
      renderAdvancedSearch
    };
  },
  render() {
    return createVNode(resolveComponent("iBizControlBase"), {
      "controller": this.c,
      "class": [this.ns.b()],
      "style": this.cssVars
    }, {
      default: () => {
        var _a;
        return [this.c.model.enableGroup && (this.c.isBackendSearchGroup ? createVNode(resolveComponent("iBizSearchGroups"), {
          "controller": this.c
        }, null) : createVNode("div", {
          "class": this.ns.b("quick-group")
        }, [(_a = this.c.model.searchBarGroups) == null ? void 0 : _a.map((groupItem) => {
          var _a2;
          return createVNode("span", {
            "class": [this.ns.b("quick-group-item"), this.ns.is("selected", ((_a2 = this.c.state.selectedGroupItem) == null ? void 0 : _a2.id) === groupItem.id)],
            "onClick": () => this.onGroupClick(groupItem)
          }, [groupItem.caption]);
        })])), this.c.model.enableGroup && this.c.isBackendSearchGroup && createVNode(resolveComponent("el-button"), {
          "class": this.ns.b("save"),
          "title": showTitle(ibiz.i18n.t("control.searchBar.saveGroup")),
          "onClick": this.handleSave
        }, {
          default: () => [createVNode("ion-icon", {
            "name": "save-outline"
          }, null)]
        }), this.c.model.enableQuickSearch && createVNode(resolveComponent("el-input"), {
          "modelValue": this.c.state.query,
          "onUpdate:modelValue": ($event) => this.c.state.query = $event,
          "class": this.ns.b("quick-search"),
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
          "class": this.ns.b("filter"),
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
