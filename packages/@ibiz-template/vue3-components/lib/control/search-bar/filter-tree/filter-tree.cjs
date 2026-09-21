'use strict';

var vue = require('vue');
var runtime = require('@ibiz-template/runtime');
var vue3Util = require('@ibiz-template/vue3-util');
require('./filter-tree.css');
var qxUtil = require('qx-util');

"use strict";
function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !vue.isVNode(s);
}
const FilterModes = [{
  valueOP: runtime.ValueOP.EQ,
  label: "\u7B49\u4E8E(=)"
}, {
  valueOP: runtime.ValueOP.NOT_EQ,
  label: "\u4E0D\u7B49\u4E8E(<>)"
}, {
  valueOP: runtime.ValueOP.GT,
  label: "\u5927\u4E8E(>)"
}, {
  valueOP: runtime.ValueOP.GT_AND_EQ,
  label: "\u5927\u4E8E\u7B49\u4E8E(>=)"
}, {
  valueOP: runtime.ValueOP.LT,
  label: "\u5C0F\u4E8E(<)"
}, {
  valueOP: runtime.ValueOP.LT_AND_EQ,
  label: "\u5C0F\u4E8E\u7B49\u4E8E(<=)"
}, {
  valueOP: runtime.ValueOP.IS_NULL,
  label: "\u503C\u4E3A\u7A7A(Nil)"
}, {
  valueOP: runtime.ValueOP.IS_NOT_NULL,
  label: "\u503C\u4E0D\u4E3A\u7A7A(NotNil)"
}, {
  valueOP: runtime.ValueOP.IN,
  label: "\u503C\u5728\u8303\u56F4\u4E2D(In)"
}, {
  valueOP: runtime.ValueOP.NOT_IN,
  label: "\u503C\u4E0D\u5728\u8303\u56F4\u4E2D(NotIn)"
}, {
  valueOP: runtime.ValueOP.LIKE,
  label: "\u6587\u672C\u5305\u542B(%)"
}, {
  valueOP: runtime.ValueOP.LIFT_LIKE,
  label: "\u6587\u672C\u5DE6\u5305\u542B(%#)"
}, {
  valueOP: runtime.ValueOP.RIGHT_LIKE,
  label: "\u6587\u672C\u53F3\u5305\u542B(#%)"
}, {
  valueOP: runtime.ValueOP.EXISTS,
  label: "\u5B58\u5728(EXISTS)"
}, {
  valueOP: runtime.ValueOP.NOT_EXISTS,
  label: "\u4E0D\u5B58\u5728(NOTEXISTS)"
}];
const ExcludeOPs = [runtime.ValueOP.IS_NULL, runtime.ValueOP.IS_NOT_NULL, runtime.ValueOP.EXISTS, runtime.ValueOP.NOT_EXISTS];
const FilterTreeControl = /* @__PURE__ */ vue.defineComponent({
  name: "IBizFilterTreeControl",
  props: {
    /**
     * 过滤项控制器集合
     */
    filterControllers: {
      type: Array,
      required: true
    },
    /**
     * 过滤项树节点数据集合
     */
    filterNodes: {
      type: Array,
      required: true
    },
    /**
     * 父容器
     */
    parent: {
      type: String,
      required: true
    },
    filterMode: {
      type: String,
      default: "default"
    },
    customCond: {
      type: String,
      default: ""
    },
    context: {
      type: Object
    },
    params: {
      type: Object
    },
    schemaEntityMap: {
      type: Object,
      default: () => /* @__PURE__ */ new Map()
    }
  },
  emits: ["confirm", "cancel", "change", "customCondChange"],
  setup(props, {
    emit
  }) {
    const ns = vue3Util.useNamespace("filter-tree");
    const isInSearchBar = vue.computed(() => {
      return props.parent === "search-bar";
    });
    const UiFilterNodes = vue.computed(() => {
      return props.filterNodes;
    });
    const findFilterController = (node) => {
      if (node.nodeType === "ITEMS" && node.simple) {
        const subNode = node.children[0];
        return props.filterControllers.find((item) => {
          if (item.type === "SIMPLE_ITEMS") {
            const simpleC = item;
            if (simpleC.fieldName === node.field && simpleC.valueOP === node.valueOP && simpleC.subFieldName === subNode.field && simpleC.subValueOP === subNode.valueOP) {
              return true;
            }
          }
          return false;
        });
      }
      const {
        field,
        valueOP
      } = node;
      return props.filterControllers.find((item) => {
        if (item.type === "SIMPLE_ITEMS") {
          return false;
        }
        if (item.fieldName === field) {
          return item.valueOP ? item.valueOP === valueOP : true;
        }
        return false;
      });
    };
    const allFields = [];
    props.filterControllers.forEach((filterC) => {
      let find = allFields.find((x) => x.name === filterC.key);
      if (filterC.hidden) {
        return;
      }
      if (find === void 0) {
        find = {
          name: filterC.key,
          fieldName: filterC.fieldName,
          label: filterC.label,
          valueOPs: []
        };
        if (filterC.type === "SIMPLE_ITEMS") {
          find.simpleFilterC = filterC;
        }
        allFields.push(find);
      }
      if (!filterC.valueOP) {
        find.valueOPs = FilterModes.map((item) => item.valueOP);
      } else {
        find.valueOPs.push(filterC.valueOP);
      }
    });
    const schemaFields = vue.ref([]);
    allFields.forEach(async (field) => {
      var _a, _b;
      const filterController = props.filterControllers.find((item) => item.key === field.name);
      if (!filterController) {
        return;
      }
      schemaFields.value.push({
        appDEFieldId: field.fieldName,
        caption: field.label,
        valueOPs: field.valueOPs,
        appDataEntityId: props.schemaEntityMap.get(field.fieldName),
        appDataEntityFullTag: (_a = filterController.appDataEntity) == null ? void 0 : _a.defullTag,
        appCodeListId: (_b = filterController.model.editor) == null ? void 0 : _b.appCodeListId
      });
    });
    const pqlEditor = vue.ref();
    const mode = vue.ref(props.filterMode || "default");
    const currentCustomCond = vue.ref("");
    const handleCustomCondChange = (value) => {
      currentCustomCond.value = value;
      emit("customCondChange", currentCustomCond.value);
    };
    vue.watch(() => props.customCond, () => {
      currentCustomCond.value = props.customCond;
    }, {
      immediate: true
    });
    const getFilterModes = (fieldName, fieldInfos = allFields) => {
      if (!fieldName) {
        return;
      }
      const field = fieldInfos.find((item) => item.name === fieldName);
      if (!field) {
        return;
      }
      return field.valueOPs;
    };
    const onFieldSelect = (node, key, fields = allFields) => {
      const fieldInfo = fields.find((item) => item.name === key);
      if (!fieldInfo) {
        ibiz.log.error("allFields\u627E\u4E0D\u5230\u5C5E\u6027\u6807\u8BC6\u4E3A".concat(key, "\u7684"));
        return;
      }
      qxUtil.clearAll(node);
      if (fieldInfo.simpleFilterC) {
        fieldInfo.simpleFilterC.addSimpleFilterNode(node);
        return;
      }
      node.nodeType = "FIELD";
      node.field = fieldInfo.fieldName;
    };
    const onValueOPSelect = (node, valueOP) => {
      node.valueOP = valueOP;
      node.value = null;
      if (["EXISTS", "NOTEXISTS"].includes(valueOP)) {
        Object.assign(node, {
          nodeType: "ITEMS",
          children: [{
            nodeType: "FIELD",
            field: null,
            valueOP: null,
            value: null
          }]
        });
      } else {
        Object.assign(node, {
          nodeType: "FIELD",
          children: void 0
        });
      }
    };
    const onGroupLogicTypeChange = (node, logicType) => {
      node.logicType = logicType;
    };
    const addGroup = (node) => {
      node.children.push({
        nodeType: "GROUP",
        logicType: "AND",
        children: [{
          nodeType: "FIELD",
          field: null,
          valueOP: null,
          value: null
        }]
      });
    };
    const addItem = (node) => {
      node.children.push({
        nodeType: "FIELD",
        field: null,
        valueOP: null,
        value: null
      });
    };
    const renderEditor = (node, filterC) => {
      if (filterC.noEditor || node.valueOP && ExcludeOPs.includes(node.valueOP)) {
        return null;
      }
      let editor = null;
      if (filterC.editorProvider) {
        const {
          data,
          value
        } = filterC.calcEditorProps(node);
        const component = vue.resolveComponent(filterC.editorProvider.formEditor);
        editor = vue.h(component, {
          key: filterC.editor.model.id,
          value,
          controller: filterC.editor,
          disabled: node.disabled,
          data,
          onChange: (val, name) => {
            filterC.onEditorChange(node, val, name);
          }
        });
      } else {
        editor = vue.createVNode(vue.resolveComponent("not-supported-editor"), {
          "modelData": filterC.model.editor
        }, null);
      }
      return vue.createVNode("div", {
        "class": ns.e("editor")
      }, [editor]);
    };
    const renderFilterItem = (node, itemsC) => {
      if (node.hidden) {
        return;
      }
      let fieldInfos = allFields;
      if (itemsC) {
        fieldInfos = itemsC.allFields;
      }
      const availableModes = getFilterModes(node.field, fieldInfos);
      let editor = null;
      if (node.field && node.valueOP) {
        if (itemsC) {
          const subFilterC = itemsC.getSubFilterController(node.field, node.valueOP);
          editor = renderEditor(node, subFilterC);
        } else {
          const filterC = findFilterController(node);
          if (filterC && !["EXISTS", "NOTEXISTS"].includes(filterC.valueOP)) {
            editor = renderEditor(node, filterC);
          }
        }
      }
      return vue.createVNode("div", {
        "class": ns.b("item")
      }, [vue.createVNode(vue.resolveComponent("el-select"), {
        "disabled": node.disabled,
        "model-value": node.field,
        "teleported": false,
        "class": ns.e("field-select"),
        "onChange": (field) => {
          onFieldSelect(node, field, fieldInfos);
        }
      }, {
        default: () => [fieldInfos == null ? void 0 : fieldInfos.map((field) => {
          return vue.createVNode(vue.resolveComponent("el-option"), {
            "key": field.name,
            "value": field.name,
            "label": field.label
          }, null);
        })]
      }), availableModes && availableModes.length > 0 && vue.createVNode(vue.resolveComponent("iBizFilterModeSelect"), {
        "disabled": node.disabled,
        "class": ns.e("mode-select"),
        "value": node.valueOP,
        "modes": availableModes,
        "onChange": (valueOP) => {
          onValueOPSelect(node, valueOP);
        }
      }, null), editor]);
    };
    let renderFilterItems = (_node) => vue.createVNode("div", null, null);
    const renderFilterGroup = (node, itemsC, root) => {
      if (node.hidden) {
        return;
      }
      if (node.nodeType === "ITEMS") {
        return renderFilterItems(node);
      }
      return vue.createVNode("div", {
        "class": ns.b("group")
      }, [vue.createVNode("div", {
        "class": ns.be("group", "actions")
      }, [vue.createVNode(vue.resolveComponent("el-button"), {
        "text": true,
        "type": "primary",
        "onClick": () => {
          if (mode.value === "pql") {
            mode.value = "default";
            return;
          }
          addGroup(node);
        }
      }, {
        default: () => [mode.value === "pql" ? "\u5207\u6362\u7EC4" : "\u6DFB\u52A0\u7EC4"]
      }), vue.createVNode(vue.resolveComponent("el-button"), {
        "text": true,
        "onClick": () => {
          if (mode.value === "pql") {
            mode.value = "default";
            return;
          }
          addItem(node);
        }
      }, {
        default: () => [mode.value === "pql" ? "\u5207\u6362\u9879" : "\u6DFB\u52A0\u9879"]
      }), root && isInSearchBar.value && vue.createVNode(vue.resolveComponent("el-button"), {
        "text": true,
        "onClick": () => {
          mode.value = "pql";
        }
      }, {
        default: () => [vue.createTextVNode("\u6DFB\u52A0PQL")]
      }), vue.createVNode(vue.resolveComponent("el-select"), {
        "model-value": node.logicType,
        "teleported": false,
        "class": ns.be("group", "logic-type"),
        "onChange": (logicType) => {
          mode.value = "default";
          onGroupLogicTypeChange(node, logicType);
        }
      }, {
        default: () => [vue.createVNode(vue.resolveComponent("el-option"), {
          "key": "AND",
          "value": "AND",
          "label": "AND"
        }, null), vue.createVNode(vue.resolveComponent("el-option"), {
          "key": "OR",
          "value": "OR",
          "label": "OR"
        }, null)]
      })]), mode.value === "pql" && vue.createVNode("div", {
        "class": ns.be("group", "editor")
      }, [vue.createVNode(vue.resolveComponent("iBizPqlEditor"), {
        "ref": "pqlEditor",
        "value": currentCustomCond.value,
        "fields": schemaFields.value,
        "context": props.context,
        "params": props.params,
        "onChange": handleCustomCondChange
      }, null)]), mode.value !== "pql" && vue.createVNode("div", {
        "class": ns.be("group", "list")
      }, [node.children.length > 0 && node.children.map((child, index) => {
        const childContent = child.nodeType === "FIELD" ? renderFilterItem(child, itemsC) : renderFilterGroup(child, itemsC);
        if (!childContent) {
          return null;
        }
        return vue.createVNode("div", {
          "class": ns.be("group", "list-item")
        }, [vue.createVNode("div", {
          "class": ns.be("group", "list-item-left")
        }, [node.logicType]), childContent, vue.createVNode(vue.resolveComponent("iBizIcon"), {
          "class": ns.be("group", "list-item-right"),
          "onClick": () => {
            node.children.splice(index, 1);
          },
          "icon": {
            cssClass: "trash"
          }
        }, null)]);
      })])]);
    };
    renderFilterItems = (node) => {
      let _slot2;
      const itemsC = findFilterController(node);
      if (!itemsC)
        return;
      if (node.simple) {
        let _slot;
        const child = node.children[0];
        if (!child) {
          return;
        }
        return [vue.createVNode(vue.resolveComponent("el-select"), {
          "disabled": child.disabled,
          "model-value": itemsC.key,
          "teleported": false,
          "class": ns.e("field-select"),
          "onChange": (field) => {
            onFieldSelect(node, field);
          }
        }, _isSlot(_slot = allFields.map((field) => {
          return vue.createVNode(vue.resolveComponent("el-option"), {
            "key": field.name,
            "value": field.name,
            "label": field.label
          }, null);
        })) ? _slot : {
          default: () => [_slot]
        }), vue.createVNode(vue.resolveComponent("iBizFilterModeSelect"), {
          "disabled": true,
          "class": ns.e("mode-select"),
          "value": child.valueOP,
          "modes": [child.valueOP]
        }, null), renderEditor(child, itemsC)];
      }
      return vue.createVNode("div", {
        "class": (ns.b("group"), ns.bm("group", "items"))
      }, [vue.createVNode("div", {
        "class": ns.be("group", "actions")
      }, [renderFilterItem(node), vue.createVNode(vue.resolveComponent("el-button"), {
        "text": true,
        "onClick": () => {
          addItem(node);
        }
      }, _isSlot(_slot2 = ibiz.i18n.t("control.searchBar.filterTree.addItem")) ? _slot2 : {
        default: () => [_slot2]
      })]), vue.createVNode("div", {
        "class": ns.be("group", "list")
      }, [node.children.length > 0 && node.children.map((child, index) => {
        const childContent = child.nodeType === "FIELD" ? renderFilterItem(child, itemsC) : renderFilterGroup(child, itemsC);
        return vue.createVNode("div", {
          "class": ns.be("group", "list-item")
        }, [vue.createVNode("div", {
          "class": ns.be("group", "list-item-left")
        }, [vue.createTextVNode("AND")]), childContent, vue.createVNode(vue.resolveComponent("iBizIcon"), {
          "class": ns.be("group", "list-item-right"),
          "onClick": () => {
            node.children.splice(index, 1);
          },
          "icon": {
            cssClass: "trash"
          }
        }, null)]);
      })])]);
    };
    const onConfirm = () => {
      var _a, _b;
      if (mode.value === "pql") {
        if (pqlEditor.value) {
          const result = (_b = (_a = pqlEditor.value).verify) == null ? void 0 : _b.call(_a);
          if (result) {
            emit("confirm", mode.value, currentCustomCond.value);
          }
        }
        return;
      }
      emit("confirm", mode.value, currentCustomCond.value);
    };
    const onCancel = () => {
      emit("cancel");
    };
    return {
      ns,
      renderFilterGroup,
      renderFilterItem,
      onConfirm,
      onCancel,
      isInSearchBar,
      UiFilterNodes,
      pqlEditor
    };
  },
  render() {
    let _slot3;
    return vue.createVNode("div", {
      "class": [this.ns.b()]
    }, [this.UiFilterNodes.length > 0 && this.UiFilterNodes.map((node) => {
      if (node.nodeType === "FIELD") {
        return this.renderFilterItem(node);
      }
      return this.renderFilterGroup(node, void 0, true);
    }), vue.createVNode("div", {
      "class": this.ns.b("footer")
    }, [vue.createVNode(vue.resolveComponent("el-button"), {
      "onClick": () => {
        this.onConfirm();
      }
    }, {
      default: () => [this.isInSearchBar ? ibiz.i18n.t("app.search") : ibiz.i18n.t("control.common.determine")]
    }), vue.createVNode(vue.resolveComponent("el-button"), {
      "onClick": () => {
        this.onCancel();
      }
    }, _isSlot(_slot3 = ibiz.i18n.t("app.reset")) ? _slot3 : {
      default: () => [_slot3]
    })])]);
  }
});

exports.ExcludeOPs = ExcludeOPs;
exports.FilterTreeControl = FilterTreeControl;
