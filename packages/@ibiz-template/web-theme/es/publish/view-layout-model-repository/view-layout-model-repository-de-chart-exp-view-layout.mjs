"use strict";
var DEChartExpView = {
  "layoutMode": "FLEX",
  "layout": {
    "layout": "FLEX"
  },
  "rootPanelItems": [
    {
      "rawItem": {
        "rawItemParams": [
          {
            "key": "POSITION",
            "value": "TOP"
          }
        ],
        "predefinedType": "VIEWMSG_POS",
        "id": "viewmsg_pos_top"
      },
      "caption": "\u89C6\u56FE\u6D88\u606F\u5360\u4F4D",
      "itemStyle": "DEFAULT",
      "itemType": "RAWITEM",
      "layoutPos": {
        "shrink": 0,
        "layout": "FLEX"
      },
      "showCaption": true,
      "id": "viewmsg_pos_top"
    },
    {
      "actionGroupExtractMode": "ITEM",
      "panelItems": [
        {
          "rawItem": {
            "rawItemParams": [
              {
                "key": "POSITION",
                "value": "BODY"
              }
            ],
            "predefinedType": "VIEWMSG_POS",
            "id": "viewmsg_pos_body"
          },
          "caption": "\u89C6\u56FE\u6D88\u606F\u5360\u4F4D",
          "itemStyle": "DEFAULT",
          "itemType": "RAWITEM",
          "layoutPos": {
            "shrink": 0,
            "layout": "FLEX"
          },
          "showCaption": true,
          "id": "viewmsg_pos_body"
        },
        {
          "actionGroupExtractMode": "ITEM",
          "panelItems": [
            {
              "actionGroupExtractMode": "ITEM",
              "panelItems": [
                {
                  "caption": "\u56FE\u8868\u5BFC\u822A",
                  "itemStyle": "DEFAULT",
                  "itemType": "CTRLPOS",
                  "layoutPos": {
                    "colMD": 24,
                    "heightMode": "FULL",
                    "layout": "TABLE_24COL"
                  },
                  "showCaption": true,
                  "id": "chartexpbar"
                }
              ],
              "layout": {
                "columnCount": 24,
                "layout": "TABLE_24COL"
              },
              "dataRegionType": "INHERIT",
              "caption": "\u9762\u677F\u5BB9\u5668",
              "contentWidth": 500,
              "itemStyle": "DEFAULT",
              "itemType": "CONTAINER",
              "layoutPos": {
                "shrink": 1,
                "layout": "SIMPLEFLEX",
                "width": 500,
                "widthMode": "PX"
              },
              "width": 500,
              "id": "container"
            },
            {
              "actionGroupExtractMode": "ITEM",
              "panelItems": [
                {
                  "rawItem": {
                    "predefinedType": "NAV_POS",
                    "id": "nav_pos"
                  },
                  "caption": "\u5BFC\u822A\u533A\u5360\u4F4D",
                  "itemStyle": "DEFAULT",
                  "itemType": "RAWITEM",
                  "layoutPos": {
                    "colMD": 24,
                    "heightMode": "FULL",
                    "layout": "TABLE_24COL"
                  },
                  "showCaption": true,
                  "id": "nav_pos"
                }
              ],
              "layout": {
                "columnCount": 24,
                "layout": "TABLE_24COL"
              },
              "dataRegionType": "INHERIT",
              "caption": "\u9762\u677F\u5BB9\u5668",
              "itemStyle": "DEFAULT",
              "itemType": "CONTAINER",
              "layoutPos": {
                "shrink": 1,
                "layout": "SIMPLEFLEX"
              },
              "id": "container3"
            }
          ],
          "predefinedType": "CONTAINER_H_SPLIT",
          "layout": {
            "layout": "SIMPLEFLEX"
          },
          "dataRegionType": "INHERIT",
          "caption": "\u5206\u5272\u5BB9\u5668(\u5DE6\u53F3)",
          "itemStyle": "DEFAULT",
          "itemType": "CONTAINER",
          "layoutPos": {
            "grow": 1,
            "shrink": 1,
            "layout": "FLEX"
          },
          "id": "view_exp_split"
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
      "id": "container1"
    },
    {
      "rawItem": {
        "rawItemParams": [
          {
            "key": "POSITION",
            "value": "BOTTOM"
          }
        ],
        "predefinedType": "VIEWMSG_POS",
        "id": "viewmsg_pos_bottom"
      },
      "caption": "\u89C6\u56FE\u6D88\u606F\u5360\u4F4D",
      "itemStyle": "DEFAULT",
      "itemType": "RAWITEM",
      "layoutPos": {
        "shrink": 0,
        "layout": "FLEX"
      },
      "showCaption": true,
      "id": "viewmsg_pos_bottom"
    }
  ],
  "layoutPanel": true,
  "codeName": "ChartExpViewLayout",
  "controlType": "VIEWLAYOUTPANEL",
  "logicName": "\u56FE\u8868\u5BFC\u822A\u89C6\u56FE\u5E03\u5C40\u9762\u677F(\u9884\u7F6E\u6A21\u578B)",
  "appDataEntityId": "frontmodel.viewlayoutmodelrepository",
  "controlParam": {},
  "modelId": "01900310-2D66-4EAD-8682-E230847E444E",
  "modelType": "PSSYSVIEWLAYOUTPANEL",
  "name": "layoutpanel",
  "id": "chartexpviewlayout"
};

export { DEChartExpView as default };
