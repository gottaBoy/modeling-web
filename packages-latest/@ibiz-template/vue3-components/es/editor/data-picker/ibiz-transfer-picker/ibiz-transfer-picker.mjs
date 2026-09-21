import { defineComponent, withDirectives, createVNode, mergeProps, resolveDirective, ref, watch, computed, onMounted } from 'vue';
import { useNamespace, useSemanticNode, getEditorEmits, getDataPickerProps } from '@ibiz-template/vue3-util';
import { debounce } from '@ibiz-template/core';
import { clone } from 'lodash-es';
import './components/index.mjs';
import './ibiz-transfer-picker.css';
import { TransferSelect } from './components/transfer/transfer.mjs';

"use strict";
const IBizTransferPicker = /* @__PURE__ */ defineComponent({
  name: "IBizTransferPicker",
  props: getDataPickerProps(),
  emits: getEditorEmits(),
  setup(props, {
    emit
  }) {
    const ns = useNamespace("picker");
    const ns2 = useNamespace("transfer-picker");
    const c = props.controller;
    const editorModel = c.model;
    const {
      semanticClass,
      semanticStyle
    } = useSemanticNode(c);
    const childClass = [{
      class: semanticClass("editor.content"),
      selector: ".ibiz-transfer"
    }, {
      class: semanticClass("editor.section"),
      selector: ".ibiz-transfer-panel"
    }, {
      class: semanticClass("editor.actions"),
      selector: ".ibiz-transfer__buttons"
    }, {
      class: semanticClass("editor.actions.item"),
      selector: ".ibiz-transfer__button"
    }, {
      class: semanticClass("editor.header"),
      selector: ".ibiz-transfer-panel__header"
    }, {
      class: semanticClass("editor.title"),
      selector: ".ibiz-transfer-panel__header--title"
    }, {
      class: semanticClass("editor.count"),
      selector: ".ibiz-transfer-panel__header--count"
    }, {
      class: semanticClass("editor.body"),
      selector: ".ibiz-transfer-panel__body"
    }, {
      class: semanticClass("editor.search"),
      selector: ".el-input__inner"
    }, {
      class: semanticClass("editor.search.prefix"),
      selector: ".el-input__prefix"
    }, {
      class: semanticClass("editor.list"),
      selector: ".ibiz-transfer-panel__list"
    }, {
      class: semanticClass("editor.item"),
      selector: ".ibiz-transfer-panel__item"
    }, {
      class: semanticClass("editor.item.checkbox"),
      selector: ".ibiz-transfer-panel__item .el-checkbox__inner"
    }, {
      class: semanticClass("editor.item.label"),
      selector: ".ibiz-transfer-panel__item .el-checkbox__label"
    }];
    const childStyle = [{
      class: semanticStyle("editor.content"),
      selector: ".ibiz-transfer"
    }, {
      class: semanticStyle("editor.section"),
      selector: ".ibiz-transfer-panel"
    }, {
      class: semanticStyle("editor.actions"),
      selector: ".ibiz-transfer__buttons"
    }, {
      class: semanticStyle("editor.actions.item"),
      selector: ".ibiz-transfer__button"
    }, {
      class: semanticStyle("editor.header"),
      selector: ".ibiz-transfer-panel__header"
    }, {
      class: semanticStyle("editor.title"),
      selector: ".ibiz-transfer-panel__header--title"
    }, {
      class: semanticStyle("editor.count"),
      selector: ".ibiz-transfer-panel__header--count"
    }, {
      class: semanticStyle("editor.body"),
      selector: ".ibiz-transfer-panel__body"
    }, {
      class: semanticStyle("editor.search"),
      selector: ".el-input__inner"
    }, {
      class: semanticStyle("editor.search.prefix"),
      selector: ".el-input__prefix"
    }, {
      class: semanticStyle("editor.list"),
      selector: ".ibiz-transfer-panel__list"
    }, {
      class: semanticStyle("editor.item"),
      selector: ".ibiz-transfer-panel__item"
    }, {
      class: semanticStyle("editor.item.checkbox"),
      selector: ".ibiz-transfer-panel__item .el-checkbox__inner"
    }, {
      class: semanticStyle("editor.item.label"),
      selector: ".ibiz-transfer-panel__item .el-checkbox__label"
    }];
    const curValue = ref([]);
    const items = ref([]);
    const selectItems = ref([]);
    const loading = ref(false);
    const editorRef = ref();
    const curIndexs = ref([]);
    const leftChecked = ref([]);
    const rightChecked = ref([]);
    const rightSelects = ref([]);
    const valueType = c.model.valueType;
    const valueSeparator = c.model.valueSeparator || ",";
    let titles = [ibiz.i18n.t("editor.transferPicker.optionalList"), ibiz.i18n.t("editor.transferPicker.selectedList")];
    let buttonTexts = [ibiz.i18n.t("app.delete"), ibiz.i18n.t("app.add")];
    let enableRemoteSearch = false;
    if (editorModel.editorParams) {
      const {
        editorParams
      } = editorModel;
      if (editorParams.titles) {
        try {
          titles = JSON.parse(editorParams.titles);
        } catch (error) {
          ibiz.log.info(error);
        }
      }
      if (editorParams.buttontexts) {
        try {
          buttonTexts = JSON.parse(editorParams.buttontexts);
        } catch (error) {
          ibiz.log.info(error);
        }
      }
      if (editorParams.remotesearch)
        enableRemoteSearch = editorParams.remotesearch === "true";
    }
    watch(() => props.value, (newVal) => {
      curValue.value = [];
      selectItems.value = [];
      if (newVal) {
        if (valueType === "OBJECTS") {
          newVal.forEach((item) => {
            const _item = clone(item);
            Object.assign(_item, {
              [c.keyName]: item[c.objectIdField],
              [c.textName]: item[c.objectNameField]
            });
            if (c.objectValueField) {
              Object.assign(_item, {
                ...item[c.objectValueField]
              });
              delete _item[c.objectValueField];
            }
            if (_item[c.keyName]) {
              selectItems.value.push(_item);
            }
          });
        } else if (c.objectIdField && valueSeparator) {
          const values = newVal.split(valueSeparator);
          values.forEach((value) => {
            selectItems.value.push({
              [c.keyName]: value
            });
          });
        } else {
          try {
            selectItems.value = JSON.parse(newVal);
          } catch (error) {
            ibiz.log.error("SIMPLE\u7C7B\u578B\u5730\u5740\u680F\u503C\u683C\u5F0F".concat(newVal, "\u4E0D\u7B26\u5408JSON\u5B57\u7B26\u4E32\u8981\u6C42"));
          }
        }
        selectItems.value.forEach((item) => {
          curValue.value.push(item[c.keyName]);
          const index = items.value.findIndex((i) => Object.is(i[c.keyName], item[c.keyName]));
          if (index < 0) {
            items.value.push({
              [c.keyName]: item[c.keyName],
              [c.textName]: item[c.textName]
            });
          }
        });
      }
    }, {
      immediate: true,
      deep: true
    });
    watch(editorRef, (newVal) => {
      if (props.autoFocus && newVal && newVal.focus) {
        newVal.focus();
      }
    });
    const handleRightChange = (result) => {
      const selects = [];
      if (result && Array.isArray(result)) {
        result.forEach((select) => {
          Object.assign(select, {
            [c.keyName]: select[c.keyName] ? select[c.keyName] : select.srfkey,
            [c.textName]: select[c.textName] ? select[c.textName] : select.srfmajortext
          });
          if (valueType === "OBJECTS") {
            selects.push(c.handleObjectParams(select));
          } else if (c.objectIdField) {
            selects.push(select[c.keyName]);
          } else {
            selects.push({
              [c.keyName]: select[c.keyName],
              [c.textName]: select[c.textName]
            });
          }
          const index = items.value.findIndex((item) => Object.is(item[c.keyName], select[c.keyName]));
          if (index < 0) {
            items.value.push(select);
          }
        });
      }
      let value = null;
      if (selects.length > 0) {
        if (valueType === "OBJECTS") {
          value = selects;
        } else {
          value = c.objectIdField ? selects.join(valueSeparator) : JSON.stringify(selects);
        }
      }
      emit("change", value);
    };
    const filterMethod = (query, item) => {
      const textName = item[c.textName];
      return !query || (textName == null ? void 0 : textName.toLowerCase().includes(query == null ? void 0 : query.toLowerCase()));
    };
    const onRightChange = (selectKeys) => {
      const selects = selectKeys.map((key) => {
        const selcetItem = items.value.find((item) => item[c.keyName] === key);
        return selcetItem || {};
      });
      handleRightChange(selects);
    };
    const onLeftCheckChange = (selectKeys) => {
      leftChecked.value = selectKeys;
    };
    const onRightCheckChange = (selectKeys) => {
      rightChecked.value = selectKeys;
    };
    const getServiceData = async (query) => {
      let data = [];
      if (c.model.appDataEntityId) {
        try {
          const trimQuery = query.trim();
          const res = await c.getServiceData(trimQuery, props.data);
          if (res) {
            data = res.data;
          }
        } catch (error) {
          ibiz.log.error(error);
        }
      }
      return data;
    };
    const onSearch = async (...args) => {
      rightSelects.value = items.value.filter((item) => !!selectItems.value.find((item2) => item2[c.keyName] === item[c.keyName]));
      const query = args[0] || "";
      loading.value = true;
      const data = await getServiceData(query);
      if (data) {
        items.value = [...rightSelects.value, ...data.filter((item) => !rightSelects.value.find((item2) => item2[c.keyName] === item[c.keyName]))];
      }
      rightChecked.value = [...rightChecked.value];
      leftChecked.value = [...leftChecked.value];
      loading.value = false;
    };
    const debounceSearch = debounce(onSearch, 1e3);
    const onLeftAcSearch = (query) => {
      debounceSearch(query);
    };
    const valueText = computed(() => {
      return selectItems.value.map((item) => {
        return item[c.textName];
      }).join(",");
    });
    watch(valueText, (newVal, oldVal) => {
      if (newVal !== oldVal) {
        emit("infoTextChange", newVal);
      }
    }, {
      immediate: true
    });
    onMounted(() => {
      if (c.objectNameField) {
        items.value = [];
        onSearch("");
      }
    });
    const renderContentItem = (h, option) => {
      return h("span", {
        title: option[c.textName]
      }, option[c.textName]);
    };
    return {
      c,
      ns,
      ns2,
      items,
      titles,
      loading,
      curValue,
      valueText,
      editorRef,
      curIndexs,
      childClass,
      childStyle,
      buttonTexts,
      leftChecked,
      rightChecked,
      semanticClass,
      semanticStyle,
      enableRemoteSearch,
      onSearch,
      filterMethod,
      onRightChange,
      onLeftAcSearch,
      renderContentItem,
      onLeftCheckChange,
      onRightCheckChange
    };
  },
  render() {
    const editContent = withDirectives(createVNode("div", {
      "class": [this.ns.e("autocomplete")]
    }, [createVNode(TransferSelect, mergeProps({
      "ref": "editorRef",
      "modelValue": this.curValue,
      "onUpdate:modelValue": ($event) => this.curValue = $event,
      "data": this.items,
      "readonly": this.readonly || this.disabled,
      "left-default-checked": this.leftChecked,
      "right-default-checked": this.rightChecked,
      "props": {
        key: this.c.keyName,
        label: this.c.textName
      },
      "filterable": true,
      "filter-placeholder": this.c.placeHolder,
      "enableRemoteSearch": this.enableRemoteSearch,
      "titles": this.titles,
      "button-texts": this.buttonTexts,
      "format": {
        noChecked: "${total}",
        hasChecked: "${checked}/${total}"
      },
      "target-order": this.enableRemoteSearch ? "push" : "original",
      "loading": this.loading,
      "filterMethod": this.filterMethod,
      "renderContent": this.renderContentItem,
      "onChange": this.onRightChange,
      "onLeftCheckChange": this.onLeftCheckChange,
      "onRightCheckChange": this.onRightCheckChange,
      "onLeftAcSearch": this.onLeftAcSearch
    }, this.$attrs), null)]), [[resolveDirective("child-class"), this.childClass], [resolveDirective("child-style"), this.childStyle]]);
    return createVNode("div", {
      "style": this.semanticStyle("editor.root"),
      "class": [this.ns.b(), this.ns2.b(), this.semanticClass("editor.root"), this.disabled ? this.ns.m("disabled") : ""]
    }, [editContent]);
  }
});

export { IBizTransferPicker };
