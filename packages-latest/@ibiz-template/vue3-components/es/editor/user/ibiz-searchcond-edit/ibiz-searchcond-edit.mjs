import { defineComponent, createVNode, resolveComponent, mergeProps, ref, computed, watch } from 'vue';
import { useNamespace, getEditorEmits, getInputProps } from '@ibiz-template/vue3-util';
import { isNilOrEmpty } from 'qx-util';
import { getOriginFilterNodes, SearchCondEx2filterNode, calcSearchCondExs } from '@ibiz-template/runtime';
import { showTitle } from '@ibiz-template/core';
import './ibiz-searchcond-edit.css';

"use strict";
const IBizSearchCondEdit = /* @__PURE__ */ defineComponent({
  name: "IBizSearchCondEdit",
  props: getInputProps(),
  emits: getEditorEmits(),
  setup(props, {
    emit
  }) {
    const ns = useNamespace("searchcond-edit");
    const c = props.controller;
    const currentVal = ref(null);
    const isEditable = ref(false);
    const editorRef = ref();
    const filterNodes = ref([]);
    const filterButtonRef = ref();
    let popover;
    const showFormDefaultContent = computed(() => {
      if (props.controlParams && props.controlParams.editmode === "hover" && !props.readonly) {
        return true;
      }
      return false;
    });
    watch(() => props.value, (newVal, oldVal) => {
      if (newVal !== oldVal) {
        if (newVal == null) {
          currentVal.value = "";
          filterNodes.value = getOriginFilterNodes();
        } else if (typeof newVal === "string") {
          currentVal.value = newVal;
          if (newVal) {
            try {
              const searchconds = JSON.parse(newVal);
              filterNodes.value = searchconds.map((item) => SearchCondEx2filterNode(item));
            } catch (error) {
              ibiz.log.error("".concat(newVal, "\u503C\u683C\u5F0F\u4E0D\u6B63\u786E\uFF0C\u5FC5\u987B\u4E3Ajson\u5B57\u7B26\u4E32"));
            }
          }
        }
      }
    }, {
      immediate: true
    });
    const resetFilter = () => {
      filterNodes.value = getOriginFilterNodes();
    };
    resetFilter();
    const setEditable = (flag) => {
      if (flag) {
        isEditable.value = flag;
      } else {
        setTimeout(() => {
          isEditable.value = flag;
        }, 100);
      }
    };
    const handleChange = (e) => {
      emit("change", e);
    };
    watch(editorRef, (newVal) => {
      if (props.autoFocus && newVal) {
        const input = newVal.$el.getElementsByTagName("input")[0];
        input.focus();
      }
    });
    const onFocus = (e) => {
      emit("focus", e);
      setEditable(true);
    };
    const onBlur = (e) => {
      emit("blur", e);
      setEditable(false);
    };
    const handleKeyUp = (e) => {
      if (e && e.code === "Enter") {
        emit("enter", e);
      }
    };
    const getCurrentValByFilterNodes = () => {
      const searchconds = calcSearchCondExs(filterNodes.value);
      if (searchconds) {
        currentVal.value = JSON.stringify(searchconds, null, 2);
      }
    };
    const onConfirm = () => {
      getCurrentValByFilterNodes();
      if (popover) {
        popover.dismiss();
      }
      emit("change", currentVal.value);
    };
    const onCancel = () => {
      resetFilter();
      getCurrentValByFilterNodes();
      emit("change", "");
    };
    const showFilter = async () => {
      popover = ibiz.overlay.createPopover(() => {
        return createVNode(resolveComponent("iBizFilterTreeControl"), {
          "filterControllers": c.filterControllers,
          "filterNodes": filterNodes.value,
          "parent": "searchcond-edit",
          "onConfirm": () => {
            onConfirm();
          },
          "onCancel": () => {
            onCancel();
          }
        }, null);
      }, void 0, {
        placement: "bottom-end",
        autoClose: true
      });
      popover.present(filterButtonRef.value.$el);
      await popover.onWillDismiss();
      popover = void 0;
    };
    const triggerFilter = () => {
      if (popover) {
        popover.dismiss();
      } else {
        showFilter();
      }
    };
    return {
      ns,
      c,
      currentVal,
      handleChange,
      onFocus,
      onBlur,
      editorRef,
      handleKeyUp,
      isEditable,
      setEditable,
      showFormDefaultContent,
      filterNodes,
      triggerFilter,
      filterButtonRef,
      resetFilter
    };
  },
  render() {
    let content = null;
    if (this.readonly) {
      content = isNilOrEmpty(this.currentVal) ? "" : "".concat(this.currentVal);
    } else {
      content = [createVNode(resolveComponent("el-input"), mergeProps({
        "ref": "editorRef",
        "class": [this.ns.b("input")],
        "model-value": this.currentVal,
        "type": "textarea",
        "rows": 10,
        "placeholder": this.c.placeHolder,
        "disabled": this.disabled,
        "controls": false,
        "onFocus": this.onFocus,
        "onBlur": this.onBlur,
        "onKeyup": this.handleKeyUp
      }, this.$attrs), null), createVNode(resolveComponent("el-button"), {
        "ref": "filterButtonRef",
        "type": "primary",
        "title": showTitle(ibiz.i18n.t("app.edit")),
        "class": this.ns.b("filter"),
        "onClick": () => this.triggerFilter()
      }, {
        default: () => [createVNode(resolveComponent("iBizIcon"), {
          "icon": {
            cssClass: "fa fa-edit"
          }
        }, null)]
      })];
    }
    return createVNode("div", {
      "class": [this.ns.b(), this.disabled ? this.ns.m("disabled") : "", this.readonly ? this.ns.m("readonly") : "", this.ns.is("editable", this.isEditable), this.ns.is("show-default", this.showFormDefaultContent)]
    }, [content]);
  }
});

export { IBizSearchCondEdit };
