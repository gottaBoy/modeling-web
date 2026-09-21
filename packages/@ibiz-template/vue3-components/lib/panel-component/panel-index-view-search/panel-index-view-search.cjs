'use strict';

var vue = require('vue');
var vue3Util = require('@ibiz-template/vue3-util');
var runtime = require('@ibiz-template/runtime');
var lodashEs = require('lodash-es');
require('./panel-index-view-search.css');

"use strict";
const PanelIndexViewSearch = /* @__PURE__ */ vue.defineComponent({
  name: "IBizPanelIndexViewSearch",
  props: {
    modelData: {
      type: Object,
      required: true
    },
    controller: {
      type: runtime.PanelItemController,
      required: true
    }
  },
  setup(props) {
    const ns = vue3Util.useNamespace("panel-index-view-search");
    const c = props.controller;
    const query = vue.ref("");
    const debounceSearch = lodashEs.debounce(() => {
    }, 500);
    const onInput = (value) => {
      query.value = value;
      debounceSearch();
    };
    const ctx = vue.inject("ctx", void 0);
    const menuAlign = vue.computed(() => {
      if (ctx == null ? void 0 : ctx.view) {
        return ctx.view.model.mainMenuAlign || "LEFT";
      }
      return "LEFT";
    });
    const isCollapse = vue.computed(() => {
      return c.panel.view.state.isCollapse;
    });
    const classArr = vue.computed(() => {
      const {
        id
      } = props.modelData;
      const result = [ns.b(), ns.m(id), ns.is("collapse", isCollapse.value)];
      result.push(...props.controller.containerClass);
      return result;
    });
    const onSearch = async () => {
      const id = props.modelData.id;
      const menuC = c.panel.view.getController("appmenu");
      if (menuC) {
        const targetMenu = menuC.allAppMenuItems.find((item) => {
          return item.id === id;
        });
        if (targetMenu) {
          const tempContext = c.panel.context.clone();
          const tempParam = c.panel.params;
          tempContext.srfappid = targetMenu.appId || ibiz.env.appId;
          await ibiz.commands.execute(runtime.AppFuncCommand.TAG, targetMenu.appFuncId, tempContext, {
            ...tempParam,
            srfquery: query.value
          }, {});
        }
      }
    };
    const onEnter = (event) => {
      if (event.key === "Enter") {
        onSearch();
      }
    };
    return {
      ns,
      classArr,
      isCollapse,
      onInput,
      onSearch,
      c,
      query,
      menuAlign,
      onEnter
    };
  },
  render() {
    if (!this.controller.state.visible) {
      return;
    }
    return vue.createVNode("div", {
      "class": this.classArr
    }, [this.menuAlign === "LEFT" && !this.isCollapse && vue.createVNode(vue.resolveComponent("el-input"), {
      "model-value": this.query,
      "class": this.ns.b("search"),
      "placeholder": ibiz.i18n.t("component.indexSearch.placeholder"),
      "onInput": this.onInput,
      "onKeyup": this.onEnter
    }, {
      prefix: () => {
        return vue.createVNode("ion-icon", {
          "class": this.ns.e("search-icon"),
          "name": "search"
        }, null);
      }
    })]);
  }
});

exports.PanelIndexViewSearch = PanelIndexViewSearch;
