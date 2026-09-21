"use strict";
var GridExpBar = {
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
              "id": "control_captionbar"
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
          "id": "control_header_left"
        },
        {
          "actionGroupExtractMode": "ITEM",
          "panelItems": [
            {
              "actionGroupExtractMode": "ITEM",
              "panelItems": [
                {
                  "caption": "\u641C\u7D22\u680F",
                  "itemStyle": "DEFAULT",
                  "itemType": "CTRLPOS",
                  "layoutPos": {
                    "shrink": 1,
                    "layout": "FLEX"
                  },
                  "showCaption": true,
                  "id": "searchbar"
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
              "id": "control_searchbar"
            },
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
                  "id": "gridexpbar_toolbar"
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
              "id": "control_toolbar"
            }
          ],
          "layout": {
            "dir": "row",
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
          "id": "control_header_right"
        }
      ],
      "predefinedType": "EXP_HEADER",
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
      "id": "control_header"
    },
    {
      "actionGroupExtractMode": "ITEM",
      "panelItems": [
        {
          "caption": "\u5BFC\u822A\u8868\u683C",
          "itemStyle": "DEFAULT",
          "itemType": "CTRLPOS",
          "layoutPos": {
            "grow": 1,
            "shrink": 1,
            "layout": "FLEX"
          },
          "showCaption": true,
          "id": "gridexpbar_grid"
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
      "id": "control_grid"
    }
  ],
  "layoutPanel": true,
  "codeName": "GridExpBarLayout",
  "controlType": "VIEWLAYOUTPANEL",
  "logicName": "\u90E8\u4EF6-\u8868\u683C\u5BFC\u822A\u680F\u5E03\u5C40\u9762\u677F",
  "appDataEntityId": "frontmodel.controllayoutmodelrepository",
  "controlParam": {},
  "modelId": "4965E9F3-C06D-49C5-A57F-356C70E3E22B",
  "modelType": "PSSYSVIEWLAYOUTPANEL",
  "name": "layoutpanel",
  "id": "gridexpbarlayout"
};

export { GridExpBar as default };
