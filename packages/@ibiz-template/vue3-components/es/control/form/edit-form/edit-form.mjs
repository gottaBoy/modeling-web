import { isVNode, defineComponent, ref, watch, reactive, createVNode, resolveComponent } from 'vue';
import { EditFormController } from '@ibiz-template/runtime';
import { useControlController, useNamespace } from '@ibiz-template/vue3-util';

"use strict";
function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !isVNode(s);
}
const EditFormControl = /* @__PURE__ */ defineComponent({
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
    const c = useControlController((...args) => new EditFormController(...args), {
      excludePropsKeys: ["data"]
    });
    const anchorList = ref([]);
    const anchorTargetRef = ref();
    if (props.isSimple) {
      c.evt.on("onMounted", () => {
        c.setSimpleData(props.data || {});
      });
      watch(() => props.data, (newVal) => {
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
    const ns = useNamespace("control-".concat(c.model.controlType.toLowerCase()));
    c.evt.on("onCreated", () => {
      const keys = Object.keys(c.details);
      keys.forEach((key) => {
        const detail = c.details[key];
        detail.state = reactive(detail.state);
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
    const content = createVNode(resolveComponent("iBizFormControl"), {
      "ref": "anchorTargetRef",
      "class": this.ns.b(),
      "controller": this.c
    }, {
      ...this.$slots
    });
    if (this.c.model.showFormNavBar) {
      return createVNode(resolveComponent("iBizAnchorContainer"), {
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

export { EditFormControl };
