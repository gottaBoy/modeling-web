import { isVNode, defineComponent, createVNode, resolveComponent, withDirectives, resolveDirective, ref, watch, onMounted } from 'vue';
import { recursiveIterate } from '@ibiz-template/core';
import { useNamespace, useSemanticNode, useCodeListListen, getEditorEmits, getDropdownProps } from '@ibiz-template/vue3-util';
import { isArray, isString } from 'lodash-es';
import './ibiz-tree-picker.css';

"use strict";
function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !isVNode(s);
}
const IBizTreePicker = /* @__PURE__ */ defineComponent({
  name: "IBizTreePicker",
  props: getDropdownProps(),
  emits: getEditorEmits(),
  setup(props, {
    emit
  }) {
    const ns = useNamespace("tree-picker");
    const c = props.controller;
    const {
      semanticClass,
      semanticStyle
    } = useSemanticNode(c);
    const childClass = [{
      class: semanticClass("editor.toolbar"),
      selector: ".".concat(ns.e("toolbar"))
    }, {
      class: semanticClass("editor.toolbar.item"),
      selector: ".".concat(ns.em("toolbar", "item"))
    }, {
      class: semanticClass("editor.search"),
      selector: ".".concat(ns.em("search", "input"))
    }, {
      class: semanticClass("editor.tree"),
      selector: ".".concat(ns.b("tree"))
    }];
    const childStyle = [{
      style: semanticStyle("editor.toolbar"),
      selector: ".".concat(ns.e("toolbar"))
    }, {
      style: semanticStyle("editor.toolbar.item"),
      selector: ".".concat(ns.em("toolbar", "item"))
    }, {
      style: semanticStyle("editor.search"),
      selector: ".".concat(ns.em("search", "input"))
    }, {
      style: semanticStyle("editor.tree"),
      selector: ".".concat(ns.b("tree"))
    }];
    const editorModel = c.model;
    const items = ref([]);
    const codeListItems = ref([]);
    const isLoadedCodeList = ref(false);
    const treeNodes = ref([]);
    const defaultCheckedKeys = ref([]);
    const isLoading = ref(false);
    const codeItemValueNumber = ref(false);
    const filterText = ref("");
    const treeRef = ref();
    const isCancel = ref(true);
    const allExpand = ref(false);
    const expandedKeys = ref([]);
    const valueSeparator = c.model.valueSeparator || ",";
    let showToolbar = false;
    if (editorModel.editorParams) {
      const {
        editorParams
      } = editorModel;
      if (editorParams.showtoolbar)
        showToolbar = editorParams.showtoolbar === "true";
    }
    const handleExpand = (_key, state) => {
      var _a;
      const treeNode = (_a = treeRef.value) == null ? void 0 : _a.getNode(_key);
      if (treeNode.isLeaf)
        return;
      if (state) {
        treeNode.expand();
      } else {
        treeNode.collapse();
      }
    };
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
    const autoSelectFirstOption = () => {
      const item = items.value[0];
      if (!c.autoSelectFirstOption || props.value || !item)
        return;
      const selections = [];
      recursiveIterate({
        children: [item]
      }, (_item) => {
        selections.push(_item.value);
      }, {
        childrenFields: ["children"]
      });
      emit("change", c.model.valueType === "SIMPLES" ? selections : selections.join(valueSeparator), void 0, true);
    };
    const afterLoadCodeList = (codeList) => {
      items.value = [];
      codeListItems.value = [];
      let tempCodeList = codeList;
      if (c.multiple && !tempCodeList.some((item) => item.children)) {
        tempCodeList = c.handleCodeListAllItems(tempCodeList);
      }
      items.value = tempCodeList;
      for (let i = 0; i < items.value.length; i++) {
        const _item = items.value[i];
        if (_item.children) {
          treeNodes.value = handleTreeNodes(tempCodeList);
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
      if (newVal) {
        let val = [];
        if (!isLoadedCodeList.value && oldVal === void 0) {
          await loadCodeList();
        }
        if (isArray(newVal)) {
          val = newVal;
        } else if (isString(newVal)) {
          val = newVal.split(valueSeparator);
        }
        defaultCheckedKeys.value = val.filter((_key) => codeListItems.value.find((item) => item.value === _key && !item.children));
      }
    }, {
      immediate: true
    });
    const onChange = (values) => {
      let selectArr = null;
      if (c.model.valueType === "SIMPLES") {
        selectArr = values;
      } else {
        selectArr = values.join(valueSeparator);
      }
      emit("change", selectArr);
    };
    const customNodeClass = (data) => {
      return data.children.length ? ns.e("branch-node") : null;
    };
    const fn = (data) => {
      if (data)
        afterLoadCodeList(data);
    };
    useCodeListListen(c.model.appCodeListId, c.context.srfappid, fn);
    onMounted(() => {
      loadCodeList();
    });
    const filterNode = (value, data) => {
      if (!value)
        return true;
      return data.label && data.label.includes(value);
    };
    watch(filterText, (val) => {
      var _a;
      (_a = treeRef.value) == null ? void 0 : _a.filter(val);
    });
    const handleExpandSwitch = (state = true) => {
      codeListItems.value.forEach((item) => {
        if (item.children && item.children.length > 0) {
          handleExpand(item.value, state);
        }
      });
    };
    const onAllExpand = () => {
      allExpand.value = true;
      handleExpandSwitch();
    };
    const onAllCollapse = () => {
      allExpand.value = false;
      handleExpandSwitch(false);
    };
    const onAllSelect = () => {
      var _a, _b;
      const checkedKeys = (_a = codeListItems.value) == null ? void 0 : _a.map((item) => item.value);
      handleExpandSwitch(allExpand.value);
      (_b = treeRef.value) == null ? void 0 : _b.setCheckedKeys(checkedKeys);
      onChange(checkedKeys);
    };
    const onAllCancel = () => {
      var _a;
      handleExpandSwitch(allExpand.value);
      (_a = treeRef.value) == null ? void 0 : _a.setCheckedKeys([]);
      onChange([]);
    };
    const onCheck = (...args) => {
      if (args[1]) {
        const {
          checkedKeys,
          halfCheckedKeys
        } = args[1];
        const combinedKeys = [...halfCheckedKeys, ...checkedKeys];
        const filterArr = combinedKeys.filter((value, index, self) => {
          return self.indexOf(value) === index;
        });
        onChange(filterArr);
      }
    };
    const onNodeExpand = (...args) => {
      if (args[0] && args[0].value) {
        expandedKeys.value.push(args[0].value);
      }
    };
    const onNodeCollapse = (...args) => {
      if (args[0] && args[0].value) {
        const index = expandedKeys.value.findIndex((_key) => args[0].value === _key);
        if (index !== -1) {
          expandedKeys.value.splice(index, 1);
        }
      }
    };
    return {
      ns,
      c,
      items,
      treeRef,
      isCancel,
      treeNodes,
      filterText,
      childClass,
      childStyle,
      showToolbar,
      expandedKeys,
      semanticClass,
      semanticStyle,
      defaultCheckedKeys,
      onCheck,
      filterNode,
      onAllExpand,
      onAllSelect,
      onAllCancel,
      onNodeExpand,
      onAllCollapse,
      onNodeCollapse,
      customNodeClass
    };
  },
  render() {
    const isReadonly = this.readonly || this.disabled;
    const content = [createVNode("div", {
      "class": this.ns.e("search")
    }, [createVNode(resolveComponent("el-input"), {
      "modelValue": this.filterText,
      "onUpdate:modelValue": ($event) => this.filterText = $event,
      "class": this.ns.em("search", "input"),
      "placeholder": this.c.placeHolder || " "
    }, null)]), createVNode("div", {
      "class": [this.ns.e("tree")]
    }, [createVNode(resolveComponent("el-tree"), {
      "ref": "treeRef",
      "class": this.ns.b("tree"),
      "data": this.treeNodes,
      "node-key": "value",
      "props": {
        children: "children",
        label: "label",
        class: this.customNodeClass
      },
      "show-checkbox": !isReadonly,
      "default-checked-keys": this.defaultCheckedKeys,
      "default-expanded-keys": this.expandedKeys,
      "filter-node-method": this.filterNode,
      "onNodeExpand": this.onNodeExpand,
      "onNodeCollapse": this.onNodeCollapse,
      "onCheck": this.onCheck
    }, {
      default: ({
        data
      }) => {
        return createVNode("div", {
          "class": [this.ns.be("tree", "node"), this.semanticClass("editor.tree.node")],
          "style": this.semanticStyle("editor.tree.node")
        }, [data.label]);
      }
    })])];
    if (!isReadonly && this.showToolbar) {
      let _slot, _slot2, _slot3, _slot4;
      content.unshift(...[createVNode("div", {
        "class": [this.ns.e("header"), this.ns.e("toolbar")]
      }, [createVNode(resolveComponent("el-button"), {
        "type": "primary",
        "class": this.ns.em("toolbar", "item"),
        "onClick": this.onAllSelect
      }, _isSlot(_slot = ibiz.i18n.t("editor.treePicker.allowAll")) ? _slot : {
        default: () => [_slot]
      }), createVNode(resolveComponent("el-button"), {
        "type": "primary",
        "class": this.ns.em("toolbar", "item"),
        "onClick": this.onAllCancel
      }, _isSlot(_slot2 = ibiz.i18n.t("editor.treePicker.allProhibited")) ? _slot2 : {
        default: () => [_slot2]
      }), createVNode(resolveComponent("el-button"), {
        "type": "primary",
        "class": this.ns.em("toolbar", "item"),
        "onClick": this.onAllExpand
      }, _isSlot(_slot3 = ibiz.i18n.t("editor.treePicker.expandAll")) ? _slot3 : {
        default: () => [_slot3]
      }), createVNode(resolveComponent("el-button"), {
        "type": "primary",
        "class": this.ns.em("toolbar", "item"),
        "onClick": this.onAllCollapse
      }, _isSlot(_slot4 = ibiz.i18n.t("editor.treePicker.collapseAll")) ? _slot4 : {
        default: () => [_slot4]
      })])]);
    }
    return withDirectives(createVNode("div", {
      "style": this.semanticStyle("editor.root"),
      "class": [this.ns.b(), this.semanticClass("editor.root")]
    }, [content]), [[resolveDirective("child-class"), this.childClass], [resolveDirective("child-style"), this.childStyle]]);
  }
});

export { IBizTreePicker };
