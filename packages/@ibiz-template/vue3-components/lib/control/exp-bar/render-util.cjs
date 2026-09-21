'use strict';

var vue = require('vue');
var lodashEs = require('lodash-es');
var vueRouter = require('vue-router');
var vue3Util = require('@ibiz-template/vue3-util');
require('./render-util.css');

"use strict";
function useExpBarRender(c, ns) {
  const expBarNs = vue3Util.useNamespace("exp-bar");
  const debounceSearch = lodashEs.debounce(() => {
    c.load();
  }, 500);
  const onInput = (value) => {
    c.state.query = value;
    debounceSearch();
  };
  const renderTitle = () => {
    const {
      model
    } = c;
    if (!model.showTitleBar) {
      return null;
    }
    let title = model.title;
    if (model.titleLanguageRes) {
      title = ibiz.i18n.t(model.titleLanguageRes.lanResTag, model.title);
    }
    return vue.createVNode("div", {
      "class": [ns.b("caption"), expBarNs.b("caption")]
    }, [model.sysImage && vue.createVNode(vue.resolveComponent("iBizIcon"), {
      "class": [expBarNs.be("caption", "icon")],
      "icon": model.sysImage
    }, null), title && vue.createVNode("span", {
      "class": [ns.be("caption", "text")]
    }, [title])]);
  };
  const renderSearchBar = () => {
    var _a, _b;
    const {
      model
    } = c;
    if (!model.enableSearch) {
      return null;
    }
    const modelData = (_b = (_a = c.view.model.viewLayoutPanel) == null ? void 0 : _a.controls) == null ? void 0 : _b.find((item) => item.id === "searchbar");
    if (modelData) {
      const ctrlProps = {
        context: c.context,
        params: c.params
      };
      const comp = vue.resolveComponent("IBizControlShell");
      return vue.h(comp, {
        modelData,
        ...ctrlProps
      });
    }
    return vue.createVNode(vue.resolveComponent("el-input"), {
      "model-value": c.state.query,
      "class": [ns.b("quick-search"), expBarNs.b("quick-search")],
      "placeholder": c.state.placeHolder,
      "onInput": onInput
    }, {
      prefix: () => {
        return vue.createVNode("ion-icon", {
          "class": ns.e("search-icon"),
          "name": "search"
        }, null);
      }
    });
  };
  return {
    renderTitle,
    renderSearchBar
  };
}
function useWatchRouteChange(c) {
  const depth = c.view.modal.routeDepth;
  if (depth) {
    const route = vueRouter.useRoute();
    let selfKey;
    vue3Util.onRouteChange(({
      currentKey,
      fullPath
    }) => {
      if (!selfKey) {
        selfKey = currentKey;
      } else if (selfKey === currentKey) {
        const routePath = vue3Util.route2routePath(route);
        const {
          srfnav
        } = routePath.pathNodes[depth - 1];
        c.onRouterChange({
          srfnav: srfnav || "",
          path: fullPath
        });
      }
    }, depth);
  }
}

exports.useExpBarRender = useExpBarRender;
exports.useWatchRouteChange = useWatchRouteChange;
