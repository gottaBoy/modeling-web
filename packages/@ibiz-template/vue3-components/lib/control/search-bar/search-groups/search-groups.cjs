'use strict';

var vue = require('vue');
var vue3Util = require('@ibiz-template/vue3-util');
require('./search-groups.css');
var ElementPlus = require('element-plus');
var draggable = require('vuedraggable');
var core = require('@ibiz-template/core');
var newGroupUtil = require('./new-group-util.cjs');
var editGroupUtil = require('./edit-group-util.cjs');

"use strict";
function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !vue.isVNode(s);
}
const SearchGroups = /* @__PURE__ */ vue.defineComponent({
  name: "IBizSearchGroups",
  components: {
    draggable
  },
  props: {
    controller: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const ns = vue3Util.useNamespace("search-groups");
    const c = props.controller;
    const manageDialogVisible = vue.ref(false);
    const {
      newDialogVisible,
      newForm,
      newFormRef,
      newFormRules,
      handleNewFormSubmit,
      handleNewFormCancel
    } = newGroupUtil.useNewGroup(c);
    const {
      editDialogVisible,
      editForm,
      editFormRef,
      editFormRules,
      handleEditFormSubmit,
      handleEditFormCancel
    } = editGroupUtil.useEditGroup(c);
    const count = c.model.quickGroupCount || 4;
    const showGroups = vue.computed(() => {
      const visibleGroups = c.state.searchBarGroups.filter((item) => item.show);
      return visibleGroups.slice(0, count);
    });
    const hiddenGroups = vue.computed(() => {
      const visibleGroups = c.state.searchBarGroups.filter((item) => item.show);
      return visibleGroups.slice(count);
    });
    const isActiveMore = vue.computed(() => {
      if (c.state.selectedSearchGroupItem) {
        return hiddenGroups.value.includes(c.state.selectedSearchGroupItem);
      }
      return false;
    });
    const editLinkTitle = (groupItem) => {
      if (groupItem.saved) {
        if (groupItem.noEdit) {
          return ibiz.i18n.t("control.searchBar.searchGroups.noEditPrompt");
        }
        return "";
      }
      return ibiz.i18n.t("control.searchBar.searchGroups.savePrompt");
    };
    const onGroupClick = (item) => {
      c.handleGroupClick(item);
    };
    const newGroup = () => {
      newDialogVisible.value = true;
    };
    const manageGroup = () => {
      manageDialogVisible.value = true;
    };
    const editGroup = (groupItem) => {
      editDialogVisible.value = true;
      c.currentEditGroup = groupItem;
      editForm.caption = groupItem.caption || groupItem.name;
    };
    const removeGroup = (groupItem) => {
      ElementPlus.ElMessageBox({
        title: ibiz.i18n.t("control.searchBar.searchGroups.delTitle"),
        message: () => {
          return vue.createVNode("div", {
            "class": ns.b("remove-dialog")
          }, [vue.createVNode("div", {
            "class": ns.b("remove-dialog-content"),
            "innerHTML": ibiz.i18n.t("control.searchBar.searchGroups.confirmDelPrompt", {
              itemName: groupItem.caption || groupItem.name
            })
          }, null), vue.createVNode("div", {
            "class": ns.b("remove-dialog-tip")
          }, [ibiz.i18n.t("control.searchBar.searchGroups.unrecoverablePrompt")])]);
        },
        showCancelButton: true,
        confirmButtonText: ibiz.i18n.t("control.common.determine"),
        confirmButtonClass: ns.b("remove-confirm-btn"),
        cancelButtonText: ibiz.i18n.t("app.cancel"),
        cancelButtonClass: ns.b("remove-cancel-btn")
      }).then(async () => {
        if (groupItem.id) {
          const res = await c.service.remove(groupItem.id);
          if (res.ok) {
            const index = c.state.searchBarGroups.findIndex((item) => item.name === groupItem.name);
            if (index !== -1) {
              c.state.searchBarGroups.splice(index, 1);
            }
          }
          ibiz.message.success("".concat(ibiz.i18n.t("control.common.deleteSuccess"), "\uFF01"));
          await c.initSearBarGroups();
        }
      }).catch(() => {
      });
    };
    const onDragChange = async (evt) => {
      c.state.searchBarGroups.forEach((item, index) => {
        item.order = (index + 1) * 100;
      });
      if (evt.moved) {
        const newIndex = evt.moved.newIndex;
        const oldIndex = evt.moved.oldIndex;
        const startIndex = Math.min(newIndex, oldIndex);
        const endIndex = Math.max(newIndex, oldIndex) + 1;
        const changedSearchBarGroups = c.state.searchBarGroups.slice(startIndex, endIndex);
        if (changedSearchBarGroups.length > 0) {
          const updateBatch = async () => {
            await c.service.updateBatch(changedSearchBarGroups);
          };
          const unSavedGroups = changedSearchBarGroups.filter((group) => !group.saved);
          if (unSavedGroups.length) {
            const res = await c.service.createBatch(unSavedGroups);
            if (res.ok && res.data && res.data[0]) {
              const createBatchGroups = res.data[0];
              if (createBatchGroups.length > 0) {
                createBatchGroups.forEach((createGroup) => {
                  const newCreateGroup = changedSearchBarGroups.find((group) => group.name === createGroup.name);
                  if (newCreateGroup) {
                    core.mergeInLeft(newCreateGroup, createGroup);
                  }
                });
              }
              await updateBatch();
              unSavedGroups.forEach((group) => {
                const unSavedGroup = c.state.searchBarGroups.find((item) => item.name === group.name);
                if (unSavedGroup) {
                  unSavedGroup.saved = true;
                }
              });
            }
          } else {
            await updateBatch();
          }
        }
      }
    };
    return {
      ns,
      c,
      showGroups,
      hiddenGroups,
      onGroupClick,
      newDialogVisible,
      editDialogVisible,
      manageDialogVisible,
      newGroup,
      manageGroup,
      newForm,
      newFormRef,
      newFormRules,
      handleNewFormSubmit,
      handleNewFormCancel,
      editForm,
      editFormRef,
      editFormRules,
      handleEditFormSubmit,
      handleEditFormCancel,
      editGroup,
      removeGroup,
      isActiveMore,
      onDragChange,
      editLinkTitle
    };
  },
  render() {
    var _a;
    return vue.createVNode("div", {
      "class": this.ns.b()
    }, [(_a = this.showGroups) == null ? void 0 : _a.map((groupItem) => {
      var _a2;
      return vue.createVNode("span", {
        "class": [this.ns.b("quick-group-item"), this.ns.is("selected", ((_a2 = this.c.state.selectedSearchGroupItem) == null ? void 0 : _a2.name) === groupItem.name)],
        "onClick": () => this.onGroupClick(groupItem)
      }, [groupItem.caption || groupItem.name]);
    }), vue.createVNode(vue.resolveComponent("el-dropdown"), {
      "popper-class": this.ns.b("dropdown")
    }, {
      default: () => {
        var _a2;
        return vue.createVNode("div", {
          "class": [this.ns.b("more"), this.ns.is("selected", this.isActiveMore)]
        }, [this.isActiveMore ? (_a2 = this.c.state.selectedSearchGroupItem) == null ? void 0 : _a2.caption : this.c.model.groupMoreText || ibiz.i18n.t("app.more"), vue.createVNode("ion-icon", {
          "name": "chevron-down-outline"
        }, null)]);
      },
      dropdown: () => vue.createVNode(vue.resolveComponent("el-dropdown-menu"), null, {
        default: () => [this.hiddenGroups.map((groupItem) => {
          return vue.createVNode(vue.resolveComponent("el-dropdown-item"), {
            "onClick": () => this.onGroupClick(groupItem)
          }, {
            default: () => {
              var _a2;
              return [vue.createVNode("ion-icon", {
                "name": "list-outline"
              }, null), vue.createVNode("span", {
                "class": this.ns.b("item-caption")
              }, [groupItem.caption || groupItem.name]), ((_a2 = this.c.state.selectedSearchGroupItem) == null ? void 0 : _a2.name) === groupItem.name && vue.createVNode("ion-icon", {
                "name": "checkmark-outline"
              }, null)];
            }
          });
        }), vue.createVNode(vue.resolveComponent("el-dropdown-item"), {
          "divided": this.hiddenGroups.length > 0,
          "onClick": this.newGroup
        }, {
          default: () => [vue.createVNode("ion-icon", {
            "name": "add-outline"
          }, null), vue.createVNode("span", {
            "class": this.ns.b("item-caption")
          }, [ibiz.i18n.t("control.searchBar.searchGroups.newGroup")])]
        }), vue.createVNode(vue.resolveComponent("el-dropdown-item"), {
          "onClick": this.manageGroup
        }, {
          default: () => [vue.createVNode("ion-icon", {
            "name": "settings-outline"
          }, null), vue.createVNode("span", {
            "class": this.ns.b("item-caption")
          }, [ibiz.i18n.t("control.searchBar.searchGroups.groupManage")])]
        })]
      })
    }), vue.createVNode(vue.resolveComponent("el-dialog"), {
      "modelValue": this.newDialogVisible,
      "onUpdate:modelValue": ($event) => this.newDialogVisible = $event,
      "title": core.showTitle(ibiz.i18n.t("control.searchBar.searchGroups.newGroup")),
      "modal-class": this.ns.b("new-dialog")
    }, {
      default: () => {
        return vue.createVNode(vue.resolveComponent("el-form"), {
          "ref": "newFormRef",
          "model": this.newForm,
          "label-position": "top",
          "rules": this.newFormRules
        }, {
          default: () => [vue.createVNode(vue.resolveComponent("el-form-item"), {
            "label": ibiz.i18n.t("control.searchBar.searchGroups.groupName"),
            "prop": "caption"
          }, {
            default: () => [vue.createVNode(vue.resolveComponent("el-input"), {
              "modelValue": this.newForm.caption,
              "onUpdate:modelValue": ($event) => this.newForm.caption = $event,
              "placeholder": ibiz.i18n.t("control.searchBar.searchGroups.enterPrompt")
            }, null)]
          })]
        });
      },
      footer: () => {
        let _slot, _slot2;
        return vue.createVNode("div", {
          "class": this.ns.b("new-dialog-footer")
        }, [vue.createVNode(vue.resolveComponent("el-button"), {
          "class": this.ns.b("cancel-btn"),
          "onClick": this.handleNewFormCancel
        }, _isSlot(_slot = ibiz.i18n.t("control.searchBar.searchGroups.dialogCancel")) ? _slot : {
          default: () => [_slot]
        }), vue.createVNode(vue.resolveComponent("el-button"), {
          "type": "primary",
          "onClick": this.handleNewFormSubmit
        }, _isSlot(_slot2 = ibiz.i18n.t("control.searchBar.searchGroups.dialogDetermine")) ? _slot2 : {
          default: () => [_slot2]
        })]);
      }
    }), vue.createVNode(vue.resolveComponent("el-dialog"), {
      "modelValue": this.editDialogVisible,
      "onUpdate:modelValue": ($event) => this.editDialogVisible = $event,
      "title": core.showTitle(ibiz.i18n.t("control.searchBar.searchGroups.editGroup")),
      "modal-class": this.ns.b("edit-dialog")
    }, {
      default: () => {
        return vue.createVNode(vue.resolveComponent("el-form"), {
          "ref": "editFormRef",
          "model": this.editForm,
          "label-position": "top",
          "rules": this.editFormRules
        }, {
          default: () => [vue.createVNode(vue.resolveComponent("el-form-item"), {
            "label": ibiz.i18n.t("control.searchBar.searchGroups.groupName"),
            "prop": "caption"
          }, {
            default: () => [vue.createVNode(vue.resolveComponent("el-input"), {
              "modelValue": this.editForm.caption,
              "onUpdate:modelValue": ($event) => this.editForm.caption = $event,
              "placeholder": ibiz.i18n.t("control.searchBar.searchGroups.enterPrompt")
            }, null)]
          })]
        });
      },
      footer: () => {
        let _slot3, _slot4;
        return vue.createVNode("div", {
          "class": this.ns.b("edit-dialog-footer")
        }, [vue.createVNode(vue.resolveComponent("el-button"), {
          "class": this.ns.b("cancel-btn"),
          "onClick": this.handleEditFormCancel
        }, _isSlot(_slot3 = ibiz.i18n.t("control.searchBar.searchGroups.dialogCancel")) ? _slot3 : {
          default: () => [_slot3]
        }), vue.createVNode(vue.resolveComponent("el-button"), {
          "type": "primary",
          "onClick": this.handleEditFormSubmit
        }, _isSlot(_slot4 = ibiz.i18n.t("control.searchBar.searchGroups.dialogDetermine")) ? _slot4 : {
          default: () => [_slot4]
        })]);
      }
    }), vue.createVNode(vue.resolveComponent("el-dialog"), {
      "modelValue": this.manageDialogVisible,
      "onUpdate:modelValue": ($event) => this.manageDialogVisible = $event,
      "title": core.showTitle(ibiz.i18n.t("control.searchBar.searchGroups.groupManage")),
      "modal-class": this.ns.b("manage-dialog")
    }, {
      default: () => [vue.createVNode("div", {
        "class": this.ns.b("manage-dialog-content")
      }, [vue.createVNode("div", {
        "class": this.ns.b("content-top")
      }, [vue.createVNode("div", {
        "class": this.ns.b("content-top-left")
      }, [vue.createVNode("ion-icon", {
        "name": "alert-circle-outline"
      }, null), ibiz.i18n.t("control.searchBar.searchGroups.manageTips")]), vue.createVNode("div", {
        "class": this.ns.b("content-top-right")
      }, [vue.createVNode(vue.resolveComponent("el-button"), {
        "onClick": () => {
          this.newDialogVisible = true;
        }
      }, {
        default: () => [vue.createVNode("ion-icon", {
          "name": "add-outline"
        }, null), ibiz.i18n.t("control.searchBar.searchGroups.newGroup")]
      })])]), vue.createVNode("div", {
        "class": this.ns.b("content-bottom")
      }, [vue.createVNode("div", {
        "class": this.ns.b("table-header")
      }, [vue.createVNode("div", {
        "class": this.ns.b("name")
      }, [ibiz.i18n.t("control.searchBar.searchGroups.name")]), vue.createVNode("div", {
        "class": this.ns.b("show")
      }, [ibiz.i18n.t("control.searchBar.searchGroups.show")]), vue.createVNode("div", {
        "class": this.ns.b("action")
      }, [ibiz.i18n.t("control.searchBar.searchGroups.operate")])]), vue.createVNode(draggable, {
        "class": this.ns.b("table-body"),
        "modelValue": this.c.state.searchBarGroups,
        "onUpdate:modelValue": ($event) => this.c.state.searchBarGroups = $event,
        "group": this.c.model.id,
        "itemKey": "id",
        "sort": true,
        "force-fallback": true,
        "animation": 500,
        "ghost-class": this.ns.b("table-row-ghost"),
        "onChange": (evt) => this.onDragChange(evt)
      }, {
        item: ({
          element: groupItem
        }) => {
          let _slot5, _slot6;
          return vue.createVNode("div", {
            "class": this.ns.b("table-row")
          }, [vue.createVNode("div", {
            "class": this.ns.b("name")
          }, [groupItem.caption || groupItem.name]), vue.createVNode("div", {
            "class": this.ns.b("show")
          }, [vue.createVNode(vue.resolveComponent("el-switch"), {
            "modelValue": groupItem.show,
            "onUpdate:modelValue": ($event) => groupItem.show = $event
          }, null)]), vue.createVNode("div", {
            "class": this.ns.b("action")
          }, [vue.createVNode(vue.resolveComponent("el-link"), {
            "type": "primary",
            "disabled": !groupItem.saved || groupItem.noEdit,
            "title": core.showTitle(this.editLinkTitle(groupItem)),
            "onClick": () => this.editGroup(groupItem)
          }, _isSlot(_slot5 = ibiz.i18n.t("app.edit")) ? _slot5 : {
            default: () => [_slot5]
          }), vue.createVNode(vue.resolveComponent("el-link"), {
            "type": "danger",
            "disabled": !groupItem.saved || groupItem.ownerType === "SYSTEM",
            "title": core.showTitle(!groupItem.saved || groupItem.ownerType === "SYSTEM" ? ibiz.i18n.t("control.searchBar.searchGroups.savePrompt") : ""),
            "onClick": () => this.removeGroup(groupItem)
          }, _isSlot(_slot6 = ibiz.i18n.t("app.delete")) ? _slot6 : {
            default: () => [_slot6]
          })])]);
        }
      })])])]
    })]);
  }
});

exports.SearchGroups = SearchGroups;
