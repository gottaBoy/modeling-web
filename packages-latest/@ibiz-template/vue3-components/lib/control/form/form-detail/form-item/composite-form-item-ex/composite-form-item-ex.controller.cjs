'use strict';

var runtime = require('@ibiz-template/runtime');
var Schema = require('async-validator');
var compositeFormItemEx_state = require('./composite-form-item-ex.state.cjs');

"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class CompositeFormItemExController extends runtime.FormItemController {
  constructor() {
    super(...arguments);
    /**
     * @description 默认显示的编辑器类型
     * @type {string}
     * @memberof CompositeFormItemExController
     */
    __publicField(this, "defaultType", "");
    /**
     * @description 组件内部自己绘制切换菜单，而非外部绘制的编辑器类型
     * @type {string[]}
     * @memberof CompositeFormItemExController
     */
    __publicField(this, "includesList", ["HTMLEDITOR_DEFAULT", "MARKDOWN_DEFAULT"]);
    /**
     * @description 代码表id
     * @type {string}
     * @memberof CompositeFormItemExController
     */
    __publicField(this, "codeListId", "");
    /**
     * @description 是否禁止切换菜单选项
     * @type {boolean}
     * @memberof CompositeFormItemExController
     */
    __publicField(this, "disableSwitch", false);
    /**
     * @description 是否隐藏切换菜单
     * @type {boolean}
     * @memberof CompositeFormItemExController
     */
    __publicField(this, "hiddenSwitch", false);
    /**
     * @description 切换菜单选项
     * @type {{ id: string; name: string; icon?: ISysImage, editor?: IData }[]}
     * @memberof CompositeFormItemExController
     */
    __publicField(this, "switchOptions", []);
    /**
     * @description 值项
     * @type {(IEditorItem | undefined)}
     * @memberof CompositeFormItemExController
     */
    __publicField(this, "valueItem");
  }
  createState() {
    var _a;
    return new compositeFormItemEx_state.CompositeFormItemExState((_a = this.parent) == null ? void 0 : _a.state);
  }
  async onInit() {
    var _a, _b, _c, _d, _e, _f;
    await super.onInit();
    const editor = this.model.editor;
    if (!editor) {
      return;
    }
    this.codeListId = editor.appCodeListId || "";
    if ((_a = editor.editorParams) == null ? void 0 : _a.codelistid) {
      this.codeListId = editor.editorParams.codelistid;
    }
    if (this.codeListId) {
      const app = ibiz.hub.getApp(this.context.srfappid);
      const items = await app.codeList.get(
        this.codeListId,
        this.context,
        this.params
      );
      if (items && items.length) {
        this.switchOptions = items.map((item) => {
          return {
            id: item.value,
            name: item.text,
            icon: item.sysImage,
            editor: item.data
          };
        });
        this.defaultType = ((_b = this.switchOptions[0]) == null ? void 0 : _b.id) || "";
      }
    }
    if ((_c = editor.editorParams) == null ? void 0 : _c.defaulttype) {
      this.defaultType = editor.editorParams.defaulttype;
    }
    if ((_d = editor.editorParams) == null ? void 0 : _d.includes) {
      this.includesList = JSON.parse(editor.editorParams.includes);
    }
    if ((_e = editor.editorParams) == null ? void 0 : _e.disableswitch) {
      this.disableSwitch = editor.editorParams.disableswitch === "true";
    }
    if ((_f = editor.editorParams) == null ? void 0 : _f.hiddenswitch) {
      this.hiddenSwitch = editor.editorParams.hiddenswitch === "true";
    }
    if (editor.editorItems && editor.editorItems.length) {
      this.valueItem = editor.editorItems[0];
    }
    await this.updateEditor(this.defaultType);
  }
  /**
   * @description 更新编辑器模型
   * @param {string} id
   * @returns {*}  {Promise<void>}
   * @memberof CompositeFormItemExController
   */
  async updateEditor(id) {
    if (!id || id === this.state.editorId) {
      return;
    }
    const option = this.switchOptions.find((item) => item.id === id);
    if (!option) {
      return;
    }
    const editorModel = {
      ...this.createEditorModel(),
      ...option.editor
    };
    this.editorProvider = await runtime.getEditorProvider(editorModel);
    if (this.editorProvider) {
      this.editor = await this.editorProvider.createController(
        editorModel,
        this
      );
      this.rules = [];
      const formItemsVRs = runtime.filterValueRules(
        this.form.model.deformItemVRs || [],
        this.name
      );
      if (formItemsVRs) {
        this.rules.push(
          ...runtime.generateRules(formItemsVRs, this.name, this.valueItemName)
        );
      }
      if (editorModel) {
        this.rules.push(...runtime.generateEditorRules(editorModel));
      }
      if (this.rules.length > 0) {
        this.validator = new Schema({ [this.name]: this.rules });
      } else {
        this.validator = void 0;
      }
    } else {
      this.editor = void 0;
      this.rules = [];
      this.validator = void 0;
    }
    this.state.editorId = id;
  }
  /**
   * @description 处理编辑器切换
   * @param {string} id
   * @returns {*}  {Promise<void>}
   * @memberof CompositeFormItemExController
   */
  async handleEditorSwitch(id) {
    if (this.disableSwitch) {
      return;
    }
    if (!id || id === this.state.editorId) {
      return;
    }
    if (this.value) {
      const result = await ibiz.confirm.warning({
        title: ibiz.i18n.t("control.form.compositeFormItemEx.confirmTitle"),
        desc: ibiz.i18n.t("control.form.compositeFormItemEx.confirmDesc")
      });
      if (!result) {
        return;
      }
    }
    this.setDataValue("", this.name);
    if (this.valueItem && this.valueItem.id) {
      this.setDataValue(id, this.valueItem.id);
    }
  }
}

exports.CompositeFormItemExController = CompositeFormItemExController;
