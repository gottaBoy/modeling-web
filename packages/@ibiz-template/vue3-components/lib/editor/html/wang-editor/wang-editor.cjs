'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var editorForVue = require('@wangeditor/editor-for-vue');
var qxUtil = require('qx-util');
var ramda = require('ramda');
var vue3Util = require('@ibiz-template/vue3-util');
var core = require('@ibiz-template/core');
var ElementPlus = require('element-plus');
require('./wang-editor.css');

"use strict";
const IBizHtml = /* @__PURE__ */ vue.defineComponent({
  name: "IBizHtml",
  props: vue3Util.getHtmlProps(),
  emits: vue3Util.getEditorEmits(),
  setup(props, {
    emit
  }) {
    const ns = vue3Util.useNamespace("html");
    const c = props.controller;
    const htmlContent = vue.ref();
    const cssVars = vue.ref({});
    let resizeObserver = null;
    let lastToolbarHeight = 0;
    const toolbarRef = vue.ref();
    const editorRef = vue.shallowRef();
    const valueHtml = vue.ref("");
    const headers = vue.ref({
      ["".concat(ibiz.env.tokenHeader, "Authorization")]: "".concat(ibiz.env.tokenPrefix, "Bearer ").concat(core.getAppCookie(core.CoreConst.TOKEN))
    });
    const uploadUrl = vue.ref("");
    const downloadUrl = vue.ref("");
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
    if (props.readonly) {
      hasEnableEdit.value = false;
      readonlyState.value = true;
    }
    vue.watch(() => props.data, (newVal) => {
      if (newVal) {
        const urls = ibiz.util.file.calcFileUpDownUrl(c.context, c.params, newVal, c.editorParams);
        uploadUrl.value = urls.uploadUrl;
        downloadUrl.value = urls.downloadUrl;
      }
    }, {
      immediate: true,
      deep: true
    });
    const customCheckLinkFn = (text, url) => {
      if (!url) {
        return;
      }
      return true;
    };
    const customParseLinkUrl = (url) => {
      return url;
    };
    const toolbarConfig = {
      excludeKeys: ["group-video", "emotion"],
      insertKeys: {
        index: 60,
        keys: c.chatCompletion ? ["emoji", "|", "aichart"] : ["emoji"]
      }
    };
    const editorConfig = {
      placeholder: c.placeHolder,
      readOnly: hasEnableEdit.value ? readonlyState.value : props.readonly,
      MENU_CONF: {
        // 图片上传
        uploadImage: {
          // 上传地址
          server: uploadUrl.value,
          // form-data fieldName ，默认值 'wangeditor-uploaded-image'
          fieldName: "file",
          // 单个文件的最大体积限制，默认为 2M
          maxFileSize: 10 * 1024 * 1024,
          // 10M
          // 最多可上传几个文件，默认为 100
          maxNumberOfFiles: 10,
          // 选择文件时的类型限制，默认为 ['image/*'] 。如不想限制，则设置为 []
          allowedFileTypes: [],
          // 自定义增加 http  header
          headers: headers.value,
          // 跨域是否传递 cookie ，默认为 false
          withCredentials: true,
          // 上传之前触发
          onBeforeUpload(file) {
            return file;
          },
          // 上传进度的回调函数
          onProgress(progress) {
            console.log("progress", progress);
          },
          // 单个文件上传成功之后
          onSuccess(file, res) {
            console.log("".concat(file.name, " \u4E0A\u4F20\u6210\u529F"), res);
          },
          // 单个文件上传失败
          onFailed(file, res) {
            console.log("".concat(file.name, " \u4E0A\u4F20\u5931\u8D25"), res);
          },
          // 上传错误，或者触发 timeout 超时
          onError(file, err, res) {
            console.log("".concat(file.name, " \u4E0A\u4F20\u51FA\u9519"), err, res);
          },
          // 自定义插入图片
          async customInsert(res, insertFn) {
            const url = downloadUrl.value.replace("%fileId%", res.id);
            const alt = res.filename;
            insertFn(url, alt, "");
          }
        },
        // 插入链接
        insertLink: {
          checkLink: customCheckLinkFn,
          // 也支持 async 函数
          parseLinkUrl: customParseLinkUrl
          // 也支持 async 函数
        },
        // 更新链接
        editLink: {
          checkLink: customCheckLinkFn,
          // 也支持 async 函数
          parseLinkUrl: customParseLinkUrl
          // 也支持 async 函数
        }
      }
    };
    vue.onBeforeUnmount(() => {
      const editor = editorRef.value;
      if (editor == null)
        return;
      editor.destroy();
    });
    let chatInstance;
    const onClickAI = async () => {
      var _a;
      if (c.deService) {
        const module = await import('@ibiz-template-plugin/ai-chat');
        const chat = module.chat || module.default.chat;
        chatInstance = chat;
        const aiChat = chat.create({
          question: async (arr) => {
            var _a2;
            const id = qxUtil.createUUID();
            await ((_a2 = c.deService) == null ? void 0 : _a2.aiChatSse((msg) => {
              ibiz.log.info("aiChatSse", msg);
              if (msg.actionstate === 20 && msg.actionresult) {
                aiChat.addMessage({
                  messageid: id,
                  state: msg.actionstate,
                  type: "DEFAULT",
                  role: "ASSISTANT",
                  content: msg.actionresult
                });
              } else if (msg.actionstate === 30 && msg.actionresult) {
                const result = JSON.parse(msg.actionresult);
                const choices = result.choices;
                if (choices && choices.length > 0) {
                  aiChat.replaceMessage({
                    messageid: id,
                    state: msg.actionstate,
                    type: "DEFAULT",
                    role: "ASSISTANT",
                    content: choices[0].content || ""
                  });
                }
              } else if (msg.actionstate === 40) {
                aiChat.replaceMessage({
                  messageid: id,
                  state: msg.actionstate,
                  type: "ERROR",
                  role: "ASSISTANT",
                  content: msg.actionresult
                });
              }
            }, c.context, {}, {
              messages: arr
            }));
            aiChat.addMessage({
              messageid: id,
              state: 10,
              type: "DEFAULT",
              role: "ASSISTANT",
              content: ""
            });
            return true;
          },
          action: (action, message) => {
            if (action === "backfill") {
              if (hasEnableEdit.value) {
                valueHtml.value = message.content;
              } else {
                emit("change", message.content);
              }
            }
          }
        });
        const res = await ((_a = c.deService) == null ? void 0 : _a.aiChatHistory(c.context, {}));
        if (res.data && Array.isArray(res.data)) {
          res.data.forEach((item) => {
            const msg = {
              messageid: qxUtil.createUUID(),
              state: 30,
              type: "DEFAULT",
              role: item.role,
              content: item.content
            };
            aiChat.addMessage(msg);
          });
        }
      }
    };
    const handleCreated = (editor) => {
      editorRef.value = editor;
      c.onCreated(editorRef.value);
      editor.setHtml(valueHtml.value);
      editor.on("aiClick", () => {
        onClickAI();
      });
    };
    const handleChange = (editor) => {
      const html = editor.getHtml();
      const emitValue = html === "<p><br></p>" ? "" : html;
      if (emitValue === props.value || emitValue === "" && ramda.isNil(props.value)) {
        return;
      }
      if (!hasEnableEdit.value && editor.isFocused()) {
        emit("change", emitValue);
      }
    };
    const handleDestroyed = (_editor) => {
    };
    const handleFocus = (_editor) => {
      emit("focus");
    };
    const handleBlur = (_editor) => {
      emit("blur");
    };
    const customAlert = (info, type) => {
      alert("\u3010".concat(ibiz.i18n.t("editor.html.wangEditor.customTips"), "\u3011").concat(type, " - ").concat(info));
    };
    const customPaste = (editor, event, callback) => {
      callback(true);
    };
    const insertText = (str) => {
      const editor = editorRef.value;
      if (editor == null)
        return;
      editor.insertText(str);
    };
    const printHtml = () => {
      const editor = editorRef.value;
      if (editor == null)
        return;
      console.log(editor.getHtml());
    };
    const disable = () => {
      const editor = editorRef.value;
      if (editor == null)
        return;
      editor.disable();
    };
    const enable = () => {
      const editor = editorRef.value;
      if (editor == null)
        return;
      editor.enable();
    };
    vue.onMounted(() => {
      vue.watch(() => props.value, (newVal, oldVal) => {
        if (newVal !== oldVal && (typeof props.value === "string" || newVal == null)) {
          if (newVal == null) {
            vue.nextTick(() => {
              valueHtml.value = "";
            });
          } else {
            vue.nextTick(() => {
              valueHtml.value = newVal;
            });
          }
        }
      }, {
        immediate: true
      });
      vue.watch(() => props.disabled, (newVal, oldVal) => {
        if (newVal !== oldVal) {
          if (newVal === true) {
            disable();
          } else {
            enable();
          }
        }
      }, {
        immediate: true
      });
    });
    const calcHtmlStyle = () => {
      core.awaitTimeout(0, () => {
        if (htmlContent.value && toolbarRef.value) {
          const htmlContentHeight = htmlContent.value.offsetHeight;
          resizeObserver = new ResizeObserver((entries) => {
            const height = entries[0].contentRect.height;
            if (height !== lastToolbarHeight) {
              const tempCssVars = {
                height: "".concat(htmlContentHeight - entries[0].contentRect.height + (height !== 0 ? 300 : 0), "px")
              };
              cssVars.value = ns.cssVarBlock(tempCssVars);
              lastToolbarHeight = height;
            }
          });
          resizeObserver.observe(toolbarRef.value.selector);
        }
      });
    };
    const moveToLastStr = () => {
      var _a, _b;
      if (props.value) {
        const index = props.value.indexOf("</p>");
        if (index >= 0) {
          const offset = (_a = editorRef.value.selection.anchor) == null ? void 0 : _a.offset;
          const path = (_b = editorRef.value.selection.anchor) == null ? void 0 : _b.path;
          if (offset === 0 && path.length > 0 && path[0] === 0) {
            editorRef.value.move(index - 3);
          }
        }
      }
    };
    const changeEditState = () => {
      readonlyState.value = !readonlyState.value;
      if (!readonlyState.value) {
        enable();
        editorRef.value.focus();
        moveToLastStr();
      } else {
        disable();
      }
    };
    const renderCancelMessage = () => {
      return vue.createVNode("div", {
        "class": ns.be("message", "message-content")
      }, [vue.createVNode("p", null, [ibiz.i18n.t("editor.common.confirmCancelPrompt")]), vue.createVNode("p", {
        "class": ns.bem("message", "message-content", "message-tip")
      }, [ibiz.i18n.t("editor.common.cancelEditPrompt")])]);
    };
    const cancelEdit = () => {
      if (props.value !== valueHtml.value) {
        ElementPlus.ElMessageBox({
          title: ibiz.i18n.t("editor.common.confirmCancel"),
          type: "warning",
          customClass: ns.b("message"),
          message: renderCancelMessage(),
          showCancelButton: true,
          cancelButtonClass: ns.be("message", "message-cancel"),
          confirmButtonClass: ns.be("message", "message-comfire")
        }).then(() => {
          valueHtml.value = props.value || "";
          changeEditState();
        }).catch(() => {
          editorRef.value.focus();
        });
      } else {
        changeEditState();
      }
    };
    const save = () => {
      readonlyState.value = true;
      editorRef.value.disable();
      const value = valueHtml.value;
      emit("change", value);
      if (isFullScreen.value) {
        isFullScreen.value = false;
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
    const changeFullScreenState = () => {
      isFullScreen.value = !isFullScreen.value;
      vue.nextTick(() => {
        if (readonlyState.value) {
          disable();
        } else {
          enable();
          editorRef.value.focus();
        }
      });
    };
    const isAllowRenderFullScreen = () => {
      if (enableFullScreen.value) {
        if (isFullScreen.value) {
          return vue.createVNode("i", {
            "class": "fa fa-compress",
            "aria-hidden": "true",
            "title": ibiz.i18n.t("editor.html.reduce"),
            "onClick": () => changeFullScreenState()
          }, null);
        }
        return vue.createVNode("i", {
          "class": "fa fa-expand",
          "aria-hidden": "true",
          "title": ibiz.i18n.t("editor.html.expand"),
          "onClick": () => changeFullScreenState()
        }, null);
      }
      return null;
    };
    const renderHeaserToolbar = () => {
      if (hasEnableEdit.value || enableFullScreen.value) {
        return vue.createVNode("div", {
          "class": ns.b("custom-toolbar")
        }, [hasEnableEdit.value && enableEdit.value && readonlyState.value ? vue.createVNode("i", {
          "class": "fa fa-edit",
          "aria-hidden": "true",
          "title": ibiz.i18n.t("editor.html.enableedit"),
          "onClick": () => changeEditState()
        }, null) : null, isAllowRenderFullScreen()]);
      }
      return null;
    };
    const renderEditorContent = () => {
      return vue.createVNode("div", {
        "class": ns.b("content"),
        "ref": "htmlContent",
        "style": cssVars.value
      }, [vue.createVNode(editorForVue.Toolbar, {
        "ref": "toolbarRef",
        "editor": editorRef.value,
        "default-config": toolbarConfig,
        "mode": "default",
        "class": ns.b("toolbar")
      }, null), vue.createVNode(editorForVue.Editor, {
        "class": [ns.b("editor"), ns.is("readonly", readonlyState.value)],
        "modelValue": valueHtml.value,
        "onUpdate:modelValue": ($event) => valueHtml.value = $event,
        "default-config": editorConfig,
        "mode": "default",
        "onOnCreated": handleCreated,
        "onOnChange": handleChange,
        "onOnDestroyed": handleDestroyed,
        "onOnFocus": handleFocus,
        "onOnBlur": handleBlur,
        "oncustomAlert": customAlert,
        "oncustomPaste": customPaste
      }, null)]);
    };
    vue.onMounted(() => {
      calcHtmlStyle();
    });
    vue.onUnmounted(() => {
      c.onDestroyed();
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
      if (chatInstance) {
        chatInstance.close();
      }
    });
    return {
      ns,
      editorRef,
      mode: "default",
      valueHtml,
      toolbarConfig,
      editorConfig,
      handleCreated,
      handleChange,
      handleDestroyed,
      handleFocus,
      handleBlur,
      customAlert,
      customPaste,
      insertText,
      printHtml,
      disable,
      enable,
      renderHeaserToolbar,
      renderEditorContent,
      renderFooter,
      htmlContent,
      hasEnableEdit,
      cssVars,
      toolbarRef,
      isFullScreen,
      readonlyState,
      changeFullScreenState
    };
  },
  render() {
    return !this.isFullScreen ? vue.createVNode("div", {
      "class": [this.ns.b(), {
        [this.ns.b("editor-readonly")]: this.readonlyState
      }, this.ns.is("show-ai", true)]
    }, [this.renderHeaserToolbar(), this.renderEditorContent(), this.hasEnableEdit && !this.readonlyState ? this.renderFooter() : null]) : vue.createVNode(vue.resolveComponent("el-dialog"), {
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
        }]
      }, [this.renderHeaserToolbar(), this.renderEditorContent(), this.hasEnableEdit && !this.readonlyState ? this.renderFooter() : null])]
    });
  }
});

exports.default = IBizHtml;
