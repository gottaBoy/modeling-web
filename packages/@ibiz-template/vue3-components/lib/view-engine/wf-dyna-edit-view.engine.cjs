'use strict';

var core = require('@ibiz-template/core');
var runtime = require('@ibiz-template/runtime');
var qxUtil = require('qx-util');
var editView_engine = require('./edit-view.engine.cjs');

"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class WFDynaEditViewEngine extends editView_engine.EditViewEngine {
  constructor() {
    super(...arguments);
    /**
     * 流程表单是否可编辑
     *
     * @author lxm
     * @date 2022-09-29 15:09:16
     * @type {boolean}
     */
    __publicField(this, "isEditable", false);
    /**
     * 是否计算工作流工具栏
     * @author lxm
     * @date 2023-06-20 06:33:37
     * @type {boolean}
     */
    __publicField(this, "isCalcWFToolbar", true);
    /**
     * 实体服务
     * @author lxm
     * @date 2023-06-19 07:09:38
     * @type {IAppDEService}
     */
    __publicField(this, "entityService");
    /**
     * 当前激活表单模型
     *
     * @author lxm
     * @date 2022-09-29 17:09:44
     * @type {IDEEditForm}
     */
    __publicField(this, "processForm");
    /**
     * 工作流links
     *
     * @author lxm
     * @date 2022-10-08 16:10:53
     * @type {WFLink[]}
     */
    __publicField(this, "wfLinks", []);
  }
  get form() {
    return this.view.getController(
      this.processForm.name
    );
  }
  async onCreated() {
    await super.onCreated();
    const app = ibiz.hub.getApp(this.view.context.srfappid);
    this.entityService = await app.deService.getService(
      this.view.context,
      this.view.model.appDataEntityId
    );
    await this.calcProcessForm();
    const { childNames } = this.view;
    childNames.push(this.processForm.name);
  }
  async onMounted() {
    var _a;
    await super.onMounted();
    (_a = this.toolbar) == null ? void 0 : _a.evt.on("onClick", async (event) => {
      if (event.buttonType === "extra" && event.eventArg) {
        this.onLinkClick(event.eventArg);
      }
    });
  }
  async load() {
    const res = await super.load();
    if (this.isCalcWFToolbar) {
      this.calcWfToolbar();
    }
    return res;
  }
  /**
   * 刷新页面
   *
   * @author lxm
   * @date 2022-09-29 15:09:03
   * @returns {*}  {Promise<void>}
   */
  async refresh() {
    const previous = this.processForm;
    await this.calcProcessForm();
    if (previous === this.processForm) {
      await super.refresh();
    }
  }
  /**
   * 计算流程步骤表单的名称
   * @author lxm
   * @date 2023-06-20 06:24:21
   * @return {*}  {Promise<string>}
   */
  async calcProcessFormName() {
    const res = await this.entityService.wf.getWFStep(
      Object.assign(this.view.context.clone(), {
        ...this.view.params
      })
    );
    const data = res.data;
    this.isEditable = data.isEditable === "true";
    if (!this.isEditable) {
      if (data.hasOwnProperty("process-editmode") && Number(data["process-editmode"]) > 0) {
        this.isEditable = true;
      }
    }
    const key = "process-".concat(ibiz.env.isMob ? "mob" : "", "form");
    const processForm = data[key] ? "wfform_".concat(data[key]) : "form";
    return processForm;
  }
  /**
   * 计算当前步骤的表单
   *
   * @author lxm
   * @date 2022-09-29 15:09:07
   * @returns {*}  {Promise<void>}
   */
  async calcProcessForm() {
    const processForm = await this.calcProcessFormName();
    const formModel = runtime.getControl(this.view.model, processForm.toLowerCase());
    if (!formModel) {
      throw new core.RuntimeModelError(
        this.view.model,
        ibiz.i18n.t("viewEngine.noFoundFormModel", { name: processForm })
      );
    }
    this.processForm = formModel;
    if (!this.view.slotProps.form) {
      this.view.slotProps.form = {};
    }
    this.view.slotProps.form.modelData = this.processForm;
  }
  /**
   * 计算工作流工具栏，需要在表单加载回来之后执行
   *
   * @author lxm
   * @date 2022-09-30 19:09:44
   * @returns {*}  {Promise<void>}
   */
  async calcWfToolbar() {
    if (!this.toolbar) {
      throw new core.RuntimeModelError(
        this.view.model,
        ibiz.i18n.t("viewEngine.missingToolbarModel")
      );
    }
    this.toolbar.clearExtraButtons();
    const app = ibiz.hub.getApp(this.view.context.srfappid);
    const entityService = await app.deService.getService(
      this.view.context,
      this.view.model.appDataEntityId
    );
    const res = await entityService.wf.getWFLink(
      Object.assign(this.view.context.clone(), {
        taskDefinitionKey: this.view.params.taskDefinitionKey
      }),
      this.getData()[0].getOrigin()
    );
    this.wfLinks = res.data;
    this.wfLinks.forEach((item) => {
      item.id = qxUtil.createUUID();
    });
    const extraButtons = this.wfLinks.map((link) => {
      return {
        id: link.id,
        appId: this.view.model.appId,
        caption: link.sequenceFlowName,
        buttonType: "extra",
        tooltip: link.sequenceFlowName,
        showCaption: true
      };
    });
    this.toolbar.setExtraButtons("before", extraButtons);
  }
  /**
   * 工作流工具栏点击回调处理
   *
   * @author lxm
   * @date 2022-10-08 17:10:29
   * @param {id} link 点击按钮对应的id
   * @returns {*}  {Promise<void>}
   */
  async onLinkClick(id) {
    const link = this.wfLinks.find((wfLink) => {
      return wfLink.id === id;
    });
    if (link) {
      return this.wfSubmitByLink(link);
    }
  }
  /**
   * 根据工作流link处理工作流提交
   *
   * @param {WFLink} link
   * @returns {*}
   * @memberof WFDynaEditViewController
   */
  async wfSubmitByLink(link) {
    if (this.isEditable) {
      await this.save({ silent: true });
    }
    const newContext = Object.assign(this.view.context.clone(), {
      isEditable: this.isEditable,
      processForm: link.sequenceflowform
    });
    const newParams = {
      ...link
    };
    const submitView = runtime.getWFSubmitViewId(this.view.model, link);
    if (!submitView) {
      await this.form.wfSubmit({ viewParam: newParams });
      await this.view.closeView();
      return;
    }
    const result = await ibiz.commands.execute(
      runtime.OpenAppViewCommand.TAG,
      submitView,
      newContext,
      newParams
    );
    if (result.ok) {
      await this.view.closeView();
    }
  }
}

exports.WFDynaEditViewEngine = WFDynaEditViewEngine;
