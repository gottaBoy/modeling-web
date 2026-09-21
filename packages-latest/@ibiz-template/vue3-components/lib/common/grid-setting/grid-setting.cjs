'use strict';

var vue = require('vue');
var vue3Util = require('@ibiz-template/vue3-util');
var draggable = require('vuedraggable');
var core = require('@ibiz-template/core');
require('./grid-setting.css');

"use strict";
const IBizGridSetting = /* @__PURE__ */ vue.defineComponent({
  name: "IBizGridSetting",
  components: {
    draggable
  },
  props: {
    columnStates: {
      type: Array,
      required: true
    },
    controller: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const ns = vue3Util.useNamespace("grid-setting");
    const c = props.controller;
    const dragColumnStates = vue.computed(() => {
      const result = [];
      props.columnStates.forEach((item) => {
        if (!item.uaColumn) {
          result.push({
            ...item
          });
        }
      });
      return result;
    });
    const isDraggable = vue.computed(() => {
      return false;
    });
    const handleClick = (dragColumnState) => {
      const columnState = c.state.columnStates.find((state) => {
        return state.key === dragColumnState.key;
      });
      if (columnState) {
        c.setColumnVisible(columnState);
      }
    };
    const onDragChange = async (evt) => {
      if (evt.moved) {
        const newIndex = evt.moved.newIndex;
        const oldIndex = evt.moved.oldIndex;
        const movedDragColumnState = evt.moved.element;
        c.changeColumnStateSort(movedDragColumnState.key, newIndex, oldIndex);
      }
    };
    return {
      ns,
      c,
      dragColumnStates,
      isDraggable,
      handleClick,
      onDragChange
    };
  },
  render() {
    return vue.createVNode("div", {
      "class": this.ns.b()
    }, [vue.createVNode(vue.resolveComponent("el-popover"), {
      "placement": "right-start",
      "trigger": "click",
      "width": "auto"
    }, {
      reference: () => {
        return vue.createVNode("ion-icon", {
          "name": "options-outline",
          "class": this.ns.b("set-icon"),
          "title": core.showTitle(ibiz.i18n.t("component.gridSetting.hideControl"))
        }, null);
      },
      default: () => {
        return vue.createVNode(draggable, {
          "class": this.ns.b("column-states"),
          "modelValue": this.dragColumnStates,
          "onUpdate:modelValue": ($event) => this.dragColumnStates = $event,
          "group": this.c.model.id,
          "itemKey": "key",
          "sort": this.isDraggable,
          "force-fallback": true,
          "delay": 100,
          "animation": 500,
          "ghost-class": this.ns.b("column-state-ghost"),
          "filter": ".unmover",
          "onChange": (evt) => this.onDragChange(evt)
        }, {
          item: ({
            element: state
          }) => {
            return vue.createVNode("div", {
              "class": [this.ns.b("column-state"), this.ns.is("disabled", state.hidden), this.ns.is("fixed", !!state.fixed), !!state.fixed && "unmover"],
              "onClick": () => this.handleClick(state)
            }, [this.isDraggable && !state.fixed && vue.createVNode(vue.resolveComponent("iBizIcon"), {
              "class": this.ns.b("drag-icon"),
              "icon": {
                imagePath: "svg/drag.svg"
              },
              "baseDir": "iconfont"
            }, null), vue.createVNode(vue.resolveComponent("iBizIcon"), {
              "class": this.ns.b("disable-icon"),
              "icon": {
                imagePath: "svg/disable.svg"
              },
              "baseDir": "iconfont"
            }, null), vue.createVNode(vue.resolveComponent("iBizIcon"), {
              "class": this.ns.b("enable-icon"),
              "icon": {
                imagePath: "svg/enable.svg"
              },
              "baseDir": "iconfont"
            }, null), vue.createVNode("div", {
              "class": this.ns.b("state-caption")
            }, [state.caption])]);
          }
        });
      }
    }), this.c.state.enableNavView && this.c.state.showNavIcon ? !this.c.state.showNavView ? vue.createVNode("ion-icon", {
      "class": this.ns.e("nav-icon"),
      "title": ibiz.i18n.t("component.controlNavigation.showNav"),
      "name": "eye-outline",
      "onClick": () => this.c.onShowNavViewChange()
    }, null) : vue.createVNode("ion-icon", {
      "class": this.ns.e("nav-icon"),
      "title": ibiz.i18n.t("component.controlNavigation.hiddenNav"),
      "name": "eye-off-outline",
      "onClick": () => this.c.onShowNavViewChange()
    }, null) : null]);
  }
});

exports.IBizGridSetting = IBizGridSetting;
