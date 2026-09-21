import { isVNode, defineComponent, createVNode, resolveComponent, h, ref, computed, onUnmounted } from 'vue';
import { useNamespace, useClickOutside } from '@ibiz-template/vue3-util';
import { eventPath } from '@ibiz-template/core';
import './grid-column-header.css';

"use strict";
function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !isVNode(s);
}
const GridColumnHeader = /* @__PURE__ */ defineComponent({
  name: "IBizGridColumnHeader",
  props: {
    controller: {
      type: Object,
      required: true
    },
    column: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const ns = useNamespace("grid-column-header");
    const c = props.controller;
    const content = ref();
    const visible = ref(false);
    const curValue = ref();
    const filterValue = computed(() => {
      var _a, _b;
      const filterName = (_b = (_a = c.model.filterEditor) == null ? void 0 : _a.id) == null ? void 0 : _b.toLowerCase();
      return filterName ? c.grid.state.columnFilter[filterName] : void 0;
    });
    let funcs;
    const onShow = () => {
      if (funcs)
        return funcs.proceed();
      funcs = useClickOutside(content, (evt) => {
        const classList = [];
        eventPath(evt).forEach((e) => {
          if (e && e.classList) {
            classList.push(...e.classList);
          }
        });
        if (classList.includes("el-popper"))
          return;
        visible.value = false;
      });
    };
    const onHide = () => {
      curValue.value = filterValue.value;
      funcs == null ? void 0 : funcs.pause();
    };
    const onFilterChange = (val, _name) => {
      curValue.value = val;
    };
    const onScreen = () => {
      visible.value = false;
      c.handleColumnScreen(curValue.value);
    };
    const onReset = () => {
      curValue.value = void 0;
      onScreen();
    };
    const onClick = (e) => {
      e.stopPropagation();
      visible.value = true;
    };
    onUnmounted(() => {
      funcs == null ? void 0 : funcs.stop();
    });
    return {
      c,
      ns,
      visible,
      content,
      curValue,
      filterValue,
      onShow,
      onHide,
      onReset,
      onClick,
      onScreen,
      onFilterChange
    };
  },
  render() {
    return createVNode("div", {
      "class": this.ns.b()
    }, [createVNode("div", {
      "class": this.ns.e("caption")
    }, [createVNode(resolveComponent("iBizIcon"), {
      "class": this.ns.em("caption", "icon"),
      "icon": this.c.model.sysImage
    }, null), createVNode("span", {
      "class": this.ns.em("caption", "label")
    }, [this.c.model.caption])]), this.c.filterEditorProvider && createVNode(resolveComponent("el-popover"), {
      "width": 220,
      "onShow": this.onShow,
      "onHide": this.onHide,
      "visible": this.visible,
      "popper-class": this.ns.e("popover")
    }, {
      reference: () => {
        return createVNode("ion-icon", {
          "name": "funnel",
          "title": ibiz.i18n.t("app.search"),
          "class": [this.ns.em("filter", "icon"), this.ns.is("active", !!this.filterValue)],
          "onClick": this.onClick
        }, null);
      },
      default: () => {
        let _slot, _slot2;
        return createVNode("div", {
          "ref": "content",
          "class": this.ns.em("popover", "content")
        }, [createVNode("div", {
          "class": this.ns.em("popover", "editor")
        }, [h(resolveComponent(this.c.filterEditorProvider.gridEditor), {
          data: {},
          autoFocus: true,
          value: this.curValue,
          onChange: this.onFilterChange,
          controller: this.c.filterEditor
        })]), createVNode("div", {
          "class": this.ns.em("popover", "bottom")
        }, [createVNode(resolveComponent("el-button"), {
          "type": "text",
          "onClick": this.onScreen
        }, _isSlot(_slot = ibiz.i18n.t("app.search")) ? _slot : {
          default: () => [_slot]
        }), createVNode(resolveComponent("el-button"), {
          "type": "text",
          "onClick": this.onReset
        }, _isSlot(_slot2 = ibiz.i18n.t("app.reset")) ? _slot2 : {
          default: () => [_slot2]
        })])]);
      }
    })]);
  }
});

export { GridColumnHeader };
