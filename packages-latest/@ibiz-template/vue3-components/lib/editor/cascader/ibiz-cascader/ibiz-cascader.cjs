'use strict';

var vue = require('vue');
var vue3Util = require('@ibiz-template/vue3-util');
require('./ibiz-cascader.css');

"use strict";
const IBizCascader = /* @__PURE__ */ vue.defineComponent({
  name: "IBizCascader",
  props: vue3Util.getCascaderProps(),
  emits: vue3Util.getEditorEmits(),
  setup(props, {
    emit
  }) {
    const ns = vue3Util.useNamespace("cascader");
    const c = props.controller;
    const {
      semanticClass,
      semanticStyle
    } = vue3Util.useSemanticNode(c);
    const editorModel = c.model;
    const childClass = [{
      class: semanticClass("editor.input"),
      selector: ".el-input__inner"
    }, {
      class: semanticClass("editor.suffix"),
      selector: ".el-input__suffix"
    }, {
      class: semanticClass("editor.item"),
      selector: ".el-tag"
    }, {
      class: semanticClass("editor.item.label"),
      selector: ".el-tag__content"
    }, {
      class: semanticClass("editor.item.remove"),
      selector: ".el-tag__close"
    }];
    const childStyle = [{
      style: semanticStyle("editor.input"),
      selector: ".el-input__inner"
    }, {
      style: semanticStyle("editor.suffix"),
      selector: ".el-input__suffix"
    }, {
      style: semanticStyle("editor.item"),
      selector: ".el-tag"
    }, {
      style: semanticStyle("editor.item.label"),
      selector: ".el-tag__content"
    }, {
      style: semanticStyle("editor.item.remove"),
      selector: ".el-tag__close"
    }];
    const valueItems = editorModel.editorItems || [];
    let editorStyle = "default";
    let size = "default";
    let filterable = true;
    let multiple = false;
    let separator = "/";
    let leafField;
    if (editorModel.editorParams) {
      if (editorModel.editorParams.editorStyle)
        editorStyle = editorModel.editorParams.editorStyle;
      if (editorModel.editorParams.editorstyle)
        editorStyle = editorModel.editorParams.editorstyle;
      if (editorModel.editorParams.size) {
        const _size = editorModel.editorParams.size.toLowerCase();
        size = ["large", "small", "default"].includes(_size) ? _size : "default";
      }
      if (editorModel.editorParams.filterable)
        filterable = c.toBoolean(editorModel.editorParams.filterable);
      if (editorModel.editorParams.multiple)
        multiple = c.toBoolean(editorModel.editorParams.multiple);
      if (editorModel.editorParams.separator)
        separator = editorModel.editorParams.separator;
      if (editorModel.editorParams.leaffield)
        leafField = editorModel.editorParams.leaffield;
    }
    const nodes = vue.ref([]);
    const items = vue.ref([]);
    const selectValue = vue.ref([]);
    const treeSelectData = vue.ref([]);
    const valueItemData = vue.ref(valueItems.map((item) => ({
      name: item.id,
      value: []
    })));
    const isEditable = vue.ref(false);
    const showFormDefaultContent = vue.computed(() => {
      if (props.controlParams && props.controlParams.editmode === "hover" && !props.readonly) {
        return true;
      }
      return false;
    });
    const valueText = vue.computed(() => {
      let value = null;
      try {
        value = props.value ? JSON.parse(props.value) : null;
      } catch (error) {
        ibiz.log.error(error);
      }
      return value;
    });
    const calcDefaultSelect = () => {
      const selectionText = valueText.value || [];
      const pathCount = selectionText.length;
      const levelCount = valueItemData.value.length;
      const pointers = new Array(levelCount).fill(0);
      const result = [];
      for (let i = 0; i < pathCount; i++) {
        const depth = selectionText[i].split(separator).length;
        const path = [];
        for (let level = 0; level < depth; level++) {
          if (level < levelCount && pointers[level] < valueItemData.value[level].value.length) {
            path.push(valueItemData.value[level].value[pointers[level]]);
            pointers[level]++;
          } else {
            console.warn("\u8DEF\u5F84 ".concat(i, " \u7B2C ").concat(level, " \u5C42\u65E0\u5BF9\u5E94 value"));
            break;
          }
        }
        result.push(path);
      }
      multiple ? selectValue.value = result : selectValue.value = result[0];
    };
    vue.watch(() => props.data, (newVal) => {
      if (newVal) {
        valueItemData.value.forEach((valueItem) => {
          var _a;
          valueItem.value = ((_a = newVal[valueItem.name]) == null ? void 0 : _a.split(",")) || [];
        });
        calcDefaultSelect();
      }
    }, {
      immediate: true,
      deep: true
    });
    const setEditable = (flag) => {
      if (flag) {
        isEditable.value = flag;
      } else {
        setTimeout(() => {
          isEditable.value = flag;
        }, 100);
      }
    };
    const handleQueryParams = async (index, value) => {
      const context = c.context.clone();
      const params = {
        ...c.params
      };
      if (index > 0) {
        const {
          appDataEntityId: parentAppDataEntityId
        } = valueItems[index - 1];
        const {
          appId,
          appDataEntityId: childAppDataEntityId
        } = valueItems[index];
        const appDataEntity = await ibiz.hub.getAppDataEntity(childAppDataEntityId, appId);
        const {
          minorAppDERSs
        } = appDataEntity;
        if (minorAppDERSs) {
          const appDeRSs = minorAppDERSs.find((DERSs) => DERSs.majorAppDataEntityId === parentAppDataEntityId);
          if (appDeRSs && appDeRSs.parentAppDEFieldId && value)
            Object.assign(params, {
              ["n_".concat(appDeRSs.parentAppDEFieldId.toLowerCase(), "_eq")]: value
            });
        }
      }
      return {
        context,
        params
      };
    };
    const lazyLoad = async (node, resolve) => {
      const {
        level,
        value
      } = node;
      let children = [];
      try {
        const {
          appDataEntityId,
          appDEDataSetId
        } = valueItems[level];
        if (appDataEntityId && appDEDataSetId) {
          const {
            context,
            params
          } = await handleQueryParams(level, value);
          const app = ibiz.hub.getApp(editorModel.appId);
          const response = await app.deService.exec(appDataEntityId, appDEDataSetId, context, params);
          if (response.ok && Array.isArray(response.data)) {
            children = response.data.map((data) => ({
              data,
              value: data.srfkey,
              label: data.srfmajortext ? data.srfmajortext : ibiz.i18n.t("editor.cascader.title", {
                index: level
              }),
              leaf: level === valueItems.length - 1 || leafField && data[leafField],
              nodekey: "".concat(value ? "".concat(value, "_").concat(data.srfkey) : data.srfkey)
            }));
          }
        }
      } catch (error) {
        ibiz.log.error(error);
      } finally {
        if (editorStyle === "default") {
          if (node.level === 0) {
            resolve([]);
            nodes.value = [...children];
            items.value = [...children];
          } else {
            resolve(children);
            node.data.children = children;
            items.value.push(...children);
          }
        } else {
          resolve([]);
        }
        if (!children.length)
          node.data.leaf = true;
      }
    };
    const handleValueChange = (selections) => {
      valueItemData.value.forEach((valueItem) => {
        valueItem.value = [];
      });
      const isArray2D = Array.isArray(selections) && selections.length > 0 && Array.isArray(selections[0]);
      const normalizedSelections = isArray2D ? selections : [selections];
      const selectionText = [];
      for (const selection of normalizedSelections) {
        valueItemData.value.forEach((valueItem, index) => {
          selection[index] && valueItem.value.push(selection[index]);
        });
        const text = selection.map((select) => {
          const item = items.value.find((i) => i.value === select);
          if (!item)
            return "";
          return item.label;
        }).join(separator);
        if (text)
          selectionText.push(text);
      }
      valueItemData.value.forEach((valueItem) => {
        emit("change", valueItem.value.join(","), valueItem.name);
      });
      emit("change", selectionText.length > 0 ? JSON.stringify(selectionText) : null);
    };
    const onBlur = (e) => {
      emit("blur", e);
      setEditable(false);
    };
    const onFocus = (e) => {
      emit("focus", e);
      setEditable(true);
    };
    const handleKeyUp = (e) => {
      if (e && e.code === "Enter") {
        emit("enter", e);
      }
    };
    return {
      ns,
      c,
      size,
      nodes,
      items,
      multiple,
      valueText,
      separator,
      childClass,
      childStyle,
      isEditable,
      valueItems,
      filterable,
      selectValue,
      semanticClass,
      semanticStyle,
      valueItemData,
      treeSelectData,
      showFormDefaultContent,
      onBlur,
      onFocus,
      lazyLoad,
      setEditable,
      handleKeyUp,
      handleValueChange
    };
  },
  render() {
    const editContent = vue.createVNode(vue.resolveComponent("el-cascader"), vue.mergeProps({
      "clearable": true,
      "size": this.size,
      "options": this.nodes,
      "disabled": this.disabled,
      "separator": this.separator,
      "modelValue": this.selectValue,
      "onUpdate:modelValue": ($event) => this.selectValue = $event,
      "class": [this.ns.b("input"), this.ns.e("content"), this.semanticClass("editor.content")],
      "style": this.semanticStyle("editor.content"),
      "filterable": this.filterable,
      "popper-class": [this.ns.b("popper"), this.semanticClass("editor.popup")],
      "popper-style": this.semanticStyle("editor.popup"),
      "teleported": !this.showFormDefaultContent,
      "placeholder": this.c.placeHolder ? this.c.placeHolder : " ",
      "props": {
        lazy: true,
        multiple: this.multiple,
        lazyLoad: this.lazyLoad
      },
      "onBlur": this.onBlur,
      "onFocus": this.onFocus,
      "onChange": this.handleValueChange
    }, this.$attrs), null);
    const readonlyContent = vue.createVNode("div", {
      "class": [this.ns.b(), this.ns.m("readonly"), this.ns.e("content"), this.semanticClass("editor.content")],
      "style": this.semanticStyle("editor.content")
    }, [this.valueText]);
    const formDefaultContent = vue.createVNode("div", {
      "class": [this.ns.b("form-default-content"), this.ns.e("content"), this.semanticClass("editor.content")],
      "style": this.semanticStyle("editor.content")
    }, [this.valueText ? this.valueText : vue.createVNode(vue.resolveComponent("iBizEditorEmptyText"), {
      "showPlaceholder": this.c.emptyShowPlaceholder,
      "placeHolder": this.c.placeHolder
    }, null)]);
    return vue.withDirectives(vue.createVNode("div", {
      "class": [this.ns.b(), this.semanticClass("editor.root"), this.disabled ? this.ns.m("disabled") : "", this.readonly ? this.ns.m("readonly") : "", this.ns.is("editable", this.isEditable), this.ns.is("show-default", this.showFormDefaultContent)],
      "style": this.semanticStyle("editor.root"),
      "onKeyup": this.handleKeyUp
    }, [this.showFormDefaultContent && formDefaultContent, this.readonly ? readonlyContent : editContent]), [[vue.resolveDirective("child-class"), this.childClass], [vue.resolveDirective("child-style"), this.childStyle]]);
  }
});

exports.IBizCascader = IBizCascader;
