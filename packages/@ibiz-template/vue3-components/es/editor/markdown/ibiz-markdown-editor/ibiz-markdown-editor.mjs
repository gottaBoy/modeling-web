import { defineComponent, ref, watch, nextTick, onMounted, onUnmounted, createVNode } from 'vue';
import { getMarkDownProps, getEditorEmits, useNamespace, useUIStore } from '@ibiz-template/vue3-util';
import { createUUID } from 'qx-util';
import Cherry from 'cherry-markdown';
import { getAppCookie, CoreConst } from '@ibiz-template/core';
import './ibiz-markdown-editor.css';

"use strict";
const IBizMarkDown = /* @__PURE__ */ defineComponent({
  name: "IBizMarkDown",
  props: getMarkDownProps(),
  emits: getEditorEmits(),
  setup(props, {
    emit
  }) {
    const ns = useNamespace("markdown");
    const c = props.controller;
    const currentVal = ref("");
    const editor = ref(null);
    const id = createUUID();
    const headers = ref({
      ["".concat(ibiz.env.tokenHeader, "Authorization")]: "".concat(ibiz.env.tokenPrefix, "Bearer ").concat(getAppCookie(CoreConst.TOKEN))
    });
    const uploadUrl = ref("");
    const downloadUrl = ref("");
    const {
      UIStore
    } = useUIStore();
    const theme = ref(UIStore.theme);
    const defaultModel = ref("editOnly");
    let resizeObserver = null;
    let lastMarkDownWidth = 0;
    const cssVars = ref({});
    watch(() => props.data, (newVal) => {
      if (newVal && c) {
        const urls = ibiz.util.file.calcFileUpDownUrl(c.context, c.params, newVal, c.editorParams);
        uploadUrl.value = urls.uploadUrl;
        downloadUrl.value = urls.downloadUrl;
      }
    }, {
      immediate: true,
      deep: true
    });
    const markDownBox = ref();
    const fileUpload = async (file, callback) => {
      const data = await ibiz.util.file.fileUpload(uploadUrl.value, file, headers.value);
      const url = downloadUrl.value.replace("%fileId%", data.fileid);
      callback(url);
    };
    const getCherryHtml = () => {
      var _a;
      const result = (_a = editor.value) == null ? void 0 : _a.getHtml();
      return result;
    };
    const getCherryContent = () => {
      var _a;
      const result = (_a = editor.value) == null ? void 0 : _a.getMarkdown();
      return result;
    };
    const setCherryContent = (val) => {
      var _a;
      (_a = editor.value) == null ? void 0 : _a.setMarkdown(val, false);
    };
    watch(() => props.value, (newVal, oldVal) => {
      if (newVal !== oldVal) {
        if (!newVal) {
          currentVal.value = "";
        } else {
          currentVal.value = newVal;
        }
      }
    }, {
      immediate: true
    });
    watch(currentVal, (newVal, oldVal) => {
      const content = getCherryContent();
      if (newVal !== oldVal && content !== newVal) {
        setCherryContent(newVal);
      }
    });
    const afterChange = (_e) => {
      emit("change", getCherryContent());
    };
    const beforeImageMounted = (e, src) => {
      return {
        [e]: src
      };
    };
    const editorInit = () => {
      if (props.disabled) {
        defaultModel.value = "previewOnly";
      }
      nextTick(() => {
        editor.value = new Cherry({
          id,
          value: currentVal.value,
          theme: theme.value,
          fileUpload,
          emoji: {
            useUnicode: true
          },
          header: {
            anchorStyle: "autonumber"
          },
          editor: {
            // 编辑器的高度，默认100%，如果挂载点存在内联设置的height则以内联样式为主
            height: "100%",
            // defaultModel 编辑器初始化后的默认模式，一共有三种模式：1、双栏编辑预览模式；2、纯编辑模式；3、预览模式
            // edit&preview: 双栏编辑预览模式
            // editOnly: 纯编辑模式（没有预览，可通过toolbar切换成双栏或预览模式）
            // previewOnly: 预览模式（没有编辑框，toolbar只显示“返回编辑”按钮，可通过toolbar切换成编辑模式）
            defaultModel: defaultModel.value,
            codemirror: {
              // 是否自动focus 默认为true
              autofocus: false
            }
          },
          toolbars: {
            theme: theme.value,
            toolbar: ["bold", "italic", "underline", "strikethrough", "|", "color", "header", "|", "list", "image", {
              insert: ["link", "hr", "br", "code", "formula", "toc", "table", "line-table", "bar-table"]
            }, "settings", "togglePreview"],
            bubble: ["bold", "italic", "underline", "strikethrough", "sub", "sup", "|", "size", "color"],
            float: ["h1", "h2", "h3", "|", "checklist", "quote", "quickTable", "code"],
            customMenu: [],
            sidebar: []
          },
          callback: {
            afterChange,
            beforeImageMounted
          }
        });
      });
    };
    watch(() => UIStore.theme, (newVal) => {
      var _a;
      theme.value = newVal;
      (_a = editor.value) == null ? void 0 : _a.setTheme(theme.value);
    });
    const calcMarkDownStyle = () => {
      if (window.ResizeObserver && markDownBox.value) {
        const tempCssVars = {
          width: markDownBox.value.offsetWidth ? "".concat(markDownBox.value.offsetWidth, "px") : "100%"
        };
        if (c && typeof c.parent.model.height === "number") {
          Object.assign(tempCssVars, {
            height: "".concat(c.parent.model.height, "px")
          });
        }
        cssVars.value = ns.cssVarBlock(tempCssVars);
        resizeObserver = new ResizeObserver((entries) => {
          const width = entries[0].contentRect.width;
          if (width !== lastMarkDownWidth) {
            const tempCssVars2 = {
              width: "".concat(entries[0].contentRect.width, "px")
            };
            if (c && typeof c.parent.model.height === "number") {
              Object.assign(tempCssVars2, {
                height: "".concat(c.parent.model.height, "px")
              });
            }
            cssVars.value = ns.cssVarBlock(tempCssVars2);
            lastMarkDownWidth = width;
          }
        });
        resizeObserver.observe(markDownBox.value);
      }
    };
    onMounted(() => {
      editorInit();
      calcMarkDownStyle();
    });
    onUnmounted(() => {
      editor.value = null;
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
    });
    return {
      ns,
      currentVal,
      id,
      editor,
      markDownBox,
      headers,
      theme,
      defaultModel,
      cssVars,
      getCherryHtml,
      getCherryContent,
      setCherryContent
    };
  },
  render() {
    return createVNode("div", {
      "ref": "markDownBox",
      "class": [this.ns.b(), this.ns.is("disabled", this.disabled)]
    }, [createVNode("div", {
      "id": this.id,
      "style": this.cssVars,
      "class": this.ns.b("cherry")
    }, null)]);
  }
});

export { IBizMarkDown as default };
