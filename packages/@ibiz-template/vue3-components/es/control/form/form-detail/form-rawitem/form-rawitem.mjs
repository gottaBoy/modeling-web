import { defineComponent, ref, computed, watch, createVNode, resolveComponent } from 'vue';
import { useNamespace } from '@ibiz-template/vue3-util';
import { FormRawItemController } from '@ibiz-template/runtime';
import './form-rawitem.css';

"use strict";
const FormRawItem = /* @__PURE__ */ defineComponent({
  name: "IBizFormRawItem",
  props: {
    modelData: {
      type: Object,
      required: true
    },
    controller: {
      type: FormRawItemController,
      required: true
    }
  },
  setup(props) {
    const ns = useNamespace("form-raw-item");
    const c = props.controller;
    const content = ref("");
    const showFormDefaultContent = computed(() => {
      if (props.controller.form.controlParams && props.controller.form.controlParams.editmode === "hover") {
        return true;
      }
      return false;
    });
    watch(() => c.data, async (newVal) => {
      if (newVal) {
        const rawItemModel = c.model.rawItem;
        if (!rawItemModel) {
          return;
        }
        let rawItemContent = "";
        const obj = {
          ...newVal
        };
        if (rawItemModel.contentType === "RAW") {
          rawItemContent = rawItemModel.caption;
        } else if (rawItemModel.contentType === "HTML") {
          rawItemContent = rawItemModel.content;
        }
        if (rawItemContent && rawItemModel.templateMode) {
          rawItemContent = await ibiz.util.hbs.render(rawItemContent.replaceAll("//n", "\n"), Object.assign(obj, {
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
      content,
      showFormDefaultContent
    };
  },
  render() {
    var _a;
    if (!this.controller.state.visible) {
      return null;
    }
    return createVNode(resolveComponent("iBizRawItem"), {
      "class": [
        this.ns.b(),
        ...this.controller.containerClass,
        this.ns.is("show-default", this.showFormDefaultContent),
        // 表单直接内容文本类型与直接内容类型应具备与标签相同样式
        this.ns.is("form-text", ["TEXT", "RAW"].includes(((_a = this.modelData.rawItem) == null ? void 0 : _a.contentType) || ""))
      ],
      "rawItem": this.modelData,
      "content": this.content,
      "onClick": (event) => this.controller.onClick(event)
    }, null);
  }
});

export { FormRawItem, FormRawItem as default };
