'use strict';

var vue = require('vue');
var vue3Util = require('@ibiz-template/vue3-util');
var core = require('@ibiz-template/core');
require('./grid-column-header.css');

"use strict";
function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !vue.isVNode(s);
}
const GridColumnHeader = /* @__PURE__ */ vue.defineComponent({
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
    const ns = vue3Util.useNamespace("grid-column-header");
    const c = props.controller;
    const content = vue.ref();
    const visible = vue.ref(false);
    const curValue = vue.ref();
    const filterValue = vue.computed(() => {
      var _a, _b;
      const filterName = (_b = (_a = c.model.filterEditor) == null ? void 0 : _a.id) == null ? void 0 : _b.toLowerCase();
      return filterName ? c.grid.state.columnFilter[filterName] : void 0;
    });
    let funcs;
    const onShow = () => {
      if (funcs)
        return funcs.proceed();
      funcs = vue3Util.useClickOutside(content, (evt) => {
        const classList = [];
        core.eventPath(evt).forEach((e) => {
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
    vue.onUnmounted(() => {
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
    return vue.createVNode("div", {
      "class": this.ns.b()
    }, [vue.createVNode("div", {
      "class": this.ns.e("caption")
    }, [vue.createVNode(vue.resolveComponent("iBizIcon"), {
      "class": this.ns.em("caption", "icon"),
      "icon": this.c.model.sysImage
    }, null), vue.createVNode("span", {
      "class": this.ns.em("caption", "label")
    }, [this.c.model.caption])]), this.c.filterEditorProvider && vue.createVNode(vue.resolveComponent("el-popover"), {
      "width": 220,
      "onShow": this.onShow,
      "onHide": this.onHide,
      "visible": this.visible,
      "popper-class": this.ns.e("popover")
    }, {
      reference: () => {
        return vue.createVNode("ion-icon", {
          "name": "funnel",
          "title": ibiz.i18n.t("app.search"),
          "class": [this.ns.em("filter", "icon"), this.ns.is("active", !!this.filterValue)],
          "onClick": this.onClick
        }, null);
      },
      default: () => {
        let _slot, _slot2;
        return vue.createVNode("div", {
          "ref": "content",
          "class": this.ns.em("popover", "content")
        }, [vue.createVNode("div", {
          "class": this.ns.em("popover", "editor")
        }, [vue.h(vue.resolveComponent(this.c.filterEditorProvider.gridEditor), {
          data: {},
          autoFocus: true,
          value: this.curValue,
          onChange: this.onFilterChange,
          controller: this.c.filterEditor
        })]), vue.createVNode("div", {
          "class": this.ns.em("popover", "bottom")
        }, [vue.createVNode(vue.resolveComponent("el-button"), {
          "type": "text",
          "onClick": this.onScreen
        }, _isSlot(_slot = ibiz.i18n.t("app.search")) ? _slot : {
          default: () => [_slot]
        }), vue.createVNode(vue.resolveComponent("el-button"), {
          "type": "text",
          "onClick": this.onReset
        }, _isSlot(_slot2 = ibiz.i18n.t("app.reset")) ? _slot2 : {
          default: () => [_slot2]
        })])]);
      }
    })]);
  }
});

exports.GridColumnHeader = GridColumnHeader;
