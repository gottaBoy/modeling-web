"use strict";
var AppIndexViewLayout = {
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
                    "predefinedType": "NAV_TABS",
                    "id": "nav_tabs"
                  },
                  "caption": "\u6807\u7B7E\u9875\u5BFC\u822A\u680F",
                  "itemStyle": "DEFAULT",
                  "itemType": "RAWITEM",
                  "layoutPos": {
                    "shrink": 0,
                    "layout": "FLEX"
                  },
                  "showCaption": true,
                  "id": "nav_tabs"
                },
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
                    "rawItemHeight": 80,
                    "id": "app_apptitle"
                  },
                  "caption": "\u5E94\u7528\u6807\u9898",
                  "contentHeight": 80,
                  "height": 80,
                  "itemStyle": "DEFAULT",
                  "itemType": "RAWITEM",
                  "layoutPos": {
                    "shrink": 0,
                    "height": 80,
                    "heightMode": "PX",
                    "layout": "FLEX",
                    "spacingBottom": "OUTERSMALL",
                    "widthMode": "FULL"
                  },
                  "showCaption": true,
                  "id": "app_apptitle"
                },
                {
                  "rawItem": {
                    "predefinedType": "AUTH_USERINFO",
                    "rawItemHeight": 72,
                    "id": "auth_userinfo"
                  },
                  "caption": "\u7528\u6237\u4FE1\u606F",
                  "contentHeight": 72,
                  "height": 72,
                  "itemStyle": "DEFAULT",
                  "itemType": "RAWITEM",
                  "layoutPos": {
                    "shrink": 0,
                    "height": 72,
                    "heightMode": "PX",
                    "layout": "FLEX",
                    "widthMode": "FULL"
                  },
                  "showCaption": true,
                  "id": "auth_userinfo"
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
                        "heightMode": "FULL",
                        "layout": "FLEX",
                        "widthMode": "FULL"
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
                    "shrink": 0,
                    "layout": "FLEX",
                    "widthMode": "FULL"
                  },
                  "id": "container"
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
                      "contentHeight": 32,
                      "contentWidth": 32,
                      "height": 32,
                      "itemStyle": "DEFAULT",
                      "itemType": "CONTAINER",
                      "layoutPos": {
                        "shrink": 1,
                        "height": 32,
                        "heightMode": "PX",
                        "layout": "FLEX",
                        "width": 32,
                        "widthMode": "PX"
                      },
                      "width": 32,
                      "id": "container1"
                    },
                    {
                      "actionGroupExtractMode": "ITEM",
                      "panelItems": [
                        {
                          "rawItem": {
                            "sysImage": {
                              "imagePath": "svg/setting.svg",
                              "imagePathX": "svg/setting.svg"
                            },
                            "contentType": "IMAGE",
                            "predefinedType": "SETTING",
                            "id": "setting"
                          },
                          "caption": "\u8BBE\u7F6E",
                          "itemStyle": "DEFAULT",
                          "itemType": "RAWITEM",
                          "layoutPos": {
                            "shrink": 1,
                            "heightMode": "FULL",
                            "layout": "FLEX",
                            "widthMode": "FULL"
                          },
                          "sysImage": {
                            "imagePath": "svg/setting.svg",
                            "imagePathX": "svg/setting.svg"
                          },
                          "showCaption": true,
                          "id": "setting"
                        }
                      ],
                      "layout": {
                        "layout": "FLEX"
                      },
                      "dataRegionType": "INHERIT",
                      "caption": "\u5BB9\u5668",
                      "contentHeight": 32,
                      "contentWidth": 32,
                      "height": 32,
                      "itemStyle": "DEFAULT",
                      "itemType": "CONTAINER",
                      "layoutPos": {
                        "shrink": 1,
                        "height": 32,
                        "heightMode": "PX",
                        "layout": "FLEX",
                        "width": 32,
                        "widthMode": "PX"
                      },
                      "width": 32,
                      "id": "container2"
                    },
                    {
                      "actionGroupExtractMode": "ITEM",
                      "panelItems": [
                        {
                          "rawItem": {
                            "sysImage": {
                              "imagePath": "svg/helper.svg",
                              "imagePathX": "svg/helper.svg"
                            },
                            "contentType": "IMAGE",
                            "predefinedType": "HELPER",
                            "id": "helper"
                          },
                          "caption": "\u5E2E\u52A9",
                          "itemStyle": "DEFAULT",
                          "itemType": "RAWITEM",
                          "layoutPos": {
                            "shrink": 1,
                            "heightMode": "FULL",
                            "layout": "FLEX",
                            "widthMode": "FULL"
                          },
                          "sysImage": {
                            "imagePath": "svg/helper.svg",
                            "imagePathX": "svg/helper.svg"
                          },
                          "showCaption": true,
                          "id": "helper"
                        }
                      ],
                      "layout": {
                        "layout": "FLEX"
                      },
                      "dataRegionType": "INHERIT",
                      "caption": "\u5BB9\u5668",
                      "contentHeight": 32,
                      "contentWidth": 32,
                      "height": 32,
                      "itemStyle": "DEFAULT",
                      "itemType": "CONTAINER",
                      "layoutPos": {
                        "shrink": 1,
                        "height": 32,
                        "heightMode": "PX",
                        "layout": "FLEX",
                        "width": 32,
                        "widthMode": "PX"
                      },
                      "width": 32,
                      "id": "container3"
                    },
                    {
                      "actionGroupExtractMode": "ITEM",
                      "panelItems": [
                        {
                          "rawItem": {
                            "sysImage": {
                              "imagePath": "svg/custom-workbench.svg",
                              "imagePathX": "svg/custom-workbench.svg"
                            },
                            "contentType": "IMAGE",
                            "predefinedType": "CUSTOM",
                            "id": "custom"
                          },
                          "caption": "\u81EA\u5B9A\u4E49\u529F\u80FD",
                          "itemStyle": "DEFAULT",
                          "itemType": "RAWITEM",
                          "layoutPos": {
                            "shrink": 1,
                            "heightMode": "FULL",
                            "layout": "FLEX",
                            "widthMode": "FULL"
                          },
                          "sysImage": {
                            "imagePath": "svg/custom-workbench.svg",
                            "imagePathX": "svg/custom-workbench.svg"
                          },
                          "showCaption": true,
                          "id": "custom"
                        }
                      ],
                      "layout": {
                        "layout": "FLEX"
                      },
                      "dataRegionType": "INHERIT",
                      "caption": "\u5BB9\u5668",
                      "contentHeight": 32,
                      "contentWidth": 32,
                      "height": 32,
                      "itemStyle": "DEFAULT",
                      "itemType": "CONTAINER",
                      "layoutPos": {
                        "shrink": 1,
                        "height": 32,
                        "heightMode": "PX",
                        "layout": "FLEX",
                        "width": 32,
                        "widthMode": "PX"
                      },
                      "width": 32,
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
  "codeName": "IndexViewLayout",
  "controlType": "VIEWLAYOUTPANEL",
  "logicName": "\u5E94\u7528\u9996\u9875\u89C6\u56FE\u5E03\u5C40(\u9884\u7F6E\u6A21\u578B)",
  "controlParam": {},
  "modelId": "02f8d7b1c956f354a0dec34015620ffc",
  "modelType": "PSSYSVIEWLAYOUTPANEL",
  "name": "layoutpanel",
  "id": "indexviewlayout"
};

export { AppIndexViewLayout as default };
