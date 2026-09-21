'use strict';

var vue = require('vue');
var vue3Util = require('@ibiz-template/vue3-util');
var runtime = require('@ibiz-template/runtime');
require('./medit-view-panel.css');

"use strict";
const MEditViewPanelControl = /* @__PURE__ */ vue.defineComponent({
  name: "IBizMEditViewPanelControl",
  props: {
    /**
     * @description 多编辑视图面板模型数据
     */
    modelData: {
      type: Object,
      required: true
    },
    /**
     * @description 应用上下文对象
     */
    context: {
      type: Object,
      required: true
    },
    /**
     * @description 视图参数对象
     * @default {}
     */
    params: {
      type: Object,
      default: () => ({})
    }
  },
  setup() {
    const c = vue3Util.useControlController((...args) => new runtime.MEditViewPanelController(...args));
    const ns = vue3Util.useNamespace("control-".concat(c.model.controlType.toLowerCase()));
    const {
      semanticClass,
      semanticStyle
    } = vue3Util.useSemanticNode(c);
    const panelContent = vue.ref(null);
    const lastScrollHeight = vue.ref(0);
    let mutationObserver = null;
    const handleDelete = (item) => {
      c.handleDelete(item);
    };
    const onTabChange = (name) => {
      c.state.activeTab = name;
      c.onTabChange(name);
    };
    const handleTabDelete = (item, event) => {
      event.stopPropagation();
      c.handleDelete(item);
    };
    vue.onMounted(() => {
      if (panelContent.value) {
        mutationObserver = new MutationObserver(() => {
          const scrollHeight = panelContent.value.scrollHeight;
          if (scrollHeight !== lastScrollHeight.value) {
            if (c.state.isNeedScroll) {
              lastScrollHeight.value = scrollHeight;
              panelContent.value.scrollTop = scrollHeight;
            }
          }
        });
        mutationObserver.observe(panelContent.value, {
          childList: true,
          // 子节点的变动（新增、删除或者更改）
          attributes: true,
          // 属性的变动
          characterData: true,
          // 节点内容或节点文本的变动
          subtree: true
          // 是否将观察器应用于该节点的所有后代节点
        });
      }
    });
    vue.onUnmounted(() => {
      if (mutationObserver) {
        mutationObserver.disconnect();
      }
    });
    return {
      c,
      ns,
      panelContent,
      semanticClass,
      semanticStyle,
      onTabChange,
      handleDelete,
      handleTabDelete
    };
  },
  render() {
    const viewShell = vue.resolveComponent("IBizViewShell");
    const renderTabTop = () => {
      return vue.createVNode(vue.resolveComponent("el-tabs"), {
        "addable": true,
        "onTabChange": this.onTabChange,
        "modelValue": this.c.state.activeTab,
        "onUpdate:modelValue": ($event) => this.c.state.activeTab = $event,
        "onTabAdd": () => this.c.handleAdd(),
        "class": [this.ns.b("tabs")]
      }, {
        addIcon: () => {
          return vue.createVNode(vue.resolveComponent("el-button"), {
            "style": this.semanticStyle("add"),
            "class": [this.ns.e("add"), this.semanticClass("add")]
          }, {
            default: () => [vue.createVNode("ion-icon", {
              "name": "add"
            }, null), ibiz.i18n.t("app.add")]
          });
        },
        default: () => {
          return this.c.state.panelUiItems.map((item) => {
            return vue.createVNode(vue.resolveComponent("el-tab-pane"), {
              "name": item.id,
              "key": item.id + item.srfmajortext,
              "style": this.semanticStyle("item", {
                item
              }),
              "class": [this.ns.b("item"), this.semanticClass("item", {
                item
              })]
            }, {
              label: () => {
                return vue.createVNode("div", {
                  "style": this.semanticStyle("tab", {
                    item
                  }),
                  "class": [this.ns.b("tab-label"), this.semanticClass("tab", {
                    item
                  })]
                }, [vue.createVNode("span", {
                  "class": [this.ns.be("tab-label", "caption"), this.semanticClass("tab.caption", {
                    item
                  })],
                  "style": this.semanticStyle("tab.caption", {
                    item
                  })
                }, [item.srfmajortext]), vue.createVNode("ion-icon", {
                  "class": [this.ns.be("tab-label", "remove"), this.semanticClass("tab.remove", {
                    item
                  })],
                  "style": this.semanticStyle("tab.remove", {
                    item
                  }),
                  "name": "close-outline",
                  "onClick": (event) => this.handleTabDelete(item, event)
                }, null)]);
              },
              default: () => {
                return this.c.state.activeTab === item.id && vue.h(viewShell, {
                  context: item.context,
                  params: item.params,
                  viewId: this.c.model.embeddedAppViewId,
                  onDataChange: (args) => this.c.onViewDataChange(args, item.id),
                  onCreated: (event) => this.c.onViewCreated(event, item.id)
                });
              }
            });
          });
        }
      });
    };
    const renderRow = () => {
      return this.c.state.panelUiItems.map((item) => {
        return vue.createVNode("div", {
          "key": item.id,
          "style": this.semanticStyle("item", {
            item
          }),
          "class": [this.ns.b("item"), this.semanticClass("item", {
            item
          })]
        }, [[vue.h(viewShell, {
          context: item.context,
          params: item.params,
          viewId: this.c.model.embeddedAppViewId,
          onDataChange: (args) => this.c.onViewDataChange(args, item.id),
          onCreated: (event) => this.c.onViewCreated(event, item.id)
        }), vue.createVNode("div", {
          "class": [this.ns.b("close"), this.ns.be("item", "remove"), this.semanticClass("item.remove", {
            item
          })],
          "style": this.semanticStyle("item.remove", {
            item
          })
        }, [vue.createVNode("ion-icon", {
          "name": "close-outline",
          "onClick": () => this.handleDelete(item)
        }, null)])]]);
      });
    };
    const renderContent = () => {
      if (!this.c.model.embeddedAppViewId)
        return;
      if (Object.is(this.c.model.panelStyle, "TAB_TOP"))
        return renderTabTop();
      return renderRow();
    };
    return vue.createVNode(vue.resolveComponent("iBizControlBase"), {
      "controller": this.c,
      "class": this.semanticClass("root"),
      "style": this.semanticStyle("root")
    }, {
      default: () => [vue.createVNode("div", {
        "ref": "panelContent",
        "style": this.semanticStyle("content"),
        "class": [this.ns.b("content"), this.semanticClass("content")]
      }, [this.c.state.panelUiItems.length > 0 ? renderContent() : null])]
    });
  }
});

exports.MEditViewPanelControl = MEditViewPanelControl;
