import { defineComponent, createVNode, resolveComponent, inject, computed } from 'vue';
import { useNamespace, useSemanticNode, route2routePath, routePath2string } from '@ibiz-template/vue3-util';
import { useRoute, useRouter } from 'vue-router';
import { PanelAppTitleController } from './panel-app-title.controller.mjs';
import './panel-app-title.css';

"use strict";
const PanelAppTitle = /* @__PURE__ */ defineComponent({
  name: "IBizPanelAppTitle",
  props: {
    /**
     *  @description 应用标题模型数据
     */
    modelData: {
      type: Object,
      required: true
    },
    /**
     * @description 应用标题控制器
     */
    controller: {
      type: PanelAppTitleController,
      required: true
    }
  },
  setup(props) {
    const ns = useNamespace("panel-app-title");
    const c = props.controller;
    const {
      semanticClass,
      semanticStyle
    } = useSemanticNode(c);
    const route = useRoute();
    const router = useRouter();
    const ctx = inject("ctx", void 0);
    const menuAlign = computed(() => {
      if (ctx == null ? void 0 : ctx.view) {
        return ctx.view.model.mainMenuAlign || "LEFT";
      }
      return "LEFT";
    });
    const handleClick = async (event) => {
      if (c.panel.view.model.viewType === "APPLOGINVIEW")
        return;
      if (ctx == null ? void 0 : ctx.view) {
        const routePath = route2routePath(route);
        routePath.pathNodes = routePath.pathNodes.slice(0, 1);
        const url = routePath2string(routePath);
        router.push({
          path: url
        });
        setTimeout(() => {
          window.location.reload();
        });
      }
      props.controller.onClick(event);
    };
    const showImgOnly = computed(() => {
      if (menuAlign.value === "LEFT") {
        return true;
      }
      return false;
    });
    const isCollapse = computed(() => {
      const {
        strictly
      } = c.rawItemParams;
      if (strictly && strictly === "true") {
        return false;
      }
      return c.panel.view.state.isCollapse;
    });
    const showIcon = computed(() => {
      if (c.model.itemStyle === "STYLE2") {
        return true;
      }
      return false;
    });
    return {
      ns,
      c,
      menuAlign,
      showImgOnly,
      handleClick,
      isCollapse,
      showIcon,
      semanticClass,
      semanticStyle
    };
  },
  render() {
    const {
      icon,
      icon2,
      caption,
      caption2,
      subCaption,
      subCaption2
    } = this.c.state;
    let iconVNode = null;
    let content = null;
    const captionNode = createVNode("span", {
      "class": [this.ns.e("title"), this.semanticClass("caption")],
      "style": this.semanticStyle("caption")
    }, [caption]);
    if (this.c.panel.view.model.viewType !== "APPINDEXVIEW") {
      content = captionNode;
    } else {
      if (this.menuAlign === "LEFT") {
        if (this.isCollapse) {
          const collapseIcon = icon2 || icon;
          if (collapseIcon) {
            iconVNode = createVNode("div", {
              "class": [this.ns.e("collpase-icon"), this.semanticClass("logo")],
              "style": this.semanticStyle("logo")
            }, [createVNode(resolveComponent("iBizIcon"), {
              "class": this.ns.e("logo"),
              "icon": {
                rawContent: collapseIcon
              }
            }, null)]);
          } else {
            iconVNode = createVNode("div", {
              "class": [this.ns.e("collapse-title"), this.semanticClass("caption")],
              "style": this.semanticStyle("caption")
            }, [createVNode("div", {
              "class": this.ns.e("caption2")
            }, [caption2]), createVNode("div", {
              "class": this.ns.e("subCaption2")
            }, [subCaption2])]);
          }
        } else if (this.showIcon && icon) {
          let tempContent = createVNode("g", {
            "id": "app-caption-panel",
            "stroke": "none",
            "stroke-width": "1",
            "fill-rule": "evenodd"
          }, [createVNode("text", {
            "id": "app-caption",
            "font-family": "Poppins-Bold, Poppins",
            "font-size": "22",
            "font-weight": "bold"
          }, [createVNode("tspan", {
            "x": "0",
            "y": "52"
          }, [caption])])]);
          if (subCaption) {
            tempContent = createVNode("g", {
              "id": "app-caption-panel",
              "stroke": "none",
              "stroke-width": "1",
              "fill-rule": "evenodd"
            }, [createVNode("text", {
              "id": "app-caption",
              "font-family": "Poppins-Bold, Poppins",
              "font-size": "22",
              "font-weight": "bold"
            }, [createVNode("tspan", {
              "x": "8",
              "y": "39"
            }, [caption])]), createVNode("text", {
              "id": "app-subcaption",
              "font-family": "PingFangSC-Semibold, PingFang SC",
              "font-size": "14",
              "font-weight": "bold"
            }, [createVNode("tspan", {
              "x": "8",
              "y": "66"
            }, [subCaption])])]);
          }
          iconVNode = createVNode("span", {
            "class": [this.ns.e("logo"), this.semanticClass("logo")],
            "style": this.semanticStyle("logo")
          }, [createVNode(resolveComponent("iBizIcon"), {
            "class": this.ns.em("logo", "expand"),
            "icon": {
              rawContent: icon
            }
          }, null), createVNode("svg", {
            "width": "166px",
            "height": "80px",
            "viewBox": "0 0 166 90",
            "version": "1.1"
          }, [tempContent])]);
        } else {
          iconVNode = createVNode("span", {
            "class": [this.ns.e("logo"), this.semanticClass("logo")],
            "style": this.semanticStyle("logo")
          }, [createVNode("svg", {
            "width": "256px",
            "height": "80px",
            "viewBox": "0 0 256 80",
            "version": "1.1"
          }, [createVNode("g", {
            "id": "app-caption-panel",
            "stroke": "none",
            "stroke-width": "1",
            "fill-rule": "evenodd"
          }, [createVNode("text", {
            "id": "app-caption",
            "font-family": "Poppins-Bold, Poppins",
            "font-size": "22",
            "font-weight": "bold"
          }, [createVNode("tspan", {
            "x": "20.961",
            "y": "40"
          }, [caption])]), createVNode("text", {
            "id": "app-subcaption",
            "font-family": "PingFangSC-Semibold, PingFang SC",
            "font-size": "18",
            "font-weight": "bold"
          }, [createVNode("tspan", {
            "x": "96",
            "y": "69"
          }, [subCaption])])])])]);
        }
      } else if (this.menuAlign === "TOP") {
        if (icon) {
          iconVNode = createVNode(resolveComponent("iBizIcon"), {
            "class": [this.ns.e("logo"), this.semanticClass("logo")],
            "style": this.semanticStyle("logo"),
            "icon": {
              rawContent: icon
            }
          }, null);
        }
      }
      if (this.menuAlign === "LEFT") {
        content = iconVNode;
      } else {
        content = [iconVNode, captionNode];
      }
    }
    return createVNode("div", {
      "class": [this.ns.b(), this.ns.is("only-img", this.showImgOnly), this.ns.is("collapse", this.isCollapse), this.ns.is("only-title", this.c.panel.view.model.viewType !== "APPINDEXVIEW"), this.semanticClass("root"), ...this.controller.containerClass],
      "style": this.semanticStyle("root"),
      "onClick": this.handleClick
    }, [content]);
  }
});

export { PanelAppTitle, PanelAppTitle as default };
