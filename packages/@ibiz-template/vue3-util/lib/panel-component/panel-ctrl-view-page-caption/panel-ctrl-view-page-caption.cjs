'use strict';

var vue = require('vue');
require('../../use/index.cjs');
var namespace = require('../../use/namespace/namespace.cjs');

"use strict";
const PanelCtrlViewPageCaption = /* @__PURE__ */ vue.defineComponent({
  name: "IBizPanelCtrlViewPageCaption",
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
    const ns = namespace.useNamespace("panel-ctrl-view-page-caption");
    const classArr = vue.computed(() => {
      const {
        id
      } = props.modelData;
      const result = [ns.b(), ns.m(id)];
      result.push(...props.controller.containerClass);
      return result;
    });
    return {
      ns,
      classArr
    };
  },
  render() {
    let editor = null;
    if (this.controller.data) {
      editor = vue.createVNode("span", {
        "class": this.ns.b("content")
      }, [this.controller.state.caption]);
    }
    return vue.createVNode("div", {
      "class": this.classArr,
      "onClick": () => {
        this.controller.onClick();
      }
    }, [editor]);
  }
});

exports.PanelCtrlViewPageCaption = PanelCtrlViewPageCaption;
