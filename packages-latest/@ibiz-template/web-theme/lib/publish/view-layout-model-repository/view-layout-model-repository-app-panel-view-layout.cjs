'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

"use strict";
var AppPanelView = {
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
          "caption": "\u9762\u677F\u90E8\u4EF6",
          "itemStyle": "DEFAULT",
          "itemType": "CTRLPOS",
          "layoutPos": {
            "shrink": 1,
            "heightMode": "FULL",
            "layout": "FLEX",
            "widthMode": "FULL"
          },
          "showCaption": true,
          "id": "panel"
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
        "shrink": 1,
        "heightMode": "FULL",
        "layout": "FLEX",
        "widthMode": "FULL"
      },
      "id": "page_container"
    }
  ],
  "layoutPanel": true,
  "controls": [
    {
      "capLanguageRes": {
        "lanResTag": "DE.LNAME.VIEWLAYOUTMODELREPOSITORY"
      },
      "caption": "\u5E94\u7528\u9762\u677F\u89C6\u56FE\u5E03\u5C40\u9762\u677F",
      "codeName": "AppPanelViewLayoutcaptionbar",
      "controlType": "CAPTIONBAR",
      "appDataEntityId": "frontmodel.viewlayoutmodelrepository",
      "controlParam": {},
      "name": "captionbar",
      "id": "apppanelviewlayoutcaptionbar"
    }
  ],
  "codeName": "Usr0411453122",
  "controlType": "VIEWLAYOUTPANEL",
  "logicName": "\u5E94\u7528\u9762\u677F\u89C6\u56FE\u5E03\u5C40\u9762\u677F\u5E03\u5C40\u9762\u677F",
  "appDataEntityId": "frontmodel.viewlayoutmodelrepository",
  "controlParam": {},
  "modelId": "156BD126-E52E-4B5B-8095-1CF76252B9C7",
  "modelType": "PSSYSVIEWLAYOUTPANEL",
  "name": "layoutpanel",
  "id": "usr0411453122"
};

exports.default = AppPanelView;
