import { isVNode, defineComponent, createVNode, resolveComponent, ref, computed } from 'vue';
import { useNamespace, useSemanticNode } from '@ibiz-template/vue3-util';
import './search-groups.css';
import { ElMessageBox } from 'element-plus';
import draggable from 'vuedraggable';
import { showTitle, mergeInLeft } from '@ibiz-template/core';
import { useNewGroup } from './new-group-util.mjs';
import { useEditGroup } from './edit-group-util.mjs';

"use strict";
function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !isVNode(s);
}
const SearchGroups = /* @__PURE__ */ defineComponent({
  name: "IBizSearchGroups",
  components: {
    draggable
  },
  props: {
    controller: {
      type: Object,
      required: true
    },
    counterData: {
      type: Object,
      default: () => {
      }
    }
  },
  setup(props) {
    const ns = useNamespace("search-groups");
    const c = props.controller;
    const {
      semanticClass,
      semanticStyle
    } = useSemanticNode(c);
    const manageDialogVisible = ref(false);
    const {
      newDialogVisible,
      newForm,
      newFormRef,
      newFormRules,
      handleNewFormSubmit,
      handleNewFormCancel
    } = useNewGroup(c);
    const {
      editDialogVisible,
      editForm,
      editFormRef,
      editFormRules,
      handleEditFormSubmit,
      handleEditFormCancel
    } = useEditGroup(c);
    const count = c.model.quickGroupCount || 4;
    const showGroups = computed(() => {
      const visibleGroups = c.state.searchBarGroups.filter((item) => item.show);
      return visibleGroups.slice(0, count);
    });
    const hiddenGroups = computed(() => {
      const visibleGroups = c.state.searchBarGroups.filter((item) => item.show);
      return visibleGroups.slice(count);
    });
    const isActiveMore = computed(() => {
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
      ElMessageBox({
        title: ibiz.i18n.t("control.searchBar.searchGroups.delTitle"),
        message: () => {
          return createVNode("div", {
            "class": ns.b("remove-dialog")
          }, [createVNode("div", {
            "class": ns.b("remove-dialog-content"),
            "innerHTML": ibiz.i18n.t("control.searchBar.searchGroups.confirmDelPrompt", {
              itemName: groupItem.caption || groupItem.name
            })
          }, null), createVNode("div", {
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
                    mergeInLeft(newCreateGroup, createGroup);
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
      editLinkTitle,
      semanticClass,
      semanticStyle
    };
  },
  render() {
    var _a;
    return createVNode("div", {
      "class": [this.ns.b(), this.semanticClass("group")],
      "style": this.semanticStyle("group")
    }, [(_a = this.showGroups) == null ? void 0 : _a.map((groupItem) => {
      var _a2;
      const visible = this.c.calcCountVisible(groupItem);
      if (!visible) {
        return null;
      }
      return createVNode("span", {
        "class": [this.ns.b("quick-group-item"), this.ns.is("selected", ((_a2 = this.c.state.selectedSearchGroupItem) == null ? void 0 : _a2.name) === groupItem.name), this.semanticClass("groupitem", {
          item: groupItem
        })],
        "style": this.semanticStyle("groupitem", {
          item: groupItem
        }),
        "onClick": () => this.onGroupClick(groupItem)
      }, [createVNode("span", {
        "class": [this.ns.be("quick-group-item", "caption"), this.semanticClass("groupitem.caption", {
          item: groupItem
        })],
        "style": this.semanticStyle("groupitem.caption", {
          item: groupItem
        })
      }, [groupItem.caption || groupItem.name]), groupItem.counterId && createVNode(resolveComponent("iBizBadge"), {
        "class": [this.ns.e("counter"), this.semanticClass("groupitem.counter", {
          item: groupItem
        })],
        "style": this.semanticStyle("groupitem.counter", {
          item: groupItem
        }),
        "value": this.counterData[groupItem.counterId],
        "counterMode": groupItem.counterMode
      }, null)]);
    }), createVNode(resolveComponent("el-dropdown"), {
      "popper-class": this.ns.b("dropdown")
    }, {
      default: () => {
        var _a2;
        return createVNode("div", {
          "class": [this.ns.b("more"), this.ns.is("selected", this.isActiveMore), this.semanticClass("more")],
          "style": this.semanticStyle("more")
        }, [this.isActiveMore ? (_a2 = this.c.state.selectedSearchGroupItem) == null ? void 0 : _a2.caption : this.c.model.groupMoreText || ibiz.i18n.t("app.more"), createVNode("ion-icon", {
          "name": "chevron-down-outline"
        }, null)]);
      },
      dropdown: () => createVNode(resolveComponent("el-dropdown-menu"), null, {
        default: () => [this.hiddenGroups.map((groupItem) => {
          return createVNode(resolveComponent("el-dropdown-item"), {
            "onClick": () => this.onGroupClick(groupItem)
          }, {
            default: () => {
              var _a2;
              return [createVNode("ion-icon", {
                "name": "list-outline"
              }, null), createVNode("span", {
                "class": this.ns.b("item-caption")
              }, [groupItem.caption || groupItem.name]), ((_a2 = this.c.state.selectedSearchGroupItem) == null ? void 0 : _a2.name) === groupItem.name && createVNode("ion-icon", {
                "name": "checkmark-outline"
              }, null)];
            }
          });
        }), createVNode(resolveComponent("el-dropdown-item"), {
          "divided": this.hiddenGroups.length > 0,
          "onClick": this.newGroup
        }, {
          default: () => [createVNode("ion-icon", {
            "name": "add-outline"
          }, null), createVNode("span", {
            "class": this.ns.b("item-caption")
          }, [ibiz.i18n.t("control.searchBar.searchGroups.newGroup")])]
        }), createVNode(resolveComponent("el-dropdown-item"), {
          "onClick": this.manageGroup
        }, {
          default: () => [createVNode("ion-icon", {
            "name": "settings-outline"
          }, null), createVNode("span", {
            "class": this.ns.b("item-caption")
          }, [ibiz.i18n.t("control.searchBar.searchGroups.groupManage")])]
        })]
      })
    }), createVNode(resolveComponent("el-dialog"), {
      "modelValue": this.newDialogVisible,
      "onUpdate:modelValue": ($event) => this.newDialogVisible = $event,
      "title": showTitle(ibiz.i18n.t("control.searchBar.searchGroups.newGroup")),
      "modal-class": this.ns.b("new-dialog")
    }, {
      default: () => {
        return createVNode(resolveComponent("el-form"), {
          "ref": "newFormRef",
          "model": this.newForm,
          "label-position": "top",
          "rules": this.newFormRules
        }, {
          default: () => [createVNode(resolveComponent("el-form-item"), {
            "label": ibiz.i18n.t("control.searchBar.searchGroups.groupName"),
            "prop": "caption"
          }, {
            default: () => [createVNode(resolveComponent("el-input"), {
              "modelValue": this.newForm.caption,
              "onUpdate:modelValue": ($event) => this.newForm.caption = $event,
              "placeholder": ibiz.i18n.t("control.searchBar.searchGroups.enterPrompt")
            }, null)]
          })]
        });
      },
      footer: () => {
        let _slot, _slot2;
        return createVNode("div", {
          "class": this.ns.b("new-dialog-footer")
        }, [createVNode(resolveComponent("el-button"), {
          "class": this.ns.b("cancel-btn"),
          "onClick": this.handleNewFormCancel
        }, _isSlot(_slot = ibiz.i18n.t("control.searchBar.searchGroups.dialogCancel")) ? _slot : {
          default: () => [_slot]
        }), createVNode(resolveComponent("el-button"), {
          "type": "primary",
          "onClick": this.handleNewFormSubmit
        }, _isSlot(_slot2 = ibiz.i18n.t("control.searchBar.searchGroups.dialogDetermine")) ? _slot2 : {
          default: () => [_slot2]
        })]);
      }
    }), createVNode(resolveComponent("el-dialog"), {
      "modelValue": this.editDialogVisible,
      "onUpdate:modelValue": ($event) => this.editDialogVisible = $event,
      "title": showTitle(ibiz.i18n.t("control.searchBar.searchGroups.editGroup")),
      "modal-class": this.ns.b("edit-dialog")
    }, {
      default: () => {
        return createVNode(resolveComponent("el-form"), {
          "ref": "editFormRef",
          "model": this.editForm,
          "label-position": "top",
          "rules": this.editFormRules
        }, {
          default: () => [createVNode(resolveComponent("el-form-item"), {
            "label": ibiz.i18n.t("control.searchBar.searchGroups.groupName"),
            "prop": "caption"
          }, {
            default: () => [createVNode(resolveComponent("el-input"), {
              "modelValue": this.editForm.caption,
              "onUpdate:modelValue": ($event) => this.editForm.caption = $event,
              "placeholder": ibiz.i18n.t("control.searchBar.searchGroups.enterPrompt")
            }, null)]
          })]
        });
      },
      footer: () => {
        let _slot3, _slot4;
        return createVNode("div", {
          "class": this.ns.b("edit-dialog-footer")
        }, [createVNode(resolveComponent("el-button"), {
          "class": this.ns.b("cancel-btn"),
          "onClick": this.handleEditFormCancel
        }, _isSlot(_slot3 = ibiz.i18n.t("control.searchBar.searchGroups.dialogCancel")) ? _slot3 : {
          default: () => [_slot3]
        }), createVNode(resolveComponent("el-button"), {
          "type": "primary",
          "onClick": this.handleEditFormSubmit
        }, _isSlot(_slot4 = ibiz.i18n.t("control.searchBar.searchGroups.dialogDetermine")) ? _slot4 : {
          default: () => [_slot4]
        })]);
      }
    }), createVNode(resolveComponent("el-dialog"), {
      "modelValue": this.manageDialogVisible,
      "onUpdate:modelValue": ($event) => this.manageDialogVisible = $event,
      "title": showTitle(ibiz.i18n.t("control.searchBar.searchGroups.groupManage")),
      "modal-class": this.ns.b("manage-dialog")
    }, {
      default: () => [createVNode("div", {
        "class": this.ns.b("manage-dialog-content")
      }, [createVNode("div", {
        "class": this.ns.b("content-top")
      }, [createVNode("div", {
        "class": this.ns.b("content-top-left")
      }, [createVNode("ion-icon", {
        "name": "alert-circle-outline"
      }, null), ibiz.i18n.t("control.searchBar.searchGroups.manageTips")]), createVNode("div", {
        "class": this.ns.b("content-top-right")
      }, [createVNode(resolveComponent("el-button"), {
        "onClick": () => {
          this.newDialogVisible = true;
        }
      }, {
        default: () => [createVNode("ion-icon", {
          "name": "add-outline"
        }, null), ibiz.i18n.t("control.searchBar.searchGroups.newGroup")]
      })])]), createVNode("div", {
        "class": this.ns.b("content-bottom")
      }, [createVNode("div", {
        "class": this.ns.b("table-header")
      }, [createVNode("div", {
        "class": this.ns.b("name")
      }, [ibiz.i18n.t("control.searchBar.searchGroups.name")]), createVNode("div", {
        "class": this.ns.b("show")
      }, [ibiz.i18n.t("control.searchBar.searchGroups.show")]), createVNode("div", {
        "class": this.ns.b("action")
      }, [ibiz.i18n.t("control.searchBar.searchGroups.operate")])]), createVNode(draggable, {
        "class": this.ns.b("table-body"),
        "modelValue": this.c.state.searchBarGroups,
        "onUpdate:modelValue": ($event) => this.c.state.searchBarGroups = $event,
        "group": this.c.model.id,
        "itemKey": "id",
        "sort": true,
        "force-fallback": true,
        "delay": 100,
        "animation": 500,
        "ghost-class": this.ns.b("table-row-ghost"),
        "onChange": (evt) => this.onDragChange(evt)
      }, {
        item: ({
          element: groupItem
        }) => {
          let _slot5, _slot6;
          return createVNode("div", {
            "class": this.ns.b("table-row")
          }, [createVNode("div", {
            "class": this.ns.b("name")
          }, [groupItem.caption || groupItem.name]), createVNode("div", {
            "class": this.ns.b("show")
          }, [createVNode(resolveComponent("el-switch"), {
            "modelValue": groupItem.show,
            "onUpdate:modelValue": ($event) => groupItem.show = $event
          }, null)]), createVNode("div", {
            "class": this.ns.b("action")
          }, [createVNode(resolveComponent("el-link"), {
            "type": "primary",
            "disabled": !groupItem.saved || groupItem.noEdit,
            "title": showTitle(this.editLinkTitle(groupItem)),
            "onClick": () => this.editGroup(groupItem)
          }, _isSlot(_slot5 = ibiz.i18n.t("app.edit")) ? _slot5 : {
            default: () => [_slot5]
          }), createVNode(resolveComponent("el-link"), {
            "type": "danger",
            "disabled": !groupItem.saved || groupItem.ownerType === "SYSTEM",
            "title": showTitle(!groupItem.saved || groupItem.ownerType === "SYSTEM" ? ibiz.i18n.t("control.searchBar.searchGroups.savePrompt") : ""),
            "onClick": () => this.removeGroup(groupItem)
          }, _isSlot(_slot6 = ibiz.i18n.t("app.delete")) ? _slot6 : {
            default: () => [_slot6]
          })])]);
        }
      })])])]
    })]);
  }
});

export { SearchGroups };
