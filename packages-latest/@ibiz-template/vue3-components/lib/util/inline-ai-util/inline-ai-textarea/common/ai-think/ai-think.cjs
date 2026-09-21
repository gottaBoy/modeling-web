'use strict';

var vue = require('vue');
var vue3Util = require('@ibiz-template/vue3-util');
var icon = require('../../icon.cjs');
require('./ai-think.css');

"use strict";
const AIThink = /* @__PURE__ */ vue.defineComponent({
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
    const ns = vue3Util.useNamespace("ai-think");
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
    return vue.createVNode("div", {
      "class": this.ns.b()
    }, [vue.createVNode("div", {
      "class": this.ns.e("header"),
      "onClick": this.onCollapseChange
    }, [vue.createVNode("div", {
      "class": [this.ns.em("header", "state-icon"), this.ns.is("loading", this.isLoading)]
    }, [this.isLoading ? icon.LoadingIcon : icon.ThinkSuccessIcon]), vue.createVNode("div", {
      "class": this.ns.em("header", "title")
    }, [this.isLoading ? ibiz.i18n.t("util.inlineAiUtil.thinking") : ibiz.i18n.t("util.inlineAiUtil.thinked")]), vue.createVNode("div", {
      "class": this.ns.em("header", "collapse-icon")
    }, [this.isCollapse ? icon.DownIcon : icon.UpIcon])]), !this.isCollapse && vue.createVNode("div", {
      "class": this.ns.e("content")
    }, [this.think])]);
  }
});

exports.AIThink = AIThink;
