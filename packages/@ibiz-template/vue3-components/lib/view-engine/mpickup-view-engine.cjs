'use strict';

var core = require('@ibiz-template/core');
var runtime = require('@ibiz-template/runtime');
var pickupView_engine = require('./pickup-view.engine.cjs');

"use strict";
class MPickupViewEngine extends pickupView_engine.PickupViewEngine {
  /**
   * 简单列表控制器
   *
   * @author zk
   * @date 2023-05-26 03:05:43
   * @readonly
   * @memberof MPickupViewEngine
   */
  get simpleList() {
    return this.view.getController("simplelist");
  }
  /**
   * 视图created生命周期执行逻辑
   *
   * @author zk
   * @date 2023-05-26 05:05:36
   * @return {*}  {Promise<void>}
   * @memberof MPickupViewEngine
   */
  async onCreated() {
    await super.onCreated();
    if (!this.view.providers.simplelist) {
      throw new core.RuntimeModelError(
        this.view.model,
        ibiz.i18n.t("viewEngine.missingConfigErr")
      );
    }
    const { childNames } = this.view;
    childNames.push("simplelist");
    if (this.view.params.selecteddata) {
      this.selectData = JSON.parse(this.view.params.selecteddata);
      delete this.view.params.selecteddata;
    }
    if (!this.view.slotProps.simplelist) {
      this.view.slotProps.simplelist = {};
    }
    if (!this.view.slotProps.pickupviewpanel) {
      this.view.slotProps.pickupviewpanel = {};
    }
    this.view.slotProps.simplelist.mdctrlActiveMode = 2;
    this.view.slotProps.simplelist.isSimple = true;
    this.view.slotProps.simplelist.singleSelect = false;
    this.view.slotProps.pickupviewpanel.singleSelect = false;
  }
  /**
   * 视图mounted生命周期执行逻辑
   *
   * @author zk
   * @date 2023-05-26 05:05:27
   * @return {*}  {Promise<void>}
   * @memberof MPickupViewEngine
   */
  async onMounted() {
    await super.onMounted();
    this.simpleList.evt.on("onActive", (event) => {
      this.simpleListActive(event.data);
    });
    this.simpleList.setData(this.selectData);
  }
  async call(key, args) {
    if (key === runtime.SysUIActionTag.CANCEL) {
      this.cancel();
      return null;
    }
    if (key === runtime.SysUIActionTag.OK) {
      this.confirm();
      return null;
    }
    if (key === runtime.SysUIActionTag.ADD_SELECTION) {
      this.addSelection();
      return null;
    }
    if (key === runtime.SysUIActionTag.ADD_ALL) {
      this.addAll();
      return null;
    }
    if (key === runtime.SysUIActionTag.REMOVE_ALL) {
      this.removeAll();
      return null;
    }
    if (key === runtime.SysUIActionTag.REMOVE_SELECTION) {
      this.removeSelection();
      return null;
    }
    return super.call(key, args);
  }
  /**
   *  选则面板激活数据
   *
   * @author zk
   * @date 2023-05-26 05:05:13
   * @param {*} data
   * @memberof PickupViewEngine
   */
  pickupViewPanelDataActive(data) {
    this.handlePushSimpleListItems(data);
  }
  /**
   * 列表激活
   *
   * @author zk
   * @date 2023-05-26 05:05:47
   * @param {IData[]} data
   * @memberof MPickupViewEngine
   */
  simpleListActive(data) {
    const items = this.simpleList.getAllData();
    data.forEach((item) => {
      const index = items.findIndex((_item) => _item.srfkey === item.srfkey);
      if (index !== -1) {
        items.splice(index, 1);
      }
    });
    this.simpleList.setData(items);
  }
  /**
   * 添加选中
   *
   * @author zk
   * @date 2023-05-25 05:05:10
   * @memberof MPickupViewEngine
   */
  async addSelection() {
    const selectItem = await this.pickupViewPanel.getSelectedData();
    this.handlePushSimpleListItems(selectItem);
  }
  /**
   * 处理添加简单列表数据
   *
   * @author zk
   * @date 2023-05-26 02:05:41
   * @param {IData[]} data
   * @memberof MPickupViewEngine
   */
  handlePushSimpleListItems(data) {
    const allData = this.simpleList.getAllData();
    const items = [...allData, ...data];
    const uniqueItems = this.handleUniqueItems(items);
    this.simpleList.setData(uniqueItems);
  }
  /**
   * 去重数组
   *
   * @author zk
   * @date 2023-05-26 03:05:08
   * @param {IData[]} arr
   * @return {*}
   * @memberof MPickupViewEngine
   */
  handleUniqueItems(arr) {
    const res = /* @__PURE__ */ new Map();
    return arr.filter(
      (item) => !res.has(item.srfkey) && res.set(item.srfkey, 1)
    );
  }
  /**
   * 添加所有
   *
   * @author zk
   * @date 2023-05-25 05:05:12
   * @memberof MPickupViewEngine
   */
  async addAll() {
    const allItems = await this.pickupViewPanel.getAllData();
    this.handlePushSimpleListItems(allItems);
  }
  /**
   * 删除所有
   *
   * @author zk
   * @date 2023-05-25 05:05:14
   * @memberof MPickupViewEngine
   */
  removeAll() {
    this.simpleList.setData([]);
  }
  /**
   * 删除选中
   *
   * @author zk
   * @date 2023-05-25 05:05:16
   * @memberof MPickupViewEngine
   */
  removeSelection() {
    const selectData = this.simpleList.getData();
    const items = this.simpleList.getAllData();
    selectData.forEach((_item) => {
      const index = items.findIndex(
        (item) => _item.srfkey === item.srfkey
      );
      if (index !== -1) {
        items.splice(index, 1);
      }
    });
    this.simpleList.setData(items);
  }
  /**
   * 提交
   *
   * @author zk
   * @date 2023-05-25 06:05:42
   * @memberof MPickupViewEngine
   */
  confirm() {
    const items = this.simpleList.getAllData();
    this.view.closeView({ ok: true, data: items });
  }
}

exports.MPickupViewEngine = MPickupViewEngine;
