import { isVNode, defineComponent, createVNode, ref, computed, watch, resolveComponent, h } from 'vue';
import { getEditorProvider } from '@ibiz-template/runtime';
import { useNamespace } from '@ibiz-template/vue3-util';
import './filter-portlet-item.css';

"use strict";
function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !isVNode(s);
}
const FilterPortletItem = /* @__PURE__ */ defineComponent({
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
    const ns = useNamespace("filter-portlet-item");
    const editorProvider = ref(void 0);
    const editor = ref(void 0);
    const data = ref({
      value: null,
      valueOP: null,
      nodeType: "FIELD",
      field: props.field.appDEFieldId
    });
    const valueOPs = computed(() => {
      return ibiz.util.jsonSchema.getValueOPsByDataType(props.field.type);
    });
    const getEditor = async (valueOP) => {
      const editorModel = ibiz.util.jsonSchema.getMockEditor(props.context, props.field, valueOP);
      if (editorModel) {
        editorProvider.value = await getEditorProvider(editorModel);
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
    watch(() => props.filterNode, () => {
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
        const component = resolveComponent(editorProvider.value.formEditor);
        return h(component, {
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
      return createVNode("div", {
        "class": ns.e("content")
      }, [createVNode("div", {
        "class": ns.em("content", "option")
      }, [createVNode(resolveComponent("el-select"), {
        "model-value": data.value.valueOP,
        "onChange": (valueOP) => {
          onValueOPSelect(valueOP);
        }
      }, _isSlot(_slot = valueOPs.value.map((mode) => {
        return createVNode(resolveComponent("el-option"), {
          "key": mode.valueOP,
          "value": mode.valueOP,
          "label": mode.label
        }, null);
      })) ? _slot : {
        default: () => [_slot]
      })]), createVNode("div", {
        "class": ns.em("content", "editor")
      }, [renderEditor()])]);
    };
    return {
      ns,
      renderContent
    };
  },
  render() {
    return createVNode("div", {
      "class": this.ns.b()
    }, [createVNode("div", {
      "class": this.ns.e("header")
    }, [createVNode("span", {
      "class": this.ns.em("header", "caption")
    }, [this.field.caption])]), this.renderContent()]);
  }
});

export { FilterPortletItem };
