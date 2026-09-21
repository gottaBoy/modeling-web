import { defineComponent, createVNode, resolveComponent, computed } from 'vue';
import { useNamespace } from '@ibiz-template/vue3-util';
import draggable from 'vuedraggable';
import { showTitle } from '@ibiz-template/core';
import './grid-setting.css';

"use strict";
const IBizGridSetting = /* @__PURE__ */ defineComponent({
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
    const ns = useNamespace("grid-setting");
    const c = props.controller;
    const dragColumnStates = computed(() => {
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
    const isDraggable = computed(() => {
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
    return createVNode("div", {
      "class": this.ns.b()
    }, [createVNode(resolveComponent("el-popover"), {
      "placement": "right-start",
      "trigger": "click",
      "width": "auto"
    }, {
      reference: () => {
        return createVNode("ion-icon", {
          "name": "options-outline",
          "class": this.ns.b("set-icon"),
          "title": showTitle(ibiz.i18n.t("component.gridSetting.hideControl"))
        }, null);
      },
      default: () => {
        return createVNode(draggable, {
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
            return createVNode("div", {
              "class": [this.ns.b("column-state"), this.ns.is("disabled", state.hidden), this.ns.is("fixed", !!state.fixed), !!state.fixed && "unmover"],
              "onClick": () => this.handleClick(state)
            }, [this.isDraggable && !state.fixed && createVNode(resolveComponent("iBizIcon"), {
              "class": this.ns.b("drag-icon"),
              "icon": {
                imagePath: "svg/drag.svg"
              },
              "baseDir": "iconfont"
            }, null), createVNode(resolveComponent("iBizIcon"), {
              "class": this.ns.b("disable-icon"),
              "icon": {
                imagePath: "svg/disable.svg"
              },
              "baseDir": "iconfont"
            }, null), createVNode(resolveComponent("iBizIcon"), {
              "class": this.ns.b("enable-icon"),
              "icon": {
                imagePath: "svg/enable.svg"
              },
              "baseDir": "iconfont"
            }, null), createVNode("div", {
              "class": this.ns.b("state-caption")
            }, [state.caption])]);
          }
        });
      }
    }), this.c.state.enableNavView && this.c.state.showNavIcon ? !this.c.state.showNavView ? createVNode("ion-icon", {
      "class": this.ns.e("nav-icon"),
      "title": ibiz.i18n.t("component.controlNavigation.showNav"),
      "name": "eye-outline",
      "onClick": () => this.c.onShowNavViewChange()
    }, null) : createVNode("ion-icon", {
      "class": this.ns.e("nav-icon"),
      "title": ibiz.i18n.t("component.controlNavigation.hiddenNav"),
      "name": "eye-off-outline",
      "onClick": () => this.c.onShowNavViewChange()
    }, null) : null]);
  }
});

export { IBizGridSetting };
