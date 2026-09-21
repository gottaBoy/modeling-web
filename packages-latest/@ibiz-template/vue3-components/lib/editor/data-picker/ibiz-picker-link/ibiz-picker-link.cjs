'use strict';

var vue = require('vue');
var vue3Util = require('@ibiz-template/vue3-util');
var core = require('@ibiz-template/core');
var ramda = require('ramda');
require('./ibiz-picker-link.css');

"use strict";
const IBizPickerLink = /* @__PURE__ */ vue.defineComponent({
  name: "IBizPickerLink",
  props: vue3Util.getDataPickerProps(),
  emits: vue3Util.getEditorEmits(),
  setup(props, {
    emit
  }) {
    const ns = vue3Util.useNamespace("picker-link");
    const c = props.controller;
    const {
      semanticClass,
      semanticStyle
    } = vue3Util.useSemanticNode(c);
    const curValue = vue.ref("");
    const items = vue.ref([]);
    const isLoaded = vue.ref(false);
    const {
      useInFocusAndBlur,
      useInValueChange
    } = vue3Util.useAutoFocusBlur(props, emit);
    const onSearch = async (query) => {
      if (c.model.appDataEntityId) {
        let trimQuery = "";
        if (query !== props.value) {
          trimQuery = query.trim();
        }
        const res = await c.getServiceData(trimQuery, props.data);
        if (res) {
          isLoaded.value = true;
          items.value = res.data;
        }
      }
    };
    const showFormDefaultContent = vue.computed(() => {
      if (props.controlParams && props.controlParams.editmode === "hover" && !props.readonly) {
        return true;
      }
      return false;
    });
    vue.watch(() => props.value, (newVal) => {
      if (c.model.valueType === "OBJECT") {
        curValue.value = newVal && c.objectNameField ? newVal[c.objectNameField] : "";
      } else {
        curValue.value = newVal || "";
      }
    }, {
      immediate: true
    });
    vue.onMounted(() => {
      vue.watch(() => props.data[c.valueItem], async (newVal, oldVal) => {
        if (newVal !== oldVal) {
          if (!isLoaded.value && ramda.isNil(props.value) && !ramda.isNil(newVal)) {
            await onSearch("");
          }
          const curItem = items.value.find((item) => Object.is(item[c.keyName], newVal));
          if (curItem) {
            curValue.value = curItem[c.textName];
            if (ramda.isNil(props.value) && !ramda.isNil(newVal)) {
              emit("change", curValue.value, c.model.id, true);
            }
          }
          if (newVal === null) {
            emit("change", null, c.model.id, true);
          }
        }
      }, {
        immediate: true
      });
    });
    const handleOpenViewClose = (data) => {
      const item = {};
      Object.assign(item, data);
      Object.assign(item, {
        [c.keyName]: item[c.keyName] ? item[c.keyName] : item.srfkey,
        [c.textName]: item[c.textName] ? item[c.textName] : item.srfmajortext
      });
      if (c.valueItem) {
        emit("change", item[c.keyName], c.valueItem);
      }
      if (c.model.valueType === "OBJECT") {
        emit("change", c.handleObjectParams(item));
      } else {
        emit("change", data[c.textName]);
      }
      useInValueChange();
    };
    const openLinkView = async () => {
      const res = await c.openLinkView(props.data);
      if (res && res.ok && res.data && res.data.length) {
        handleOpenViewClose(res.data[0]);
      }
    };
    const {
      componentRef: editorRef
    } = vue3Util.useFocusAndBlur(() => emit("focus"), () => useInFocusAndBlur());
    const valueText = vue.computed(() => {
      return vue3Util.renderString(curValue.value);
    });
    vue.watch(valueText, (newVal, oldVal) => {
      if (newVal !== oldVal) {
        emit("infoTextChange", newVal);
      }
    }, {
      immediate: true
    });
    return {
      ns,
      curValue,
      editorRef,
      semanticClass,
      semanticStyle,
      showFormDefaultContent,
      openLinkView
    };
  },
  render() {
    var _a, _b;
    const isEmpty = this.curValue == null || this.curValue === "";
    const isEllipsis = ((_a = this.controller.editorParams) == null ? void 0 : _a.overflowMode) === "ellipsis" || ((_b = this.controller.editorParams) == null ? void 0 : _b.overflowmode) === "ellipsis";
    return vue.createVNode("div", {
      "class": [this.ns.b(), this.semanticClass("editor.root"), this.readonly ? this.ns.m("readonly") : "", this.ns.is("show-default", this.showFormDefaultContent), this.ns.is("empty", isEmpty), this.ns.is("ellipsis", isEllipsis)],
      "style": this.semanticStyle("editor.root"),
      "ref": "editorRef",
      "title": core.showTitle(isEmpty ? "" : this.curValue)
    }, [vue.createVNode("a", {
      "class": [this.ns.e("content"), this.semanticClass("editor.content")],
      "style": this.semanticStyle("editor.content"),
      "onClick": () => {
        if (isEmpty)
          return;
        this.openLinkView();
      }
    }, [isEmpty ? vue.createVNode(vue.resolveComponent("iBizEditorEmptyText"), {
      "showPlaceholder": this.controller.emptyShowPlaceholder,
      "placeHolder": this.controller.placeHolder
    }, null) : this.curValue])]);
  }
});

exports.IBizPickerLink = IBizPickerLink;
