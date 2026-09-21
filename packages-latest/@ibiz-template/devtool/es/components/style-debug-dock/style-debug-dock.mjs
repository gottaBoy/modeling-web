import { ref, watch, nextTick, onMounted, onUnmounted, createVNode, createTextVNode, resolveDirective, withDirectives, defineComponent } from 'vue';
import '../../node_modules/.pnpm/@monaco-editor_loader@1.4.0_monaco-editor@0.45.0/node_modules/@monaco-editor/loader/lib/es/index.mjs';
import { useNamespace, useUIStore } from '@ibiz-template/vue3-util';
import './style-debug-dock.css';
import loader from '../../node_modules/.pnpm/@monaco-editor_loader@1.4.0_monaco-editor@0.45.0/node_modules/@monaco-editor/loader/lib/es/loader/index.mjs';

"use strict";
const StyleDebugDock = /* @__PURE__ */ defineComponent({
  name: "DevToolStyleDebugDock",
  props: {
    controller: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const ns = useNamespace("style-debug-dock");
    const {
      state
    } = props.controller;
    const {
      UIStore
    } = useUIStore();
    const cssEditBox = ref();
    const isLoading = ref(true);
    let editor;
    let monacoEditor;
    const getMonacoTheme = (name) => {
      return name === "dark" ? "vs-".concat(UIStore.theme) : "vs";
    };
    watch(() => UIStore.theme, (newVal) => {
      monacoEditor == null ? void 0 : monacoEditor.setTheme(getMonacoTheme(newVal));
    });
    watch(() => state.cssEditorContent, (newVal) => {
      if (editor && newVal !== editor.getValue()) {
        editor.setValue(newVal || "");
      }
    });
    const editorInit = () => {
      nextTick(() => {
        loader.config({
          paths: {
            vs: "".concat(ibiz.env.pluginBaseUrl, "/monaco-editor@0.45.0/min/vs")
          }
        });
        loader.init().then((loaderMonaco) => {
          isLoading.value = false;
          if (!editor && cssEditBox.value) {
            monacoEditor = loaderMonaco.editor;
            editor = monacoEditor.create(cssEditBox.value, {
              language: "css",
              theme: getMonacoTheme(UIStore.theme),
              minimap: {
                enabled: false
              },
              fontSize: 14,
              lineNumbers: "on",
              scrollBeyondLastLine: false,
              automaticLayout: true,
              tabSize: 2,
              wordWrap: "on",
              fontFamily: "'Fira Code', 'Microsoft YaHei', monospace",
              // 英文用 Fira Code，中文 fallback 到微软雅黑
              lineHeight: 20,
              letterSpacing: 0.5
              // 可选：微调字符间距
            });
            editor.setValue(state.cssEditorContent || "");
            editor.onDidChangeModelContent(() => {
              const value = editor.getValue();
              if (value !== state.cssEditorContent) {
                props.controller.onEditorInput(value);
              }
            });
          }
        });
      });
    };
    onMounted(() => {
      editorInit();
    });
    onUnmounted(() => {
      editor == null ? void 0 : editor.dispose();
    });
    return {
      ns,
      state,
      cssEditBox,
      isLoading
    };
  },
  render() {
    const {
      controller,
      state,
      ns
    } = this;
    return createVNode("div", {
      "class": [ns.b(), ns.is("hidden", !state.isShow)]
    }, [createVNode("div", {
      "class": ns.e("dock-accent")
    }, null), createVNode("div", {
      "class": ns.e("panel-content")
    }, [createVNode("div", {
      "class": ns.e("header")
    }, [createVNode("div", {
      "class": ns.e("left-area")
    }, [createVNode("div", {
      "class": ns.e("selector-container")
    }, [createVNode("div", {
      "class": [ns.e("picker-button"), ns.is("active", state.isPickerActive)],
      "title": "\u5F00\u542F\u8FD0\u884C\u65F6\u5143\u7D20\u70B9\u9009\u6A21\u5F0F",
      "onClick": () => controller.togglePicker()
    }, [createVNode("ion-icon", {
      "name": "navigate-outline"
    }, null)]), createVNode("div", {
      "class": ns.e("selector-input")
    }, [createVNode("input", {
      "type": "text",
      "placeholder": "\u8F93\u5165\u6216\u70B9\u9009\u751F\u6210 CSS \u9009\u62E9\u5668...",
      "value": state.selectorInput,
      "onInput": (e) => {
        state.selectorInput = e.target.value;
      },
      "onBlur": () => controller.onSelectorCommit(),
      "onKeydown": (e) => {
        if (e.key === "Enter") {
          controller.onSelectorCommit();
        }
      }
    }, null)])])]), createVNode("div", {
      "class": ns.e("right-area")
    }, [createVNode("div", {
      "class": ns.e("close-button"),
      "onClick": () => controller.triggerVisible(false)
    }, [createVNode("ion-icon", {
      "name": "close-outline"
    }, null)])])]), createVNode("div", {
      "class": ns.e("breadcrumb-section")
    }, [createVNode("div", {
      "class": ns.e("dom-breadcrumbs")
    }, [state.breadcrumbs.length > 0 ? state.breadcrumbs.map((crumb, index) => createVNode("div", {
      "key": crumb.id,
      "class": [ns.e("crumb")],
      "onClick": () => controller.selectBreadcrumb(crumb)
    }, [createVNode("span", {
      "class": [ns.e("crumb-item"), ns.is("active", index === state.breadcrumbs.length - 1)]
    }, [crumb.name]), index < state.breadcrumbs.length - 1 && createVNode("ion-icon", {
      "name": "chevron-forward-outline"
    }, null)])) : createVNode("div", {
      "class": ns.e("empty-placeholder")
    }, [createTextVNode("\u{1F50D} \u6682\u65E0\u9009\u5B9A\u5143\u7D20\uFF0C\u8BF7\u5148\u6355\u83B7\u6216\u624B\u8F93\u8DEF\u5F84")])]), createVNode("div", {
      "class": ns.e("children-list")
    }, [createVNode("div", {
      "class": ns.e("list-header")
    }, [createVNode("span", {
      "class": ns.e("list-title")
    }, [createTextVNode("\u5F53\u524D\u7EC4\u4EF6\u5C42\u7EA7\u5185\u90E8\u5B50\u8282\u70B9 (\u5FEB\u6377\u4E0B\u94BB)")]), createVNode("span", {
      "class": ns.e("list-count")
    }, [state.childrenList.length])]), createVNode("div", {
      "class": ns.e("list-items")
    }, [state.childrenList.length > 0 ? state.childrenList.map((child) => createVNode("div", {
      "key": child.id,
      "class": [ns.e("list-item"), ns.is("selected", state.selectedChildId === child.id)],
      "onClick": () => controller.selectChild(child)
    }, [createVNode("span", null, [child.name])])) : createVNode("div", {
      "class": ns.e("empty-placeholder")
    }, [createTextVNode("\u6682\u65E0\u5185\u5BB9...")])])])]), createVNode("div", {
      "class": ns.e("style-editor")
    }, [createVNode("div", {
      "class": ns.e("editor-header")
    }, [createVNode("span", {
      "class": ns.e("editor-title")
    }, [createTextVNode("Styles")])]), createVNode("div", {
      "class": ns.e("editor-body")
    }, [withDirectives(createVNode("div", {
      "class": ns.e("css-editor")
    }, [createVNode("div", {
      "ref": "cssEditBox",
      "class": ns.e("monaco-container")
    }, null)]), [[resolveDirective("loading"), this.isLoading]])])]), createVNode("div", {
      "class": ns.e("code-exporter")
    }, [createVNode("div", {
      "class": ns.e("exporter-header")
    }, [createVNode("div", {
      "class": ns.e("exporter-title")
    }, [createVNode("span", null, [createTextVNode("\u53D8\u66F4\u6837\u5F0F")])]), createVNode("div", {
      "class": ns.e("header-right")
    }, [createVNode("div", {
      "class": ns.e("copy-button"),
      "onClick": () => controller.copyCode()
    }, [createVNode("ion-icon", {
      "name": "copy-outline"
    }, null), createVNode("span", null, [createTextVNode("Copy")])])])]), createVNode("div", {
      "class": ns.e("code-block")
    }, [createVNode("pre", null, [controller.exportedCode])])])])]);
  }
});

export { StyleDebugDock, StyleDebugDock as default };
