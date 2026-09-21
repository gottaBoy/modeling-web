export default {
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
      "caption": "视图消息占位",
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
                      "caption": "页面标题",
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
                  "caption": "容器",
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
              "caption": "容器",
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
                      "caption": "工具栏",
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
                  "caption": "容器",
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
              "caption": "容器",
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
          "caption": "容器",
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
      "caption": "引用布局面板",
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
        "id": "viewmsg_pos__body"
      },
      "caption": "视图消息占位",
      "itemStyle": "DEFAULT",
      "itemType": "RAWITEM",
      "layoutPos": {
        "shrink": 0,
        "layout": "FLEX"
      },
      "showCaption": true,
      "id": "viewmsg_pos__body"
    },
    {
      "actionGroupExtractMode": "ITEM",
      "panelItems": [
        {
          "actionGroupExtractMode": "ITEM",
          "panelItems": [
            {
              "caption": "控件占位",
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
          "layout": {
            "layout": "FLEX"
          },
          "dataRegionType": "INHERIT",
          "caption": "容器",
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
              "tooltip": "添加选中数据",
              "caption": "添加选中数据",
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
              "tooltip": "添加全部数据",
              "caption": "添加全部数据",
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
              "tooltip": "移除全部数据",
              "caption": "移除全部数据",
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
              "tooltip": "移除选中数据",
              "caption": "移除选中数据",
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
          "caption": "容器",
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
              "caption": "列表",
              "itemStyle": "DEFAULT",
              "itemType": "CTRLPOS",
              "layoutPos": {
                "shrink": 1,
                "layout": "FLEX"
              },
              "showCaption": true,
              "id": "simplelist"
            }
          ],
          "layout": {
            "layout": "FLEX"
          },
          "dataRegionType": "INHERIT",
          "caption": "容器",
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
      "caption": "容器",
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
          "tooltip": "确定",
          "caption": "确定",
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
          "tooltip": "取消",
          "caption": "取消",
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
      "caption": "容器",
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
      "caption": "视图消息占位",
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
  "codeName": "MPickupViewLayout",
  "controlType": "VIEWLAYOUTPANEL",
  "logicName": "多项选择视图布局面板(预置模型)",
  "appDataEntityId": "frontmodel.viewlayoutmodelrepository",
  "controlParam": {},
  "modelId": "3f66d734d6c9b50c29cfaccab3ccfb16",
  "modelType": "PSSYSVIEWLAYOUTPANEL",
  "name": "layoutpanel",
  "id": "mpickupviewlayout"
}
