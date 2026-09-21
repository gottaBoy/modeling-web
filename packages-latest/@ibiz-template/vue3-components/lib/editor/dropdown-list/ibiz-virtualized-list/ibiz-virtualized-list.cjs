'use strict';

var vue = require('vue');
var vue3Util = require('@ibiz-template/vue3-util');
var core = require('@ibiz-template/core');
var runtime = require('@ibiz-template/runtime');
require('./ibiz-virtualized-list.css');

"use strict";
const IBizVirtualizedList = /* @__PURE__ */ vue.defineComponent({
  name: "IBizVirtualizedList",
  props: vue3Util.getDropdownProps(),
  emits: vue3Util.getEditorEmits(),
  setup(props, {
    emit
  }) {
    const ns = vue3Util.useNamespace("dropdown-virtualized-list");
    const c = props.controller;
    const {
      semanticClass,
      semanticStyle
    } = vue3Util.useSemanticNode(c);
    const items = vue.ref([]);
    const getItemChildClass = (params) => {
      return [{
        class: semanticClass("editor.input", params),
        selector: ".el-select-v2__input-wrapper"
      }, {
        class: semanticClass("editor.suffix", params),
        selector: ".el-select-v2__suffix"
      }, {
        class: semanticClass("editor.item", params),
        selector: ".el-tag"
      }, {
        class: semanticClass("editor.item.label", params),
        selector: ".el-tag__content"
      }, {
        class: semanticClass("editor.item.label", params),
        selector: ".".concat(ns.em("item", "label"))
      }, {
        class: semanticClass("editor.item.icon", params),
        selector: ".".concat(ns.em("item", "icon"))
      }, {
        class: semanticClass("editor.item.remove", params),
        selector: ".el-tag__close"
      }];
    };
    const getItemChildStyle = (params) => {
      return [{
        style: semanticStyle("editor.input", params),
        selector: ".el-select-v2__input-wrapper"
      }, {
        style: semanticStyle("editor.suffix", params),
        selector: ".el-select-v2__suffix"
      }, {
        style: semanticStyle("editor.item", params),
        selector: ".el-tag"
      }, {
        style: semanticStyle("editor.item.label", params),
        selector: ".el-tag__content"
      }, {
        style: semanticStyle("editor.item.label", params),
        selector: ".".concat(ns.em("item", "label"))
      }, {
        style: semanticStyle("editor.item.icon", params),
        selector: ".".concat(ns.em("item", "icon"))
      }, {
        style: semanticStyle("editor.item.remove", params),
        selector: ".el-tag__close"
      }];
    };
    const getPopupItemChildClass = (params) => {
      return [{
        class: semanticClass("editor.popup.item.icon", params),
        selector: ".".concat(ns.em("option-item", "icon"))
      }, {
        class: semanticClass("editor.popup.item.label", params),
        selector: ".".concat(ns.em("option-item", "label"))
      }];
    };
    const getPopupItemChildStyle = (params) => {
      return [{
        style: semanticStyle("editor.popup.item.icon", params),
        selector: ".".concat(ns.em("option-item", "icon"))
      }, {
        style: semanticStyle("editor.popup.item.label", params),
        selector: ".".concat(ns.em("option-item", "label"))
      }];
    };
    const codeListItems = vue.ref([]);
    const isLoadedCodeList = vue.ref(false);
    const hasChildren = vue.ref(false);
    const treeNodes = vue.ref([]);
    const editorRef = vue.ref();
    const editorItems = c.model.editorItems;
    const isLoading = vue.ref(false);
    let editorState = "";
    const codeItemValueNumber = vue.ref(false);
    const {
      getSelection,
      getSelectionValue
    } = runtime.useCodeListSelection(c.allItemsValue);
    const handleTreeNodes = (nodes) => {
      if (nodes.length === 0) {
        return [];
      }
      const list = [];
      const existingValues = new Set(codeListItems.value.map((item) => item.value));
      nodes.forEach((codeItem) => {
        var _a;
        if (!existingValues.has(codeItem.value)) {
          codeListItems.value.push(codeItem);
        }
        const tempObj = {
          label: codeItem.text,
          value: (_a = codeItem.value) == null ? void 0 : _a.toString(),
          color: codeItem == null ? void 0 : codeItem.color,
          textCls: codeItem == null ? void 0 : codeItem.textCls,
          sysImage: codeItem.sysImage,
          disabled: codeItem.disableSelect === true,
          children: []
        };
        if (codeItem.children && codeItem.children.length > 0) {
          tempObj.children = handleTreeNodes(codeItem.children);
        }
        list.push(tempObj);
      });
      return list;
    };
    const autoSelectFirstOption = () => {
      const item = items.value[0];
      if (!c.autoSelectFirstOption || props.value || !item)
        return;
      if (c.multiple) {
        const value = c.allItems && !hasChildren.value ? getSelectionValue(item.value).map((v) => "".concat(v)) : [item.value];
        emit("change", c.model.valueType === "SIMPLES" ? value : value.join(","), void 0, true);
      } else if (editorItems && editorItems.length > 0) {
        emit("change", item.value, editorItems[0].id, true);
        emit("change", item.text, void 0, true);
      } else {
        emit("change", item.value, void 0, true);
      }
    };
    const afterLoadCodeList = (codeList) => {
      items.value = [];
      codeListItems.value = [];
      if (c.multiple && !codeList.some((item) => item.children)) {
        codeList = c.handleCodeListAllItems(codeList);
      }
      if (c.blankItemName && !c.multiple) {
        items.value = [{
          value: void 0,
          text: ibiz.appUtil.resolveI18nText(c.blankItemName)
        }, ...codeList];
      } else {
        items.value = codeList;
      }
      for (let i = 0; i < items.value.length; i++) {
        const _item = items.value[i];
        if (_item.children) {
          hasChildren.value = true;
          treeNodes.value = handleTreeNodes(codeList);
          break;
        }
      }
      autoSelectFirstOption();
    };
    const loadCodeList = async () => {
      if (c.model.appCodeListId) {
        const app = ibiz.hub.getApp(c.context.srfappid);
        const codeListModel = app.codeList.getCodeList(c.model.appCodeListId);
        if (codeListModel) {
          codeItemValueNumber.value = codeListModel.codeItemValueNumber || false;
        }
      }
      isLoading.value = true;
      const codeList = await c.loadCodeList(props.data);
      afterLoadCodeList(codeList);
      isLoadedCodeList.value = true;
      isLoading.value = false;
    };
    vue.watch(() => props.value, async (newVal, oldVal) => {
      if (newVal || newVal === null || newVal === 0) {
        if (!isLoadedCodeList.value && oldVal === void 0) {
          await loadCodeList();
        }
      }
    }, {
      immediate: true
    });
    const useEditorNavParams = () => {
      const {
        navigateContexts = [],
        navigateParams = []
      } = c.model;
      const navParamName = [];
      [...navigateContexts, ...navigateParams].forEach((nav) => {
        if (!nav.rawValue && nav.value) {
          navParamName.push(nav.value);
        }
      });
      vue.watch(() => {
        const data = {};
        Object.keys(props.data).forEach((key) => {
          if (navParamName.includes(key)) {
            data[key] = props.data[key];
          }
        });
        return data;
      }, () => loadCodeList(), {
        deep: true
      });
    };
    const getCodeListItemByValue = (value) => {
      const list = hasChildren.value ? codeListItems.value : items.value;
      return list.find((item) => item.value === value);
    };
    const curValue = vue.computed({
      get() {
        var _a, _b, _c;
        if (!isLoadedCodeList.value) {
          return c.multiple ? [] : "";
        }
        if (editorItems && editorItems.length > 0 && !c.multiple) {
          return (_a = props.data[editorItems[0].id]) == null ? void 0 : _a.toString();
        }
        if (props.value && typeof props.value === "string") {
          if (c.allItems && c.multiple && !hasChildren.value) {
            return getSelection([], props.value.split(","), items.value, items.value).map((v) => "".concat(v));
          }
          return c.multiple ? (_b = props.value) == null ? void 0 : _b.toString().split(",") : props.value.toString();
        }
        if (props.value && Array.isArray(props.value)) {
          if (c.allItems && c.multiple && !hasChildren.value) {
            return getSelection([], props.value, items.value, items.value).map((v) => "".concat(v));
          }
          return c.multiple ? props.value : props.value.toString();
        }
        return c.multiple ? [] : ((_c = props.value) == null ? void 0 : _c.toString()) || "";
      },
      set(_select) {
        let select = _select;
        if (c.blankItemName && !_select)
          select = void 0;
        if (Array.isArray(select)) {
          if (c.allItems && c.multiple && !hasChildren.value) {
            const selection = getSelection(curValue.value, select, items.value, items.value);
            select = getSelectionValue(selection).map((v) => "".concat(v));
          }
          let selectArr = null;
          if (select.length === 0) {
            selectArr = null;
          } else if (c.model.valueType === "SIMPLES") {
            selectArr = select;
          } else {
            selectArr = select.join(",");
          }
          emit("change", selectArr);
        } else if (editorItems && editorItems.length > 0) {
          let emitVal = select === void 0 ? null : select;
          if (codeItemValueNumber.value && emitVal !== null)
            emitVal = Number(select);
          emit("change", emitVal, editorItems[0].id);
          const selectItem = getCodeListItemByValue(codeItemValueNumber.value ? Number(select) : select);
          if (selectItem) {
            emit("change", selectItem.text);
          }
        } else {
          let emitVal = select === void 0 ? null : select;
          if (codeItemValueNumber.value && emitVal !== null)
            emitVal = Number(select);
          emit("change", emitVal);
        }
        if (c.editorParams.alwaysLoad === "true" || c.editorParams.alwaysload === "true") {
          loadCodeList();
        }
        if (props.autoFocus) {
          editorState = "blur";
          emit("blur");
        }
      }
    });
    const valueText = vue.computed(() => {
      const valueArr = Array.isArray(curValue.value) ? curValue.value : [curValue.value];
      const list = hasChildren.value ? codeListItems.value : items.value;
      const textArr = [];
      valueArr.forEach((item) => {
        list.forEach((codeItem) => {
          if (codeItemValueNumber.value ? codeItem.value === Number(item) : codeItem.value === item) {
            textArr.push(codeItem.text);
          }
        });
      });
      return textArr.join(",");
    });
    vue.watch(valueText, (newVal, oldVal) => {
      if (newVal !== oldVal) {
        emit("infoTextChange", newVal);
      }
    }, {
      immediate: true
    });
    vue.watch(editorRef, (newVal) => {
      var _a;
      if (props.autoFocus && newVal && newVal.focus) {
        (_a = newVal.focus) == null ? void 0 : _a.call(newVal);
      }
    });
    const onFocus = (e) => {
      editorState = "focus";
      emit("focus", e);
    };
    const onBlur = (e) => {
      editorState = "blur";
      emit("blur", e);
    };
    const handleKeyUp = (e) => {
      if (e && e.code === "Enter") {
        emit("enter", e);
      }
    };
    const customNodeClass = (data, _node) => {
      return data.children.length ? ns.e("branch-node") : null;
    };
    const getCodeListItem = (text) => {
      const list = hasChildren.value ? codeListItems.value : items.value;
      return list.find((item) => item.text === text);
    };
    const onVisibleChange = async (visible) => {
      if (visible && (!isLoadedCodeList.value || c.editorParams.alwaysLoad === "true" || c.editorParams.alwaysload === "true")) {
        await loadCodeList();
        if (hasChildren.value && editorRef.value && editorState !== "outside") {
          vue.nextTick(() => {
            var _a, _b;
            (_b = (_a = editorRef.value).focus) == null ? void 0 : _b.call(_a);
          });
        }
        vue.nextTick(() => {
          window.dispatchEvent(new Event("resize"));
        });
      }
    };
    const fn = (data) => {
      if (data)
        afterLoadCodeList(data);
    };
    vue3Util.useCodeListListen(c.model.appCodeListId, c.context.srfappid, fn);
    const handleClickOutside = (event) => {
      const target = event.target;
      if (editorState === "focus" && !editorRef.value.$el.contains(target) && !editorRef.value.$refs.popper.popperRef.contentRef.contains(target)) {
        onBlur(event);
      }
    };
    const handleClear = () => {
      onFocus();
    };
    vue.onMounted(() => {
      useEditorNavParams();
      document.addEventListener("click", handleClickOutside, {
        capture: true
      });
    });
    vue.onUnmounted(() => {
      document.removeEventListener("click", handleClickOutside, {
        capture: true
      });
    });
    const prefix = {};
    if (c.editorParams.type === "round") {
      Object.assign(prefix, {
        prefix: () => {
          return valueText.value.split(",").map((text) => {
            const codeListItem = getCodeListItem(text);
            return vue.createVNode("div", {
              "class": [ns.b("select-option-text"), codeListItem == null ? void 0 : codeListItem.textCls],
              "style": (codeListItem == null ? void 0 : codeListItem.color) || (codeListItem == null ? void 0 : codeListItem.bkcolor) ? ns.cssVarBlock({
                "select-option-item-color": "".concat(codeListItem.color || ""),
                "select-option-item-bkcolor": "".concat(codeListItem.bkcolor || ""),
                "select-option-item-padding": "0 var(".concat(ns.cssVarName("spacing-base"), ")")
              }) : ""
            }, [(codeListItem == null ? void 0 : codeListItem.sysImage) && vue.createVNode(vue.resolveComponent("iBizIcon"), {
              "icon": codeListItem == null ? void 0 : codeListItem.sysImage
            }, null), text || ""]);
          });
        }
      });
    }
    return {
      c,
      ns,
      items,
      prefix,
      curValue,
      editorRef,
      isLoading,
      treeNodes,
      valueText,
      hasChildren,
      semanticClass,
      semanticStyle,
      onBlur,
      onFocus,
      handleClear,
      handleKeyUp,
      customNodeClass,
      getCodeListItem,
      onVisibleChange,
      getItemChildClass,
      getItemChildStyle,
      getPopupItemChildClass,
      getPopupItemChildStyle
    };
  },
  render() {
    const overflowMode = this.c.editorParams.overflowMode || this.c.editorParams.overflowmode || ibiz.config.pickerEditor.overflowMode;
    const isEllipsis = overflowMode === "ellipsis";
    const editContent = vue.withDirectives(vue.createVNode(vue.resolveComponent("el-select-v2"), vue.mergeProps({
      "ref": "editorRef",
      "modelValue": this.curValue || void 0,
      "onUpdate:modelValue": (value) => {
        this.curValue = value;
      },
      "clearable": true,
      "class": [this.ns.b("select")],
      "filterable": true,
      "multiple": this.c.multiple,
      "allow-create": !this.c.forceSelection,
      "placeholder": this.c.placeHolder ? this.c.placeHolder : " ",
      "disabled": this.disabled,
      "loading": this.isLoading,
      "fit-input-width": isEllipsis,
      "popper-class": [this.ns.b("popper"), this.c.editorParams.type === "round" ? this.ns.bm("popper", "round") : "", this.semanticClass("editor.popup"), this.ns.bm("popper", "".concat(this.c.model.id))],
      "popper-style": this.semanticStyle("editor.popup"),
      "onFocus": this.onFocus,
      "onClear": this.handleClear,
      "onKeyup": this.handleKeyUp,
      "onVisibleChange": this.onVisibleChange,
      "options": this.items,
      "props": {
        key: "value",
        label: "text"
      }
    }, this.$attrs), {
      default: (data) => {
        const {
          item
        } = data;
        return vue.withDirectives(vue.createVNode("div", {
          "style": [item.bkcolor ? this.ns.cssVarBlock({
            "select-option-item-bkcolor": "".concat(item.bkcolor)
          }) : "", this.semanticStyle("editor.popup.item", {
            item
          })],
          "class": ["select-v2-option-item", this.ns.e("option-item"), item.cls ? item.cls : null, item.disableSelect === true ? "disabled-select-v2" : null, this.semanticClass("editor.popup.item", {
            item
          })],
          "title": core.showTitle(isEllipsis ? item.text : "")
        }, [vue.createVNode("div", {
          "class": [this.ns.b("select-option-content"), item.textCls ? item.textCls : null],
          "style": item.color ? this.ns.cssVarBlock({
            "select-option-item-color": "".concat(item.color)
          }) : ""
        }, [item.sysImage && vue.createVNode(vue.resolveComponent("iBizIcon"), {
          "icon": item.sysImage,
          "class": this.ns.em("option-item", "icon")
        }, null), vue.createVNode("span", {
          "class": [isEllipsis && this.ns.be("select-option-content", "text"), this.ns.em("option-item", "label")]
        }, [item.text])])]), [[vue.resolveDirective("child-class"), this.getPopupItemChildClass({
          item
        })], [vue.resolveDirective("child-style"), this.getPopupItemChildStyle({
          item
        })]]);
      },
      ...this.prefix
    }), [[vue.resolveDirective("child-class"), this.getItemChildClass()], [vue.resolveDirective("child-style"), this.getItemChildStyle()]]);
    const readonlyContent = this.valueText.split(",").map((text) => {
      const codeListItem = this.getCodeListItem(text);
      return vue.withDirectives(vue.createVNode("span", {
        "class": [this.ns.e("item"), codeListItem == null ? void 0 : codeListItem.textCls, this.ns.b("readonly-text-item"), this.semanticClass("editor.item", {
          item: codeListItem
        })],
        "style": [(codeListItem == null ? void 0 : codeListItem.color) || (codeListItem == null ? void 0 : codeListItem.bkcolor) ? this.ns.cssVarBlock({
          "readonly-text-item-color": "".concat(codeListItem.color || ""),
          "select-option-item-color": "".concat(codeListItem.color || ""),
          "select-option-item-bkcolor": "".concat((this.c.editorParams.type === "round" ? codeListItem.bkcolor : "") || "")
        }) : "", this.semanticStyle("editor.item", {
          item: codeListItem
        })]
      }, [(codeListItem == null ? void 0 : codeListItem.sysImage) && vue.createVNode(vue.resolveComponent("iBizIcon"), {
        "icon": codeListItem == null ? void 0 : codeListItem.sysImage,
        "class": this.ns.em("item", "icon")
      }, null), vue.createVNode("span", {
        "class": [this.ns.em("item", "label"), this.ns.be("readonly-text-item", "label")]
      }, [text])]), [[vue.resolveDirective("child-class"), this.getItemChildClass({
        item: codeListItem
      })], [vue.resolveDirective("child-style"), this.getItemChildStyle({
        item: codeListItem
      })]]);
    });
    return vue.createVNode("div", {
      "class": [this.ns.b(), this.semanticClass("editor.root"), this.disabled ? this.ns.m("disabled") : "", this.readonly ? this.ns.m("readonly") : "", this.c.editorParams.type === "round" && this.ns.m("round"), this.ns.is("has-value", this.value != null && this.value !== "")],
      "style": this.semanticStyle("editor.root")
    }, [this.readonly ? readonlyContent : editContent]);
  }
});

exports.IBizVirtualizedList = IBizVirtualizedList;
