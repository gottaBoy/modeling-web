import { clone } from 'ramda';
import { reactive } from 'vue';
import { useNamespace } from '@ibiz-template/vue3-util';
import { predefineThemeVars } from './custom-theme-model.mjs';

"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class CustomThemeController {
  /**
   * Creates an instance of CustomThemeController.
   * @author tony001
   * @date 2024-12-26 18:12:28
   */
  constructor() {
    /**
     * 自定义主题状态
     *
     * @type {IData}
     * @memberof CustomThemeController
     */
    __publicField(this, "state", {});
    /**
     * 自定义配置模型
     *
     * @type {IData[]}
     * @memberof CustomThemeController
     */
    __publicField(this, "model", []);
    /**
     * 模型映射对象，key为value，value值为var对象
     *
     * @author tony001
     * @date 2024-12-27 10:12:57
     * @private
     * @type {IData}
     */
    __publicField(this, "modelMapping", {});
    /**
     * 预定义类型
     *
     * @type {IData}
     * @memberof CustomThemeController
     */
    __publicField(this, "predefineType", [
      {
        codeName: "light",
        label: "\u4EAE\u8272",
        labelLang: "light",
        color: "#557da5",
        isCustom: false
      },
      {
        codeName: "dark",
        label: "\u6697\u8272",
        labelLang: "dark",
        color: "#1c1c1c",
        isCustom: false
      },
      {
        codeName: "blue",
        label: "\u84DD\u8272",
        labelLang: "blue",
        color: "rgba(0, 132, 255, 1)",
        isCustom: false
      },
      {
        codeName: "user1",
        label: "\u81EA\u5B9A\u4E491",
        labelLang: "user1",
        color: "#999",
        isCustom: true
      },
      {
        codeName: "user2",
        label: "\u81EA\u5B9A\u4E492",
        labelLang: "user2",
        color: "#888",
        isCustom: true
      },
      {
        codeName: "user3",
        label: "\u81EA\u5B9A\u4E493",
        labelLang: "user3",
        color: "#777",
        isCustom: true
      }
    ]);
    this.model = predefineThemeVars;
    const customTheme = ibiz.util.theme.getCustomTheme();
    this.state = clone(customTheme);
    this.state = reactive(this.state);
    this.model.forEach((item) => {
      this.initModelMapping(item);
    });
    const pluginTheme = ibiz.util.theme.pluginTheme;
    pluginTheme.forEach((item) => {
      const ns = useNamespace("custom-theme");
      const color = this.getRootCssVar(
        ns.cssVarName("color-primary"),
        item.themeTag
      );
      this.predefineType.push({
        codeName: item.themeTag,
        label: item.themeTag,
        color,
        isCustom: true
      });
    });
  }
  /**
   * @description 获取根节点样式变量
   * @protected
   * @param {string} name
   * @param {string} themeTag
   * @returns {*}  {(string | number)}
   * @memberof CustomThemeController
   */
  getRootCssVar(name, themeTag) {
    const root = document.documentElement;
    if (root.classList.contains(themeTag)) {
      return this.getCssVar(name);
    }
    const className = root.className;
    root.className = themeTag;
    const color = this.getCssVar(name);
    root.className = className;
    return color;
  }
  /**
   * 初始化模型映射
   *
   * @author tony001
   * @date 2024-12-27 13:12:53
   * @private
   * @param {IData} item
   */
  initModelMapping(item) {
    if (item.children && item.children.length > 0) {
      item.children.forEach((child) => {
        this.initModelMapping(child);
      });
    }
    if (item.vars && item.vars.length > 0) {
      item.vars.forEach((varItem) => {
        this.modelMapping[varItem.value] = varItem;
      });
    }
  }
  /**
   * 获取模型编辑数据
   *
   * @author tony001
   * @date 2024-12-27 13:12:48
   * @public
   * @return {*}  {IData}
   */
  getModelEditData() {
    const result = {};
    this.model.forEach((item) => {
      const tempData = {};
      this.getSingleGroupModelData(item, tempData);
      result[item.labelLang] = tempData;
    });
    return result;
  }
  /**
   * 获取单个分组的模型数据
   *
   * @author tony001
   * @date 2024-12-27 13:12:05
   * @private
   * @param {IData} item
   * @param {IData} result
   */
  getSingleGroupModelData(item, result) {
    if (item.children && item.children.length > 0) {
      item.children.forEach((child) => {
        this.getSingleGroupModelData(child, result);
      });
    }
    if (item.vars && item.vars.length > 0) {
      item.vars.forEach((varItem) => {
        this.modelMapping[varItem.value] = varItem;
        if (varItem.type === "size") {
          result[varItem.value] = this.getCssVar(varItem.value);
        } else {
          let name = varItem.value;
          if (varItem.className) {
            name = "".concat(varItem.className, ":").concat(name);
          }
          result[varItem.value] = this.getCssVar(name, varItem.defaultValue);
        }
      });
    }
  }
  /**
   * 获取css变量
   *
   * @param {string} name
   * @return {*}  {string}
   * @memberof CustomThemeController
   */
  getCssVar(name, defaultVar) {
    var _a;
    let result = defaultVar || name;
    if (this.state.themeVars && this.state.themeVars[name]) {
      result = this.state.themeVars[name];
    } else {
      let elt = document.documentElement;
      let varName = defaultVar || name;
      if (name.split(":").length === 2) {
        const className = name.split(":")[0];
        const element = (_a = document.getElementsByClassName(className)) == null ? void 0 : _a[0];
        if (element) {
          elt = element;
          varName = name.split(":")[1];
        }
      }
      const styles = window.getComputedStyle(elt);
      if (styles) {
        result = styles.getPropertyValue(varName) || result;
      }
    }
    if (result.toString().endsWith("px")) {
      result = Number(result.toString().slice(0, -2));
    }
    if (result.toString().includes(",") && !result.toString().startsWith("rgb")) {
      result = "rgba(".concat(result, ", 1)");
    }
    return result;
  }
  /**
   * 处理主题变更
   *
   * @author tony001
   * @date 2024-12-26 15:12:57
   * @param {string} tag
   * @return {*}  {Promise<void>}
   */
  async handleThemeChange(tag) {
    await ibiz.util.theme.clearCustomThemeParams(this.state.themeTag);
    this.state.themeTag = tag;
    this.state.themeVars = {};
    await this.handleThemePreview(true);
  }
  /**
   * 计算变更主题变量
   *
   * @author tony001
   * @date 2024-12-27 17:12:21
   * @param {IData} newData
   * @return {*}  {Promise<void>}
   */
  async computeChangeThemeVars(newData) {
    const changeVars = [];
    const oldData = this.getModelEditData();
    Object.keys(newData).forEach((type) => {
      const newThemeVar = newData[type];
      Object.keys(newThemeVar).forEach((varName) => {
        const oldValue = oldData[type][varName];
        if (oldValue !== newThemeVar[varName]) {
          changeVars.push({ key: varName, value: newThemeVar[varName] });
        }
      });
    });
    if (changeVars.length > 0) {
      changeVars.forEach((item) => {
        const targetItem = this.modelMapping[item.key];
        if (targetItem) {
          if (targetItem.type === "size") {
            this.calcSizeChange(item.key, Number(item.value), targetItem);
          } else {
            let name = item.key;
            if (targetItem.className) {
              name = "".concat(targetItem.className, ":").concat(item.key);
            }
            this.state.themeVars[name] = item.value;
          }
        }
      });
    }
  }
  /**
   * 处理主题预览
   *
   * @author tony001
   * @date 2024-12-26 17:12:59
   * @return {*}  {Promise<void>}
   */
  async handleThemePreview(isLoad) {
    const { themeTag, themeVars } = await ibiz.util.theme.previewCustomTheme(
      this.state.themeTag,
      this.state.themeVars,
      isLoad
    );
    this.state.themeTag = themeTag;
    this.state.themeVars = themeVars;
  }
  /**
   * 处理主题保存
   *
   * @author tony001
   * @date 2024-12-26 18:12:44
   * @param {boolean} isShare
   * @return {*}  {Promise<void>}
   */
  async handleThemeSave(isShare) {
    await this.handleThemePreview(false);
    await ibiz.util.theme.saveCustomTheme(
      this.state.themeTag,
      this.state.themeVars,
      isShare
    );
  }
  /**
   * 处理主题重置
   *
   * @author tony001
   * @date 2024-12-27 20:12:03
   * @param {boolean} isShare
   * @return {*}  {Promise<void>}
   */
  async handleThemeReset(isShare) {
    const res = await ibiz.confirm.info({
      title: ibiz.i18n.t("control.common.customTheme.resetConfirmation"),
      desc: isShare ? ibiz.i18n.t("control.common.customTheme.resetConfirmationGlobalDesc") : ibiz.i18n.t("control.common.customTheme.resetConfirmationDesc")
    });
    if (!res)
      return;
    const { themeVars } = await ibiz.util.theme.resetCustomTheme(
      this.state.themeTag,
      isShare
    );
    this.state.themeVars = themeVars;
  }
  /**
   * 计算尺寸改变，同类size批量更改
   *
   * @param {string} varName
   * @param {number} size
   * @memberof CustomThemeController
   */
  calcSizeChange(varName, size, item) {
    this.state.themeVars[varName] = "".concat(size).concat(item.unit || "");
    if (item.kindVars) {
      Object.keys(item.kindVars).forEach((key) => {
        const value = item.kindVars[key];
        this.state.themeVars[key] = "".concat(size + value).concat(item.unit || "");
      });
    }
  }
}

export { CustomThemeController };
