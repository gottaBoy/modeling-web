import { defineComponent, createVNode, resolveComponent, ref, computed, watch } from 'vue';
import { useNamespace, useSemanticNode, getEditorEmits, getRawProps } from '@ibiz-template/vue3-util';
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
    const {
      semanticClass,
      semanticStyle
    } = useSemanticNode(c);
    const content = ref("");
    const enableOverFlow = computed(() => {
      return !!c.model.editorHeight;
    });
    const chunkView = c.editorParams.chunkview;
    const chunkEntity = c.editorParams.chunkentity;
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
              },
              context: c.context,
              params: c.params
            });
          }
          ibiz.log.debug("\u6A21\u677F\u5185\u5BB9\uFF1A", template);
          ibiz.log.debug("\u6A21\u677F\u7F16\u8BD1\u5BF9\u8C61\uFF1A", obj);
          content.value = await ibiz.util.hbs.render(template, obj);
        }
      }
    }, {
      immediate: true
    });
    return {
      ns,
      type,
      content,
      template,
      chunkView,
      chunkEntity,
      enableOverFlow,
      semanticClass,
      semanticStyle,
      showFormDefaultContent
    };
  },
  render() {
    return createVNode("div", {
      "class": [this.ns.b(), this.semanticClass("editor.root"), this.ns.is("overflow", this.enableOverFlow), this.disabled ? this.ns.m("disabled") : "", this.readonly ? this.ns.m("readonly") : "", this.ns.is("show-default", this.showFormDefaultContent)],
      "style": this.semanticStyle("editor.root")
    }, [this.content && createVNode(resolveComponent("iBizRawItem"), {
      "data": this.data,
      "type": this.type,
      "content": this.content,
      "chunkView": this.chunkView,
      "chunkEntity": this.chunkEntity,
      "context": this.controller.context,
      "ctrl": this.controller.ctrl,
      "view": this.controller.view,
      "class": [this.ns.b("content"), this.semanticClass("editor.content")],
      "style": this.semanticStyle("editor.content")
    }, null)]);
  }
});

export { IBizRaw };
