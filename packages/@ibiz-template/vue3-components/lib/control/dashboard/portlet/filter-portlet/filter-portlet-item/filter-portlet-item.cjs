'use strict';

var vue = require('vue');
var runtime = require('@ibiz-template/runtime');
var vue3Util = require('@ibiz-template/vue3-util');
require('./filter-portlet-item.css');

"use strict";
function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !vue.isVNode(s);
}
const FilterPortletItem = /* @__PURE__ */ vue.defineComponent({
  name: "IBizFilterPortletItem",
  props: {
    context: {
      type: Object,
      required: true
    },
    params: {
      type: Object,
      required: true
    },
    field: {
      type: Object,
      required: true
    },
    filterNode: {
      type: Object
    }
  },
  emits: ["change"],
  setup(props, {
    emit
  }) {
    const ns = vue3Util.useNamespace("filter-portlet-item");
    const editorProvider = vue.ref(void 0);
    const editor = vue.ref(void 0);
    const data = vue.ref({
      value: null,
      valueOP: null,
      nodeType: "FIELD",
      field: props.field.appDEFieldId
    });
    const valueOPs = vue.computed(() => {
      return ibiz.util.jsonSchema.getValueOPsByDataType(props.field.type);
    });
    const getEditor = async (valueOP) => {
      const editorModel = ibiz.util.jsonSchema.getMockEditor(props.context, props.field, valueOP);
      if (editorModel) {
        editorProvider.value = await runtime.getEditorProvider(editorModel);
        if (editorProvider.value) {
          editor.value = await editorProvider.value.createController(editorModel, {
            context: props.context,
            params: props.params
          });
        }
      }
    };
    const init = async () => {
      if (props.filterNode) {
        data.value = {
          ...props.filterNode
        };
      }
      getEditor(valueOPs.value[0].valueOP);
    };
    vue.watch(() => props.filterNode, () => {
      init();
    }, {
      immediate: true
    });
    const onValueChange = (value) => {
      data.value.value = value;
      emit("change", data.value);
    };
    const onValueOPSelect = (valueOP) => {
      data.value.valueOP = valueOP;
      onValueChange(null);
      getEditor(valueOP);
    };
    const renderEditor = () => {
      if (editor.value) {
        const component = vue.resolveComponent(editorProvider.value.formEditor);
        return vue.h(component, {
          value: data.value.value,
          controller: editor.value,
          onChange: (val, _name) => {
            onValueChange(val);
          }
        });
      }
    };
    const renderContent = () => {
      let _slot;
      return vue.createVNode("div", {
        "class": ns.e("content")
      }, [vue.createVNode("div", {
        "class": ns.em("content", "option")
      }, [vue.createVNode(vue.resolveComponent("el-select"), {
        "model-value": data.value.valueOP,
        "onChange": (valueOP) => {
          onValueOPSelect(valueOP);
        }
      }, _isSlot(_slot = valueOPs.value.map((mode) => {
        return vue.createVNode(vue.resolveComponent("el-option"), {
          "key": mode.valueOP,
          "value": mode.valueOP,
          "label": mode.label
        }, null);
      })) ? _slot : {
        default: () => [_slot]
      })]), vue.createVNode("div", {
        "class": ns.em("content", "editor")
      }, [renderEditor()])]);
    };
    return {
      ns,
      renderContent
    };
  },
  render() {
    return vue.createVNode("div", {
      "class": this.ns.b()
    }, [vue.createVNode("div", {
      "class": this.ns.e("header")
    }, [vue.createVNode("span", {
      "class": this.ns.em("header", "caption")
    }, [this.field.caption])]), this.renderContent()]);
  }
});

exports.FilterPortletItem = FilterPortletItem;
