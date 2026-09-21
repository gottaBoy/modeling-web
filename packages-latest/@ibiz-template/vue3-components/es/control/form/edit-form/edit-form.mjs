import { isVNode, defineComponent, createVNode, resolveComponent, ref, watch, reactive } from 'vue';
import { EditFormController, ControlVO } from '@ibiz-template/runtime';
import { useControlController, useNamespace, useSemanticNode } from '@ibiz-template/vue3-util';
import { debounce } from 'lodash-es';
import './edit-form.css';

"use strict";
function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !isVNode(s);
}
const EditFormControl = /* @__PURE__ */ defineComponent({
  name: "IBizEditFormControl",
  props: {
    /**
     * @description 表单模型数据
     */
    modelData: {
      type: Object,
      required: true
    },
    /**
     * @description 应用上下文对象
     */
    context: {
      type: Object,
      required: true
    },
    /**
     * @description 视图参数对象
     * @default {}
     */
    params: {
      type: Object,
      default: () => ({})
    },
    /**
     * @description 部件适配器
     */
    provider: {
      type: Object
    },
    /**
     * @description 是否是简单模式，即直接传入数据，不加载数据
     */
    isSimple: {
      type: Boolean,
      required: false
    },
    /**
     * @description 简单模式下传入的数据
     */
    data: {
      type: Object,
      required: false
    },
    /**
     * @description 是否默认加载数据
     * @default true
     */
    loadDefault: {
      type: Boolean,
      default: true
    },
    /**
     * @description 简单模式下传入的数据索引
     */
    simpleDataIndex: {
      type: Number,
      required: false
    },
    /**
     * @description 多数据部件表单模式下传入的表单索引
     */
    mdCtrlFormIndex: {
      type: Number,
      required: false
    }
  },
  setup(props) {
    const c = useControlController((...args) => new EditFormController(...args), {
      excludePropsKeys: ["data"]
    });
    const ns = useNamespace("control-edit-form");
    const {
      semanticClass,
      semanticStyle
    } = useSemanticNode(c);
    const filter = ref("");
    const anchorList = ref([]);
    const anchorTargetRef = ref();
    if (props.isSimple) {
      if (props.simpleDataIndex || props.simpleDataIndex === 0) {
        c.setSimpleDataIndex(props.simpleDataIndex);
      }
      c.evt.on("onMounted", () => {
        c.setSimpleData(props.data || {});
      });
      watch(() => props.data, (newVal) => {
        const changeVal = newVal || {};
        const originData = c.data instanceof ControlVO ? c.data.getOrigin() : c.data;
        let find = false;
        if (originData && Object.keys(originData) && changeVal && Object.keys(changeVal) && Object.keys(originData).length !== Object.keys(changeVal).length) {
          find = true;
        } else {
          find = !!Object.keys(originData).find((key) => {
            return changeVal[key] !== originData[key];
          });
        }
        if (find) {
          c.setSimpleData(changeVal);
        }
      }, {
        deep: true
      });
    }
    if (props.mdCtrlFormIndex || props.mdCtrlFormIndex === 0) {
      c.setMdCtrlFormIndex(props.mdCtrlFormIndex);
    }
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
    const handleInput = debounce((val) => {
      c.filterDetail(val);
    }, 300, {
      leading: true
    });
    return {
      c,
      ns,
      filter,
      anchorList,
      anchorTargetRef,
      handleInput,
      calcNavBarConfig,
      semanticClass,
      semanticStyle
    };
  },
  render() {
    const {
      showFormNavBar,
      enableItemFilter
    } = this.c.model;
    const content = createVNode("div", {
      "class": [this.ns.b(), this.ns.is("item-filter", enableItemFilter)]
    }, [enableItemFilter && createVNode(resolveComponent("el-input"), {
      "clearable": true,
      "modelValue": this.filter,
      "onUpdate:modelValue": ($event) => this.filter = $event,
      "onInput": this.handleInput,
      "class": [this.ns.e("quick-search"), this.semanticClass("search")],
      "style": this.semanticStyle("search"),
      "placeholder": ibiz.i18n.t("app.search")
    }, null), createVNode(resolveComponent("iBizFormControl"), {
      "ref": "anchorTargetRef",
      "controller": this.c
    }, {
      ...this.$slots
    })]);
    if (showFormNavBar) {
      return createVNode(resolveComponent("iBizAnchorContainer"), {
        "anchorList": this.anchorList.filter((item) => item.pageId === this.c.state.activeTab),
        "semantic": {
          root: {
            class: this.semanticClass("anchor"),
            style: this.semanticStyle("anchor")
          },
          item: {
            class: this.semanticClass("anchor.item"),
            style: this.semanticStyle("anchor.item")
          }
        },
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
