'use strict';

var vue = require('vue');
require('./monaco-editor.css');
var vue3Util = require('@ibiz-template/vue3-util');
var ElementPlus = require('element-plus');
require('../../../node_modules/.pnpm/@monaco-editor_loader@1.4.0_monaco-editor@0.45.0/node_modules/@monaco-editor/loader/lib/es/index.cjs');
var index = require('../../../node_modules/.pnpm/@monaco-editor_loader@1.4.0_monaco-editor@0.45.0/node_modules/@monaco-editor/loader/lib/es/loader/index.cjs');

"use strict";
const IBizCode = /* @__PURE__ */ vue.defineComponent({
  name: "IBizCode",
  props: vue3Util.getCodeProps(),
  emits: vue3Util.getEditorEmits(),
  setup(props, {
    emit
  }) {
    const ns = vue3Util.useNamespace("code");
    const c = props.controller;
    const currentVal = vue.ref("");
    const enableEdit = vue.ref(true);
    const hasEnableEdit = vue.ref(false);
    const readonlyState = vue.ref(false);
    const enableFullScreen = vue.ref(false);
    const isFullScreen = vue.ref(false);
    const editorModel = c.model;
    if (editorModel.editorParams) {
      if (editorModel.editorParams.enableEdit) {
        hasEnableEdit.value = true;
        readonlyState.value = true;
        enableEdit.value = c.toBoolean(editorModel.editorParams.enableEdit) && !props.readonly && !props.disabled;
      }
      if (editorModel.editorParams.enableFullScreen) {
        enableFullScreen.value = c.toBoolean(editorModel.editorParams.enableFullScreen);
      }
    }
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
    vue.watch(() => props.value, (newVal) => {
      if (newVal !== currentVal.value) {
        currentVal.value = newVal || "";
        editor == null ? void 0 : editor.setValue(currentVal.value);
      }
    }, {
      immediate: true
    });
    const updateEditorOptions = () => {
      if (!editor) {
        return;
      }
      if (props.readonly || props.disabled) {
        hasEnableEdit.value = false;
        readonlyState.value = true;
      }
      editor.updateOptions({
        readOnly: hasEnableEdit.value ? readonlyState.value : props.readonly || props.disabled
      });
    };
    vue.watch(() => props.readonly, updateEditorOptions, {
      immediate: true
    });
    vue.watch(() => props.disabled, updateEditorOptions, {
      immediate: true
    });
    const codeEditBox = vue.ref();
    const editorInit = () => {
      vue.nextTick(() => {
        index.default.config({
          paths: {
            vs: "".concat(ibiz.env.pluginBaseUrl, "/monaco-editor@0.45.0/min/vs")
          }
        });
        index.default.init().then((loaderMonaco) => {
          if (!editor) {
            monacoEditor = loaderMonaco.editor;
            editor = monacoEditor.create(codeEditBox.value, {
              language: props.language || props.controller.language,
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
              readOnly: hasEnableEdit.value ? readonlyState.value : props.readonly || props.disabled,
              // 只读
              readOnlyMessage: {
                value: ibiz.i18n.t("editor.code.readOnlyPrompt")
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
          editor.onDidChangeModelContent(() => {
            if (!hasEnableEdit.value) {
              currentVal.value = editor.getValue();
              emit("change", currentVal.value);
            }
          });
          window.addEventListener("resize", () => {
            editor.layout();
          });
        });
      });
    };
    const changeEditState = () => {
      readonlyState.value = !readonlyState.value;
      if (!editor)
        return;
      if (!readonlyState.value) {
        editor.updateOptions({
          readOnly: false
        });
      } else {
        editor.updateOptions({
          readOnly: true
        });
      }
    };
    const changeFullScreenState = async () => {
      currentVal.value = String(editor == null ? void 0 : editor.getValue());
      editor == null ? void 0 : editor.dispose();
      editor = null;
      isFullScreen.value = !isFullScreen.value;
      editorInit();
    };
    const isAllowRenderFullScreen = () => {
      if (enableFullScreen.value) {
        if (isFullScreen.value) {
          return vue.createVNode("i", {
            "class": "fa fa-compress",
            "aria-hidden": "true",
            "onClick": () => changeFullScreenState()
          }, null);
        }
        return vue.createVNode("i", {
          "class": "fa fa-expand",
          "aria-hidden": "true",
          "onClick": () => changeFullScreenState()
        }, null);
      }
      return null;
    };
    const renderCancelMessage = () => {
      return vue.createVNode("div", {
        "class": ns.be("message", "message-content")
      }, [vue.createVNode("p", null, [ibiz.i18n.t("editor.common.confirmCancelPrompt")]), vue.createVNode("p", {
        "class": ns.bem("message", "message-content", "message-tip")
      }, [ibiz.i18n.t("editor.common.cancelEditPrompt")])]);
    };
    const cancelEdit = () => {
      if (props.value !== (editor == null ? void 0 : editor.getValue())) {
        ElementPlus.ElMessageBox({
          title: ibiz.i18n.t("editor.common.confirmCancel"),
          type: "warning",
          customClass: ns.b("message"),
          message: renderCancelMessage(),
          showCancelButton: true,
          cancelButtonClass: ns.be("message", "message-cancel"),
          confirmButtonClass: ns.be("message", "message-comfire")
        }).then(() => {
          editor == null ? void 0 : editor.setValue(String(props.value || ""));
          changeEditState();
        }).catch(() => {
          editor == null ? void 0 : editor.focus();
        });
      } else {
        changeEditState();
      }
    };
    const save = () => {
      changeEditState();
      if (editor) {
        currentVal.value = editor.getValue();
        emit("change", currentVal.value);
      }
      if (isFullScreen.value) {
        changeFullScreenState();
      }
    };
    const renderFooter = () => {
      if (hasEnableEdit.value) {
        return vue.createVNode("div", {
          "class": [ns.b("footer"), {
            [ns.b("footer-dialog")]: isFullScreen.value
          }]
        }, [vue.createVNode("div", {
          "class": ns.be("footer", "cancel"),
          "onClick": () => cancelEdit()
        }, [ibiz.i18n.t("app.cancel")]), vue.createVNode("div", {
          "class": ns.be("footer", "save"),
          "onClick": () => save()
        }, [ibiz.i18n.t("app.save")])]);
      }
      return null;
    };
    const renderHeaderToolbar = () => {
      if (hasEnableEdit.value || enableFullScreen.value) {
        return vue.createVNode("div", {
          "class": ns.b("toolbar")
        }, [hasEnableEdit.value && enableEdit.value && readonlyState.value ? vue.createVNode("i", {
          "class": "fa fa-edit",
          "aria-hidden": "true",
          "onClick": () => changeEditState()
        }, null) : null, isAllowRenderFullScreen()]);
      }
      return null;
    };
    const renderCodeContent = () => {
      return vue.createVNode("div", {
        "ref": codeEditBox,
        "class": ns.e("box")
      }, null);
    };
    vue.onMounted(() => {
      editorInit();
    });
    vue.onUnmounted(() => {
      editor == null ? void 0 : editor.dispose();
    });
    return {
      ns,
      currentVal,
      codeEditBox,
      isFullScreen,
      hasEnableEdit,
      readonlyState,
      renderFooter,
      renderHeaderToolbar,
      renderCodeContent,
      changeFullScreenState
    };
  },
  render() {
    return !this.isFullScreen ? vue.createVNode("div", {
      "class": [this.ns.b(), {
        [this.ns.b("editor-readonly")]: this.readonlyState
      }, {
        [this.ns.b("editor-enable")]: !this.readonlyState
      }]
    }, [this.renderHeaderToolbar(), this.renderCodeContent(), this.hasEnableEdit && !this.readonlyState ? this.renderFooter() : null]) : vue.createVNode(vue.resolveComponent("el-dialog"), {
      "modelValue": this.isFullScreen,
      "onUpdate:modelValue": ($event) => this.isFullScreen = $event,
      "width": "80%",
      "top": "10vh",
      "class": this.ns.b("dialog-full-screen"),
      "onClose": () => this.changeFullScreenState()
    }, {
      default: () => [vue.createVNode("div", {
        "class": [this.ns.b(), {
          [this.ns.b("editor-readonly")]: this.readonlyState
        }, {
          [this.ns.b("editor-enable")]: !this.readonlyState
        }]
      }, [this.renderHeaderToolbar(), this.renderCodeContent(), this.hasEnableEdit && !this.readonlyState ? this.renderFooter() : null])]
    });
  }
});

exports.IBizCode = IBizCode;
