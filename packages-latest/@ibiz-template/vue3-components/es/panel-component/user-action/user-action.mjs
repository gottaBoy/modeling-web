import { defineComponent, createVNode, resolveComponent } from 'vue';
import { useNamespace, useSemanticNode } from '@ibiz-template/vue3-util';
import { AppFuncCommand } from '@ibiz-template/runtime';
import { showTitle } from '@ibiz-template/core';
import './user-action.css';

"use strict";
const UserAction = /* @__PURE__ */ defineComponent({
  name: "IBizUserAction",
  props: {
    /**
     * @description 面板预置按钮模型数据
     */
    modelData: {
      type: Object,
      required: true
    },
    /**
     * @description 面板预置按钮控制器
     */
    controller: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    var _a;
    const ns = useNamespace("user-action");
    const c = props.controller;
    const {
      semanticClass,
      semanticStyle
    } = useSemanticNode(props.controller);
    const imgConfig = {
      SETTING: {
        imagePath: "svg/setting.svg"
      },
      HELPER: {
        imagePath: "svg/helper.svg"
      },
      CUSTOM: {
        imagePath: "svg/custom-workbench.svg"
      }
    };
    let sysImage = props.modelData.sysImage;
    if (!sysImage && props.modelData && props.modelData.rawItem) {
      const predefinedType = props.modelData.rawItem.predefinedType;
      if (predefinedType) {
        sysImage = imgConfig[predefinedType];
      }
    }
    let noPrivMode = "PARENT";
    if ((_a = props.modelData.rawItem) == null ? void 0 : _a.rawItemParams) {
      props.modelData.rawItem.rawItemParams.find((item) => {
        var _a2;
        if (((_a2 = item.key) == null ? void 0 : _a2.toLowerCase()) === "noprivmode" && item.value) {
          noPrivMode = item.value;
          return true;
        }
        return false;
      });
    }
    let menuItem;
    const initMenuItem = () => {
      const menuC = c.panel.view.getController("appmenu");
      if (menuC) {
        menuItem = menuC.allAppMenuItems.find((item) => {
          return item.id === props.modelData.id;
        });
        if (menuItem && menuItem.accessKey) {
          const app = ibiz.hub.getApp(c.panel.context.srfappid);
          const permitted = app.authority.calcByResCode(menuItem.accessKey);
          c.state.visible = permitted;
          if (c.parent && noPrivMode === "PARENT") {
            c.parent.state.visible = permitted;
          }
        }
      }
    };
    c.panel.view.evt.on("onMounted", () => {
      initMenuItem();
    });
    const onClick = async (event) => {
      if (menuItem) {
        const tempContext = c.panel.context.clone();
        const tempParam = c.panel.params;
        tempContext.srfappid = menuItem.appId || ibiz.env.appId;
        await ibiz.commands.execute(AppFuncCommand.TAG, menuItem.appFuncId, tempContext, tempParam, {
          event
        });
      }
    };
    return {
      ns,
      c,
      sysImage,
      onClick,
      semanticClass,
      semanticStyle
    };
  },
  render() {
    return createVNode("div", {
      "class": [this.ns.b(), this.semanticClass("root")],
      "style": this.semanticStyle("root"),
      "title": showTitle(this.modelData.caption)
    }, [createVNode(resolveComponent("i-biz-icon"), {
      "class": [this.ns.e("image"), this.semanticClass("content")],
      "style": this.semanticStyle("content"),
      "icon": this.sysImage,
      "onClick": (event) => this.onClick(event)
    }, null)]);
  }
});

export { UserAction };
