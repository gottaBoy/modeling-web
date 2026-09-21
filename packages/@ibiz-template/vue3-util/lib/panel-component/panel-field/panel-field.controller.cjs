'use strict';

var runtime = require('@ibiz-template/runtime');
var panelField_state = require('./panel-field.state.cjs');

"use strict";
class PanelFieldController extends runtime.PanelItemController {
  constructor() {
    super(...arguments);
    this.unitName = void 0;
  }
  /**
   * 值格式化
   * @author lxm
   * @date 2023-05-24 05:46:56
   * @readonly
   * @type {(string | undefined)}
   */
  get valueFormat() {
    return this.model.valueFormat;
  }
  get dataType() {
    return void 0;
  }
  get context() {
    return this.panel.context;
  }
  get params() {
    return this.panel.params;
  }
  /**
   * 父容器数据对象数据
   * @author lxm
   * @date 2023-07-15 01:33:58
   * @readonly
   * @type {IData}
   */
  get data() {
    return this.dataParent.data;
  }
  /**
   * 面板属性成员的值
   * @author lxm
   * @date 2023-07-14 02:30:58
   * @readonly
   */
  get value() {
    return this.data[this.model.id];
  }
  createState() {
    var _a;
    return new panelField_state.PanelFieldState((_a = this.parent) == null ? void 0 : _a.state);
  }
  /**
   * 值校验
   * @return {*}  {Promise<boolean>}
   * @memberof PanelFieldController
   */
  async validate() {
    var _a;
    if (this.state.visible && !this.model.allowEmpty && !this.value) {
      this.state.error = ((_a = this.editor) == null ? void 0 : _a.model.placeHolder) || ibiz.i18n.t("vue3Util.panelComponent.cannotEmpty", {
        caption: this.model.caption
      });
      return false;
    }
    this.state.error = null;
    return true;
  }
  /**
   * 初始化
   *
   * @author lxm
   * @date 2022-08-24 20:08:42
   * @protected
   * @returns {*}  {Promise<void>}
   */
  async onInit() {
    var _a, _b;
    await super.onInit();
    this.state.required = !this.model.allowEmpty;
    if (this.context.srfreadonly !== true && this.context.srfreadonly !== "true" && ((_a = this.model.editor) == null ? void 0 : _a.readOnly)) {
      this.state.readonly = ((_b = this.model.editor) == null ? void 0 : _b.readOnly) || false;
    }
    if (this.model.editor && this.model.editor.editorType !== "HIDDEN") {
      this.editorProvider = await runtime.getEditorProvider(this.model.editor);
      if (this.editorProvider) {
        this.editor = await this.editorProvider.createController(
          this.model.editor,
          this
        );
      }
    }
  }
  /**
   * 设置面板数据的值
   *
   * @author lxm
   * @date 2022-08-24 10:08:40
   * @param {unknown} value 要设置的值
   * @param {string} name 要设置的面板数据的属性名称
   */
  async setDataValue(value, name) {
    const { id } = this.model;
    name = name || id;
    if (this.dataParent.setDataValue) {
      await this.dataParent.setDataValue(name, value);
    }
    await this.validate();
    this.panel.evt.emit("onPanelItemEvent", {
      panelItemName: this.model.id,
      panelItemEventName: runtime.PanelItemEventName.CHANGE
    });
  }
  /**
   * 聚焦事件
   * @author lxm
   * @date 2023-10-11 05:03:26
   */
  onFocus(event) {
    this.panel.evt.emit("onPanelItemEvent", {
      panelItemName: this.model.id,
      panelItemEventName: runtime.PanelItemEventName.FOCUS,
      event
    });
  }
  /**
   * 失焦事件
   * @author lxm
   * @date 2023-10-11 05:03:26
   */
  onBlur(event) {
    this.panel.evt.emit("onPanelItemEvent", {
      panelItemName: this.model.id,
      panelItemEventName: runtime.PanelItemEventName.BLUR,
      event
    });
  }
  /**
   * 回车事件
   * @author lxm
   * @date 2023-10-11 05:03:26
   */
  onEnter(event) {
    this.panel.evt.emit("onPanelItemEvent", {
      panelItemName: this.model.id,
      panelItemEventName: runtime.PanelItemEventName.ENTER,
      event
    });
  }
}

exports.PanelFieldController = PanelFieldController;
