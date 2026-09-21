import { defineComponent, createVNode, resolveComponent } from 'vue';
import { PanelItemController } from '@ibiz-template/runtime';
import { useNamespace, useSemanticNode } from '@ibiz-template/vue3-util';
import './auth-sso.css';

"use strict";
const AuthSso = /* @__PURE__ */ defineComponent({
  name: "IBizAuthSsO",
  props: {
    /**
     * @description 第三方登录控件模型数据
     */
    modelData: {
      type: Object,
      required: true
    },
    /**
     * @description 第三方登录控件控制器
     */
    controller: {
      type: PanelItemController,
      required: true
    }
  },
  setup(props) {
    var _a;
    const ns = useNamespace("auth-sso");
    const {
      semanticClass,
      semanticStyle
    } = useSemanticNode(props.controller);
    const model = props.controller.model;
    const rawItemParams = (_a = model.rawItem) == null ? void 0 : _a.rawItemParams;
    const items = rawItemParams == null ? void 0 : rawItemParams.map((item) => {
      const params = item.value ? JSON.parse(item.value) : {};
      return {
        key: item.key,
        sysImage: item.sysImage,
        title: ibiz.appUtil.resolveI18nText(params.title),
        params
      };
    });
    const dingtalkHandleClick = async () => {
      ibiz.thirdAuth.auth("DINGTALK", "THIRD");
    };
    const wxWorkHandleClick = async () => {
      ibiz.thirdAuth.auth("WXWORK", "THIRD");
    };
    const oauthHandleClick = async (params) => {
      ibiz.thirdAuth.auth("OAUTH", "THIRD", params);
    };
    const handleThridLogin = (type, params) => {
      if (!type)
        return;
      switch (type) {
        case "DINGDING":
          dingtalkHandleClick();
          break;
        case "WXWORK":
          wxWorkHandleClick();
          break;
        default:
          oauthHandleClick(params);
          break;
      }
    };
    return {
      ns,
      items,
      handleThridLogin,
      semanticClass,
      semanticStyle
    };
  },
  render() {
    if (this.items && this.items.length) {
      return createVNode("div", {
        "class": [this.ns.b(), this.semanticClass("root")],
        "style": this.semanticStyle("root")
      }, [this.items.map((item) => {
        var _a;
        let icon;
        if (item.sysImage) {
          icon = createVNode(resolveComponent("iBizIcon"), {
            "icon": item.sysImage
          }, null);
        } else if (item.key === "DINGDING") {
          icon = createVNode("svg", {
            "class": "icon",
            "viewBox": "0 0 1024 1024",
            "version": "1.1",
            "xmlns": "http://www.w3.org/2000/svg",
            "p-id": "651",
            "width": "48",
            "height": "48"
          }, [createVNode("defs", null, [createVNode("style", {
            "type": "text/css"
          }, null)]), createVNode("path", {
            "d": "M512 2C230.2 2 2 230.2 2 512s228.2 510 510 510 510-228.2 510-510S793.3 2 512 2z m235.9 442c-1 4.6-3.6 10.8-7.2 19.1l-0.5 0.5c-21.6 45.8-77.3 135.5-77.3 135.5l-0.5-0.5-16.5 28.3h78.8L574.3 826.8l34-136h-61.8l21.6-90.2c-17.5 4.1-38.1 9.8-62.3 18 0 0-33 19.1-94.8-37.1 0 0-41.7-37.1-17.5-45.8 10.3-4.1 50-8.8 81.4-12.9 42.2-5.7 68.5-8.8 68.5-8.8s-130.3 2.1-161.2-3.1c-30.9-4.6-70.1-56.7-78.3-102 0 0-12.9-24.7 27.8-12.9 40.2 11.8 209.2 45.8 209.2 45.8S321.4 375 307 358.5c-14.4-16.5-42.8-89.6-39.2-134.5 0 0 1.5-11.3 12.9-8.2 0 0 161.8 74.2 272.5 114.4C664.5 371.4 760.8 392 747.9 444z",
            "fill": "#3296FA",
            "p-id": "652"
          }, null)]);
        } else if (item.key === "WXWORK") {
          icon = createVNode("svg", {
            "class": "icon",
            "width": "200px",
            "height": "200.00px",
            "viewBox": "0 0 1024 1024",
            "version": "1.1",
            "xmlns": "http://www.w3.org/2000/svg"
          }, [createVNode("path", {
            "fill": "#36ab60",
            "d": "M352.814545 385.396364m-33.512727 0a33.512727 33.512727 0 1 0 67.025455 0 33.512727 33.512727 0 1 0-67.025455 0Z"
          }, null), createVNode("path", {
            "fill": "#36ab60",
            "d": "M502.690909 384.465455m-33.512727 0a33.512727 33.512727 0 1 0 67.025454 0 33.512727 33.512727 0 1 0-67.025454 0Z"
          }, null), createVNode("path", {
            "fill": "#36ab60",
            "d": "M576.232727 534.341818m-23.272727 0a23.272727 23.272727 0 1 0 46.545455 0 23.272727 23.272727 0 1 0-46.545455 0Z"
          }, null), createVNode("path", {
            "fill": "#36ab60",
            "d": "M694.458182 536.203636m-23.272727 0a23.272727 23.272727 0 1 0 46.545454 0 23.272727 23.272727 0 1 0-46.545454 0Z"
          }, null), createVNode("path", {
            "fill": "#36ab60",
            "d": "M512 0C229.003636 0 0 229.003636 0 512s229.003636 512 512 512 512-229.003636 512-512S794.996364 0 512 0z m-87.505455 630.225455c-26.996364 0-48.407273-5.585455-75.403636-11.17091l-75.403636 37.236364 21.410909-64.232727c-53.992727-37.236364-85.643636-85.643636-85.643637-145.221818 0-102.4 96.814545-182.458182 215.04-182.458182 105.192727 0 198.283636 64.232727 216.901819 150.807273-6.516364-0.930909-13.963636-0.930909-20.48-0.93091-102.4 0-182.458182 76.334545-182.458182 170.356364 0 15.825455 2.792727 30.72 6.516363 44.683636-7.447273 0-13.963636 0.930909-20.48 0.93091z m314.647273 75.403636l15.825455 53.992727-58.647273-32.581818c-21.410909 5.585455-42.821818 11.170909-64.232727 11.170909-102.4 0-182.458182-69.818182-182.458182-155.461818s80.058182-155.461818 182.458182-155.461818c96.814545 0 182.458182 69.818182 182.458182 155.461818 0 47.476364-31.650909 90.298182-75.403637 122.88z"
          }, null)]);
        }
        return createVNode("div", {
          "class": [this.ns.e("sign-btn"), this.semanticClass("item", {
            item
          }), this.ns.m(item.key === "WXWORK" ? "wx" : (_a = item.key) == null ? void 0 : _a.toLowerCase())],
          "style": this.semanticStyle("item", {
            item
          }),
          "title": item.title,
          "onClick": () => this.handleThridLogin(item.key, item.params)
        }, [icon]);
      })]);
    }
    return createVNode("div", {
      "class": [this.ns.b(), this.semanticClass("root")],
      "style": this.semanticStyle("root")
    }, [createVNode("div", {
      "class": [this.ns.e("sign-btn"), this.ns.m("dingding"), this.semanticClass("item", {
        tag: "DINGDING"
      })],
      "style": this.semanticStyle("item", {
        tag: "DINGDING"
      }),
      "onClick": () => this.handleThridLogin("DINGDING"),
      "title": ibiz.i18n.t("panelComponent.authSsO.dingLogin")
    }, [createVNode("svg", {
      "class": "icon",
      "viewBox": "0 0 1024 1024",
      "version": "1.1",
      "xmlns": "http://www.w3.org/2000/svg",
      "p-id": "651",
      "width": "48",
      "height": "48"
    }, [createVNode("defs", null, [createVNode("style", {
      "type": "text/css"
    }, null)]), createVNode("path", {
      "d": "M512 2C230.2 2 2 230.2 2 512s228.2 510 510 510 510-228.2 510-510S793.3 2 512 2z m235.9 442c-1 4.6-3.6 10.8-7.2 19.1l-0.5 0.5c-21.6 45.8-77.3 135.5-77.3 135.5l-0.5-0.5-16.5 28.3h78.8L574.3 826.8l34-136h-61.8l21.6-90.2c-17.5 4.1-38.1 9.8-62.3 18 0 0-33 19.1-94.8-37.1 0 0-41.7-37.1-17.5-45.8 10.3-4.1 50-8.8 81.4-12.9 42.2-5.7 68.5-8.8 68.5-8.8s-130.3 2.1-161.2-3.1c-30.9-4.6-70.1-56.7-78.3-102 0 0-12.9-24.7 27.8-12.9 40.2 11.8 209.2 45.8 209.2 45.8S321.4 375 307 358.5c-14.4-16.5-42.8-89.6-39.2-134.5 0 0 1.5-11.3 12.9-8.2 0 0 161.8 74.2 272.5 114.4C664.5 371.4 760.8 392 747.9 444z",
      "fill": "#3296FA",
      "p-id": "652"
    }, null)])]), createVNode("div", {
      "class": [this.ns.e("sign-btn"), this.ns.m("wx"), this.semanticClass("item", {
        tag: "WXWORK"
      })],
      "style": this.semanticStyle("item", {
        tag: "WXWORK"
      }),
      "onClick": () => this.handleThridLogin("WXWORK"),
      "title": ibiz.i18n.t("panelComponent.authSsO.wechatLogin")
    }, [createVNode("svg", {
      "class": "icon",
      "width": "200px",
      "height": "200.00px",
      "viewBox": "0 0 1024 1024",
      "version": "1.1",
      "xmlns": "http://www.w3.org/2000/svg"
    }, [createVNode("path", {
      "fill": "#36ab60",
      "d": "M352.814545 385.396364m-33.512727 0a33.512727 33.512727 0 1 0 67.025455 0 33.512727 33.512727 0 1 0-67.025455 0Z"
    }, null), createVNode("path", {
      "fill": "#36ab60",
      "d": "M502.690909 384.465455m-33.512727 0a33.512727 33.512727 0 1 0 67.025454 0 33.512727 33.512727 0 1 0-67.025454 0Z"
    }, null), createVNode("path", {
      "fill": "#36ab60",
      "d": "M576.232727 534.341818m-23.272727 0a23.272727 23.272727 0 1 0 46.545455 0 23.272727 23.272727 0 1 0-46.545455 0Z"
    }, null), createVNode("path", {
      "fill": "#36ab60",
      "d": "M694.458182 536.203636m-23.272727 0a23.272727 23.272727 0 1 0 46.545454 0 23.272727 23.272727 0 1 0-46.545454 0Z"
    }, null), createVNode("path", {
      "fill": "#36ab60",
      "d": "M512 0C229.003636 0 0 229.003636 0 512s229.003636 512 512 512 512-229.003636 512-512S794.996364 0 512 0z m-87.505455 630.225455c-26.996364 0-48.407273-5.585455-75.403636-11.17091l-75.403636 37.236364 21.410909-64.232727c-53.992727-37.236364-85.643636-85.643636-85.643637-145.221818 0-102.4 96.814545-182.458182 215.04-182.458182 105.192727 0 198.283636 64.232727 216.901819 150.807273-6.516364-0.930909-13.963636-0.930909-20.48-0.93091-102.4 0-182.458182 76.334545-182.458182 170.356364 0 15.825455 2.792727 30.72 6.516363 44.683636-7.447273 0-13.963636 0.930909-20.48 0.93091z m314.647273 75.403636l15.825455 53.992727-58.647273-32.581818c-21.410909 5.585455-42.821818 11.170909-64.232727 11.170909-102.4 0-182.458182-69.818182-182.458182-155.461818s80.058182-155.461818 182.458182-155.461818c96.814545 0 182.458182 69.818182 182.458182 155.461818 0 47.476364-31.650909 90.298182-75.403637 122.88z"
    }, null)])])]);
  }
});

export { AuthSso };
