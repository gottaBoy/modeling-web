import { defineComponent, createVNode } from 'vue';
import { useNamespace } from '@ibiz-template/vue3-util';
import { LoadingIcon, ThinkSuccessIcon, DownIcon, UpIcon } from '../../icon.mjs';
import './ai-think.css';

"use strict";
const AIThink = /* @__PURE__ */ defineComponent({
  props: {
    think: {
      type: String
    },
    isLoading: {
      type: Boolean,
      required: true
    },
    isCollapse: {
      type: Boolean,
      required: true
    }
  },
  emits: {
    collapseChange: (_value) => true
  },
  setup(props, {
    emit
  }) {
    const ns = useNamespace("ai-think");
    const onCollapseChange = () => {
      emit("collapseChange", !props.isCollapse);
    };
    return {
      ns,
      onCollapseChange
    };
  },
  render() {
    if (!this.think)
      return;
    return createVNode("div", {
      "class": this.ns.b()
    }, [createVNode("div", {
      "class": this.ns.e("header"),
      "onClick": this.onCollapseChange
    }, [createVNode("div", {
      "class": [this.ns.em("header", "state-icon"), this.ns.is("loading", this.isLoading)]
    }, [this.isLoading ? LoadingIcon : ThinkSuccessIcon]), createVNode("div", {
      "class": this.ns.em("header", "title")
    }, [this.isLoading ? ibiz.i18n.t("util.inlineAiUtil.thinking") : ibiz.i18n.t("util.inlineAiUtil.thinked")]), createVNode("div", {
      "class": this.ns.em("header", "collapse-icon")
    }, [this.isCollapse ? DownIcon : UpIcon])]), !this.isCollapse && createVNode("div", {
      "class": this.ns.e("content")
    }, [this.think])]);
  }
});

export { AIThink };
