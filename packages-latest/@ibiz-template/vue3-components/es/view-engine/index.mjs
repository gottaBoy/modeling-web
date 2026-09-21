import { EditViewEngine } from './edit-view.engine.mjs';
import { EditView2Engine } from './edit-view2.engine.mjs';
import { EditView3Engine } from './edit-view3.engine.mjs';
import { EditView4Engine } from './edit-view4.engine.mjs';
import { GridViewEngine } from './grid-view.engine.mjs';
import { IndexViewEngine } from './index-view.engine.mjs';
import { ListViewEngine } from './list-view.engine.mjs';
import { DataViewEngine } from './data-view.engine.mjs';
import { OptViewEngine } from './opt-view.engine.mjs';
import { PickupGridViewEngine } from './pickup-grid-view.engine.mjs';
import { PickupViewEngine } from './pickup-view.engine.mjs';
import { MPickupViewEngine } from './mpickup-view-engine.mjs';
import { TreeViewEngine } from './tree-view.engine.mjs';
import { TabExpViewEngine } from './tab-exp-view.engine.mjs';
import { GridExpViewEngine } from './grid-exp-view.engine.mjs';
import { ListExpViewEngine } from './list-exp-view.engine.mjs';
import { DataViewExpViewEngine } from './data-view-exp-view.engine.mjs';
import { TreeExpViewEngine } from './tree-exp-view.engine.mjs';
import { WizardViewEngine } from './wizard-view-engine.mjs';
import { ChartViewEngine } from './chart-view.engine.mjs';
import { WFDynaEditViewEngine } from './wf-dyna-edit-view.engine.mjs';
import { WFDynaEditView3Engine } from './wf-dyna-edit-view3.engine.mjs';
import { WFDynaActionViewEngine } from './wf-dyna-action-view.engine.mjs';
import { WFDynaStartViewEngine } from './wf-dyna-start-view.engine.mjs';
import { PortalViewEngine } from './portal-view-engine.mjs';
import { PanelViewEngine } from './panel-view-engine.mjs';
import { CustomViewEngine } from './custom-view.engine.mjs';
import { MDCustomViewEngine } from './md-custom-view.engine.mjs';
import { PickupTreeViewEngine } from './pickup-tree-view.engine.mjs';
import { PickupDataViewEngine } from './pickup-data-view.engine.mjs';
import { PickupView2Engine } from './pickup-view2.engine.mjs';
import { CalendarViewEngine } from './calendar-view.engine.mjs';
import { CalendarExpViewEngine } from './calendar-exp-view.engine.mjs';
import { MPickupView2Engine } from './mpickup-view2-engine.mjs';
import { KanbanViewEngine } from './kanban-view.engine.mjs';
import { FormPickupDataViewEngine } from './form-pickup-data-view.engine.mjs';
import { LoginViewEngine } from './login-view.engine.mjs';
import { TreeGridExViewEngine } from './tree-grid-ex-view.engine.mjs';
import { TreeGridViewEngine } from './tree-grid-view.engine.mjs';
import { MEditView9Engine } from './medit-view9.engine.mjs';
import { ChartExpViewEngine } from './chart-exp-view.engine.mjs';
import { MapViewEngine } from './map-view.engine.mjs';
import { ReportViewEngine } from './report-view.engine.mjs';
import { GanttViewEngine } from './gantt-view.engine.mjs';
import { DEIndexViewEngine } from './de-index-view-engine.mjs';
import { SubAppRefViewEngine } from './sub-app-ref-view.engine.mjs';
import { TabSearchViewEngine } from './tab-search-view.engine.mjs';
import { AppDataUploadViewEngine } from './app-data-upload-view.engine.mjs';
import { WFStepDataViewEngine } from './wf-step-data-view.engine.mjs';
import { AppStartViewEngine } from './app-start-view.engine.mjs';
import { AppWelcomeViewEngine } from './app-welcome-view.engine.mjs';
export { ExpViewEngine } from './exp-view.engine.mjs';

"use strict";
const IBizViewEngine = {
  install: (_v) => {
    ibiz.engine.register(
      "VIEW_APPWFSTEPDATAVIEW",
      (c) => new WFStepDataViewEngine(c)
    );
    ibiz.engine.register(
      "VIEW_AppIndexView",
      (c) => new IndexViewEngine(c)
    );
    ibiz.engine.register(
      "VIEW_APPINDEXVIEW",
      (c) => new IndexViewEngine(c)
    );
    ibiz.engine.register(
      "VIEW_GridView",
      (c) => new GridViewEngine(c)
    );
    ibiz.engine.register(
      "VIEW_ListView",
      (c) => new ListViewEngine(c)
    );
    ibiz.engine.register(
      "VIEW_TreeView",
      (c) => new TreeViewEngine(c)
    );
    ibiz.engine.register(
      "VIEW_EditView",
      (c) => new EditViewEngine(c)
    );
    ibiz.engine.register(
      "VIEW_EditView2",
      (c) => new EditView2Engine(c)
    );
    ibiz.engine.register(
      "VIEW_EditView3",
      (c) => new EditView3Engine(c)
    );
    ibiz.engine.register(
      "VIEW_EditView4",
      (c) => new EditView4Engine(c)
    );
    ibiz.engine.register(
      "VIEW_DataView",
      (c) => new DataViewEngine(c)
    );
    ibiz.engine.register(
      "VIEW_OptionView",
      (c) => new OptViewEngine(c)
    );
    ibiz.engine.register(
      "VIEW_PickupGridView",
      (c) => new PickupGridViewEngine(c)
    );
    ibiz.engine.register(
      "VIEW_PickupTreeView",
      (c) => new PickupTreeViewEngine(c)
    );
    ibiz.engine.register(
      "VIEW_DEPICKUPVIEW2",
      (c) => new PickupView2Engine(c)
    );
    ibiz.engine.register(
      "VIEW_PickupView",
      (c) => new PickupViewEngine(c)
    );
    ibiz.engine.register(
      "VIEW_MPickupView",
      (c) => new MPickupViewEngine(c)
    );
    ibiz.engine.register(
      "VIEW_DEMPICKUPVIEW2",
      (c) => new MPickupView2Engine(c)
    );
    ibiz.engine.register(
      "VIEW_TabExpView",
      (c) => new TabExpViewEngine(c)
    );
    ibiz.engine.register(
      "VIEW_GridExpView",
      (c) => new GridExpViewEngine(c)
    );
    ibiz.engine.register(
      "VIEW_ListExpView",
      (c) => new ListExpViewEngine(c)
    );
    ibiz.engine.register(
      "VIEW_DataViewExpView",
      (c) => new DataViewExpViewEngine(c)
    );
    ibiz.engine.register(
      "VIEW_ChartView",
      (c) => new ChartViewEngine(c)
    );
    ibiz.engine.register(
      "VIEW_TreeExpView",
      (c) => new TreeExpViewEngine(c)
    );
    ibiz.engine.register(
      "VIEW_WizardView",
      (c) => new WizardViewEngine(c)
    );
    ibiz.engine.register(
      "VIEW_WFDynaEditView",
      (c) => new WFDynaEditViewEngine(c)
    );
    ibiz.engine.register(
      "VIEW_DEWFDYNAEDITVIEW3",
      (c) => new WFDynaEditView3Engine(c)
    );
    ibiz.engine.register(
      "VIEW_DEWFDYNAACTIONVIEW",
      (c) => new WFDynaActionViewEngine(c)
    );
    ibiz.engine.register(
      "VIEW_DEWFDYNASTARTVIEW",
      (c) => new WFDynaStartViewEngine(c)
    );
    ibiz.engine.register(
      "VIEW_APPPORTALVIEW",
      (c) => new PortalViewEngine(c)
    );
    ibiz.engine.register(
      "VIEW_DEPORTALVIEW",
      (c) => new PortalViewEngine(c)
    );
    ibiz.engine.register(
      "VIEW_PortalView9",
      (c) => new PortalViewEngine(c)
    );
    ibiz.engine.register(
      "VIEW_PortalView",
      (c) => new PortalViewEngine(c)
    );
    ibiz.engine.register(
      "VIEW_DEPANELVIEW",
      (c) => new PanelViewEngine(c)
    );
    ibiz.engine.register(
      "VIEW_APPPANELVIEW",
      (c) => new PanelViewEngine(c)
    );
    ibiz.engine.register(
      "VIEW_DECUSTOMVIEW",
      (c) => new CustomViewEngine(c)
    );
    ibiz.engine.register(
      "VIEW_DEMDCUSTOMVIEW",
      (c) => new MDCustomViewEngine(c)
    );
    ibiz.engine.register(
      "VIEW_DEPICKUPDATAVIEW",
      (c) => new PickupDataViewEngine(c)
    );
    ibiz.engine.register(
      "VIEW_PickupDataView",
      (c) => new PickupDataViewEngine(c)
    );
    ibiz.engine.register(
      "VIEW_DEINDEXPICKUPDATAVIEW",
      (c) => new PickupDataViewEngine(c)
    );
    ibiz.engine.register(
      "VIEW_DECALENDARVIEW",
      (c) => new CalendarViewEngine(c)
    );
    ibiz.engine.register(
      "VIEW_CalendarExpView",
      (c) => new CalendarExpViewEngine(c)
    );
    ibiz.engine.register(
      "VIEW_FormPickupDataView",
      (c) => new FormPickupDataViewEngine(c)
    );
    ibiz.engine.register(
      "VIEW_KanBanView",
      (c) => new KanbanViewEngine(c)
    );
    ibiz.engine.register(
      "VIEW_APPLOGINVIEW",
      (c) => new LoginViewEngine(c)
    );
    ibiz.engine.register(
      "VIEW_TreeGridExView",
      (c) => new TreeGridExViewEngine(c)
    );
    ibiz.engine.register(
      "VIEW_DETREEGRIDVIEW",
      (c) => new TreeGridViewEngine(c)
    );
    ibiz.engine.register(
      "VIEW_DECHARTEXPVIEW",
      (c) => new ChartExpViewEngine(c)
    );
    ibiz.engine.register(
      "VIEW_DEGANTTVIEW",
      (c) => new GanttViewEngine(c)
    );
    ibiz.engine.register(
      "VIEW_DESUBAPPREFVIEW",
      (c) => new SubAppRefViewEngine(c)
    );
    ibiz.engine.register(
      "VIEW_APPDATAUPLOADVIEW",
      (c) => new AppDataUploadViewEngine(c)
    );
    ibiz.engine.register(
      "VIEW_APPSTARTVIEW",
      (c) => new AppStartViewEngine(c)
    );
    ibiz.engine.register(
      "VIEW_APPWELCOMEVIEW",
      (c) => new AppWelcomeViewEngine(c)
    );
    ibiz.engine.register(
      "VIEW_GridView9",
      (c) => new GridViewEngine(c)
    );
    ibiz.engine.register(
      "VIEW_ListView9",
      (c) => new ListViewEngine(c)
    );
    ibiz.engine.register(
      "VIEW_EditView9",
      (c) => new EditViewEngine(c)
    );
    ibiz.engine.register(
      "VIEW_DataView9",
      (c) => new DataViewEngine(c)
    );
    ibiz.engine.register(
      "VIEW_TreeView9",
      (c) => new TreeViewEngine(c)
    );
    ibiz.engine.register(
      "VIEW_DETABEXPVIEW9",
      (c) => new TabExpViewEngine(c)
    );
    ibiz.engine.register(
      "VIEW_PortalView9",
      (c) => new PortalViewEngine(c)
    );
    ibiz.engine.register(
      "VIEW_DEPORTALVIEW9",
      (c) => new PortalViewEngine(c)
    );
    ibiz.engine.register(
      "VIEW_DEMEDITVIEW9",
      (c) => new MEditView9Engine(c)
    );
    ibiz.engine.register(
      "VIEW_DEMAPVIEW",
      (c) => new MapViewEngine(c)
    );
    ibiz.engine.register(
      "VIEW_DEREPORTVIEW",
      (c) => new ReportViewEngine(c)
    );
    ibiz.engine.register(
      "VIEW_DEINDEXVIEW",
      (c) => new DEIndexViewEngine(c)
    );
    ibiz.engine.register(
      "VIEW_DETABSEARCHVIEW",
      (c) => new TabSearchViewEngine(c)
    );
  }
};

export { AppDataUploadViewEngine, CalendarExpViewEngine, CalendarViewEngine, ChartExpViewEngine, ChartViewEngine, CustomViewEngine, DEIndexViewEngine, DataViewEngine, DataViewExpViewEngine, EditView2Engine, EditView3Engine, EditView4Engine, EditViewEngine, FormPickupDataViewEngine, GanttViewEngine, GridExpViewEngine, GridViewEngine, IBizViewEngine, IndexViewEngine, KanbanViewEngine, ListExpViewEngine, ListViewEngine, LoginViewEngine, MDCustomViewEngine, MEditView9Engine, MPickupView2Engine, MPickupViewEngine, MapViewEngine, OptViewEngine, PanelViewEngine, PickupDataViewEngine, PickupGridViewEngine, PickupTreeViewEngine, PickupView2Engine, PickupViewEngine, PortalViewEngine, ReportViewEngine, SubAppRefViewEngine, TabExpViewEngine, TabSearchViewEngine, TreeExpViewEngine, TreeGridExViewEngine, TreeGridViewEngine, TreeViewEngine, WFDynaActionViewEngine, WFDynaEditView3Engine, WFDynaEditViewEngine, WFDynaStartViewEngine, WFStepDataViewEngine, WizardViewEngine };
