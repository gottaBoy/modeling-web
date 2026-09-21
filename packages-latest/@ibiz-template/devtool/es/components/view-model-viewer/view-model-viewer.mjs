import { ref, watch, nextTick, onMounted, onUnmounted, createVNode, resolveDirective, withDirectives, defineComponent } from 'vue';
import '../../node_modules/.pnpm/@monaco-editor_loader@1.4.0_monaco-editor@0.45.0/node_modules/@monaco-editor/loader/lib/es/index.mjs';
import { useNamespace, useUIStore } from '@ibiz-template/vue3-util';
import './view-model-viewer.css';
import interact from 'interactjs';
import loader from '../../node_modules/.pnpm/@monaco-editor_loader@1.4.0_monaco-editor@0.45.0/node_modules/@monaco-editor/loader/lib/es/loader/index.mjs';

"use strict";
const ViewModelViewer = /* @__PURE__ */ defineComponent({
  name: "DevToolViewModelViewer",
  props: {
    view: {
      type: Object,
      required: true
    },
    center: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const ns = useNamespace("view-model-viewer");
    const center = props.center;
    const currentVal = ref("");
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
    watch(() => props.view, (newVal) => {
      if (newVal) {
        const newStr = JSON.stringify(newVal, null, 2);
        if (newStr !== currentVal.value) {
          currentVal.value = newStr || "";
          editor == null ? void 0 : editor.setValue(currentVal.value);
        }
      }
    }, {
      immediate: true
    });
    const codeEditBox = ref();
    const dragBox = ref();
    const isLoading = ref(true);
    const editorInit = () => {
      nextTick(() => {
        loader.config({
          paths: {
            vs: "".concat(ibiz.env.pluginBaseUrl, "/monaco-editor@0.45.0/min/vs")
          }
        });
        loader.init().then((loaderMonaco) => {
          isLoading.value = false;
          if (!editor) {
            monacoEditor = loaderMonaco.editor;
            editor = monacoEditor.create(codeEditBox.value, {
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
              readOnly: true,
              // 只读
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
    const interactDom = () => {
      if (codeEditBox.value) {
        if (center.config.modelPreviewWidth) {
          codeEditBox.value.style.setProperty(ns.cssVarBlockName("width"), "".concat(center.config.modelPreviewWidth, "px"));
        }
        interact(codeEditBox.value).resizable({
          edges: {
            left: true
          },
          listeners: {
            move(event) {
              const width = event.rect.width;
              codeEditBox.value.style.setProperty(ns.cssVarBlockName("width"), "".concat(width, "px"));
              editor.layout();
              center.updateUserConfig({
                modelPreviewWidth: width
              });
            }
          }
        });
      }
    };
    onMounted(() => {
      editorInit();
      interactDom();
    });
    onUnmounted(() => {
      editor == null ? void 0 : editor.dispose();
    });
    return {
      ns,
      currentVal,
      codeEditBox,
      isLoading,
      dragBox
    };
  },
  render() {
    return withDirectives(createVNode("div", {
      "class": [this.ns.b()],
      "ref": "dragBox"
    }, [createVNode("div", {
      "class": [this.ns.b("drag")]
    }, [!this.isLoading && createVNode("ion-icon", {
      "name": "swap-horizontal-outline",
      "class": this.ns.b("drag-icon")
    }, null)]), createVNode("div", {
      "ref": "codeEditBox",
      "class": [this.ns.b("editor")]
    }, null)]), [[resolveDirective("loading"), this.isLoading]]);
  }
});

export { ViewModelViewer };
