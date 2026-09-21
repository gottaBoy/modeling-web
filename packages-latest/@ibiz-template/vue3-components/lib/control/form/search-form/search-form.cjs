'use strict';

var vue = require('vue');
var runtime = require('@ibiz-template/runtime');
var vue3Util = require('@ibiz-template/vue3-util');
var advanceSearch = require('./advance-search/advance-search.cjs');
require('./search-form.css');

"use strict";
const SearchFormControl = /* @__PURE__ */ vue.defineComponent({
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
    const c = vue3Util.useControlController((...args) => new runtime.SearchFormController(...args));
    const ns = vue3Util.useNamespace("control-".concat(c.model.controlType.toLowerCase()));
    if (props.isSimple) {
      c.evt.on("onMounted", () => {
        c.setSimpleData(props.data || {});
      });
      vue.watch(() => props.data, (newVal) => {
        const changeVal = newVal || {};
        const originData = c.data instanceof runtime.ControlVO ? c.data.getOrigin() : c.data;
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
        detail.state = vue.reactive(detail.state);
      });
    });
    const openAdvanceSearch = async () => {
      const overlay = ibiz.overlay.createModal((modal) => {
        return vue.h(advanceSearch.AdvanceSearch, {
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
    return vue.createVNode(vue.resolveComponent("iBizFormControl"), {
      "class": [this.ns.b()],
      "controller": this.c,
      "onKeyup": (e) => this.c.onKeyUp(e)
    }, {
      ...this.$slots
    });
  }
});

exports.SearchFormControl = SearchFormControl;
