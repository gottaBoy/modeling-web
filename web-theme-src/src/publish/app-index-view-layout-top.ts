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
              "id": "app_content"
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
                  "actionGroupExtractMode": "ITEM",
                  "panelItems": [
                    {
                      "rawItem": {
                        "contentType": "USER",
                        "predefinedType": "APP_SWITCH",
                        "id": "app_switch"
                      },
                      "caption": "应用切换器",
                      "itemStyle": "DEFAULT",
                      "itemType": "RAWITEM",
                      "layoutPos": {
                        "shrink": 0,
                        "layout": "FLEX",
                        "spacingLeft": "INNERLARGE"
                      },
                      "showCaption": true,
                      "id": "app_switch"
                    },
                    {
                      "rawItem": {
                        "predefinedType": "APP_APPTITLE",
                        "id": "app_apptitle"
                      },
                      "caption": "应用标题",
                      "itemStyle": "DEFAULT",
                      "itemType": "RAWITEM",
                      "layoutPos": {
                        "shrink": 0,
                        "layout": "FLEX"
                      },
                      "showCaption": true,
                      "id": "app_apptitle"
                    }
                  ],
                  "layout": {
                    "align": "flex-start",
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
                    "layout": "FLEX"
                  },
                  "id": "container2"
                },
                {
                  "caption": "首页菜单",
                  "contentHeight": 56,
                  "height": 56,
                  "itemStyle": "DEFAULT",
                  "itemType": "CTRLPOS",
                  "layoutPos": {
                    "shrink": 1,
                    "height": 56,
                    "heightMode": "PX",
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
                            "caption": "文本内容",
                            "halign": "LEFT",
                            "renderMode": "TEXT",
                            "valign": "MIDDLE",
                            "wrapMode": "NOWRAP",
                            "contentType": "RAW",
                            "predefinedType": "INDEX_VIEW_SEARCH",
                            "id": "index_view_search"
                          },
                          "caption": "文本",
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
                      "caption": "容器",
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
                              "caption": "消息通知",
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
                          "caption": "容器",
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
                              "tooltip": "敬请期待",
                              "uiactionTarget": "NONE",
                              "caption": "敬请期待",
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
                          "caption": "容器",
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
                              "tooltip": "敬请期待",
                              "uiactionTarget": "NONE",
                              "caption": "敬请期待",
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
                          "caption": "容器",
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
                              "tooltip": "敬请期待",
                              "uiactionTarget": "NONE",
                              "caption": "敬请期待",
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
                          "caption": "容器",
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
                      "caption": "容器",
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
                          "caption": "用户信息",
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
                      "caption": "容器",
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
                  "caption": "容器",
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
          "predefinedType": "CONTAINER_SCROLL_HEADER",
          "layout": {
            "layout": "BORDER"
          },
          "dataRegionType": "INHERIT",
          "caption": "面板容器",
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
  "codeName": "IndexViewLayout_TOP",
  "controlType": "VIEWLAYOUTPANEL",
  "logicName": "应用首页视图布局_上方菜单(预置模型)",
  "controlParam": {},
  "modelId": "427a1f25d46954891cfc22f62ac2c339",
  "modelType": "PSSYSVIEWLAYOUTPANEL",
  "name": "layoutpanel",
  "id": "indexviewlayout_top"
}
