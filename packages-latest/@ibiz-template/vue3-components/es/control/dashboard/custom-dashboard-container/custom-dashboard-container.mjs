import { defineComponent, withDirectives, createVNode, resolveComponent, resolveDirective, reactive, ref, nextTick, onMounted } from 'vue';
import { CustomDashboardController } from '@ibiz-template/runtime';
import { useNamespace, useSemanticNode } from '@ibiz-template/vue3-util';
import './custom-dashboard-container.css';
import { showTitle } from '@ibiz-template/core';

"use strict";
const CustomDashboardContainer = /* @__PURE__ */ defineComponent({
  name: "IBizCustomDashboardContainer",
  props: {
    modelData: {
      type: Object,
      required: true
    },
    dashboard: {
      type: Object,
      required: true
    }
  },
  setup(props, {
    emit
  }) {
    const ns = useNamespace("custom-dashboard-container");
    const {
      semanticClass,
      semanticStyle
    } = useSemanticNode(props.dashboard);
    const customDashboard = new CustomDashboardController(props.modelData, props.dashboard);
    props.dashboard.setCustomDashboard(customDashboard);
    const customC = reactive(customDashboard);
    const isInited = ref(false);
    const isShowDesign = ref(false);
    const showTypeDir = ref(false);
    const showFilter = ref(false);
    const openDesign = () => {
      isShowDesign.value = true;
    };
    const clickCollapse = (type) => {
      showTypeDir.value = type === "left";
    };
    const getPortletModelByCodeName = (codeName) => {
      const app = ibiz.hub.getApp(props.dashboard.model.appId);
      if (app.model.appPortlets) {
        const appPortlet = app.model.appPortlets.find((portlet) => {
          var _a;
          return ((_a = portlet.control) == null ? void 0 : _a.codeName) === codeName;
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
        const dynaPortlet = await props.dashboard.loadDynaPortletById(data.portletId);
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
    const handleCustomModelChange = async (args) => {
      var _a, _b;
      const filterModels = (_a = props.dashboard.model.controls) == null ? void 0 : _a.filter((element) => {
        return element.portletType === "FILTER";
      });
      const noFilterModels = (_b = props.dashboard.model.controls) == null ? void 0 : _b.filter((element) => {
        return element.portletType !== "FILTER";
      });
      if (args.model && args.model.length > 0) {
        await props.dashboard.initPortlets(args.model);
      } else if (filterModels && filterModels.length > 0) {
        await props.dashboard.initPortlets(filterModels);
        await props.dashboard.initPortlets(noFilterModels || []);
      }
      await props.dashboard.initPortletsConfig(args.config);
    };
    const onSaved = async (args) => {
      isShowDesign.value = false;
      const tempModelDatas = await convertData(args.model);
      await handleCustomModelChange({
        model: tempModelDatas,
        config: args.config
      });
      emit("changed", {
        model: tempModelDatas
      });
    };
    const openFilterDesign = () => {
      props.dashboard.openFilterDesignPage();
    };
    const onReset = async () => {
      isInited.value = false;
      isShowDesign.value = false;
      await props.dashboard.resetPortlets();
      await nextTick();
      isInited.value = true;
    };
    onMounted(async () => {
      var _a;
      showFilter.value = ((_a = props.dashboard.model) == null ? void 0 : _a.dashboardStyle) === "BIREPORTDASHBOARD";
      const response = await customC.loadCustomModelData();
      const tempModelDatas = await convertData(response.model);
      emit("changed", {
        model: tempModelDatas
      });
      await handleCustomModelChange({
        model: tempModelDatas,
        config: response.config
      });
      isInited.value = true;
      props.dashboard.evt.on("onConfigChange", async (eventArgs) => {
        const {
          name,
          config
        } = eventArgs;
        customC.saveCustomModelData(customC.customModelData, {
          [name]: config
        });
      });
      props.dashboard.evt.on("onSavePortlet", async (args) => {
        const modelDatas = await convertData(args.model);
        await handleCustomModelChange({
          model: modelDatas,
          config: args.config
        });
        props.dashboard.refresh();
        emit("changed", {
          model: modelDatas
        });
      });
    });
    return {
      ns,
      customC,
      isShowDesign,
      isInited,
      showTypeDir,
      showFilter,
      openDesign,
      onSaved,
      onReset,
      clickCollapse,
      openFilterDesign,
      semanticClass,
      semanticStyle
    };
  },
  render() {
    var _a, _b;
    return withDirectives(createVNode("div", {
      "class": [this.ns.b()]
    }, [this.customC.showDesignBtn ? createVNode("div", {
      "class": [this.ns.b("build-btn"), this.semanticClass("design")],
      "style": this.semanticStyle("custom")
    }, [this.showTypeDir ? createVNode("div", null, [this.showFilter ? createVNode(resolveComponent("el-button"), {
      "class": this.ns.b("deisgn-btn"),
      "title": ibiz.i18n.t("control.dashboard.customDashboardContainer.newFilter"),
      "onClick": this.openFilterDesign
    }, {
      default: () => [createVNode("ion-icon", {
        "name": "filter-outline"
      }, null)]
    }) : null, createVNode(resolveComponent("el-button"), {
      "class": this.ns.b("deisgn-btn"),
      "title": showTitle(ibiz.i18n.t("control.dashboard.customDashboardContainer.portalCustomPrompt")),
      "onClick": this.openDesign
    }, {
      default: () => [createVNode("ion-icon", {
        "name": "build-outline"
      }, null)]
    }), createVNode(resolveComponent("el-button"), {
      "class": this.ns.b("forward-btn"),
      "onClick": () => this.clickCollapse("right")
    }, {
      default: () => [createVNode("ion-icon", {
        "name": "chevron-forward-outline"
      }, null)]
    })]) : createVNode(resolveComponent("el-button"), {
      "class": this.ns.b("back-btn"),
      "onClick": () => this.clickCollapse("left")
    }, {
      default: () => [createVNode("ion-icon", {
        "name": "chevron-back-outline"
      }, null)]
    })]) : null, createVNode(resolveComponent("el-drawer"), {
      "modelValue": this.isShowDesign,
      "onUpdate:modelValue": ($event) => this.isShowDesign = $event,
      "with-header": false,
      "size": "80%",
      "modal-class": "custom-dashboard-drawer"
    }, {
      default: () => [this.isShowDesign && createVNode(resolveComponent("iBizDashboardDesign"), {
        "dashboard": this.dashboard,
        "custom-dashboard": this.customC,
        "is-show-design": this.isShowDesign,
        "onSaved": this.onSaved,
        "onReset": this.onReset
      }, null)]
    }), this.isInited && (this.customC.customModelData.length === 0 ? (_b = (_a = this.$slots).default) == null ? void 0 : _b.call(_a) : this.customC.customModelData.map((item) => {
      var _a2, _b2;
      const itemStyle = {
        position: "absolute",
        height: "".concat(item.h * this.customC.layoutRowH, "px"),
        width: "calc(100% / ".concat(this.customC.layoutColNum, " * ").concat(item.w, ")"),
        top: "".concat(item.y * this.customC.layoutRowH, "px"),
        left: "calc(100% / ".concat(this.customC.layoutColNum, " * ").concat(item.x, ")")
      };
      return createVNode("div", {
        "style": itemStyle
      }, [(_b2 = (_a2 = this.$slots)[item.portletCodeName]) == null ? void 0 : _b2.call(_a2)]);
    }))]), [[resolveDirective("loading"), !this.isInited]]);
  }
});

export { CustomDashboardContainer };
