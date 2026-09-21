import { createVNode, resolveComponent, h } from 'vue';
import { debounce } from 'lodash-es';
import { useRoute } from 'vue-router';
import { useNamespace, onRouteChange, route2routePath } from '@ibiz-template/vue3-util';
import './render-util.css';

"use strict";
function useExpBarRender(c, ns) {
  const expBarNs = useNamespace("exp-bar");
  const debounceSearch = debounce(() => {
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
    return createVNode("div", {
      "class": [ns.b("caption"), expBarNs.b("caption")]
    }, [model.sysImage && createVNode(resolveComponent("iBizIcon"), {
      "class": [expBarNs.be("caption", "icon")],
      "icon": model.sysImage
    }, null), title && createVNode("span", {
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
      const comp = resolveComponent("IBizControlShell");
      return h(comp, {
        modelData,
        ...ctrlProps
      });
    }
    return createVNode(resolveComponent("el-input"), {
      "model-value": c.state.query,
      "class": [ns.b("quick-search"), expBarNs.b("quick-search")],
      "placeholder": c.state.placeHolder,
      "onInput": onInput
    }, {
      prefix: () => {
        return createVNode("ion-icon", {
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
    const route = useRoute();
    let selfKey;
    onRouteChange(({
      currentKey,
      fullPath
    }) => {
      if (!selfKey) {
        selfKey = currentKey;
      } else if (selfKey === currentKey) {
        const routePath = route2routePath(route);
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

export { useExpBarRender, useWatchRouteChange };
