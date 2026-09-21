'use strict';

var vue = require('vue');
var vue3Util = require('@ibiz-template/vue3-util');
var qxUtil = require('qx-util');
var ElementPlus = require('element-plus');
require('../../../node_modules/.pnpm/@monaco-editor_loader@1.5.0/node_modules/@monaco-editor/loader/lib/es/index.cjs');
require('./monaco-editor.css');
var index = require('../../../node_modules/.pnpm/@monaco-editor_loader@1.5.0/node_modules/@monaco-editor/loader/lib/es/loader/index.cjs');

"use strict";
const IBizCode = /* @__PURE__ */ vue.defineComponent({
  name: "IBizCode",
  props: vue3Util.getCodeProps(),
  emits: vue3Util.getCodeEmits(),
  setup(props, {
    emit
  }) {
    const codeEditBox = vue.ref();
    const ns = vue3Util.useNamespace("code");
    const c = props.controller;
    const {
      semanticClass,
      semanticStyle
    } = vue3Util.useSemanticNode(c);
    const childClass = [{
      class: semanticClass("editor.toolbar"),
      selector: ".".concat(ns.b("toolbar"))
    }, {
      class: semanticClass("editor.toolbar.item"),
      selector: ".".concat(ns.be("toolbar", "item"))
    }, {
      class: semanticClass("editor.hoverToolbar"),
      selector: ".".concat(ns.b("text-editor-toolbar"))
    }, {
      class: semanticClass("editor.hoverToolbar.item"),
      selector: ".".concat(ns.be("text-editor-toolbar", "item"))
    }, {
      class: semanticClass("editor.input"),
      selector: ".view-lines.monaco-mouse-cursor-text"
    }, {
      class: semanticClass("editor.slider"),
      selector: ".decorationsOverviewRuler"
    }, {
      class: semanticClass("editor.minimap"),
      selector: ".minimap"
    }, {
      class: semanticClass("editor.lineNumbers"),
      selector: ".margin-view-overlays"
    }, {
      class: semanticClass("editor.lineNumbers.item"),
      selector: ".margin-view-overlays .line-numbers"
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
      style: semanticStyle("editor.toolbar"),
      selector: ".".concat(ns.b("toolbar"))
    }, {
      style: semanticStyle("editor.toolbar.item"),
      selector: ".".concat(ns.be("toolbar", "item"))
    }, {
      style: semanticStyle("editor.hoverToolbar"),
      selector: ".".concat(ns.b("text-editor-toolbar"))
    }, {
      style: semanticStyle("editor.hoverToolbar.item"),
      selector: ".".concat(ns.be("text-editor-toolbar", "item"))
    }, {
      style: semanticStyle("editor.input"),
      selector: ".view-lines.monaco-mouse-cursor-text"
    }, {
      style: semanticStyle("editor.slider"),
      selector: ".decorationsOverviewRuler"
    }, {
      style: semanticStyle("editor.minimap"),
      selector: ".minimap"
    }, {
      style: semanticStyle("editor.lineNumbers"),
      selector: ".margin-view-overlays"
    }, {
      style: semanticStyle("editor.lineNumbers.item"),
      selector: ".margin-view-overlays .line-numbers"
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
    const UUID = qxUtil.createUUID();
    const currentVal = vue.ref("");
    const {
      UIStore,
      zIndex
    } = vue3Util.useUIStore();
    const enableEdit = vue.ref(true);
    const hasEnableEdit = vue.ref(false);
    const readonlyState = vue.ref(false);
    const enableFullScreen = vue.ref(false);
    const isFullScreen = vue.ref(false);
    const isLoading = vue.ref(false);
    const textTBRef = vue.ref();
    const textTBStyle = vue.ref({
      [ns.cssVarBlockName("inline-toolbar-z-index")]: zIndex.increment()
    });
    const textTBVisible = vue.ref(false);
    const editorTheme = vue.ref("");
    const functionBody = vue.ref();
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
    }
    let editor;
    let monacoEditor;
    let codeLensProviderDisposable;
    let inlineCompletionsProviderDisposable;
    let decorationsCollection;
    let chatInstance;
    const getMonacoTheme = (name) => {
      var _a, _b;
      editorTheme.value = ((_a = c == null ? void 0 : c.editorParams) == null ? void 0 : _a.customTheme) || ibiz.config.codeEditorTheme || name;
      const customTheme = (_b = c == null ? void 0 : c.editorParams) == null ? void 0 : _b.customTheme;
      if (customTheme) {
        return customTheme === "dark" ? "vs-dark" : "vs";
      }
      if (ibiz.config.codeEditorTheme) {
        return ibiz.config.codeEditorTheme === "dark" ? "vs-dark" : "vs";
      }
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
    vue.watch(() => props.data, async (newVal) => {
      if (c.functionBody) {
        functionBody.value = await ibiz.util.hbs.render(c.functionBody.replaceAll("//n", "\n"), {
          data: {
            ...newVal
          },
          context: c.context,
          params: c.params
        });
      }
    }, {
      immediate: true,
      deep: true
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
    const unload = () => {
      editor == null ? void 0 : editor.dispose();
      editor = null;
      decorationsCollection == null ? void 0 : decorationsCollection.clear();
      decorationsCollection = null;
      codeLensProviderDisposable == null ? void 0 : codeLensProviderDisposable.dispose();
      codeLensProviderDisposable = null;
      inlineCompletionsProviderDisposable == null ? void 0 : inlineCompletionsProviderDisposable.dispose();
      inlineCompletionsProviderDisposable = null;
      chatInstance == null ? void 0 : chatInstance.close();
    };
    const openAIChat = async () => {
      if (!c.deACMode || !c.model.appDataEntityId)
        return;
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
      chatInstance.create({
        resourceOptions,
        containerOptions: {
          zIndex: zIndex.increment(),
          ...containerOptions
        },
        chatOptions: {
          caption: "".concat(c.aiChatCaption || c.deACMode.logicName),
          context: {
            ...c.context
          },
          params: {
            ...c.params,
            srfactag: c.deACMode.codeName
          },
          appDataEntityId: c.model.appDataEntityId,
          ...chatOptions,
          action: (action, message) => {
            if (action === "backfill")
              emit("change", message.realcontent);
          }
        }
      });
    };
    const validate = (model) => {
      const currentEditor = monacoEditor.getEditors().find((e) => e.getModel() === model);
      if (!currentEditor || currentEditor.__instanceId !== UUID)
        return false;
      return true;
    };
    const updateTextToolbarPos = (selection) => {
      var _a;
      const position = selection.getStartPosition();
      if (position) {
        const coordinates = editor == null ? void 0 : editor.getScrolledVisiblePosition(position);
        const editorRect = (_a = editor == null ? void 0 : editor.getDomNode()) == null ? void 0 : _a.getBoundingClientRect();
        if (!editorRect || !coordinates)
          return;
        textTBStyle.value = {
          ...textTBStyle.value,
          // 编辑器左侧距离 + 选区距离编辑器左侧距离
          [ns.cssVarBlockName("inline-toolbar-left")]: "".concat(editorRect.left + coordinates.left, "px"),
          // 编辑器上方距离 + 选区距离编辑器上方距离 + 行高度
          [ns.cssVarBlockName("inline-toolbar-top")]: "".concat(editorRect.top + coordinates.top + coordinates.height, "px")
        };
      }
    };
    const setTextTBVisible = () => {
      if (props.readonly || !enableEdit.value || !c.deACMode || !c.chatCompletion)
        return;
      const selection = editor == null ? void 0 : editor.getSelection();
      textTBVisible.value = !!(selection && !selection.isEmpty());
    };
    const onSelectionChange = (e) => {
      const selection = e.selection;
      if (selection) {
        updateTextToolbarPos(selection);
        c.currentSelection = selection;
      }
    };
    const handleLineAiClick = (_e) => {
      var _a, _b;
      const position = (_a = editor == null ? void 0 : editor.getSelection()) == null ? void 0 : _a.getStartPosition();
      if (!position)
        return;
      const coordinates = editor == null ? void 0 : editor.getScrolledVisiblePosition(position);
      const editorRect = (_b = editor == null ? void 0 : editor.getDomNode()) == null ? void 0 : _b.getBoundingClientRect();
      const textTBHeight = textTBRef.value.offsetHeight;
      if (!coordinates || !editorRect || !textTBHeight)
        return;
      const items = ibiz.inLineAIUtil.calcContextMenus(c.deACMode, (tag) => {
        c.doInLineAIUIAction(tag, c.model.appId);
      });
      if (items.length === 0)
        return;
      ibiz.inLineAIUtil.showContextMenus(
        // 编辑器左侧距离 + 选区距离编辑器左侧距离
        editorRect.left + coordinates.left,
        // 编辑器上方距离 + 选区距离编辑器上方距离 + 行高度 + 工具栏高度
        editorRect.top + coordinates.top + coordinates.height + textTBHeight,
        items,
        {
          zIndex: zIndex.increment(),
          onClose: () => {
            zIndex.decrement();
          }
        }
      );
    };
    const handleEditorClick = (e) => {
      var _a;
      if (!((_a = textTBRef.value) == null ? void 0 : _a.contains(e.target))) {
        setTimeout(setTextTBVisible, 100);
      }
    };
    const handleMousedown = (e) => {
      var _a;
      if (textTBVisible.value && !((_a = textTBRef.value) == null ? void 0 : _a.contains(e.target))) {
        textTBVisible.value = false;
      }
    };
    const editorInit = () => {
      vue.nextTick(() => {
        isLoading.value = true;
        index.default.config({
          paths: {
            vs: "".concat(ibiz.env.pluginBaseUrl, "/monaco-editor@0.52.2/min/vs")
          }
        });
        index.default.init().then((loaderMonaco) => {
          var _a;
          isLoading.value = false;
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
              lineNumbers: isFullScreen.value ? "on" : c.hideLineNumbers ? "off" : "on",
              minimap: {
                enabled: isFullScreen.value ? true : !c.hideMinimap
              },
              readOnly: hasEnableEdit.value ? readonlyState.value : props.readonly || props.disabled,
              // 只读
              readOnlyMessage: {
                value: ibiz.i18n.t("editor.code.readOnlyPrompt")
              },
              fontSize: 16,
              // 字体大小
              fixedOverflowWidgets: true,
              // 确保悬浮提示不会被裁剪
              scrollBeyondLastLine: false,
              // 取消代码后面一大段空白
              overviewRulerBorder: false
              // 不要滚动条的边框
            });
            editor.__instanceId = UUID;
            if (c.chatCompletion && ibiz.env.enableAI) {
              codeLensProviderDisposable = loaderMonaco.languages.registerCodeLensProvider(props.language || props.controller.language, {
                provideCodeLenses: function(model, _token) {
                  if (!validate(model))
                    return {
                      lenses: [],
                      dispose: () => {
                      }
                    };
                  return {
                    lenses: [{
                      id: "AI",
                      range: new loaderMonaco.Range(1, 1, 1, 1),
                      command: {
                        title: "".concat(c.aiChatCaption || c.deACMode.logicName),
                        id: editor.addCommand(0, () => openAIChat())
                      }
                    }],
                    dispose: () => {
                    }
                  };
                },
                resolveCodeLens: (_model, codeLens, _token) => codeLens
              });
            }
          }
          c.onCreated(editor, loaderMonaco);
          setTimeout(() => {
            editor.layout();
            editor.setValue(currentVal.value);
          });
          const createDecorationsCollection = () => {
            if (decorationsCollection)
              decorationsCollection.clear();
            if (c.placeHolder && !(editor == null ? void 0 : editor.getValue())) {
              decorationsCollection = editor.createDecorationsCollection([{
                range: new loaderMonaco.Range(1, 1, 1, 1),
                // 影响第1行的开始位置
                options: {
                  isWholeLine: true,
                  // 是否作用于整行
                  beforeContentClassName: "".concat(ns.e("first-prompt"), " ghost-text-decoration")
                  // 在内容前加修饰 mtk8为注释样式类名
                }
              }]);
            }
          };
          const originalSetValue = editor.setValue.bind(editor);
          editor.setValue = (newValue) => {
            originalSetValue(newValue);
            createDecorationsCollection();
          };
          editor.onDidFocusEditorText(() => {
            decorationsCollection == null ? void 0 : decorationsCollection.clear();
          });
          editor.onDidBlurEditorText(() => {
            createDecorationsCollection();
          });
          editor.onDidChangeModelContent(() => {
            setTextTBVisible();
            if (!hasEnableEdit.value) {
              currentVal.value = editor.getValue();
              emit("change", currentVal.value);
            }
          });
          editor.onDidChangeCursorSelection(onSelectionChange);
          (_a = editor.getDomNode()) == null ? void 0 : _a.addEventListener("click", handleEditorClick);
          window.addEventListener("resize", () => {
            editor.layout();
          });
        }).catch(() => {
          isLoading.value = false;
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
      unload();
      isFullScreen.value = !isFullScreen.value;
      editorInit();
    };
    const isAllowRenderFullScreen = () => {
      if (enableFullScreen.value)
        return vue.createVNode("div", {
          "class": [ns.be("toolbar", "fullscreen"), ns.be("toolbar", "item")],
          "title": ibiz.i18n.t("editor.common.".concat(isFullScreen.value ? "minimize" : "fullscreen")),
          "onClick": () => changeFullScreenState()
        }, [vue.createVNode("ion-icon", {
          "name": isFullScreen.value ? "contract-outline" : "resize-outline"
        }, null)]);
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
    const renderFunctionBody = () => {
      if (!functionBody.value)
        return null;
      return vue.createVNode("div", {
        "class": [ns.e("function"), ns.be("toolbar", "item")]
      }, [vue.createVNode(vue.resolveComponent("el-tooltip"), {
        "trigger": "click",
        "effect": "light",
        "popper-class": ns.e("function-popper")
      }, {
        default: () => {
          return vue.createVNode("div", {
            "title": ibiz.i18n.t("editor.code.functionBody")
          }, [vue.createVNode("svg", {
            "viewBox": "0 0 1024 1024",
            "version": "1.1",
            "xmlns": "http://www.w3.org/2000/svg",
            "p-id": "8206",
            "width": "1em",
            "height": "1em"
          }, [vue.createVNode("path", {
            "d": "M469.211429 292.571429a36.571429 36.571429 0 0 0 0-73.142858h-259.657143a36.571429 36.571429 0 0 0-36.571429 36.571429v512a36.571429 36.571429 0 0 0 73.142857 0v-236.251429h223.085715a36.571429 36.571429 0 0 0 0-73.142857h-223.085715V292.571429zM741.302857 367.908571a182.857143 182.857143 0 0 0-182.857143 182.857143v219.428572a36.571429 36.571429 0 0 0 73.142857 0v-219.428572a109.714286 109.714286 0 1 1 219.428572 0v219.428572a36.571429 36.571429 0 0 0 73.142857 0v-219.428572a182.857143 182.857143 0 0 0-182.857143-182.857143z",
            "fill": "currentColor",
            "p-id": "8207"
          }, null)])]);
        },
        content: () => {
          return vue.createVNode(vue.resolveComponent("iBizHighLightCode"), {
            "code": functionBody.value,
            "class": ns.e("function-signature")
          }, null);
        }
      })]);
    };
    const renderHeaderToolbar = () => {
      if (hasEnableEdit.value || enableFullScreen.value || functionBody.value) {
        return vue.createVNode("div", {
          "class": ns.b("toolbar")
        }, [hasEnableEdit.value && enableEdit.value && readonlyState.value ? vue.createVNode("i", {
          "aria-hidden": "true",
          "class": ["fa fa-edit", ns.be("toolbar", "item")],
          "onClick": () => changeEditState()
        }, null) : null, renderFunctionBody(), isAllowRenderFullScreen()]);
      }
      return null;
    };
    const renderCodeContent = () => {
      return vue.createVNode("div", {
        "ref": codeEditBox,
        "class": [ns.e("box"), semanticClass("editor.content")],
        "style": {
          [ns.cssVarBlockName("placeholder")]: '"'.concat(c.placeHolder, '"'),
          ...semanticStyle("editor.content")
        }
      }, null);
    };
    const renderTextEditorToolbar = () => {
      if (!textTBVisible.value || !c.chatCompletion)
        return null;
      return vue.createVNode("div", {
        "ref": "textTBRef",
        "class": [ns.b("text-editor-toolbar")],
        "style": {
          ...textTBStyle.value
        }
      }, [vue.createVNode("div", {
        "class": [ns.be("text-editor-toolbar", "item")],
        "title": "AI",
        "onClick": handleLineAiClick
      }, [vue.createVNode("svg", {
        "version": "1.1",
        "xmlns": "http://www.w3.org/2000/svg",
        "viewBox": "0 0 1024 1024",
        "width": "1em",
        "height": "1em",
        "fill": "currentColor"
      }, [vue.createVNode("path", {
        "d": "M274.344554 173.673875c16.429399 0 30.950568 8.00526 39.956484 20.338945a34.906655 34.906655 0 0 1 14.660796 15.754537l1.117013 2.815803 210.138065 597.927736c6.795162 19.268474-5.329083 40.817516-27.041022 48.147913-20.641469 6.95806-42.493035-1.419537-50.451753-18.803052l-1.117013-2.815803-54.477653-154.939008H134.997185L80.566074 837.039954c-6.771891 19.268474-29.856826 28.949253-51.568765 21.618855-20.641469-6.981331-32.602816-26.761769-27.925325-45.239025l0.861031-2.908888L212.047809 212.58316c4.025901-11.426112 13.799764-19.477914 25.598214-22.619512 9.029188-10.006575 22.107548-16.289773 36.67526-16.289773z m386.416675 169.460176c21.828295 0 39.723774 10.890876 41.469106 24.713912l0.116356 2.210755v461.652153c0 14.893506-18.616883 26.947938-41.585462 26.947938-21.805024 0-39.700503-10.890876-41.422565-24.737183l-0.162897-2.210755V370.081989c0-14.870235 18.616883-26.924667 41.585462-26.924667z m-389.697901-48.171184L163.620643 600.628812h214.88537l-107.442685-305.665945z m602.163076-206.181978a12.566396 12.566396 0 0 1 8.144887 8.051802l32.509731 99.041817 101.694723 36.07021a12.566396 12.566396 0 0 1-0.791218 23.922695l-99.53051 27.995137-30.857483 97.552467a12.566396 12.566396 0 0 1-23.899423 0.116355l-32.509732-99.018546-98.669479-31.322905a12.566396 12.566396 0 0 1-0.186169-23.876152l97.505924-32.812256 30.834212-97.529195a12.566396 12.566396 0 0 1 15.754537-8.191429zM649.544557 0.513593c2.676177 0.884302 4.770576 3.025243 5.608336 5.724692l18.523798 59.294772 60.970292 20.66474a8.796477 8.796477 0 0 1-0.325796 16.755194l-60.73758 18.058377-19.780438 59.550754a8.796477 8.796477 0 0 1-16.731924-0.162898l-18.523798-59.271501-59.062061-17.825665a8.796477 8.796477 0 0 1-0.395609-16.708653l59.574025-20.943993 19.780438-59.574025a8.796477 8.796477 0 0 1 11.100317-5.561794z"
      }, null)])])]);
    };
    vue.onMounted(() => {
      editorInit();
      window.addEventListener("mousedown", handleMousedown.bind(this));
    });
    vue.onUnmounted(() => {
      unload();
      window.removeEventListener("mousedown", handleMousedown.bind(this));
    });
    return {
      ns,
      isLoading,
      textTBRef,
      currentVal,
      childClass,
      childStyle,
      editorTheme,
      codeEditBox,
      isFullScreen,
      hasEnableEdit,
      readonlyState,
      semanticClass,
      semanticStyle,
      renderFooter,
      renderCodeContent,
      renderHeaderToolbar,
      changeFullScreenState,
      renderTextEditorToolbar
    };
  },
  render() {
    var _a, _b;
    const isLoading = !((_b = (_a = this.controller.view) == null ? void 0 : _a.state) == null ? void 0 : _b.isLoading) && this.isLoading;
    return !this.isFullScreen ? vue.withDirectives(vue.createVNode("div", {
      "class": [this.ns.b(), this.semanticClass("editor.root"), this.ns.is(this.editorTheme, !!this.editorTheme), {
        [this.ns.b("editor-readonly")]: this.readonlyState
      }, {
        [this.ns.b("editor-enable")]: !this.readonlyState
      }, this.ns.is("enable", this.hasEnableEdit)],
      "style": this.semanticStyle("editor.root")
    }, [this.renderTextEditorToolbar(), this.renderHeaderToolbar(), this.renderCodeContent(), this.hasEnableEdit && !this.readonlyState ? this.renderFooter() : null]), [[vue.resolveDirective("loading"), isLoading], [vue.resolveDirective("child-class"), this.childClass], [vue.resolveDirective("child-style"), this.childStyle]]) : vue.createVNode(vue.resolveComponent("el-dialog"), {
      "modelValue": this.isFullScreen,
      "onUpdate:modelValue": ($event) => this.isFullScreen = $event,
      "class": this.ns.b("dialog-full-screen"),
      "onClose": () => this.changeFullScreenState()
    }, {
      default: () => [vue.withDirectives(vue.createVNode("div", {
        "class": [this.ns.b(), this.semanticClass("editor.root"), this.ns.is(this.editorTheme, !!this.editorTheme), {
          [this.ns.b("editor-readonly")]: this.readonlyState
        }, {
          [this.ns.b("editor-enable")]: !this.readonlyState
        }],
        "style": this.semanticStyle("editor.root")
      }, [this.renderTextEditorToolbar(), this.renderHeaderToolbar(), this.renderCodeContent(), this.hasEnableEdit && !this.readonlyState ? this.renderFooter() : null]), [[vue.resolveDirective("loading"), isLoading], [vue.resolveDirective("child-class"), this.childClass], [vue.resolveDirective("child-style"), this.childStyle]])]
    });
  }
});

exports.IBizCode = IBizCode;
