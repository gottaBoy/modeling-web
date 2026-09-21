import { defineComponent, ref, computed, createVNode } from 'vue';
import '../../use/index.mjs';
import './teleport-placeholder.css';
import { useNamespace } from '../../use/namespace/namespace.mjs';

"use strict";
const TeleportPlaceholder = /* @__PURE__ */ defineComponent({
  name: "IBizTeleportPlaceholder",
  props: {
    modelData: {
      type: Object,
      required: true
    },
    controller: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const ns = useNamespace("teleport-placeholder");
    const tempStyle = ref("");
    const {
      rawItem
    } = props.modelData;
    if (rawItem && rawItem.cssStyle) {
      tempStyle.value = rawItem.cssStyle;
    }
    const classArr = computed(() => {
      const {
        id
      } = props.modelData;
      const result = [ns.b(), ns.m(id)];
      result.push(...props.controller.containerClass);
      return result;
    });
    return {
      ns,
      classArr,
      tempStyle
    };
  },
  render() {
    if (!this.controller.state.visible) {
      return;
    }
    return createVNode("div", {
      "id": this.controller.state.teleportTag,
      "class": this.classArr,
      "style": this.tempStyle
    }, null);
  }
});

export { TeleportPlaceholder };
