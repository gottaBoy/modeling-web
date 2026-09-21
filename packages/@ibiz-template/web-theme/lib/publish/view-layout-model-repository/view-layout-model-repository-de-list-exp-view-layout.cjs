'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

"use strict";
var DEListViewExpView = {
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
                  "caption": "\u5217\u8868\u5BFC\u822A",
                  "itemStyle": "DEFAULT",
                  "itemType": "CTRLPOS",
                  "layoutPos": {
                    "grow": 1,
                    "shrink": 1,
                    "layout": "FLEX"
                  },
                  "showCaption": true,
                  "id": "listexpbar"
                }
              ],
              "layout": {
                "layout": "FLEX"
              },
              "dataRegionType": "INHERIT",
              "caption": "\u5BB9\u5668",
              "contentWidth": 500,
              "itemStyle": "DEFAULT",
              "itemType": "CONTAINER",
              "layoutPos": {
                "shrink": 1,
                "layout": "FLEX",
                "width": 500,
                "widthMode": "PX"
              },
              "width": 500,
              "id": "view_exp"
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
                    "grow": 1,
                    "shrink": 1,
                    "layout": "FLEX"
                  },
                  "showCaption": true,
                  "id": "nav_pos"
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
                "layout": "FLEX"
              },
              "id": "view_content"
            }
          ],
          "predefinedType": "CONTAINER_H_SPLIT",
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
      "id": "container"
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
  "codeName": "ListExpViewLayout",
  "controlType": "VIEWLAYOUTPANEL",
  "logicName": " \u5B9E\u4F53\u5217\u8868\u5BFC\u822A\u89C6\u56FE\u5E03\u5C40\u9762\u677F(\u9884\u7F6E\u6A21\u578B)",
  "appDataEntityId": "frontmodel.viewlayoutmodelrepository",
  "controlParam": {},
  "modelId": "560d34d9a3987cd5228bafa8ab905e67",
  "modelType": "PSSYSVIEWLAYOUTPANEL",
  "name": "layoutpanel",
  "id": "listexpviewlayout"
};

exports.default = DEListViewExpView;
