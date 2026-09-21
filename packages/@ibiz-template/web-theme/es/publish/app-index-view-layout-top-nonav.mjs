"use strict";
var AppIndexViewLayout_TOP_NO_NAV = {
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
              "id": "app_content"
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
                    "id": "app_apptitle"
                  },
                  "caption": "\u5E94\u7528\u6807\u9898",
                  "itemStyle": "DEFAULT",
                  "itemType": "RAWITEM",
                  "layoutPos": {
                    "shrink": 0,
                    "layout": "FLEX"
                  },
                  "showCaption": true,
                  "id": "app_apptitle"
                },
                {
                  "caption": "\u9996\u9875\u83DC\u5355",
                  "itemStyle": "DEFAULT",
                  "itemType": "CTRLPOS",
                  "layoutPos": {
                    "shrink": 1,
                    "layout": "FLEX"
                  },
                  "showCaption": true,
                  "id": "appmenu"
                },
                {
                  "actionGroupExtractMode": "ITEM",
                  "panelItems": [
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
                          "caption": "\u6587\u672C",
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
                      "itemStyle": "DEFAULT",
                      "itemType": "CONTAINER",
                      "layoutPos": {
                        "shrink": 1,
                        "heightMode": "FULL",
                        "layout": "FLEX"
                      },
                      "id": "container3"
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
                                "rawItemHeight": 22,
                                "rawItemWidth": 22,
                                "id": "usermessage"
                              },
                              "caption": "\u6D88\u606F\u901A\u77E5",
                              "contentHeight": 22,
                              "contentWidth": 22,
                              "height": 22,
                              "itemStyle": "DEFAULT",
                              "itemType": "RAWITEM",
                              "layoutPos": {
                                "shrink": 1,
                                "height": 22,
                                "heightMode": "PX",
                                "layout": "FLEX",
                                "width": 22,
                                "widthMode": "PX"
                              },
                              "sysImage": {
                                "imagePath": "svg/message.svg",
                                "imagePathX": "svg/message.svg"
                              },
                              "width": 22,
                              "showCaption": true,
                              "id": "usermessage"
                            }
                          ],
                          "layout": {
                            "align": "center",
                            "dir": "row",
                            "layout": "FLEX",
                            "valign": "center"
                          },
                          "dataRegionType": "INHERIT",
                          "caption": "\u5BB9\u5668",
                          "contentWidth": 52,
                          "itemStyle": "DEFAULT",
                          "itemType": "CONTAINER",
                          "layoutPos": {
                            "shrink": 1,
                            "heightMode": "FULL",
                            "layout": "FLEX",
                            "width": 52,
                            "widthMode": "PX"
                          },
                          "width": 52,
                          "id": "container4"
                        },
                        {
                          "actionGroupExtractMode": "ITEM",
                          "panelItems": [
                            {
                              "actionType": "NONE",
                              "buttonStyle": "DEFAULT",
                              "buttonType": "PANELBUTTON",
                              "renderMode": "BUTTON",
                              "tooltip": "\u656C\u8BF7\u671F\u5F85",
                              "uiactionTarget": "NONE",
                              "caption": "\u656C\u8BF7\u671F\u5F85",
                              "itemStyle": "DEFAULT",
                              "itemType": "BUTTON",
                              "layoutPos": {
                                "shrink": 1,
                                "layout": "FLEX"
                              },
                              "sysImage": {
                                "imagePath": "svg/setting.svg",
                                "imagePathX": "svg/setting.svg"
                              },
                              "id": "button_calluilogic1"
                            }
                          ],
                          "layout": {
                            "align": "center",
                            "dir": "row",
                            "layout": "FLEX",
                            "valign": "center"
                          },
                          "dataRegionType": "INHERIT",
                          "caption": "\u5BB9\u5668",
                          "contentWidth": 52,
                          "itemStyle": "DEFAULT",
                          "itemType": "CONTAINER",
                          "layoutPos": {
                            "shrink": 1,
                            "heightMode": "FULL",
                            "layout": "FLEX",
                            "width": 52,
                            "widthMode": "PX"
                          },
                          "width": 52,
                          "id": "container5"
                        },
                        {
                          "actionGroupExtractMode": "ITEM",
                          "panelItems": [
                            {
                              "actionType": "NONE",
                              "buttonStyle": "DEFAULT",
                              "buttonType": "PANELBUTTON",
                              "renderMode": "BUTTON",
                              "tooltip": "\u656C\u8BF7\u671F\u5F85",
                              "uiactionTarget": "NONE",
                              "caption": "\u656C\u8BF7\u671F\u5F85",
                              "itemStyle": "DEFAULT",
                              "itemType": "BUTTON",
                              "layoutPos": {
                                "shrink": 1,
                                "layout": "FLEX"
                              },
                              "sysImage": {
                                "imagePath": "svg/helper.svg",
                                "imagePathX": "svg/helper.svg"
                              },
                              "id": "button_calluilogic2"
                            }
                          ],
                          "layout": {
                            "align": "center",
                            "dir": "row",
                            "layout": "FLEX",
                            "valign": "center"
                          },
                          "dataRegionType": "INHERIT",
                          "caption": "\u5BB9\u5668",
                          "contentWidth": 52,
                          "itemStyle": "DEFAULT",
                          "itemType": "CONTAINER",
                          "layoutPos": {
                            "shrink": 1,
                            "heightMode": "FULL",
                            "layout": "FLEX",
                            "width": 52,
                            "widthMode": "PX"
                          },
                          "width": 52,
                          "id": "container6"
                        },
                        {
                          "actionGroupExtractMode": "ITEM",
                          "panelItems": [
                            {
                              "actionType": "NONE",
                              "buttonStyle": "DEFAULT",
                              "buttonType": "PANELBUTTON",
                              "renderMode": "BUTTON",
                              "tooltip": "\u656C\u8BF7\u671F\u5F85",
                              "uiactionTarget": "NONE",
                              "caption": "\u656C\u8BF7\u671F\u5F85",
                              "itemStyle": "DEFAULT",
                              "itemType": "BUTTON",
                              "layoutPos": {
                                "shrink": 1,
                                "layout": "FLEX"
                              },
                              "sysImage": {
                                "imagePath": "svg/custom-workbench.svg",
                                "imagePathX": "svg/custom-workbench.svg"
                              },
                              "id": "button_calluilogic3"
                            }
                          ],
                          "layout": {
                            "align": "center",
                            "dir": "row",
                            "layout": "FLEX",
                            "valign": "center"
                          },
                          "dataRegionType": "INHERIT",
                          "caption": "\u5BB9\u5668",
                          "contentWidth": 52,
                          "itemStyle": "DEFAULT",
                          "itemType": "CONTAINER",
                          "layoutPos": {
                            "shrink": 1,
                            "heightMode": "FULL",
                            "layout": "FLEX",
                            "width": 52,
                            "widthMode": "PX"
                          },
                          "width": 52,
                          "id": "container7"
                        }
                      ],
                      "predefinedType": "INDEX_ACTIONS",
                      "layout": {
                        "align": "center",
                        "dir": "row",
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
                      "id": "indextopactions"
                    },
                    {
                      "actionGroupExtractMode": "ITEM",
                      "panelItems": [
                        {
                          "rawItem": {
                            "predefinedType": "AUTH_USERINFO",
                            "id": "auth_userinfo"
                          },
                          "caption": "\u7528\u6237\u4FE1\u606F",
                          "itemStyle": "DEFAULT",
                          "itemType": "RAWITEM",
                          "layoutPos": {
                            "shrink": 1,
                            "layout": "FLEX"
                          },
                          "showCaption": true,
                          "id": "auth_userinfo"
                        }
                      ],
                      "layout": {
                        "align": "center",
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
                      "id": "container1"
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
                    "shrink": 0,
                    "layout": "FLEX"
                  },
                  "id": "container"
                }
              ],
              "predefinedType": "AppHeader",
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
                "layoutPos": "CENTER",
                "heightMode": "FULL",
                "layout": "BORDER"
              },
              "id": "app_header"
            }
          ],
          "predefinedType": "CONTAINER_SCROLL_HEADER",
          "layout": {
            "layout": "BORDER"
          },
          "dataRegionType": "INHERIT",
          "caption": "\u9762\u677F\u5BB9\u5668",
          "contentHeight": 56,
          "height": 56,
          "itemStyle": "DEFAULT",
          "itemType": "CONTAINER",
          "layoutPos": {
            "layoutPos": "NORTH",
            "height": 56,
            "heightMode": "PX",
            "layout": "BORDER"
          },
          "showCaption": true,
          "id": "container_scroll_header"
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
  "codeName": "IndexViewLayout_TOP_NONAV",
  "controlType": "VIEWLAYOUTPANEL",
  "logicName": "\u5E94\u7528\u9996\u9875\u89C6\u56FE\u5E03\u5C40_\u4E0A\u65B9\u83DC\u5355(\u65E0\u5206\u9875)",
  "controlParam": {},
  "modelId": "7FFF2A7B-5899-4393-B442-CCABE3A57721",
  "modelType": "PSSYSVIEWLAYOUTPANEL",
  "name": "layoutpanel",
  "id": "indexviewlayout_top_nonav"
};

export { AppIndexViewLayout_TOP_NO_NAV as default };
