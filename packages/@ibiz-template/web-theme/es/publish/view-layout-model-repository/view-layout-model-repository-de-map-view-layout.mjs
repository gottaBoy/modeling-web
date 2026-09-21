"use strict";
var DEMAPVIEW = {
  "viewProxyMode": true,
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
                  "id": "view_searchbar"
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
                "dir": "row",
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
        }
      ],
      "predefinedType": "PANELPART",
      "layout": {
        "layout": "FLEX"
      },
      "dataRegionType": "INHERIT",
      "caption": "\u5F15\u7528\u5E03\u5C40\u9762\u677F",
      "itemStyle": "DEFAULT",
      "itemType": "CONTAINER",
      "layoutPos": {
        "shrink": 1,
        "layout": "FLEX"
      },
      "showCaption": true,
      "id": "panelpart"
    },
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
        }
      ],
      "predefinedType": "PANELPART",
      "layout": {
        "layout": "FLEX"
      },
      "dataRegionType": "INHERIT",
      "caption": "\u5F15\u7528\u5E03\u5C40\u9762\u677F",
      "itemStyle": "DEFAULT",
      "itemType": "CONTAINER",
      "layoutPos": {
        "shrink": 1,
        "layout": "FLEX"
      },
      "showCaption": true,
      "id": "panelpart1"
    },
    {
      "actionGroupExtractMode": "ITEM",
      "panelItems": [
        {
          "caption": "\u5730\u56FE\u5360\u4F4D",
          "itemStyle": "DEFAULT",
          "itemType": "CTRLPOS",
          "layoutPos": {
            "grow": 1,
            "shrink": 1,
            "layout": "FLEX"
          },
          "showCaption": true,
          "id": "map"
        }
      ],
      "predefinedType": "VIEWCONTENT",
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
      "id": "view_content"
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
      "legendPos": "NONE",
      "autoLoad": true,
      "showBusyIndicator": true,
      "codeName": "DEMapViewLayout_MapView",
      "controlType": "MAP",
      "logicName": "\u5730\u56FE\u89C6\u56FE\u5E03\u5C40\u9762\u677F_\u5730\u56FE\u90E8\u4EF6",
      "appDataEntityId": "frontmodel.viewlayoutmodelrepository",
      "controlParam": {
        "id": "map"
      },
      "modelId": "0BACEEDC-6A9D-4836-90A3-97D8506737F7",
      "modelType": "PSSYSMAPVIEW",
      "name": "map",
      "id": "frontmodel.viewlayoutmodelrepository.demapviewlayout_mapview"
    },
    {
      "groupMode": "SINGLE",
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
      "caption": "\u5730\u56FE\u89C6\u56FE\u5E03\u5C40\u9762\u677F",
      "codeName": "DEMapViewLayoutcaptionbar",
      "controlType": "CAPTIONBAR",
      "appDataEntityId": "frontmodel.viewlayoutmodelrepository",
      "controlParam": {},
      "name": "captionbar",
      "id": "demapviewlayoutcaptionbar"
    }
  ],
  "codeName": "MapViewLayout",
  "controlType": "VIEWLAYOUTPANEL",
  "logicName": "\u5730\u56FE\u89C6\u56FE\u5E03\u5C40(\u9884\u7F6E\u6A21\u578B)",
  "appDataEntityId": "frontmodel.viewlayoutmodelrepository",
  "controlParam": {},
  "modelId": "B4A44468-8EDF-4FCD-8082-2DFA97C19E27",
  "modelType": "PSSYSVIEWLAYOUTPANEL",
  "name": "layoutpanel",
  "id": "mapviewlayout"
};

export { DEMAPVIEW as default };
