import { isVNode, defineComponent, createVNode, resolveComponent, reactive, createTextVNode } from 'vue';
import { useNamespace } from '@ibiz-template/vue3-util';
import './async-action-result.css';
import { isObject } from 'lodash-es';

"use strict";
function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !isVNode(s);
}
const AsyncActionResult = /* @__PURE__ */ defineComponent({
  name: "IBizAsyncActionResult",
  props: {
    asyncAction: {
      type: Object,
      required: true
    },
    modal: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const ns = useNamespace("async-action-result");
    const finishedStates = [30, 40];
    const info = reactive({
      title: props.asyncAction.asyncacitonname,
      beginTime: props.asyncAction.begintime,
      endTime: props.asyncAction.endtime,
      actionState: finishedStates.includes(props.asyncAction.actionstate),
      message: ibiz.i18n.t("panelComponent.userMessage.asyncActionResult.noMessage"),
      isJSON: false
    });
    const onClose = () => {
      props.modal.dismiss();
    };
    if (isObject(props.asyncAction.actionresult)) {
      info.message = JSON.stringify(props.asyncAction.actionresult, null, 2);
      info.isJSON = true;
    } else if (props.asyncAction.actionresult) {
      info.message = "".concat(props.asyncAction.actionresult);
    }
    const renderJSONObject = (obj, depth) => {
      if (obj === null) {
        return createVNode("span", {
          "class": ns.be("content", "json-null")
        }, [createTextVNode("null")]);
      }
      if (typeof obj === "boolean") {
        return createVNode("span", {
          "class": ns.be("content", "json-boolean")
        }, [obj.toString()]);
      }
      if (typeof obj === "number") {
        return createVNode("span", {
          "class": ns.be("content", "json-number")
        }, [obj.toString()]);
      }
      if (typeof obj === "string") {
        return createVNode("span", {
          "class": ns.be("content", "json-string")
        }, [createTextVNode('"'), obj, createTextVNode('"')]);
      }
      if (Array.isArray(obj)) {
        if (obj.length === 0) {
          return createVNode("span", null, [createTextVNode("[]")]);
        }
        const items2 = obj.map((item, index) => createVNode("div", {
          "key": index,
          "class": ns.be("content", "json-indent"),
          "style": {
            paddingLeft: "".concat((depth + 1) * 20, "px")
          }
        }, [renderJSONObject(item, depth + 1), index < obj.length - 1 ? "," : ""]));
        return createVNode("div", {
          "class": ns.be("content", "json-array")
        }, [createVNode("span", null, [createTextVNode("[")]), items2, createVNode("div", {
          "style": {
            paddingLeft: "".concat(depth * 20, "px")
          }
        }, null), createVNode("span", {
          "style": {
            paddingLeft: "".concat(depth * 20, "px")
          }
        }, [createTextVNode("]")])]);
      }
      const keys = Object.keys(obj);
      if (keys.length === 0) {
        return createVNode("span", null, ["{}"]);
      }
      const items = keys.map((key, index) => createVNode("div", {
        "key": key,
        "class": ns.be("content", "json-indent"),
        "style": {
          paddingLeft: "".concat((depth + 1) * 20, "px")
        }
      }, [createVNode("span", {
        "class": ns.be("content", "json-key")
      }, [createTextVNode('"'), key, createTextVNode('"')]), createTextVNode(":"), " ", renderJSONObject(obj[key], depth + 1), index < keys.length - 1 ? "," : ""]));
      return createVNode("div", {
        "class": ns.be("content", "json-object")
      }, [createVNode("span", null, ["{"]), items, createVNode("div", {
        "style": {
          paddingLeft: "".concat(depth * 20, "px")
        }
      }, null), createVNode("span", {
        "style": {
          paddingLeft: "".concat(depth * 20, "px")
        }
      }, ["}"])]);
    };
    const renderJSON = (jsonStr) => {
      try {
        const obj = JSON.parse(jsonStr);
        return renderJSONObject(obj, 0);
      } catch (e) {
        return createVNode("span", null, [jsonStr]);
      }
    };
    return {
      ns,
      info,
      onClose,
      renderJSON
    };
  },
  render() {
    let _slot;
    return createVNode("div", {
      "class": [this.ns.b()]
    }, [createVNode("div", {
      "class": this.ns.b("header")
    }, [createVNode("div", {
      "class": this.ns.e("title")
    }, [this.info.title]), createVNode("div", {
      "class": this.ns.b("toolbar")
    }, [createVNode(resolveComponent("el-button"), {
      "onClick": this.onClose
    }, _isSlot(_slot = ibiz.i18n.t("app.close")) ? _slot : {
      default: () => [_slot]
    })])]), createVNode("div", {
      "class": this.ns.b("content")
    }, [createVNode(resolveComponent("el-row"), null, {
      default: () => [createVNode(resolveComponent("el-col"), {
        "span": 12
      }, {
        default: () => [createVNode(resolveComponent("el-form-item"), {
          "label": ibiz.i18n.t("panelComponent.userMessage.asyncActionResult.taskName")
        }, {
          default: () => [this.info.title]
        })]
      }), createVNode(resolveComponent("el-col"), {
        "span": 12
      }, {
        default: () => [createVNode(resolveComponent("el-form-item"), {
          "label": ibiz.i18n.t("panelComponent.userMessage.asyncActionResult.taskState")
        }, {
          default: () => [this.info.actionState ? ibiz.i18n.t("panelComponent.userMessage.asyncActionResult.finished") : ibiz.i18n.t("panelComponent.userMessage.asyncActionResult.processing")]
        })]
      }), createVNode(resolveComponent("el-col"), {
        "span": 12
      }, {
        default: () => [createVNode(resolveComponent("el-form-item"), {
          "label": ibiz.i18n.t("panelComponent.userMessage.asyncActionResult.beginTime")
        }, {
          default: () => [this.info.beginTime]
        })]
      }), createVNode(resolveComponent("el-col"), {
        "span": 12
      }, {
        default: () => [createVNode(resolveComponent("el-form-item"), {
          "label": ibiz.i18n.t("panelComponent.userMessage.asyncActionResult.endTime")
        }, {
          default: () => [this.info.endTime]
        })]
      }), createVNode(resolveComponent("el-col"), {
        "span": 24
      }, {
        default: () => [createVNode(resolveComponent("el-form-item"), {
          "label": ibiz.i18n.t("panelComponent.userMessage.asyncActionResult.exeResult")
        }, {
          default: () => [createVNode("div", {
            "class": this.ns.be("content", "json-container")
          }, [this.renderJSON(this.info.message)])]
        })]
      })]
    })])]);
  }
});

export { AsyncActionResult };
