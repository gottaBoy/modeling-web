import { defineComponent, withDirectives, createVNode, resolveDirective, resolveComponent, ref, shallowRef, watch, onBeforeUnmount, onMounted, nextTick, onUnmounted } from 'vue';
import { Toolbar, Editor } from '@wangeditor/editor-for-vue';
import { i18nChangeLanguage } from '@wangeditor/editor';
import { isNil } from 'ramda';
import { useNamespace, useSemanticNode, useUIStore, getHtmlEmits, getHtmlProps } from '@ibiz-template/vue3-util';
import { awaitTimeout } from '@ibiz-template/core';
import { ElMessageBox } from 'element-plus';
import './module/index.mjs';
import './config/index.mjs';
import './wang-editor.css';
import { genDefaultToolbarKeys } from './config/toolbar.mjs';
import { hoverbarKeysEx } from './module/inline-ai-module.mjs';

"use strict";
const IBizHtml = /* @__PURE__ */ defineComponent({
  name: "IBizHtml",
  props: getHtmlProps(),
  emits: getHtmlEmits(),
  setup(props, {
    emit,
    slots
  }) {
    var _a;
    const ns = useNamespace("html");
    const c = props.controller;
    const {
      semanticClass,
      semanticStyle
    } = useSemanticNode(c);
    const childClass = [{
      class: semanticClass("editor.customToolbar"),
      selector: ".".concat(ns.b("custom-toolbar"))
    }, {
      class: semanticClass("editor.customToolbar.item"),
      selector: ".".concat(ns.be("custom-toolbar", "item"))
    }, {
      class: semanticClass("editor.hoverToolbar"),
      selector: ".w-e-hover-bar"
    }, {
      class: semanticClass("editor.hoverToolbar.item"),
      selector: ".w-e-hover-bar .w-e-bar-item"
    }, {
      class: semanticClass("editor.toolbar"),
      selector: ".w-e-toolbar"
    }, {
      class: semanticClass("editor.toolbar.item"),
      selector: ".w-e-toolbar .w-e-bar-item"
    }, {
      class: semanticClass("editor.input"),
      selector: ".".concat(ns.b("editor"))
    }, {
      class: semanticClass("editor.footer"),
      selector: ".".concat(ns.b("footer"))
    }, {
      class: semanticClass("editor.footer.cancel"),
      selector: ".".concat(ns.be("footer", "cancel"))
    }, {
      class: semanticClass("editor.footer.save"),
      selector: ".".concat(ns.be("footer", "save"))
    }];
    const childStyle = [{
      style: semanticStyle("editor.customToolbar"),
      selector: ".".concat(ns.b("custom-toolbar"))
    }, {
      style: semanticStyle("editor.customToolbar.item"),
      selector: ".".concat(ns.be("custom-toolbar", "item"))
    }, {
      style: semanticStyle("editor.hoverToolbar"),
      selector: ".w-e-hover-bar"
    }, {
      style: semanticStyle("editor.hoverToolbar.item"),
      selector: ".w-e-hover-bar .w-e-bar-item"
    }, {
      style: semanticStyle("editor.toolbar"),
      selector: ".w-e-toolbar"
    }, {
      style: semanticStyle("editor.toolbar.item"),
      selector: ".w-e-toolbar .w-e-bar-item"
    }, {
      style: semanticStyle("editor.input"),
      selector: ".".concat(ns.b("editor"))
    }, {
      style: semanticStyle("editor.footer"),
      selector: ".".concat(ns.b("footer"))
    }, {
      style: semanticStyle("editor.footer.cancel"),
      selector: ".".concat(ns.be("footer", "cancel"))
    }, {
      style: semanticStyle("editor.footer.save"),
      selector: ".".concat(ns.be("footer", "save"))
    }];
    const htmlContent = ref();
    const cssVars = ref({});
    let resizeObserver = null;
    let lastToolbarHeight = 0;
    const toolbarRef = ref();
    const editorRef = shallowRef();
    const valueHtml = ref("");
    const uploadHeaders = ibiz.util.file.getUploadHeaders();
    const headers = ref({
      ...uploadHeaders
    });
    const uploadUrl = ref("");
    const enableEdit = ref(true);
    const hasEnableEdit = ref(false);
    const readonlyState = ref(false);
    const enableFullScreen = ref(false);
    const isFullScreen = ref(false);
    let enableNoAccess = false;
    const editorModel = c.model;
    if (editorModel.editorParams) {
      if (editorModel.editorParams.enableEdit) {
        hasEnableEdit.value = true;
        readonlyState.value = true;
        enableEdit.value = c.toBoolean(editorModel.editorParams.enableEdit) && !props.readonly && !props.disabled;
      }
      if (editorModel.editorParams.enableedit) {
        hasEnableEdit.value = true;
        readonlyState.value = true;
        enableEdit.value = c.toBoolean(editorModel.editorParams.enableedit) && !props.readonly && !props.disabled;
      }
      if (editorModel.editorParams.enableFullScreen) {
        enableFullScreen.value = c.toBoolean(editorModel.editorParams.enableFullScreen);
      }
      if (editorModel.editorParams.enablefullscreen) {
        enableFullScreen.value = c.toBoolean(editorModel.editorParams.enablefullscreen);
      }
      if (editorModel.editorParams.enablenoaccess) {
        enableNoAccess = ((_a = c == null ? void 0 : c.editorParams) == null ? void 0 : _a.enablenoaccess) === "true";
      }
    }
    if (props.readonly) {
      hasEnableEdit.value = false;
      readonlyState.value = true;
    }
    const getDownloadUrl = (data, file) => {
      const editorParams = {
        ...c.editorParams,
        enableNoAccess
      };
      if (editorParams.exportparams) {
        editorParams.exportParams = JSON.parse(editorParams.exportparams);
      }
      if (file && file.folder) {
        editorParams.osscat = file.folder;
      }
      if (editorParams.globaldownloadprifix) {
        editorParams.globalDownloadPrifix = editorParams.globaldownloadprifix === "true";
      } else {
        editorParams.globalDownloadPrifix = ibiz.config.common.globalDownloadPrifix;
      }
      const urls = ibiz.util.file.calcFileUpDownUrl(c.context, c.params, data, editorParams);
      return urls.downloadUrl;
    };
    watch(() => props.data, (newVal) => {
      if (newVal) {
        const editorParams = {
          ...c.editorParams,
          enableNoAccess
        };
        if (editorParams.uploadparams) {
          editorParams.uploadParams = JSON.parse(editorParams.uploadparams);
        }
        const urls = ibiz.util.file.calcFileUpDownUrl(c.context, c.params, newVal, editorParams);
        uploadUrl.value = urls.uploadUrl;
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
    const toolbarKeys = genDefaultToolbarKeys();
    if (c.chatCompletion)
      toolbarKeys.unshift(...["aichart", "|"]);
    if (c.extraActions.length > 0) {
      const keys = c.extraActions.map((item) => {
        return item.uiactionId.split("@")[0];
      });
      toolbarKeys.push(...keys);
    }
    const toolbarConfig = {
      excludeKeys: ["group-video", "emotion"],
      toolbarKeys
    };
    const language = ibiz.i18n.getLang();
    i18nChangeLanguage(language);
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
            if (ibiz.config.common.enableDownloadTicket && !enableNoAccess && res.ticket) {
              ibiz.util.file.setDownloadTicket(res.id, res.ticket);
            }
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
            const downloadUrl = getDownloadUrl(props.data, res);
            let url = downloadUrl.replace("%fileId%", res.id);
            const alt = res.filename;
            if (ibiz.config.common.enableDownloadTicket && !enableNoAccess) {
              const downloadTicket = await ibiz.util.file.getDownloadTicket(c.context, c.params, props.data, {
                fileId: res.id
              }, c.downloadTicketParams);
              if (downloadTicket && downloadTicket.ticket) {
                url = downloadUrl.replace("%fileId%", downloadTicket.ticket);
                insertFn(url, alt, "");
              }
            } else {
              insertFn(url, alt, "");
            }
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
      },
      hoverbarKeys: hoverbarKeysEx
    };
    onBeforeUnmount(() => {
      const editor = editorRef.value;
      if (editor == null)
        return;
      editor.destroy();
    });
    let chatInstance;
    const onClickAI = async () => {
      const appDataEntityId = c.model.appDataEntityId;
      if (!appDataEntityId || !c.deACMode)
        return;
      const {
        zIndex
      } = useUIStore();
      const containerZIndex = zIndex.increment();
      chatInstance = await ibiz.aiChatUtil.getAIChat();
      const {
        containerOptions,
        chatOptions
      } = await ibiz.aiChatUtil.getEditorExAIChatParams(c.editorParams, c.context, c.params, props.data, c.deACMode, {
        chatInstance,
        view: c.view,
        ctrl: c.ctrl
      });
      const resourceOptions = await ibiz.aiChatUtil.getAIResourceOptions(c.context, c.params);
      let chatCaption = c.deACMode.logicName;
      if (c.editorParams.srfaichatcaption) {
        chatCaption = ibiz.appUtil.resolveI18nText(c.editorParams.srfaichatcaption);
      }
      chatInstance.create({
        resourceOptions,
        containerOptions: {
          zIndex: containerZIndex,
          ...containerOptions
        },
        chatOptions: {
          caption: chatCaption,
          context: {
            ...c.context
          },
          params: {
            ...c.params,
            srfactag: c.deACMode.codeName
          },
          appDataEntityId,
          ...chatOptions,
          action: (action, message) => {
            if (action === "backfill") {
              if (hasEnableEdit.value) {
                valueHtml.value = message.realcontent || "";
              } else {
                emit("change", message.realcontent);
              }
            }
          }
        }
      });
    };
    const handleCreated = (editor) => {
      editorRef.value = editor;
      c.onCreated(editorRef.value);
      editor.setHtml(valueHtml.value);
      editor.on("aiClick", () => {
        onClickAI();
      });
      editor.on("lineAiClick", () => {
        const container = editor.getEditableContainer();
        const hoverToolbar = container.querySelector(".w-e-hover-bar");
        if (!hoverToolbar) {
          return;
        }
        const {
          offsetLeft,
          offsetTop,
          offsetHeight
        } = hoverToolbar;
        const items = ibiz.inLineAIUtil.calcContextMenus(c.deACMode, (tag) => {
          c.doInLineAIUIAction(tag, c.model.appId);
        });
        if (items.length === 0)
          return;
        const editorBoundingClientRect = editor.getEditableContainer().getBoundingClientRect();
        const {
          zIndex
        } = useUIStore();
        const popoverZIndex = zIndex.increment();
        ibiz.inLineAIUtil.showContextMenus(
          // 编辑器的左侧距离+选区距离编辑器左侧距离
          editorBoundingClientRect.x + offsetLeft,
          // 编辑器的上方距离+选区距离编辑器上方距离+悬浮工具栏高度
          editorBoundingClientRect.y + offsetTop + offsetHeight,
          items,
          {
            zIndex: popoverZIndex,
            onClose: () => {
              zIndex.decrement();
            }
          }
        );
      });
      editor.on("customAction", async (model) => {
        const data = await c.doCustomUIAction(model.uiactionId, c.model.appId);
        if (data.length > 0) {
          emit("customAction", {
            tag: model.uiactionId,
            data
          });
        }
      });
    };
    const handleChange = (editor) => {
      const html = editor.getHtml();
      const emitValue = html === "<p><br></p>" ? "" : html;
      if (emitValue === props.value || emitValue === "" && isNil(props.value)) {
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
    onMounted(() => {
      watch(() => props.value, (newVal, oldVal) => {
        if (newVal !== oldVal && (typeof props.value === "string" || newVal == null)) {
          if (newVal == null) {
            nextTick(() => {
              valueHtml.value = "";
            });
          } else {
            nextTick(() => {
              valueHtml.value = newVal;
            });
          }
        }
      }, {
        immediate: true
      });
      watch(() => props.disabled, (newVal, oldVal) => {
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
      awaitTimeout(0, () => {
        if (htmlContent.value && toolbarRef.value) {
          const htmlContentHeight = htmlContent.value.offsetHeight;
          resizeObserver = new ResizeObserver((entries) => {
            const height = entries[0].contentRect.height;
            if (height !== lastToolbarHeight) {
              const tempCssVars = {
                height: "".concat(htmlContentHeight - entries[0].contentRect.height + (height !== 0 ? 300 : 0), "px"),
                "toolbar-height": "".concat(height, "px")
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
      var _a2, _b;
      if (props.value) {
        const index = props.value.indexOf("</p>");
        if (index >= 0) {
          const offset = (_a2 = editorRef.value.selection.anchor) == null ? void 0 : _a2.offset;
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
      return createVNode("div", {
        "class": ns.be("message", "message-content")
      }, [createVNode("p", null, [ibiz.i18n.t("editor.common.confirmCancelPrompt")]), createVNode("p", {
        "class": ns.bem("message", "message-content", "message-tip")
      }, [ibiz.i18n.t("editor.common.cancelEditPrompt")])]);
    };
    const cancelEdit = () => {
      if (props.value !== valueHtml.value) {
        ElMessageBox({
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
    const changeFullScreenState = () => {
      isFullScreen.value = !isFullScreen.value;
      nextTick(() => {
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
          return createVNode("i", {
            "class": ["fa fa-compress", ns.be("custom-toolbar", "item")],
            "aria-hidden": "true",
            "title": ibiz.i18n.t("editor.html.reduce"),
            "onClick": () => changeFullScreenState()
          }, null);
        }
        return createVNode("i", {
          "class": ["fa fa-expand", ns.be("custom-toolbar", "item")],
          "aria-hidden": "true",
          "title": ibiz.i18n.t("editor.html.expand"),
          "onClick": () => changeFullScreenState()
        }, null);
      }
      return null;
    };
    const renderHeaserToolbar = () => {
      if (hasEnableEdit.value || enableFullScreen.value) {
        return createVNode("div", {
          "class": ns.b("custom-toolbar")
        }, [hasEnableEdit.value && enableEdit.value && readonlyState.value ? createVNode("i", {
          "aria-hidden": "true",
          "class": ["fa fa-edit", ns.be("custom-toolbar", "item")],
          "title": ibiz.i18n.t("editor.html.enableedit"),
          "onClick": () => changeEditState()
        }, null) : null, isAllowRenderFullScreen()]);
      }
      return null;
    };
    const renderEditorContent = () => {
      return createVNode("div", {
        "ref": "htmlContent",
        "class": [ns.b("content"), ns.is("editing", !readonlyState.value), semanticClass("editor.content")],
        "style": {
          ...cssVars.value,
          ...semanticStyle("editor.content")
        }
      }, [slots.editorSwitchMenu ? createVNode("div", {
        "class": ns.b("menu")
      }, [slots.editorSwitchMenu()]) : null, createVNode(Toolbar, {
        "ref": "toolbarRef",
        "editor": editorRef.value,
        "default-config": toolbarConfig,
        "mode": "default",
        "class": ns.b("toolbar")
      }, null), createVNode(Editor, {
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
    onMounted(() => {
      calcHtmlStyle();
    });
    onUnmounted(() => {
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
      cssVars,
      valueHtml,
      editorRef,
      childClass,
      childStyle,
      toolbarRef,
      htmlContent,
      editorConfig,
      isFullScreen,
      hasEnableEdit,
      toolbarConfig,
      readonlyState,
      semanticClass,
      semanticStyle,
      mode: "default",
      enable,
      disable,
      printHtml,
      insertText,
      handleBlur,
      handleFocus,
      customAlert,
      customPaste,
      handleChange,
      renderFooter,
      handleCreated,
      handleDestroyed,
      renderHeaserToolbar,
      renderEditorContent,
      changeFullScreenState
    };
  },
  render() {
    const isShowEditorSwitchMenu = !!this.$slots.editorSwitchMenu;
    return !this.isFullScreen ? withDirectives(createVNode("div", {
      "class": [this.ns.b(), this.semanticClass("editor.root"), {
        [this.ns.b("editor-readonly")]: this.readonlyState
      }, this.ns.is("show-ai", true), this.ns.is("enable-edit", !this.readonly && !this.disabled), this.ns.is("show-editor-switch-menu", isShowEditorSwitchMenu)],
      "style": this.semanticStyle("editor.root")
    }, [this.renderHeaserToolbar(), this.renderEditorContent(), this.hasEnableEdit && !this.readonlyState ? this.renderFooter() : null]), [[resolveDirective("child-class"), this.childClass], [resolveDirective("child-style"), this.childStyle]]) : createVNode(resolveComponent("el-dialog"), {
      "modelValue": this.isFullScreen,
      "onUpdate:modelValue": ($event) => this.isFullScreen = $event,
      "width": "80%",
      "top": "10vh",
      "class": [this.ns.b("dialog-full-screen"), this.ns.is("editing", !this.readonlyState)],
      "onClose": () => this.changeFullScreenState()
    }, {
      default: () => [withDirectives(createVNode("div", {
        "class": [this.ns.b(), this.semanticClass("editor.root"), {
          [this.ns.b("editor-readonly")]: this.readonlyState
        }, this.ns.is("show-editor-switch-menu", isShowEditorSwitchMenu)],
        "style": this.semanticStyle("editor.root")
      }, [this.renderHeaserToolbar(), this.renderEditorContent(), this.hasEnableEdit && !this.readonlyState ? this.renderFooter() : null]), [[resolveDirective("child-class"), this.childClass], [resolveDirective("child-style"), this.childStyle]])]
    });
  }
});

export { IBizHtml as default };
