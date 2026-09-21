"use strict";
var SearchForm = {
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
          "id": "control_searchform"
        },
        {
          "actionGroupExtractMode": "ITEM",
          "panelItems": [
            {
              "rawItem": {
                "halign": "LEFT",
                "valign": "MIDDLE",
                "wrapMode": "NOWRAP",
                "contentType": "RAW",
                "predefinedType": "SEARCHFORM_BUTTONS",
                "id": "searchform_buttons2"
              },
              "itemStyle": "DEFAULT",
              "itemType": "RAWITEM",
              "layoutPos": {
                "shrink": 1,
                "layout": "FLEX"
              },
              "id": "searchform_buttons2"
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
            "grow": 0,
            "shrink": 0,
            "layout": "FLEX"
          },
          "id": "control_buttons_right"
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
        "grow": 1,
        "shrink": 1,
        "layout": "FLEX"
      },
      "id": "control_content"
    },
    {
      "actionGroupExtractMode": "ITEM",
      "panelItems": [
        {
          "rawItem": {
            "caption": "\u56FE\u7247",
            "contentType": "PLACEHOLDER",
            "predefinedType": "SEARCHFORM_BUTTONS",
            "id": "searchform_buttons"
          },
          "caption": "\u56FE\u7247",
          "itemStyle": "DEFAULT",
          "itemType": "RAWITEM",
          "layoutPos": {
            "shrink": 1,
            "layout": "FLEX"
          },
          "showCaption": true,
          "id": "searchform_buttons"
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
        "grow": 0,
        "shrink": 0,
        "layout": "FLEX"
      },
      "id": "control_buttons_bottom"
    }
  ],
  "layoutPanel": true,
  "codeName": "SearchFormLayout",
  "controlType": "VIEWLAYOUTPANEL",
  "logicName": "\u90E8\u4EF6-\u641C\u7D22\u8868\u5355\u5E03\u5C40\u9762\u677F",
  "appDataEntityId": "frontmodel.controllayoutmodelrepository",
  "controlParam": {},
  "modelId": "E6F25EC9-534B-424F-97C1-AC5515DAC8A6",
  "modelType": "PSSYSVIEWLAYOUTPANEL",
  "name": "layoutpanel",
  "id": "searchformlayout"
};

export { SearchForm as default };
