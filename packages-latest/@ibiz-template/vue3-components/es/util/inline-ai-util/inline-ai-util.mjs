import { h, createApp } from 'vue';
import ContextMenu from '@imengyu/vue3-context-menu';
import { useNamespace } from '@ibiz-template/vue3-util';
import { InlineAITextArea } from './inline-ai-textarea/inline-ai-textarea.mjs';

"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class InLineAIUtil {
  /**
   * Creates an instance of InLineAIUtil.
   * @memberof InLineAIUtil
   */
  constructor() {
    __publicField(this, "currentApp", null);
    __publicField(this, "container", null);
    __publicField(this, "ns", useNamespace("inline-ai-container"));
  }
  /**
   * 计算上下文菜单
   * @param deACMode
   * @param clickCallBack
   * @returns
   */
  calcContextMenus(deACMode, clickCallBack) {
    var _a, _b;
    const menus = [];
    if (!deACMode || !deACMode.deuiactionGroup || !deACMode.deuiactionGroup.uiactionGroupDetails)
      return menus;
    (_b = (_a = deACMode.deuiactionGroup) == null ? void 0 : _a.uiactionGroupDetails) == null ? void 0 : _b.forEach((item) => {
      var _a2, _b2, _c;
      const menuItem = {};
      if (item.detailType === "DEUIACTION" && ((_a2 = item.uiactionId) == null ? void 0 : _a2.startsWith("inline"))) {
        if (item.showCaption && item.caption) {
          menuItem.label = item.caption;
          if (item.capLanguageRes && item.capLanguageRes.lanResTag) {
            menuItem.label = ibiz.i18n.t(
              item.capLanguageRes.lanResTag,
              item.caption
            );
          }
        }
        if (item.sysImage && item.showIcon) {
          menuItem.icon = h("iBizIcon", {
            icon: item.sysImage
          });
        }
        menuItem.clickClose = true;
        const { uiactionId } = item;
        if (uiactionId) {
          menuItem.onClick = () => {
            clickCallBack(uiactionId);
          };
        }
        menus.push(menuItem);
      } else if (item.detailType === "DEUIACTIONGROUP" && item.refUIActionGroup && ((_b2 = item.refUIActionGroup.id) == null ? void 0 : _b2.startsWith("inline"))) {
        menuItem.label = item.refUIActionGroup.name;
        const menuItems = (_c = item.refUIActionGroup.uiactionGroupDetails) == null ? void 0 : _c.filter((detail) => {
          var _a3;
          return detail.detailType === "DEUIACTION" && ((_a3 = detail.uiactionId) == null ? void 0 : _a3.startsWith("inline"));
        }).map((detail) => {
          let caption;
          if (detail.showCaption) {
            caption = detail.caption;
            if (detail.capLanguageRes && detail.capLanguageRes.lanResTag) {
              caption = ibiz.i18n.t(
                detail.capLanguageRes.lanResTag,
                detail.caption
              );
            }
          }
          return {
            label: caption,
            icon: detail.showIcon && detail.sysImage ? h("iBizIcon", {
              icon: detail.sysImage
            }) : void 0,
            clickableWhenHasChildren: true,
            onClick: () => {
              ContextMenu.closeContextMenu();
              clickCallBack(detail.uiactionId);
            }
          };
        });
        menuItem.children = menuItems;
        menus.push(menuItem);
      }
    });
    return menus;
  }
  /**
   * 显示上下文菜单
   * @param x 距离左侧距离
   * @param y 距离上方距离
   * @param menus 菜单集合
   */
  showContextMenus(x, y, menus, options = {}) {
    ContextMenu.showContextMenu({
      x,
      y,
      customClass: this.ns.b("context-menu"),
      items: menus,
      ...options
    });
  }
  /**
   * 销毁组件实例
   */
  destroyInlineAIComponent() {
    if (this.currentApp && this.container) {
      this.currentApp.unmount();
      this.currentApp = null;
    }
    if (this.container && document.body.contains(this.container)) {
      document.body.removeChild(this.container);
      this.container = null;
    }
  }
  /**
   *  显示AI聊天组件
   * @param selectText
   * @param options
   * @returns
   */
  showAIChat(context, params, data, selectText, deACMode, options) {
    this.destroyInlineAIComponent();
    this.container = document.createElement("div");
    this.container.id = this.ns.b();
    this.container.className = this.ns.b();
    document.body.appendChild(this.container);
    const { editor } = params;
    const { insertText, replaceSelectionText, restoreSelection, editorParams } = editor;
    delete params.editor;
    const unMountAIChat = () => {
      this.destroyInlineAIComponent();
    };
    this.currentApp = createApp(InlineAITextArea, {
      context,
      params,
      data,
      editorParams,
      content: selectText,
      deACMode,
      options,
      insertText: insertText.bind(editor),
      replaceSelectionText: replaceSelectionText.bind(editor),
      restoreSelection: restoreSelection.bind(editor),
      unMountAIChat
    });
    this.currentApp.mount(this.container);
  }
  /**
   * 隐藏AI聊天组件
   */
  hideAIChat() {
    this.destroyInlineAIComponent();
  }
}

export { InLineAIUtil };
