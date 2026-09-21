'use strict';

var vue = require('vue');
require('../../use/index.cjs');
var panelField_controller = require('./panel-field.controller.cjs');
require('./panel-field.css');
var tooltip = require('../../use/tooltip/tooltip.cjs');
var namespace = require('../../use/namespace/namespace.cjs');
var useSemanticNode = require('../../use/use-semantic-node/use-semantic-node.cjs');

"use strict";
const PanelField = /* @__PURE__ */ vue.defineComponent({
  name: "IBizPanelField",
  props: {
    /**
     * @description 面板项模型数据
     */
    modelData: {
      type: Object,
      required: true
    },
    /**
     * @description 面板项控制器
     */
    controller: {
      type: panelField_controller.PanelFieldController,
      required: true
    },
    /**
     * @description 面板项属性
     */
    attrs: {
      type: Object,
      require: false
    }
  },
  setup(props) {
    const ns = namespace.useNamespace("panel-field");
    const {
      semanticClass,
      semanticStyle
    } = useSemanticNode.useSemanticNode(props.controller);
    const classArr = vue.computed(() => {
      const {
        id
      } = props.modelData;
      const result = [ns.b(), ns.m(id), ns.is("error", !!props.controller.state.error), ns.is("mob", window.Environment && window.Environment.isMob)];
      return result;
    });
    const onValueChange = (val, name) => {
      props.controller.setDataValue(val, name);
    };
    const showTitle = vue.computed(() => {
      const {
        controlRenders = [],
        id
      } = props.modelData;
      return !controlRenders.some((renderItem) => renderItem.id === "".concat(id == null ? void 0 : id.toLowerCase(), "_tooltip"));
    });
    return {
      ns,
      classArr,
      showTitle,
      onValueChange,
      semanticClass,
      semanticStyle
    };
  },
  render() {
    let editor = null;
    if (this.controller.data) {
      const editorProps = {
        value: this.controller.value,
        data: this.controller.data,
        controller: this.controller.editor,
        disabled: this.controller.state.disabled,
        class: [this.ns.b("content"), ibiz.config.common.enhancedUI === true ? this.controller.containerClass : "", this.semanticClass("content")],
        style: [this.semanticStyle("content")],
        showTitle: this.showTitle,
        readonly: this.controller.state.readonly,
        onChange: this.onValueChange,
        onFocus: (event) => this.controller.onFocus(event),
        onBlur: (event) => this.controller.onBlur(event),
        onEnter: (event) => this.controller.onEnter(event),
        ...this.attrs
      };
      if (this.$slots.default) {
        editor = this.$slots.default(editorProps);
      } else if (this.controller.editorProvider) {
        const component = vue.resolveComponent(this.controller.editorProvider.formEditor);
        editor = vue.h(component, {
          ...editorProps
        });
      } else {
        editor = vue.createVNode(vue.resolveComponent("not-supported-editor"), {
          "modelData": this.modelData.editor
        }, null);
      }
    }
    return vue.withDirectives(vue.createVNode("div", {
      "class": [this.classArr, ibiz.config.common.enhancedUI === false ? this.controller.containerClass : "", this.semanticClass("root")],
      "style": this.semanticStyle("root"),
      "onClick": (event) => this.controller.onClick(event)
    }, [editor, this.controller.state.error && vue.createVNode("div", {
      "class": [this.ns.e("error"), this.semanticClass("error")],
      "style": this.semanticStyle("error")
    }, [this.controller.state.error])]), [[vue.resolveDirective("tooltip"), tooltip.renderTooltip(this.controller.data, this.controller.model, this.controller.panel)]]);
  }
});

exports.PanelField = PanelField;
