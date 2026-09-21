export default {
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
                  "caption": "标签页导航栏",
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
                  "caption": "导航区占位",
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
              "caption": "容器",
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
          "caption": "面板容器",
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
                  "caption": "应用标题",
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
                      "caption": "应用切换器",
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
                      "caption": "用户信息",
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
                  "caption": "容器",
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
                      "rawItem": {
                        "caption": "文本内容",
                        "halign": "LEFT",
                        "renderMode": "TEXT",
                        "valign": "MIDDLE",
                        "wrapMode": "NOWRAP",
                        "contentType": "RAW",
                        "predefinedType": "INDEX_VIEW_SEARCH",
                        "id": "index_view_search"
                      },
                      "caption": "搜索栏",
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
                  "caption": "容器",
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
                          "caption": "消息通知",
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
                      "caption": "容器",
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
                          "caption": "设置",
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
                      "caption": "容器",
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
                          "caption": "帮助",
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
                      "caption": "容器",
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
                          "caption": "自定义功能",
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
                      "caption": "容器",
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
                  "caption": "容器",
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
                  "caption": "首页菜单",
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
              "caption": "容器",
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
          "caption": "面板容器",
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
      "caption": "滚动条容器",
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
  "logicName": "应用首页视图布局(预置模型)",
  "controlParam": {},
  "modelId": "02f8d7b1c956f354a0dec34015620ffc",
  "modelType": "PSSYSVIEWLAYOUTPANEL",
  "name": "layoutpanel",
  "id": "indexviewlayout"
}
