'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var runtime = require('@ibiz-template/runtime');
var vue3Util = require('@ibiz-template/vue3-util');
var searchBar = require('./search-bar.cjs');
var searchBar_provider = require('./search-bar.provider.cjs');
var filterTree = require('./filter-tree/filter-tree.cjs');
var filterModeSelect = require('./filter-mode-select/filter-mode-select.cjs');
var searchGroups = require('./search-groups/search-groups.cjs');
var quickSearchSelect = require('./quick-search-select/quick-search-select.cjs');

"use strict";
const IBizSearchBarControl = vue3Util.withInstall(
  searchBar.SearchBarControl,
  function(v) {
    v.component(searchBar.SearchBarControl.name, searchBar.SearchBarControl);
    v.component(filterTree.FilterTreeControl.name, filterTree.FilterTreeControl);
    v.component(filterModeSelect.FilterModeSelect.name, filterModeSelect.FilterModeSelect);
    v.component(searchGroups.SearchGroups.name, searchGroups.SearchGroups);
    v.component(quickSearchSelect.QuickSearchSelect.name, quickSearchSelect.QuickSearchSelect);
    runtime.registerControlProvider(
      runtime.ControlType.SEARCHBAR,
      () => new searchBar_provider.SearchBarProvider()
    );
  }
);

exports.IBizSearchBarControl = IBizSearchBarControl;
exports.default = IBizSearchBarControl;
