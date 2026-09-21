import { defineComponent, createVNode, resolveComponent, mergeProps, withDirectives, resolveDirective, ref, computed } from 'vue';
import { useControlController, useNamespace, useSemanticNode } from '@ibiz-template/vue3-util';
import { MapController } from '@ibiz-template/runtime';
import './map.css';

"use strict";
const MapControl = /* @__PURE__ */ defineComponent({
  name: "IBizMapControl",
  props: {
    /**
     * @description 地图模型数据
     */
    modelData: {
      type: Object,
      required: true
    },
    /**
     * @description 应用上下文对象
     */
    context: {
      type: Object,
      required: true
    },
    /**
     * @description 视图参数对象
     * @default {}
     */
    params: {
      type: Object,
      default: () => ({})
    },
    /**
     * @description 部件适配器
     */
    provider: {
      type: Object
    },
    /**
     * @description 部件行数据默认激活模式，值为0:不激活，值为1：单击激活，值为2：双击激活
     */
    mdctrlActiveMode: {
      type: Number,
      default: void 0
    },
    /**
     * @description 是否是简单模式，即直接传入数据，不加载数据
     */
    isSimple: {
      type: Boolean,
      required: false
    },
    /**
     * @description 是否默认加载数据
     * @default true
     */
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
    const {
      semanticClass,
      semanticStyle
    } = useSemanticNode(c);
    const childClass = [{
      class: semanticClass("editor.content"),
      selector: ".ibiz-control-map__map"
    }, {
      class: semanticClass("editor.goback"),
      selector: ".ibiz-map-chart-user__goback"
    }, {
      class: semanticClass("editor.goback"),
      selector: ".ibiz-map-chart__goback"
    }, {
      class: semanticClass("editor.fullscreen"),
      selector: ".ibiz-map-chart-user__fullscreen"
    }];
    const childStyle = [{
      style: semanticStyle("editor.content"),
      selector: ".ibiz-control-map__map"
    }, {
      style: semanticStyle("editor.goback"),
      selector: ".ibiz-map-chart-user__goback"
    }, {
      style: semanticStyle("editor.goback"),
      selector: ".ibiz-map-chart__goback"
    }, {
      style: semanticStyle("editor.fullscreen"),
      selector: ".ibiz-map-chart-user__fullscreen"
    }];
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
      mapStyle,
      childClass,
      childStyle,
      semanticClass,
      semanticStyle
    };
  },
  render() {
    const {
      state
    } = this.c;
    if (!state.isCreated)
      return;
    let content;
    if (state.isLoaded) {
      content = this.mapStyle === "USER" ? createVNode(resolveComponent("iBizMapChartUser"), mergeProps(this.$attrs, {
        "controller": this.c,
        "options": this.mapOpts,
        "areaData": state.areaData,
        "pointData": state.pointData,
        "class": this.ns.e("map")
      }), null) : createVNode(resolveComponent("iBizMapChart"), mergeProps(this.$attrs, {
        "controller": this.c,
        "options": this.mapOpts,
        "areaData": state.areaData,
        "pointData": state.pointData,
        "class": this.ns.e("map"),
        "onPointClick": (e) => {
          this.c.onPointClick(e);
        },
        "onAreaClick": (e) => {
          this.c.onAreaClick(e, "", "");
        }
      }), null);
    }
    return createVNode(resolveComponent("iBizControlNavigation"), {
      "controller": this.c
    }, {
      default: () => [withDirectives(createVNode(resolveComponent("iBizControlBase"), {
        "controller": this.c,
        "class": this.semanticClass("root"),
        "style": this.semanticStyle("root")
      }, {
        default: () => [content, this.c.state.enableNavView && this.c.state.showNavIcon ? !this.c.state.showNavView ? createVNode("ion-icon", {
          "class": this.ns.e("nav-icon"),
          "title": ibiz.i18n.t("component.controlNavigation.showNav"),
          "name": "eye-outline",
          "onClick": () => this.c.onShowNavViewChange()
        }, null) : createVNode("ion-icon", {
          "class": this.ns.e("nav-icon"),
          "title": ibiz.i18n.t("component.controlNavigation.hiddenNav"),
          "name": "eye-off-outline",
          "onClick": () => this.c.onShowNavViewChange()
        }, null) : null]
      }), [[resolveDirective("child-class"), this.childClass], [resolveDirective("child-style"), this.childStyle]])]
    });
  }
});

export { MapControl as default };
