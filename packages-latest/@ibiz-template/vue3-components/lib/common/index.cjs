'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var vue3Util = require('@ibiz-template/vue3-util');
var actionToolbar = require('./action-toolbar/action-toolbar.cjs');
var col = require('./col/col.cjs');
var row = require('./row/row.cjs');
var rawitem = require('./rawitem/rawitem.cjs');
var noData = require('./no-data/no-data.cjs');
var split = require('./split/split.cjs');
var splitTrigger = require('./split-trigger/split-trigger.cjs');
var extendActionTimeline = require('./extend-action-timeline/extend-action-timeline.cjs');
var viewMessage = require('./view-message/view-message.cjs');
var pagination = require('./pagination/pagination.cjs');
var sortBar = require('./sort-bar/sort-bar.cjs');
var dataImport = require('./data-import/data-import.cjs');
var dataImport2 = require('./data-import2/data-import2.cjs');
var dataImport2Table = require('./data-import2-table/data-import2-table.cjs');
var dataImport2Select = require('./data-import2-select/data-import2-select.cjs');
var gridSetting = require('./grid-setting/grid-setting.cjs');
var doingNotice = require('./doing-notice/doing-notice.cjs');
var carousel = require('./carousel/carousel.cjs');
var coopAlert = require('./coop-alert/coop-alert.cjs');
var customTheme = require('./custom-theme/custom-theme.cjs');
var carouselCard = require('./carousel-card/carousel-card.cjs');
var emojiSelect = require('./emoji-select/emoji-select.cjs');
var quickEdit = require('./quick-edit/quick-edit.cjs');
var fullscreenToolbar = require('./fullscreen-toolbar/fullscreen-toolbar.cjs');
var pqlEditor = require('./pql-editor/pql-editor.cjs');
var customFilterCondition = require('./custom-filter-condition/custom-filter-condition.cjs');
var anchorContainer = require('./anchor-container/anchor-container.cjs');
var buttonList = require('./button-list/button-list.cjs');
var controlNavigation = require('./control-navigation/control-navigation.cjs');
var ganttSetting = require('./gantt-setting/gantt-setting.cjs');
var navSplit = require('./nav-split/nav-split.cjs');
var cropping = require('./cropping/cropping.cjs');
var editorEmptyText = require('./editor-empty-text/editor-empty-text.cjs');
var kanbenSetting = require('./kanben-setting/kanben-setting.cjs');
var highLightCode = require('./high-light-code/high-light-code.cjs');

"use strict";
const IBizCommonComponents = {
  install: (v) => {
    v.component(kanbenSetting.IBizKanbanSetting.name, kanbenSetting.IBizKanbanSetting);
    v.component(editorEmptyText.IBizEditorEmptyText.name, editorEmptyText.IBizEditorEmptyText);
    v.component(cropping.IBizCropping.name, cropping.IBizCropping);
    v.component(vue3Util.IBizControlBase.name, vue3Util.IBizControlBase);
    v.component(quickEdit.IBizQuickEdit.name, quickEdit.IBizQuickEdit);
    v.component(emojiSelect.IBizEmojiSelect.name, emojiSelect.IBizEmojiSelect);
    v.component(vue3Util.IBizIcon.name, vue3Util.IBizIcon);
    v.component(doingNotice.DoingNotice.name, doingNotice.DoingNotice);
    v.component(row.IBizRow.name, row.IBizRow);
    v.component(col.IBizCol.name, col.IBizCol);
    v.component(vue3Util.IBizRouterView.name, vue3Util.IBizRouterView);
    v.component(actionToolbar.IBizActionToolbar.name, actionToolbar.IBizActionToolbar);
    v.component(vue3Util.IBizViewShell.name, vue3Util.IBizViewShell);
    v.component(vue3Util.IBizControlShell.name, vue3Util.IBizControlShell);
    v.component(rawitem.IBizRawItem.name, rawitem.IBizRawItem);
    v.component(vue3Util.IBizCodeList.name, vue3Util.IBizCodeList);
    v.component(noData.IBizNoData.name, noData.IBizNoData);
    v.component(split.IBizSplit.name, split.IBizSplit);
    v.component(splitTrigger.IBizSplitTrigger.name, splitTrigger.IBizSplitTrigger);
    v.component(extendActionTimeline.IBizExtendActionTimeLine.name, extendActionTimeline.IBizExtendActionTimeLine);
    v.component(viewMessage.ViewMessage.name, viewMessage.ViewMessage);
    v.component(pagination.IBizPagination.name, pagination.IBizPagination);
    v.component(sortBar.IBizSortBar.name, sortBar.IBizSortBar);
    v.component(dataImport.DataImport.name, dataImport.DataImport);
    v.component(dataImport2.DataImport2.name, dataImport2.DataImport2);
    v.component(dataImport2Table.DataImport2Table.name, dataImport2Table.DataImport2Table);
    v.component(dataImport2Select.DataImport2Select.name, dataImport2Select.DataImport2Select);
    v.component(gridSetting.IBizGridSetting.name, gridSetting.IBizGridSetting);
    v.component(
      "IBizMapChart",
      vue.defineAsyncComponent({
        loader: () => Promise.resolve().then(function () { return require('./map-chart/map-chart.cjs'); })
      })
    );
    v.component(
      "IBizMapChartUser",
      vue.defineAsyncComponent({
        loader: () => Promise.resolve().then(function () { return require('./map-chart-user/map-chart-user.cjs'); })
      })
    );
    v.component(vue3Util.IBizBadge.name, vue3Util.IBizBadge);
    v.component(carousel.IBizCarouselComponent.name, carousel.IBizCarouselComponent);
    v.component(coopAlert.IBizCoopAlert.name, coopAlert.IBizCoopAlert);
    v.component(customTheme.CustomTheme.name, customTheme.CustomTheme);
    v.component(carouselCard.IBizCarouselCard.name, carouselCard.IBizCarouselCard);
    v.component(fullscreenToolbar.IBizFullscreenToolbar.name, fullscreenToolbar.IBizFullscreenToolbar);
    v.component(pqlEditor.IBizPqlEditor.name, pqlEditor.IBizPqlEditor);
    v.component(customFilterCondition.IBizCustomFilterCondition.name, customFilterCondition.IBizCustomFilterCondition);
    v.component(anchorContainer.IBizAnchorContainer.name, anchorContainer.IBizAnchorContainer);
    v.component(buttonList.IBizButtonList.name, buttonList.IBizButtonList);
    v.component(controlNavigation.IBizControlNavigation.name, controlNavigation.IBizControlNavigation);
    v.component(ganttSetting.IBizGanttSetting.name, ganttSetting.IBizGanttSetting);
    v.component(navSplit.IBizNavSplit.name, navSplit.IBizNavSplit);
    v.component(vue3Util.IBizSignaturePad.name, vue3Util.IBizSignaturePad);
    v.component(highLightCode.IBizHighLightCode.name, highLightCode.IBizHighLightCode);
  }
};

exports.IBizActionToolbar = actionToolbar.IBizActionToolbar;
exports.IBizCol = col.IBizCol;
exports.IBizRow = row.IBizRow;
exports.IBizRawItem = rawitem.IBizRawItem;
exports.IBizSplit = split.IBizSplit;
exports.IBizSplitTrigger = splitTrigger.IBizSplitTrigger;
exports.IBizSortBar = sortBar.IBizSortBar;
exports.DoingNotice = doingNotice.DoingNotice;
exports.IBizCommonComponents = IBizCommonComponents;
exports.default = IBizCommonComponents;
