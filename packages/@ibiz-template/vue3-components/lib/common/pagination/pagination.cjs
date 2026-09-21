'use strict';

var vue = require('vue');
var vue3Util = require('@ibiz-template/vue3-util');
var ramda = require('ramda');
require('./pagination.css');
var core = require('@ibiz-template/core');

"use strict";
const IBizPagination = /* @__PURE__ */ vue.defineComponent({
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
    const ns = vue3Util.useNamespace("pagination");
    const start = vue.computed(() => {
      return (props.curPage - 1) * props.size + 1;
    });
    const end = vue.computed(() => {
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
    const calcTotalPages = vue.computed(() => {
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
    return vue.createVNode("div", {
      "class": this.ns.b()
    }, [vue.createVNode(vue.resolveComponent("el-pagination"), vue.mergeProps({
      "layout": "slot, prev, pager, next, sizes, jumper",
      "background": true,
      "total": this.total,
      "page-count": !ramda.isNil(this.totalPages) && this.calcTotalPages === this.totalPages ? this.calcTotalPages : this.totalPages,
      "current-page": this.curPage,
      "page-size": this.size,
      "popper-class": this.popperClass,
      "page-sizes": [10, 20, 30, 40, 50, 60, 70, 80, 90, 100]
    }, {
      "onUpdate:currentPage": this.onPageChange,
      "onUpdate:pageSize": this.onPageSizeChange,
      onChange: this.inputChange
    }), {
      default: () => [vue.createVNode("span", {
        "class": this.ns.b("btn")
      }, [vue.createVNode(vue.resolveComponent("el-button"), {
        "title": core.showTitle(ibiz.i18n.t("app.refresh")),
        "onClick": this.pageRefresh
      }, {
        default: () => [vue.createVNode("ion-icon", {
          "name": "refresh-outline"
        }, null)]
      })]), ramda.isNil(this.totalPages) || this.calcTotalPages === this.totalPages ? vue.createVNode("span", null, [ibiz.i18n.t("component.pagination.display"), vue.createTextVNode("\xA0"), this.start, vue.createTextVNode("\xA0-\xA0"), this.end, vue.createTextVNode("\xA0"), ibiz.i18n.t("component.pagination.piece"), vue.createTextVNode("\uFF0C")]) : null, vue.createVNode("span", null, [ibiz.i18n.t("component.pagination.total"), vue.createTextVNode("\xA0"), this.total, vue.createTextVNode("\xA0"), ibiz.i18n.t("component.pagination.pieceData")])]
    })]);
  }
});

exports.IBizPagination = IBizPagination;
