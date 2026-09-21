'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

"use strict";
var DEMPickupView2 = {
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
              "actionGroupExtractMode": "ITEM",
              "panelItems": [
                {
                  "caption": "\u6811\u5BFC\u822A\u680F",
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
              "id": "container6"
            },
            {
              "actionGroupExtractMode": "ITEM",
              "panelItems": [
                {
                  "caption": "\u63A7\u4EF6\u5360\u4F4D",
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
              "id": "container7"
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
          "id": "container3"
        },
        {
          "actionGroupExtractMode": "ITEM",
          "panelItems": [
            {
              "actionType": "UIACTION",
              "buttonStyle": "DEFAULT",
              "buttonType": "PANELBUTTON",
              "uiactionId": "util_addselection",
              "renderMode": "BUTTON",
              "tooltip": "\u6DFB\u52A0\u9009\u4E2D\u6570\u636E",
              "tooltipLanguageRes": {
                "lanResTag": "COMMON.PRE_LAYOUT_ADD_SELECT_DATA"
              },
              "capLanguageRes": {
                "lanResTag": "COMMON.PRE_LAYOUT_ADD_SELECT_DATA"
              },
              "caption": "\u6DFB\u52A0\u9009\u4E2D\u6570\u636E",
              "itemStyle": "DEFAULT",
              "itemType": "BUTTON",
              "layoutPos": {
                "shrink": 1,
                "layout": "FLEX",
                "spacingBottom": "OUTERMEDIUM"
              },
              "sysImage": {
                "cssClass": "fa fa-angle-right",
                "glyph": "xf105@FontAwesome"
              },
              "id": "button_addselection"
            },
            {
              "actionType": "UIACTION",
              "buttonStyle": "DEFAULT",
              "buttonType": "PANELBUTTON",
              "uiactionId": "util_addall",
              "renderMode": "BUTTON",
              "tooltip": "\u6DFB\u52A0\u5168\u90E8\u6570\u636E",
              "tooltipLanguageRes": {
                "lanResTag": "COMMON.PRE_LAYOUT_ADD_ALL_DATA"
              },
              "capLanguageRes": {
                "lanResTag": "COMMON.PRE_LAYOUT_ADD_ALL_DATA"
              },
              "caption": "\u6DFB\u52A0\u5168\u90E8\u6570\u636E",
              "itemStyle": "DEFAULT",
              "itemType": "BUTTON",
              "layoutPos": {
                "shrink": 1,
                "layout": "FLEX",
                "spacingBottom": "OUTERMEDIUM"
              },
              "sysImage": {
                "cssClass": "fa fa-angle-double-right",
                "glyph": "xf101@FontAwesome"
              },
              "id": "button_addall"
            },
            {
              "actionType": "UIACTION",
              "buttonStyle": "DEFAULT",
              "buttonType": "PANELBUTTON",
              "uiactionId": "util_removeall",
              "renderMode": "BUTTON",
              "tooltip": "\u79FB\u9664\u5168\u90E8\u6570\u636E",
              "tooltipLanguageRes": {
                "lanResTag": "COMMON.PRE_LAYOUT_REMOVE_ALL_DATA"
              },
              "capLanguageRes": {
                "lanResTag": "COMMON.PRE_LAYOUT_REMOVE_ALL_DATA"
              },
              "caption": "\u79FB\u9664\u5168\u90E8\u6570\u636E",
              "itemStyle": "DEFAULT",
              "itemType": "BUTTON",
              "layoutPos": {
                "shrink": 1,
                "layout": "FLEX",
                "spacingBottom": "OUTERMEDIUM"
              },
              "sysImage": {
                "cssClass": "fa fa-angle-double-left",
                "glyph": "xf100@FontAwesome"
              },
              "id": "button_removeall"
            },
            {
              "actionType": "UIACTION",
              "buttonStyle": "DEFAULT",
              "buttonType": "PANELBUTTON",
              "uiactionId": "util_removeselection",
              "renderMode": "BUTTON",
              "tooltip": "\u79FB\u9664\u9009\u4E2D\u6570\u636E",
              "tooltipLanguageRes": {
                "lanResTag": "COMMON.PRE_LAYOUT_REMOVE_SELECT_DATA"
              },
              "capLanguageRes": {
                "lanResTag": "COMMON.PRE_LAYOUT_REMOVE_SELECT_DATA"
              },
              "caption": "\u79FB\u9664\u9009\u4E2D\u6570\u636E",
              "itemStyle": "DEFAULT",
              "itemType": "BUTTON",
              "layoutPos": {
                "shrink": 1,
                "layout": "FLEX"
              },
              "sysImage": {
                "cssClass": "fa fa-angle-left",
                "glyph": "xf104@FontAwesome"
              },
              "id": "button_removeselection"
            }
          ],
          "layout": {
            "align": "center",
            "dir": "column",
            "layout": "FLEX"
          },
          "dataRegionType": "INHERIT",
          "caption": "\u5BB9\u5668",
          "itemStyle": "DEFAULT",
          "itemType": "CONTAINER",
          "layoutPos": {
            "shrink": 0,
            "layout": "FLEX",
            "spacingLeft": "OUTERMEDIUM",
            "spacingRight": "OUTERMEDIUM"
          },
          "id": "container4"
        },
        {
          "actionGroupExtractMode": "ITEM",
          "panelItems": [
            {
              "caption": "\u5217\u8868",
              "itemStyle": "DEFAULT",
              "itemType": "CTRLPOS",
              "layoutPos": {
                "grow": 1,
                "shrink": 1,
                "layout": "FLEX",
                "widthMode": "FULL"
              },
              "showCaption": true,
              "id": "simplelist"
            }
          ],
          "layout": {
            "dir": "column",
            "layout": "FLEX",
            "valign": "flex-start"
          },
          "dataRegionType": "INHERIT",
          "caption": "\u5BB9\u5668",
          "contentWidth": 300,
          "itemStyle": "DEFAULT",
          "itemType": "CONTAINER",
          "layoutPos": {
            "shrink": 0,
            "layout": "FLEX",
            "width": 300,
            "widthMode": "PX"
          },
          "width": 300,
          "id": "container5"
        }
      ],
      "predefinedType": "VIEWCONTENT",
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
      "id": "view_content"
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
  "codeName": "MPickupView2Layout",
  "controlType": "VIEWLAYOUTPANEL",
  "logicName": "\u591A\u9879\u9009\u62E9\u89C6\u56FE(\u5DE6\u53F3\u5173\u7CFB)\u5E03\u5C40\u9762\u677F(\u9884\u7F6E\u6A21\u578B)",
  "appDataEntityId": "frontmodel.viewlayoutmodelrepository",
  "controlParam": {},
  "modelId": "a734e2f8c575308a8a2752ed437f3877",
  "modelType": "PSSYSVIEWLAYOUTPANEL",
  "name": "layoutpanel",
  "id": "mpickupview2layout"
};

exports.default = DEMPickupView2;
