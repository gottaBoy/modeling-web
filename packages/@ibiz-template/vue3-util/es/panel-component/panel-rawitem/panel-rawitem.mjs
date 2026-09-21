import { defineComponent, ref, computed, watch, createVNode, resolveComponent } from 'vue';
import '../../use/index.mjs';
import { PanelRawItemController } from './panel-rawitem.controller.mjs';
import './panel-rawitem.css';
import { useNamespace } from '../../use/namespace/namespace.mjs';

"use strict";
const PanelRawItem = /* @__PURE__ */ defineComponent({
  name: "IBizPanelRawItem",
  props: {
    modelData: {
      type: Object,
      required: true
    },
    controller: {
      type: PanelRawItemController,
      required: true
    }
  },
  setup(props) {
    const ns = useNamespace("panel-rawitem");
    const c = props.controller;
    const content = ref("");
    const tempStyle = ref("");
    const {
      rawItem
    } = props.modelData;
    if (rawItem && rawItem.cssStyle) {
      tempStyle.value = rawItem.cssStyle;
    }
    const classArr = computed(() => {
      const {
        id
      } = props.modelData;
      const result = [ns.b(), ns.m(id)];
      result.push(...props.controller.containerClass);
      return result;
    });
    watch(() => c.data, async (newVal) => {
      if (newVal) {
        const rawItemModel = c.model.rawItem;
        if (!rawItemModel) {
          return;
        }
        let rawItemContent;
        const obj = {
          ...newVal
        };
        if (rawItemModel.contentType === "RAW") {
          rawItemContent = rawItemModel.caption;
        } else if (rawItemModel.contentType === "HTML") {
          rawItemContent = rawItemModel.content;
        }
        if (rawItemContent && rawItemModel.templateMode) {
          rawItemContent = await ibiz.util.hbs.render(rawItemContent.replace("//n", "\n"), Object.assign(obj, {
            data: {
              ...newVal
            }
          }));
        }
        content.value = rawItemContent;
      }
    }, {
      immediate: true
    });
    return {
      ns,
      classArr,
      tempStyle,
      content
    };
  },
  render() {
    if (!this.controller.state.visible) {
      return;
    }
    return createVNode("div", {
      "class": this.classArr,
      "style": this.tempStyle,
      "onClick": (event) => {
        this.controller.onClick(event);
      }
    }, [createVNode(resolveComponent("iBizRawItem"), {
      "rawItem": this.modelData,
      "content": this.content
    }, null)]);
  }
});

export { PanelRawItem };
