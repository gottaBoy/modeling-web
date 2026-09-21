import { defineComponent, inject } from 'vue';

"use strict";
const ControlLoadingPlaceholder = /* @__PURE__ */ defineComponent({
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
    const ctx = inject("ctx");
    ctx.evt.emit("onForecast", props.modelData.name);
    return {};
  },
  render() {
    return null;
  }
});

export { ControlLoadingPlaceholder };
