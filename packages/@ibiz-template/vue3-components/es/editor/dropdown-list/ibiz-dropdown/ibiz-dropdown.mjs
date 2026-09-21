import { defineComponent, ref, computed, watch, nextTick, onMounted, onUnmounted, createVNode, resolveComponent, mergeProps } from 'vue';
import { getDropdownProps, getEditorEmits, useNamespace, useCodeListListen, useClickOutside } from '@ibiz-template/vue3-util';
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
    const ns = useNamespace("dropdown");
    const c = props.controller;
    const items = ref([]);
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
      nodes.forEach((codeItem) => {
        var _a;
        const index = codeListItems.value.findIndex((_item) => {
          return _item.value === codeItem.value;
        });
        if (index === -1) {
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
    const afterLoadCodeList = (codeList) => {
      items.value = [];
      codeListItems.value = [];
      if (c.multiple && !codeList.some((item) => item.children)) {
        codeList = c.handleCodeListAllItems(codeList);
      }
      if (c.blankItemName && !c.multiple) {
        items.value = [{
          value: void 0,
          text: c.blankItemName
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
    const {
      getSelection,
      getSelectionValue
    } = useCodeListSelection(c.allItemsValue);
    const curValue = computed({
      get() {
        var _a, _b;
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
        return props.value || props.value === 0 ? props.value.toString() : "";
      },
      set(_select) {
        let select = _select;
        if (c.blankItemName && !_select) {
          select = void 0;
        }
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
        if (c.editorParams.alwaysLoad === "true") {
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
      if (visible && (!isLoadedCodeList.value || c.editorParams.alwaysLoad === "true")) {
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
          return valueText.value.split(",").map((text) => {
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
      curValue,
      items,
      customNodeClass,
      valueText,
      hasChildren,
      onBlur,
      onFocus,
      editorRef,
      treeNodes,
      cssVars,
      handleKeyUp,
      getCodeListItem,
      isEditable,
      setEditable,
      showFormDefaultContent,
      onVisibleChange,
      isLoading,
      prefix
    };
  },
  render() {
    const overflowMode = this.c.editorParams.overflowMode || ibiz.config.pickerEditor.overflowMode;
    const isEllipsis = overflowMode === "ellipsis";
    const editContent = this.hasChildren ? createVNode(resolveComponent("el-tree-select"), mergeProps({
      "ref": "editorRef",
      "modelValue": this.curValue,
      "onUpdate:modelValue": ($event) => this.curValue = $event,
      "clearable": true,
      "class": [this.ns.b("select")],
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
      "popper-class": "".concat(this.ns.b("popper"), " ").concat(this.ns.is("allow-create", !this.c.forceSelection)),
      "props": {
        class: this.customNodeClass
      }
    }, this.$attrs), {
      default: (node) => {
        const data = node.data || {};
        const label = data.label || "";
        return createVNode("span", {
          "title": showTitle(isEllipsis ? label : "")
        }, [label]);
      }
    }) : createVNode(resolveComponent("el-select"), mergeProps({
      "ref": "editorRef",
      "modelValue": this.curValue,
      "onUpdate:modelValue": ($event) => this.curValue = $event,
      "clearable": true,
      "class": [this.ns.b("select")],
      "filterable": true,
      "teleported": !this.showFormDefaultContent,
      "multiple": this.c.multiple,
      "allow-create": !this.c.forceSelection,
      "placeholder": this.c.placeHolder ? this.c.placeHolder : " ",
      "disabled": this.disabled,
      "loading": this.isLoading,
      "fit-input-width": isEllipsis,
      "popper-class": "".concat(this.ns.b("popper"), " ").concat(this.c.editorParams.type === "round" ? this.ns.bm("popper", "round") : "", " ").concat(this.ns.bm("popper", "".concat(this.c.model.id))),
      "onBlur": this.onBlur,
      "onFocus": this.onFocus,
      "onKeyup": this.handleKeyUp,
      "onVisibleChange": this.onVisibleChange
    }, this.$attrs), {
      default: () => {
        return this.items.map((item) => {
          var _a;
          return createVNode(resolveComponent("el-option"), {
            "key": item.value,
            "value": (_a = item.value) == null ? void 0 : _a.toString(),
            "label": item.text,
            "disabled": item.disableSelect === true,
            "style": item.bkcolor ? this.ns.cssVarBlock({
              "select-option-item-bkcolor": "".concat(item.bkcolor)
            }) : "",
            "class": [item.cls ? item.cls : null],
            "title": showTitle(isEllipsis ? item.text : "")
          }, {
            default: () => {
              return createVNode("div", {
                "class": [this.ns.b("select-option-content"), item.textCls ? item.textCls : null],
                "style": item.color ? this.ns.cssVarBlock({
                  "select-option-item-color": "".concat(item.color)
                }) : ""
              }, [item.sysImage && createVNode(resolveComponent("iBizIcon"), {
                "icon": item.sysImage
              }, null), createVNode("span", {
                "class": [isEllipsis && this.ns.be("select-option-content", "text")]
              }, [item.text])]);
            }
          });
        });
      },
      ...this.prefix
    });
    const readonlyContent = this.valueText.split(",").map((text) => {
      const codeListItem = this.getCodeListItem(text);
      return createVNode("span", {
        "class": [this.ns.b("readonly-text-item"), codeListItem == null ? void 0 : codeListItem.textCls],
        "style": (codeListItem == null ? void 0 : codeListItem.color) || (codeListItem == null ? void 0 : codeListItem.bkcolor) ? this.ns.cssVarBlock({
          "readonly-text-item-color": "".concat(codeListItem.color || ""),
          "select-option-item-color": "".concat(codeListItem.color || ""),
          "select-option-item-bkcolor": "".concat((this.c.editorParams.type === "round" ? codeListItem.bkcolor : "") || "")
        }) : ""
      }, [(codeListItem == null ? void 0 : codeListItem.sysImage) && createVNode(resolveComponent("iBizIcon"), {
        "icon": codeListItem == null ? void 0 : codeListItem.sysImage
      }, null), createVNode("span", {
        "class": this.ns.be("readonly-text-item", "label")
      }, [text])]);
    });
    const formDefaultContent = createVNode("div", {
      "class": [this.ns.b("form-default-content"), this.ns.is("multiple", this.c.multiple)]
    }, [this.valueText ? this.valueText.split(",").map((text) => {
      const codeListItem = this.getCodeListItem(text);
      return createVNode("span", {
        "class": [this.ns.b("content-item"), codeListItem == null ? void 0 : codeListItem.textCls],
        "style": (codeListItem == null ? void 0 : codeListItem.color) || (codeListItem == null ? void 0 : codeListItem.bkcolor) ? this.ns.cssVarBlock({
          "select-option-item-color": "".concat(codeListItem.color || ""),
          "select-option-item-bkcolor": "".concat((this.c.editorParams.type === "round" ? codeListItem.bkcolor : "") || "")
        }) : ""
      }, [createVNode("span", {
        "class": this.ns.be("content-item", "label")
      }, [text])]);
    }) : ibiz.config.common.emptyText]);
    return createVNode("div", {
      "class": [this.ns.b(), this.disabled ? this.ns.m("disabled") : "", this.readonly ? this.ns.m("readonly") : "", this.ns.is("editable", this.isEditable), this.ns.is("show-default", this.showFormDefaultContent), this.c.editorParams.type === "round" && this.ns.m("round")],
      "style": this.cssVars
    }, [this.showFormDefaultContent && formDefaultContent, this.readonly ? readonlyContent : editContent]);
  }
});

export { IBizDropdown };
