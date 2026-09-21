import { isVNode, defineComponent, h, createVNode, resolveComponent } from 'vue';
import { useNamespace } from '@ibiz-template/vue3-util';
import { FilterPortletController } from '@ibiz-template/runtime';
import { FilterPortletItem } from './filter-portlet-item/filter-portlet-item.mjs';
import './filter-portlet.css';

"use strict";
function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !isVNode(s);
}
const FilterPortlet = /* @__PURE__ */ defineComponent({
  name: "IBizFilterPortlet",
  props: {
    modelData: {
      type: Object,
      required: true
    },
    controller: {
      type: FilterPortletController,
      required: true
    }
  },
  setup(props) {
    var _a;
    const c = props.controller;
    const ns = useNamespace("portlet-".concat((_a = props.modelData.portletType) == null ? void 0 : _a.toLowerCase()));
    const handleReset = () => {
      c.resetFilter();
    };
    const handleSearch = () => {
      c.search();
    };
    const renderFilterItem = (filterNode, index) => {
      const field = c.jsonSchemaFields.find((x) => x.appDEFieldId === filterNode.field);
      if (field) {
        return h(FilterPortletItem, {
          field,
          filterNode,
          context: c.context,
          params: c.params,
          onChange: (data) => {
            c.state.filterNode.children[index] = data;
          }
        });
      }
    };
    const renderFilter = () => {
      if (!c.state.filterNode) {
        return;
      }
      const children = c.state.filterNode.children || [];
      return children.map((node, index) => {
        return renderFilterItem(node, index);
      });
    };
    return {
      ns,
      handleReset,
      handleSearch,
      renderFilter
    };
  },
  render() {
    let _slot, _slot2;
    const classArr = [this.ns.b(), this.ns.m(this.modelData.codeName), ...this.controller.containerClass];
    return createVNode(resolveComponent("iBizPortletLayout"), {
      "controller": this.controller,
      "class": classArr
    }, {
      default: () => [createVNode("div", {
        "class": this.ns.e("left")
      }, [this.renderFilter()]), createVNode("div", {
        "class": this.ns.e("right")
      }, [createVNode(resolveComponent("el-button"), {
        "onClick": this.handleReset
      }, _isSlot(_slot = ibiz.i18n.t("app.reset")) ? _slot : {
        default: () => [_slot]
      }), createVNode(resolveComponent("el-button"), {
        "onClick": this.handleSearch
      }, _isSlot(_slot2 = ibiz.i18n.t("app.search")) ? _slot2 : {
        default: () => [_slot2]
      })])]
    });
  }
});

export { FilterPortlet };
