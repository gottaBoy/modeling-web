'use strict';

var vue = require('vue');
var draggable = require('vuedraggable');
var vue3Util = require('@ibiz-template/vue3-util');
require('./mdctrl-container.css');
var core = require('@ibiz-template/core');
var runtime = require('@ibiz-template/runtime');

"use strict";
function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !vue.isVNode(s);
}
const MDCtrlContainer = /* @__PURE__ */ vue.defineComponent({
  name: "IBizMDCtrlContainer",
  components: {
    draggable
  },
  props: {
    enableCreate: {
      type: Boolean,
      required: true
    },
    enableDelete: {
      type: Boolean,
      required: true
    },
    items: {
      type: Object,
      required: true
    },
    userStyle: {
      type: String
    },
    enableSort: {
      type: Boolean,
      required: false
    },
    controller: {
      type: runtime.FormMDCtrlController,
      required: true
    }
  },
  emits: {
    addClick: () => true,
    removeClick: (_data, _index) => true,
    dragChange: (_draggedIndex, _targetIndex) => true
  },
  setup(props, {
    emit,
    slots
  }) {
    const ns = vue3Util.useNamespace("mdctrl-container");
    const ns2 = vue3Util.useNamespace("form-mdctrl");
    const {
      semanticClass,
      semanticStyle
    } = vue3Util.useSemanticNode(props.controller.form);
    const dragClssName = ns.be("item", "icon-drag");
    const showActions = vue.computed(() => {
      return props.enableCreate || props.enableDelete;
    });
    const dragItems = vue.computed(() => [...props.items]);
    const handleDragChange = (_params) => {
      const {
        moved
      } = _params;
      const draggedIndex = moved.oldIndex;
      const targetIndex = moved.newIndex;
      emit("dragChange", draggedIndex, targetIndex);
    };
    const renderDragBtn = () => {
      return vue.createVNode("div", {
        "class": [dragClssName]
      }, [vue.createVNode("svg", {
        "viewBox": "0 0 16 16",
        "xmlns": "http://www.w3.org/2000/svg",
        "height": "1em",
        "width": "1em",
        "preserveAspectRatio": "xMidYMid meet",
        "focusable": "false"
      }, [vue.createVNode("g", {
        "stroke-width": "1",
        "fill-rule": "evenodd"
      }, [vue.createVNode("g", {
        "transform": "translate(5 1)",
        "fill-rule": "nonzero"
      }, [vue.createVNode("path", {
        "d": "M1 2a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm4 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2zM1 6a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm4 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm-4 4a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm4 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm-4 4a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm4 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"
      }, null)])])])]);
    };
    const renderAddBtn = () => {
      let _slot;
      return vue.createVNode(vue.resolveComponent("el-button"), {
        "class": [ns.be("item-actions", "create"), ns.be("item-actions", "btn"), ns2.b("button"), semanticClass("mdctrl.button", {
          mdctrl: props.controller,
          tag: "create"
        })],
        "style": semanticStyle("mdctrl.button", {
          mdctrl: props.controller,
          tag: "create"
        }),
        "onClick": () => emit("addClick")
      }, _isSlot(_slot = ibiz.i18n.t("app.add")) ? _slot : {
        default: () => [_slot]
      });
    };
    const renderRemoveBtn = (item, index) => {
      let _slot3;
      if (!props.enableDelete)
        return null;
      if (ibiz.config.form.mdCtrlConfirmBeforeRemove) {
        return vue.createVNode(vue.resolveComponent("el-popconfirm"), {
          "title": core.showTitle(ibiz.i18n.t("control.form.mdCtrlContainer.promptInformation")),
          "confirm-button-text": ibiz.i18n.t("app.confirm"),
          "cancel-button-text": ibiz.i18n.t("app.cancel"),
          "onConfirm": () => emit("removeClick", item, index)
        }, {
          reference: () => {
            let _slot2;
            return vue.createVNode(vue.resolveComponent("el-button"), {
              "type": "danger",
              "class": [ns.be("item-actions", "remove"), ns.be("item-actions", "btn"), ns2.b("button"), semanticClass("mdctrl.button", {
                mdctrl: props.controller,
                tag: "remove"
              })],
              "style": semanticStyle("mdctrl.button", {
                mdctrl: props.controller,
                tag: "remove"
              })
            }, _isSlot(_slot2 = ibiz.i18n.t("app.delete")) ? _slot2 : {
              default: () => [_slot2]
            });
          }
        });
      }
      return vue.createVNode(vue.resolveComponent("el-button"), {
        "type": "danger",
        "class": [ns.be("item-actions", "remove"), ns.be("item-actions", "btn"), ns2.b("button"), semanticClass("mdctrl.button", {
          mdctrl: props.controller,
          tag: "remove"
        })],
        "style": semanticStyle("mdctrl.button", {
          mdctrl: props.controller,
          tag: "remove"
        }),
        "onClick": () => emit("removeClick", item, index)
      }, _isSlot(_slot3 = ibiz.i18n.t("app.delete")) ? _slot3 : {
        default: () => [_slot3]
      });
    };
    const renderStyle2AddBtn = () => {
      return vue.createVNode(vue.resolveComponent("el-button"), {
        "class": [ns.be("style2-item-actions", "create"), ns.be("style2-item-actions", "btn"), ns2.b("button"), semanticClass("mdctrl.button", {
          mdctrl: props.controller,
          tag: "create"
        })],
        "style": semanticStyle("mdctrl.button", {
          mdctrl: props.controller,
          tag: "create"
        }),
        "title": ibiz.i18n.t("app.add"),
        "onClick": () => emit("addClick")
      }, {
        default: () => [vue.createVNode("ion-icon", {
          "name": "add-outline"
        }, null), ibiz.i18n.t("app.add")]
      });
    };
    const renderStyle2RemoveBtn = (item, index) => {
      let _slot4;
      if (!props.enableDelete)
        return null;
      if (ibiz.config.form.mdCtrlConfirmBeforeRemove) {
        return vue.createVNode(vue.resolveComponent("el-popconfirm"), {
          "title": core.showTitle(ibiz.i18n.t("control.form.mdCtrlContainer.promptInformation")),
          "confirm-button-text": ibiz.i18n.t("app.confirm"),
          "cancel-button-text": ibiz.i18n.t("app.cancel"),
          "onConfirm": () => emit("removeClick", item, index)
        }, {
          reference: () => {
            return vue.createVNode(vue.resolveComponent("el-button"), {
              "type": "danger",
              "class": [ns.be("style2-item-actions", "remove"), ns.be("style2-item-actions", "btn"), ns2.b("button"), semanticClass("mdctrl.button", {
                mdctrl: props.controller,
                tag: "remove"
              })],
              "style": semanticStyle("mdctrl.button", {
                mdctrl: props.controller,
                tag: "remove"
              }),
              "title": ibiz.i18n.t("app.delete")
            }, {
              default: () => [vue.createVNode("ion-icon", {
                "name": "trash-outline"
              }, null)]
            });
          }
        });
      }
      return vue.createVNode(vue.resolveComponent("el-button"), {
        "type": "danger",
        "class": [ns.be("item-actions", "remove"), ns.be("item-actions", "btn"), ns2.b("button"), semanticClass("mdctrl.button", {
          mdctrl: props.controller,
          tag: "remove"
        })],
        "style": semanticStyle("mdctrl.button", {
          mdctrl: props.controller,
          tag: "remove"
        }),
        "onClick": () => emit("removeClick", item, index)
      }, _isSlot(_slot4 = ibiz.i18n.t("app.delete")) ? _slot4 : {
        default: () => [_slot4]
      });
    };
    const renderDefaultItem = (item, index) => {
      const formComponent = slots.item ? slots.item({
        data: item,
        index
      }) : vue.createVNode("div", null, [ibiz.i18n.t("control.form.mdCtrlContainer.noSlot")]);
      return vue.createVNode("div", {
        "class": ns.b("item")
      }, [vue.createVNode("div", {
        "class": ns.be("item", "left")
      }, [props.enableSort && renderDragBtn()]), formComponent, renderRemoveBtn(item, index), props.enableCreate && vue.createVNode("div", {
        "class": ns.be("item", "right")
      }, [index === 0 && renderAddBtn()])]);
    };
    return {
      ns,
      showActions,
      dragClssName,
      dragItems,
      renderDragBtn,
      renderAddBtn,
      renderDefaultItem,
      renderRemoveBtn,
      renderStyle2AddBtn,
      renderStyle2RemoveBtn,
      handleDragChange
    };
  },
  render() {
    var _a, _b;
    if (this.userStyle === "STYLE2") {
      return vue.createVNode("div", {
        "class": [this.ns.b(), this.ns.b("style2")]
      }, [((_a = this.items) == null ? void 0 : _a.length) ? vue.createVNode("div", {
        "class": this.ns.e("item-container")
      }, [this.showActions && this.enableCreate && this.renderStyle2AddBtn(), this.items.map((item, index) => {
        const formComponent = this.$slots.item ? this.$slots.item({
          data: item,
          index
        }) : vue.createVNode("div", null, [ibiz.i18n.t("control.form.mdCtrlContainer.noSlot")]);
        return vue.createVNode("div", {
          "class": this.ns.b("item")
        }, [formComponent, this.showActions && vue.createVNode("div", {
          "class": this.ns.b("style2-item-actions")
        }, [this.renderStyle2RemoveBtn(item, index)])]);
      })]) : vue.createVNode("div", {
        "class": this.ns.b("no-data")
      }, [this.enableCreate && vue.createVNode("div", {
        "class": this.ns.b("style2-item-actions")
      }, [this.renderStyle2AddBtn()])])]);
    }
    let defaultContent;
    if ((_b = this.items) == null ? void 0 : _b.length) {
      defaultContent = this.enableSort ? vue.createVNode(draggable, {
        "itemKey": "id",
        "ref": "container",
        "list": this.dragItems,
        "class": [this.ns.e("drag")],
        "handle": ".".concat(this.dragClssName),
        "onChange": this.handleDragChange,
        "chosenClass": this.ns.is("drag-chosen", true)
      }, {
        item: ({
          element,
          index
        }) => this.renderDefaultItem(element, index)
      }) : this.items.map((item, index) => this.renderDefaultItem(item, index));
    }
    return vue.createVNode("div", {
      "class": this.ns.b()
    }, [defaultContent || vue.createVNode("div", {
      "class": this.ns.b("no-data")
    }, [this.enableCreate && vue.createVNode("div", {
      "class": this.ns.b("item-actions")
    }, [this.renderAddBtn()])])]);
  }
});

exports.MDCtrlContainer = MDCtrlContainer;
