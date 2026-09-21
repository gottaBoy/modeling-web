import { defineComponent, ref, computed, createVNode, resolveComponent } from 'vue';
import { useControlController, useNamespace } from '@ibiz-template/vue3-util';
import './map.css';
import { MapController } from '@ibiz-template/runtime';

"use strict";
const MapControl = /* @__PURE__ */ defineComponent({
  name: "IBizMapControl",
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
    },
    provider: {
      type: Object
    },
    mdctrlActiveMode: {
      type: Number,
      default: void 0
    },
    isSimple: {
      type: Boolean,
      required: false
    },
    loadDefault: {
      type: Boolean,
      default: true
    }
  },
  setup() {
    const c = useControlController((...args) => new MapController(...args));
    const ns = useNamespace("control-".concat(c.model.controlType.toLowerCase()));
    const mapRef = ref();
    const mapStyle = c.model.mapStyle;
    const mapOpts = computed(() => {
      return {
        strAreaCode: c.state.strAreaCode,
        defaultAreaCode: c.state.defaultAreaCode,
        jsonBaseUrl: c.state.jsonBaseUrl
      };
    });
    return {
      c,
      ns,
      mapRef,
      mapOpts,
      mapStyle
    };
  },
  render() {
    const {
      state
    } = this.c;
    if (!state.isLoaded) {
      return;
    }
    return createVNode(resolveComponent("iBizControlBase"), {
      "controller": this.c
    }, {
      default: () => [this.mapStyle === "USER" ? createVNode(resolveComponent("iBizMapChartUser"), {
        "areaData": state.areaData,
        "pointData": state.pointData,
        "options": this.mapOpts,
        "class": this.ns.e("map"),
        "controller": this.c
      }, null) : createVNode(resolveComponent("iBizMapChart"), {
        "areaData": state.areaData,
        "pointData": state.pointData,
        "options": this.mapOpts,
        "class": this.ns.e("map"),
        "onMapChange": (e) => {
          this.c.onMapChange(e.areaCode);
        },
        "onPointChange": (e) => {
          this.c.onAreaClick(e);
        },
        "onAreaChange": (e) => {
          this.c.onPointClick(e);
        }
      }, null)]
    });
  }
});

export { MapControl as default };
