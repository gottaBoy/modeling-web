'use strict';

var vue = require('vue');
var runtime = require('@ibiz-template/runtime');
var vue3Util = require('@ibiz-template/vue3-util');
var core = require('@ibiz-template/core');
var ramda = require('ramda');
var dashboardDesign_util = require('./dashboard-design.util.cjs');
require('./dashboard-design.css');

"use strict";
function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !vue.isVNode(s);
}
const DashboardDesign = /* @__PURE__ */ vue.defineComponent({
  name: "IBizDashboardDesign",
  props: {
    dashboard: {
      type: Object,
      required: true
    },
    customDashboard: {
      type: Object,
      required: true
    },
    isShowDesign: {
      type: Boolean,
      required: true
    }
  },
  emits: ["saved", "reset"],
  setup(props, {
    emit
  }) {
    const ns = vue3Util.useNamespace("dashboard-design");
    const c = props.dashboard;
    const customC = props.customDashboard;
    const portlets = vue.ref([]);
    const list = vue.ref([]);
    const groups = vue.ref([]);
    const filterVal = vue.ref("");
    const layoutModel = vue.ref(ramda.clone(customC.customModelData));
    const layoutConfig = vue.ref(ramda.clone(customC.portletConfig));
    const providers = vue.ref({});
    const portletControllers = vue.ref({});
    const designPanel = vue.ref(null);
    const isLoading = vue.ref(false);
    const filterData = (list1) => {
      const items = [];
      list1.forEach((data) => {
        var _a;
        if (Object.is(data.type, "app")) {
          items.push(data);
        }
        const dataType = ((_a = customC.model) == null ? void 0 : _a.appDataEntityId) || "app";
        if (Object.is(data.appCodeName, dataType)) {
          items.push(data);
        }
      });
      return items;
    };
    const prepareListChildren = (children, data) => {
      let item = children.find((child) => Object.is(data.groupCodeName, child.type));
      if (!item) {
        item = {};
        Object.assign(item, {
          type: data.groupCodeName,
          name: data.groupName,
          children: []
        });
        children.push(item);
      }
      const _item = item.children.find((child) => Object.is(child.portletCodeName, data.portletCodeName));
      if (!_item) {
        item.children.push(data);
      }
    };
    const prepareList = (datas) => {
      const list2 = [];
      datas.forEach((data) => {
        let item = list2.find((_item) => Object.is(data.type, _item.type));
        if (!item) {
          item = {};
          Object.assign(item, {
            type: data.type,
            name: Object.is(data.type, "app") ? ibiz.i18n.t("control.dashboard.dashboardDesign.global") : data.appName,
            children: []
          });
          list2.push(item);
        }
        prepareListChildren(item.children, data);
      });
      return list2;
    };
    const prepareGroup = (datas) => {
      const items = [];
      datas.forEach((data) => {
        const item = items.find((_item) => Object.is(_item.value, data.groupCodeName));
        if (item) {
          const _item = item.children.find((a) => Object.is(a.portletCodeName, data.portletCodeName));
          if (!_item) {
            item.children.push(data);
          }
        } else {
          items.push({
            name: data.groupName,
            value: data.groupCodeName,
            children: [data]
          });
        }
      });
      return items;
    };
    const prepareData = async () => {
      const list3 = [];
      const app = ibiz.hub.getApp(c.model.appId);
      if (c.model.customizeMode === 2) {
        const dynamicPortlets = await c.loadAllDynaPortlet();
        dynamicPortlets == null ? void 0 : dynamicPortlets.forEach((portlet) => {
          const temp = {
            type: "app",
            dynamodelFlag: 1,
            portletId: portlet.psappportletid,
            portletCodeName: portlet.codename,
            portletName: portlet.psappportletname,
            groupCodeName: portlet.groupcodename || "Ungroup",
            groupName: portlet.groupname || ibiz.i18n.t("control.dashboard.dashboardDesign.unGroup"),
            appCodeName: app.model.pkgcodeName,
            appName: app.model.name
          };
          list3.push(temp);
        });
      } else if (app.model.appPortletCats && app.model.appPortlets) {
        const isDEView = customC.model.appDataEntityId;
        const categoryTag = props.dashboard.controlParams.categorytag;
        const portletNameTag = props.dashboard.controlParams.portletnametag;
        app.model.appPortlets.forEach((portlet) => {
          var _a, _b, _c;
          if (!isDEView && !portlet.enableAppDashboard) {
            return;
          }
          if (isDEView && !portlet.enableDEDashboard) {
            return;
          }
          const constrol = portlet.control;
          if (constrol && ((_a = constrol.titleLanguageRes) == null ? void 0 : _a.lanResTag)) {
            portlet.name = ibiz.i18n.t(constrol.titleLanguageRes.lanResTag, portlet.name);
          }
          const portletCat = (_b = app.model.appPortletCats) == null ? void 0 : _b.find((cat) => {
            var _a2;
            return cat.codeName === ((_a2 = portlet.appPortletCat) == null ? void 0 : _a2.codeName);
          });
          if (categoryTag) {
            const categoryRegex = new RegExp(categoryTag);
            if (!portletCat || portletCat && portletCat.codeName && !categoryRegex.test(portletCat.codeName)) {
              return;
            }
          }
          if (portletNameTag) {
            const portletNameRegex = new RegExp(portletNameTag);
            if (portlet.codeName && !portletNameRegex.test(portlet.codeName)) {
              return;
            }
          }
          let groupName = (portletCat == null ? void 0 : portletCat.name) || "";
          if (portletCat == null ? void 0 : portletCat.ungroup) {
            groupName = ibiz.i18n.t("control.dashboard.dashboardDesign.unGroup");
          }
          if ((_c = portletCat == null ? void 0 : portletCat.nameLanguageRes) == null ? void 0 : _c.lanResTag) {
            groupName = ibiz.i18n.t(portletCat.nameLanguageRes.lanResTag, groupName);
          }
          const temp = {
            type: "app",
            portletCodeName: portlet.codeName,
            portletName: portlet.name,
            portletImage: portlet.control.sysImage,
            groupCodeName: (portletCat == null ? void 0 : portletCat.codeName) || "",
            groupName,
            appCodeName: portlet.appDataEntityId || app.model.pkgcodeName,
            appName: app.model.name
          };
          list3.push(temp);
        });
      }
      const datas = filterData(list3);
      portlets.value = datas;
      list.value = prepareList(datas).reverse();
      groups.value = prepareGroup(datas);
    };
    const defaultOpens = vue.computed(() => {
      let tempOpens = [];
      if (filterVal.value) {
        tempOpens = [filterVal.value];
      } else {
        groups.value.forEach((item, index) => {
          tempOpens.push(item.value + index);
        });
      }
      return tempOpens;
    });
    const initPortlets = async (portletModels) => {
      if (!(portletModels == null ? void 0 : portletModels.length)) {
        return;
      }
      await Promise.all(portletModels.map(async (portlet) => {
        var _a;
        const provider = await runtime.getPortletProvider(portlet);
        if (provider) {
          providers.value[portlet.id] = provider;
          if ((_a = portlet.titleLanguageRes) == null ? void 0 : _a.lanResTag) {
            portlet.title = ibiz.i18n.t(portlet.titleLanguageRes.lanResTag, portlet.title);
          }
          const controller = await provider.createController(portlet, props.dashboard);
          portletControllers.value[portlet.id] = controller;
        }
      }));
    };
    const initPortletsConfig = async () => {
      const config = layoutConfig.value || {};
      Object.keys(config).forEach((key) => {
        const portlet = portletControllers.value[key];
        if (portlet) {
          portlet.config = config[key];
          portlet.state.title = portlet.config.srftitle;
          Object.assign(portlet.params, portlet.config);
        }
      });
    };
    const getPortletModelByCodeName = (tag) => {
      const app = ibiz.hub.getApp(c.model.appId);
      if (app.model.appPortlets) {
        const appPortlet = app.model.appPortlets.find((portlet) => {
          var _a;
          return ((_a = portlet.control) == null ? void 0 : _a.codeName) === tag;
        });
        if (appPortlet) {
          return appPortlet.control;
        }
      }
    };
    const getPortletModel = async (data) => {
      if (data.dynamodelFlag) {
        if (data.portletModel) {
          return data.portletModel;
        }
        const dynaPortlet = await c.loadDynaPortletById(data.portletId);
        return dynaPortlet;
      }
      return getPortletModelByCodeName(data.portletCodeName);
    };
    const convertData = async (models) => {
      const tempModelDatas = [];
      if (models.length > 0) {
        for (let i = 0; i < models.length; i++) {
          const temModelData = await getPortletModel(models[i]);
          if (temModelData) {
            tempModelDatas.push(temModelData);
          }
        }
      }
      return tempModelDatas;
    };
    const preparePortlet = async (data) => {
      const tempModelDatas = await convertData(data);
      await initPortlets(tempModelDatas);
      await initPortletsConfig();
      return tempModelDatas;
    };
    vue.watch(() => props.isShowDesign, async (newVal) => {
      if (newVal) {
        try {
          isLoading.value = true;
          await prepareData();
          const res = await customC.loadCustomModelData();
          let model = ramda.clone(res.model);
          if (!model.length) {
            model = dashboardDesign_util.loadDefaultLayoutModel(c, customC);
          }
          const tempModelDatas = await preparePortlet(model);
          layoutModel.value = model;
          layoutModel.value.forEach((item, index) => {
            if (item.dynamodelFlag) {
              item.portletModel = tempModelDatas[index];
            }
          });
          layoutConfig.value = ramda.clone(res.config);
        } catch (error) {
          ibiz.log.error(error);
        } finally {
          isLoading.value = false;
        }
      }
    }, {
      immediate: true
    });
    const isDisabled = (child) => {
      const model = layoutModel.value.find((item) => item.i === child.portletCodeName);
      return !!model;
    };
    const onReset = async () => {
      const res = await customC.resetCustomModelData();
      layoutModel.value = res.model;
      layoutConfig.value = res.config;
      emit("reset");
    };
    const onSave = async () => {
      const res = await customC.saveCustomModelData(layoutModel.value);
      emit("saved", {
        model: res.model,
        config: res.config
      });
    };
    const removeItem = async (child) => {
      const index = layoutModel.value.indexOf(child);
      if (index !== -1) {
        layoutModel.value.splice(index, 1);
        const temModelData = await getPortletModel(child);
        if (temModelData) {
          const controller = portletControllers.value[temModelData.id];
          await controller.destroyed();
        }
      }
    };
    const lastScrollHeight = vue.ref(0);
    const addLayoutItem = async (child) => {
      const tempModelDatas = await preparePortlet([child]);
      const element = designPanel.value;
      if (element) {
        lastScrollHeight.value = element.scrollHeight + 3 * customC.layoutRowH;
      }
      let maxY = 0;
      for (const obj of layoutModel.value) {
        if (obj.y > maxY) {
          maxY = obj.y;
        }
      }
      const tempItemModel = {
        w: 4,
        h: 3,
        x: 0,
        y: maxY + 3,
        i: child.portletCodeName,
        ...child
      };
      if (child.dynamodelFlag) {
        const orignData = c.dynaPortletMap.get(child.portletId);
        if (orignData) {
          Object.assign(tempItemModel, {
            controlmodeldigest: orignData.controlmodeldigest
          });
        }
        Object.assign(tempItemModel, {
          portletModel: tempModelDatas[0]
        });
      }
      layoutModel.value.push(tempItemModel);
      if (element) {
        const intervalId = setInterval(() => {
          if (element.scrollHeight >= lastScrollHeight.value) {
            element.scrollTo({
              top: element.scrollHeight,
              behavior: "smooth"
            });
            clearInterval(intervalId);
          }
        }, 50);
      }
    };
    const handleColNumberChange = (colNumber) => {
      customC.layoutColNum = colNumber;
    };
    const handleRolHChange = (rowH) => {
      customC.layoutRowH = rowH;
    };
    const maskSize = vue.computed(() => {
      return "calc((100% - 10px) / ".concat(customC.layoutColNum, ") ").concat(customC.layoutRowH + 10, "px");
    });
    vue.onUnmounted(async () => {
      const controllers = Object.values(portletControllers.value);
      await Promise.all(controllers.map(async (portlet) => {
        await portlet.destroyed();
      }));
    });
    return {
      ns,
      customC,
      portlets,
      list,
      groups,
      filterVal,
      defaultOpens,
      layoutModel,
      isLoading,
      onReset,
      onSave,
      removeItem,
      addLayoutItem,
      handleColNumberChange,
      handleRolHChange,
      isDisabled,
      providers,
      portletControllers,
      maskSize,
      designPanel,
      getPortletModelByCodeName
    };
  },
  render() {
    let _slot3, _slot4, _slot5, _slot6;
    const renderElMenuItem = (child) => {
      return vue.createVNode(vue.resolveComponent("el-menu-item"), {
        "key": child.portletCodeName,
        "index": child.portletCodeName,
        "tag": child.portletCodeName,
        "disabled": this.isDisabled(child)
      }, {
        default: () => [vue.createVNode("span", null, [vue.createVNode("ion-icon", {
          "icon": child.portletImage
        }, null), child.portletName]), vue.createVNode("ion-icon", {
          "title": core.showTitle(ibiz.i18n.t("control.dashboard.dashboardDesign.add")),
          "name": "arrow-forward-outline",
          "onClick": () => this.addLayoutItem(child)
        }, null)]
      });
    };
    const renderTree = () => {
      let _slot, _slot2;
      return this.filterVal ? vue.createVNode(vue.resolveComponent("el-menu"), {
        "default-openeds": this.defaultOpens,
        "class": this.ns.is("filter", true),
        "key": this.filterVal
      }, _isSlot(_slot = this.groups.map((group) => {
        if (group.value === this.filterVal) {
          return vue.createVNode(vue.resolveComponent("el-sub-menu"), {
            "key": group.value,
            "index": group.value
          }, {
            title: () => {
              return group.name;
            },
            default: () => {
              return group.children.map((child) => {
                return renderElMenuItem(child);
              });
            }
          });
        }
        return null;
      })) ? _slot : {
        default: () => [_slot]
      }) : vue.createVNode(vue.resolveComponent("el-menu"), {
        "class": this.ns.is("no-filter", true),
        "default-openeds": this.defaultOpens,
        "key": "default"
      }, _isSlot(_slot2 = this.groups.map((group, index) => {
        return vue.createVNode(vue.resolveComponent("el-sub-menu"), {
          "key": group.value + index,
          "index": group.value + index
        }, {
          title: () => {
            return group.name;
          },
          default: () => {
            return group.children.map((child) => {
              return renderElMenuItem(child);
            });
          }
        });
      })) ? _slot2 : {
        default: () => [_slot2]
      });
    };
    const renderPortlet = (item) => {
      const portletModel = item.dynamodelFlag ? item.portletModel : this.getPortletModelByCodeName(item.portletCodeName);
      if (!portletModel) {
        return null;
      }
      const provider = this.providers[portletModel.id];
      const controller = this.portletControllers[portletModel.id];
      const commonProps = {
        modelData: portletModel,
        controller
      };
      if (!provider || !controller) {
        return vue.createVNode("div", null, [portletModel.portletType, ibiz.i18n.t("app.noSupport")]);
      }
      const providerComp = vue.resolveComponent(provider.component);
      return vue.h(providerComp, {
        ...commonProps,
        key: portletModel.id
      });
    };
    return vue.createVNode("div", {
      "class": this.ns.b()
    }, [vue.createVNode("div", {
      "class": this.ns.b("header")
    }, [vue.createVNode("span", null, [ibiz.i18n.t("control.dashboard.dashboardDesign.customPortal")]), vue.createVNode("span", {
      "class": this.ns.b("header-utils")
    }, [vue.createVNode("div", {
      "class": this.ns.be("header-utils", "col-num")
    }, [ibiz.i18n.t("control.dashboard.dashboardDesign.colNum"), vue.createTextVNode("\uFF1A"), vue.createVNode(vue.resolveComponent("el-input-number"), {
      "modelValue": this.customC.layoutColNum,
      "onUpdate:modelValue": ($event) => this.customC.layoutColNum = $event,
      "onChange": this.handleColNumberChange
    }, null)]), vue.createVNode("div", {
      "class": this.ns.be("header-utils", "row-h")
    }, [ibiz.i18n.t("control.dashboard.dashboardDesign.cellHeight"), vue.createTextVNode("\uFF1A"), vue.createVNode(vue.resolveComponent("el-input-number"), {
      "modelValue": this.customC.layoutRowH,
      "onUpdate:modelValue": ($event) => this.customC.layoutRowH = $event,
      "onChange": this.handleRolHChange
    }, null)]), vue.createVNode(vue.resolveComponent("el-button"), {
      "class": this.ns.be("header-utils", "reset"),
      "style": {
        display: this.customC.multiMode ? "none" : "inline-flex"
      },
      "onClick": this.onReset
    }, _isSlot(_slot3 = ibiz.i18n.t("control.dashboard.dashboardDesign.restoreDefault")) ? _slot3 : {
      default: () => [_slot3]
    }), vue.createVNode(vue.resolveComponent("el-button"), {
      "class": this.ns.be("header-utils", "save"),
      "onClick": this.onSave
    }, _isSlot(_slot4 = ibiz.i18n.t("control.dashboard.dashboardDesign.save")) ? _slot4 : {
      default: () => [_slot4]
    })])]), vue.createVNode("div", {
      "class": this.ns.b("content")
    }, [vue.createVNode("div", {
      "class": this.ns.b("tree")
    }, [vue.createVNode(vue.resolveComponent("el-select"), {
      "modelValue": this.filterVal,
      "onUpdate:modelValue": ($event) => this.filterVal = $event,
      "clearable": true,
      "class": this.ns.b("tree-filter")
    }, _isSlot(_slot5 = this.groups.map((group) => {
      return vue.createVNode(vue.resolveComponent("el-option"), {
        "key": group.value,
        "value": group.value,
        "label": group.name
      }, null);
    })) ? _slot5 : {
      default: () => [_slot5]
    }), vue.createVNode("div", {
      "class": this.ns.b("tree-content")
    }, [renderTree()])]), vue.withDirectives(vue.createVNode("div", {
      "ref": "designPanel",
      "class": this.ns.b("scroll-box")
    }, [vue.createVNode("div", {
      "class": this.ns.b("panel")
    }, [vue.createVNode("div", {
      "class": this.ns.b("grid-layout-mask"),
      "style": {
        backgroundSize: this.maskSize
      }
    }, null), vue.createVNode(vue.resolveComponent("grid-layout"), {
      "class": this.ns.b("grid-layout"),
      "layout": this.layoutModel,
      "col-num": this.customC.layoutColNum,
      "row-height": this.customC.layoutRowH,
      "is-draggable": true,
      "is-resizable": true,
      "is-mirrored": false,
      "vertical-compact": true,
      "margin": [10, 10],
      "use-css-transforms": true,
      "style": {
        maxHeight: "100%"
      }
    }, _isSlot(_slot6 = this.layoutModel.map((item) => {
      return vue.createVNode(vue.resolveComponent("grid-item"), {
        "x": item.x,
        "y": item.y,
        "w": item.w,
        "h": item.h,
        "i": item.i,
        "key": item.i
      }, {
        default: () => [vue.createVNode(vue.resolveComponent("el-card"), {
          "class": this.ns.b("grid-layout-item")
        }, {
          default: () => [vue.createVNode("ion-icon", {
            "name": "close-outline",
            "title": ibiz.i18n.t("app.delete"),
            "onClick": () => this.removeItem(item),
            "class": this.ns.b("grid-layout-item-icon")
          }, null), vue.createVNode("div", {
            "class": this.ns.b("grid-layout-item-content")
          }, [renderPortlet(item)])]
        })]
      });
    })) ? _slot6 : {
      default: () => [_slot6]
    })])]), [[vue.resolveDirective("loading"), this.isLoading]])])]);
  }
});

exports.DashboardDesign = DashboardDesign;
