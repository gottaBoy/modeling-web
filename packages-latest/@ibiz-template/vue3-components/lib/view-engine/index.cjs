'use strict';

var editView_engine = require('./edit-view.engine.cjs');
var editView2_engine = require('./edit-view2.engine.cjs');
var editView3_engine = require('./edit-view3.engine.cjs');
var editView4_engine = require('./edit-view4.engine.cjs');
var gridView_engine = require('./grid-view.engine.cjs');
var indexView_engine = require('./index-view.engine.cjs');
var listView_engine = require('./list-view.engine.cjs');
var dataView_engine = require('./data-view.engine.cjs');
var optView_engine = require('./opt-view.engine.cjs');
var pickupGridView_engine = require('./pickup-grid-view.engine.cjs');
var pickupView_engine = require('./pickup-view.engine.cjs');
var mpickupViewEngine = require('./mpickup-view-engine.cjs');
var treeView_engine = require('./tree-view.engine.cjs');
var tabExpView_engine = require('./tab-exp-view.engine.cjs');
var gridExpView_engine = require('./grid-exp-view.engine.cjs');
var listExpView_engine = require('./list-exp-view.engine.cjs');
var dataViewExpView_engine = require('./data-view-exp-view.engine.cjs');
var treeExpView_engine = require('./tree-exp-view.engine.cjs');
var wizardViewEngine = require('./wizard-view-engine.cjs');
var chartView_engine = require('./chart-view.engine.cjs');
var wfDynaEditView_engine = require('./wf-dyna-edit-view.engine.cjs');
var wfDynaEditView3_engine = require('./wf-dyna-edit-view3.engine.cjs');
var wfDynaActionView_engine = require('./wf-dyna-action-view.engine.cjs');
var wfDynaStartView_engine = require('./wf-dyna-start-view.engine.cjs');
var portalViewEngine = require('./portal-view-engine.cjs');
var panelViewEngine = require('./panel-view-engine.cjs');
var customView_engine = require('./custom-view.engine.cjs');
var mdCustomView_engine = require('./md-custom-view.engine.cjs');
var pickupTreeView_engine = require('./pickup-tree-view.engine.cjs');
var pickupDataView_engine = require('./pickup-data-view.engine.cjs');
var pickupView2_engine = require('./pickup-view2.engine.cjs');
var calendarView_engine = require('./calendar-view.engine.cjs');
var calendarExpView_engine = require('./calendar-exp-view.engine.cjs');
var mpickupView2Engine = require('./mpickup-view2-engine.cjs');
var kanbanView_engine = require('./kanban-view.engine.cjs');
var formPickupDataView_engine = require('./form-pickup-data-view.engine.cjs');
var loginView_engine = require('./login-view.engine.cjs');
var treeGridExView_engine = require('./tree-grid-ex-view.engine.cjs');
var treeGridView_engine = require('./tree-grid-view.engine.cjs');
var meditView9_engine = require('./medit-view9.engine.cjs');
var chartExpView_engine = require('./chart-exp-view.engine.cjs');
var mapView_engine = require('./map-view.engine.cjs');
var reportView_engine = require('./report-view.engine.cjs');
var ganttView_engine = require('./gantt-view.engine.cjs');
var deIndexViewEngine = require('./de-index-view-engine.cjs');
var subAppRefView_engine = require('./sub-app-ref-view.engine.cjs');
var tabSearchView_engine = require('./tab-search-view.engine.cjs');
var appDataUploadView_engine = require('./app-data-upload-view.engine.cjs');
var wfStepDataView_engine = require('./wf-step-data-view.engine.cjs');
var appStartView_engine = require('./app-start-view.engine.cjs');
var appWelcomeView_engine = require('./app-welcome-view.engine.cjs');
var expView_engine = require('./exp-view.engine.cjs');

"use strict";
const IBizViewEngine = {
  install: (_v) => {
    ibiz.engine.register(
      "VIEW_APPWFSTEPDATAVIEW",
      (c) => new wfStepDataView_engine.WFStepDataViewEngine(c)
    );
    ibiz.engine.register(
      "VIEW_AppIndexView",
      (c) => new indexView_engine.IndexViewEngine(c)
    );
    ibiz.engine.register(
      "VIEW_APPINDEXVIEW",
      (c) => new indexView_engine.IndexViewEngine(c)
    );
    ibiz.engine.register(
      "VIEW_GridView",
      (c) => new gridView_engine.GridViewEngine(c)
    );
    ibiz.engine.register(
      "VIEW_ListView",
      (c) => new listView_engine.ListViewEngine(c)
    );
    ibiz.engine.register(
      "VIEW_TreeView",
      (c) => new treeView_engine.TreeViewEngine(c)
    );
    ibiz.engine.register(
      "VIEW_EditView",
      (c) => new editView_engine.EditViewEngine(c)
    );
    ibiz.engine.register(
      "VIEW_EditView2",
      (c) => new editView2_engine.EditView2Engine(c)
    );
    ibiz.engine.register(
      "VIEW_EditView3",
      (c) => new editView3_engine.EditView3Engine(c)
    );
    ibiz.engine.register(
      "VIEW_EditView4",
      (c) => new editView4_engine.EditView4Engine(c)
    );
    ibiz.engine.register(
      "VIEW_DataView",
      (c) => new dataView_engine.DataViewEngine(c)
    );
    ibiz.engine.register(
      "VIEW_OptionView",
      (c) => new optView_engine.OptViewEngine(c)
    );
    ibiz.engine.register(
      "VIEW_PickupGridView",
      (c) => new pickupGridView_engine.PickupGridViewEngine(c)
    );
    ibiz.engine.register(
      "VIEW_PickupTreeView",
      (c) => new pickupTreeView_engine.PickupTreeViewEngine(c)
    );
    ibiz.engine.register(
      "VIEW_DEPICKUPVIEW2",
      (c) => new pickupView2_engine.PickupView2Engine(c)
    );
    ibiz.engine.register(
      "VIEW_PickupView",
      (c) => new pickupView_engine.PickupViewEngine(c)
    );
    ibiz.engine.register(
      "VIEW_MPickupView",
      (c) => new mpickupViewEngine.MPickupViewEngine(c)
    );
    ibiz.engine.register(
      "VIEW_DEMPICKUPVIEW2",
      (c) => new mpickupView2Engine.MPickupView2Engine(c)
    );
    ibiz.engine.register(
      "VIEW_TabExpView",
      (c) => new tabExpView_engine.TabExpViewEngine(c)
    );
    ibiz.engine.register(
      "VIEW_GridExpView",
      (c) => new gridExpView_engine.GridExpViewEngine(c)
    );
    ibiz.engine.register(
      "VIEW_ListExpView",
      (c) => new listExpView_engine.ListExpViewEngine(c)
    );
    ibiz.engine.register(
      "VIEW_DataViewExpView",
      (c) => new dataViewExpView_engine.DataViewExpViewEngine(c)
    );
    ibiz.engine.register(
      "VIEW_ChartView",
      (c) => new chartView_engine.ChartViewEngine(c)
    );
    ibiz.engine.register(
      "VIEW_TreeExpView",
      (c) => new treeExpView_engine.TreeExpViewEngine(c)
    );
    ibiz.engine.register(
      "VIEW_WizardView",
      (c) => new wizardViewEngine.WizardViewEngine(c)
    );
    ibiz.engine.register(
      "VIEW_WFDynaEditView",
      (c) => new wfDynaEditView_engine.WFDynaEditViewEngine(c)
    );
    ibiz.engine.register(
      "VIEW_DEWFDYNAEDITVIEW3",
      (c) => new wfDynaEditView3_engine.WFDynaEditView3Engine(c)
    );
    ibiz.engine.register(
      "VIEW_DEWFDYNAACTIONVIEW",
      (c) => new wfDynaActionView_engine.WFDynaActionViewEngine(c)
    );
    ibiz.engine.register(
      "VIEW_DEWFDYNASTARTVIEW",
      (c) => new wfDynaStartView_engine.WFDynaStartViewEngine(c)
    );
    ibiz.engine.register(
      "VIEW_APPPORTALVIEW",
      (c) => new portalViewEngine.PortalViewEngine(c)
    );
    ibiz.engine.register(
      "VIEW_DEPORTALVIEW",
      (c) => new portalViewEngine.PortalViewEngine(c)
    );
    ibiz.engine.register(
      "VIEW_PortalView9",
      (c) => new portalViewEngine.PortalViewEngine(c)
    );
    ibiz.engine.register(
      "VIEW_PortalView",
      (c) => new portalViewEngine.PortalViewEngine(c)
    );
    ibiz.engine.register(
      "VIEW_DEPANELVIEW",
      (c) => new panelViewEngine.PanelViewEngine(c)
    );
    ibiz.engine.register(
      "VIEW_APPPANELVIEW",
      (c) => new panelViewEngine.PanelViewEngine(c)
    );
    ibiz.engine.register(
      "VIEW_DECUSTOMVIEW",
      (c) => new customView_engine.CustomViewEngine(c)
    );
    ibiz.engine.register(
      "VIEW_DEMDCUSTOMVIEW",
      (c) => new mdCustomView_engine.MDCustomViewEngine(c)
    );
    ibiz.engine.register(
      "VIEW_DEPICKUPDATAVIEW",
      (c) => new pickupDataView_engine.PickupDataViewEngine(c)
    );
    ibiz.engine.register(
      "VIEW_PickupDataView",
      (c) => new pickupDataView_engine.PickupDataViewEngine(c)
    );
    ibiz.engine.register(
      "VIEW_DEINDEXPICKUPDATAVIEW",
      (c) => new pickupDataView_engine.PickupDataViewEngine(c)
    );
    ibiz.engine.register(
      "VIEW_DECALENDARVIEW",
      (c) => new calendarView_engine.CalendarViewEngine(c)
    );
    ibiz.engine.register(
      "VIEW_CalendarExpView",
      (c) => new calendarExpView_engine.CalendarExpViewEngine(c)
    );
    ibiz.engine.register(
      "VIEW_FormPickupDataView",
      (c) => new formPickupDataView_engine.FormPickupDataViewEngine(c)
    );
    ibiz.engine.register(
      "VIEW_KanBanView",
      (c) => new kanbanView_engine.KanbanViewEngine(c)
    );
    ibiz.engine.register(
      "VIEW_APPLOGINVIEW",
      (c) => new loginView_engine.LoginViewEngine(c)
    );
    ibiz.engine.register(
      "VIEW_TreeGridExView",
      (c) => new treeGridExView_engine.TreeGridExViewEngine(c)
    );
    ibiz.engine.register(
      "VIEW_DETREEGRIDVIEW",
      (c) => new treeGridView_engine.TreeGridViewEngine(c)
    );
    ibiz.engine.register(
      "VIEW_DECHARTEXPVIEW",
      (c) => new chartExpView_engine.ChartExpViewEngine(c)
    );
    ibiz.engine.register(
      "VIEW_DEGANTTVIEW",
      (c) => new ganttView_engine.GanttViewEngine(c)
    );
    ibiz.engine.register(
      "VIEW_DESUBAPPREFVIEW",
      (c) => new subAppRefView_engine.SubAppRefViewEngine(c)
    );
    ibiz.engine.register(
      "VIEW_APPDATAUPLOADVIEW",
      (c) => new appDataUploadView_engine.AppDataUploadViewEngine(c)
    );
    ibiz.engine.register(
      "VIEW_APPSTARTVIEW",
      (c) => new appStartView_engine.AppStartViewEngine(c)
    );
    ibiz.engine.register(
      "VIEW_APPWELCOMEVIEW",
      (c) => new appWelcomeView_engine.AppWelcomeViewEngine(c)
    );
    ibiz.engine.register(
      "VIEW_GridView9",
      (c) => new gridView_engine.GridViewEngine(c)
    );
    ibiz.engine.register(
      "VIEW_ListView9",
      (c) => new listView_engine.ListViewEngine(c)
    );
    ibiz.engine.register(
      "VIEW_EditView9",
      (c) => new editView_engine.EditViewEngine(c)
    );
    ibiz.engine.register(
      "VIEW_DataView9",
      (c) => new dataView_engine.DataViewEngine(c)
    );
    ibiz.engine.register(
      "VIEW_TreeView9",
      (c) => new treeView_engine.TreeViewEngine(c)
    );
    ibiz.engine.register(
      "VIEW_DETABEXPVIEW9",
      (c) => new tabExpView_engine.TabExpViewEngine(c)
    );
    ibiz.engine.register(
      "VIEW_PortalView9",
      (c) => new portalViewEngine.PortalViewEngine(c)
    );
    ibiz.engine.register(
      "VIEW_DEPORTALVIEW9",
      (c) => new portalViewEngine.PortalViewEngine(c)
    );
    ibiz.engine.register(
      "VIEW_DEMEDITVIEW9",
      (c) => new meditView9_engine.MEditView9Engine(c)
    );
    ibiz.engine.register(
      "VIEW_DEMAPVIEW",
      (c) => new mapView_engine.MapViewEngine(c)
    );
    ibiz.engine.register(
      "VIEW_DEREPORTVIEW",
      (c) => new reportView_engine.ReportViewEngine(c)
    );
    ibiz.engine.register(
      "VIEW_DEINDEXVIEW",
      (c) => new deIndexViewEngine.DEIndexViewEngine(c)
    );
    ibiz.engine.register(
      "VIEW_DETABSEARCHVIEW",
      (c) => new tabSearchView_engine.TabSearchViewEngine(c)
    );
  }
};

exports.EditViewEngine = editView_engine.EditViewEngine;
exports.EditView2Engine = editView2_engine.EditView2Engine;
exports.EditView3Engine = editView3_engine.EditView3Engine;
exports.EditView4Engine = editView4_engine.EditView4Engine;
exports.GridViewEngine = gridView_engine.GridViewEngine;
exports.IndexViewEngine = indexView_engine.IndexViewEngine;
exports.ListViewEngine = listView_engine.ListViewEngine;
exports.DataViewEngine = dataView_engine.DataViewEngine;
exports.OptViewEngine = optView_engine.OptViewEngine;
exports.PickupGridViewEngine = pickupGridView_engine.PickupGridViewEngine;
exports.PickupViewEngine = pickupView_engine.PickupViewEngine;
exports.MPickupViewEngine = mpickupViewEngine.MPickupViewEngine;
exports.TreeViewEngine = treeView_engine.TreeViewEngine;
exports.TabExpViewEngine = tabExpView_engine.TabExpViewEngine;
exports.GridExpViewEngine = gridExpView_engine.GridExpViewEngine;
exports.ListExpViewEngine = listExpView_engine.ListExpViewEngine;
exports.DataViewExpViewEngine = dataViewExpView_engine.DataViewExpViewEngine;
exports.TreeExpViewEngine = treeExpView_engine.TreeExpViewEngine;
exports.WizardViewEngine = wizardViewEngine.WizardViewEngine;
exports.ChartViewEngine = chartView_engine.ChartViewEngine;
exports.WFDynaEditViewEngine = wfDynaEditView_engine.WFDynaEditViewEngine;
exports.WFDynaEditView3Engine = wfDynaEditView3_engine.WFDynaEditView3Engine;
exports.WFDynaActionViewEngine = wfDynaActionView_engine.WFDynaActionViewEngine;
exports.WFDynaStartViewEngine = wfDynaStartView_engine.WFDynaStartViewEngine;
exports.PortalViewEngine = portalViewEngine.PortalViewEngine;
exports.PanelViewEngine = panelViewEngine.PanelViewEngine;
exports.CustomViewEngine = customView_engine.CustomViewEngine;
exports.MDCustomViewEngine = mdCustomView_engine.MDCustomViewEngine;
exports.PickupTreeViewEngine = pickupTreeView_engine.PickupTreeViewEngine;
exports.PickupDataViewEngine = pickupDataView_engine.PickupDataViewEngine;
exports.PickupView2Engine = pickupView2_engine.PickupView2Engine;
exports.CalendarViewEngine = calendarView_engine.CalendarViewEngine;
exports.CalendarExpViewEngine = calendarExpView_engine.CalendarExpViewEngine;
exports.MPickupView2Engine = mpickupView2Engine.MPickupView2Engine;
exports.KanbanViewEngine = kanbanView_engine.KanbanViewEngine;
exports.FormPickupDataViewEngine = formPickupDataView_engine.FormPickupDataViewEngine;
exports.LoginViewEngine = loginView_engine.LoginViewEngine;
exports.TreeGridExViewEngine = treeGridExView_engine.TreeGridExViewEngine;
exports.TreeGridViewEngine = treeGridView_engine.TreeGridViewEngine;
exports.MEditView9Engine = meditView9_engine.MEditView9Engine;
exports.ChartExpViewEngine = chartExpView_engine.ChartExpViewEngine;
exports.MapViewEngine = mapView_engine.MapViewEngine;
exports.ReportViewEngine = reportView_engine.ReportViewEngine;
exports.GanttViewEngine = ganttView_engine.GanttViewEngine;
exports.DEIndexViewEngine = deIndexViewEngine.DEIndexViewEngine;
exports.SubAppRefViewEngine = subAppRefView_engine.SubAppRefViewEngine;
exports.TabSearchViewEngine = tabSearchView_engine.TabSearchViewEngine;
exports.AppDataUploadViewEngine = appDataUploadView_engine.AppDataUploadViewEngine;
exports.WFStepDataViewEngine = wfStepDataView_engine.WFStepDataViewEngine;
exports.ExpViewEngine = expView_engine.ExpViewEngine;
exports.IBizViewEngine = IBizViewEngine;
