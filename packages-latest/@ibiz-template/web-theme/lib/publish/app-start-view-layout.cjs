'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

"use strict";
var AppStartViewLayout = {
  "layoutBodyOnly": true,
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
              "rawItem": {
                "caption": "iBizSys\u8F6F\u4EF6\u5DE5\u5382\u4E0E\u76F8\u5173\u5957\u4EF6\u521D\u59CB\u5316\u4E2D...",
                "halign": "LEFT",
                "renderMode": "PARAGRAPH",
                "valign": "MIDDLE",
                "wrapMode": "NOWRAP",
                "contentType": "RAW",
                "predefinedType": "STATIC_LABEL",
                "id": "static_label"
              },
              "caption": "\u6807\u7B7E",
              "itemStyle": "DEFAULT",
              "itemType": "RAWITEM",
              "layoutPos": {
                "shrink": 1,
                "halignSelf": "CENTER",
                "layout": "FLEX",
                "valignSelf": "MIDDLE"
              },
              "showCaption": true,
              "id": "static_label"
            }
          ],
          "layout": {
            "align": "center",
            "dir": "column",
            "layout": "FLEX",
            "valign": "center"
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
        "shrink": 1,
        "heightMode": "FULL",
        "layout": "FLEX"
      },
      "id": "page_container"
    }
  ],
  "layoutPanel": true,
  "controls": [
    {
      "caption": "\u5E94\u7528\u542F\u52A8\u89C6\u56FE\u5E03\u5C40\u9762\u677F",
      "codeName": "captionbar",
      "controlType": "CAPTIONBAR",
      "controlParam": {},
      "id": "captionbar"
    }
  ],
  "codeName": "Layoutpanel",
  "controlType": "VIEWLAYOUTPANEL",
  "logicName": "AppStartViewLayout",
  "controlParam": {},
  "modelId": "78598a19ce043cbe9277fddaac19938b",
  "modelType": "PSSYSVIEWLAYOUTPANEL",
  "id": "layoutpanel"
};

exports.default = AppStartViewLayout;
