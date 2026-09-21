import { defineAsyncComponent } from 'vue';
import { IBizControlBase, IBizIcon, IBizRouterView, IBizViewShell, IBizControlShell, IBizCodeList, IBizBadge } from '@ibiz-template/vue3-util';
import { IBizActionToolbar } from './action-toolbar/action-toolbar.mjs';
import { IBizCol } from './col/col.mjs';
import { IBizRow } from './row/row.mjs';
import { IBizRawItem } from './rawitem/rawitem.mjs';
import { IBizNoData } from './no-data/no-data.mjs';
import { IBizSplit } from './split/split.mjs';
import { IBizSplitTrigger } from './split-trigger/split-trigger.mjs';
import { IBizExtendActionTimeLine } from './extend-action-timeline/extend-action-timeline.mjs';
import { ViewMessage } from './view-message/view-message.mjs';
import { IBizPagination } from './pagination/pagination.mjs';
import { IBizSortBar } from './sort-bar/sort-bar.mjs';
import { DataImport } from './data-import/data-import.mjs';
import { DataImport2 } from './data-import2/data-import2.mjs';
import { DataImport2Table } from './data-import2-table/data-import2-table.mjs';
import { DataImport2Select } from './data-import2-select/data-import2-select.mjs';
import { IBizGridSetting } from './grid-setting/grid-setting.mjs';
import { DoingNotice } from './doing-notice/doing-notice.mjs';
import { IBizCarouselComponent } from './carousel/carousel.mjs';
import { IBizCoopAlert } from './coop-alert/coop-alert.mjs';
import { CustomTheme } from './custom-theme/custom-theme.mjs';
import { IBizCarouselCard } from './carousel-card/carousel-card.mjs';
import { IBizEmojiSelect } from './emoji-select/emoji-select.mjs';
import { IBizQuickEdit } from './quick-edit/quick-edit.mjs';
import { IBizFullscreenToolbar } from './fullscreen-toolbar/fullscreen-toolbar.mjs';
import { IBizPqlEditor } from './pql-editor/pql-editor.mjs';
import { IBizCustomFilterCondition } from './custom-filter-condition/custom-filter-condition.mjs';
import { IBizAnchorContainer } from './anchor-container/anchor-container.mjs';
import { IBizButtonList } from './button-list/button-list.mjs';
import { IBizControlNavigation } from './control-navigation/control-navigation.mjs';
import { IBizGanttSetting } from './gantt-setting/gantt-setting.mjs';
import { IBizNavSplit } from './nav-split/nav-split.mjs';
import { IBizCropping } from './cropping/cropping.mjs';

"use strict";
const IBizCommonComponents = {
  install: (v) => {
    v.component(IBizCropping.name, IBizCropping);
    v.component(IBizControlBase.name, IBizControlBase);
    v.component(IBizQuickEdit.name, IBizQuickEdit);
    v.component(IBizEmojiSelect.name, IBizEmojiSelect);
    v.component(IBizIcon.name, IBizIcon);
    v.component(DoingNotice.name, DoingNotice);
    v.component(IBizRow.name, IBizRow);
    v.component(IBizCol.name, IBizCol);
    v.component(IBizRouterView.name, IBizRouterView);
    v.component(IBizActionToolbar.name, IBizActionToolbar);
    v.component(IBizViewShell.name, IBizViewShell);
    v.component(IBizControlShell.name, IBizControlShell);
    v.component(IBizRawItem.name, IBizRawItem);
    v.component(IBizCodeList.name, IBizCodeList);
    v.component(IBizNoData.name, IBizNoData);
    v.component(IBizSplit.name, IBizSplit);
    v.component(IBizSplitTrigger.name, IBizSplitTrigger);
    v.component(IBizExtendActionTimeLine.name, IBizExtendActionTimeLine);
    v.component(ViewMessage.name, ViewMessage);
    v.component(IBizPagination.name, IBizPagination);
    v.component(IBizSortBar.name, IBizSortBar);
    v.component(DataImport.name, DataImport);
    v.component(DataImport2.name, DataImport2);
    v.component(DataImport2Table.name, DataImport2Table);
    v.component(DataImport2Select.name, DataImport2Select);
    v.component(IBizGridSetting.name, IBizGridSetting);
    v.component(
      "IBizMapChart",
      defineAsyncComponent({
        loader: () => import('./map-chart/map-chart.mjs')
      })
    );
    v.component(
      "IBizMapChartUser",
      defineAsyncComponent({
        loader: () => import('./map-chart-user/map-chart-user.mjs')
      })
    );
    v.component(IBizBadge.name, IBizBadge);
    v.component(IBizCarouselComponent.name, IBizCarouselComponent);
    v.component(IBizCoopAlert.name, IBizCoopAlert);
    v.component(CustomTheme.name, CustomTheme);
    v.component(IBizCarouselCard.name, IBizCarouselCard);
    v.component(IBizFullscreenToolbar.name, IBizFullscreenToolbar);
    v.component(IBizPqlEditor.name, IBizPqlEditor);
    v.component(IBizCustomFilterCondition.name, IBizCustomFilterCondition);
    v.component(IBizAnchorContainer.name, IBizAnchorContainer);
    v.component(IBizButtonList.name, IBizButtonList);
    v.component(IBizControlNavigation.name, IBizControlNavigation);
    v.component(IBizGanttSetting.name, IBizGanttSetting);
    v.component(IBizNavSplit.name, IBizNavSplit);
  }
};

export { DoingNotice, IBizActionToolbar, IBizCol, IBizCommonComponents, IBizRawItem, IBizRow, IBizSortBar, IBizSplit, IBizSplitTrigger, IBizCommonComponents as default };
