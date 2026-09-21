'use strict';

var vue = require('vue');
var ramda = require('ramda');

"use strict";
const IBizRouterView = /* @__PURE__ */ vue.defineComponent({
  name: "IBizRouterView",
  inheritAttrs: false,
  props: {
    name: {
      type: String,
      default: "default"
    },
    route: Object,
    manualKey: {
      type: String
    }
  },
  setup(props, {
    attrs
  }) {
    const cache = {};
    let isActive = true;
    vue.watch(() => props.manualKey, (newVal, oldVal) => {
      if (ramda.isNotNil(newVal) && newVal !== oldVal) {
        isActive = true;
      }
    });
    const renderComp = (Component, _route) => {
      if (!isActive) {
        return cache.vNode;
      }
      isActive = false;
      if (Component) {
        const tempProps = {
          ...Component.props
        };
        delete tempProps.onVnodeUnmounted;
        delete tempProps.ref;
        const hNode = vue.h(Component.type, {
          ...tempProps,
          ...attrs,
          key: props.manualKey
        });
        cache.vNode = hNode;
        return hNode;
      }
      return void 0;
    };
    return {
      renderComp
    };
  },
  render() {
    return vue.createVNode(vue.resolveComponent("router-view"), {
      "name": this.name,
      "route": this.route
    }, {
      default: ({
        Component,
        route
      }) => {
        const newComp = this.renderComp(Component, route);
        if (this.$slots.default) {
          return this.$slots.default({
            Component: newComp,
            route
          });
        }
        return newComp;
      }
    });
  }
});

exports.IBizRouterView = IBizRouterView;
