import { defineComponent, computed, createVNode, resolveComponent } from 'vue';
import { showTitle } from '@ibiz-template/core';
import { useNamespace } from '@ibiz-template/vue3-util';
import './async-action.css';
import { isObject, isString } from 'lodash-es';

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
const AsyncAction = /* @__PURE__ */ defineComponent({
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
    const ns = useNamespace("async-action");
    const hasObjResult = computed(() => isObject(props.action.actionresult));
    const clickable = computed(() => {
      return !props.action.actiontype || hasObjResult.value;
    });
    const showErrorInfo = computed(() => {
      return props.action.actiontype && isString(props.action.actionresult);
    });
    const actionstate = computed(() => {
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
    const progressText = computed(() => {
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
    return createVNode("div", {
      "class": [this.ns.b(), this.clickable ? this.ns.m("clickable") : ""],
      "onClick": this.onClick
    }, [createVNode("div", {
      "class": this.ns.b("left")
    }, [createVNode("ion-icon", {
      "name": "list-outline"
    }, null)]), createVNode("div", {
      "class": this.ns.b("center")
    }, [createVNode("div", {
      "class": this.ns.e("caption")
    }, [asyncacitonname]), this.showErrorInfo && createVNode("div", {
      "title": showTitle(this.action.actionresult),
      "class": this.ns.e("error-info")
    }, [this.action.actionresult]), this.actionstate === 20 ? createVNode("div", {
      "class": this.ns.e("progress")
    }, [stepinfo, this.progressText]) : createVNode("div", {
      "class": this.ns.e("begin-time")
    }, [begintime])]), createVNode("div", {
      "class": this.ns.b("right")
    }, [createVNode(resolveComponent("el-tag"), {
      "type": stateType[this.actionstate]
    }, {
      default: () => [stateTexts[this.actionstate]]
    })]), this.actionstate === 20 && !!this.action.completionrate && createVNode("div", {
      "class": this.ns.b("loading-warp")
    }, [createVNode("div", {
      "class": this.ns.be("loading-warp", "inner"),
      "style": "width:".concat(this.action.completionrate, "%;")
    }, null)])]);
  }
});

export { AsyncAction };
