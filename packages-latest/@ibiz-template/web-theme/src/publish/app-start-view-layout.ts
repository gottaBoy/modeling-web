export default {
  "layoutBodyOnly": true,
  "viewProxyMode": true,
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
              "rawItem": {
                "caption": "iBizSys软件工厂与相关套件初始化中...",
                "halign": "LEFT",
                "renderMode": "PARAGRAPH",
                "valign": "MIDDLE",
                "wrapMode": "NOWRAP",
                "contentType": "RAW",
                "predefinedType": "STATIC_LABEL",
                "id": "static_label"
              },
              "caption": "标签",
              "itemStyle": "DEFAULT",
              "itemType": "RAWITEM",
              "layoutPos": {
                "shrink": 1,
                "halignSelf": "CENTER",
                "layout": "FLEX",
                "valignSelf": "MIDDLE"
              },
              "showCaption": true,
              "id": "static_label"
            }
          ],
          "layout": {
            "align": "center",
            "dir": "column",
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
          "id": "container"
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
      "id": "page_container"
    }
  ],
  "layoutPanel": true,
  "controls": [
    {
      "caption": "应用启动视图布局面板",
      "codeName": "captionbar",
      "controlType": "CAPTIONBAR",
      "controlParam": {},
      "id": "captionbar"
    }
  ],
  "codeName": "Layoutpanel",
  "controlType": "VIEWLAYOUTPANEL",
  "logicName": "AppStartViewLayout",
  "controlParam": {},
  "modelId": "78598a19ce043cbe9277fddaac19938b",
  "modelType": "PSSYSVIEWLAYOUTPANEL",
  "id": "layoutpanel"
}
