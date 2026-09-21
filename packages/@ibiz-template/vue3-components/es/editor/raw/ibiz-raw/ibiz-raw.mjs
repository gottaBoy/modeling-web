import { defineComponent, ref, computed, watch, createVNode, resolveComponent } from 'vue';
import { getRawProps, getEditorEmits, useNamespace } from '@ibiz-template/vue3-util';
import './ibiz-raw.css';

"use strict";
const IBizRaw = /* @__PURE__ */ defineComponent({
  name: "IBizRaw",
  props: getRawProps(),
  emits: getEditorEmits(),
  setup(props) {
    const ns = useNamespace("raw");
    const c = props.controller;
    const editorModel = c.model;
    const content = ref("");
    let type = "TEXT";
    let template = "";
    if (editorModel.contentType) {
      type = editorModel.contentType;
    }
    if (editorModel.editorParams && editorModel.editorParams.contenttype) {
      type = editorModel.editorParams.contenttype;
    }
    if (editorModel.editorParams && editorModel.editorParams.template) {
      template = editorModel.editorParams.template.replace(/\/\/n/g, "\n");
    }
    if (editorModel.editorParams && editorModel.editorParams.TEMPLATE) {
      template = editorModel.editorParams.TEMPLATE.replace(/\/\/n/g, "\n");
    }
    const showFormDefaultContent = computed(() => {
      if (props.controlParams && props.controlParams.editmode === "hover" && !props.readonly) {
        return true;
      }
      return false;
    });
    watch(() => props.value, async (newVal, oldVal) => {
      if (newVal !== oldVal) {
        if (typeof newVal === "string" || typeof newVal === "number" || !newVal) {
          content.value = newVal;
        }
        if (template && newVal) {
          let obj = newVal;
          if (typeof newVal === "string") {
            try {
              obj = JSON.parse(newVal);
            } catch (error) {
              ibiz.log.error("JSON\u5B57\u7B26\u4E32\u8F6C\u6362\u9519\u8BEF");
            }
          }
          if (!Array.isArray(obj)) {
            Object.assign(obj, {
              data: {
                ...props.data
              }
            });
          }
          content.value = await ibiz.util.hbs.render(template, obj);
        }
      }
    }, {
      immediate: true
    });
    return {
      ns,
      content,
      type,
      template,
      showFormDefaultContent
    };
  },
  render() {
    return createVNode("div", {
      "class": [this.ns.b(), this.disabled ? this.ns.m("disabled") : "", this.readonly ? this.ns.m("readonly") : "", this.ns.is("show-default", this.showFormDefaultContent)]
    }, [this.content && createVNode(resolveComponent("iBizRawItem"), {
      "class": this.ns.b("content"),
      "content": this.content,
      "type": this.type
    }, null)]);
  }
});

export { IBizRaw };
