'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var vue3Util = require('@ibiz-template/vue3-util');
require('./composite-form-item-ex.css');

"use strict";
const CompositeFormItemEx = /* @__PURE__ */ vue.defineComponent({
  name: "IBizCompositeFormItemEx",
  props: {
    modelData: {
      type: Object,
      required: true
    },
    controller: {
      type: Object,
      required: true
    },
    attrs: {
      type: Object,
      required: false
    }
  },
  setup(props) {
    const ns = vue3Util.useNamespace("form-item");
    const ns2 = vue3Util.useNamespace("composite-form-item-ex");
    const c = props.controller;
    const onValueChange = (val, name, ignore = false) => {
      props.controller.setDataValue(val, name, ignore);
    };
    const loading = vue.ref(true);
    const editorRef = vue.ref();
    vue.watch(() => {
      var _a, _b;
      return (_b = props.controller.data) == null ? void 0 : _b[((_a = c.valueItem) == null ? void 0 : _a.id) || ""];
    }, (value) => {
      if (value) {
        c.updateEditor(value);
      } else {
        c.updateEditor(c.defaultType);
      }
    }, {
      immediate: true
    });
    vue.watch(() => editorRef.value, (value) => {
      if (value) {
        loading.value = false;
      } else {
        loading.value = true;
      }
    });
    return {
      ns,
      ns2,
      c,
      editorRef,
      loading,
      onValueChange
    };
  },
  render() {
    var _a, _b, _c, _d, _e, _f, _g;
    if (!this.c.state.visible || ((_a = this.c.model.editor) == null ? void 0 : _a.editorType) === "HIDDEN") {
      return null;
    }
    const editorType = (_b = this.c.editor) == null ? void 0 : _b.model.editorType;
    const editorStyle = ((_c = this.c.editor) == null ? void 0 : _c.model.editorStyle) || "DEFAULT";
    const isIncludes = this.c.includesList.some((id) => id === "".concat(editorType, "_").concat(editorStyle));
    const editorSwitchMenu = vue.createVNode(vue.resolveComponent("el-popover"), {
      "trigger": "click",
      "popper-class": this.ns2.b("menu-popover"),
      "offset": 0,
      "disabled": this.c.disableSwitch
    }, {
      reference: () => {
        const option = this.c.switchOptions.find((item) => item.id === this.c.state.editorId);
        return vue.createVNode("div", {
          "class": [this.ns2.b("menu"), this.ns2.is("disabled", this.c.disableSwitch)]
        }, [vue.createVNode("div", {
          "class": this.ns2.be("menu", "text-icon")
        }, [vue.createVNode(vue.resolveComponent("iBizIcon"), {
          "icon": option == null ? void 0 : option.icon
        }, null)]), vue.createVNode("div", {
          "class": this.ns2.be("menu", "text")
        }, [(option == null ? void 0 : option.name) || this.c.state.editorId]), vue.createVNode("div", {
          "class": this.ns2.be("menu", "icon")
        }, [vue.createVNode("svg", {
          "xmlns": "http://www.w3.org/2000/svg",
          "viewBox": "0 0 1024 1024"
        }, [vue.createVNode("path", {
          "fill": "currentColor",
          "d": "M831.872 340.864 512 652.672 192.128 340.864a30.59 30.59 0 0 0-42.752 0 29.12 29.12 0 0 0 0 41.6L489.664 714.24a32 32 0 0 0 44.672 0l340.288-331.712a29.12 29.12 0 0 0 0-41.728 30.59 30.59 0 0 0-42.752 0z"
        }, null)])])]);
      },
      default: () => {
        return vue.createVNode("div", {
          "class": this.ns2.b("menu-content")
        }, [this.c.switchOptions.map((option) => {
          return vue.createVNode("div", {
            "class": [this.ns2.b("menu-item"), this.ns2.is("active", option.id === this.c.state.editorId)],
            "onClick": () => {
              this.c.handleEditorSwitch(option.id);
            }
          }, [vue.createVNode("svg", {
            "viewBox": "0 0 1446 1024",
            "class": this.ns2.be("menu-item", "icon")
          }, [vue.createVNode("path", {
            "d": "M574.116299 786.736392 1238.811249 48.517862C1272.390222 11.224635 1329.414799 7.827718 1366.75664 41.450462 1403.840015 74.840484 1406.731043 132.084741 1373.10189 169.433699L655.118888 966.834607C653.072421 969.716875 650.835807 972.514337 648.407938 975.210759 615.017957 1012.29409 558.292155 1015.652019 521.195664 982.250188L72.778218 578.493306C35.910826 545.297758 32.859041 488.584019 66.481825 451.242134 99.871807 414.158803 156.597563 410.800834 193.694055 444.202665L574.116299 786.736392Z"
          }, null)]), vue.createVNode("div", {
            "class": this.ns2.be("menu-item", "text-icon")
          }, [vue.createVNode(vue.resolveComponent("iBizIcon"), {
            "icon": option.icon
          }, null)]), vue.createVNode("span", {
            "class": this.ns2.be("menu-item", "text")
          }, [option.name])]);
        })]);
      }
    });
    let editor = null;
    const compositeItem = this.c.model.compositeItem;
    const editMode = (_f = (_e = (_d = this.c.editor) == null ? void 0 : _d.model) == null ? void 0 : _e.editorParams) == null ? void 0 : _f.editMode;
    const editorProps = {
      ref: "editorRef",
      key: this.c.state.editorId,
      style: (_g = this.c.editor) == null ? void 0 : _g.style,
      value: this.c.value,
      data: this.c.data,
      controller: this.c.editor,
      disabled: this.c.state.disabled,
      readonly: this.c.state.readonly,
      onChange: this.onValueChange,
      controlParams: editMode ? {
        ...this.c.form.controlParams,
        editmode: editMode
      } : this.c.form.controlParams,
      onFocus: (event) => this.c.onFocus(event),
      onBlur: (event) => this.c.onBlur(event),
      onEnter: (event) => this.c.onEnter(event),
      onClick: (event, params) => this.c.onClick(event, params),
      ...this.attrs
    };
    if (this.$slots.default) {
      editor = this.$slots.default(editorProps);
    } else if (this.c.editorProvider) {
      const component = vue.resolveComponent(this.c.editorProvider.formEditor);
      if (isIncludes && !this.c.hiddenSwitch) {
        editor = vue.h(component, {
          ...editorProps
        }, {
          editorSwitchMenu: () => editorSwitchMenu
        });
      } else {
        editor = vue.h(component, {
          ...editorProps
        });
      }
    } else {
      editor = vue.createVNode(vue.resolveComponent("not-supported-editor"), {
        "modelData": this.modelData.editor,
        "context": this.c.context
      }, null);
    }
    return vue.createVNode(vue.resolveComponent("iBizFormItemContainer"), {
      "id": "".concat(this.c.form.view.model.codeName, "_").concat(this.c.form.model.codeName, "_").concat(this.modelData.codeName),
      "class": [this.ns.b(), this.ns2.b(), this.ns.m(this.modelData.id), this.ns.is("compositeItem", compositeItem), ...this.c.containerClass],
      "style": this.modelData.cssStyle,
      "controller": this.c,
      "onClick": (event) => this.c.onClick(event)
    }, {
      default: () => [vue.withDirectives(vue.createVNode("div", {
        "class": [this.ns2.e("editor"), this.ns2.is("hidden-switch", this.c.hiddenSwitch)]
      }, [editor, !this.loading && !isIncludes && !this.c.hiddenSwitch && editorSwitchMenu]), [[vue.resolveDirective("loading"), this.loading]])]
    });
  }
});

exports.CompositeFormItemEx = CompositeFormItemEx;
exports.default = CompositeFormItemEx;
