'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

"use strict";
var DataView = {
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
          "rawItem": {
            "caption": "\u6392\u5E8F\u680F\uFF08SORTBAR\uFF09",
            "halign": "LEFT",
            "valign": "MIDDLE",
            "wrapMode": "NOWRAP",
            "contentType": "RAW",
            "predefinedType": "SORTBAR",
            "id": "sortbar"
          },
          "caption": "\u6392\u5E8F\u680F",
          "itemStyle": "DEFAULT",
          "itemType": "RAWITEM",
          "layoutPos": {
            "grow": 1,
            "shrink": 1,
            "layout": "FLEX"
          },
          "showCaption": true,
          "id": "sortbar"
        },
        {
          "caption": "\u641C\u7D22\u680F",
          "itemStyle": "DEFAULT",
          "itemType": "CTRLPOS",
          "layoutPos": {
            "shrink": 0,
            "layout": "FLEX",
            "spacingBottom": "OUTERSMALL",
            "spacingLeft": "OUTERSMALL",
            "spacingRight": "OUTERSMALL",
            "spacingTop": "OUTERSMALL"
          },
          "showCaption": true,
          "id": "searchbar"
        }
      ],
      "layout": {
        "align": "space-between",
        "dir": "row",
        "layout": "FLEX"
      },
      "dataRegionType": "INHERIT",
      "caption": "\u5BB9\u5668",
      "itemStyle": "DEFAULT",
      "itemType": "CONTAINER",
      "layoutPos": {
        "shrink": 0,
        "layout": "FLEX",
        "spacingBottom": "OUTERSMALL"
      },
      "id": "control_header"
    },
    {
      "actionGroupExtractMode": "ITEM",
      "panelItems": [
        {
          "caption": "\u6570\u636E\u89C6\u56FE",
          "itemStyle": "DEFAULT",
          "itemType": "CTRLPOS",
          "layoutPos": {
            "grow": 1,
            "shrink": 1,
            "layout": "FLEX"
          },
          "showCaption": true,
          "id": "dataview"
        },
        {
          "actionGroupExtractMode": "ITEM",
          "panelItems": [
            {
              "rawItem": {
                "caption": "\u5206\u9875\u680F\uFF08PAGINGBAR\uFF09",
                "halign": "LEFT",
                "renderMode": "PARAGRAPH",
                "valign": "MIDDLE",
                "wrapMode": "NOWRAP",
                "contentType": "RAW",
                "predefinedType": "PAGINGBAR",
                "id": "pagingbar"
              },
              "caption": "\u5206\u9875\u680F",
              "itemStyle": "DEFAULT",
              "itemType": "RAWITEM",
              "layoutPos": {
                "shrink": 0,
                "layout": "FLEX"
              },
              "showCaption": true,
              "id": "pagingbar"
            }
          ],
          "layout": {
            "dir": "row-reverse",
            "layout": "FLEX"
          },
          "dataRegionType": "INHERIT",
          "caption": "\u5BB9\u5668",
          "itemStyle": "DEFAULT",
          "itemType": "CONTAINER",
          "layoutPos": {
            "shrink": 0,
            "layout": "FLEX"
          },
          "id": "container"
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
      "id": "control_content"
    }
  ],
  "layoutPanel": true,
  "controls": [
    {
      "capLanguageRes": {
        "lanResTag": "DE.LNAME.CONTROLLAYOUTMODELREPOSITORY"
      },
      "caption": "\u6570\u636E\u89C6\u56FE\u90E8\u4EF6\u5E03\u5C40",
      "codeName": "DataViewLayoutcaptionbar",
      "controlType": "CAPTIONBAR",
      "appDataEntityId": "frontmodel.controllayoutmodelrepository",
      "controlParam": {},
      "name": "captionbar",
      "id": "dataviewlayoutcaptionbar"
    }
  ],
  "codeName": "CardLayout",
  "controlType": "VIEWLAYOUTPANEL",
  "logicName": "\u90E8\u4EF6-\u6570\u636E\u89C6\u56FE\u90E8\u4EF6\u5E03\u5C40\u9762\u677F",
  "appDataEntityId": "frontmodel.controllayoutmodelrepository",
  "controlParam": {},
  "modelId": "84218AD7-144D-4C11-BC8A-2AFC0324EC7E",
  "modelType": "PSSYSVIEWLAYOUTPANEL",
  "name": "layoutpanel",
  "id": "cardlayout"
};

exports.default = DataView;
