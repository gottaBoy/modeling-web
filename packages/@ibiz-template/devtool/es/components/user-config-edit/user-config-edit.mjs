import { reactive, watch, ref, createTextVNode, createVNode, defineComponent } from 'vue';
import { useNamespace } from '@ibiz-template/vue3-util';
import './user-config-edit.css';

"use strict";
const UserConfigEdit = /* @__PURE__ */ defineComponent({
  name: "DevToolUserConfigEdit",
  props: {
    userConfig: {
      type: Object,
      required: true
    }
  },
  emits: {
    change: (_data) => true
  },
  setup(props, {
    emit
  }) {
    const ns = useNamespace("user-config-edit");
    const formData = reactive({
      ...props.userConfig
    });
    watch(() => formData, () => {
      emit("change", formData);
    }, {
      deep: true
    });
    const changeValue = (event) => {
      const value = event.target.value;
      formData.studioBaseUrl = value;
    };
    const isFocus = ref(false);
    const changeMode = (event) => {
      const value = event.target.checked;
      formData.v9Mode = value;
    };
    return {
      ns,
      formData,
      changeValue,
      changeMode,
      isFocus
    };
  },
  render() {
    return createVNode("div", {
      "class": [this.ns.b()]
    }, [createVNode("div", {
      "class": this.ns.e("wrapper")
    }, [createVNode("span", {
      "class": this.ns.e("wrapper-title")
    }, [createTextVNode("\u5E73\u53F0\u5730\u5740")]), createVNode("input", {
      "class": [this.ns.e("wrapper-input"), this.isFocus ? "focus" : ""],
      "type": "text",
      "value": this.formData.studioBaseUrl,
      "onInput": (event) => this.changeValue(event),
      "onBlur": () => {
        this.isFocus = false;
      },
      "onFocus": () => {
        this.isFocus = true;
      }
    }, null)]), createVNode("div", {
      "class": this.ns.e("wrapper")
    }, [createVNode("span", {
      "class": this.ns.e("wrapper-title")
    }, [createTextVNode("V9\u6A21\u5F0F")]), createVNode("label", {
      "class": [this.ns.e("wrapper-switch")]
    }, [createVNode("input", {
      "type": "checkbox",
      "value": this.formData.v9Mode,
      "checked": this.formData.v9Mode === true,
      "onChange": (event) => this.changeMode(event)
    }, null), createVNode("span", {
      "class": "slider"
    }, null)])])]);
  }
});

export { UserConfigEdit, UserConfigEdit as default };
