import { defineComponent, resolveComponent, h, createVNode, mergeProps, withDirectives, resolveDirective, ref, computed, watch, onMounted, onBeforeUnmount } from 'vue';
import { useNamespace, useSemanticNode, renderString, getEditorEmits, getDataPickerProps } from '@ibiz-template/vue3-util';
import { isEmpty, isNil } from 'ramda';
import { debounce } from 'lodash-es';
import { showTitle } from '@ibiz-template/core';
import './ibiz-picker.css';

"use strict";
const IBizPicker = /* @__PURE__ */ defineComponent({
  name: "IBizPicker",
  props: getDataPickerProps(),
  emits: getEditorEmits(),
  setup(props, {
    emit
  }) {
    var _a;
    const ns = useNamespace("picker");
    const c = props.controller;
    const {
      semanticClass,
      semanticStyle
    } = useSemanticNode(c);
    const curValue = ref("");
    const childClass = [{
      class: semanticClass("editor.input"),
      selector: ".el-input__inner"
    }, {
      class: semanticClass("editor.suffix"),
      selector: ".el-input__suffix"
    }, {
      class: semanticClass("editor.pickup"),
      selector: ".".concat(ns.em("icon", "pickup"))
    }, {
      class: semanticClass("editor.link"),
      selector: ".".concat(ns.em("icon", "link"))
    }];
    const childStyle = [{
      style: semanticStyle("editor.input"),
      selector: ".el-input__inner"
    }, {
      style: semanticStyle("editor.suffix"),
      selector: ".el-input__suffix"
    }, {
      style: semanticStyle("editor.pickup"),
      selector: ".".concat(ns.em("icon", "pickup"))
    }, {
      style: semanticStyle("editor.link"),
      selector: ".".concat(ns.em("icon", "link"))
    }];
    const items = ref([]);
    const isShowAll = ref(true);
    const isEditable = ref(false);
    const editorRef = ref();
    const isLoaded = ref(false);
    const isReverse = ref(false);
    const actionPostion = ((_a = c.model.editorParams) == null ? void 0 : _a.actionpostion) || "bottom";
    const showFormDefaultContent = computed(() => {
      if (props.controlParams && props.controlParams.editmode === "hover" && !props.readonly) {
        return true;
      }
      return false;
    });
    const resetCurValue = () => {
      const {
        value
      } = props;
      if (c.model.valueType === "OBJECT") {
        curValue.value = value && c.objectNameField ? value[c.objectNameField] : "";
      } else {
        curValue.value = value || "";
      }
      const valueItem = props.data[c.valueItem];
      const index = items.value.findIndex((item) => Object.is(item[c.keyName], valueItem));
      if (index !== -1)
        return;
      items.value = [];
      if (value && !isEmpty(valueItem)) {
        items.value.push({
          [c.textName]: value,
          [c.keyName]: valueItem
        });
      }
    };
    watch(() => props.value, () => {
      resetCurValue();
    }, {
      immediate: true
    });
    const setEditable = (flag) => {
      if (flag) {
        isEditable.value = flag;
      } else {
        setTimeout(() => {
          isEditable.value = flag;
        }, 100);
      }
    };
    const handleDataSelect = async (data) => {
      const dataItems = await c.calcFillDataItems(data);
      if (dataItems.length) {
        dataItems.forEach((dataItem) => {
          emit("change", dataItem.value, dataItem.id);
        });
      }
      Object.assign(data, {
        [c.keyName]: data[c.keyName] ? data[c.keyName] : data.srfkey,
        [c.textName]: data[c.textName] ? data[c.textName] : data.srfmajortext
      });
      if (c.valueItem) {
        emit("change", data[c.keyName], c.valueItem);
      }
      if (c.model.valueType === "OBJECT") {
        emit("change", c.handleObjectParams(data));
      } else {
        emit("change", data[c.textName]);
      }
      setEditable(false);
    };
    const calcSelectItem = () => {
      const selectItems = [];
      if (curValue.value) {
        const selectItem = {
          srfkey: props.data[c.valueItem],
          srfmajortext: curValue.value,
          ...c.model.valueType === "OBJECT" && props.value && c.objectValueField ? props.value[c.objectValueField] : {}
        };
        if (c.deACMode && c.dataItems.length)
          c.dataItems.forEach((item) => Object.assign(selectItem, {
            [item.appDEFieldId]: props.data[item.id]
          }));
        selectItems.push(selectItem);
      }
      return selectItems;
    };
    const openPickUpView = async (e) => {
      e.stopPropagation();
      const res = await c.openPickUpView(props.data, JSON.stringify(calcSelectItem()));
      if (res && res[0]) {
        await handleDataSelect(res[0]);
      }
    };
    const openLinkView = async (e) => {
      e.stopPropagation();
      const res = await c.openLinkView(props.data);
      if (res && res.ok && res.data && res.data.length > 0) {
        await handleDataSelect(res.data[0]);
      }
    };
    let listCallback;
    let searchQuery = "";
    const handleCallback = (cb) => {
      const callbackItems = items.value.length ? [...items.value] : [{
        srftype: "empty"
      }];
      actionPostion === "top" ? callbackItems.unshift(...c.actionDetails) : callbackItems.push(...c.actionDetails);
      if (c.isShowLoadMore) {
        callbackItems.push({
          srftype: "loadmore"
        });
      }
      cb(callbackItems);
    };
    const onSearch = async (query, cb) => {
      if (c.model.appDataEntityId) {
        let trimQuery = "";
        if (query !== props.value) {
          trimQuery = query.trim();
        }
        const res = await c.getServiceData(trimQuery, props.data);
        if (res) {
          items.value = res.data;
          isLoaded.value = true;
          if (cb && cb instanceof Function) {
            searchQuery = trimQuery;
            listCallback = cb;
            handleCallback(cb);
          }
        }
      }
    };
    const loadMore = async () => {
      if (c.total > items.value.length && c.model.appDataEntityId) {
        const res = await c.getServiceData(searchQuery, props.data, {
          isLoadMore: true
        });
        if (res) {
          items.value = [...items.value, ...res.data];
          if (listCallback) {
            handleCallback(listCallback);
          }
        }
      }
    };
    const onACSelect = async (item) => {
      isShowAll.value = true;
      setEditable(false);
      if (item.srftype === "empty" || item.detailType === "DEUIACTION" || item.srftype === "loadmore")
        return resetCurValue();
      await handleDataSelect(item);
    };
    const onClear = () => {
      const dataItems = c.dataItems;
      if (dataItems == null ? void 0 : dataItems.length) {
        dataItems.forEach((dataItem) => {
          emit("change", null, dataItem.id);
        });
      }
      if (c.valueItem) {
        emit("change", null, c.valueItem);
      }
      emit("change", null);
    };
    const closeCircle = (c.linkView ? 1 : 0) + (c.pickupView ? 1 : 0);
    watch(editorRef, (newVal) => {
      if (props.autoFocus && newVal && newVal.focus) {
        newVal.focus();
      }
    });
    const onFocus = (e) => {
      isReverse.value = true;
      if (!c.noAC) {
        editorRef.value.loading = true;
      }
      emit("focus", e);
      setEditable(true);
    };
    const onBlur = (e) => {
      isReverse.value = false;
      resetCurValue();
      emit("blur", e);
      setEditable(false);
    };
    const handleKeyUp = (e) => {
      if (e && e.code === "Enter") {
        emit("enter", e);
      }
    };
    const valueText = computed(() => {
      return renderString(curValue.value);
    });
    watch(valueText, (newVal, oldVal) => {
      if (newVal !== oldVal) {
        emit("infoTextChange", newVal);
      }
    }, {
      immediate: true
    });
    const loadmoreRef = ref();
    const isClosePopper = ref(false);
    const onLoadMoreClick = async (_event) => {
      var _a2, _b;
      _event.preventDefault();
      _event.stopPropagation();
      loadMore();
      (_b = (_a2 = editorRef.value) == null ? void 0 : _a2.popperRef) == null ? void 0 : _b.onOpen();
      isClosePopper.value = true;
    };
    const handlePopperClose = (_event) => {
      var _a2, _b, _c, _d, _e;
      const isClickInside = (_a2 = loadmoreRef.value) == null ? void 0 : _a2.contains(_event.target);
      const isFocus = (_c = (_b = editorRef.value) == null ? void 0 : _b.inputRef) == null ? void 0 : _c.input.contains(_event.target);
      if (!isClickInside && !isFocus && isClosePopper.value) {
        (_e = (_d = editorRef.value) == null ? void 0 : _d.popperRef) == null ? void 0 : _e.onClose();
        isClosePopper.value = false;
      }
    };
    const getPopperScroll = () => {
      var _a2, _b;
      return (_b = (_a2 = editorRef.value) == null ? void 0 : _a2.popperRef) == null ? void 0 : _b.popperRef.contentRef.querySelector(".el-scrollbar__wrap");
    };
    const handleScrollLoad = async () => {
      const infiniteScroll = getPopperScroll();
      if (!infiniteScroll)
        return;
      const {
        scrollTop,
        scrollHeight,
        clientHeight
      } = infiniteScroll;
      const distanceToBottom = scrollHeight - scrollTop - clientHeight;
      if (distanceToBottom <= 20) {
        await loadMore();
      }
    };
    const debScrollLoad = debounce(handleScrollLoad, 300);
    const initLazyLoad = () => {
      var _a2;
      switch (c.pagingMode) {
        case 3:
          document.addEventListener("mouseup", handlePopperClose);
          break;
        case 2:
          (_a2 = getPopperScroll()) == null ? void 0 : _a2.addEventListener("scroll", debScrollLoad);
          break;
        default:
          break;
      }
    };
    onMounted(() => {
      watch(() => props.data[c.valueItem], async (newVal, oldVal) => {
        if (newVal !== oldVal) {
          if (!isLoaded.value && isNil(props.value) && !isNil(newVal)) {
            await onSearch("");
          }
          const curItem = items.value.find((item) => Object.is(item[c.keyName], newVal));
          if (curItem) {
            curValue.value = curItem[c.textName];
            if (isNil(props.value) && !isNil(newVal)) {
              emit("change", curValue.value, c.model.id, true);
            }
          }
          if (newVal === null) {
            emit("change", null, c.model.id, true);
          }
        }
        initLazyLoad();
      }, {
        immediate: true
      });
    });
    onBeforeUnmount(() => {
      var _a2;
      switch (c.pagingMode) {
        case 3:
          document.removeEventListener("mouseup", handlePopperClose);
          break;
        case 2:
          (_a2 = getPopperScroll()) == null ? void 0 : _a2.removeEventListener("scroll", debScrollLoad);
          break;
        default:
          break;
      }
    });
    const renderActionItem = (detail) => {
      if (!c.groupActionState[detail.id].visible)
        return;
      const semanticParams = {
        item: detail,
        state: c.groupActionState[detail.id]
      };
      return createVNode("div", {
        "title": showTitle(detail.tooltip),
        "class": [ns.e("action-item"), ns.be("popper", "action"), semanticClass("editor.popup.action", semanticParams), ns.is("disabled", c.groupActionState[detail.id].disabled)],
        "style": semanticStyle("editor.popup.action", semanticParams),
        "onClick": (event) => {
          if (!c.groupActionState[detail.id].disabled)
            c.onActionClick(detail, props.data, event);
        }
      }, [detail.showIcon && detail.sysImage && createVNode(resolveComponent("iBizIcon"), {
        "icon": detail.sysImage,
        "class": [ns.em("action-item", "icon"), semanticClass("editor.popup.action.icon", semanticParams)],
        "style": semanticStyle("editor.popup.action.icon", semanticParams)
      }, null), createVNode("span", {
        "class": [ns.em("action-item", "label"), ns.em("action-item", "caption"), semanticClass("editor.popup.action.label", semanticParams)],
        "style": semanticStyle("editor.popup.action.label", semanticParams)
      }, [detail.showCaption ? detail.caption : ""])]);
    };
    const renderEmpty = () => {
      return createVNode(resolveComponent("iBizNoData"), {
        "style": semanticStyle("editor.popup.empty"),
        "class": [ns.e("empty"), ns.be("popper", "item"), semanticClass("editor.popup.empty")],
        "onClick": (event) => event.stopPropagation()
      }, null);
    };
    const renderLoadMore = () => {
      return createVNode("div", {
        "ref": loadmoreRef,
        "style": semanticStyle("editor.popup.loadmore"),
        "class": [ns.e("loadmore"), ns.be("popper", "item"), semanticClass("editor.popup.loadmore")],
        "onClick": (_event) => onLoadMoreClick(_event)
      }, [ibiz.i18n.t("editor.common.loadMore")]);
    };
    return {
      c,
      ns,
      items,
      curValue,
      valueText,
      editorRef,
      isReverse,
      childClass,
      childStyle,
      isEditable,
      closeCircle,
      semanticClass,
      semanticStyle,
      showFormDefaultContent,
      onBlur,
      onFocus,
      onClear,
      onSearch,
      onACSelect,
      handleKeyUp,
      setEditable,
      renderEmpty,
      renderLoadMore,
      openLinkView,
      openPickUpView,
      renderActionItem
    };
  },
  render() {
    const overflowMode = this.c.editorParams.overflowMode || this.c.editorParams.overflowmode || ibiz.config.pickerEditor.overflowMode;
    const isEllipsis = overflowMode === "ellipsis";
    const itemContent = (item) => {
      var _a;
      const panel = (_a = this.c.deACMode) == null ? void 0 : _a.itemLayoutPanel;
      const {
        context,
        params
      } = this.c;
      let selected = (item[this.c.textName] || item.srfmajortext) === this.curValue;
      if (this.c.valueItem) {
        selected = (item[this.c.keyName] || item.srfkey) === this.data[this.c.valueItem];
      }
      const className = [this.ns.is("active", selected), this.ns.e("transfer-item"), this.ns.be("popper", "item"), this.semanticClass("editor.popup.item", item)];
      if (this.c.acItemProvider) {
        const component = resolveComponent(this.c.acItemProvider.component);
        return h(component, {
          item,
          controller: this.c,
          class: className,
          style: this.semanticStyle("editor.popup.item", item),
          onClick: () => {
            this.onACSelect(item);
          }
        });
      }
      return panel ? createVNode(resolveComponent("iBizControlShell"), {
        "data": item,
        "style": this.semanticStyle("editor.popup.item", item),
        "class": className,
        "modelData": panel,
        "context": context,
        "params": params,
        "onClick": () => {
          this.onACSelect(item);
        }
      }, null) : createVNode("div", {
        "style": this.semanticStyle("editor.popup.item", item),
        "class": [this.ns.is("ellipsis", isEllipsis), ...className],
        "title": showTitle(isEllipsis ? item[this.c.textName] : ""),
        "onClick": () => {
          this.onACSelect(item);
        }
      }, [item[this.c.textName]]);
    };
    const editContent = this.c.noAC ? createVNode(resolveComponent("el-input"), mergeProps({
      "ref": "editorRef",
      "class": [this.ns.b("input"), this.ns.e("content"), this.semanticClass("editor.content")],
      "style": this.semanticStyle("editor.content"),
      "modelValue": this.curValue,
      "onUpdate:modelValue": ($event) => this.curValue = $event,
      "clearable": true,
      "placeholder": this.c.placeHolder,
      "onClear": this.onClear,
      "disabled": this.disabled,
      "onBlur": this.onBlur,
      "onFocus": this.onFocus,
      "onKeyup": this.handleKeyUp
    }, this.$attrs), {
      suffix: () => {
        if (this.$slots.append)
          return this.$slots.append({});
        if (this.c.noButton)
          return;
        return [this.c.model.pickupAppViewId ? createVNode("ion-icon", {
          "name": "search",
          "onClick": this.openPickUpView,
          "class": [this.ns.e("icon"), this.ns.em("icon", "pickup")]
        }, null) : null, this.c.model.linkAppViewId && this.curValue ? createVNode("ion-icon", {
          "name": "link-arrow",
          "onClick": this.openLinkView,
          "class": [this.ns.e("icon"), this.ns.em("icon", "link")]
        }, null) : null];
      }
    }) : createVNode("div", {
      "class": [this.ns.e("content"), this.ns.e("autocomplete"), this.semanticClass("editor.content"), this.ns.m(this.closeCircle.toString())],
      "style": this.semanticStyle("editor.content")
    }, [createVNode(resolveComponent("el-autocomplete"), mergeProps({
      "ref": "editorRef",
      "class": [this.ns.b("input")],
      "modelValue": this.curValue,
      "onUpdate:modelValue": ($event) => this.curValue = $event,
      "value-key": this.c.textName,
      "placeholder": this.c.placeHolder,
      "clearable": true,
      "popper-class": [this.ns.b("popper"), this.ns.e("transfer"), this.ns.bm("popper", "".concat(this.c.model.id)), this.ns.is("empty", !this.items.length), this.semanticClass("editor.popup")],
      "popper-style": this.semanticStyle("editor.popup"),
      "fetch-suggestions": this.onSearch,
      "onClear": this.onClear,
      "onBlur": this.onBlur,
      "onFocus": this.onFocus,
      "onKeyup": this.handleKeyUp,
      "onSelect": this.onACSelect,
      "disabled": this.disabled,
      "fit-input-width": isEllipsis
    }, this.$attrs), {
      default: ({
        item
      }) => {
        if (this.$slots.append)
          return this.$slots.append({});
        if (item.srftype === "empty")
          return this.renderEmpty();
        if (item.srftype === "loadmore")
          return this.renderLoadMore();
        if (item.detailType === "DEUIACTION")
          return this.renderActionItem(item);
        return itemContent(item);
      },
      suffix: () => {
        if (this.c.noButton)
          return;
        return [this.c.model.pickupAppViewId ? createVNode("ion-icon", {
          "name": "search",
          "onClick": this.openPickUpView,
          "class": [this.ns.e("icon"), this.ns.em("icon", "pickup")]
        }, null) : null, this.c.model.linkAppViewId && this.curValue ? createVNode("ion-icon", {
          "name": "link-arrow",
          "onClick": this.openLinkView,
          "class": [this.ns.e("icon"), this.ns.em("icon", "link")]
        }, null) : null, this.c.model.showTrigger && !this.c.model.pickupAppViewId ? createVNode("ion-icon", {
          "name": "chevron-down-outline",
          "class": [this.ns.e("suffix"), this.ns.is("reverse", this.isReverse)]
        }, null) : null];
      }
    })]);
    const readonlyContent = createVNode("div", {
      "class": [this.ns.b(), this.ns.m("readonly"), this.ns.e("content"), this.semanticClass("editor.content")],
      "style": this.semanticStyle("editor.content")
    }, [this.valueText]);
    const formDefaultContent = createVNode("div", {
      "class": [this.ns.b("form-default-content"), this.ns.e("content"), this.semanticClass("editor.content")],
      "style": this.semanticStyle("editor.content")
    }, [this.curValue ? this.valueText : createVNode(resolveComponent("iBizEditorEmptyText"), {
      "showPlaceholder": this.c.emptyShowPlaceholder,
      "placeHolder": this.c.placeHolder
    }, null)]);
    return withDirectives(createVNode("div", {
      "class": [this.ns.b(), this.semanticClass("editor.root"), this.disabled ? this.ns.m("disabled") : "", this.ns.is("editable", this.isEditable), this.ns.is("show-default", this.showFormDefaultContent)],
      "style": this.semanticStyle("editor.root")
    }, [this.showFormDefaultContent && formDefaultContent, this.readonly ? readonlyContent : editContent]), [[resolveDirective("child-class"), this.childClass], [resolveDirective("child-style"), this.childStyle]]);
  }
});

export { IBizPicker };
