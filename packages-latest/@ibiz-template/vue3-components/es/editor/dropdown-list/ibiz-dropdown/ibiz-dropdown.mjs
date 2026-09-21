import { defineComponent, withDirectives, createVNode, resolveComponent, mergeProps, resolveDirective, ref, computed, watch, nextTick, onMounted, onUnmounted } from 'vue';
import { useNamespace, useSemanticNode, useCodeListListen, useClickOutside, getEditorEmits, getDropdownProps } from '@ibiz-template/vue3-util';
import { showTitle } from '@ibiz-template/core';
import { useCodeListSelection } from '@ibiz-template/runtime';
import './ibiz-dropdown.css';

"use strict";
const IBizDropdown = /* @__PURE__ */ defineComponent({
  name: "IBizDropdown",
  props: getDropdownProps(),
  emits: getEditorEmits(),
  setup(props, {
    emit
  }) {
    var _a;
    const ns = useNamespace("dropdown");
    const c = props.controller;
    const {
      semanticClass,
      semanticStyle
    } = useSemanticNode(c);
    const items = ref([]);
    const getItemChildClass = (params) => {
      return [{
        class: semanticClass("editor.input", params),
        selector: ".el-select__input"
      }, {
        class: semanticClass("editor.suffix", params),
        selector: ".el-input__suffix"
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
        selector: ".el-select__input"
      }, {
        style: semanticStyle("editor.suffix", params),
        selector: ".el-input__suffix"
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
    const codeListItems = ref([]);
    const isLoadedCodeList = ref(false);
    const hasChildren = ref(false);
    const treeNodes = ref([]);
    const isEditable = ref(false);
    const editorRef = ref();
    const editorItems = c.model.editorItems;
    const isLoading = ref(false);
    let editorState = "";
    let funcs;
    const codeItemValueNumber = ref(false);
    const hiddenInputRef = ref();
    const valueSeparator = ((_a = c.editorParams) == null ? void 0 : _a.valueseparator) || ",";
    const {
      getSelection,
      getSelectionValue
    } = useCodeListSelection(c.allItemsValue);
    const showFormDefaultContent = computed(() => {
      if (props.controlParams && props.controlParams.editmode === "hover" && !props.readonly) {
        return true;
      }
      return false;
    });
    const cssVars = computed(() => {
      if (c.model.editorType === "DROPDOWNLIST_100") {
        return ns.cssVarBlock({
          width: "100px"
        });
      }
      return {};
    });
    const handleTreeNodes = (nodes) => {
      if (nodes.length === 0) {
        return [];
      }
      const list = [];
      const existingValues = new Set(codeListItems.value.map((item) => item.value));
      nodes.forEach((codeItem) => {
        var _a2;
        if (!existingValues.has(codeItem.value)) {
          codeListItems.value.push(codeItem);
        }
        const tempObj = {
          label: codeItem.text,
          value: (_a2 = codeItem.value) == null ? void 0 : _a2.toString(),
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
        const value = c.allItems && !hasChildren.value ? items.value.filter((_item) => _item.value !== c.allItemsValue).map((_item) => _item.value) : [item.value];
        emit("change", c.model.valueType === "SIMPLES" ? value : value.join(valueSeparator), void 0, true);
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
          value: c.blankItemValue,
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
    watch(() => props.value, async (newVal, oldVal) => {
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
      watch(() => {
        const data = {};
        if (props.data) {
          Object.keys(props.data).forEach((key) => {
            if (navParamName.includes(key)) {
              data[key] = props.data[key];
            }
          });
        }
        return data;
      }, () => {
        if (props.data) {
          loadCodeList();
        }
      }, {
        deep: true
      });
    };
    const setEditable = (flag) => {
      if (flag) {
        isEditable.value = flag;
      } else {
        setTimeout(() => {
          isEditable.value = flag;
        }, 100);
      }
    };
    const getCodeListItemByValue = (value) => {
      const list = hasChildren.value ? codeListItems.value : items.value;
      return list.find((item) => item.value === value);
    };
    const curValue = computed({
      get() {
        var _a2, _b, _c;
        if (!isLoadedCodeList.value) {
          return c.multiple ? [] : "";
        }
        if (editorItems && editorItems.length > 0 && !c.multiple) {
          return (_a2 = props.data[editorItems[0].id]) == null ? void 0 : _a2.toString();
        }
        if (props.value && typeof props.value === "string") {
          if (c.allItems && c.multiple && !hasChildren.value) {
            return getSelection([], props.value.split(valueSeparator), items.value, items.value).map((v) => "".concat(v));
          }
          return c.multiple ? (_b = props.value) == null ? void 0 : _b.toString().split(valueSeparator) : props.value.toString();
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
          select = c.blankItemValue;
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
            selectArr = select.join(valueSeparator);
          }
          emit("change", selectArr);
        } else if (editorItems && editorItems.length > 0) {
          let emitVal = select;
          if (codeItemValueNumber.value) {
            emitVal = select === "" ? null : Number(select);
          }
          emit("change", emitVal, editorItems[0].id);
          const selectItem = getCodeListItemByValue(codeItemValueNumber.value ? Number(select) : select);
          if (selectItem) {
            emit("change", selectItem.text);
          }
        } else {
          let emitVal = select;
          if (codeItemValueNumber.value) {
            emitVal = select === "" ? null : Number(select);
          }
          emit("change", emitVal);
        }
        setEditable(false);
        if (c.editorParams.alwaysLoad === "true" || c.editorParams.alwaysload === "true") {
          loadCodeList();
        }
        if (props.autoFocus) {
          editorState = "blur";
          emit("blur");
        }
      }
    });
    const valueText = computed(() => {
      const valueArr = Array.isArray(curValue.value) ? curValue.value : [curValue.value];
      const list = hasChildren.value ? codeListItems.value : items.value;
      const isNumber = codeItemValueNumber.value;
      const codeMap = new Map(list.map((codeItem) => [isNumber ? Number(codeItem.value) : String(codeItem.value), codeItem.text]));
      const textArr = [];
      valueArr.forEach((item) => {
        const key = isNumber ? Number(item) : String(item);
        const text = codeMap.get(key);
        if (text !== void 0) {
          textArr.push(text);
        } else {
          textArr.push(item);
        }
      });
      return textArr.join(valueSeparator);
    });
    watch(valueText, (newVal, oldVal) => {
      if (newVal !== oldVal) {
        emit("infoTextChange", newVal);
      }
    }, {
      immediate: true
    });
    watch(editorRef, (newVal) => {
      if (props.autoFocus && newVal && newVal.focus) {
        newVal.focus();
      }
    });
    const onFocus = (e) => {
      editorState = "focus";
      emit("focus", e);
      setEditable(true);
    };
    const onBlur = (e) => {
      editorState = "blur";
      emit("blur", e);
      setEditable(false);
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
      var _a2, _b, _c;
      const isSearchForm = (
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ((_c = (_b = (_a2 = c.parent) == null ? void 0 : _a2.form) == null ? void 0 : _b.model) == null ? void 0 : _c.controlType) === "SEARCHFORM"
      );
      if (!visible && isSearchForm) {
        nextTick(() => {
          var _a3;
          (_a3 = hiddenInputRef.value) == null ? void 0 : _a3.focus();
        });
      }
      if (visible && (!isLoadedCodeList.value || c.editorParams.alwaysLoad === "true" || c.editorParams.alwaysload === "true")) {
        await loadCodeList();
        if (hasChildren.value && editorRef.value && editorState !== "outside") {
          nextTick(() => {
            editorRef.value.focus();
          });
        }
        nextTick(() => {
          window.dispatchEvent(new Event("resize"));
        });
      }
    };
    const fn = (data) => {
      if (data)
        afterLoadCodeList(data);
    };
    useCodeListListen(c.model.appCodeListId, c.context.srfappid, fn);
    onMounted(() => {
      useEditorNavParams();
      if (editorRef.value) {
        funcs = useClickOutside(editorRef, async (_evt) => {
          editorState = "outside";
        });
      }
    });
    onUnmounted(() => {
      if (funcs && funcs.stop) {
        funcs.stop();
      }
    });
    const prefix = {};
    if (c.editorParams.type === "round") {
      Object.assign(prefix, {
        prefix: () => {
          return valueText.value.split(valueSeparator).map((text) => {
            const codeListItem = getCodeListItem(text);
            return createVNode("div", {
              "class": [ns.b("select-option-text"), codeListItem == null ? void 0 : codeListItem.textCls],
              "style": (codeListItem == null ? void 0 : codeListItem.color) || (codeListItem == null ? void 0 : codeListItem.bkcolor) ? ns.cssVarBlock({
                "select-option-item-color": "".concat(codeListItem.color || ""),
                "select-option-item-bkcolor": "".concat(codeListItem.bkcolor || ""),
                "select-option-item-padding": "0 var(".concat(ns.cssVarName("spacing-base"), ")")
              }) : ""
            }, [(codeListItem == null ? void 0 : codeListItem.sysImage) && createVNode(resolveComponent("iBizIcon"), {
              "icon": codeListItem == null ? void 0 : codeListItem.sysImage
            }, null), text || ""]);
          });
        }
      });
    }
    return {
      ns,
      c,
      items,
      prefix,
      cssVars,
      curValue,
      valueText,
      editorRef,
      treeNodes,
      isLoading,
      isEditable,
      hasChildren,
      semanticClass,
      semanticStyle,
      hiddenInputRef,
      valueSeparator,
      showFormDefaultContent,
      onBlur,
      onFocus,
      setEditable,
      handleKeyUp,
      getCodeListItem,
      onVisibleChange,
      customNodeClass,
      getItemChildClass,
      getItemChildStyle,
      getPopupItemChildClass,
      getPopupItemChildStyle
    };
  },
  render() {
    const overflowMode = this.c.editorParams.overflowMode || this.c.editorParams.overflowmode || ibiz.config.pickerEditor.overflowMode;
    const isEllipsis = overflowMode === "ellipsis";
    const editContent = this.hasChildren ? withDirectives(createVNode(resolveComponent("el-tree-select"), mergeProps({
      "ref": "editorRef",
      "modelValue": this.curValue,
      "onUpdate:modelValue": ($event) => this.curValue = $event,
      "clearable": true,
      "class": [this.ns.b("select"), this.ns.e("content"), this.semanticClass("editor.content")],
      "style": this.semanticStyle("editor.content"),
      "filterable": true,
      "teleported": !this.showFormDefaultContent,
      "data": this.treeNodes,
      "allow-create": !this.c.forceSelection,
      "default-first-option": this.c.defaultFirstOption,
      "check-strictly": true,
      "render-after-expand": true,
      "multiple": this.c.multiple,
      "placeholder": this.c.placeHolder ? this.c.placeHolder : " ",
      "disabled": this.disabled,
      "loading": this.isLoading,
      "fit-input-width": isEllipsis,
      "onBlur": this.onBlur,
      "onFocus": this.onFocus,
      "onKeyup": this.handleKeyUp,
      "onVisibleChange": this.onVisibleChange,
      "popper-class": [this.ns.b("popper"), this.semanticClass("editor.popup"), this.ns.is("allow-create", !this.c.forceSelection)],
      "popper-style": this.semanticStyle("editor.popup"),
      "props": {
        class: this.customNodeClass
      }
    }, this.$attrs), {
      default: (node) => {
        const data = node.data || {};
        const label = data.label || "";
        return withDirectives(createVNode("span", {
          "title": showTitle(isEllipsis ? label : ""),
          "class": [this.ns.e("option-item"), this.semanticClass("editor.popup.item", {
            item: data
          })],
          "style": this.semanticStyle("editor.popup.item", {
            item: data
          })
        }, [createVNode("span", {
          "class": this.ns.em("option-item", "label")
        }, [label])]), [[resolveDirective("child-class"), this.getPopupItemChildClass({
          item: data
        })], [resolveDirective("child-style"), this.getPopupItemChildStyle({
          item: data
        })]]);
      }
    }), [[resolveDirective("child-class"), this.getItemChildClass()], [resolveDirective("child-style"), this.getItemChildStyle()]]) : withDirectives(createVNode(resolveComponent("el-select"), mergeProps({
      "ref": "editorRef",
      "modelValue": this.curValue,
      "onUpdate:modelValue": ($event) => this.curValue = $event,
      "clearable": true,
      "class": [this.ns.b("select"), this.ns.e("content"), this.semanticClass("editor.content")],
      "style": this.semanticStyle("editor.content"),
      "filterable": true,
      "teleported": !this.showFormDefaultContent,
      "multiple": this.c.multiple,
      "allow-create": !this.c.forceSelection,
      "placeholder": this.c.placeHolder ? this.c.placeHolder : " ",
      "disabled": this.disabled,
      "loading": this.isLoading,
      "fit-input-width": isEllipsis,
      "popper-class": [this.ns.b("popper"), this.c.editorParams.type === "round" ? this.ns.bm("popper", "round") : "", this.semanticClass("editor.popup"), this.ns.bm("popper", "".concat(this.c.model.id))],
      "popper-style": this.semanticStyle("editor.popup"),
      "onBlur": this.onBlur,
      "onFocus": this.onFocus,
      "onKeyup": this.handleKeyUp,
      "onVisibleChange": this.onVisibleChange
    }, this.$attrs), {
      default: () => {
        return this.items.map((item) => {
          var _a;
          return withDirectives(createVNode(resolveComponent("el-option"), {
            "key": item.value,
            "value": (_a = item.value) == null ? void 0 : _a.toString(),
            "label": item.text,
            "disabled": item.disableSelect === true,
            "style": [item.bkcolor ? this.ns.cssVarBlock({
              "select-option-item-bkcolor": "".concat(item.bkcolor)
            }) : "", this.semanticStyle("editor.popup.item", {
              item
            })],
            "class": [item.cls ? item.cls : null, this.ns.e("option-item"), this.semanticClass("editor.popup.item", {
              item
            })],
            "title": showTitle(isEllipsis ? item.text : "")
          }, {
            default: () => {
              return createVNode("div", {
                "class": [this.ns.b("select-option-content"), item.textCls ? item.textCls : null],
                "style": item.color ? this.ns.cssVarBlock({
                  "select-option-item-color": "".concat(item.color)
                }) : ""
              }, [item.sysImage && createVNode(resolveComponent("iBizIcon"), {
                "class": this.ns.em("option-item", "icon"),
                "icon": item.sysImage
              }, null), createVNode("span", {
                "class": [isEllipsis && this.ns.be("select-option-content", "text"), this.ns.em("option-item", "label")]
              }, [item.text])]);
            }
          }), [[resolveDirective("child-class"), this.getPopupItemChildClass({
            item
          })], [resolveDirective("child-style"), this.getPopupItemChildStyle({
            item
          })]]);
        });
      },
      ...this.prefix
    }), [[resolveDirective("child-class"), this.getItemChildClass()], [resolveDirective("child-style"), this.getItemChildStyle()]]);
    const readonlyContent = this.valueText.split(this.valueSeparator).map((text) => {
      const codeListItem = this.getCodeListItem(text);
      return withDirectives(createVNode("span", {
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
      }, [(codeListItem == null ? void 0 : codeListItem.sysImage) && createVNode(resolveComponent("iBizIcon"), {
        "class": this.ns.em("item", "icon"),
        "icon": codeListItem.sysImage
      }, null), createVNode("span", {
        "class": [this.ns.em("item", "label"), this.ns.be("readonly-text-item", "label")]
      }, [text])]), [[resolveDirective("child-class"), this.getItemChildClass({
        item: codeListItem
      })], [resolveDirective("child-style"), this.getItemChildStyle({
        item: codeListItem
      })]]);
    });
    const formDefaultContent = createVNode("div", {
      "class": [this.ns.e("content"), this.ns.b("form-default-content"), this.semanticClass("editor.content"), this.ns.is("multiple", this.c.multiple)],
      "style": this.semanticStyle("editor.content")
    }, [this.valueText ? this.valueText.split(this.valueSeparator).map((text) => {
      const codeListItem = this.getCodeListItem(text);
      return withDirectives(createVNode("span", {
        "class": [this.ns.e("item"), codeListItem == null ? void 0 : codeListItem.textCls, this.ns.b("content-item"), this.semanticClass("editor.item", {
          item: codeListItem
        })],
        "style": [(codeListItem == null ? void 0 : codeListItem.color) || (codeListItem == null ? void 0 : codeListItem.bkcolor) ? this.ns.cssVarBlock({
          "select-option-item-color": "".concat(codeListItem.color || ""),
          "select-option-item-bkcolor": "".concat((this.c.editorParams.type === "round" ? codeListItem.bkcolor : "") || "")
        }) : "", this.semanticStyle("editor.item", {
          item: codeListItem
        })]
      }, [createVNode("span", {
        "class": [this.ns.be("content-item", "label"), this.ns.em("item", "label")]
      }, [text])]), [[resolveDirective("child-class"), this.getItemChildClass({
        item: codeListItem
      })], [resolveDirective("child-style"), this.getItemChildStyle({
        item: codeListItem
      })]]);
    }) : createVNode(resolveComponent("iBizEditorEmptyText"), {
      "class": [this.ns.e("content"), this.semanticClass("editor.content")],
      "style": this.semanticStyle("editor.content"),
      "showPlaceholder": this.c.emptyShowPlaceholder,
      "placeHolder": this.c.placeHolder
    }, null)]);
    const hiddenInput = createVNode("input", {
      "type": "text",
      "readonly": true,
      "ref": "hiddenInputRef",
      "class": this.ns.e("hidden-input"),
      "onKeyup": this.handleKeyUp
    }, null);
    return createVNode("div", {
      "class": [this.ns.b(), this.semanticClass("editor.root"), this.disabled ? this.ns.m("disabled") : "", this.readonly ? this.ns.m("readonly") : "", this.ns.is("editable", this.isEditable), this.ns.is("show-default", this.showFormDefaultContent), this.c.editorParams.type === "round" && this.ns.m("round")],
      "style": {
        ...this.cssVars,
        ...this.semanticStyle("editor.root")
      }
    }, [this.showFormDefaultContent && formDefaultContent, this.readonly ? readonlyContent : editContent, this.readonly ? null : hiddenInput]);
  }
});

export { IBizDropdown };
