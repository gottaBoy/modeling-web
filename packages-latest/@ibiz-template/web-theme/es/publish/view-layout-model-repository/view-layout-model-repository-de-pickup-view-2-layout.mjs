"use strict";
var DEPickupView2 = {
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
              "caption": "\u6811\u5BFC\u822A",
              "itemStyle": "DEFAULT",
              "itemType": "CTRLPOS",
              "layoutPos": {
                "shrink": 1,
                "layout": "FLEX"
              },
              "showCaption": true,
              "id": "treeexpbar"
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
            "shrink": 0,
            "layout": "FLEX"
          },
          "id": "view_exp"
        },
        {
          "actionGroupExtractMode": "ITEM",
          "panelItems": [
            {
              "caption": "\u9009\u62E9\u9762\u677F",
              "itemStyle": "DEFAULT",
              "itemType": "CTRLPOS",
              "layoutPos": {
                "grow": 1,
                "shrink": 1,
                "layout": "FLEX"
              },
              "showCaption": true,
              "id": "pickupviewpanel"
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
      "id": "view_container"
    },
    {
      "actionGroupExtractMode": "ITEM",
      "panelItems": [
        {
          "actionType": "UIACTION",
          "buttonStyle": "PRIMARY",
          "buttonType": "PANELBUTTON",
          "uiactionId": "view_okaction",
          "renderMode": "BUTTON",
          "tooltip": "\u786E\u5B9A",
          "tooltipLanguageRes": {
            "lanResTag": "COMMON.PRE_LAYOUT_CONFIRM"
          },
          "capLanguageRes": {
            "lanResTag": "COMMON.PRE_LAYOUT_CONFIRM"
          },
          "caption": "\u786E\u5B9A",
          "itemStyle": "PRIMARY",
          "itemType": "BUTTON",
          "layoutPos": {
            "shrink": 1,
            "layout": "FLEX"
          },
          "showCaption": true,
          "id": "button_okaction"
        },
        {
          "actionType": "UIACTION",
          "buttonStyle": "INFO",
          "buttonType": "PANELBUTTON",
          "uiactionId": "view_cancelaction",
          "renderMode": "BUTTON",
          "tooltip": "\u53D6\u6D88",
          "tooltipLanguageRes": {
            "lanResTag": "COMMON.PRE_LAYOUT_CANCEL"
          },
          "capLanguageRes": {
            "lanResTag": "COMMON.PRE_LAYOUT_CANCEL"
          },
          "caption": "\u53D6\u6D88",
          "itemStyle": "INFO",
          "itemType": "BUTTON",
          "layoutPos": {
            "shrink": 1,
            "layout": "FLEX"
          },
          "showCaption": true,
          "id": "button_cancelaction"
        }
      ],
      "layout": {
        "dir": "row-reverse",
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
      "id": "view_footer"
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
  "codeName": "PickupView2Layout",
  "controlType": "VIEWLAYOUTPANEL",
  "logicName": "\u5B9E\u4F53\u6570\u636E\u9009\u62E9\u89C6\u56FE\uFF08\u5DE6\u53F3\u5173\u7CFB\uFF09\u5E03\u5C40\u9762\u677F",
  "appDataEntityId": "frontmodel.viewlayoutmodelrepository",
  "controlParam": {},
  "modelId": "7EDA40A5-145B-4541-906B-CAB08565EAC8",
  "modelType": "PSSYSVIEWLAYOUTPANEL",
  "name": "layoutpanel",
  "id": "pickupview2layout"
};

export { DEPickupView2 as default };
