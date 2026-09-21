import { defineComponent, createVNode, resolveComponent, watch, reactive, h } from 'vue';
import { SearchFormController, ControlVO } from '@ibiz-template/runtime';
import { useControlController, useNamespace } from '@ibiz-template/vue3-util';
import { AdvanceSearch } from './advance-search/advance-search.mjs';
import './search-form.css';

"use strict";
const SearchFormControl = /* @__PURE__ */ defineComponent({
  name: "IBizSearchFormControl",
  props: {
    /**
     * @description 搜索表单模型数据
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
    }
  },
  setup(props) {
    const c = useControlController((...args) => new SearchFormController(...args));
    const ns = useNamespace("control-".concat(c.model.controlType.toLowerCase()));
    if (props.isSimple) {
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
    c.evt.on("onCreated", () => {
      const keys = Object.keys(c.details);
      keys.forEach((key) => {
        const detail = c.details[key];
        detail.state = reactive(detail.state);
      });
    });
    const openAdvanceSearch = async () => {
      const overlay = ibiz.overlay.createModal((modal) => {
        return h(AdvanceSearch, {
          controller: c,
          modal
        });
      }, {}, {
        width: "800px",
        height: "auto",
        closeOnClickModal: false
      });
      overlay.present();
      await overlay.onWillDismiss();
    };
    c.evt.on("openAdvanceSearch", () => openAdvanceSearch());
    return {
      c,
      ns
    };
  },
  render() {
    const {
      state
    } = this.c;
    if (!state.isCreated) {
      return;
    }
    return createVNode(resolveComponent("iBizFormControl"), {
      "class": [this.ns.b()],
      "controller": this.c,
      "onKeyup": (e) => this.c.onKeyUp(e)
    }, {
      ...this.$slots
    });
  }
});

export { SearchFormControl };
