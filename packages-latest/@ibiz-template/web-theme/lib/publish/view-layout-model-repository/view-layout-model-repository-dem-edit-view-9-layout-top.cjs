'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

"use strict";
var DEMEDITVIEW9_TOP = {
  "viewProxyMode": true,
  "layoutMode": "FLEX",
  "layout": {
    "layout": "FLEX"
  },
  "rootPanelItems": [
    {
      "actionGroupExtractMode": "ITEM",
      "panelItems": [
        {
          "actionGroupExtractMode": "ITEM",
          "panelItems": [
            {
              "actionGroupExtractMode": "ITEM",
              "panelItems": [
                {
                  "caption": "\u9875\u9762\u6807\u9898",
                  "itemStyle": "DEFAULT",
                  "itemType": "CTRLPOS",
                  "layoutPos": {
                    "shrink": 1,
                    "layout": "FLEX"
                  },
                  "showCaption": true,
                  "id": "captionbar"
                }
              ],
              "layout": {
                "align": "center",
                "layout": "FLEX"
              },
              "dataRegionType": "INHERIT",
              "caption": "\u5BB9\u5668",
              "itemStyle": "DEFAULT",
              "itemType": "CONTAINER",
              "layoutPos": {
                "shrink": 1,
                "heightMode": "FULL",
                "layout": "FLEX"
              },
              "id": "view_captionbar"
            }
          ],
          "layout": {
            "layout": "FLEX"
          },
          "dataRegionType": "INHERIT",
          "caption": "\u5BB9\u5668",
          "itemStyle": "DEFAULT",
          "itemType": "CONTAINER",
          "layoutPos": {
            "shrink": 1,
            "heightMode": "FULL",
            "layout": "FLEX"
          },
          "id": "view_header_left"
        },
        {
          "actionGroupExtractMode": "ITEM",
          "panelItems": [
            {
              "actionGroupExtractMode": "ITEM",
              "panelItems": [
                {
                  "caption": "\u5DE5\u5177\u680F",
                  "itemStyle": "DEFAULT",
                  "itemType": "CTRLPOS",
                  "layoutPos": {
                    "shrink": 1,
                    "layout": "FLEX"
                  },
                  "showCaption": true,
                  "id": "toolbar"
                }
              ],
              "layout": {
                "align": "center",
                "layout": "FLEX"
              },
              "dataRegionType": "INHERIT",
              "caption": "\u5BB9\u5668",
              "itemStyle": "DEFAULT",
              "itemType": "CONTAINER",
              "layoutPos": {
                "shrink": 1,
                "heightMode": "FULL",
                "layout": "FLEX"
              },
              "id": "view_toolbar"
            }
          ],
          "layout": {
            "layout": "FLEX"
          },
          "dataRegionType": "INHERIT",
          "caption": "\u5BB9\u5668",
          "itemStyle": "DEFAULT",
          "itemType": "CONTAINER",
          "layoutPos": {
            "shrink": 1,
            "heightMode": "FULL",
            "layout": "FLEX"
          },
          "id": "view_header_right"
        }
      ],
      "predefinedType": "VIEWHEADER",
      "layout": {
        "align": "space-between",
        "dir": "row",
        "layout": "FLEX",
        "valign": "center"
      },
      "dataRegionType": "INHERIT",
      "caption": "\u5BB9\u5668",
      "itemStyle": "DEFAULT",
      "itemType": "CONTAINER",
      "layoutPos": {
        "shrink": 0,
        "layout": "FLEX"
      },
      "id": "view_header"
    },
    {
      "actionGroupExtractMode": "ITEM",
      "panelItems": [
        {
          "caption": "\u641C\u7D22\u8868\u5355",
          "itemStyle": "DEFAULT",
          "itemType": "CTRLPOS",
          "layoutPos": {
            "shrink": 1,
            "layout": "FLEX"
          },
          "showCaption": true,
          "id": "searchform"
        }
      ],
      "layout": {
        "dir": "column",
        "layout": "FLEX"
      },
      "dataRegionType": "INHERIT",
      "itemStyle": "DEFAULT",
      "itemType": "CONTAINER",
      "layoutPos": {
        "shrink": 0,
        "layout": "FLEX"
      },
      "id": "view_searchform"
    },
    {
      "actionGroupExtractMode": "ITEM",
      "panelItems": [
        {
          "caption": "\u591A\u7F16\u8F91\u9762\u677F",
          "itemStyle": "DEFAULT",
          "itemType": "CTRLPOS",
          "layoutPos": {
            "grow": 1,
            "shrink": 1,
            "layout": "FLEX"
          },
          "showCaption": true,
          "id": "meditviewpanel"
        }
      ],
      "layout": {
        "layout": "FLEX"
      },
      "dataRegionType": "INHERIT",
      "caption": "\u5BB9\u5668",
      "itemStyle": "DEFAULT",
      "itemType": "CONTAINER",
      "layoutPos": {
        "grow": 1,
        "shrink": 1,
        "layout": "FLEX"
      },
      "id": "view_meditviewpanel"
    }
  ],
  "layoutPanel": true,
  "appViewLogics": [
    {
      "logicTrigger": "CUSTOM",
      "logicType": "APPUILOGIC",
      "builtinAppUILogic": {
        "actionAfterWizard": "DEFAULT",
        "builtinLogic": true,
        "logicType": "PREDEFINED",
        "viewLogicType": "APP_NEWDATA",
        "id": "\u65B0\u5EFA\u6570\u636E"
      },
      "builtinLogic": true,
      "id": "newdata"
    },
    {
      "logicTrigger": "CUSTOM",
      "logicType": "APPUILOGIC",
      "builtinAppUILogic": {
        "editMode": true,
        "builtinLogic": true,
        "logicType": "PREDEFINED",
        "viewLogicType": "APP_OPENDATA",
        "id": "\u6253\u5F00\u6570\u636E"
      },
      "builtinLogic": true,
      "id": "opendata"
    }
  ],
  "controls": [
    {
      "aggMode": "NONE",
      "columnEnableFilter": 2,
      "columnEnableLink": 2,
      "groupMode": "NONE",
      "groupStyle": "DEFAULT",
      "pagingSize": 20,
      "sortMode": "REMOTE",
      "enableCustomized": true,
      "navViewPos": "NONE",
      "fetchControlAction": {
        "appDEMethodId": "fetchdefault",
        "appDataEntityId": "frontmodel.viewlayoutmodelrepository",
        "id": "fetch"
      },
      "removeControlAction": {
        "appDEMethodId": "remove",
        "appDataEntityId": "frontmodel.viewlayoutmodelrepository",
        "id": "remove"
      },
      "autoLoad": true,
      "showBusyIndicator": true,
      "codeName": "Meditviewpanel",
      "controlType": "MULTIEDITVIEWPANEL",
      "appDataEntityId": "frontmodel.viewlayoutmodelrepository",
      "controlParam": {
        "id": "meditviewpanel"
      },
      "modelId": "4e8c9f6da4230a76c0195b4ca614c172_meditviewpanel",
      "modelType": "PSDEGRID",
      "name": "meditviewpanel",
      "id": "frontmodel.viewlayoutmodelrepository.meditviewpanel"
    },
    {
      "groupMode": "SINGLE",
      "quickSearchMode": 1,
      "enableQuickSearch": true,
      "controlType": "SEARCHBAR",
      "appDataEntityId": "frontmodel.viewlayoutmodelrepository",
      "controlParam": {
        "id": "searchbar"
      },
      "id": "searchbar"
    },
    {
      "capLanguageRes": {
        "lanResTag": "DE.LNAME.VIEWLAYOUTMODELREPOSITORY"
      },
      "caption": "\u89C6\u56FE\u5E03\u5C40\u6A21\u578B\u5B58\u50A8",
      "codeName": "DEMEditView9Layout_TOPcaptionbar",
      "controlType": "CAPTIONBAR",
      "appDataEntityId": "frontmodel.viewlayoutmodelrepository",
      "controlParam": {},
      "name": "captionbar",
      "id": "demeditview9layout_topcaptionbar"
    }
  ],
  "codeName": "Usr0806549299",
  "controlType": "VIEWLAYOUTPANEL",
  "logicName": "DEMEditView9Layout_TOP\u5B9E\u4F53\u591A\u8868\u5355\u7F16\u8F91\u89C6\u56FE\uFF08\u90E8\u4EF6\u89C6\u56FE\uFF09\u5E03\u5C40\u9762\u677F",
  "appDataEntityId": "frontmodel.viewlayoutmodelrepository",
  "controlParam": {},
  "modelId": "02553BFE-45B8-47F5-9737-5699E9F8BA4A",
  "modelType": "PSSYSVIEWLAYOUTPANEL",
  "name": "layoutpanel",
  "id": "usr0806549299"
};

exports.default = DEMEDITVIEW9_TOP;
