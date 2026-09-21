'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var vue3Util = require('@ibiz-template/vue3-util');
require('./map.css');
var runtime = require('@ibiz-template/runtime');

"use strict";
const MapControl = /* @__PURE__ */ vue.defineComponent({
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
    const c = vue3Util.useControlController((...args) => new runtime.MapController(...args));
    const ns = vue3Util.useNamespace("control-".concat(c.model.controlType.toLowerCase()));
    const mapRef = vue.ref();
    const mapStyle = c.model.mapStyle;
    const mapOpts = vue.computed(() => {
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
    return vue.createVNode(vue.resolveComponent("iBizControlBase"), {
      "controller": this.c
    }, {
      default: () => [this.mapStyle === "USER" ? vue.createVNode(vue.resolveComponent("iBizMapChartUser"), {
        "areaData": state.areaData,
        "pointData": state.pointData,
        "options": this.mapOpts,
        "class": this.ns.e("map"),
        "controller": this.c
      }, null) : vue.createVNode(vue.resolveComponent("iBizMapChart"), {
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

exports.default = MapControl;
