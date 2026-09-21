import { isVNode, defineComponent, getCurrentInstance, ref, watch, nextTick, onMounted, onUnmounted, computed, createVNode, resolveComponent } from 'vue';
import { useNamespace, useUIStore } from '@ibiz-template/vue3-util';
import { showTitle } from '@ibiz-template/core';
import '../../node_modules/.pnpm/@monaco-editor_loader@1.4.0_monaco-editor@0.45.0/node_modules/@monaco-editor/loader/lib/es/index.mjs';
import { CustomThemeController } from './custom-theme.controller.mjs';
import './custom-theme.css';
import loader from '../../node_modules/.pnpm/@monaco-editor_loader@1.4.0_monaco-editor@0.45.0/node_modules/@monaco-editor/loader/lib/es/loader/index.mjs';

"use strict";
function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !isVNode(s);
}
const CustomTheme = /* @__PURE__ */ defineComponent({
  name: "IBizCustomTheme",
  props: {
    controller: {
      type: Object,
      required: true
    }
  },
  emits: [],
  setup() {
    const ns = useNamespace("custom-theme");
    const vue = getCurrentInstance().proxy;
    const c = new CustomThemeController();
    const activeTab = ref(0);
    const codeEditRef = ref();
    const currentVal = ref("");
    const isEditMode = ref(false);
    let editor;
    let monacoEditor;
    const {
      UIStore
    } = useUIStore();
    const getMonacoTheme = (name) => {
      return name === "dark" ? "vs-".concat(UIStore.theme) : "vs";
    };
    watch(() => UIStore.theme, (newVal) => {
      monacoEditor.setTheme(getMonacoTheme(newVal));
    });
    const editorInit = () => {
      nextTick(() => {
        loader.config({
          paths: {
            vs: "".concat(ibiz.env.pluginBaseUrl, "/monaco-editor@0.45.0/min/vs")
          }
        });
        loader.init().then((loaderMonaco) => {
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
    onMounted(() => {
      editorInit();
    });
    onUnmounted(() => {
      editor == null ? void 0 : editor.dispose();
    });
    const showSaveAndShare = computed(() => {
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
        nextTick(() => {
          currentVal.value = JSON.stringify(result, null, 2);
          editor == null ? void 0 : editor.setValue(currentVal.value);
          editor == null ? void 0 : editor.layout();
        });
      }
      vue.$forceUpdate();
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
      vue.$forceUpdate();
    };
    const handleSave = async () => {
      if (isEditMode.value && editor) {
        await c.computeChangeThemeVars(JSON.parse(editor.getValue()));
      }
      await c.handleThemeSave(false);
      vue.$forceUpdate();
    };
    const handleSaveAndShare = async () => {
      if (isEditMode.value && editor) {
        await c.computeChangeThemeVars(JSON.parse(editor.getValue()));
      }
      await c.handleThemeSave(true);
      vue.$forceUpdate();
    };
    const handleReset = async () => {
      await c.handleThemeReset(false);
      if (isEditMode.value) {
        const result = c.getModelEditData();
        nextTick(() => {
          currentVal.value = JSON.stringify(result, null, 2);
          editor == null ? void 0 : editor.setValue(currentVal.value);
          editor == null ? void 0 : editor.layout();
        });
      }
      vue.$forceUpdate();
    };
    const handleResetAndShare = async () => {
      await c.handleThemeReset(true);
      if (isEditMode.value) {
        const result = c.getModelEditData();
        nextTick(() => {
          currentVal.value = JSON.stringify(result, null, 2);
          editor == null ? void 0 : editor.setValue(currentVal.value);
          editor == null ? void 0 : editor.layout();
        });
      }
      vue.$forceUpdate();
    };
    const predefineColors = ref(["rgb(241, 4, 4)", "rgb(242, 76, 4)", "rgb(238, 153, 33)", "rgb(98, 230, 10)", "rgb(10, 230, 164)", "rgb(3, 144, 245)", "rgb(3, 7, 245)", "rgb(108, 3, 245)", "rgb(245, 3, 241)", "rgb(245, 3, 92)"]);
    const renderColorPicker = (data) => {
      let {
        value
      } = data;
      if (data.className) {
        value = "".concat(data.className, ":").concat(value);
      }
      return createVNode(resolveComponent("el-color-picker"), {
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
      return createVNode(resolveComponent("el-input-number"), {
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
      return createVNode("div", {
        "class": ns.b("item")
      }, [createVNode("div", {
        "class": ns.be("item", "caption")
      }, [ibiz.i18n.t("control.common.customTheme.".concat(item.labelLang))]), createVNode("div", {
        "class": ns.be("item", "content")
      }, [item.vars.map((data) => {
        let content = renderColorPicker(data);
        if (data.type === "size") {
          content = renderSizeInput(data);
        }
        return createVNode("div", {
          "class": ns.b("var")
        }, [createVNode("span", {
          "class": ns.be("var", "description"),
          "title": showTitle(ibiz.i18n.t("control.common.customTheme.".concat(data.descLang)))
        }, [ibiz.i18n.t("control.common.customTheme.".concat(data.labelLang))]), content]);
      })])]);
    };
    const handAdvancedSetting = async () => {
      const tempIsEditMode = !isEditMode.value;
      if (isEditMode.value) {
        if (editor) {
          await c.computeChangeThemeVars(JSON.parse(editor.getValue()));
        }
        isEditMode.value = tempIsEditMode;
        vue.$forceUpdate();
      } else {
        const result = c.getModelEditData();
        isEditMode.value = tempIsEditMode;
        nextTick(() => {
          currentVal.value = JSON.stringify(result, null, 2);
          editor == null ? void 0 : editor.setValue(currentVal.value);
          editor == null ? void 0 : editor.layout();
          vue.$forceUpdate();
        });
      }
    };
    const renderAdvancedSetting = () => {
      return createVNode("span", {
        "class": ns.b("content-setting"),
        "onClick": () => {
          handAdvancedSetting();
        }
      }, [isEditMode.value ? ibiz.i18n.t("control.common.customTheme.closeModelEdit") : ibiz.i18n.t("control.common.customTheme.modelEdit")]);
    };
    const renderHeader = () => {
      return createVNode("div", {
        "class": ns.b("item")
      }, [createVNode("div", {
        "class": ns.be("item", "caption")
      }, [ibiz.i18n.t("control.common.customTheme.themeColor")]), createVNode("div", {
        "class": ns.be("item", "container")
      }, [createVNode("div", {
        "class": ns.be("item", "content")
      }, [c.predefineType.map((item) => {
        return createVNode(resolveComponent("el-button"), {
          "color": item.color,
          "title": showTitle(ibiz.i18n.t("control.common.customTheme.".concat(item.labelLang))),
          "onClick": () => {
            handleThemeChange(item.codeName);
          }
        }, {
          default: () => [c.state.themeTag === item.codeName && createVNode("ion-icon", {
            "name": "checkmark-sharp"
          }, null)]
        });
      })]), renderAdvancedSetting()])]);
    };
    const renderContent = () => {
      let _slot2;
      return createVNode("div", {
        "class": ns.b("content-container")
      }, [createVNode("div", {
        "ref": codeEditRef,
        "class": [ns.b("edit-container"), ns.is("hidden", !isEditMode.value)]
      }, null), createVNode("div", {
        "class": [ns.b("default-container"), ns.is("hidden", isEditMode.value)]
      }, [createVNode(resolveComponent("el-tabs"), {
        "modelValue": activeTab.value,
        "onUpdate:modelValue": ($event) => activeTab.value = $event
      }, _isSlot(_slot2 = c.model.map((item, index) => {
        let _slot;
        return createVNode(resolveComponent("el-tab-pane"), {
          "name": index,
          "label": ibiz.i18n.t("control.common.customTheme.".concat(item.labelLang))
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
    return createVNode("div", {
      "class": this.ns.b()
    }, [createVNode("div", {
      "class": this.ns.b("header")
    }, [this.renderHeader()]), createVNode("div", {
      "class": this.ns.b("content")
    }, [this.renderContent()]), createVNode("div", {
      "class": this.ns.b("footer")
    }, [createVNode(resolveComponent("el-button"), {
      "onClick": this.handlePreview
    }, _isSlot(_slot3 = ibiz.i18n.t("control.common.customTheme.preview")) ? _slot3 : {
      default: () => [_slot3]
    }), createVNode(resolveComponent("el-button"), {
      "onClick": this.handleSave
    }, _isSlot(_slot4 = ibiz.i18n.t("control.common.customTheme.save")) ? _slot4 : {
      default: () => [_slot4]
    }), createVNode(resolveComponent("el-button"), {
      "onClick": this.handleReset
    }, _isSlot(_slot5 = ibiz.i18n.t("control.common.customTheme.reset")) ? _slot5 : {
      default: () => [_slot5]
    }), this.showSaveAndShare && createVNode(resolveComponent("el-dropdown"), {
      "split-button": true,
      "type": "primary",
      "trigger": "click"
    }, {
      default: () => {
        return ibiz.i18n.t("control.common.customTheme.adminOperation");
      },
      dropdown: () => {
        return createVNode(resolveComponent("el-dropdown-menu"), null, {
          default: () => [createVNode(resolveComponent("el-dropdown-item"), null, {
            default: () => [createVNode("span", {
              "onClick": this.handleSaveAndShare
            }, [ibiz.i18n.t("control.common.customTheme.saveAndShare")])]
          }), createVNode(resolveComponent("el-dropdown-item"), null, {
            default: () => [createVNode("span", {
              "onClick": this.handleResetAndShare
            }, [ibiz.i18n.t("control.common.customTheme.resetAndShare")])]
          })]
        });
      }
    })])]);
  }
});

export { CustomTheme };
