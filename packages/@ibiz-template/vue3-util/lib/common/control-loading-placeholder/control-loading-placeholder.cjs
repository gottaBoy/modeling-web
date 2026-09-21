'use strict';

var vue = require('vue');

"use strict";
const ControlLoadingPlaceholder = /* @__PURE__ */ vue.defineComponent({
  name: "ControlLoadingPlaceholder",
  props: {
    modelData: {
      type: Object,
      required: true
    },
    context: {
      type: Object,
      required: true
    },
    params: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props) {
    const ctx = vue.inject("ctx");
    ctx.evt.emit("onForecast", props.modelData.name);
    return {};
  },
  render() {
    return null;
  }
});

exports.ControlLoadingPlaceholder = ControlLoadingPlaceholder;
