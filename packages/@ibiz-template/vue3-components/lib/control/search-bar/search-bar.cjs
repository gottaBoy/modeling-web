'use strict';

var vue = require('vue');
var vue3Util = require('@ibiz-template/vue3-util');
require('./search-bar.css');
var runtime = require('@ibiz-template/runtime');
var core = require('@ibiz-template/core');

"use strict";
const SearchBarControl = /* @__PURE__ */ vue.defineComponent({
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
    const c = vue3Util.useControlController((...args) => new runtime.SearchBarController(...args));
    c.setStorageKeyFn(vue3Util.useLocalCacheKey(c.context, "SEARCH_BAR_SELECTED_GROUP", c.view.modal.routeDepth));
    const ns = vue3Util.useNamespace("control-".concat(c.model.controlType.toLowerCase()));
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
    const cssVars = vue.computed(() => {
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
    const filterButtonRef = vue.ref();
    let popover;
    const showFilter = async () => {
      popover = ibiz.overlay.createPopover(() => {
        return vue.createVNode(vue.resolveComponent("iBizFilterTreeControl"), {
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
      return vue.createVNode(vue.resolveComponent("iBizQuickSearchSelect"), {
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
    return vue.createVNode(vue.resolveComponent("iBizControlBase"), {
      "controller": this.c,
      "class": [this.ns.b()],
      "style": this.cssVars
    }, {
      default: () => {
        var _a;
        return [this.c.model.enableGroup && (this.c.isBackendSearchGroup ? vue.createVNode(vue.resolveComponent("iBizSearchGroups"), {
          "controller": this.c
        }, null) : vue.createVNode("div", {
          "class": this.ns.b("quick-group")
        }, [(_a = this.c.model.searchBarGroups) == null ? void 0 : _a.map((groupItem) => {
          var _a2;
          return vue.createVNode("span", {
            "class": [this.ns.b("quick-group-item"), this.ns.is("selected", ((_a2 = this.c.state.selectedGroupItem) == null ? void 0 : _a2.id) === groupItem.id)],
            "onClick": () => this.onGroupClick(groupItem)
          }, [groupItem.caption]);
        })])), this.c.model.enableGroup && this.c.isBackendSearchGroup && vue.createVNode(vue.resolveComponent("el-button"), {
          "class": this.ns.b("save"),
          "title": core.showTitle(ibiz.i18n.t("control.searchBar.saveGroup")),
          "onClick": this.handleSave
        }, {
          default: () => [vue.createVNode("ion-icon", {
            "name": "save-outline"
          }, null)]
        }), this.c.model.enableQuickSearch && vue.createVNode(vue.resolveComponent("el-input"), {
          "modelValue": this.c.state.query,
          "onUpdate:modelValue": ($event) => this.c.state.query = $event,
          "class": this.ns.b("quick-search"),
          "placeholder": this.c.state.quickSearchPlaceHolder,
          "clearable": true,
          "onKeydown": this.onKeydown,
          "onClear": this.onClear,
          "suffix-icon": vue.createVNode("ion-icon", {
            "onClick": this.onSearch,
            "class": this.ns.e("search-icon"),
            "name": "search"
          }, null)
        }, {
          prepend: () => this.renderAdvancedSearch()
        }), this.c.enableFilter && vue.createVNode(vue.resolveComponent("el-button"), {
          "ref": "filterButtonRef",
          "type": "primary",
          "title": core.showTitle(ibiz.i18n.t("control.searchBar.filter")),
          "class": this.ns.b("filter"),
          "onClick": () => this.triggerFilter()
        }, {
          default: () => [vue.createVNode(vue.resolveComponent("iBizIcon"), {
            "icon": {
              cssClass: "funnel-outline"
            }
          }, null)]
        })];
      }
    });
  }
});

exports.SearchBarControl = SearchBarControl;
