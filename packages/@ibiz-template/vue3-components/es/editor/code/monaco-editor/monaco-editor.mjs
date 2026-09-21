import { defineComponent, ref, watch, nextTick, createVNode, onMounted, onUnmounted, resolveComponent } from 'vue';
import './monaco-editor.css';
import { getCodeProps, getEditorEmits, useNamespace, useUIStore } from '@ibiz-template/vue3-util';
import { ElMessageBox } from 'element-plus';
import '../../../node_modules/.pnpm/@monaco-editor_loader@1.4.0_monaco-editor@0.45.0/node_modules/@monaco-editor/loader/lib/es/index.mjs';
import loader from '../../../node_modules/.pnpm/@monaco-editor_loader@1.4.0_monaco-editor@0.45.0/node_modules/@monaco-editor/loader/lib/es/loader/index.mjs';

"use strict";
const IBizCode = /* @__PURE__ */ defineComponent({
  name: "IBizCode",
  props: getCodeProps(),
  emits: getEditorEmits(),
  setup(props, {
    emit
  }) {
    const ns = useNamespace("code");
    const c = props.controller;
    const currentVal = ref("");
    const enableEdit = ref(true);
    const hasEnableEdit = ref(false);
    const readonlyState = ref(false);
    const enableFullScreen = ref(false);
    const isFullScreen = ref(false);
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
    } = useUIStore();
    const getMonacoTheme = (name) => {
      return name === "dark" ? "vs-".concat(UIStore.theme) : "vs";
    };
    watch(() => UIStore.theme, (newVal) => {
      monacoEditor.setTheme(getMonacoTheme(newVal));
    });
    watch(() => props.value, (newVal) => {
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
    watch(() => props.readonly, updateEditorOptions, {
      immediate: true
    });
    watch(() => props.disabled, updateEditorOptions, {
      immediate: true
    });
    const codeEditBox = ref();
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
          return createVNode("i", {
            "class": "fa fa-compress",
            "aria-hidden": "true",
            "onClick": () => changeFullScreenState()
          }, null);
        }
        return createVNode("i", {
          "class": "fa fa-expand",
          "aria-hidden": "true",
          "onClick": () => changeFullScreenState()
        }, null);
      }
      return null;
    };
    const renderCancelMessage = () => {
      return createVNode("div", {
        "class": ns.be("message", "message-content")
      }, [createVNode("p", null, [ibiz.i18n.t("editor.common.confirmCancelPrompt")]), createVNode("p", {
        "class": ns.bem("message", "message-content", "message-tip")
      }, [ibiz.i18n.t("editor.common.cancelEditPrompt")])]);
    };
    const cancelEdit = () => {
      if (props.value !== (editor == null ? void 0 : editor.getValue())) {
        ElMessageBox({
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
        return createVNode("div", {
          "class": [ns.b("footer"), {
            [ns.b("footer-dialog")]: isFullScreen.value
          }]
        }, [createVNode("div", {
          "class": ns.be("footer", "cancel"),
          "onClick": () => cancelEdit()
        }, [ibiz.i18n.t("app.cancel")]), createVNode("div", {
          "class": ns.be("footer", "save"),
          "onClick": () => save()
        }, [ibiz.i18n.t("app.save")])]);
      }
      return null;
    };
    const renderHeaderToolbar = () => {
      if (hasEnableEdit.value || enableFullScreen.value) {
        return createVNode("div", {
          "class": ns.b("toolbar")
        }, [hasEnableEdit.value && enableEdit.value && readonlyState.value ? createVNode("i", {
          "class": "fa fa-edit",
          "aria-hidden": "true",
          "onClick": () => changeEditState()
        }, null) : null, isAllowRenderFullScreen()]);
      }
      return null;
    };
    const renderCodeContent = () => {
      return createVNode("div", {
        "ref": codeEditBox,
        "class": ns.e("box")
      }, null);
    };
    onMounted(() => {
      editorInit();
    });
    onUnmounted(() => {
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
    return !this.isFullScreen ? createVNode("div", {
      "class": [this.ns.b(), {
        [this.ns.b("editor-readonly")]: this.readonlyState
      }, {
        [this.ns.b("editor-enable")]: !this.readonlyState
      }]
    }, [this.renderHeaderToolbar(), this.renderCodeContent(), this.hasEnableEdit && !this.readonlyState ? this.renderFooter() : null]) : createVNode(resolveComponent("el-dialog"), {
      "modelValue": this.isFullScreen,
      "onUpdate:modelValue": ($event) => this.isFullScreen = $event,
      "width": "80%",
      "top": "10vh",
      "class": this.ns.b("dialog-full-screen"),
      "onClose": () => this.changeFullScreenState()
    }, {
      default: () => [createVNode("div", {
        "class": [this.ns.b(), {
          [this.ns.b("editor-readonly")]: this.readonlyState
        }, {
          [this.ns.b("editor-enable")]: !this.readonlyState
        }]
      }, [this.renderHeaderToolbar(), this.renderCodeContent(), this.hasEnableEdit && !this.readonlyState ? this.renderFooter() : null])]
    });
  }
});

export { IBizCode };
