'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var vue3Util = require('@ibiz-template/vue3-util');
var qxUtil = require('qx-util');
var Cherry = require('cherry-markdown');
var core = require('@ibiz-template/core');
require('./ibiz-markdown-editor.css');

"use strict";
const IBizMarkDown = /* @__PURE__ */ vue.defineComponent({
  name: "IBizMarkDown",
  props: vue3Util.getMarkDownProps(),
  emits: vue3Util.getEditorEmits(),
  setup(props, {
    emit
  }) {
    const ns = vue3Util.useNamespace("markdown");
    const c = props.controller;
    const currentVal = vue.ref("");
    const editor = vue.ref(null);
    const id = qxUtil.createUUID();
    const headers = vue.ref({
      ["".concat(ibiz.env.tokenHeader, "Authorization")]: "".concat(ibiz.env.tokenPrefix, "Bearer ").concat(core.getAppCookie(core.CoreConst.TOKEN))
    });
    const uploadUrl = vue.ref("");
    const downloadUrl = vue.ref("");
    const {
      UIStore
    } = vue3Util.useUIStore();
    const theme = vue.ref(UIStore.theme);
    const defaultModel = vue.ref("editOnly");
    let resizeObserver = null;
    let lastMarkDownWidth = 0;
    const cssVars = vue.ref({});
    vue.watch(() => props.data, (newVal) => {
      if (newVal && c) {
        const urls = ibiz.util.file.calcFileUpDownUrl(c.context, c.params, newVal, c.editorParams);
        uploadUrl.value = urls.uploadUrl;
        downloadUrl.value = urls.downloadUrl;
      }
    }, {
      immediate: true,
      deep: true
    });
    const markDownBox = vue.ref();
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
    vue.watch(() => props.value, (newVal, oldVal) => {
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
    vue.watch(currentVal, (newVal, oldVal) => {
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
      vue.nextTick(() => {
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
    vue.watch(() => UIStore.theme, (newVal) => {
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
    vue.onMounted(() => {
      editorInit();
      calcMarkDownStyle();
    });
    vue.onUnmounted(() => {
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
    return vue.createVNode("div", {
      "ref": "markDownBox",
      "class": [this.ns.b(), this.ns.is("disabled", this.disabled)]
    }, [vue.createVNode("div", {
      "id": this.id,
      "style": this.cssVars,
      "class": this.ns.b("cherry")
    }, null)]);
  }
});

exports.default = IBizMarkDown;
