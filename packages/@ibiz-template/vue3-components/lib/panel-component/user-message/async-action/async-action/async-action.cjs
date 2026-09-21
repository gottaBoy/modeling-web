'use strict';

var vue = require('vue');
var core = require('@ibiz-template/core');
var vue3Util = require('@ibiz-template/vue3-util');
require('./async-action.css');
var lodashEs = require('lodash-es');

"use strict";
const stateTexts = {
  10: "\u672A\u5F00\u59CB",
  20: "\u6267\u884C\u4E2D",
  30: "\u5DF2\u6267\u884C",
  40: "\u6267\u884C\u5931\u8D25"
};
const stateType = {
  10: "info",
  20: "",
  30: "success",
  40: "danger"
};
const AsyncAction = /* @__PURE__ */ vue.defineComponent({
  name: "IBizAsyncAction",
  props: {
    action: {
      type: Object,
      required: true
    },
    provider: {
      type: Object,
      required: true
    }
  },
  emits: {
    close: () => true
  },
  setup(props, {
    emit
  }) {
    const ns = vue3Util.useNamespace("async-action");
    const hasObjResult = vue.computed(() => lodashEs.isObject(props.action.actionresult));
    const clickable = vue.computed(() => {
      return !props.action.actiontype || hasObjResult.value;
    });
    const showErrorInfo = vue.computed(() => {
      return props.action.actiontype && lodashEs.isString(props.action.actionresult);
    });
    const actionstate = vue.computed(() => {
      if (hasObjResult.value) {
        const result = props.action.actionresult;
        const errorNum = result.total - result.success;
        if (errorNum > 0) {
          return 40;
        }
        return 30;
      }
      return props.action.actionstate;
    });
    const progressText = vue.computed(() => {
      return !props.action.completionrate ? "" : "(".concat(props.action.completionrate, "%)");
    });
    const onClick = async (event) => {
      if (props.provider.onClick) {
        const isClose = await props.provider.onClick(props.action, event);
        if (isClose) {
          emit("close");
        }
      }
    };
    return {
      ns,
      showErrorInfo,
      clickable,
      actionstate,
      progressText,
      onClick
    };
  },
  render() {
    const {
      asyncacitonname,
      begintime,
      stepinfo = "\u8FDB\u884C\u4E2D"
    } = this.action;
    return vue.createVNode("div", {
      "class": [this.ns.b(), this.clickable ? this.ns.m("clickable") : ""],
      "onClick": this.onClick
    }, [vue.createVNode("div", {
      "class": this.ns.b("left")
    }, [vue.createVNode("ion-icon", {
      "name": "list-outline"
    }, null)]), vue.createVNode("div", {
      "class": this.ns.b("center")
    }, [vue.createVNode("div", {
      "class": this.ns.e("caption")
    }, [asyncacitonname]), this.showErrorInfo && vue.createVNode("div", {
      "title": core.showTitle(this.action.actionresult),
      "class": this.ns.e("error-info")
    }, [this.action.actionresult]), this.actionstate === 20 ? vue.createVNode("div", {
      "class": this.ns.e("progress")
    }, [stepinfo, this.progressText]) : vue.createVNode("div", {
      "class": this.ns.e("begin-time")
    }, [begintime])]), vue.createVNode("div", {
      "class": this.ns.b("right")
    }, [vue.createVNode(vue.resolveComponent("el-tag"), {
      "type": stateType[this.actionstate]
    }, {
      default: () => [stateTexts[this.actionstate]]
    })]), this.actionstate === 20 && !!this.action.completionrate && vue.createVNode("div", {
      "class": this.ns.b("loading-warp")
    }, [vue.createVNode("div", {
      "class": this.ns.be("loading-warp", "inner"),
      "style": "width:".concat(this.action.completionrate, "%;")
    }, null)])]);
  }
});

exports.AsyncAction = AsyncAction;
