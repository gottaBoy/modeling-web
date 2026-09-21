import { isNil } from 'ramda';
import { RuntimeError } from '@ibiz-template/core';
import { DEMainViewEngine, getControl, getControlsByView, calcDeCodeNameById, SysUIActionTag, ViewCallTag, ControlVO, getAppViewRef, OpenAppViewCommand, calcDynaSysParams, getDeDataMajorField, convertNavData } from '@ibiz-template/runtime';

"use strict";
class EditViewEngine extends DEMainViewEngine {
  get form() {
    return this.view.getController("form");
  }
  init() {
    super.init();
    if (this.view.model.multiFormMode === 1 && this.view.params.srfdatatype) {
      const model = getControl(
        this.view.model,
        "_form_".concat(this.view.params.srfdatatype)
      );
      if (model) {
        const controls = getControlsByView(this.view.model).filter((item) => {
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
   * @description 模态关闭前执行钩子
   * @param {{ allowNext?: boolean }} context
   * @returns {*}  {Promise<void>}
   * @memberof EditViewEngine
   */
  async modalPreDismissHook(context) {
    try {
      if (this.form && this.form.state.modified && this.form.model.enableAutoSave) {
        await this.form.immediateAutoSave();
      }
    } catch (error) {
      context.allowNext = false;
    }
  }
  /**
   * 模态计算是否关闭钩子
   *
   * @param {{ allowClose?: boolean }} context
   * @return {*}  {Promise<void>}
   * @memberof EditViewEngine
   */
  async modalShouldDismissHook(context) {
    var _a, _b;
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
  async onCreated() {
    await super.onCreated();
    this.modalPreDismissHook = this.modalPreDismissHook.bind(this);
    this.modalShouldDismissHook = this.modalShouldDismissHook.bind(this);
    this.formDataStateChange = this.formDataStateChange.bind(this);
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
    modal.hooks.preDismiss.tapPromise(this.modalPreDismissHook);
    modal.hooks.shouldDismiss.tapPromise(this.modalShouldDismissHook);
  }
  /**
   * @description 监控form事件
   * @param {EventBase} event
   * @memberof EditViewEngine
   */
  formDataStateChange(event) {
    var _a;
    const { model, evt } = this.view;
    const formDeId = this.form.model.appDataEntityId;
    const data = event.data[0];
    (_a = this.toolbar) == null ? void 0 : _a.calcButtonState(data, formDeId, event);
    if (model.showDataInfoBar) {
      if (data.srfkey) {
        evt.emit("onViewInfoChange", { dataInfo: data.srfmajortext || "" });
      } else {
        evt.emit("onViewInfoChange", {
          dataInfo: ibiz.i18n.t("app.newlyBuild")
        });
      }
    }
  }
  async onMounted() {
    await super.onMounted();
    const { model, evt } = this.view;
    if (this.form) {
      this.form.evt.on("onLoadSuccess", (event) => {
        this.formDataStateChange(event);
        const data = event.data[0];
        this.view.state.srfactiveviewdata = data;
        if (Object.prototype.hasOwnProperty.call(data, "srfreadonly")) {
          if (data.srfreadonly) {
            this.view.context.srfreadonly = true;
          } else if (isNil(this.view.context.srfreadonly)) {
            this.view.context.srfreadonly = false;
          }
        }
        evt.emit("onDataChange", { ...event, actionType: "LOAD" });
      });
      this.form.evt.on("onLoadDraftSuccess", (event) => {
        this.formDataStateChange(event);
        evt.emit("onDataChange", { ...event, actionType: "LOADDRAFT" });
      });
      this.form.evt.on("onSaveSuccess", (event) => {
        this.view.state.closeOK = true;
        const deName = calcDeCodeNameById(this.view.model.appDataEntityId);
        const formData = event.data[0];
        if (this.view.context[deName] !== formData.srfkey) {
          this.view.context[deName] = formData.srfkey;
        }
        this.formDataStateChange(event);
        evt.emit("onDataChange", { ...event, actionType: "SAVE" });
      });
      this.form.evt.on("onRemoveSuccess", (event) => {
        this.formDataStateChange(event);
        evt.emit("onDataChange", { ...event, actionType: "REMOVE" });
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
            params: { srfdatatype: value, [name]: value },
            isReloadModel: true
          });
        }
      });
      if (!this.view.state.noLoadDefault && model.loadDefault) {
        this.load();
      }
    }
  }
  getData() {
    return this.form.getData();
  }
  async load() {
    return this.form.load();
  }
  async save(args) {
    return this.form.save(args);
  }
  async refresh() {
    this.form.refresh();
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
  async call(key, args) {
    if (key === SysUIActionTag.SAVE) {
      const result = await this.form.save(args);
      return { data: [result] };
    }
    if (key === SysUIActionTag.SAVE_AND_EXIT) {
      await this.form.save();
      return { closeView: true };
    }
    if (key === SysUIActionTag.REMOVE_AND_EXIT) {
      const res = await this.form.remove();
      return { closeView: res };
    }
    if (key === SysUIActionTag.SAVE_AND_NEW) {
      this.saveAndNew();
      return null;
    }
    if (key === SysUIActionTag.REFRESH) {
      await this.refresh();
      return null;
    }
    if (key === SysUIActionTag.SAVE_AND_START) {
      await this.wfStart();
      return null;
    }
    if (key === SysUIActionTag.FIRST_RECORD || key === SysUIActionTag.LAST_RECORD || key === SysUIActionTag.PREV_RECORD || key === SysUIActionTag.NEXT_RECORD) {
      await this.changeRecord(key);
      return null;
    }
    if (key === SysUIActionTag.VIEW_WF_STEP) {
      await this.wfSubmit();
      return null;
    }
    if (key === ViewCallTag.LOAD) {
      this.load();
      return null;
    }
    if (key === ViewCallTag.VALIDATE) {
      return this.form.validate();
    }
    if (key === ViewCallTag.WF_WITHDRAW) {
      await this.wfWithdraw();
      return null;
    }
    if (key === SysUIActionTag.EXPAND) {
      const { srfcollapsetag, srfgroupid } = args.params || {};
      const tag = srfcollapsetag || srfgroupid;
      if (!tag) {
        throw new RuntimeError(ibiz.i18n.t("viewEngine.noExpandTag"));
      }
      this.form.changeCollapse({ tag, expand: true });
      return null;
    }
    if (key === SysUIActionTag.COLLAPSE) {
      const { srfcollapsetag, srfgroupid } = args.params || {};
      const tag = srfcollapsetag || srfgroupid;
      if (!tag) {
        throw new RuntimeError(ibiz.i18n.t("viewEngine.noCollapseTag"));
      }
      this.form.changeCollapse({ tag, expand: false });
      return null;
    }
    if (key === SysUIActionTag.EXPANDALL) {
      this.form.changeCollapse({ expand: true });
      return null;
    }
    if (key === SysUIActionTag.COLLAPSEALL) {
      this.form.changeCollapse({ expand: false });
      return null;
    }
    return super.call(key, args);
  }
  /**
   * 保存并新建
   *
   * @author zk
   * @date 2023-06-01 01:06:59
   * @return {*}
   * @memberof EditViewEngine
   */
  async saveAndNew() {
    await this.form.save();
    this.form.state.data = new ControlVO();
    this.view.context[calcDeCodeNameById(this.view.model.appDataEntityId)] = void 0;
    await this.form.load();
  }
  /**
   * @description 取消变更
   * @param {({
   *       targetState: 'INIT' | 'UNDO' | 'REDO';
   *     })} [_args={ targetState: 'INIT' }] 目标状态，初始化状态|撤销上一步操作|重做下一步操作
   * @returns {*}  {Promise<void>}
   * @memberof EditViewEngine
   */
  async cancelChanges(_args = { targetState: "INIT" }) {
    await super.cancelChanges(_args);
    await this.form.cancelChanges(_args.targetState);
  }
  /**
   * 工作流启动
   *
   * @author lxm
   * @date 2022-09-29 20:09:27
   * @returns {*}  {Promise<void>}
   */
  async wfStart() {
    var _a, _b;
    await this.save({ silent: true });
    const entityService = await ibiz.hub.getAppDEService(
      this.view.model.appId,
      this.view.model.appDataEntityId,
      this.view.context
    );
    const data = this.form.state.data;
    const res = await entityService.wf.getWFVersion(
      (_b = (_a = data.srfwftag) != null ? _a : this.view.params.srfwftag) != null ? _b : this.view.context.srfwftag
    );
    if (res.data.length === 0) {
      throw new RuntimeError(ibiz.i18n.t("viewEngine.noExistVersionErr"));
    }
    const wfInfo = res.data[0];
    const refKey = "WFSTART@".concat(wfInfo.wfversion);
    const newContext = Object.assign(this.view.context.clone(), {
      activeForm: wfInfo["process-form"]
    });
    const newParams = {
      processDefinitionKey: wfInfo.definitionkey
    };
    const startView = getAppViewRef(this.view.model, refKey);
    if (!startView) {
      await this.form.wfStart({ viewParam: newParams });
      await this.view.closeView();
      return;
    }
    const result = await ibiz.commands.execute(
      OpenAppViewCommand.TAG,
      startView.refAppViewId,
      newContext,
      newParams
    );
    if (result.ok) {
      await this.view.closeView();
    }
  }
  /**
   * 工作流提交
   *
   * @author lxm
   * @date 2022-09-29 20:09:27
   * @returns {*}  {Promise<void>}
   */
  wfSubmit() {
    return this.form.wfSubmit();
  }
  /**
   * 工作流撤回
   *
   * @author zk
   * @date 2023-11-22 11:11:55
   * @return {*}  {Promise<void>}
   * @memberof MobEditViewEngine
   */
  async wfWithdraw() {
    const app = ibiz.hub.getApp(this.view.context.srfappid);
    const data = this.form.state.data;
    const entityService = await app.deService.getService(
      this.view.context,
      this.view.model.appDataEntityId
    );
    await entityService.wf.exec(
      "withdraw",
      this.view.context,
      {
        ...this.view.params,
        taskId: this.view.params.taskId || this.view.params.srftaskid
      },
      data instanceof ControlVO ? data.getOrigin() : data
    );
    ibiz.mc.command.send(
      { srfdecodename: "SysTodo" },
      "OBJECTUPDATED",
      "WITHDRAW"
    );
  }
  /**
   * 执行数据标记行为
   *
   * @memberof EditViewEngine
   */
  doMarkDataAction() {
    super.doMarkDataAction();
    if (this.doActions.includes("VIEW")) {
      this.form.evt.on("onLoadSuccess", () => this.sendViewDataAction());
    }
    if (this.doActions.includes("EDIT")) {
      let isWait = false;
      this.form.evt.on("onFormDataChange", () => {
        const data = this.form.getData()[0];
        if (isWait) {
          return;
        }
        isWait = true;
        this.sendMarkDataAction("EDIT", data.srfkey);
        setTimeout(
          () => {
            isWait = false;
          },
          1e3 * 60 * 5
        );
      });
    }
    if (this.doActions.includes("UPDATE")) {
      this.form.evt.on("onSaveSuccess", () => {
        const data = this.form.getData()[0];
        this.sendMarkDataAction("UPDATE", data.srfkey);
      });
    }
    if (this.doActions.includes("CLOSE")) {
      this.view.evt.on("onCloseView", () => {
        const data = this.form.getData()[0];
        if (data == null ? void 0 : data.srfkey) {
          this.sendMarkDataAction("CLOSE", data.srfkey);
        }
      });
    }
  }
  /**
   * 刷新确认
   * @author lxm
   * @date 2024-02-06 11:40:36
   * @return {*}  {Promise<boolean>}
   */
  async reloadConfirm() {
    const result = await super.reloadConfirm();
    if (result && this.form.state.modified) {
      return ibiz.confirm.warning({
        title: ibiz.i18n.t("viewEngine.refreshRemind"),
        desc: ibiz.i18n.t("viewEngine.confirmRefreshPrompt")
      });
    }
    return result;
  }
  /**
   * 变更当前页面的数据
   * @author lxm
   * @date 2024-04-01 01:11:58
   * @param {string} type
   */
  async changeRecord(type) {
    const controlId = "".concat(this.view.context.srfnavctrlid);
    if (!controlId) {
      throw new RuntimeError(ibiz.i18n.t("viewEngine.missingErr"));
    }
    const dataKey = this.form.state.data.srfkey;
    let targetItem;
    switch (type) {
      case SysUIActionTag.FIRST_RECORD:
        targetItem = await ibiz.util.record.getFirstRecord(controlId, dataKey);
        break;
      case SysUIActionTag.LAST_RECORD:
        targetItem = await ibiz.util.record.getLastRecord(controlId, dataKey);
        break;
      case SysUIActionTag.PREV_RECORD:
        targetItem = await ibiz.util.record.getPreviousRecord(
          controlId,
          dataKey
        );
        break;
      case SysUIActionTag.NEXT_RECORD:
        targetItem = await ibiz.util.record.getNextRecord(controlId, dataKey);
        break;
      default:
        break;
    }
    if (targetItem) {
      const appDataEntity = await ibiz.hub.getAppDataEntity(
        this.form.model.appDataEntityId,
        this.form.context.srfappid
      );
      const { srfparentkey, srfparentdename } = await calcDynaSysParams(
        this.form.model.appDataEntityId,
        this.view.context,
        {
          viewParams: this.view.params
        }
      );
      const typeFileName = appDataEntity.formTypeAppDEFieldId || appDataEntity.dataTypeAppDEFieldId;
      const params = {
        srfdatatype: typeFileName ? targetItem[typeFileName] : void 0
      };
      const context = await getDeDataMajorField(
        targetItem,
        this.view.context,
        this.form.model.appDataEntityId
      );
      context[this.deName] = targetItem.srfkey;
      const logicId = "".concat(this.view.context.srfnavlogicid);
      if (logicId) {
        const logicParams = ibiz.util.record.getTriggerLogic(logicId);
        const targetControl = ibiz.util.record.getCtrl(controlId);
        if (logicParams) {
          const { navContexts, navParams } = logicParams;
          if (navContexts) {
            Object.assign(
              context,
              convertNavData(
                navContexts,
                targetItem,
                (targetControl == null ? void 0 : targetControl.params) || params,
                (targetControl == null ? void 0 : targetControl.context) || {}
              )
            );
          }
          if (navParams) {
            Object.assign(
              params,
              convertNavData(
                navParams,
                targetItem,
                (targetControl == null ? void 0 : targetControl.params) || params,
                (targetControl == null ? void 0 : targetControl.context) || {}
              )
            );
          }
        }
      }
      Object.assign(this.view.context, context);
      Object.assign(this.view.params, params);
      if (srfparentdename && this.view.model.dynaSysMode === 1 && this.view.context[srfparentdename] !== srfparentkey) {
        return this.view.redrawView({
          params,
          context,
          data: [targetItem],
          isReloadModel: true
        });
      }
      return this.view.redrawView({
        params,
        context,
        data: [targetItem]
      });
    }
  }
  /**
   * 视图destroyed生命周期执行逻辑
   *
   * @return {*}  {Promise<void>}
   * @memberof EditViewEngine
   */
  async onDestroyed() {
    super.onDestroyed();
    const { modal } = this.view;
    modal.hooks.preDismiss.removeTapPromise(this.modalPreDismissHook);
    modal.hooks.shouldDismiss.removeTapPromise(this.modalShouldDismissHook);
  }
}

export { EditViewEngine };
