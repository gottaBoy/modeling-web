'use strict';

var vue = require('vue');
var vue3Util = require('@ibiz-template/vue3-util');
var qs = require('qs');
var core = require('@ibiz-template/core');
var ramda = require('ramda');
require('./data-import2.css');
var runtime = require('@ibiz-template/runtime');

"use strict";
function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !vue.isVNode(s);
}
const DataImport2 = /* @__PURE__ */ vue.defineComponent({
  name: "DataImport2",
  props: {
    dismiss: {
      type: Function,
      required: true
    },
    appDataEntity: {
      type: Object,
      required: true
    },
    dataImport: {
      type: Object,
      required: false
    },
    context: {
      type: Object,
      required: false
    },
    params: {
      type: Object,
      required: false
    }
  },
  setup(props) {
    const ns = vue3Util.useNamespace("data-import2");
    const isLoading = vue.ref(false);
    const onCancelButtonClick = () => {
      props.dismiss();
    };
    const previewinfo = vue.ref([[]]);
    const columnMap = /* @__PURE__ */ new Map();
    const selectValues = vue.ref([]);
    const dataOption = vue.ref([]);
    const dataimport2 = vue.ref();
    const select = vue.ref();
    const fileName = vue.ref("");
    let fileid = "";
    const ColumnMappingSave = vue.ref(true);
    const listValue = vue.ref("");
    const columnMappingListMap = /* @__PURE__ */ new Map();
    const options = vue.ref([]);
    const isNoPersonel = vue.ref(false);
    const dataImport = props.dataImport || runtime.getDefaultDataImport(props.appDataEntity);
    const clearSelect = () => {
      const keys = [...columnMap.keys()];
      keys.forEach((item) => {
        const data = columnMap.get(item);
        const cloneData = ramda.clone(data);
        if (data && cloneData) {
          cloneData.name = "";
          columnMap.set(item, cloneData);
          selectValues.value[data.index] = "";
        }
      });
    };
    const watchValue = async (listvalue) => {
      if (listvalue) {
        const columnData = columnMappingListMap.get(listvalue);
        if (!columnData) {
          return;
        }
        let columnMapData = columnData.fields;
        if (!columnData.fields) {
          const res = await runtime.getImportSchema(columnData.id, props.context);
          if (res.status === 200 && res.data) {
            columnMapData = res.data.fields;
          }
          columnData.fields = res.data.fields;
          columnMappingListMap.set(listvalue, columnData);
        }
        if (columnData.owner_type !== "" && columnData.owner_type !== "PERSONAL") {
          isNoPersonel.value = true;
        }
        const keys = [...columnMap.keys()];
        const captionMap = /* @__PURE__ */ new Map();
        clearSelect();
        keys.forEach((item) => {
          const columnMapValue = columnMap.get(item);
          const lastIndex = item.lastIndexOf("-");
          const itemName = item.substring(0, lastIndex);
          let index = captionMap.get(itemName);
          if (!index) {
            captionMap.set(itemName, 0);
            index = 0;
          }
          const filteredObjects = columnMapData && columnMapData.filter((columnitem) => columnitem.caption === itemName);
          const newColumnValue = filteredObjects && filteredObjects[index];
          if (newColumnValue) {
            const dataOptionValue = dataOption.value.find((dataOptionItem) => dataOptionItem.id === newColumnValue.name);
            if (dataOptionValue && columnMapValue) {
              captionMap.set(itemName, index + 1);
              newColumnValue.index = columnMapValue.index;
              columnMap.set(item, newColumnValue);
              selectValues.value[newColumnValue.index] = newColumnValue.name;
            }
          }
        });
      } else {
        clearSelect();
      }
    };
    vue.watch(listValue, (newValue, _oldValue) => {
      watchValue(newValue);
    });
    const onButtonColumnMappingImportClick = async () => {
      const string = selectValues.value.join("");
      if (string === "") {
        ibiz.message.warning(ibiz.i18n.t("component.dataImport2.atLastOne"));
        return;
      }
      if (previewinfo.value[0].length) {
        ColumnMappingSave.value = true;
        const columnMapArr = [...columnMap.values()];
        const fields = columnMapArr.filter((columnitem) => columnitem.name !== "");
        const data = {
          name: "".concat(fileName.value.split(".")[0], "|").concat((/* @__PURE__ */ new Date()).toLocaleString()),
          // 导入模式名称 按照导入的名称|时间来生成
          fields
          // 导入模式属性 {name:'',order_value:1}
        };
        if (props.params) {
          Object.assign(data, props.params);
        }
        if (listValue.value) {
          const columnData = columnMappingListMap.get(listValue.value);
          if (columnData) {
            data.name = columnData.name;
            data.id = columnData.id;
          }
          const resput = await runtime.updateImportSchema({
            appDataEntity: props.appDataEntity,
            dataImport,
            data,
            context: props.context
          });
          if (resput.status === 200 && resput.ok) {
            columnMappingListMap.set(listValue.value, resput.data);
          }
        } else {
          options.value.push({
            value: data.name,
            label: data.name,
            oldLabel: data.name,
            edit: true,
            checkmark: false,
            close: false
          });
          const res = await runtime.createImportSchema({
            appDataEntity: props.appDataEntity,
            dataImport,
            data,
            context: props.context
          });
          if (res.status === 200 && res.ok) {
            columnMappingListMap.set(data.name, res.data);
          }
          listValue.value = data.name;
        }
      } else {
        ibiz.message.warning(ibiz.i18n.t("component.dataImport2.uploadPlease"));
      }
    };
    const onButtonImportClick = async () => {
      if (previewinfo.value[0].length) {
        if (listValue.value && ColumnMappingSave.value) {
          const data = columnMappingListMap.get(listValue.value);
          let id = "";
          if (data) {
            id = data.id;
          }
          await runtime.asyncImportData2({
            appDataEntity: props.appDataEntity,
            dataImport,
            fileId: fileid,
            schemaId: id,
            context: props.context
          });
          onCancelButtonClick();
        } else {
          await onButtonColumnMappingImportClick();
          await onButtonImportClick();
        }
      } else {
        ibiz.message.warning(ibiz.i18n.t("component.dataImport2.uploadPlease"));
      }
    };
    const findDialog = (el) => {
      const regex = /\bel-dialog\b/;
      if (!regex.test(el.className)) {
        if (el.parentElement) {
          findDialog(el.parentElement);
        }
      } else {
        el.style.maxWidth = "calc(100% - 100px)";
      }
    };
    const columnMappingListQuery = async () => {
      const res = await runtime.fetchImportSchemas({
        appDataEntity: props.appDataEntity,
        dataImport,
        context: props.context
      });
      if (res.status === 200 && res.data) {
        res.data.forEach((item) => {
          options.value.push({
            value: item.name,
            label: item.name,
            oldLabel: item.name,
            edit: true,
            checkmark: false,
            close: false
          });
          columnMappingListMap.set(item.name, item);
        });
      }
    };
    vue.onMounted(() => {
      if (dataImport && dataImport.dedataImportItems) {
        dataOption.value = dataImport.dedataImportItems;
      } else if (props.appDataEntity.appDEFields) {
        dataOption.value = props.appDataEntity.appDEFields;
      }
      if (dataimport2.value && dataimport2.value.parentElement) {
        findDialog(dataimport2.value.parentElement);
      }
      columnMappingListQuery();
    });
    const uploadHeaders = ibiz.util.file.getUploadHeaders();
    const headers = vue.ref({
      ...uploadHeaders
    });
    const UploadUrl = vue.computed(() => {
      let uploadFileUrl;
      if (ibiz.env.uploadFileUrl.indexOf("{cat}") !== -1) {
        uploadFileUrl = ibiz.env.uploadFileUrl.replace("/{cat}", "/temp");
      } else {
        uploadFileUrl = "".concat(ibiz.env.uploadFileUrl, "/temp");
      }
      let uploadUrl = "".concat(ibiz.env.baseUrl, "/").concat(ibiz.env.appId).concat(uploadFileUrl);
      uploadUrl += qs.stringify({
        preview: true
      }, {
        addQueryPrefix: true
      });
      return uploadUrl;
    });
    const beforeUpload = () => {
      isLoading.value = true;
    };
    const onSuccess = (response, _file, _fileList) => {
      fileName.value = "";
      fileid = "";
      if (response.name) {
        fileName.value = response.name;
      }
      if (response.fileid) {
        fileid = response.fileid;
      }
      if (response.previewinfo) {
        previewinfo.value = JSON.parse(response.previewinfo);
        if (previewinfo.value[0] && previewinfo.value[0].length > 0) {
          const firstArrayLength = previewinfo.value[0].length;
          for (let i = 1; i < previewinfo.value.length; i++) {
            const currentArray = previewinfo.value[i];
            const currentArrayLength = currentArray.length;
            if (currentArrayLength < firstArrayLength) {
              const diff = firstArrayLength - currentArrayLength;
              for (let j = 0; j < diff; j++) {
                currentArray.push("");
              }
            }
          }
          columnMap.clear();
          previewinfo.value[0].forEach((item, index) => {
            columnMap.set("".concat(item, "-").concat(index), {
              name: "",
              index,
              caption: item
            });
            selectValues.value[index] = "";
          });
        }
      }
      isLoading.value = false;
      watchValue(listValue.value);
    };
    const columnMappingSaveChange = (data) => {
      ColumnMappingSave.value = data;
    };
    const selectValuesChange = (index, item) => {
      selectValues.value[index] = item;
    };
    const columnMapChange = (key, data) => {
      columnMap.set(key, data);
    };
    const listValueChange = (data) => {
      listValue.value = data;
    };
    const columnMappingListMapChange = (key, data) => {
      if (data) {
        columnMappingListMap.set(key, data);
      } else {
        columnMappingListMap.delete(key);
      }
    };
    const optionsChange = (str, data) => {
      if (data) {
        const index = options.value.findIndex((obj) => obj.label === str);
        const optionValue = options.value[index];
        Object.keys(data).forEach((key) => {
          optionValue[key] = data[key];
        });
      } else {
        const index = options.value.findIndex((obj) => obj.label === str);
        if (index !== -1) {
          options.value.splice(index, 1);
        }
      }
    };
    return {
      ns,
      onButtonColumnMappingImportClick,
      onButtonImportClick,
      onCancelButtonClick,
      isLoading,
      UploadUrl,
      headers,
      onSuccess,
      previewinfo,
      selectValues,
      beforeUpload,
      dataimport2,
      listValue,
      options,
      select,
      isNoPersonel,
      fileName,
      dataOption,
      ColumnMappingSave,
      columnMap,
      columnMappingSaveChange,
      selectValuesChange,
      columnMapChange,
      columnMappingListMap,
      listValueChange,
      columnMappingListMapChange,
      optionsChange
    };
  },
  render() {
    let _slot, _slot2;
    return vue.withDirectives(vue.createVNode("div", {
      "class": [this.ns.b(), "ibiz-view"],
      "ref": "dataimport2"
    }, [vue.createVNode("div", {
      "class": [this.ns.e("data-import2-toolbar"), "ibiz-panel-view-header"]
    }, [vue.createVNode("div", {
      "class": [this.ns.e("caption")]
    }, [vue.createVNode("div", {
      "class": "ibiz-panel-container"
    }, [vue.createVNode("div", {
      "class": "ibiz-control-captionbar"
    }, [vue.createVNode("div", {
      "class": "ibiz-control-captionbar-caption"
    }, [ibiz.i18n.t("component.dataImport.importData")])])])]), vue.createVNode("div", {
      "class": [this.ns.e("data-import2-toolbar-container"), "ibiz-panel-container--view_header_right"]
    }, [vue.createVNode("div", {
      "class": "ibiz-panel-container"
    }, [vue.createVNode("div", {
      "class": "ibiz-control-toolbar"
    }, [vue.createVNode("div", {
      "class": "ibiz-control-toolbar__item"
    }, [this.fileName ? ibiz.i18n.t("component.dataImport2.fileName", {
      fileName: this.fileName
    }) : ""]), this.previewinfo[0] && this.previewinfo[0].length ? vue.createVNode(vue.resolveComponent("data-import2-select"), {
      "previewinfo": this.previewinfo,
      "options": this.options,
      "columnMappingListMap": this.columnMappingListMap,
      "listValue": this.listValue,
      "context": this.context,
      "onListValueChange": this.listValueChange,
      "onColumnMappingListMapChange": this.columnMappingListMapChange,
      "onOptionsChange": this.optionsChange
    }, null) : "", this.previewinfo[0] && this.previewinfo[0].length ? vue.createVNode("div", {
      "class": "ibiz-control-toolbar__item"
    }, [vue.createVNode(vue.resolveComponent("el-button"), {
      "onClick": this.onButtonColumnMappingImportClick,
      "disabled": this.isNoPersonel
    }, _isSlot(_slot = ibiz.i18n.t("component.dataImport2.saveMode")) ? _slot : {
      default: () => [_slot]
    })]) : "", vue.createVNode(vue.resolveComponent("el-upload"), {
      "class": "ibiz-control-toolbar__item",
      "action": this.UploadUrl,
      "headers": this.headers,
      "data": this.params,
      "show-file-list": false,
      "onSuccess": this.onSuccess,
      "before-upload": this.beforeUpload
    }, {
      default: () => [vue.createVNode(vue.resolveComponent("el-button"), null, {
        default: () => [this.previewinfo[0] && this.previewinfo[0].length ? ibiz.i18n.t("component.dataImport2.reUpload") : ibiz.i18n.t("component.dataImport2.fileUpload")]
      })]
    }), this.previewinfo[0] && this.previewinfo[0].length ? vue.createVNode("div", {
      "class": "ibiz-control-toolbar__item"
    }, [vue.createVNode(vue.resolveComponent("el-button"), {
      "onClick": this.onButtonImportClick,
      "disabled": !this.selectValues.join(""),
      "title": core.showTitle(!this.selectValues.join("") ? ibiz.i18n.t("component.dataImport2.selectProperties") : "")
    }, _isSlot(_slot2 = ibiz.i18n.t("component.dataImport2.import")) ? _slot2 : {
      default: () => [_slot2]
    })]) : ""])])])]), vue.createVNode(vue.resolveComponent("data-import2-table"), {
      "previewinfo": this.previewinfo,
      "selectValues": this.selectValues,
      "dataOption": this.dataOption,
      "columnMappingSave": this.ColumnMappingSave,
      "columnMap": this.columnMap,
      "onSelectValuesChange": this.selectValuesChange,
      "onColumnMappingSaveChange": this.columnMappingSaveChange,
      "onColumnMapChange": this.columnMapChange
    }, null)]), [[vue.resolveDirective("loading"), this.isLoading]]);
  }
});

exports.DataImport2 = DataImport2;
