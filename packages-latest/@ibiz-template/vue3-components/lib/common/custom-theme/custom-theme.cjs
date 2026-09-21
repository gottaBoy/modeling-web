'use strict';

var vue = require('vue');
var vue3Util = require('@ibiz-template/vue3-util');
var core = require('@ibiz-template/core');
require('../../node_modules/.pnpm/@monaco-editor_loader@1.5.0/node_modules/@monaco-editor/loader/lib/es/index.cjs');
var customTheme_controller = require('./custom-theme.controller.cjs');
require('./custom-theme.css');
var index = require('../../node_modules/.pnpm/@monaco-editor_loader@1.5.0/node_modules/@monaco-editor/loader/lib/es/loader/index.cjs');

"use strict";
function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !vue.isVNode(s);
}
const CustomTheme = /* @__PURE__ */ vue.defineComponent({
  name: "IBizCustomTheme",
  props: {
    controller: {
      type: Object,
      required: true
    }
  },
  emits: [],
  setup() {
    const ns = vue3Util.useNamespace("custom-theme");
    const vue$1 = vue.getCurrentInstance().proxy;
    const c = new customTheme_controller.CustomThemeController();
    const activeTab = vue.ref(0);
    const codeEditRef = vue.ref();
    const currentVal = vue.ref("");
    const isEditMode = vue.ref(false);
    let editor;
    let monacoEditor;
    const {
      UIStore
    } = vue3Util.useUIStore();
    const getMonacoTheme = (name) => {
      return name === "dark" ? "vs-".concat(UIStore.theme) : "vs";
    };
    vue.watch(() => UIStore.theme, (newVal) => {
      monacoEditor.setTheme(getMonacoTheme(newVal));
    });
    const editorInit = () => {
      vue.nextTick(() => {
        index.default.config({
          paths: {
            vs: "".concat(ibiz.env.pluginBaseUrl, "/monaco-editor@0.52.2/min/vs")
          }
        });
        index.default.init().then((loaderMonaco) => {
          if (!editor) {
            monacoEditor = loaderMonaco.editor;
            editor = monacoEditor.create(codeEditRef.value, {
              language: "json",
              // 语言支持自行查阅demo
              theme: getMonacoTheme(UIStore.theme),
              foldingStrategy: "indentation",
              renderLineHighlight: "all",
              // 行亮
              selectOnLineNumbers: true,
              // 显示行号
              minimap: {
                enabled: true
              },
              fontSize: 16,
              // 字体大小
              scrollBeyondLastLine: false,
              // 取消代码后面一大段空白
              overviewRulerBorder: false
              // 不要滚动条的边框
            });
          }
          setTimeout(() => {
            editor.layout();
            editor.setValue(currentVal.value);
          });
          window.addEventListener("resize", () => {
            editor.layout();
          });
        });
      });
    };
    vue.onMounted(() => {
      editorInit();
    });
    vue.onUnmounted(() => {
      editor == null ? void 0 : editor.dispose();
    });
    const showSaveAndShare = vue.computed(() => {
      if (ibiz.appData) {
        if (ibiz.appData.enablepermissionvalid === false) {
          return true;
        }
        if (ibiz.appData.unires.length) {
          const targetUnire = ibiz.appData.unires.find((unire) => {
            return unire === "UNIRES_CLOUD_CONF_CONFIG_SHARE";
          });
          if (targetUnire) {
            return true;
          }
        }
      }
      return false;
    });
    const handleThemeChange = async (codeName) => {
      await c.handleThemeChange(codeName);
      if (isEditMode.value) {
        const result = c.getModelEditData();
        vue.nextTick(() => {
          currentVal.value = JSON.stringify(result, null, 2);
          editor == null ? void 0 : editor.setValue(currentVal.value);
          editor == null ? void 0 : editor.layout();
        });
      }
      vue$1.$forceUpdate();
    };
    const handleColorChange = (varName, color, className) => {
      let name = varName;
      if (className) {
        name = "".concat(className, ":").concat(varName);
      }
      c.state.themeVars[name] = color;
    };
    const handleSizeChange = (varName, size, item) => {
      c.calcSizeChange(varName, size, item);
    };
    const handlePreview = async () => {
      if (isEditMode.value && editor) {
        await c.computeChangeThemeVars(JSON.parse(editor.getValue()));
      }
      await c.handleThemePreview(false);
      vue$1.$forceUpdate();
    };
    const handleSave = async () => {
      if (isEditMode.value && editor) {
        await c.computeChangeThemeVars(JSON.parse(editor.getValue()));
      }
      await c.handleThemeSave(false);
      vue$1.$forceUpdate();
    };
    const handleSaveAndShare = async () => {
      if (isEditMode.value && editor) {
        await c.computeChangeThemeVars(JSON.parse(editor.getValue()));
      }
      await c.handleThemeSave(true);
      vue$1.$forceUpdate();
    };
    const handleReset = async () => {
      await c.handleThemeReset(false);
      if (isEditMode.value) {
        const result = c.getModelEditData();
        vue.nextTick(() => {
          currentVal.value = JSON.stringify(result, null, 2);
          editor == null ? void 0 : editor.setValue(currentVal.value);
          editor == null ? void 0 : editor.layout();
        });
      }
      vue$1.$forceUpdate();
    };
    const handleResetAndShare = async () => {
      await c.handleThemeReset(true);
      if (isEditMode.value) {
        const result = c.getModelEditData();
        vue.nextTick(() => {
          currentVal.value = JSON.stringify(result, null, 2);
          editor == null ? void 0 : editor.setValue(currentVal.value);
          editor == null ? void 0 : editor.layout();
        });
      }
      vue$1.$forceUpdate();
    };
    const getVarLabel = (item) => {
      if (item.labelLang) {
        return ibiz.i18n.t("control.common.customTheme.".concat(item.labelLang));
      }
      return item.label;
    };
    const predefineColors = vue.ref(["rgb(241, 4, 4)", "rgb(242, 76, 4)", "rgb(238, 153, 33)", "rgb(98, 230, 10)", "rgb(10, 230, 164)", "rgb(3, 144, 245)", "rgb(3, 7, 245)", "rgb(108, 3, 245)", "rgb(245, 3, 241)", "rgb(245, 3, 92)"]);
    const renderColorPicker = (data) => {
      let {
        value
      } = data;
      if (data.className) {
        value = "".concat(data.className, ":").concat(value);
      }
      return vue.createVNode(vue.resolveComponent("el-color-picker"), {
        "predefine": predefineColors.value,
        "onChange": (val) => {
          handleColorChange(data.value, val, data.className);
        },
        "show-alpha": true,
        "model-value": c.getCssVar(value, data.defaultValue)
      }, null);
    };
    const renderSizeInput = (data) => {
      const varValue = c.getCssVar(data.value);
      return vue.createVNode(vue.resolveComponent("el-input-number"), {
        "model-value": varValue,
        "step": varValue >= 100 ? 100 : 1,
        "min": 0,
        "onChange": (value) => {
          handleSizeChange(data.value, value, data);
        }
      }, null);
    };
    const renderItem = (item) => {
      if (item.children) {
        return item.children.map((children) => {
          return renderItem(children);
        });
      }
      return vue.createVNode("div", {
        "class": ns.b("item")
      }, [vue.createVNode("div", {
        "class": ns.be("item", "caption")
      }, [getVarLabel(item)]), vue.createVNode("div", {
        "class": ns.be("item", "content")
      }, [item.vars.map((data) => {
        let content = renderColorPicker(data);
        if (data.type === "size") {
          content = renderSizeInput(data);
        }
        return vue.createVNode("div", {
          "class": ns.b("var")
        }, [vue.createVNode("span", {
          "class": ns.be("var", "description"),
          "title": core.showTitle(ibiz.i18n.t("control.common.customTheme.".concat(data.descLang)))
        }, [getVarLabel(data)]), content]);
      })])]);
    };
    const handAdvancedSetting = async () => {
      const tempIsEditMode = !isEditMode.value;
      if (isEditMode.value) {
        if (editor) {
          await c.computeChangeThemeVars(JSON.parse(editor.getValue()));
        }
        isEditMode.value = tempIsEditMode;
        vue$1.$forceUpdate();
      } else {
        const result = c.getModelEditData();
        isEditMode.value = tempIsEditMode;
        vue.nextTick(() => {
          currentVal.value = JSON.stringify(result, null, 2);
          editor == null ? void 0 : editor.setValue(currentVal.value);
          editor == null ? void 0 : editor.layout();
          vue$1.$forceUpdate();
        });
      }
    };
    const renderAdvancedSetting = () => {
      return vue.createVNode("span", {
        "class": ns.b("content-setting"),
        "onClick": () => {
          handAdvancedSetting();
        }
      }, [isEditMode.value ? ibiz.i18n.t("control.common.customTheme.closeModelEdit") : ibiz.i18n.t("control.common.customTheme.modelEdit")]);
    };
    const renderHeader = () => {
      return vue.createVNode("div", {
        "class": ns.b("item")
      }, [vue.createVNode("div", {
        "class": ns.be("item", "caption")
      }, [ibiz.i18n.t("control.common.customTheme.themeColor")]), vue.createVNode("div", {
        "class": ns.be("item", "container")
      }, [vue.createVNode("div", {
        "class": ns.be("item", "content")
      }, [c.predefineType.map((item) => {
        return vue.createVNode(vue.resolveComponent("el-button"), {
          "color": item.color,
          "title": core.showTitle(getVarLabel(item)),
          "onClick": () => {
            handleThemeChange(item.codeName);
          }
        }, {
          default: () => [c.state.themeTag === item.codeName && vue.createVNode("ion-icon", {
            "name": "checkmark-sharp"
          }, null)]
        });
      })]), renderAdvancedSetting()])]);
    };
    const renderContent = () => {
      let _slot2;
      return vue.createVNode("div", {
        "class": ns.b("content-container")
      }, [vue.createVNode("div", {
        "ref": codeEditRef,
        "class": [ns.b("edit-container"), ns.is("hidden", !isEditMode.value)]
      }, null), vue.createVNode("div", {
        "class": [ns.b("default-container"), ns.is("hidden", isEditMode.value)]
      }, [vue.createVNode(vue.resolveComponent("el-tabs"), {
        "modelValue": activeTab.value,
        "onUpdate:modelValue": ($event) => activeTab.value = $event
      }, _isSlot(_slot2 = c.model.map((item, index) => {
        let _slot;
        return vue.createVNode(vue.resolveComponent("el-tab-pane"), {
          "name": index,
          "label": getVarLabel(item)
        }, _isSlot(_slot = renderItem(item)) ? _slot : {
          default: () => [_slot]
        });
      })) ? _slot2 : {
        default: () => [_slot2]
      })])]);
    };
    return {
      ns,
      c,
      showSaveAndShare,
      handlePreview,
      handleReset,
      handleSave,
      handleSaveAndShare,
      handleResetAndShare,
      renderHeader,
      renderContent
    };
  },
  render() {
    let _slot3, _slot4, _slot5;
    return vue.createVNode("div", {
      "class": this.ns.b()
    }, [vue.createVNode("div", {
      "class": this.ns.b("header")
    }, [this.renderHeader()]), vue.createVNode("div", {
      "class": this.ns.b("content")
    }, [this.renderContent()]), vue.createVNode("div", {
      "class": this.ns.b("footer")
    }, [vue.createVNode(vue.resolveComponent("el-button"), {
      "onClick": this.handlePreview
    }, _isSlot(_slot3 = ibiz.i18n.t("control.common.customTheme.preview")) ? _slot3 : {
      default: () => [_slot3]
    }), vue.createVNode(vue.resolveComponent("el-button"), {
      "onClick": this.handleSave
    }, _isSlot(_slot4 = ibiz.i18n.t("control.common.customTheme.save")) ? _slot4 : {
      default: () => [_slot4]
    }), vue.createVNode(vue.resolveComponent("el-button"), {
      "onClick": this.handleReset
    }, _isSlot(_slot5 = ibiz.i18n.t("control.common.customTheme.reset")) ? _slot5 : {
      default: () => [_slot5]
    }), this.showSaveAndShare && vue.createVNode(vue.resolveComponent("el-dropdown"), {
      "split-button": true,
      "type": "primary",
      "trigger": "click"
    }, {
      default: () => {
        return ibiz.i18n.t("control.common.customTheme.adminOperation");
      },
      dropdown: () => {
        return vue.createVNode(vue.resolveComponent("el-dropdown-menu"), null, {
          default: () => [vue.createVNode(vue.resolveComponent("el-dropdown-item"), null, {
            default: () => [vue.createVNode("span", {
              "onClick": this.handleSaveAndShare
            }, [ibiz.i18n.t("control.common.customTheme.saveAndShare")])]
          }), vue.createVNode(vue.resolveComponent("el-dropdown-item"), null, {
            default: () => [vue.createVNode("span", {
              "onClick": this.handleResetAndShare
            }, [ibiz.i18n.t("control.common.customTheme.resetAndShare")])]
          })]
        });
      }
    })])]);
  }
});

exports.CustomTheme = CustomTheme;
