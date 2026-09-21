'use strict';

var runtime = require('@ibiz-template/runtime');

"use strict";
class OptViewEngine extends runtime.ViewEngineBase {
  /**
   * 表单部件
   *
   * @readonly
   * @memberof OptViewEngine
   */
  get form() {
    return this.view.getController("form");
  }
  init() {
    super.init();
    if (this.view.model.multiFormMode === 1 && this.view.params.srfdatatype) {
      const model = runtime.getControl(
        this.view.model,
        "_form_".concat(this.view.params.srfdatatype)
      );
      if (model) {
        const controls = runtime.getControlsByView(this.view.model).filter((item) => {
          return item.controlType !== "FORM";
        });
        model.name = "form";
        controls.push(model);
        if (this.view.model.viewLayoutPanel) {
          this.view.model.viewLayoutPanel.controls = controls;
        } else {
          this.view.model.controls = controls;
        }
      }
    }
  }
  /**
   * 视图created生命周期执行逻辑
   *
   * @return {*}  {Promise<void>}
   * @memberof OptViewEngine
   */
  async onCreated() {
    await super.onCreated();
    this.modalEventHook = this.modalEventHook.bind(this);
    const { childNames, modal } = this.view;
    childNames.push("form");
    if (!this.view.slotProps.form) {
      this.view.slotProps.form = {};
    }
    this.view.slotProps.form.loadDefault = false;
    if (!this.view.slotProps.toolbar) {
      this.view.slotProps.toolbar = {};
    }
    this.view.slotProps.toolbar.manualCalcButtonState = true;
    modal.hooks.shouldDismiss.tapPromise(this.modalEventHook);
  }
  /**
   * 视图mounted生命周期执行逻辑
   *
   * @return {*}  {Promise<void>}
   * @memberof OptViewEngine
   */
  async onMounted() {
    await super.onMounted();
    const { model, evt } = this.view;
    const formDeId = this.form.model.appDataEntityId;
    const formDataStateChange = (event) => {
      var _a;
      const data = event.data[0];
      (_a = this.toolbar) == null ? void 0 : _a.calcButtonState(data, formDeId);
      if (data.srfkey) {
        evt.emit("onViewInfoChange", { dataInfo: data.srfmajortext });
      }
    };
    this.form.evt.on("onLoadSuccess", (event) => {
      const data = event.data[0];
      this.view.state.srfactiveviewdata = data;
      if (Object.prototype.hasOwnProperty.call(data, "srfreadonly")) {
        this.view.context.srfreadonly = data.srfreadonly;
      }
      formDataStateChange(event);
    });
    this.form.evt.on("onLoadDraftSuccess", (event) => {
      formDataStateChange(event);
    });
    this.form.evt.on("onSaveSuccess", (event) => {
      formDataStateChange(event);
    });
    const appDe = await ibiz.hub.getAppDataEntity(
      this.view.model.appDataEntityId,
      this.view.model.appId
    );
    this.form.evt.on("onFormDataChange", (event) => {
      const { name, value } = event;
      if (name === appDe.formTypeAppDEFieldId && this.view.model.multiFormMode === 1) {
        this.view.redrawView({
          context: this.view.context,
          params: {
            ...this.view.params,
            srfdatatype: value,
            srfdefdata: event.data[0],
            [name]: value
          },
          isReloadModel: true
        });
      }
    });
    if (!this.view.state.noLoadDefault && model.loadDefault) {
      this.load();
    }
  }
  /**
   * 视图destroyed生命周期执行逻辑
   *
   * @author tony001
   * @date 2024-09-14 15:09:50
   * @return {*}  {Promise<void>}
   */
  async onDestroyed() {
    super.onDestroyed();
    const { modal } = this.view;
    modal.hooks.shouldDismiss.removeTapPromise(this.modalEventHook);
  }
  /**
   * 模态事件钩子
   *
   * @author tony001
   * @date 2024-09-14 15:09:59
   * @param {{ allowClose?: boolean }} context
   * @return {*}  {Promise<void>}
   */
  async modalEventHook(context) {
    var _a, _b;
    if (this.form && this.form.state.modified && this.form.model.enableAutoSave) {
      await this.form.immediateAutoSave();
    }
    const srfSessionid = this.view.context.srfsessionid;
    const uiDomain = ibiz.uiDomainManager.get(srfSessionid);
    let isChange = this.view.model.enableDirtyChecking === true;
    const isTopView = srfSessionid === this.view.id;
    if (isTopView) {
      const dataModification = (uiDomain == null ? void 0 : uiDomain.dataModification) || false;
      isChange = isChange && (((_a = this.form) == null ? void 0 : _a.state.modified) || dataModification);
    } else {
      isChange = isChange && ((_b = this.form) == null ? void 0 : _b.state.modified);
    }
    if (isChange && context.allowClose == null) {
      const isAllow = await ibiz.confirm.error({
        title: ibiz.i18n.t("viewEngine.closeRemind"),
        desc: ibiz.i18n.t("viewEngine.confirmClosePrompt")
      });
      if (!isAllow) {
        context.allowClose = false;
      } else {
        context.allowClose = true;
      }
    }
  }
  /**
   * 获取数据
   *
   * @return {*}  {IData[]}
   * @memberof OptViewEngine
   */
  getData() {
    return this.form.getData();
  }
  /**
   * 加载
   *
   * @memberof OptViewEngine
   */
  load() {
    return this.form.load();
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
  async call(key, args) {
    if (key === runtime.SysUIActionTag.CANCEL) {
      this.cancel();
      return null;
    }
    if (key === runtime.SysUIActionTag.OK) {
      await this.confirm();
      return null;
    }
    if (key === runtime.ViewCallTag.LOAD) {
      this.load();
      return null;
    }
    if (key === runtime.ViewCallTag.VALIDATE) {
      return this.form.validate();
    }
    return super.call(key, args);
  }
  /**
   * 确认
   *
   * @memberof OptViewEngine
   */
  async confirm() {
    this.view.state.isClosing = true;
    try {
      await this.form.save();
      await this.view.closeView({ ok: true, data: this.getData() });
    } catch (error) {
      this.view.state.isClosing = false;
      throw error;
    }
  }
  /**
   * 取消
   *
   * @memberof OptViewEngine
   */
  cancel() {
    this.view.modal.ignoreDismissCheck = true;
    this.view.closeView({ ok: false, data: [] });
  }
}

exports.OptViewEngine = OptViewEngine;
