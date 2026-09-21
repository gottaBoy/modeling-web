'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var vue3Util = require('@ibiz-template/vue3-util');
var qxUtil = require('qx-util');
var Cherry = require('cherry-markdown');
var runtime = require('@ibiz-template/runtime');
var core = require('@ibiz-template/core');
var customMenu = require('./custom-menu.cjs');
var renderUtil = require('./render-util.cjs');
require('./ibiz-markdown-editor.css');

"use strict";
const IBizMarkDown = /* @__PURE__ */ vue.defineComponent({
  name: "IBizMarkDown",
  props: vue3Util.getMarkDownProps(),
  emits: vue3Util.getMarkDownEmits(),
  setup(props, {
    emit,
    slots
  }) {
    var _a, _b, _c, _d, _e, _f;
    const ns = vue3Util.useNamespace("markdown");
    const c = props.controller;
    const currentVal = vue.ref("");
    let editor = null;
    let semanticClass;
    let semanticStyle;
    if (c) {
      const {
        semanticClass: _semanticClass,
        semanticStyle: _semanticStyle
      } = vue3Util.useSemanticNode(c);
      semanticClass = _semanticClass;
      semanticStyle = _semanticStyle;
    }
    const childClass = [{
      class: semanticClass == null ? void 0 : semanticClass("editor.toolbar"),
      selector: ".cherry-toolbar"
    }, {
      class: semanticClass == null ? void 0 : semanticClass("editor.toolbar.item"),
      selector: ".cherry-toolbar .cherry-toolbar-button"
    }, {
      class: semanticClass == null ? void 0 : semanticClass("editor.customToolbar"),
      selector: ".".concat(ns.b("custom-toolbar"))
    }, {
      class: semanticClass == null ? void 0 : semanticClass("editor.customToolbar.item"),
      selector: ".".concat(ns.be("custom-toolbar", "item"))
    }, {
      class: semanticClass == null ? void 0 : semanticClass("editor.hoverToolbar"),
      selector: ".cherry-bubble"
    }, {
      class: semanticClass == null ? void 0 : semanticClass("editor.hoverToolbar.item"),
      selector: ".cherry-bubble .cherry-toolbar-button"
    }, {
      class: semanticClass == null ? void 0 : semanticClass("editor.floatMenu"),
      selector: ".cherry-floatmenu"
    }, {
      class: semanticClass == null ? void 0 : semanticClass("editor.floatMenu.item"),
      selector: ".cherry-floatmenu .cherry-toolbar-button"
    }, {
      class: semanticClass == null ? void 0 : semanticClass("editor.input"),
      selector: ".cherry-editor"
    }, {
      class: semanticClass == null ? void 0 : semanticClass("editor.previewer"),
      selector: ".cherry-previewer"
    }, {
      class: semanticClass == null ? void 0 : semanticClass("editor.sidebar"),
      selector: ".cherry-sidebar"
    }, {
      class: semanticClass == null ? void 0 : semanticClass("editor.sidebar.item"),
      selector: ".cherry-sidebar .cherry-toolbar-button"
    }, {
      class: semanticClass == null ? void 0 : semanticClass("editor.toc"),
      selector: ".cherry-flex-toc"
    }, {
      class: semanticClass == null ? void 0 : semanticClass("editor.toc.head"),
      selector: ".cherry-toc-head"
    }, {
      class: semanticClass == null ? void 0 : semanticClass("editor.toc.list"),
      selector: ".cherry-toc-list"
    }, {
      class: semanticClass == null ? void 0 : semanticClass("editor.toc.list.item"),
      selector: ".cherry-toc-list .cherry-toc-one-a"
    }, {
      class: semanticClass == null ? void 0 : semanticClass("editor.footer"),
      selector: ".".concat(ns.e("footer"))
    }, {
      class: semanticClass == null ? void 0 : semanticClass("editor.footer.cancel"),
      selector: ".".concat(ns.em("footer", "cancel"))
    }, {
      class: semanticClass == null ? void 0 : semanticClass("editor.footer.save"),
      selector: ".".concat(ns.em("footer", "save"))
    }];
    const childStyle = [{
      style: semanticStyle == null ? void 0 : semanticStyle("editor.toolbar"),
      selector: ".cherry-toolbar"
    }, {
      style: semanticStyle == null ? void 0 : semanticStyle("editor.toolbar.item"),
      selector: ".cherry-toolbar .cherry-toolbar-button"
    }, {
      style: semanticStyle == null ? void 0 : semanticStyle("editor.customToolbar"),
      selector: ".".concat(ns.b("custom-toolbar"))
    }, {
      style: semanticStyle == null ? void 0 : semanticStyle("editor.customToolbar.item"),
      selector: ".".concat(ns.be("custom-toolbar", "item"))
    }, {
      style: semanticStyle == null ? void 0 : semanticStyle("editor.hoverToolbar"),
      selector: ".cherry-bubble"
    }, {
      style: semanticStyle == null ? void 0 : semanticStyle("editor.hoverToolbar.item"),
      selector: ".cherry-bubble .cherry-toolbar-button"
    }, {
      style: semanticStyle == null ? void 0 : semanticStyle("editor.floatMenu"),
      selector: ".cherry-floatmenu"
    }, {
      style: semanticStyle == null ? void 0 : semanticStyle("editor.floatMenu.item"),
      selector: ".cherry-floatmenu .cherry-toolbar-button"
    }, {
      style: semanticStyle == null ? void 0 : semanticStyle("editor.input"),
      selector: ".cherry-editor"
    }, {
      style: semanticStyle == null ? void 0 : semanticStyle("editor.previewer"),
      selector: ".cherry-previewer"
    }, {
      style: semanticStyle == null ? void 0 : semanticStyle("editor.sidebar"),
      selector: ".cherry-sidebar"
    }, {
      style: semanticStyle == null ? void 0 : semanticStyle("editor.sidebar.item"),
      selector: ".cherry-sidebar .cherry-toolbar-button"
    }, {
      style: semanticStyle == null ? void 0 : semanticStyle("editor.toc"),
      selector: ".cherry-flex-toc"
    }, {
      style: semanticStyle == null ? void 0 : semanticStyle("editor.toc.head"),
      selector: ".cherry-toc-head"
    }, {
      style: semanticStyle == null ? void 0 : semanticStyle("editor.toc.list"),
      selector: ".cherry-toc-list"
    }, {
      style: semanticStyle == null ? void 0 : semanticStyle("editor.toc.list.item"),
      selector: ".cherry-toc-list .cherry-toc-one-a"
    }, {
      style: semanticStyle == null ? void 0 : semanticStyle("editor.footer"),
      selector: ".".concat(ns.e("footer"))
    }, {
      style: semanticStyle == null ? void 0 : semanticStyle("editor.footer.cancel"),
      selector: ".".concat(ns.em("footer", "cancel"))
    }, {
      style: semanticStyle == null ? void 0 : semanticStyle("editor.footer.save"),
      selector: ".".concat(ns.em("footer", "save"))
    }];
    const languageMap = {
      en: "en_US",
      "zh-CN": "zh_CN"
    };
    const id = qxUtil.createUUID();
    const {
      isImgPreview,
      onMDEditorCreated,
      renderImgPreview
    } = renderUtil.useImgPreviewRender(ns);
    const uploadHeaders = ibiz.util.file.getUploadHeaders();
    const headers = vue.ref({
      ...uploadHeaders
    });
    const uploadUrl = vue.ref("");
    const customTheme = ((_a = c == null ? void 0 : c.editorParams) == null ? void 0 : _a.customTheme) || ((_b = c == null ? void 0 : c.editorParams) == null ? void 0 : _b.customtheme);
    const enableNoAccess = ((_c = c == null ? void 0 : c.editorParams) == null ? void 0 : _c.enablenoaccess) === "true";
    const {
      UIStore
    } = vue3Util.useUIStore();
    const theme = vue.ref(customTheme || UIStore.theme);
    const isEditing = vue.ref(false);
    let showmode = "default";
    if (c && ((_d = c.editorParams) == null ? void 0 : _d.showmode)) {
      showmode = c.editorParams.showmode;
    }
    const isFullScreen = vue.ref(false);
    const defaultModel = vue.ref("editOnly");
    let resizeObserver = null;
    let toolbarResizeObserver = null;
    let lastMarkDownWidth = 0;
    const cssVars = vue.ref({});
    const toolbarCssVars = vue.ref({});
    const lastDirectoryState = vue.ref("pure");
    let isIgnoreChange = false;
    let chatInstance;
    let disabledirectory = false;
    if ((_e = c == null ? void 0 : c.editorParams) == null ? void 0 : _e.disabledirectory) {
      disabledirectory = c.editorParams.disabledirectory === "true";
    }
    let tocPos = "absolute";
    if ((_f = c == null ? void 0 : c.editorParams) == null ? void 0 : _f.tocpos) {
      tocPos = c.editorParams.tocpos === "fixed" ? "fixed" : "absolute";
    }
    const [AIMenu, AIChart, customMenus] = customMenu.initCustomMenu(c, {
      props,
      chatInstance,
      isEditing,
      currentVal,
      emit
    });
    vue.watch(() => props.data, (newVal) => {
      if (newVal && c) {
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
    const markDownBox = vue.ref();
    const getCodeTheme = (value) => {
      const codeThemeMap = {
        dark: "tomorrow-night",
        light: "default",
        green: "solarized-light",
        red: "solarized-light",
        violet: "default",
        blue: "default"
      };
      return codeThemeMap[value] || value;
    };
    const getDownloadUrl = (data, file) => {
      if (!c)
        return "";
      const editorParams = {
        ...c.editorParams,
        enableNoAccess
      };
      if (editorParams.exportparams) {
        editorParams.exportParams = JSON.parse(editorParams.exportparams);
      }
      if (editorParams.globaldownloadprifix) {
        editorParams.globalDownloadPrifix = editorParams.globaldownloadprifix === "true";
      } else {
        editorParams.globalDownloadPrifix = ibiz.config.common.globalDownloadPrifix;
      }
      if (file && file.folder) {
        editorParams.osscat = file.folder;
      }
      const urls = ibiz.util.file.calcFileUpDownUrl(c.context, c.params, data, editorParams);
      return urls.downloadUrl;
    };
    const fileUpload = async (file, callback) => {
      const data = await ibiz.util.file.fileUpload(uploadUrl.value, file, headers.value);
      const downloadUrl = getDownloadUrl(props.data || {}, data.fileid);
      let url = downloadUrl.replace("%fileId%", data.fileid);
      if (ibiz.config.common.enableDownloadTicket && c && c.editorParams && !enableNoAccess) {
        const downloadTicket = await ibiz.util.file.getDownloadTicket(c.context, c.params, props.data || {}, {
          fileId: data.fileid
        }, c.downloadTicketParams);
        if (downloadTicket && downloadTicket.ticket) {
          url = downloadUrl.replace("%fileId%", downloadTicket.ticket);
          callback(url);
        }
      } else {
        callback(url);
      }
    };
    const getCherryHtml = () => {
      const result = editor == null ? void 0 : editor.getHtml();
      return result;
    };
    const getCherryContent = () => {
      const result = editor == null ? void 0 : editor.getMarkdown();
      return result;
    };
    const setCherryContent = (val) => {
      isIgnoreChange = true;
      editor == null ? void 0 : editor.setMarkdown(val, true);
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
    const afterChange = (_e2) => {
      if (showmode === "manual") {
        return;
      }
      emit("change", getCherryContent(), c == null ? void 0 : c.model.id, isIgnoreChange);
      isIgnoreChange = false;
    };
    const beforeImageMounted = (e, src) => {
      return {
        [e]: src
      };
    };
    const parseProtocol = (urlStr) => {
      const url = new URL(urlStr);
      const context = {};
      const params = {};
      let protocolId = "";
      if (url.searchParams.size > 0) {
        const navCtx = url.searchParams.get("srfnavctx");
        if (navCtx) {
          try {
            Object.assign(context, JSON.parse(navCtx));
          } catch (error) {
            ibiz.log.error(ibiz.i18n.t("runtime.utils.openRedirectView.parseSrfnavctxParameter", {
              urlStr
            }), error);
          }
          url.searchParams.delete("srfnavctx");
        }
        url.searchParams.forEach((value, _key) => {
          params[_key] = value;
        });
      } else if (url.search) {
        const searchParams = runtime.parseSearchParams(url.search);
        const navCtx = searchParams.srfnavctx;
        if (navCtx) {
          try {
            const value = decodeURIComponent(navCtx);
            Object.assign(context, JSON.parse(value));
          } catch (error) {
            ibiz.log.error(ibiz.i18n.t("runtime.utils.openRedirectView.parseSrfnavctxParameter", {
              urlStr
            }), error);
          }
          delete searchParams.srfnavctx;
        }
        Object.keys(searchParams).forEach((key) => {
          params[key] = searchParams[key];
        });
      }
      const pathname = url.pathname || url.hostname;
      const rdTagItems = pathname.replace("//", "").split("/");
      const [appOrViewTag, viewTag] = rdTagItems;
      protocolId = url.protocol === "action:" ? "".concat(url.username, "@").concat(pathname) : viewTag || appOrViewTag;
      return {
        params,
        context,
        protocolId
      };
    };
    const onClickPreview = (event) => {
      var _a2, _b2, _c2;
      const link = (_a2 = event.target) == null ? void 0 : _a2.closest('a[href^="chunkview://"], a[href^="view://"], a[href^="action://"]');
      if (!link)
        return;
      event.preventDefault();
      let href = link.getAttribute("href");
      if (!href)
        return;
      const protocols = ["chunkview", "view", "action"];
      const match = protocols.find((p) => href.startsWith("".concat(p, "://")));
      const protocol = match || "";
      if (!protocol)
        return;
      if (protocol === "chunkview") {
        const chunkView = (c == null ? void 0 : c.editorParams.chunkview) || props.chunkView;
        const chunkEntity = (c == null ? void 0 : c.editorParams.chunkentity) || props.chunkEntity;
        if (!chunkView || !chunkEntity)
          return;
        const chunkID = href.replace("chunkview://", "");
        href = "view://".concat(chunkView, '?srfnavctx={"').concat(chunkEntity, '":"').concat(chunkID, '"}');
      }
      const {
        protocolId,
        context: _context,
        params
      } = parseProtocol(href);
      if (!protocolId)
        return;
      const context = ((_b2 = c == null ? void 0 : c.context) == null ? void 0 : _b2.clone()) || ((_c2 = props.context) == null ? void 0 : _c2.clone()) || core.IBizContext.create({});
      Object.assign(context, _context);
      switch (protocol) {
        case "chunkview":
        case "view":
          ibiz.commands.execute(runtime.OpenAppViewCommand.TAG, protocolId, Object.assign(context, {
            srfkeepnull: true
          }), params);
          break;
        case "action":
          runtime.UIActionUtil.exec(protocolId, {
            event,
            params,
            context,
            data: [props.data || {}],
            view: (c == null ? void 0 : c.view) || props.view,
            ctrl: (c == null ? void 0 : c.ctrl) || props.ctrl
          }, context.appid || context.srfappid);
          break;
        default:
          break;
      }
    };
    const createElement = (tagName, className = "") => {
      const element = document.createElement(tagName);
      element.className = className;
      return element;
    };
    const createCherryIcon = (tagName) => {
      return createElement("i", "ch-icon ch-icon-".concat(tagName));
    };
    const fullscreenClassName = ns.e("fullscreen");
    const clearNodeChildren = (node) => {
      while (node.firstChild) {
        node.removeChild(node.firstChild);
      }
    };
    const getFullscreenNodeInfo = () => {
      if (editor && markDownBox.value) {
        const parentElement = editor.editor.options.editorDom.parentElement;
        if (!parentElement)
          return {};
        const cherryClass = parentElement.classList;
        const fullscreenNode = markDownBox.value.querySelector(".".concat(fullscreenClassName));
        if (!fullscreenNode)
          return {};
        return {
          parentElement,
          cherryClass,
          fullscreenNode
        };
      }
      return {};
    };
    const openFullscreen = () => {
      const {
        parentElement,
        cherryClass,
        fullscreenNode
      } = getFullscreenNodeInfo();
      if (parentElement && cherryClass && fullscreenNode) {
        clearNodeChildren(fullscreenNode);
        fullscreenNode.appendChild(createCherryIcon("minscreen"));
        cherryClass.add("fullscreen");
        fullscreenNode.title = ibiz.i18n.t("editor.common.minimize");
        parentElement.setAttribute("tabindex", "-1");
        vue.nextTick(() => parentElement == null ? void 0 : parentElement.focus());
      }
    };
    const closeFullscreen = () => {
      const {
        parentElement,
        cherryClass,
        fullscreenNode
      } = getFullscreenNodeInfo();
      if (parentElement && cherryClass && fullscreenNode) {
        clearNodeChildren(fullscreenNode);
        fullscreenNode.appendChild(createCherryIcon("fullscreen"));
        fullscreenNode.title = ibiz.i18n.t("editor.common.fullscreen");
        cherryClass.remove("fullscreen");
        parentElement == null ? void 0 : parentElement.blur();
        parentElement.setAttribute("tabindex", "-1");
      }
    };
    const isFullscreen = () => {
      const {
        cherryClass
      } = getFullscreenNodeInfo();
      return cherryClass == null ? void 0 : cherryClass.contains("fullscreen");
    };
    const onSwitchFullscreen = () => {
      if (editor && markDownBox.value) {
        if (isFullscreen()) {
          closeFullscreen();
          editor.toggleToc(lastDirectoryState.value);
          isFullScreen.value = false;
        } else {
          openFullscreen();
          lastDirectoryState.value = editor.toc.model;
          editor.toggleToc("full");
          isFullScreen.value = true;
        }
      }
    };
    const handleKeyDown = (_e2) => {
      _e2.stopPropagation();
      if (_e2.key === "Escape") {
        _e2.preventDefault();
        if (isFullscreen()) {
          closeFullscreen();
          editor.toggleToc(lastDirectoryState.value);
          isFullScreen.value = false;
        }
      }
    };
    const changeMainTheme = (_theme) => {
      c == null ? void 0 : c.setCurrentEditorTheme(_theme);
      editor == null ? void 0 : editor.setCodeBlockTheme(getCodeTheme(_theme));
    };
    const selectionChange = (event) => {
      var _a2, _b2;
      const {
        info
      } = event;
      let isForwardSelection = true;
      const firstRange = info.ranges && info.ranges[0];
      if (!firstRange) {
        isForwardSelection = true;
      } else {
        const {
          anchor,
          head
        } = firstRange;
        isForwardSelection = c.isPositionBefore(anchor, head);
      }
      const startPos = (_a2 = c.mdeditor) == null ? void 0 : _a2.editor.editor.getCursor("start");
      const endPos = (_b2 = c.mdeditor) == null ? void 0 : _b2.editor.editor.getCursor("end");
      c.setCursorPos(startPos, endPos);
      c.setSelectionDirection(isForwardSelection);
    };
    const editorInit = () => {
      if (props.disabled || props.readonly || showmode === "manual") {
        defaultModel.value = "previewOnly";
      }
      vue.nextTick(() => {
        var _a2, _b2, _c2;
        const bubble = ["bold", "italic", "underline", "strikethrough", "sub", "sup", "|", "size", "color"];
        const toolbar = ["bold", "italic", "underline", "strikethrough", "|", "color", "header", "|", "list", "image", {
          insert: ["link", "hr", "br", "code", "formula", "toc", "table", "line-table", "bar-table"]
        }, "settings", "togglePreview"];
        if (c && c.chatCompletion) {
          toolbar.unshift("AIChart");
          bubble.unshift("AI");
        }
        if (c && c.extraActions.length > 0) {
          const keys = c.extraActions.map((item) => {
            return item.uiactionId.split("@")[0];
          });
          toolbar.push(...keys);
        }
        const language = ibiz.i18n.getLang();
        const locale = languageMap[language] || language;
        editor = new Cherry({
          id,
          value: currentVal.value,
          locale,
          previewer: {
            enablePreviewerBubble: !(props.disabled || props.readonly)
          },
          themeSettings: {
            // 目前应用的主题
            mainTheme: theme.value,
            // 目前应用的代码块主题
            codeBlockTheme: getCodeTheme(theme.value)
          },
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
              autofocus: false,
              placeholder: c == null ? void 0 : c.placeHolder
            }
          },
          toolbars: {
            toolbar,
            bubble,
            float: ["h1", "h2", "h3", "|", "checklist", "quote", "quickTable", "code"],
            customMenu: {
              AI: AIMenu,
              AIChart,
              ...customMenus
            },
            // 定义侧边栏，默认为空
            sidebar: ["theme", "copy"],
            // 定义顶部右侧工具栏，默认为空
            toolbarRight: [],
            // 目录
            toc: !disabledirectory && {
              updateLocationHash: false,
              // 要不要更新URL的hash
              defaultModel: "pure",
              // pure: 精简模式/缩略模式，只有一排小点； full: 完整模式，会展示所有标题
              showAutoNumber: true,
              // 是否显示自增序号
              position: tocPos,
              // 悬浮目录的悬浮方式。当滚动条在cherry内部时，用absolute；当滚动条在cherry外部时，用fixed
              cssText: ""
              // 自定义样式
            }
          },
          callback: {
            afterChange,
            onClickPreview,
            beforeImageMounted
          },
          event: {
            changeMainTheme,
            selectionChange
          },
          engine: {
            syntax: {
              table: {
                enableChart: false,
                externals: ["echarts"]
              }
            }
          }
        });
        editor.toggleToc("pure");
        const html = editor.engine.makeHtml(currentVal.value);
        editor.previewer.update(html);
        (_b2 = (_a2 = editor.toc) == null ? void 0 : _a2.updateTocList) == null ? void 0 : _b2.call(_a2);
        editor.setTheme(theme.value);
        if (customTheme) {
          editor.setTheme(customTheme);
          editor.setCodeBlockTheme(customTheme);
        }
        const span = createElement("span", "".concat(fullscreenClassName, " cherry-toolbar-button"));
        span.title = ibiz.i18n.t("editor.common.fullscreen");
        span.onclick = onSwitchFullscreen;
        span.appendChild(createCherryIcon("fullscreen"));
        const parentElement = props.disabled ? editor.editor.options.editorDom.parentElement : (_c2 = editor.editor.options.editorDom.parentElement) == null ? void 0 : _c2.querySelector(".cherry-toolbar>.toolbar-right");
        parentElement == null ? void 0 : parentElement.appendChild(span);
        c == null ? void 0 : c.setMDEditor(editor);
        onMDEditorCreated(editor);
        if (slots.editorSwitchMenu && window.ResizeObserver && markDownBox.value) {
          const cherryToolbar = markDownBox.value.querySelector(".cherry-toolbar");
          if (cherryToolbar) {
            toolbarResizeObserver = new ResizeObserver((entries) => {
              var _a3;
              const height = (_a3 = entries[0]) == null ? void 0 : _a3.contentRect.height;
              toolbarCssVars.value = ns.cssVarBlock({
                "toolbar-height": "".concat(height, "px")
              });
            });
            toolbarResizeObserver.observe(cherryToolbar);
          }
        }
      });
    };
    vue.watch(() => UIStore.theme, (newVal) => {
      theme.value = customTheme || newVal;
      editor == null ? void 0 : editor.setTheme(theme.value);
      editor == null ? void 0 : editor.setCodeBlockTheme(getCodeTheme(theme.value));
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
    const onEnableEdit = () => {
      isEditing.value = true;
      defaultModel.value = "editOnly";
      editor == null ? void 0 : editor.switchModel(defaultModel.value);
    };
    const onResetEditState = () => {
      isEditing.value = false;
      defaultModel.value = "previewOnly";
      editor == null ? void 0 : editor.switchModel(defaultModel.value);
    };
    const onEditCancel = () => {
      setCherryContent(currentVal.value);
      onResetEditState();
    };
    const onEditConfirm = () => {
      emit("change", getCherryContent(), c == null ? void 0 : c.model.id, isIgnoreChange);
      isIgnoreChange = false;
      onResetEditState();
    };
    const onFocusEditor = () => {
      const target = document.getElementById(id);
      target == null ? void 0 : target.focus();
    };
    const renderHeader = () => {
      if (showmode === "manual" && !isEditing.value) {
        return vue.createVNode("div", {
          "onClick": onFocusEditor,
          "class": [ns.e("header"), ns.b("custom-toolbar"), ns.is("fullscreen", isFullScreen.value)]
        }, [!props.disabled && !props.readonly && vue.createVNode("div", {
          "class": [ns.em("header", "edit"), ns.be("custom-toolbar", "item")],
          "onClick": onEnableEdit,
          "title": ibiz.i18n.t("editor.markdown.edit")
        }, [vue.createVNode("i", {
          "class": "fa fa-edit",
          "aria-hidden": "true"
        }, null)]), vue.createVNode("div", {
          "class": ns.em("header", "full"),
          "onClick": onSwitchFullscreen
        }, [isFullScreen.value ? vue.createVNode("i", {
          "class": ["fa fa-compress", ns.be("custom-toolbar", "item")],
          "aria-hidden": "true",
          "title": ibiz.i18n.t("editor.html.reduce")
        }, null) : vue.createVNode("i", {
          "class": ["fa fa-expand", ns.be("custom-toolbar", "item")],
          "aria-hidden": "true",
          "title": ibiz.i18n.t("editor.common.fullscreen")
        }, null)])]);
      }
    };
    const renderFooter = () => {
      if (showmode === "manual" && isEditing.value && !props.disabled && !props.readonly) {
        return vue.createVNode("div", {
          "onClick": onFocusEditor,
          "class": [ns.e("footer"), ns.is("fullscreen", isFullScreen.value)]
        }, [vue.createVNode("div", {
          "class": ns.em("footer", "cancel"),
          "onClick": onEditCancel
        }, [ibiz.i18n.t("editor.common.cancel")]), vue.createVNode("div", {
          "class": ns.em("footer", "save"),
          "onClick": onEditConfirm
        }, [ibiz.i18n.t("editor.common.confirm")])]);
      }
    };
    const renderEditorSwitchMenu = () => {
      var _a2;
      return vue.createVNode("div", {
        "class": [ns.b("menu"), ns.is("fullscreen", isFullScreen.value)],
        "style": toolbarCssVars.value
      }, [(_a2 = slots.editorSwitchMenu) == null ? void 0 : _a2.call(slots)]);
    };
    vue.onMounted(() => {
      var _a2;
      editorInit();
      calcMarkDownStyle();
      (_a2 = markDownBox.value) == null ? void 0 : _a2.addEventListener("keydown", handleKeyDown.bind(this));
    });
    vue.onBeforeUnmount(() => {
      var _a2;
      (_a2 = markDownBox.value) == null ? void 0 : _a2.removeEventListener("keydown", handleKeyDown.bind(this));
    });
    vue.onUnmounted(() => {
      editor = null;
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
      if (toolbarResizeObserver) {
        toolbarResizeObserver.disconnect();
      }
      if (chatInstance && chatInstance.close) {
        chatInstance.close();
      }
    });
    return {
      ns,
      id,
      theme,
      editor,
      headers,
      UIStore,
      cssVars,
      showmode,
      isEditing,
      childClass,
      childStyle,
      currentVal,
      markDownBox,
      defaultModel,
      isFullScreen,
      isImgPreview,
      semanticClass,
      semanticStyle,
      renderHeader,
      renderFooter,
      getCherryHtml,
      getCherryContent,
      setCherryContent,
      renderImgPreview,
      renderEditorSwitchMenu
    };
  },
  render() {
    var _a, _b, _c, _d;
    const isShowEditorSwitchMenu = !!this.$slots.editorSwitchMenu;
    return vue.withDirectives(vue.createVNode("div", {
      "ref": "markDownBox",
      "class": [this.ns.b(), (_a = this.semanticClass) == null ? void 0 : _a.call(this, "editor.root"), this.ns.is("disabled", this.disabled), this.ns.is("manual", this.showmode === "manual"), this.ns.is("editing", this.isEditing), this.ns.is("show-editor-switch-menu", isShowEditorSwitchMenu), this.ns.is("editor-content-fixed", this.isFullScreen || this.isImgPreview)],
      "style": (_b = this.semanticStyle) == null ? void 0 : _b.call(this, "editor.root")
    }, [isShowEditorSwitchMenu ? this.renderEditorSwitchMenu() : null, this.renderHeader(), this.renderFooter(), this.renderImgPreview(), vue.createVNode("div", {
      "tabindex": "-1",
      "id": this.id,
      "style": {
        ...this.cssVars,
        ...(_c = this.semanticStyle) == null ? void 0 : _c.call(this, "editor.content")
      },
      "class": [this.ns.b("cherry"), (_d = this.semanticClass) == null ? void 0 : _d.call(this, "editor.content"), this.ns.m(this.UIStore.theme === "dark" ? "dark" : "light")]
    }, null)]), [[vue.resolveDirective("child-class"), this.childClass], [vue.resolveDirective("child-style"), this.childStyle]]);
  }
});

exports.default = IBizMarkDown;
