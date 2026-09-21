'use strict';

var vue = require('vue');
var vue3Util = require('@ibiz-template/vue3-util');
var qxUtil = require('qx-util');
var runtime = require('@ibiz-template/runtime');
require('./custom-filter-condition.css');

"use strict";
function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !vue.isVNode(s);
}
const IBizCustomFilterCondition = /* @__PURE__ */ vue.defineComponent({
  name: "IBizCustomFilterCondition",
  props: {
    value: {
      type: Object
    },
    context: {
      type: Object,
      required: true
    },
    params: {
      type: Object
    },
    schemaFields: {
      type: Array,
      default: () => []
    }
  },
  emits: ["change"],
  setup(props, {
    emit
  }) {
    const ns = vue3Util.useNamespace("custom-filter-condition");
    const fields = vue.ref([]);
    const fieldMap = vue.ref(/* @__PURE__ */ new Map());
    const items = vue.ref([]);
    const initItemEditor = async (item) => {
      item.editorProvider = void 0;
      item.editor = void 0;
      const field = fieldMap.value.get(item.field);
      if (!field || !item.valueOP || !props.context) {
        return;
      }
      const editorModel = ibiz.util.jsonSchema.getMockEditor(props.context, field, item.valueOP);
      if (!editorModel) {
        return;
      }
      const editorProvider = await runtime.getEditorProvider(editorModel);
      if (editorProvider) {
        item.editorProvider = editorProvider;
        const editorController = await editorProvider.createController(editorModel, {
          context: props.context,
          params: props.params
        });
        item.editor = editorController;
      }
    };
    const transformValue = async () => {
      if (!props.value) {
        items.value = [];
        return;
      }
      const conditionList = props.value.searchconds;
      if (Array.isArray(conditionList) && conditionList.length) {
        items.value = await Promise.all(conditionList.map(async (condition) => {
          const field = condition.fieldname || "";
          const valueOP = condition.condop || "";
          const value = condition.value;
          const item = {
            key: qxUtil.createUUID(),
            field,
            valueOP,
            value
          };
          await initItemEditor(item);
          return item;
        }));
        return;
      }
      items.value = [];
    };
    const init = async () => {
      if (Array.isArray(props.schemaFields)) {
        fields.value = props.schemaFields.map((item) => {
          return {
            ...item,
            valueOPs: item.type ? ibiz.util.jsonSchema.getValueOPsByDataType(item.type) : []
          };
        });
        fields.value.forEach((item) => {
          fieldMap.value.set(item.appDEFieldId, item);
        });
        await transformValue();
      }
    };
    vue.watch(() => props.schemaFields, () => {
      init();
    }, {
      immediate: true
    });
    vue.watch(() => props.value, () => {
      transformValue();
    }, {
      immediate: true
    });
    const handleValueChange = () => {
      if (!items.value.length) {
        emit("change", void 0);
        return;
      }
      const searchconds = {
        condop: "AND",
        condtype: "GROUP",
        searchconds: []
      };
      items.value.forEach((item) => {
        searchconds.searchconds.push({
          condtype: "DEFIELD",
          fieldname: item.field,
          condop: item.valueOP,
          value: item.value
        });
      });
      emit("change", searchconds);
    };
    const handleAdd = async () => {
      var _a, _b, _c, _d;
      let filterItem = fields.value;
      if (items.value.length) {
        const set = /* @__PURE__ */ new Set();
        items.value.forEach((condition) => {
          set.add(condition.field);
        });
        filterItem = fields.value.filter((field) => !set.has(field.appDEFieldId));
        if (!filterItem.length) {
          filterItem = fields.value;
        }
      }
      const item = {
        key: qxUtil.createUUID(),
        field: ((_a = filterItem[0]) == null ? void 0 : _a.appDEFieldId) || "",
        valueOP: ((_d = (_c = (_b = filterItem[0]) == null ? void 0 : _b.valueOPs) == null ? void 0 : _c[0]) == null ? void 0 : _d.valueOP) || ""
      };
      await initItemEditor(item);
      items.value.push(item);
      handleValueChange();
    };
    const handleRemove = (index) => {
      items.value.splice(index, 1);
      handleValueChange();
    };
    const renderEditor = (item) => {
      if (!item.valueOP) {
        return null;
      }
      if (item.editorProvider && item.editor) {
        const component = vue.resolveComponent(item.editorProvider.formEditor);
        return vue.h(component, {
          value: item.value,
          controller: item.editor,
          data: {},
          onChange: (val) => {
            item.value = val;
            handleValueChange();
          }
        });
      }
    };
    const handleFieldChange = async (item) => {
      var _a, _b;
      const field = fieldMap.value.get(item.field);
      item.valueOP = ((_b = (_a = field == null ? void 0 : field.valueOPs) == null ? void 0 : _a[0]) == null ? void 0 : _b.valueOP) || "";
      item.value = void 0;
      await initItemEditor(item);
      handleValueChange();
    };
    const handleValueOPChange = async (item) => {
      item.value = void 0;
      await initItemEditor(item);
      handleValueChange();
    };
    return {
      ns,
      fields,
      fieldMap,
      items,
      handleAdd,
      handleRemove,
      renderEditor,
      handleFieldChange,
      handleValueOPChange
    };
  },
  render() {
    return vue.createVNode("div", {
      "class": this.ns.b()
    }, [vue.createVNode("div", {
      "class": this.ns.b("content")
    }, [this.items.map((item, i) => {
      let _slot;
      return vue.createVNode("div", {
        "class": this.ns.b("item")
      }, [vue.createVNode("div", {
        "class": this.ns.b("item-header")
      }, [vue.createVNode("div", {
        "class": this.ns.b("item-header-text")
      }, [vue.createTextVNode("\u67E5\u8BE2\u6761\u4EF6("), i + 1, vue.createTextVNode(")")]), vue.createVNode("div", {
        "class": this.ns.b("item-header-btn"),
        "onClick": () => this.handleRemove(i)
      }, [vue.createVNode("svg", {
        "viewBox": "0 0 16 16",
        "xmlns": "http://www.w3.org/2000/svg",
        "height": "1em",
        "width": "1em",
        "preserveAspectRatio": "xMidYMid meet",
        "focusable": "false"
      }, [vue.createVNode("g", {
        "stroke-width": "1",
        "fill-rule": "evenodd"
      }, [vue.createVNode("path", {
        "d": "M4.002 3.403V1a1 1 0 0 1 1-1h6.003a1 1 0 0 1 1 1v2.403h3.396a.6.6 0 1 1 0 1.2h-1.395V15a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4.603H.6a.6.6 0 1 1 0-1.2h3.4zm8.804 1.205H3.2V14.8h9.605V4.608zM5.202 1.2v2.155h5.603V1.2H5.202zm.6 6.417a.6.6 0 0 1 1.201 0v4.758a.6.6 0 0 1-1.2 0V7.617zm3.202 0a.6.6 0 0 1 1.2 0v4.758a.6.6 0 0 1-1.2 0V7.617z"
      }, null)])])])]), vue.createVNode("div", {
        "class": this.ns.b("item-content")
      }, [vue.createVNode("div", {
        "class": this.ns.be("item", "field")
      }, [vue.createVNode(vue.resolveComponent("el-select"), {
        "modelValue": item.field,
        "onUpdate:modelValue": ($event) => item.field = $event,
        "onChange": () => {
          this.handleFieldChange(item);
        }
      }, _isSlot(_slot = this.fields.map((field) => {
        return vue.createVNode(vue.resolveComponent("el-option"), {
          "key": field.appDEFieldId,
          "value": field.appDEFieldId,
          "label": field.caption
        }, null);
      })) ? _slot : {
        default: () => [_slot]
      })]), vue.createVNode("div", {
        "class": this.ns.be("item", "valueOP")
      }, [vue.createVNode(vue.resolveComponent("el-select"), {
        "modelValue": item.valueOP,
        "onUpdate:modelValue": ($event) => item.valueOP = $event,
        "onChange": () => {
          this.handleValueOPChange(item);
        }
      }, {
        default: () => {
          var _a, _b;
          return [(_b = (_a = this.fieldMap.get(item.field)) == null ? void 0 : _a.valueOPs) == null ? void 0 : _b.map((op) => {
            return vue.createVNode(vue.resolveComponent("el-option"), {
              "key": op.valueOP,
              "value": op.valueOP,
              "label": op.label
            }, null);
          })];
        }
      })]), vue.createVNode("div", {
        "class": this.ns.be("item", "editor")
      }, [this.renderEditor(item)])])]);
    })]), vue.createVNode("div", {
      "class": this.ns.b("footer")
    }, [vue.createVNode("div", {
      "class": this.ns.b("footer-btn"),
      "onClick": this.handleAdd
    }, [vue.createVNode("svg", {
      "class": this.ns.be("footer-btn", "icon"),
      "viewBox": "0 0 16 16",
      "xmlns": "http://www.w3.org/2000/svg",
      "height": "1em",
      "width": "1em",
      "preserveAspectRatio": "xMidYMid meet",
      "focusable": "false"
    }, [vue.createVNode("g", {
      "stroke-width": "1",
      "fill-rule": "evenodd"
    }, [vue.createVNode("path", {
      "d": "M8.578 7.383V1.602a.601.601 0 1 0-1.2 0v5.781H1.6a.601.601 0 0 0 0 1.203h5.777v5.812a.601.601 0 1 0 1.2 0V8.586H14.4a.601.601 0 0 0 0-1.203H8.578z"
    }, null)])]), vue.createVNode("div", {
      "class": this.ns.be("footer-btn", "text")
    }, [vue.createTextVNode("\u6DFB\u52A0\u67E5\u8BE2\u6761\u4EF6")])])])]);
  }
});

exports.IBizCustomFilterCondition = IBizCustomFilterCondition;
