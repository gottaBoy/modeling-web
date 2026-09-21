import { defineComponent, resolveComponent, h, createVNode, reactive, computed } from 'vue';
import { ScriptFactory, PredefinedControlRender } from '@ibiz-template/runtime';
import { fixJsonString } from '@ibiz-template/core';
import { isNil } from 'ramda';
import '../../use/index.mjs';
import './control-base.css';
import { useNamespace } from '../../use/namespace/namespace.mjs';

"use strict";
const IBizControlBase = /* @__PURE__ */ defineComponent({
  name: "IBizControlBase",
  props: {
    controller: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const ns = useNamespace("control");
    const {
      controlType,
      sysCss,
      codeName
    } = props.controller.model;
    const typeClass = controlType.toLowerCase();
    const sysCssName = sysCss == null ? void 0 : sysCss.cssName;
    const model = props.controller.model;
    const controls = props.controller.model.controls;
    const onLayoutPanelCreated = (controller) => {
      props.controller.setLayoutPanel(controller);
    };
    const inlineStyle = reactive({});
    if (model.controlType.endsWith("EXPBAR") === false) {
      if (!isNil(model.width)) {
        if (model.width > 0 && model.width <= 1) {
          inlineStyle.width = "".concat(model.width * 100, "%");
        } else {
          inlineStyle.width = "".concat(model.width, "px");
        }
      }
      if (!isNil(model.height)) {
        if (model.height > 0 && model.height <= 1) {
          inlineStyle.width = "".concat(model.height * 100, "%");
        } else {
          inlineStyle.height = "".concat(model.height, "px");
        }
      }
    }
    const handleHtmlEvent = async (e, eventName) => {
      e.stopPropagation();
      const scriptCode = e.target.getAttribute(eventName);
      const data = e.target.getAttribute("data");
      const context = props.controller.context.clone();
      const _context = e.target.getAttribute("context");
      if (_context) {
        Object.assign(context, fixJsonString(_context));
      }
      const params = {
        ...props.controller.params
      };
      const _params = e.target.getAttribute("params");
      if (_params) {
        Object.assign(params, fixJsonString(_params));
      }
      if (scriptCode) {
        await ScriptFactory.asyncExecScriptFn({
          ...props.controller.getEventArgs(),
          context,
          params,
          data: data ? fixJsonString(data) : null
        }, scriptCode);
      }
    };
    const getControlRender = (data) => {
      var _a;
      let controlRenders = model.controlRenders ? model.controlRenders.filter((item) => !Object.values(PredefinedControlRender).includes(item.id) && item.renderType === "LAYOUTPANEL_MODEL") : void 0;
      if (controlRenders && controlRenders.length > 0 && model.controlType === "DASHBOARD") {
        controlRenders = controlRenders.filter((item) => !(item.id.endsWith("_header") || item.id.endsWith("_header_caption") || item.id.endsWith("_header_bg") || item.id.endsWith("_header_action")));
      }
      if (!controlRenders || controlRenders.length === 0) {
        return void 0;
      }
      const controlRender = controlRenders[0];
      if (controlRender.layoutPanelModel) {
        const htmlCode = ScriptFactory.execScriptFn({
          ...props.controller.getEventArgs(),
          data
        }, controlRender.layoutPanelModel, {
          isAsync: false
        });
        return createVNode("div", {
          "innerHTML": htmlCode,
          "onClick": (e) => handleHtmlEvent(e, "click"),
          "onDblclick": (e) => handleHtmlEvent(e, "dbclick"),
          "class": [ns.e("control-render"), ns.e((_a = controlRender.renderName) == null ? void 0 : _a.toLowerCase())]
        }, null);
      }
    };
    const customRender = computed(() => {
      const data = props.controller.data || props.controller.items;
      return getControlRender(data);
    });
    const disableMaskInfoRender = () => {
      const disableRender = model.controlRenders ? model.controlRenders.find((item) => item.id === PredefinedControlRender.DISABLEPANEL) : void 0;
      if (!disableRender) {
        return createVNode("div", {
          "innerHTML": props.controller.state.maskOption.maskInfo || "",
          "class": [ns.e("disable-mask-text")]
        }, null);
      }
      if (disableRender.renderType === "LAYOUTPANEL_MODEL" && disableRender.layoutPanelModel) {
        const htmlCode = ScriptFactory.execScriptFn({
          ...props.controller.getEventArgs()
        }, disableRender.layoutPanelModel, {
          isAsync: false,
          singleRowReturn: true
        });
        return createVNode("div", {
          "innerHTML": htmlCode,
          "class": [ns.e("disable-mask-text")]
        }, null);
      }
      if (disableRender.renderType === "LAYOUTPANEL" && disableRender.layoutPanel) {
        return createVNode(resolveComponent("iBizControlShell"), {
          "class": [ns.e("disable-mask-text")],
          "data": {},
          "params": props.controller.params,
          "context": props.controller.context,
          "modelData": disableRender.layoutPanel
        }, null);
      }
    };
    return {
      ns,
      typeClass,
      sysCssName,
      inlineStyle,
      codeName,
      controls,
      customRender,
      disableMaskInfoRender,
      onLayoutPanelCreated
    };
  },
  render() {
    var _a, _b, _c;
    const {
      state,
      controlPanel,
      providers
    } = this.controller;
    let layoutPanel = null;
    if (state.isCreated && controlPanel) {
      const slots = {
        ...this.$slots
      };
      if ((_a = this.controls) == null ? void 0 : _a.length) {
        this.controls.forEach((ctrl) => {
          const slotKey = ctrl.name;
          const ctrlProps = {
            context: this.controller.context,
            params: this.controller.params
          };
          const outCtrlSlot = slots[slotKey];
          if (outCtrlSlot) {
            slots[slotKey] = () => {
              return outCtrlSlot(ctrlProps);
            };
          } else {
            slots[slotKey] = () => {
              const comp = resolveComponent("IBizControlShell");
              return h(comp, {
                modelData: ctrl,
                ...ctrlProps
              });
            };
          }
        });
      }
      const provider = providers[controlPanel.name];
      layoutPanel = h(resolveComponent(provider.component), {
        modelData: controlPanel,
        context: this.controller.context,
        params: this.controller.params,
        provider,
        container: this.controller,
        onControllerAppear: this.onLayoutPanelCreated
      }, slots);
    }
    return createVNode("div", {
      "class": [this.ns.b(), this.ns.b(this.typeClass), this.ns.m(this.codeName), this.sysCssName, this.ns.is("disabled", state.disabled), this.ns.is("mob", ibiz.env.isMob)],
      "style": this.inlineStyle
    }, [this.customRender || layoutPanel || ((_c = (_b = this.$slots).default) == null ? void 0 : _c.call(_b)), state.disabled && createVNode("div", {
      "class": [this.ns.e("mask-container"), this.ns.m(state.maskOption.mode.toLowerCase())]
    }, [state.maskOption.mode === "MASK" && this.disableMaskInfoRender()])]);
  }
});

export { IBizControlBase };
