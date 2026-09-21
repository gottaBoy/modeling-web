import { defineComponent, createVNode, resolveComponent, ref, computed, watch, onMounted } from 'vue';
import { useNamespace, useSemanticNode, useAutoFocusBlur, useFocusAndBlur, renderString, getEditorEmits, getDataPickerProps } from '@ibiz-template/vue3-util';
import { showTitle } from '@ibiz-template/core';
import { isNil } from 'ramda';
import './ibiz-picker-link.css';

"use strict";
const IBizPickerLink = /* @__PURE__ */ defineComponent({
  name: "IBizPickerLink",
  props: getDataPickerProps(),
  emits: getEditorEmits(),
  setup(props, {
    emit
  }) {
    const ns = useNamespace("picker-link");
    const c = props.controller;
    const {
      semanticClass,
      semanticStyle
    } = useSemanticNode(c);
    const curValue = ref("");
    const items = ref([]);
    const isLoaded = ref(false);
    const {
      useInFocusAndBlur,
      useInValueChange
    } = useAutoFocusBlur(props, emit);
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
    const showFormDefaultContent = computed(() => {
      if (props.controlParams && props.controlParams.editmode === "hover" && !props.readonly) {
        return true;
      }
      return false;
    });
    watch(() => props.value, (newVal) => {
      if (c.model.valueType === "OBJECT") {
        curValue.value = newVal && c.objectNameField ? newVal[c.objectNameField] : "";
      } else {
        curValue.value = newVal || "";
      }
    }, {
      immediate: true
    });
    onMounted(() => {
      watch(() => props.data[c.valueItem], async (newVal, oldVal) => {
        if (newVal !== oldVal) {
          if (!isLoaded.value && isNil(props.value) && !isNil(newVal)) {
            await onSearch("");
          }
          const curItem = items.value.find((item) => Object.is(item[c.keyName], newVal));
          if (curItem) {
            curValue.value = curItem[c.textName];
            if (isNil(props.value) && !isNil(newVal)) {
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
    } = useFocusAndBlur(() => emit("focus"), () => useInFocusAndBlur());
    const valueText = computed(() => {
      return renderString(curValue.value);
    });
    watch(valueText, (newVal, oldVal) => {
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
    return createVNode("div", {
      "class": [this.ns.b(), this.semanticClass("editor.root"), this.readonly ? this.ns.m("readonly") : "", this.ns.is("show-default", this.showFormDefaultContent), this.ns.is("empty", isEmpty), this.ns.is("ellipsis", isEllipsis)],
      "style": this.semanticStyle("editor.root"),
      "ref": "editorRef",
      "title": showTitle(isEmpty ? "" : this.curValue)
    }, [createVNode("a", {
      "class": [this.ns.e("content"), this.semanticClass("editor.content")],
      "style": this.semanticStyle("editor.content"),
      "onClick": () => {
        if (isEmpty)
          return;
        this.openLinkView();
      }
    }, [isEmpty ? createVNode(resolveComponent("iBizEditorEmptyText"), {
      "showPlaceholder": this.controller.emptyShowPlaceholder,
      "placeHolder": this.controller.placeHolder
    }, null) : this.curValue])]);
  }
});

export { IBizPickerLink };
