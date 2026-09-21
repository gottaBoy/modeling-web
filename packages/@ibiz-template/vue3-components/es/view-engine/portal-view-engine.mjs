import { DEMainViewEngine, SysUIActionTag } from '@ibiz-template/runtime';

"use strict";
class PortalViewEngine extends DEMainViewEngine {
  /**
   * 视图created生命周期执行逻辑
   *
   * @return {*}  {Promise<void>}
   * @memberof PortalViewEngine
   */
  async onCreated() {
    await super.onCreated();
    const { childNames } = this.view;
    childNames.push("dashboard");
  }
  /**
   * 数据看板部件
   *
   * @readonly
   * @memberof PortalViewEngine
   */
  get dashboard() {
    return this.view.getController("dashboard");
  }
  /**
   * 视图刷新
   *
   * @return {*}  {Promise<void>}
   * @memberof PortalViewEngine
   */
  async refresh() {
    await this.dashboard.refresh();
  }
  /**
   * 执行视图预置界面行为能力
   *
   * @param {string} key
   * @param {*} args
   * @return {*}  {(Promise<IData | null | undefined>)}
   * @memberof PortalViewEngine
   */
  async call(key, args) {
    if (key === SysUIActionTag.REFRESH) {
      if (args.ctrl) {
        await args.ctrl.refresh();
      } else {
        await this.refresh();
      }
      return null;
    }
    return super.call(key, args);
  }
  async onMounted() {
    await super.onMounted();
    if (this.view.model.appDataEntityId) {
      await this.loadEntityData();
    }
  }
  /**
   * 执行标记数据行为
   *
   * @memberof PortalViewEngine
   */
  doMarkDataAction() {
    let data;
    if (this.doActions.includes("VIEW")) {
      const callback = async (_data) => {
        this.markOpenDataCallback(_data, data == null ? void 0 : data.srfmajortext);
      };
      this.view.evt.on("onDataChange", async (event) => {
        data = event.data[0];
        const result = await this.sendMarkDataAction("VIEW", data.srfkey);
        if (result.ok && result.data.length > 0) {
          result.data.forEach((item) => {
            var _a;
            if (item.data) {
              (_a = this.coopPos) == null ? void 0 : _a.updateMessage({
                data: item.data
              });
            }
          });
        }
        this.subscribeMarkDataAction(data.srfkey, callback);
      });
    }
    if (this.doActions.includes("EDIT")) {
      let isWait = false;
      this.dashboard.evt.on("onConfigChange", () => {
        if (!(data == null ? void 0 : data.srfkey) || isWait) {
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
      this.dashboard.evt.on("onSavePortlet", () => {
        if (data == null ? void 0 : data.srfkey) {
          this.sendMarkDataAction("UPDATE", data == null ? void 0 : data.srfkey);
        }
      });
    }
    if (this.doActions.includes("CLOSE")) {
      this.view.evt.on("onCloseView", () => {
        if (data == null ? void 0 : data.srfkey) {
          this.sendMarkDataAction("CLOSE", data.srfkey);
        }
      });
    }
  }
}

export { PortalViewEngine };
