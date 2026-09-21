'use strict';

var vue = require('vue');
require('../../use/index.cjs');
require('./teleport-placeholder.css');
var namespace = require('../../use/namespace/namespace.cjs');

"use strict";
const TeleportPlaceholder = /* @__PURE__ */ vue.defineComponent({
  name: "IBizTeleportPlaceholder",
  props: {
    modelData: {
      type: Object,
      required: true
    },
    controller: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const ns = namespace.useNamespace("teleport-placeholder");
    const tempStyle = vue.ref("");
    const {
      rawItem
    } = props.modelData;
    if (rawItem && rawItem.cssStyle) {
      tempStyle.value = rawItem.cssStyle;
    }
    const classArr = vue.computed(() => {
      const {
        id
      } = props.modelData;
      const result = [ns.b(), ns.m(id)];
      result.push(...props.controller.containerClass);
      return result;
    });
    return {
      ns,
      classArr,
      tempStyle
    };
  },
  render() {
    if (!this.controller.state.visible) {
      return;
    }
    return vue.createVNode("div", {
      "id": this.controller.state.teleportTag,
      "class": this.classArr,
      "style": this.tempStyle
    }, null);
  }
});

exports.TeleportPlaceholder = TeleportPlaceholder;
