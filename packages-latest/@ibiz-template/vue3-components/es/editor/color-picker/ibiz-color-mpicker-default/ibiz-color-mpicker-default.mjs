import { defineComponent, withDirectives, createVNode, resolveComponent, resolveDirective, ref, computed, watch } from 'vue';
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
    },
    semanticClass: {
      type: Function
    },
    semanticStyle: {
      type: Function
    }
  },
  emits: ["change"],
  setup(props, {
    emit
  }) {
    var _a, _b, _c, _d, _e, _f;
    const ns = useNamespace("color-mpicker-default");
    const curType = ref("default");
    const childClass = [{
      class: (_a = props.semanticClass) == null ? void 0 : _a.call(props, "editor.input"),
      selector: ".el-input__inner"
    }, {
      class: (_b = props.semanticClass) == null ? void 0 : _b.call(props, "editor.prefix"),
      selector: ".el-input__prefix"
    }, {
      class: (_c = props.semanticClass) == null ? void 0 : _c.call(props, "editor.suffix"),
      selector: ".el-input__suffix"
    }];
    const childStyle = [{
      style: (_d = props.semanticStyle) == null ? void 0 : _d.call(props, "editor.input"),
      selector: ".el-input__inner"
    }, {
      style: (_e = props.semanticStyle) == null ? void 0 : _e.call(props, "editor.prefix"),
      selector: ".el-input__prefix"
    }, {
      style: (_f = props.semanticStyle) == null ? void 0 : _f.call(props, "editor.suffix"),
      selector: ".el-input__suffix"
    }];
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
      var _a2, _b2;
      if (curType.value === "default") {
        showTemplateList.value = false;
        emit("change", (_b2 = (_a2 = templateColorList.value[0]) == null ? void 0 : _a2.value) == null ? void 0 : _b2[0]);
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
      colorType,
      childClass,
      childStyle,
      curTemplateColor,
      showTemplateList,
      templateColorList,
      handleSchemeChange,
      handleTemplateColorChange
    };
  },
  render() {
    var _a, _b, _c, _d, _e, _f;
    return withDirectives(createVNode("div", {
      "style": (_a = this.semanticStyle) == null ? void 0 : _a.call(this, "editor.root"),
      "class": [this.ns.b(), (_b = this.semanticClass) == null ? void 0 : _b.call(this, "editor.root")]
    }, [createVNode(resolveComponent("el-select"), {
      "modelValue": this.curType,
      "onUpdate:modelValue": ($event) => this.curType = $event,
      "class": this.ns.b("picker"),
      "popper-class": [this.ns.b("popper"), (_c = this.semanticClass) == null ? void 0 : _c.call(this, "editor.popup")],
      "popper-style": (_d = this.semanticStyle) == null ? void 0 : _d.call(this, "editor.popup"),
      "onChange": this.handleSchemeChange
    }, {
      default: () => {
        return this.colorType.map((scheme) => {
          var _a2, _b2;
          return createVNode(resolveComponent("el-option"), {
            "class": [this.ns.be("popper", "item"), (_a2 = this.semanticClass) == null ? void 0 : _a2.call(this, "editor.popup.item", {
              item: scheme
            })],
            "style": (_b2 = this.semanticStyle) == null ? void 0 : _b2.call(this, "editor.popup.item", {
              item: scheme
            }),
            "key": scheme.value,
            "label": scheme.text,
            "value": scheme.value
          }, null);
        });
      }
    }), this.showTemplateList && createVNode(resolveComponent("el-select"), {
      "class": this.ns.b("template-color-picker"),
      "popper-class": [this.ns.b("popper"), (_e = this.semanticClass) == null ? void 0 : _e.call(this, "editor.popup")],
      "popper-style": (_f = this.semanticStyle) == null ? void 0 : _f.call(this, "editor.popup"),
      "modelValue": this.curTemplateColor,
      "onUpdate:modelValue": ($event) => this.curTemplateColor = $event,
      "onChange": this.handleTemplateColorChange
    }, {
      default: () => {
        return this.templateColorList.map((color) => {
          var _a2, _b2;
          return createVNode(resolveComponent("el-option"), {
            "class": [this.ns.be("popper", "item"), (_a2 = this.semanticClass) == null ? void 0 : _a2.call(this, "editor.popup.item", {
              item: color
            })],
            "style": (_b2 = this.semanticStyle) == null ? void 0 : _b2.call(this, "editor.popup.item", {
              item: color
            }),
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
    })]), [[resolveDirective("child-class"), this.childClass], [resolveDirective("child-style"), this.childStyle]]);
  }
});

export { IBizColorMPickerDefault };
