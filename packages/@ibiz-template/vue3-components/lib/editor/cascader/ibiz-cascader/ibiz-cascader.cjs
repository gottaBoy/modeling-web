'use strict';

var vue = require('vue');
var vue3Util = require('@ibiz-template/vue3-util');
require('./ibiz-cascader.css');
var ramda = require('ramda');
var runtime = require('@ibiz-template/runtime');

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
    const editorModel = c.model;
    const treeRef = vue.ref(null);
    const valueItems = vue.ref([]);
    const editorItems = editorModel.editorItems;
    if (editorItems && editorItems.length > 0) {
      const editorItemNames = editorItems.map((item) => {
        return {
          name: item.id,
          appId: item.appId,
          appDataEntityId: item.appDataEntityId,
          appDEDataSetId: item.appDEDataSetId
        };
      });
      valueItems.value = editorItemNames;
    }
    let editorStyle = "default";
    let size = "default";
    let filterable = true;
    let multiple = false;
    let separator = "/";
    if (editorModel.editorParams) {
      if (editorModel.editorParams.editorStyle) {
        editorStyle = editorModel.editorParams.editorStyle;
      }
      if (editorModel.editorParams.size) {
        size = editorModel.editorParams.size;
      }
      if (editorModel.editorParams.filterable) {
        filterable = c.toBoolean(editorModel.editorParams.filterable);
      }
      if (editorModel.editorParams.multiple) {
        multiple = c.toBoolean(editorModel.editorParams.multiple);
      }
      if (editorModel.editorParams.separator) {
        separator = editorModel.editorParams.separator;
      }
    }
    const treeData = vue.ref([]);
    const items = vue.ref([]);
    const selectValue = vue.ref(null);
    const treeSelectData = vue.ref([]);
    const valueItemData = vue.ref([]);
    const defaultCheckedKeys = vue.ref([]);
    const searchValue = vue.ref("");
    const isLoaded = vue.ref(false);
    const getSize = () => {
      switch (size) {
        case "large":
          return "large";
        case "small":
          return "small";
        default:
          return "default";
      }
    };
    const getIsLeaf = (data, _node) => {
      return data.leaf;
    };
    const getDisabled = (_data, node) => {
      return node.level !== valueItems.value.length;
    };
    const isEditable = vue.ref(false);
    const editorRef = vue.ref();
    const showFormDefaultContent = vue.computed(() => {
      if (props.controlParams && props.controlParams.editmode === "hover" && !props.readonly) {
        return true;
      }
      return false;
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
    const handleSelectData = () => {
      if (props.value && valueItems.value) {
        const tempTreeSelectData = [];
        const values = JSON.parse(props.value);
        values.forEach((label) => {
          tempTreeSelectData.push({
            label,
            value: []
          });
        });
        valueItemData.value.forEach((valueItem) => {
          const value = props.data[valueItem.name] ? props.data[valueItem.name].split(",") : [];
          valueItem.value = value;
        });
        treeSelectData.value = [];
        tempTreeSelectData.forEach((select, index) => {
          valueItemData.value.forEach((valueItem) => {
            select.value.push(valueItem.value[index]);
          });
          const value = select.value.join(separator);
          treeSelectData.value.push({
            label: select.label,
            value
          });
        });
        treeSelectData.value.forEach((select) => {
          const _values = select.value.split(separator);
          const _labels = select.label.split(separator);
          _values.forEach((value, index) => {
            const item = items.value.find((_item) => _item.value === value);
            if (!item) {
              items.value.push({
                value,
                label: _labels[index]
              });
            }
          });
        });
        if (Object.is(editorStyle, "default")) {
          let tempSelectValue = [];
          if (!multiple) {
            tempSelectValue = treeSelectData.value[0].value.split(separator);
          } else {
            treeSelectData.value.forEach((select) => {
              tempSelectValue.push(select.value.split(separator));
            });
          }
          selectValue.value = tempSelectValue;
        } else {
          if (multiple) {
            selectValue.value = values;
          } else {
            selectValue.value = values.join(separator);
          }
          const tempDefaultCheckedKeys = valueItemData.value[valueItemData.value.length - 1].value;
          if (valueItemData.value.length > 1) {
            const parentKays = valueItemData.value[valueItemData.value.length - 2].value;
            if (parentKays && parentKays.length > 0) {
              parentKays.forEach((parent, index) => {
                tempDefaultCheckedKeys[index] = "".concat(parent, "_").concat(tempDefaultCheckedKeys[index]);
              });
            }
          }
          defaultCheckedKeys.value = tempDefaultCheckedKeys;
        }
      }
    };
    if (valueItems.value && valueItems.value.length > 0) {
      valueItems.value.forEach((valueItem) => {
        valueItemData.value.push({
          name: valueItem.name,
          value: []
        });
      });
    }
    const handleQueryParams = async (index, value) => {
      const context = ramda.clone(c.context);
      const params = ramda.clone(c.params);
      if (index > 0) {
        const valueItem = valueItems.value[index - 1];
        Object.assign(context, {
          [runtime.calcDeCodeNameById(valueItem.appDataEntityId)]: value
        });
        const appDataEntity = await ibiz.hub.getAppDataEntity(valueItem.appDataEntityId, valueItem.appId);
        Object.assign(params, {
          ["n_".concat(appDataEntity.keyAppDEFieldId.toLowerCase(), "_eq")]: value
        });
      }
      return {
        context,
        params
      };
    };
    const fillTreeData = (node, curNodes) => {
      const {
        level,
        value
      } = node;
      isLoaded.value = true;
      let tempNodes = [];
      if (level === 0) {
        handleSelectData();
        if (treeData.value.length > 0) {
          curNodes.forEach((child) => {
            const index = treeData.value.findIndex((_node) => child.value === _node.value);
            if (index > -1) {
              Object.assign(treeData.value[index], child);
            } else {
              treeData.value.push(child);
              tempNodes.push(child);
            }
          });
        } else {
          treeData.value = [...curNodes];
          tempNodes = [...curNodes];
        }
      } else {
        const getTreeData = (nodes, parentKey) => {
          if (nodes && nodes.length > 0) {
            nodes.forEach((_node) => {
              if (_node.value === value) {
                if (_node.children && _node.children.length > 0) {
                  curNodes.forEach((childNode) => {
                    const index = _node.children.findIndex((child) => child.value === childNode.value);
                    if (index > -1) {
                      Object.assign(_node.children[index], childNode);
                    } else {
                      _node.children.push(childNode);
                      tempNodes.push(childNode);
                    }
                  });
                } else {
                  _node.children = curNodes;
                  tempNodes = curNodes;
                }
              } else {
                getTreeData(_node.children, parentKey);
              }
            });
          }
        };
        getTreeData(treeData.value, value);
      }
      const tempSelectValue = selectValue.value || [];
      setTimeout(() => {
        selectValue.value = tempSelectValue;
        isLoaded.value = false;
      });
      return tempNodes;
    };
    const loadData = async (node, resolve) => {
      const {
        level
      } = node;
      const value = Object.is(editorStyle, "default") ? node.value : node.data ? node.data.value : null;
      const valueItem = valueItems.value[level];
      try {
        if (valueItem.appDataEntityId && valueItem.appDEDataSetId) {
          const {
            context,
            params
          } = await handleQueryParams(level, value);
          const app = ibiz.hub.getApp(c.context.srfappid);
          const response = await app.deService.exec(valueItem.appDataEntityId, valueItem.appDEDataSetId, context, params);
          if (response && response.status === 200 && response.data.length > 0) {
            const nodes = response.data.map((item, index) => ({
              ...item,
              value: item.srfkey,
              label: item.srfmajortext ? item.srfmajortext : ibiz.i18n.t("editor.cascader.ibizCascader.title", {
                index
              }),
              leaf: level === valueItems.value.length - 1,
              nodekey: "".concat(value ? "".concat(value, "_").concat(item.srfkey) : item.srfkey)
            }));
            nodes.forEach((_node) => {
              const index = items.value.findIndex((item) => _node.value === item.value);
              if (index > -1) {
                items.value[index] = _node;
              } else {
                items.value.push(_node);
              }
            });
            if (Object.is(editorStyle, "default")) {
              const tempNodes = fillTreeData(node, nodes);
              resolve(tempNodes);
            } else {
              resolve(nodes);
            }
          }
        }
        resolve([]);
      } catch (error) {
        console.log(valueItem, "\u67E5\u8BE2\u6570\u636E\u96C6\u5931\u8D25");
        resolve([]);
      }
    };
    const handleTreeValueChange = () => {
      const tempSelectValue = [];
      selectValue.value = [];
      treeSelectData.value.forEach((item) => {
        tempSelectValue.push(item.label);
      });
      if (multiple) {
        selectValue.value = tempSelectValue;
      } else {
        selectValue.value = tempSelectValue.length > 0 ? tempSelectValue[0] : null;
      }
      valueItemData.value.forEach((valueItem) => {
        emit("change", valueItem.value.length > 0 ? valueItem.value.join(",") : null, valueItem.name);
      });
      emit("change", selectValue.value.length > 0 ? JSON.stringify(selectValue.value) : null);
    };
    const handleTreeClear = () => {
      treeSelectData.value = [];
      valueItemData.value.forEach((valueItem) => {
        valueItem.value = [];
      });
      if (treeRef.value) {
        treeRef.value.setCheckedKeys([]);
      }
      handleTreeValueChange();
    };
    const handleCascaderValueChange = () => {
      var _a, _b;
      if (!isLoaded.value) {
        valueItemData.value.forEach((valueItem) => {
          valueItem.value = [];
        });
        if ((_a = selectValue.value) == null ? void 0 : _a.length) {
          selectValue.value.forEach((item, index) => {
            if (typeof item === "string") {
              valueItemData.value[index].value.push(item);
            } else {
              item.forEach((_item, _index) => {
                valueItemData.value[_index].value.push(_item);
              });
            }
          });
        }
        const curSelectPath = [];
        let curSelectText = [];
        if ((_b = selectValue.value) == null ? void 0 : _b.length) {
          selectValue.value.forEach((selected) => {
            if (multiple) {
              const selectItems = selected.map(
                // eslint-disable-next-line array-callback-return
                (select) => {
                  const selectItem = items.value.find((item) => item.value === select);
                  if (selectItem) {
                    return selectItem.label;
                  }
                }
              );
              curSelectPath.push(selectItems);
            } else {
              const selectItem = items.value.find((item) => item.value === selected);
              if (selectItem) {
                curSelectPath.push(selectItem.label);
              }
            }
          });
        }
        valueItemData.value.forEach((valueItem) => {
          emit("change", valueItem.value.length > 0 ? valueItem.value.join(",") : null, valueItem.name);
        });
        if (curSelectPath.length > 0) {
          if (multiple) {
            curSelectPath.forEach((path) => {
              curSelectText.push(path.join(separator));
            });
          } else {
            curSelectText = [curSelectPath.join(separator)];
          }
        }
        emit("change", curSelectText.length > 0 ? JSON.stringify(curSelectText) : null);
        setEditable(false);
      }
    };
    const handleRemoveTag = () => {
      setTimeout(() => {
        handleCascaderValueChange();
      });
    };
    const onBlur = (e) => {
      emit("blur", e);
      setEditable(false);
    };
    const onFocus = (e) => {
      emit("focus", e);
      setEditable(true);
    };
    const valueText = vue.computed(() => {
      if (props.value) {
        const values = JSON.parse(props.value);
        return values[0];
      }
      return null;
    });
    const handleKeyUp = (e) => {
      if (e && e.code === "Enter") {
        emit("enter", e);
      }
    };
    return {
      ns,
      c,
      valueItems,
      editorStyle,
      filterable,
      separator,
      onBlur,
      onFocus,
      treeData,
      items,
      selectValue,
      treeSelectData,
      valueItemData,
      defaultCheckedKeys,
      searchValue,
      isLoaded,
      getSize,
      getIsLeaf,
      getDisabled,
      loadData,
      treeRef,
      handleTreeClear,
      handleRemoveTag,
      multiple,
      handleCascaderValueChange,
      editorRef,
      valueText,
      isEditable,
      setEditable,
      showFormDefaultContent,
      handleKeyUp
    };
  },
  render() {
    const editContent = vue.createVNode(vue.resolveComponent("el-cascader"), vue.mergeProps({
      "ref": "editorRef",
      "class": [this.ns.b("input")],
      "popper-class": this.ns.b("popper"),
      "clearable": true,
      "teleported": !this.showFormDefaultContent,
      "options": this.treeData,
      "size": this.getSize(),
      "separator": this.separator,
      "filterable": this.filterable,
      "placeholder": this.c.placeHolder ? this.c.placeHolder : " ",
      "props": {
        lazy: true,
        multiple: this.multiple,
        lazyLoad: this.loadData
      },
      "disable": this.disabled,
      "modelValue": this.selectValue,
      "onUpdate:modelValue": ($event) => this.selectValue = $event,
      "onBlur": this.onBlur,
      "onFocus": this.onFocus,
      "onRemoveTag": this.handleRemoveTag,
      "onChange": this.handleCascaderValueChange
    }, this.$attrs), null);
    const readonlyContent = vue.createVNode("div", {
      "class": (this.ns.b(), this.ns.m("readonly"))
    }, [this.valueText]);
    const formDefaultContent = vue.createVNode("div", {
      "class": this.ns.b("form-default-content")
    }, [this.valueText ? this.valueText : ibiz.config.common.emptyText]);
    return vue.createVNode("div", {
      "class": [this.ns.b(), this.disabled ? this.ns.m("disabled") : "", this.readonly ? this.ns.m("readonly") : "", this.ns.is("editable", this.isEditable), this.ns.is("show-default", this.showFormDefaultContent)],
      "onKeyup": this.handleKeyUp
    }, [this.showFormDefaultContent && formDefaultContent, this.readonly ? readonlyContent : editContent]);
  }
});

exports.IBizCascader = IBizCascader;
