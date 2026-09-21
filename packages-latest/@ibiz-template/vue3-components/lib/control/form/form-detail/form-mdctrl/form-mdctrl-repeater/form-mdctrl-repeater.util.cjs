'use strict';

var vue = require('vue');

"use strict";
function useLoadMore(initItems, chunkSize) {
  let totalItems = [];
  let page = 1;
  const renderItems = vue.ref([]);
  const updateTotalItems = (items) => {
    page = 1;
    totalItems = items != null ? items : [];
    renderItems.value = totalItems.slice(0, chunkSize);
  };
  updateTotalItems(initItems);
  const loadMore = () => {
    if (renderItems.value.length >= totalItems.length) {
      return;
    }
    page += 1;
    const start = (page - 1) * chunkSize;
    const end = page * chunkSize;
    renderItems.value.push(...totalItems.slice(start, end));
  };
  return {
    renderItems,
    loadMore,
    updateTotalItems
  };
}

exports.useLoadMore = useLoadMore;
