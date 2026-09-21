'use strict';

var runtime = require('@ibiz-template/runtime');
var panelField_state = require('./panel-field.state.cjs');

"use strict";
const _PanelFieldController = class _PanelFieldController extends runtime.PanelItemController {
  constructor() {
    super(...arguments);
    /**
     * @description 单位名称
     * @exposedoc
     * @type {(string | undefined)}
     * @memberof PanelFieldController
     */
    this.unitName = void 0;
  }
  /**
   * @exposedoc
   * @description 值格式化
   * @readonly
   * @type {(string | undefined)}
   * @memberof PanelFieldController
   */
  get valueFormat() {
    return this.model.valueFormat;
  }
  /**
   * @exposedoc
   * @description 数据类型
   * @readonly
   * @type {(number | undefined)}
   * @memberof PanelFieldController
   */
  get dataType() {
    return void 0;
  }
  /**
   * @exposedoc
   * @description 上下文
   * @readonly
   * @type {IContext}
   * @memberof PanelFieldController
   */
  get context() {
    return this.panel.context;
  }
  /**
   * @exposedoc
   * @description 视图参数
   * @readonly
   * @type {IParams}
   * @memberof PanelFieldController
   */
  get params() {
    return this.panel.params;
  }
  /**
   * @exposedoc
   * @description 父容器数据对象数据
   * @readonly
   * @type {IData}
   * @memberof PanelFieldController
   */
  get data() {
    return this.dataParent.data;
  }
  /**
   * @exposedoc
   * @description 面板属性成员的值
   * @readonly
   * @type {(string | number)}
   * @memberof PanelFieldController
   */
  get value() {
    return this.data[this.model.id];
  }
  createState() {
    var _a;
    return new panelField_state.PanelFieldState((_a = this.parent) == null ? void 0 : _a.state);
  }
  /**
   * @description 值校验
   * @returns {*}  {Promise<boolean>}
   * @memberof PanelFieldController
   */
  async validate() {
    var _a;
    if (this.state.visible && this.state.required && !this.value) {
      this.state.error = ((_a = this.editor) == null ? void 0 : _a.model.placeHolder) || ibiz.i18n.t("vue3Util.panelComponent.cannotEmpty", {
        caption: this.model.caption
      });
      return false;
    }
    this.state.error = null;
    return true;
  }
  /**
   * @description 初始化
   * @protected
   * @returns {*}  {Promise<void>}
   * @memberof PanelFieldController
   */
  async onInit() {
    var _a, _b;
    await super.onInit();
    this.state.required = !this.model.allowEmpty;
    if (this.context.srfreadonly !== true && this.context.srfreadonly !== "true" && ((_a = this.model.editor) == null ? void 0 : _a.readOnly)) {
      this.state.readonly = ((_b = this.model.editor) == null ? void 0 : _b.readOnly) || false;
    }
    if (this.model.editor && this.model.editor.editorType !== "HIDDEN") {
      this.editorProvider = await runtime.getEditorProvider(
        this.model.editor,
        this.panel.model
      );
      if (this.editorProvider) {
        this.editor = await this.editorProvider.createController(
          this.model.editor,
          this
        );
      }
    }
  }
  /**
   * @exposedoc
   * @description 设置面板数据的值
   * @param {unknown} value
   * @param {string} [name]
   * @returns {*}  {Promise<void>}
   * @memberof PanelFieldController
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
  /**
   * @description 点击事件
   * @param {MouseEvent} [event]
   * @memberof PanelFieldController
   */
  onClick(event) {
    var _a;
    if (ibiz.env.isMob) {
      const disableEdit = this.state.readonly || this.state.disabled;
      if (!disableEdit && ((_a = this.editor) == null ? void 0 : _a.model.editorType) && !_PanelFieldController.enableClickType.includes(
        this.editor.model.editorType
      )) {
        event == null ? void 0 : event.stopPropagation();
      }
    }
    super.onClick(event);
  }
};
/**
 * @description 可冒泡点击事件的编辑器类型
 * @static
 * @memberof PanelFieldController
 */
_PanelFieldController.enableClickType = [
  "SPAN",
  "SPAN_LINK",
  "RAW",
  "MOB2DBARCODEREADER",
  "FIELD_CAROUSEL_PICTURE",
  "FIELD_IMAGE_PICTURE_ONE"
];
let PanelFieldController = _PanelFieldController;

exports.PanelFieldController = PanelFieldController;
