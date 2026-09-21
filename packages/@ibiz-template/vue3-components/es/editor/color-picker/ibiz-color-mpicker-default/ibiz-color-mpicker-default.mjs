import { defineComponent, ref, computed, watch, createVNode, resolveComponent } from 'vue';
import { useNamespace } from '@ibiz-template/vue3-util';
import './ibiz-color-mpicker-default.css';

"use strict";
const IBizColorMPickerDefault = /* @__PURE__ */ defineComponent({
  name: "IBizColorMPickerDefault",
  props: {
    value: {
      type: [Array, String]
    },
    customColorList: {
      type: String
    },
    type: {
      type: String,
      default: "ITEMS"
    },
    readonly: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  emits: ["change"],
  setup(props, {
    emit
  }) {
    const ns = useNamespace("color-mpicker-default");
    const curType = ref("default");
    const curTemplateColor = ref("");
    const showTemplateList = ref(false);
    const colorType = [{
      text: ibiz.i18n.t("editor.colorPicker.systemColor"),
      value: "default"
    }, {
      text: ibiz.i18n.t("editor.colorPicker.templateColor"),
      value: "template"
    }];
    const templateColorList = computed(() => {
      if (props.customColorList) {
        return JSON.parse(props.customColorList);
      }
      return [{
        text: ibiz.i18n.t("editor.colorPicker.simpleBlue"),
        value: props.type === "ITEM" ? ["#6698FF"] : ["#6698FF", "#73DEB3", "#7585A2", "#F7BE21", "#EE734A", "#83D0EE"]
      }, {
        text: ibiz.i18n.t("editor.colorPicker.autumnOrange"),
        value: props.type === "ITEM" ? ["#EE734A"] : ["#EE734A", "#7585A2", "#FEC103", "#9EB411", "#CD8050", "#DAD5B5"]
      }, {
        text: ibiz.i18n.t("editor.colorPicker.Macaroon"),
        value: props.type === "ITEM" ? ["#467CE6"] : ["#467CE6", "#CD74CA", "#4997CC", "#BCBFE3", "#666CEB", "#82BC9A"]
      }, {
        text: ibiz.i18n.t("editor.colorPicker.mintGreen"),
        value: props.type === "ITEM" ? ["#118299"] : ["#118299", "#13B3B3", "#73DEB3", "#FEC103", "#9EB411", "#83D0EE"]
      }];
    });
    const handleTemplateColorChange = () => {
      const temmpVal = JSON.parse(curTemplateColor.value);
      emit("change", temmpVal);
    };
    const handleSchemeChange = () => {
      var _a, _b;
      if (curType.value === "default") {
        showTemplateList.value = false;
        emit("change", (_b = (_a = templateColorList.value[0]) == null ? void 0 : _a.value) == null ? void 0 : _b[0]);
      } else {
        showTemplateList.value = true;
      }
    };
    watch(() => props.value, () => {
      if (props.value) {
        if (typeof props.value === "string") {
          curType.value = "default";
          showTemplateList.value = false;
        } else {
          curType.value = "template";
          showTemplateList.value = true;
          if (props.value.length > 0) {
            curTemplateColor.value = JSON.stringify(props.value);
          }
        }
      } else {
        curType.value = "default";
        showTemplateList.value = false;
      }
    }, {
      immediate: true,
      deep: true
    });
    return {
      ns,
      curType,
      curTemplateColor,
      showTemplateList,
      colorType,
      templateColorList,
      handleTemplateColorChange,
      handleSchemeChange
    };
  },
  render() {
    return createVNode("div", {
      "class": this.ns.b()
    }, [createVNode(resolveComponent("el-select"), {
      "class": this.ns.b("picker"),
      "popper-class": this.ns.b("popper"),
      "modelValue": this.curType,
      "onUpdate:modelValue": ($event) => this.curType = $event,
      "onChange": this.handleSchemeChange
    }, {
      default: () => {
        return this.colorType.map((scheme) => {
          return createVNode(resolveComponent("el-option"), {
            "key": scheme.value,
            "label": scheme.text,
            "value": scheme.value
          }, null);
        });
      }
    }), this.showTemplateList && createVNode(resolveComponent("el-select"), {
      "class": this.ns.b("template-color-picker"),
      "popper-class": this.ns.b("popper"),
      "modelValue": this.curTemplateColor,
      "onUpdate:modelValue": ($event) => this.curTemplateColor = $event,
      "onChange": this.handleTemplateColorChange
    }, {
      default: () => {
        return this.templateColorList.map((color) => {
          return createVNode(resolveComponent("el-option"), {
            "key": color.key,
            "label": color.text,
            "value": JSON.stringify(color.value)
          }, {
            default: () => {
              return createVNode("div", {
                "class": this.ns.b("template-color-picker-option")
              }, [Array.isArray(color.value) ? color.value.map((item) => createVNode("div", {
                "class": this.ns.be("template-color-picker", "icon"),
                "style": {
                  background: item
                }
              }, null)) : createVNode("div", {
                "class": this.ns.be("template-color-picker", "icon"),
                "style": {
                  background: color.value
                }
              }, null), createVNode("div", {
                "class": this.ns.be("template-color-picker", "text")
              }, [color.text])]);
            }
          });
        });
      },
      prefix: () => {
        if (this.curTemplateColor) {
          const colors = JSON.parse(this.curTemplateColor);
          return Array.isArray(colors) ? colors.map((item) => createVNode("div", {
            "class": this.ns.be("template-color-picker", "icon"),
            "style": {
              background: item
            }
          }, null)) : createVNode("div", {
            "class": this.ns.be("template-color-picker", "icon"),
            "style": {
              background: colors[0]
            }
          }, [colors[0]]);
        }
      }
    })]);
  }
});

export { IBizColorMPickerDefault };
