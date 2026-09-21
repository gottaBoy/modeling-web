'use strict';

var vue = require('vue');
var runtime = require('@ibiz-template/runtime');
var vue3Util = require('@ibiz-template/vue3-util');

"use strict";
function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !vue.isVNode(s);
}
const EditFormControl = /* @__PURE__ */ vue.defineComponent({
  name: "IBizEditFormControl",
  props: {
    modelData: {
      type: Object,
      required: true
    },
    context: {
      type: Object,
      required: true
    },
    params: {
      type: Object,
      default: () => ({})
    },
    provider: {
      type: Object
    },
    isSimple: {
      type: Boolean,
      required: false
    },
    data: {
      type: Object,
      required: false
    },
    loadDefault: {
      type: Boolean,
      default: true
    }
  },
  setup(props) {
    const c = vue3Util.useControlController((...args) => new runtime.EditFormController(...args), {
      excludePropsKeys: ["data"]
    });
    const anchorList = vue.ref([]);
    const anchorTargetRef = vue.ref();
    if (props.isSimple) {
      c.evt.on("onMounted", () => {
        c.setSimpleData(props.data || {});
      });
      vue.watch(() => props.data, (newVal) => {
        const changeVal = newVal || {};
        const find = Object.keys(c.data).find((key) => {
          return changeVal[key] !== c.data[key];
        });
        if (find) {
          c.setSimpleData(changeVal);
        }
      }, {
        deep: true
      });
    }
    const ns = vue3Util.useNamespace("control-".concat(c.model.controlType.toLowerCase()));
    c.evt.on("onCreated", () => {
      const keys = Object.keys(c.details);
      keys.forEach((key) => {
        const detail = c.details[key];
        detail.state = vue.reactive(detail.state);
      });
      anchorList.value = c.anchorData;
    });
    const calcNavBarConfig = () => {
      const {
        navBarPos,
        navBarSysCss,
        navBarWidth,
        navBarStyle,
        navbarHeight
      } = c.model;
      return {
        navBarPos,
        navBarSysCss,
        navBarWidth,
        navBarStyle,
        navbarHeight
      };
    };
    return {
      c,
      ns,
      anchorList,
      anchorTargetRef,
      calcNavBarConfig
    };
  },
  render() {
    const content = vue.createVNode(vue.resolveComponent("iBizFormControl"), {
      "ref": "anchorTargetRef",
      "class": this.ns.b(),
      "controller": this.c
    }, {
      ...this.$slots
    });
    if (this.c.model.showFormNavBar) {
      return vue.createVNode(vue.resolveComponent("iBizAnchorContainer"), {
        "anchorList": this.anchorList.filter((item) => item.pageId === this.c.state.activeTab),
        "anchorTargetEle": this.anchorTargetRef,
        "navBarConfig": this.calcNavBarConfig()
      }, _isSlot(content) ? content : {
        default: () => [content]
      });
    }
    return content;
  }
});

exports.EditFormControl = EditFormControl;
