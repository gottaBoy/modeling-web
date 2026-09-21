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
          "caption": "视图消息占位",
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
                  "caption": "图表导航",
                  "itemStyle": "DEFAULT",
                  "itemType": "CTRLPOS",
                  "layoutPos": {
                    "colMD": 24,
                    "heightMode": "FULL",
                    "layout": "TABLE_24COL"
                  },
                  "showCaption": true,
                  "id": "chartexpbar"
                }
              ],
              "layout": {
                "columnCount": 24,
                "layout": "TABLE_24COL"
              },
              "dataRegionType": "INHERIT",
              "caption": "面板容器",
              "contentWidth": 500,
              "itemStyle": "DEFAULT",
              "itemType": "CONTAINER",
              "layoutPos": {
                "shrink": 1,
                "layout": "SIMPLEFLEX",
                "width": 500,
                "widthMode": "PX"
              },
              "width": 500,
              "id": "container"
            },
            {
              "actionGroupExtractMode": "ITEM",
              "panelItems": [
                {
                  "rawItem": {
                    "predefinedType": "NAV_POS",
                    "id": "nav_pos"
                  },
                  "caption": "导航区占位",
                  "itemStyle": "DEFAULT",
                  "itemType": "RAWITEM",
                  "layoutPos": {
                    "colMD": 24,
                    "heightMode": "FULL",
                    "layout": "TABLE_24COL"
                  },
                  "showCaption": true,
                  "id": "nav_pos"
                }
              ],
              "layout": {
                "columnCount": 24,
                "layout": "TABLE_24COL"
              },
              "dataRegionType": "INHERIT",
              "caption": "面板容器",
              "itemStyle": "DEFAULT",
              "itemType": "CONTAINER",
              "layoutPos": {
                "shrink": 1,
                "layout": "SIMPLEFLEX"
              },
              "id": "container3"
            }
          ],
          "predefinedType": "CONTAINER_H_SPLIT",
          "layout": {
            "layout": "SIMPLEFLEX"
          },
          "dataRegionType": "INHERIT",
          "caption": "分割容器(左右)",
          "itemStyle": "DEFAULT",
          "itemType": "CONTAINER",
          "layoutPos": {
            "grow": 1,
            "shrink": 1,
            "layout": "FLEX"
          },
          "id": "view_exp_split"
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
      "id": "container1"
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
  "codeName": "ChartExpViewLayout",
  "controlType": "VIEWLAYOUTPANEL",
  "logicName": "图表导航视图布局面板(预置模型)",
  "appDataEntityId": "frontmodel.viewlayoutmodelrepository",
  "controlParam": {},
  "modelId": "01900310-2D66-4EAD-8682-E230847E444E",
  "modelType": "PSSYSVIEWLAYOUTPANEL",
  "name": "layoutpanel",
  "id": "chartexpviewlayout"
}
