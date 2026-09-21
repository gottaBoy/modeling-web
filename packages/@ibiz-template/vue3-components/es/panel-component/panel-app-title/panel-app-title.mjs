import { defineComponent, inject, computed, createVNode } from 'vue';
import { useNamespace, route2routePath, routePath2string } from '@ibiz-template/vue3-util';
import { useRoute, useRouter } from 'vue-router';
import { PanelAppTitleController } from './panel-app-title.controller.mjs';
import './panel-app-title.css';

"use strict";
const PanelAppTitle = /* @__PURE__ */ defineComponent({
  name: "IBizPanelAppTitle",
  props: {
    modelData: {
      type: Object,
      required: true
    },
    controller: {
      type: PanelAppTitleController,
      required: true
    }
  },
  setup(props) {
    const ns = useNamespace("panel-app-title");
    const c = props.controller;
    const route = useRoute();
    const router = useRouter();
    const ctx = inject("ctx", void 0);
    const menuAlign = computed(() => {
      if (ctx == null ? void 0 : ctx.view) {
        return ctx.view.model.mainMenuAlign || "LEFT";
      }
      return "LEFT";
    });
    const handleClick = async () => {
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
      props.controller.onClick();
    };
    const showImgOnly = computed(() => {
      if (menuAlign.value === "LEFT") {
        return true;
      }
      return false;
    });
    const isCollapse = computed(() => {
      return c.panel.view.state.isCollapse;
    });
    return {
      ns,
      c,
      menuAlign,
      showImgOnly,
      handleClick,
      isCollapse
    };
  },
  render() {
    const {
      icon,
      isSvg,
      caption,
      caption2,
      subCaption,
      subCaption2
    } = this.c.state;
    let iconVNode = null;
    let content = null;
    const captionNode = createVNode("span", {
      "class": this.ns.e("title")
    }, [caption]);
    if (this.c.panel.view.model.viewType !== "APPINDEXVIEW") {
      content = captionNode;
    } else {
      if (this.menuAlign === "LEFT") {
        if (this.isCollapse) {
          if (icon) {
            let tempIcon = null;
            if (isSvg) {
              tempIcon = createVNode("ion-icon", {
                "class": this.ns.e("logo"),
                "icon": icon
              }, null);
            } else {
              tempIcon = createVNode("span", {
                "class": this.ns.e("logo")
              }, [createVNode("img", {
                "src": icon
              }, null)]);
            }
            iconVNode = createVNode("div", {
              "class": this.ns.e("collpase-icon")
            }, [tempIcon]);
          } else {
            iconVNode = createVNode("div", {
              "class": this.ns.e("collapse-title")
            }, [createVNode("div", {
              "class": this.ns.e("caption2")
            }, [caption2]), createVNode("div", {
              "class": this.ns.e("subCaption2")
            }, [subCaption2])]);
          }
        } else if (this.c.rawItemParams.showexpandicon === "true" && icon) {
          let tempIcon = null;
          if (isSvg) {
            tempIcon = createVNode("ion-icon", {
              "class": this.ns.em("logo", "expand"),
              "icon": icon
            }, null);
          } else {
            tempIcon = createVNode("span", {
              "class": this.ns.em("logo", "expand")
            }, [createVNode("img", {
              "src": icon
            }, null)]);
          }
          iconVNode = createVNode("span", {
            "class": this.ns.e("logo")
          }, [tempIcon, createVNode("svg", {
            "width": "166px",
            "height": "80px",
            "viewBox": "0 0 166 90",
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
          }, [subCaption])])])])]);
        } else {
          iconVNode = createVNode("span", {
            "class": this.ns.e("logo")
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
          if (isSvg) {
            iconVNode = createVNode("ion-icon", {
              "class": this.ns.e("logo"),
              "icon": icon
            }, null);
          } else {
            iconVNode = createVNode("span", {
              "class": this.ns.e("logo")
            }, [createVNode("img", {
              "src": icon
            }, null)]);
          }
        }
      }
      if (this.menuAlign === "LEFT") {
        content = iconVNode;
      } else {
        content = [iconVNode, captionNode];
      }
    }
    return createVNode("div", {
      "class": [this.ns.b(), this.ns.is("only-img", this.showImgOnly), this.ns.is("collapse", this.isCollapse), this.ns.is("only-title", this.c.panel.view.model.viewType !== "APPINDEXVIEW"), ...this.controller.containerClass],
      "onClick": this.handleClick
    }, [content]);
  }
});

export { PanelAppTitle, PanelAppTitle as default };
