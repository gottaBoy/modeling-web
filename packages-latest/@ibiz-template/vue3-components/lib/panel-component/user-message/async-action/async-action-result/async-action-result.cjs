'use strict';

var vue = require('vue');
var vue3Util = require('@ibiz-template/vue3-util');
require('./async-action-result.css');
var lodashEs = require('lodash-es');

"use strict";
function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !vue.isVNode(s);
}
const AsyncActionResult = /* @__PURE__ */ vue.defineComponent({
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
    const ns = vue3Util.useNamespace("async-action-result");
    const finishedStates = [30, 40];
    const info = vue.reactive({
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
    if (lodashEs.isObject(props.asyncAction.actionresult)) {
      info.message = JSON.stringify(props.asyncAction.actionresult, null, 2);
      info.isJSON = true;
    } else if (props.asyncAction.actionresult) {
      info.message = "".concat(props.asyncAction.actionresult);
    }
    const renderJSONObject = (obj, depth) => {
      if (obj === null) {
        return vue.createVNode("span", {
          "class": ns.be("content", "json-null")
        }, [vue.createTextVNode("null")]);
      }
      if (typeof obj === "boolean") {
        return vue.createVNode("span", {
          "class": ns.be("content", "json-boolean")
        }, [obj.toString()]);
      }
      if (typeof obj === "number") {
        return vue.createVNode("span", {
          "class": ns.be("content", "json-number")
        }, [obj.toString()]);
      }
      if (typeof obj === "string") {
        return vue.createVNode("span", {
          "class": ns.be("content", "json-string")
        }, [vue.createTextVNode('"'), obj, vue.createTextVNode('"')]);
      }
      if (Array.isArray(obj)) {
        if (obj.length === 0) {
          return vue.createVNode("span", null, [vue.createTextVNode("[]")]);
        }
        const items2 = obj.map((item, index) => vue.createVNode("div", {
          "key": index,
          "class": ns.be("content", "json-indent"),
          "style": {
            paddingLeft: "".concat((depth + 1) * 20, "px")
          }
        }, [renderJSONObject(item, depth + 1), index < obj.length - 1 ? "," : ""]));
        return vue.createVNode("div", {
          "class": ns.be("content", "json-array")
        }, [vue.createVNode("span", null, [vue.createTextVNode("[")]), items2, vue.createVNode("div", {
          "style": {
            paddingLeft: "".concat(depth * 20, "px")
          }
        }, null), vue.createVNode("span", {
          "style": {
            paddingLeft: "".concat(depth * 20, "px")
          }
        }, [vue.createTextVNode("]")])]);
      }
      const keys = Object.keys(obj);
      if (keys.length === 0) {
        return vue.createVNode("span", null, ["{}"]);
      }
      const items = keys.map((key, index) => vue.createVNode("div", {
        "key": key,
        "class": ns.be("content", "json-indent"),
        "style": {
          paddingLeft: "".concat((depth + 1) * 20, "px")
        }
      }, [vue.createVNode("span", {
        "class": ns.be("content", "json-key")
      }, [vue.createTextVNode('"'), key, vue.createTextVNode('"')]), vue.createTextVNode(":"), " ", renderJSONObject(obj[key], depth + 1), index < keys.length - 1 ? "," : ""]));
      return vue.createVNode("div", {
        "class": ns.be("content", "json-object")
      }, [vue.createVNode("span", null, ["{"]), items, vue.createVNode("div", {
        "style": {
          paddingLeft: "".concat(depth * 20, "px")
        }
      }, null), vue.createVNode("span", {
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
        return vue.createVNode("span", null, [jsonStr]);
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
    return vue.createVNode("div", {
      "class": [this.ns.b()]
    }, [vue.createVNode("div", {
      "class": this.ns.b("header")
    }, [vue.createVNode("div", {
      "class": this.ns.e("title")
    }, [this.info.title]), vue.createVNode("div", {
      "class": this.ns.b("toolbar")
    }, [vue.createVNode(vue.resolveComponent("el-button"), {
      "onClick": this.onClose
    }, _isSlot(_slot = ibiz.i18n.t("app.close")) ? _slot : {
      default: () => [_slot]
    })])]), vue.createVNode("div", {
      "class": this.ns.b("content")
    }, [vue.createVNode(vue.resolveComponent("el-row"), null, {
      default: () => [vue.createVNode(vue.resolveComponent("el-col"), {
        "span": 12
      }, {
        default: () => [vue.createVNode(vue.resolveComponent("el-form-item"), {
          "label": ibiz.i18n.t("panelComponent.userMessage.asyncActionResult.taskName")
        }, {
          default: () => [this.info.title]
        })]
      }), vue.createVNode(vue.resolveComponent("el-col"), {
        "span": 12
      }, {
        default: () => [vue.createVNode(vue.resolveComponent("el-form-item"), {
          "label": ibiz.i18n.t("panelComponent.userMessage.asyncActionResult.taskState")
        }, {
          default: () => [this.info.actionState ? ibiz.i18n.t("panelComponent.userMessage.asyncActionResult.finished") : ibiz.i18n.t("panelComponent.userMessage.asyncActionResult.processing")]
        })]
      }), vue.createVNode(vue.resolveComponent("el-col"), {
        "span": 12
      }, {
        default: () => [vue.createVNode(vue.resolveComponent("el-form-item"), {
          "label": ibiz.i18n.t("panelComponent.userMessage.asyncActionResult.beginTime")
        }, {
          default: () => [this.info.beginTime]
        })]
      }), vue.createVNode(vue.resolveComponent("el-col"), {
        "span": 12
      }, {
        default: () => [vue.createVNode(vue.resolveComponent("el-form-item"), {
          "label": ibiz.i18n.t("panelComponent.userMessage.asyncActionResult.endTime")
        }, {
          default: () => [this.info.endTime]
        })]
      }), vue.createVNode(vue.resolveComponent("el-col"), {
        "span": 24
      }, {
        default: () => [vue.createVNode(vue.resolveComponent("el-form-item"), {
          "label": ibiz.i18n.t("panelComponent.userMessage.asyncActionResult.exeResult")
        }, {
          default: () => [vue.createVNode("div", {
            "class": this.ns.be("content", "json-container")
          }, [this.renderJSON(this.info.message)])]
        })]
      })]
    })])]);
  }
});

exports.AsyncActionResult = AsyncActionResult;
