import { defineComponent, computed, createVNode, resolveComponent, mergeProps, createTextVNode } from 'vue';
import { useNamespace } from '@ibiz-template/vue3-util';
import { isNil } from 'ramda';
import './pagination.css';
import { showTitle } from '@ibiz-template/core';

"use strict";
const IBizPagination = /* @__PURE__ */ defineComponent({
  name: "IBizPagination",
  props: {
    total: {
      type: Number,
      required: true
    },
    curPage: {
      type: Number,
      required: true
    },
    size: {
      type: Number,
      required: true
    },
    totalPages: {
      type: Number || void 0,
      required: false
    },
    popperClass: {
      type: String,
      required: false
    }
  },
  emits: ["change", "pageSizeChange", "pageRefresh"],
  setup(props, {
    emit
  }) {
    const ns = useNamespace("pagination");
    const start = computed(() => {
      return (props.curPage - 1) * props.size + 1;
    });
    const end = computed(() => {
      return props.curPage * props.size;
    });
    const onPageChange = (page) => {
      emit("change", page);
    };
    const onPageSizeChange = (size) => {
      emit("pageSizeChange", size);
    };
    const pageRefresh = () => {
      emit("pageRefresh");
    };
    const inputChange = (event) => {
      var _a;
      (_a = event.stopPropagation) == null ? void 0 : _a.call(event);
    };
    const calcTotalPages = computed(() => {
      return Math.ceil(props.total / props.size);
    });
    return {
      ns,
      start,
      end,
      onPageChange,
      onPageSizeChange,
      pageRefresh,
      inputChange,
      calcTotalPages
    };
  },
  render() {
    return createVNode("div", {
      "class": this.ns.b()
    }, [createVNode(resolveComponent("el-pagination"), mergeProps({
      "layout": "slot, prev, pager, next, sizes, jumper",
      "background": true,
      "total": this.total,
      "page-count": !isNil(this.totalPages) && this.calcTotalPages === this.totalPages ? this.calcTotalPages : this.totalPages,
      "current-page": this.curPage,
      "page-size": this.size,
      "popper-class": this.popperClass,
      "page-sizes": [10, 20, 30, 40, 50, 60, 70, 80, 90, 100]
    }, {
      "onUpdate:currentPage": this.onPageChange,
      "onUpdate:pageSize": this.onPageSizeChange,
      onChange: this.inputChange
    }), {
      default: () => [createVNode("span", {
        "class": this.ns.b("btn")
      }, [createVNode(resolveComponent("el-button"), {
        "title": showTitle(ibiz.i18n.t("app.refresh")),
        "onClick": this.pageRefresh
      }, {
        default: () => [createVNode("ion-icon", {
          "name": "refresh-outline"
        }, null)]
      })]), isNil(this.totalPages) || this.calcTotalPages === this.totalPages ? createVNode("span", null, [ibiz.i18n.t("component.pagination.display"), createTextVNode("\xA0"), this.start, createTextVNode("\xA0-\xA0"), this.end, createTextVNode("\xA0"), ibiz.i18n.t("component.pagination.piece"), createTextVNode("\uFF0C")]) : null, createVNode("span", null, [ibiz.i18n.t("component.pagination.total"), createTextVNode("\xA0"), this.total, createTextVNode("\xA0"), ibiz.i18n.t("component.pagination.pieceData")])]
    })]);
  }
});

export { IBizPagination };
