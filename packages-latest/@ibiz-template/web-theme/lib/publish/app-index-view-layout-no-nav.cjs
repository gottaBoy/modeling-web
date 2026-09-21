'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

"use strict";
var AppIndexViewLayout_NO_NAV = {
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
                  "rawItem": {
                    "predefinedType": "NAV_POS_INDEX",
                    "id": "nav_pos_index"
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
                  "id": "nav_pos_index"
                }
              ],
              "layout": {
                "layout": "FLEX"
              },
              "dataRegionType": "INHERIT",
              "caption": "\u5BB9\u5668",
              "contentHeight": 100,
              "itemStyle": "DEFAULT",
              "itemType": "CONTAINER",
              "layoutPos": {
                "layoutPos": "CENTER",
                "height": 100,
                "heightMode": "PERCENTAGE",
                "layout": "BORDER"
              },
              "id": "container4"
            }
          ],
          "predefinedType": "CONTAINER_SCROLL_MAIN",
          "layout": {
            "layout": "BORDER"
          },
          "dataRegionType": "INHERIT",
          "caption": "\u9762\u677F\u5BB9\u5668",
          "contentWidth": 100,
          "itemStyle": "DEFAULT",
          "itemType": "CONTAINER",
          "layoutPos": {
            "layoutPos": "CENTER",
            "layout": "BORDER",
            "width": 100,
            "widthMode": "PERCENTAGE"
          },
          "showCaption": true,
          "id": "container_scroll_main"
        },
        {
          "actionGroupExtractMode": "ITEM",
          "panelItems": [
            {
              "actionGroupExtractMode": "ITEM",
              "panelItems": [
                {
                  "rawItem": {
                    "predefinedType": "APP_APPTITLE",
                    "rawItemHeight": 90,
                    "id": "app_apptitle"
                  },
                  "caption": "\u5E94\u7528\u6807\u9898",
                  "contentHeight": 90,
                  "height": 90,
                  "itemStyle": "DEFAULT",
                  "itemType": "RAWITEM",
                  "layoutPos": {
                    "shrink": 0,
                    "height": 90,
                    "heightMode": "PX",
                    "layout": "FLEX",
                    "widthMode": "FULL"
                  },
                  "showCaption": true,
                  "id": "app_apptitle"
                },
                {
                  "actionGroupExtractMode": "ITEM",
                  "panelItems": [
                    {
                      "rawItem": {
                        "contentType": "USER",
                        "predefinedType": "APP_SWITCH",
                        "rawItemHeight": 36,
                        "rawItemWidth": 20,
                        "id": "app_switch"
                      },
                      "caption": "\u5E94\u7528\u5207\u6362\u5668",
                      "contentHeight": 36,
                      "contentWidth": 20,
                      "height": 36,
                      "itemStyle": "DEFAULT",
                      "itemType": "RAWITEM",
                      "layoutPos": {
                        "shrink": 0,
                        "halignSelf": "CENTER",
                        "height": 36,
                        "heightMode": "PX",
                        "layout": "FLEX",
                        "spacingLeft": "INNERLARGE",
                        "width": 20,
                        "widthMode": "PERCENTAGE"
                      },
                      "width": 20,
                      "showCaption": true,
                      "id": "app_switch"
                    },
                    {
                      "rawItem": {
                        "predefinedType": "AUTH_USERINFO",
                        "rawItemHeight": 72,
                        "rawItemWidth": 80,
                        "id": "auth_userinfo"
                      },
                      "caption": "\u7528\u6237\u4FE1\u606F",
                      "contentHeight": 72,
                      "contentWidth": 80,
                      "height": 72,
                      "itemStyle": "DEFAULT",
                      "itemType": "RAWITEM",
                      "layoutPos": {
                        "shrink": 0,
                        "height": 72,
                        "heightMode": "PX",
                        "layout": "FLEX",
                        "width": 80,
                        "widthMode": "PERCENTAGE"
                      },
                      "width": 80,
                      "showCaption": true,
                      "id": "auth_userinfo"
                    }
                  ],
                  "layout": {
                    "align": "space-between",
                    "dir": "row",
                    "layout": "FLEX",
                    "valign": "center"
                  },
                  "dataRegionType": "INHERIT",
                  "caption": "\u5BB9\u5668",
                  "contentHeight": 72,
                  "height": 72,
                  "itemStyle": "DEFAULT",
                  "itemType": "CONTAINER",
                  "layoutPos": {
                    "shrink": 0,
                    "height": 72,
                    "heightMode": "PX",
                    "layout": "FLEX",
                    "widthMode": "FULL"
                  },
                  "id": "container6"
                },
                {
                  "actionGroupExtractMode": "ITEM",
                  "panelItems": [
                    {
                      "actionGroupExtractMode": "ITEM",
                      "panelItems": [
                        {
                          "rawItem": {
                            "sysImage": {
                              "imagePath": "svg/message.svg",
                              "imagePathX": "svg/message.svg"
                            },
                            "contentType": "IMAGE",
                            "predefinedType": "USERMESSAGE",
                            "id": "usermessage"
                          },
                          "caption": "\u6D88\u606F\u901A\u77E5",
                          "itemStyle": "DEFAULT",
                          "itemType": "RAWITEM",
                          "layoutPos": {
                            "shrink": 1,
                            "heightMode": "FULL",
                            "layout": "FLEX",
                            "widthMode": "FULL"
                          },
                          "sysImage": {
                            "imagePath": "svg/message.svg",
                            "imagePathX": "svg/message.svg"
                          },
                          "showCaption": true,
                          "id": "usermessage"
                        }
                      ],
                      "layout": {
                        "layout": "FLEX"
                      },
                      "dataRegionType": "INHERIT",
                      "caption": "\u5BB9\u5668",
                      "contentHeight": 48,
                      "contentWidth": 48,
                      "height": 48,
                      "itemStyle": "DEFAULT",
                      "itemType": "CONTAINER",
                      "layoutPos": {
                        "shrink": 1,
                        "height": 48,
                        "heightMode": "PX",
                        "layout": "FLEX",
                        "width": 48,
                        "widthMode": "PX"
                      },
                      "width": 48,
                      "id": "container1"
                    },
                    {
                      "actionGroupExtractMode": "ITEM",
                      "panelItems": [
                        {
                          "actionType": "NONE",
                          "buttonHeight": 48,
                          "buttonStyle": "DEFAULT",
                          "buttonType": "PANELBUTTON",
                          "buttonWidth": 48,
                          "renderMode": "BUTTON",
                          "tooltip": "\u656C\u8BF7\u671F\u5F85",
                          "uiactionTarget": "NONE",
                          "caption": "\u656C\u8BF7\u671F\u5F85",
                          "contentHeight": 48,
                          "contentWidth": 48,
                          "height": 48,
                          "itemStyle": "DEFAULT",
                          "itemType": "BUTTON",
                          "layoutPos": {
                            "shrink": 1,
                            "height": 48,
                            "heightMode": "FULL",
                            "layout": "FLEX",
                            "width": 48,
                            "widthMode": "FULL"
                          },
                          "sysImage": {
                            "imagePath": "svg/setting.svg",
                            "imagePathX": "svg/setting.svg"
                          },
                          "width": 48,
                          "id": "button_calluilogic1"
                        }
                      ],
                      "layout": {
                        "layout": "FLEX"
                      },
                      "dataRegionType": "INHERIT",
                      "caption": "\u5BB9\u5668",
                      "contentHeight": 48,
                      "contentWidth": 48,
                      "height": 48,
                      "itemStyle": "DEFAULT",
                      "itemType": "CONTAINER",
                      "layoutPos": {
                        "shrink": 1,
                        "height": 48,
                        "heightMode": "PX",
                        "layout": "FLEX",
                        "width": 48,
                        "widthMode": "PX"
                      },
                      "width": 48,
                      "id": "container2"
                    },
                    {
                      "actionGroupExtractMode": "ITEM",
                      "panelItems": [
                        {
                          "actionType": "NONE",
                          "buttonHeight": 48,
                          "buttonStyle": "DEFAULT",
                          "buttonType": "PANELBUTTON",
                          "buttonWidth": 48,
                          "renderMode": "BUTTON",
                          "tooltip": "\u656C\u8BF7\u671F\u5F85",
                          "uiactionTarget": "NONE",
                          "caption": "\u656C\u8BF7\u671F\u5F85",
                          "contentHeight": 48,
                          "contentWidth": 48,
                          "height": 48,
                          "itemStyle": "DEFAULT",
                          "itemType": "BUTTON",
                          "layoutPos": {
                            "shrink": 1,
                            "height": 48,
                            "heightMode": "FULL",
                            "layout": "FLEX",
                            "width": 48,
                            "widthMode": "FULL"
                          },
                          "sysImage": {
                            "imagePath": "svg/helper.svg",
                            "imagePathX": "svg/helper.svg"
                          },
                          "width": 48,
                          "id": "button_calluilogic2"
                        }
                      ],
                      "layout": {
                        "layout": "FLEX"
                      },
                      "dataRegionType": "INHERIT",
                      "caption": "\u5BB9\u5668",
                      "contentHeight": 48,
                      "contentWidth": 48,
                      "height": 48,
                      "itemStyle": "DEFAULT",
                      "itemType": "CONTAINER",
                      "layoutPos": {
                        "shrink": 1,
                        "height": 48,
                        "heightMode": "PX",
                        "layout": "FLEX",
                        "width": 48,
                        "widthMode": "PX"
                      },
                      "width": 48,
                      "id": "container3"
                    },
                    {
                      "actionGroupExtractMode": "ITEM",
                      "panelItems": [
                        {
                          "actionType": "NONE",
                          "buttonHeight": 48,
                          "buttonStyle": "DEFAULT",
                          "buttonType": "PANELBUTTON",
                          "buttonWidth": 48,
                          "renderMode": "BUTTON",
                          "tooltip": "\u656C\u8BF7\u671F\u5F85",
                          "uiactionTarget": "NONE",
                          "caption": "\u656C\u8BF7\u671F\u5F85",
                          "contentHeight": 48,
                          "contentWidth": 48,
                          "height": 48,
                          "itemStyle": "DEFAULT",
                          "itemType": "BUTTON",
                          "layoutPos": {
                            "shrink": 1,
                            "height": 48,
                            "heightMode": "FULL",
                            "layout": "FLEX",
                            "width": 48,
                            "widthMode": "FULL"
                          },
                          "sysImage": {
                            "imagePath": "svg/custom-workbench.svg",
                            "imagePathX": "svg/custom-workbench.svg"
                          },
                          "width": 48,
                          "id": "button_calluilogic3"
                        }
                      ],
                      "layout": {
                        "layout": "FLEX"
                      },
                      "dataRegionType": "INHERIT",
                      "caption": "\u5BB9\u5668",
                      "contentHeight": 48,
                      "contentWidth": 48,
                      "height": 48,
                      "itemStyle": "DEFAULT",
                      "itemType": "CONTAINER",
                      "layoutPos": {
                        "shrink": 1,
                        "height": 48,
                        "heightMode": "PX",
                        "layout": "FLEX",
                        "width": 48,
                        "widthMode": "PX"
                      },
                      "width": 48,
                      "id": "container5"
                    }
                  ],
                  "predefinedType": "INDEX_ACTIONS",
                  "layout": {
                    "align": "space-around",
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
                    "layout": "FLEX",
                    "widthMode": "FULL"
                  },
                  "id": "indexactions"
                },
                {
                  "actionGroupExtractMode": "ITEM",
                  "panelItems": [
                    {
                      "rawItem": {
                        "caption": "\u6587\u672C\u5185\u5BB9",
                        "halign": "LEFT",
                        "renderMode": "TEXT",
                        "valign": "MIDDLE",
                        "wrapMode": "NOWRAP",
                        "contentType": "RAW",
                        "predefinedType": "INDEX_VIEW_SEARCH",
                        "id": "index_view_search"
                      },
                      "caption": "\u641C\u7D22\u680F",
                      "itemStyle": "DEFAULT",
                      "itemType": "RAWITEM",
                      "layoutPos": {
                        "shrink": 1,
                        "layout": "FLEX"
                      },
                      "showCaption": true,
                      "id": "index_view_search"
                    }
                  ],
                  "layout": {
                    "align": "center",
                    "layout": "FLEX",
                    "valign": "center"
                  },
                  "dataRegionType": "INHERIT",
                  "caption": "\u5BB9\u5668",
                  "contentHeight": 52,
                  "height": 52,
                  "itemStyle": "DEFAULT",
                  "itemType": "CONTAINER",
                  "layoutPos": {
                    "shrink": 0,
                    "height": 52,
                    "heightMode": "PX",
                    "layout": "FLEX",
                    "widthMode": "FULL"
                  },
                  "id": "container"
                },
                {
                  "caption": "\u9996\u9875\u83DC\u5355",
                  "itemStyle": "DEFAULT",
                  "itemType": "CTRLPOS",
                  "layoutPos": {
                    "grow": 1,
                    "shrink": 1,
                    "layout": "FLEX",
                    "widthMode": "FULL"
                  },
                  "showCaption": true,
                  "id": "appmenu"
                }
              ],
              "predefinedType": "AppHeader",
              "layout": {
                "dir": "column",
                "layout": "FLEX"
              },
              "dataRegionType": "INHERIT",
              "caption": "\u5BB9\u5668",
              "itemStyle": "DEFAULT",
              "itemType": "CONTAINER",
              "layoutPos": {
                "layoutPos": "CENTER",
                "heightMode": "FULL",
                "layout": "BORDER"
              },
              "id": "app_header"
            }
          ],
          "predefinedType": "CONTAINER_SCROLL_LEFT",
          "layout": {
            "layout": "BORDER"
          },
          "dataRegionType": "INHERIT",
          "caption": "\u9762\u677F\u5BB9\u5668",
          "contentWidth": 256,
          "itemStyle": "DEFAULT",
          "itemType": "CONTAINER",
          "layoutPos": {
            "layoutPos": "WEST",
            "layout": "BORDER",
            "width": 256,
            "widthMode": "PX"
          },
          "width": 256,
          "showCaption": true,
          "id": "container_scroll_left"
        }
      ],
      "predefinedType": "CONTAINER_SCROLL",
      "layout": {
        "layout": "BORDER"
      },
      "dataRegionType": "INHERIT",
      "caption": "\u6EDA\u52A8\u6761\u5BB9\u5668",
      "itemStyle": "DEFAULT",
      "itemType": "CONTAINER",
      "layoutPos": {
        "shrink": 1,
        "layout": "FLEX"
      },
      "id": "container_scroll1"
    }
  ],
  "layoutPanel": true,
  "codeName": "IndexViewLayoutNoNav",
  "controlType": "VIEWLAYOUTPANEL",
  "logicName": "\u5E94\u7528\u9996\u9875\u89C6\u56FE\u5E03\u5C40(\u65E0\u5206\u9875)",
  "controlParam": {},
  "modelId": "CF729CA9-31B9-4D1D-BD03-939A0C7B700F",
  "modelType": "PSSYSVIEWLAYOUTPANEL",
  "name": "layoutpanel",
  "id": "indexviewlayoutnonav"
};

exports.default = AppIndexViewLayout_NO_NAV;
