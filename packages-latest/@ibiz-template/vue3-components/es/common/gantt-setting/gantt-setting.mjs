import { isVNode, createVNode, defineComponent, resolveComponent, ref, watch } from 'vue';
import { useNamespace } from '@ibiz-template/vue3-util';
import { clone } from 'ramda';
import './gantt-setting.css';

"use strict";
function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !isVNode(s);
}
const selectedIcon = () => createVNode("svg", {
  "viewBox": "0 0 16 16",
  "xmlns": "http://www.w3.org/2000/svg",
  "height": "1em",
  "width": "1em",
  "focusable": "false"
}, [createVNode("g", {
  "stroke-width": "1",
  "fill-rule": "evenodd"
}, [createVNode("path", {
  "d": "M6.012 11.201L1.313 6.832l-.817.879 5.54 5.15 9.304-9.163-.842-.855z"
}, null)])]);
const closeIcon = () => createVNode("svg", {
  "viewBox": "0 0 16 16",
  "xmlns": "http://www.w3.org/2000/svg",
  "height": "1em",
  "width": "1em",
  "focusable": "false"
}, [createVNode("g", {
  "stroke-width": "1",
  "fill-rule": "evenodd"
}, [createVNode("path", {
  "d": "M7.456 7.456V-.115h1.2v7.571h7.572v1.2H8.656v7.572h-1.2V8.656H-.115v-1.2h7.571z",
  "transform": "rotate(45 8.056 8.056)"
}, null)])]);
const searchIcon = () => createVNode("svg", {
  "viewBox": "0 0 16 16",
  "xmlns": "http://www.w3.org/2000/svg",
  "height": "1em",
  "width": "1em",
  "focusable": "false"
}, [createVNode("g", {
  "stroke-width": "1",
  "fill-rule": "evenodd"
}, [createVNode("path", {
  "d": "M6.751 12.303A5.557 5.557 0 0 1 1.2 6.751C1.2 3.691 3.69 1.2 6.751 1.2a5.558 5.558 0 0 1 5.551 5.551 5.557 5.557 0 0 1-5.551 5.552M6.751 0a6.751 6.751 0 1 0 4.309 11.949l3.855 3.855a.6.6 0 1 0 .849-.849l-3.854-3.853A6.751 6.751 0 0 0 6.751 0"
}, null)])]);
const IBizGanttSetting = /* @__PURE__ */ defineComponent({
  name: "IBizGanttSetting",
  props: {
    modal: {
      type: Object,
      required: true
    },
    // 表格列状态数组
    columnStates: {
      type: Object,
      required: true
    },
    // 必须显示的列
    mustShowColumns: {
      type: Array,
      required: true,
      default: () => ["sn", "name"]
    },
    // 最多显示多少列，默认值为0，表示无限制
    limitsize: {
      type: Number,
      default: 0
    }
  },
  emits: [],
  setup(props) {
    const ns = useNamespace("gantt-setting");
    const optionalInput = ref("");
    const selectedInput = ref("");
    const states = ref([]);
    const calcMustShowColumn = (item) => {
      return props.mustShowColumns.some((item2) => item.key === item2);
    };
    const initData = () => {
      states.value = clone(props.columnStates);
    };
    watch(() => props.columnStates, () => {
      initData();
    }, {
      immediate: true,
      deep: true
    });
    const onListItemClose = (e, item) => {
      e.stopPropagation();
      Object.assign(item, {
        hidden: !item.hidden
      });
    };
    const onListItemClick = (item) => {
      if (props.limitsize > 0 && item.hidden) {
        const columns = states.value.filter((_item) => {
          const must = calcMustShowColumn(_item);
          return !must && !_item.hidden;
        });
        if (columns && columns.length >= props.limitsize) {
          ibiz.message.warning(ibiz.i18n.t("component.ganttSetting.reachedMaximum"));
          return;
        }
      }
      Object.assign(item, {
        hidden: !item.hidden
      });
    };
    const onClose = () => {
      props.modal.dismiss();
    };
    const onConfirm = () => {
      const modalData = {
        ok: true,
        data: states.value
      };
      props.modal.dismiss(modalData);
    };
    const onResultDefault = () => {
      initData();
    };
    const renderLeftSearch = () => {
      return createVNode(resolveComponent("el-input"), {
        "placeholder": ibiz.i18n.t("app.search"),
        "modelValue": optionalInput.value,
        "onUpdate:modelValue": ($event) => optionalInput.value = $event,
        "clearable": true
      }, {
        prefix: () => searchIcon()
      });
    };
    const renderRightSearch = () => {
      return createVNode(resolveComponent("el-input"), {
        "placeholder": ibiz.i18n.t("app.search"),
        "modelValue": selectedInput.value,
        "onUpdate:modelValue": ($event) => selectedInput.value = $event,
        "clearable": true
      }, {
        prefix: () => searchIcon()
      });
    };
    const renderListItem = (item, type = "optional") => {
      const caption = item.caption || "";
      const isOptional = type === "optional";
      const isMust = calcMustShowColumn(item);
      if (!isOptional && item.hidden && !isMust) {
        return null;
      }
      const isSelectedShow = isOptional && states.value.some((item2) => item.key === item2.key && !item.hidden);
      const searchVal = isOptional ? optionalInput.value : selectedInput.value;
      const isFilterItem = !caption.includes(searchVal);
      return createVNode("div", {
        "class": [ns.b("list-item"), ns.is("disabled", isMust && isOptional), ns.is("filter-item", isFilterItem)],
        "onClick": () => isOptional && !isMust && onListItemClick(item)
      }, [createVNode("div", {
        "class": ns.be("list-item", "caption")
      }, [caption]), createVNode("div", {
        "class": [ns.be("list-item", "end-icon")]
      }, [(isSelectedShow || isOptional && isMust) && selectedIcon(), !isOptional && !isMust && createVNode("div", {
        "class": ns.bem("list-item", "end-icon", "close"),
        "onClick": (e) => onListItemClose(e, item)
      }, [closeIcon()])])]);
    };
    const renderSearchList = (listData = [], type = "optional") => {
      const isOptional = type === "optional";
      const searchVal = isOptional ? optionalInput.value : selectedInput.value;
      let values = [];
      listData.forEach((item) => {
        var _a;
        return ((_a = item.caption) == null ? void 0 : _a.includes(searchVal)) && values.push(item);
      });
      const lengthNum = isOptional ? values.length : listData.filter((item) => !item.hidden).length;
      const caption = isOptional ? ibiz.i18n.t("component.ganttSetting.optionalAttribute") : ibiz.i18n.t("component.ganttSetting.selectedAttribute");
      const limitsizeLag = ibiz.i18n.t("component.ganttSetting.limitsize", {
        max: props.limitsize + props.mustShowColumns.length
      });
      return createVNode("div", {
        "class": ns.b("search-list")
      }, [createVNode("div", {
        "class": ns.be("search-list", "caption")
      }, ["".concat(caption, " \xB7 ").concat(lengthNum, " ").concat(!isOptional && props.limitsize > 0 ? "(".concat(limitsizeLag, ")") : "")]), createVNode("div", {
        "class": ns.be("search-list", "content")
      }, [createVNode("div", {
        "class": ns.be("search-list", "search")
      }, [isOptional ? renderLeftSearch() : renderRightSearch()]), createVNode("div", {
        "class": ns.be("search-list", "list")
      }, [values.map((item) => {
        return renderListItem(item, type);
      })])])]);
    };
    return {
      ns,
      optionalInput,
      selectedInput,
      states,
      renderSearchList,
      onClose,
      onConfirm,
      onResultDefault
    };
  },
  render() {
    let _slot, _slot2, _slot3;
    return createVNode("div", {
      "class": [this.ns.b()]
    }, [createVNode("div", {
      "class": [this.ns.e("header")]
    }, [ibiz.i18n.t("component.ganttSetting.headerCaption")]), createVNode("div", {
      "class": [this.ns.e("content")]
    }, [createVNode("div", {
      "class": [this.ns.em("content", "optional")]
    }, [this.renderSearchList(this.states, "optional")]), createVNode("div", {
      "class": [this.ns.em("content", "selected")]
    }, [this.renderSearchList(this.states, "selected")])]), createVNode("div", {
      "class": [this.ns.e("bottom")]
    }, [createVNode(resolveComponent("el-button"), {
      "type": "text",
      "onClick": this.onResultDefault
    }, _isSlot(_slot = ibiz.i18n.t("component.ganttSetting.resultDefault")) ? _slot : {
      default: () => [_slot]
    }), createVNode("div", {
      "class": [this.ns.em("bottom", "btn-right")]
    }, [createVNode(resolveComponent("el-button"), {
      "type": "text",
      "onClick": this.onClose
    }, _isSlot(_slot2 = ibiz.i18n.t("app.cancel")) ? _slot2 : {
      default: () => [_slot2]
    }), createVNode(resolveComponent("el-button"), {
      "onClick": this.onConfirm
    }, _isSlot(_slot3 = ibiz.i18n.t("app.confirm")) ? _slot3 : {
      default: () => [_slot3]
    })])])]);
  }
});

export { IBizGanttSetting };
